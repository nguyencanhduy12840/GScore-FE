import type { SubjectScore } from "./SubjectScore";

export interface TopStudentResponse {
  studentId: string;
  foreignId: string;
  totalScore: number;
  scores: SubjectScore[];
}
