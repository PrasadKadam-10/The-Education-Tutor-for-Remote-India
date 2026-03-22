export interface StudyTask {
  id: string;
  text: string;
  subject: string;
  done: boolean;
  createdAt: number;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

const STORAGE_KEY = "vidyasathi_study_plan";

const normalizeTask = (task: Partial<StudyTask>): StudyTask => ({
  id: task.id || crypto.randomUUID(),
  text: task.text || "Untitled task",
  subject: task.subject || "General",
  done: Boolean(task.done),
  createdAt: Number(task.createdAt || Date.now()),
  priority: task.priority === "low" || task.priority === "high" ? task.priority : "medium",
  dueDate: task.dueDate || undefined,
});

export function getStudyPlan(): StudyTask[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.map(normalizeTask) : [];
  } catch {
    return [];
  }
}

export function addStudyTask(text: string, subject: string, priority: StudyTask["priority"] = "medium", dueDate?: string): StudyTask {
  const task: StudyTask = normalizeTask({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    text,
    subject,
    done: false,
    createdAt: Date.now(),
    priority,
    dueDate,
  });
  const tasks = getStudyPlan();
  tasks.unshift(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return task;
}

export function toggleStudyTask(id: string) {
  const tasks = getStudyPlan();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx >= 0) {
    tasks[idx].done = !tasks[idx].done;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}

export function removeStudyTask(id: string) {
  const tasks = getStudyPlan().filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
