# Changelog

All notable changes to Project Atlas are documented in this file.

Atlas follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2026-08-01

### Added

- Complete Blueprint section (philosophy, goals, principles, weekly schedule)
- Running handbook (10 pages: Zone 2, threshold, intervals, Norwegian 4×4, strides, long run, warm-up, race week, FAQ, philosophy)
- Strength handbook (8 pages: philosophy, concurrent training, weekly program, progression model, exercise selection, deload strategy, FAQ)
- Mobility handbook (7 pages: thoracic spine, calves, ankles, hips, warm-up, recovery)
- Nutrition handbook (9 pages: protein, calories, hydration, carbohydrates, supplements, meal timing, recovery, travel)
- Exercise Library (21 individual exercise pages with transfer ratings, execution guides, and coach notes)
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

Version 1.0 represents the complete initial release of the Atlas handbook. Every section specified in the product architecture (Documents 00–10) has been implemented. The application is built with Next.js 16 (App Router), TypeScript, TailwindCSS, shadcn/ui, MDX, and Fuse.js — deployed on Vercel.

The training system documented in this release reflects approximately 7 years of training experience, refined through evidence review and practical testing. Future versions will refine recommendations based on new evidence and experience rather than redesigning the system from scratch.

---
