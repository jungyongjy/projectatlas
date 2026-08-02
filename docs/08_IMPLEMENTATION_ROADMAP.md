# 08_IMPLEMENTATION_ROADMAP.md

# Project Atlas

## Implementation Roadmap

**Version:** 1.1.0

**Status:** Finalised

**Purpose:** Define the complete development plan for Project Atlas from project initialization to Version 1.0 release.

---

# Overview

Atlas is intentionally built in sequential phases.

Each phase should leave the repository in a fully working state.

Avoid building multiple major systems simultaneously.

Every phase should end with:

- a working application
- passing lint
- passing build
- committed to Git

---

# Guiding Principles

Development follows four rules.

### Rule 1

Finish one layer before starting the next.

---

### Rule 2

Never leave the project in a broken state.

---

### Rule 3

Commit frequently.

---

### Rule 4

Documentation grows alongside the application.

---

# Phase 0, Project Initialization

## Objective

Create the engineering foundation.

---

## Deliverables

- Next.js 15 project
- TypeScript
- TailwindCSS
- shadcn/ui
- ESLint
- Prettier
- Husky
- GitHub repository
- Initial README

---

## Folder Structure

```
app/
components/
content/
lib/
types/
public/
docs/
```

---

## Acceptance Criteria

- Project builds.
- Lint passes.
- Runs locally.
- Ready for development.

---

## Suggested Commit

```
chore: initialize Project Atlas
```

---

# Phase 1, Documentation Shell

## Objective

Create the documentation website framework.

---

## Deliverables

- Sidebar
- Header
- Footer
- Breadcrumb
- Responsive layout
- Typography
- Dark theme
- Navigation configuration

---

## Acceptance Criteria

Users can navigate between placeholder pages.

---

## Suggested Commit

```
feat: create documentation shell
```

---

# Phase 2, Handbook Engine

## Objective

Implement MDX-powered documentation.

---

## Deliverables

- MDX support
- Page templates
- Automatic metadata
- Table of contents
- Reading time
- Markdown rendering

---

## Acceptance Criteria

Adding a new MDX file automatically creates a handbook page.

---

## Suggested Commit

```
feat: implement handbook engine
```

---

# Phase 3, Search

## Objective

Implement local handbook search.

---

## Deliverables

- Fuse.js
- Ctrl + K
- Search dialog
- Keyboard navigation
- Highlighted matches

---

## Acceptance Criteria

Search returns relevant handbook pages instantly.

---

## Suggested Commit

```
feat: add global handbook search
```

---

# Phase 4, Blueprint Section

## Objective

Implement Blueprint handbook.

---

## Deliverables

- Philosophy
- Goals
- Vision
- Principles

---

## Acceptance Criteria

Blueprint section complete.

---

## Suggested Commit

```
feat: add blueprint handbook
```

---

# Phase 5, Running Handbook

## Objective

Complete running documentation.

---

## Deliverables

- Zone 2
- Threshold
- Intervals
- Norwegian 4×4
- Long Run
- Strides
- Race Week
- Warm-up

---

## Acceptance Criteria

Running handbook complete.

---

## Suggested Commit

```
feat: complete running handbook
```

---

# Phase 6, Strength Handbook

## Objective

Document the finalised training programme.

---

## Deliverables

- Training philosophy
- Weekly split
- Exercise selection
- Progression
- Deload
- Concurrent training

---

## Acceptance Criteria

Strength handbook complete.

---

## Suggested Commit

```
feat: complete strength handbook
```

---

# Phase 7, Mobility Handbook

## Objective

Implement mobility reference.

---

## Deliverables

- Thoracic mobility
- Hip mobility
- Ankle mobility
- Calf mobility
- Warm-up
- Recovery

Include royalty-free illustrations where appropriate.

---

## Acceptance Criteria

Every mobility routine documented.

---

## Suggested Commit

```
feat: add mobility handbook
```

---

# Phase 8, Nutrition Handbook

## Objective

Document nutritional strategy.

---

## Deliverables

- Protein
- Calories
- Hydration
- Carbohydrates
- Supplements
- Meal timing
- Recovery nutrition

---

## Acceptance Criteria

Nutrition handbook complete.

---

## Suggested Commit

```
feat: complete nutrition handbook
```

---

