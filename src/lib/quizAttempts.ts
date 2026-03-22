export type QuizAttemptMode = "chapter" | "mock";

export interface QuizAttempt {
  id: string;
  mode: QuizAttemptMode;
  subject: string;
  chapter: string;
  grade: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  durationSeconds: number;
  createdAt: number;
}

const STORAGE_KEY = "vidyasathi_quiz_attempts";

const normalizeAttempt = (attempt: Partial<QuizAttempt>): QuizAttempt => {
  const totalQuestions = Number(attempt.totalQuestions || 0);
  const correctAnswers = Number(attempt.correctAnswers || 0);

  return {
    id: attempt.id || crypto.randomUUID(),
    mode: attempt.mode === "mock" ? "mock" : "chapter",
    subject: attempt.subject || "General",
    chapter: attempt.chapter || "Practice",
    grade: attempt.grade || "General",
    totalQuestions,
    correctAnswers,
    scorePercent: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
    durationSeconds: Number(attempt.durationSeconds || 0),
    createdAt: Number(attempt.createdAt || Date.now()),
  };
};

export function getQuizAttempts(): QuizAttempt[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw) ? raw.map(normalizeAttempt) : [];
  } catch {
    return [];
  }
}

export function saveQuizAttempt(attempt: Omit<QuizAttempt, "id" | "createdAt" | "scorePercent">) {
  const nextAttempt = normalizeAttempt({
    ...attempt,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  });

  const attempts = getQuizAttempts();
  attempts.unshift(nextAttempt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts.slice(0, 150)));
  return nextAttempt;
}