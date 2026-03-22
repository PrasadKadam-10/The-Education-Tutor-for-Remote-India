import { type Message } from "@/components/chat/streamChat";

export interface ChatSession {
  id: string;
  title: string;
  grade: string;
  board: string;
  subject: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "vidyasathi_chat_history";

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getChatSessions(): ChatSession[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveChatSession(session: ChatSession) {
  const sessions = getChatSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session);
  }
  // Keep max 50 sessions
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.slice(0, 50)));
}

export function deleteChatSession(id: string) {
  const sessions = getChatSessions().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getTitleFromMessages(messages: Message[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "New Chat";
  return firstUser.content.slice(0, 50) + (firstUser.content.length > 50 ? "..." : "");
}
