# Changelog

All notable changes to Project Atlas are documented in this file.

Atlas follows [Semantic Versioning](https://semver.org/).

---

## [1.1.0]: 2026-08-02

### Added

- Current Programme page as the single source of truth for Full Body A and Full Body B, supersets, sets, and reps
- 22 instructional illustrations across the Exercise Library, mobility, running, and decision engine pages
- Documentation flow overview in the README

### Changed

- Aligned every handbook page to the final weekly schedule: gym Monday, Wednesday, Friday; hard run Tuesday; easy Zone 2 Thursday; long run Saturday; complete rest Sunday
- Updated the training philosophy to centre on maximum adaptation with minimum recoverable cost
- Polished the sidebar hierarchy, active indicators, table of contents, and handbook typography
- Weighted search ranking toward page title, headings, and tags

### Removed

- Dead components (Header, Breadcrumb) and unused UI primitives

### Notes

Version 1.1.0 completes the final refinement pass. The training programme is documented once in the Current Programme page and referenced everywhere else, so the handbook cannot drift from the programme.

---

## [1.0.1]: 2026-08-02

### Changed

- Aligned the strength programme to the canonical Full Body A and Full Body B templates
- Standardised the Exercise Library to 18 exercises with a consistent page template (Overview, Purpose, Execution, Common Mistakes, Running Transfer, Alternatives, Coach Notes, Scientific Notes)
- Applied British English spellings and removed em dashes across the entire handbook
- Rewrote the README as a professional open-source document with screenshots and architecture overview
- Improved search ranking priority: page title, headings, tags, then body content
- Polished the sidebar, table of contents, and handbook typography
- Moved AI documentation into `docs/internal` and replaced default Next.js assets

### Added

- Decline Crunch and Weighted Back Extension reference pages
- Version history timeline component
- Instructional illustrations for exercise, mobility, and running pages

### Fixed

- Resolved a hydration mismatch in the weekly checklist

### Notes

Version 1.0.1 is a refinement pass rather than a redesign. The training programme, architecture, and feature set remain unchanged; this release aligns the documentation with the canonical programme and applies consistent writing standards and polish throughout.

---

## [1.0.0]: 2026-08-01

### Added

- Complete Blueprint section (philosophy, goals, principles, weekly schedule)
- Running handbook (10 pages: Zone 2, threshold, intervals, Norwegian 4×4, strides, long run, warm-up, race week, FAQ, philosophy)
- Strength handbook (8 pages: philosophy, concurrent training, weekly programme, progression model, exercise selection, deload strategy, FAQ)
- Mobility handbook (7 pages: thoracic spine, calves, ankles, hips, warm-up, recovery)
- Nutrition handbook (9 pages: protein, calories, hydration, carbohydrates, supplements, meal timing, recovery, travel)
- Exercise Library (18 individual exercise pages with transfer ratings, execution guides, and coach notes)
- Decision Engine (7 interactive decision trees for common training scenarios)
- Scientific Appendix (8 evidence summaries with key references)
- References page (bibliography with authors, journals, and DOIs)
- Version History page (changelog and release notes)
- Interactive Weekly Checklist with localStorage persistence
- Full-text search powered by Fuse.js with Ctrl+K command palette
- Documentation shell with sidebar, breadcrumbs, table of contents, and responsive layout
- Dark theme UI inspired by professional software documentation
- Print-optimised styles for handbook pages
- Skip-to-content link and keyboard-accessible navigation
- WCAG AA compliant focus states and semantic HTML throughout

### Notes

Version 1.0 represents the complete initial release of the Atlas handbook. Every section specified in the product architecture (Documents 00–10) has been implemented. The application is built with Next.js 16 (App Router), TypeScript, TailwindCSS, shadcn/ui, MDX, and Fuse.js, deployed on Vercel.

The training system documented in this release reflects approximately 7 years of training experience, refined through evidence review and practical testing. Future versions will refine recommendations based on new evidence and experience rather than redesigning the system from scratch.

---
