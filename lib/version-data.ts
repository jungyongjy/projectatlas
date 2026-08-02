import type { VersionEntry } from "@/types/version";

export const versionHistory: VersionEntry[] = [
  {
    version: "1.1.0",
    date: "2026-08-02",
    summary: "Final refinement pass: canonical programme source of truth, schedule alignment, and documentation polish.",
    changes: [
      {
        type: "added",
        description: "Introduced the Current Programme page as the single source of truth for Full Body A and Full Body B, supersets, sets, and reps",
      },
      {
        type: "changed",
        description: "Aligned every handbook page to the final weekly schedule: gym Monday, Wednesday, Friday; hard run Tuesday; easy Zone 2 Thursday; long run Saturday; complete rest Sunday",
      },
      {
        type: "changed",
        description: "Updated the training philosophy to centre on maximum adaptation with minimum recoverable cost",
      },
      {
        type: "added",
        description: "Added 22 instructional illustrations across the Exercise Library, mobility, running, and decision engine pages",
      },
      {
        type: "changed",
        description: "Polished the sidebar hierarchy, active indicators, table of contents, and handbook typography",
      },
      {
        type: "changed",
        description: "Improved the README with a documentation flow overview",
      },
      {
        type: "removed",
        description: "Removed dead components and unused UI primitives to keep the codebase lean",
      },
    ],
    notes: "Version 1.1.0 completes the final refinement pass. The training programme is now documented once in the Current Programme page and referenced everywhere else, so the handbook cannot drift from the programme. The schedule, philosophy, and illustrations are aligned with the canonical system.",
  },
  {
    version: "1.0.1",
    date: "2026-08-02",
    summary: "Refinement pass: canonical programme alignment, writing standards, and documentation polish.",
    changes: [
      {
        type: "changed",
        description: "Aligned the strength programme to the canonical Full Body A and Full Body B templates",
      },
      {
        type: "changed",
        description: "Standardised the Exercise Library to 18 exercises with a consistent page template",
      },
      {
        type: "added",
        description: "New Decline Crunch and Weighted Back Extension reference pages",
      },
      {
        type: "changed",
        description: "Applied British English spellings and removed em dashes across the entire handbook",
      },
      {
        type: "added",
        description: "Rewrote the README as a professional open-source document",
      },
      {
        type: "added",
        description: "Introduced a visual version history timeline component",
      },
      {
        type: "changed",
        description: "Improved search ranking priority: page title, headings, tags, then body content",
      },
      {
        type: "changed",
        description: "Polished the sidebar, table of contents, and handbook typography",
      },
      {
        type: "added",
        description: "Added instructional illustrations to exercise, mobility, and running pages",
      },
      {
        type: "changed",
        description: "Moved AI documentation into docs/internal and replaced default Next.js assets",
      },
      {
        type: "fixed",
        description: "Resolved a hydration mismatch in the weekly checklist",
      },
    ],
    notes: "Version 1.0.1 is a refinement pass rather than a redesign. The training programme, architecture, and feature set remain unchanged; this release aligns the documentation with the canonical programme and applies consistent writing standards and polish throughout.",
  },
  {
    version: "1.0.0",
    date: "2026-08-01",
    summary: "Initial release of Project Atlas, the complete hybrid athlete handbook.",
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
        description: "Exercise Library with 18 individual exercise reference pages with transfer ratings",
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