# Phase 9, Exercise Library

## Objective

Build reusable exercise reference pages.

---

## Deliverables

One page per exercise.

Each includes:

- Overview
- Purpose
- Muscles
- Execution
- Common mistakes
- Running transfer
- Alternatives
- Coach notes

---

## Acceptance Criteria

Exercise library populated with all exercises in the finalised programme.

---

## Suggested Commit

```
feat: build exercise library
```

---

# Phase 10, Decision Engine

## Objective

Implement practical decision trees.

---

## Deliverables

Examples include:

- Poor sleep
- Missed workout
- Minor injury
- Travel
- Busy work week
- Race week
- Sick day

---

## Acceptance Criteria

Decision trees function correctly and are easy to navigate.

---

## Suggested Commit

```
feat: implement decision engine
```

---

# Phase 11, Scientific Appendix

## Objective

Add evidence summaries.

---

## Deliverables

Topics include:

- Concurrent training
- Hypertrophy
- Running economy
- Plyometrics
- Protein
- Recovery
- Mobility
- Deloads

---

## Acceptance Criteria

Scientific appendix complete.

---

## Suggested Commit

```
feat: add scientific appendix
```

---

# Phase 12, Weekly Checklist

## Objective

Implement the only interactive feature.

---

## Deliverables

Checklist items:

- Gym ×3
- Run ×3
- Mobility
- Sleep
- Hydration
- Protein
- Recovery Review

Persist via Local Storage.

---

## Acceptance Criteria

Checklist state persists after refresh.

---

## Suggested Commit

```
feat: add weekly checklist
```

---

# Phase 13, Version History

## Objective

Track project evolution.

---

## Deliverables

Timeline page showing:

- Version
- Date
- Summary
- Major changes

---

## Acceptance Criteria

Version history automatically supports future releases.

---

## Suggested Commit

```
feat: add version history
```

---

# Phase 14, Polish & Accessibility

## Objective

Refine the experience.

---

## Deliverables

- WCAG AA compliance
- Keyboard navigation
- Focus states
- Responsive refinements
- Print styles
- Lighthouse optimisation

---

## Acceptance Criteria

Target Lighthouse scores:

| Metric | Target |
|---------|--------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## Suggested Commit

```
refactor: improve accessibility and performance
```

---

# Phase 15, Release v1.0

## Objective

Prepare the first public release.

---

## Deliverables

- README updated
- CHANGELOG created
- LICENSE
- Screenshots
- GitHub release
- Vercel deployment

---

## Acceptance Criteria

Repository is production-ready.

---

## Suggested Commit

```
release: version 1.0.0
```

---

# Git Workflow

Recommended branching strategy:

```
main

└── feature/documentation-shell

└── feature/handbook

└── feature/search

└── feature/exercise-library

└── feature/checklist
```

Merge using squash commits.

Keep `main` deployable at all times.

---

# Versioning Strategy

Atlas follows Semantic Versioning.

Examples:

```
1.0.0

1.1.0

1.2.0

2.0.0
```

---

# Changelog Format

Each release should include:

```
Added

Changed

Fixed

Removed

Notes
```

---

# Pull Request Checklist

Before merging:

- [ ] Project builds successfully
- [ ] ESLint passes
- [ ] No console errors
- [ ] Responsive layout verified
- [ ] Accessibility checked
- [ ] Documentation updated
- [ ] Screenshots updated (if UI changed)

---

# Definition of Version 1.0

Atlas v1.0 is complete when:

- Documentation shell is finished.
- Every handbook section is implemented.
- Search is operational.
- Exercise library is complete.
- Decision engine works.
- Weekly checklist functions locally.
- Version history exists.
- Lighthouse goals are achieved.
- Successfully deployed to Vercel.

No additional features are required before release.

---

# Post-v1.0 Roadmap (Future)

Potential future enhancements:

- Equipment reviews
- Annual training review
- Race planning templates
- Injury log
- Travel workout guide
- Printable PDF handbook
- Multi-language support

These are intentionally **out of scope** for Version 1.0.

---

# Relationship to Other Documents

This roadmap translates the preceding specifications into a practical development sequence.

Together, Documents 00–08 form the complete specification required for another engineer or AI coding assistant to build Project Atlas with minimal ambiguity.

---

**End of Document**