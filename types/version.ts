// ── Version types ──

export type VersionChangeType = "added" | "changed" | "fixed" | "removed";

export interface VersionChange {
  type: VersionChangeType;
  description: string;
}

export interface VersionEntry {
  version: string;
  date: string;
  summary: string;
  changes: VersionChange[];
  breakingChanges?: string[];
  notes?: string;
}
