import type { VersionEntry } from "@/types/version";

export const versionHistory: VersionEntry[] = [
  {
    version: "1.0.0",
    date: "2026-08-01",
    summary: "Initial release of Project Atlas — the complete hybrid athlete handbook.",
    changes: [
      {
        type: "added",
        description: "Complete Blueprint section with philosophy, goals, principles, and weekly schedule",
      },
      {
        type: "added",
        description: "Running handbook with 10 pages covering all training modalities (Zone 2 through Race Week)",
      },
      {
        type: "added",
        description: "Strength handbook with 8 pages documenting the complete programming system",
      },
      {
        type: "added",
        description: "Mobility handbook with 7 pages organised by body region",
      },
      {
        type: "added",
        description: "Nutrition handbook with 9 pages of practical, evidence-informed guidance",
      },
      {
        type: "added",
        description: "Exercise Library with 21 individual exercise reference pages with transfer ratings",
      },
      {
        type: "added",
        description: "Decision Engine with 7 interactive decision trees for common training scenarios",
      },
      {
        type: "added",
        description: "Scientific Appendix with 8 evidence summaries supporting programming decisions",
      },
      {
        type: "added",
        description: "Interactive Weekly Checklist with localStorage persistence",
      },
      {
        type: "added",
        description: "Full-text search powered by Fuse.js with Ctrl+K command palette",
      },
      {
        type: "added",
        description: "Documentation shell with sidebar, breadcrumbs, table of contents, and responsive layout",
      },
      {
        type: "added",
        description: "Dark theme UI inspired by professional software documentation",
      },
    ],
    notes: "Version 1.0 represents the complete initial release of the Atlas handbook. Every section specified in the product architecture has been implemented. The application is deployed on Vercel and ready for long-term use.",
  },
];
