// ── Exercise types ──

export type MuscleGroup =
  | "quadriceps"
  | "hamstrings"
  | "glutes"
  | "calves"
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "core"
  | "hip-abductors"
  | "hip-adductors"
  | "tibialis"
  | "forearms";

export type MovementPattern =
  | "squat"
  | "hinge"
  | "push-horizontal"
  | "push-vertical"
  | "pull-horizontal"
  | "pull-vertical"
  | "carry"
  | "core"
  | "plyometric";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type TransferDomain = "running" | "strength" | "athleticism";

export interface ExerciseMetadata {
  title: string;
  slug: string;
  category: MovementPattern;
  difficulty: Difficulty;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  equipment: string[];
  transfer: Record<TransferDomain, number>; // 1-5 rating
  summary: string;
  tags: string[];
}
