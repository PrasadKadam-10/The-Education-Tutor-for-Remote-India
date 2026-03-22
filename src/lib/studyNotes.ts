export type NoteType = "note" | "summary" | "important_questions" | "exam_answers";

export interface StoredStudyNote {
  id: string;
  title: string;
  content: string;
  subject: string;
  note_type: NoteType;
  created_at: string;
}

const STUDY_NOTES_KEY = "vidyasathi_study_notes";

const readNotes = (): StoredStudyNote[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STUDY_NOTES_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeNotes = (notes: StoredStudyNote[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STUDY_NOTES_KEY, JSON.stringify(notes));
};

export const getStudyNotes = () => readNotes();

export const saveStudyNote = (note: Omit<StoredStudyNote, "id" | "created_at">) => {
  const notes = readNotes();
  const nextNote: StoredStudyNote = {
    ...note,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  writeNotes([nextNote, ...notes]);
  return nextNote;
};

export const deleteStudyNote = (id: string) => {
  const notes = readNotes().filter((note) => note.id !== id);
  writeNotes(notes);
};
