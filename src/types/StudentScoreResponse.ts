import type { SubjectScore } from "./SubjectScore";

export interface StudentScoreResponse {
  studentId: string;
  foreignId: string;
  scores: SubjectScore[];
}
