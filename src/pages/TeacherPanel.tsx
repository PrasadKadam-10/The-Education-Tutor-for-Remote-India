import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Search, ChevronDown, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";

interface StudentProfile {
  id: string;
  full_name: string;
  grade: string | null;
  board: string | null;
  created_at: string;
}

interface StudentProgress {
  user_id: string;
  subject: string;
  topic: string;
  score: number | null;
  total_questions: number | null;
  correct_answers: number | null;
  study_time_minutes: number | null;
  created_at: string;
}

const mockStudents: StudentProfile[] = [
  { id: "1", full_name: "Aarav Patil", grade: "10", board: "SSC", created_at: "2026-03-10T10:00:00Z" },
  { id: "2", full_name: "Sana Shaikh", grade: "12", board: "HSC", created_at: "2026-03-11T10:00:00Z" },
  { id: "3", full_name: "Rohit Jadhav", grade: "10", board: "SSC", created_at: "2026-03-12T10:00:00Z" },
];

const mockProgress: StudentProgress[] = [
  { user_id: "1", subject: "Science", topic: "Motion", score: 72, total_questions: 10, correct_answers: 7, study_time_minutes: 35, created_at: "2026-03-10T10:00:00Z" },
  { user_id: "1", subject: "Mathematics", topic: "Algebra", score: 64, total_questions: 10, correct_answers: 6, study_time_minutes: 28, created_at: "2026-03-11T10:00:00Z" },
  { user_id: "2", subject: "Physics", topic: "Light", score: 81, total_questions: 10, correct_answers: 8, study_time_minutes: 31, created_at: "2026-03-12T10:00:00Z" },
  { user_id: "2", subject: "Chemistry", topic: "Atoms", score: 76, total_questions: 10, correct_answers: 8, study_time_minutes: 26, created_at: "2026-03-13T10:00:00Z" },
  { user_id: "3", subject: "English", topic: "Grammar", score: 52, total_questions: 10, correct_answers: 5, study_time_minutes: 20, created_at: "2026-03-14T10:00:00Z" },
  { user_id: "3", subject: "Hindi", topic: "Poetry", score: 58, total_questions: 10, correct_answers: 6, study_time_minutes: 24, created_at: "2026-03-15T10:00:00Z" },
];

const TeacherPanel = () => {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [allProgress, setAllProgress] = useState<StudentProgress[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    setStudents(mockStudents);
    setAllProgress(mockProgress);
    setLoadingData(false);
  }, []);

  const filteredStudents = students.filter((student) =>
    student.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = students.length;
  const totalAttempts = allProgress.length;
  const avgScoreAll = allProgress.length > 0
    ? Math.round(allProgress.reduce((sum, item) => sum + (item.score || 0), 0) / allProgress.length)
    : 0;

  const subjectStats = ["Science", "Mathematics", "Physics", "Chemistry", "English", "Hindi"].map((subject) => {
    const subjectProgress = allProgress.filter((item) => item.subject === subject);
    return {
      subject: subject.slice(0, 8),
      avg: subjectProgress.length > 0 ? Math.round(subjectProgress.reduce((sum, item) => sum + (item.score || 0), 0) / subjectProgress.length) : 0,
      count: subjectProgress.length,
    };
  }).filter((item) => item.count > 0);

  const studentProgress = selectedStudent
    ? allProgress.filter((item) => item.user_id === selectedStudent)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-1 font-heading text-3xl font-bold text-foreground">👨‍🏫 Teacher Panel</h1>
            <p className="font-body text-muted-foreground">Monitor student progress and class performance.</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 font-heading text-xs font-semibold text-primary">demo mode</span>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { icon: Users, label: "Students", value: totalStudents, color: "text-primary" },
            { icon: BarChart3, label: "Total Attempts", value: totalAttempts, color: "text-accent" },
            { icon: TrendingUp, label: "Class Avg", value: `${avgScoreAll}%`, color: "text-primary" },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card p-4 text-center shadow-[var(--shadow-card)]">
              <stat.icon className={`mx-auto mb-2 h-5 w-5 ${stat.color}`} />
              <div className="font-heading text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="font-heading text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {subjectStats.length > 0 && (
          <div className="mb-8 rounded-xl border bg-card p-5 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              Class Performance by Subject
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={subjectStats} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <XAxis dataKey="subject" tick={{ fontSize: 11, fontFamily: "Outfit" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontFamily: "Outfit", fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="avg" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Avg Score %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="rounded-xl border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
              <Users className="h-4 w-4 text-accent" />
              Students ({filteredStudents.length})
            </h2>
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="h-8 pl-8 font-heading text-xs" />
            </div>
          </div>

          {loadingData ? (
            <p className="py-8 text-center font-heading text-sm text-muted-foreground">Loading students...</p>
          ) : filteredStudents.length === 0 ? (
            <p className="py-8 text-center font-heading text-sm text-muted-foreground">No students found.</p>
          ) : (
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {filteredStudents.map((student) => {
                const progressItems = allProgress.filter((item) => item.user_id === student.id);
                const avg = progressItems.length > 0 ? Math.round(progressItems.reduce((sum, item) => sum + (item.score || 0), 0) / progressItems.length) : null;
                const isSelected = selectedStudent === student.id;

                return (
                  <div key={student.id}>
                    <button
                      onClick={() => setSelectedStudent(isSelected ? null : student.id)}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-all ${isSelected ? "border-primary bg-primary/5" : "bg-background hover:bg-secondary/50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-heading text-xs font-bold text-primary">
                          {student.full_name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-heading text-sm font-medium text-foreground">{student.full_name || "Unnamed"}</p>
                          <p className="font-heading text-[10px] text-muted-foreground">
                            {student.grade ? `Grade ${student.grade}` : "No grade"} • {student.board || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {avg !== null && (
                          <span className={`rounded-full px-2 py-0.5 font-heading text-[10px] font-semibold ${avg >= 60 ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}>
                            {avg}%
                          </span>
                        )}
                        <span className="font-heading text-[10px] text-muted-foreground">{progressItems.length} attempts</span>
                        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isSelected ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {isSelected && studentProgress.length > 0 && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-1 space-y-1.5 rounded-lg border bg-muted/30 p-3">
                        <p className="mb-2 font-heading text-xs font-semibold text-muted-foreground">Recent Activity</p>
                        {studentProgress.slice(0, 8).map((item, index) => (
                          <div key={index} className="flex items-center justify-between rounded bg-background px-2.5 py-1.5 text-xs">
                            <span className="font-heading text-foreground">{item.subject} — {item.topic}</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-heading font-semibold ${(item.score || 0) >= 60 ? "text-accent" : "text-destructive"}`}>
                                {item.score || 0}%
                              </span>
                              <span className="font-heading text-muted-foreground">
                                {item.correct_answers || 0}/{item.total_questions || 0}
                              </span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;

