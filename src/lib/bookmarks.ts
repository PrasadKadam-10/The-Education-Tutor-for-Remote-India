export interface Bookmark {
  id: string;
  question: string;
  answer: string;
  subject: string;
  grade: string;
  createdAt: number;
  note?: string;
  mastered?: boolean;
  kind?: "chat" | "quiz" | "note";
  tags?: string[];
}

const STORAGE_KEY = "vidyasathi_bookmarks";

const normalizeBookmark = (bookmark: Partial<Bookmark>): Bookmark => ({
  id: bookmark.id || crypto.randomUUID(),
  question: bookmark.question || "Untitled",
  answer: bookmark.answer || "",
  subject: bookmark.subject || "General",
  grade: bookmark.grade || "General",
  createdAt: Number(bookmark.createdAt || Date.now()),
  note: bookmark.note || "",
  mastered: Boolean(bookmark.mastered),
  kind: bookmark.kind || "chat",
  tags: Array.isArray(bookmark.tags) ? bookmark.tags : [bookmark.subject || "General", `${bookmark.grade || "General"}`],
});

export function getBookmarks(): Bookmark[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.map(normalizeBookmark) : [];
  } catch {
    return [];
  }
}

export function addBookmark(bookmark: Omit<Bookmark, "id" | "createdAt">): Bookmark {
  const bm: Bookmark = normalizeBookmark({
    ...bookmark,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    createdAt: Date.now(),
  });
  const all = getBookmarks();
  all.unshift(bm);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.slice(0, 100)));
  return bm;
}

export function removeBookmark(id: string) {
  const all = getBookmarks().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function updateBookmarkNote(id: string, note: string) {
  const all = getBookmarks();
  const idx = all.findIndex((b) => b.id === id);
  if (idx >= 0) {
    all[idx].note = note.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}

export function toggleBookmarkMastered(id: string) {
  const all = getBookmarks();
  const idx = all.findIndex((b) => b.id === id);
  if (idx >= 0) {
    all[idx].mastered = !all[idx].mastered;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}
