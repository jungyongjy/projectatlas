# 10_PROJECT_STRUCTURE.md

# Project Atlas

## Project Structure

**Version:** 1.1.0

**Status:** Finalised

**Purpose:** Define the complete repository structure, naming conventions, content organisation, asset management, and scaling strategy for Project Atlas.

---

# 1. Overview

Project Atlas follows a documentation-first architecture.

The repository is intentionally organised so that:

- handbook content is separate from code,
- reusable components remain isolated,
- future expansion requires minimal restructuring.

The repository should feel predictable.

A contributor should be able to locate any file within seconds.

---

# 2. Root Structure

```
atlas/

├── app/
├── components/
├── content/
├── docs/
├── lib/
├── public/
├── styles/
├── types/

├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── eslint.config.js
```

---

# 3. App Directory

```
app/

layout.tsx

page.tsx

globals.css

loading.tsx

not-found.tsx

error.tsx

favicon.ico
```

Feature routes

```
app/

blueprint/

running/

strength/

mobility/

nutrition/

exercise-library/

decision-engine/

scientific-appendix/

references/

version-history/
```

---

# 4. Components

```
components/

layout/

navigation/

documentation/

exercise/

running/

strength/

decision/

ui/

utilities/
```

Example

```
components/

layout/
    Sidebar.tsx
    Header.tsx
    Footer.tsx

navigation/
    Breadcrumb.tsx
    NavigationTree.tsx
    SearchButton.tsx

documentation/
    PageHeader.tsx
    CoachNote.tsx
    ScientificNote.tsx

exercise/
    ExerciseCard.tsx
    TransferRating.tsx

running/
    WorkoutCard.tsx
    PaceTable.tsx

strength/
    WeeklyProgramme.tsx

utilities/
    WeeklyChecklist.tsx
    VersionBadge.tsx
```

---

# 5. Content

Every handbook chapter should live inside MDX.

```
content/

blueprint/

running/

strength/

mobility/

nutrition/

exercise-library/

scientific/

references/
```

Example

```
content/running/

zone2.mdx

threshold.mdx

intervals.mdx

strides.mdx

norwegian-4x4.mdx

long-run.mdx

warm-up.mdx
```

---

# 6. Exercise Library

Every exercise receives its own page.

```
exercise-library/

pull-up.mdx

leg-press.mdx

bulgarian-split-squat.mdx

romanian-deadlift.mdx

hip-thrust.mdx

dragon-flag.mdx

pallof-press.mdx
```

This makes future additions trivial.

---

# 7. Images

Public assets

```
public/

images/

exercise/

mobility/

icons/

logos/

screenshots/
```

Mobility illustrations

```
public/images/mobility/

thoracic-rotation.webp

calf-stretch.webp

hip-flexor.webp

ankle-rocker.webp
```

Exercise illustrations

```
public/images/exercise/

pull-up.webp

leg-press.webp

hip-thrust.webp
```

Only royalty-free assets should be stored.

---

# 8. Documentation

Internal engineering documentation

```
docs/

00_PROJECT_OVERVIEW.md

01_PRODUCT_SPECIFICATION.md

...

10_PROJECT_STRUCTURE.md
```

Future additions

```
ARCHITECTURE_DECISIONS.md

ROADMAP.md

STYLE_GUIDE.md
```

---

# 9. Utility Functions

```
lib/

navigation.ts

search.ts

mdx.ts

reading-time.ts

metadata.ts

utils.ts
```

Every utility should solve one problem.

---

# 10. Types

```
types/

exercise.ts

navigation.ts

metadata.ts

search.ts

decision-tree.ts

version.ts
```

Avoid placing interfaces inside components.

---

# 11. Naming Conventions

Components

```
PascalCase

ExerciseCard.tsx
```

Files

```
kebab-case

zone2.mdx

hip-thrust.mdx
```

Hooks

```
camelCase

useSearch.ts
```

Constants

```
UPPER_SNAKE_CASE
```

---

# 12. Metadata

Every handbook page should expose metadata.

Example

```ts
export const metadata = {
    title: "...",
    description: "...",
    category: "...",
    tags: [...],
    readingTime: "...",
}
```

This supports:

- search
- navigation
- SEO
- table of contents

---

# 13. Navigation Configuration

Single source of truth

```
lib/navigation.ts
```

Example

```
Blueprint

Running

Strength

Mobility

Nutrition

Decision Engine

Exercise Library

Scientific Appendix

References

Version History
```

No duplicated navigation definitions.

---

# 14. Search Index

Generated from MDX.

```
MDX

↓

Metadata

↓

Fuse Index

↓

Search Results
```

No database required.

---

# 15. Static Assets

Prefer

SVG

WebP

AVIF

Avoid

Large PNGs

GIF animations

Unoptimised JPEGs

Target image size

<200 KB whenever practical.

---

# 16. Environment Variables

Atlas intentionally requires none.

Development

```
npm install

npm run dev
```

should work immediately.

---

# 17. Build Output

Target

Static export suitable for Vercel.

Generated pages should be cache-friendly and highly performant.

---

# 18. Scalability

Adding a new handbook chapter should require:

1. Create MDX.
2. Update navigation config.
3. Commit.

No component changes required.

---

# 19. Repository Health

Recommended files

```
README.md

CHANGELOG.md

LICENSE.md

CONTRIBUTING.md

CODE_OF_CONDUCT.md
```

These improve maintainability and onboarding.

---

# 20. Versioning

Repository tags

```
v1.0.0

v1.1.0

v2.0.0
```

Each tag should correspond to a documented release.

---

# 21. Definition of a Clean Repository

A healthy Atlas repository should satisfy:

✓ Predictable structure

✓ No duplicate content

✓ Clear ownership of files

✓ MDX separated from UI

✓ Small reusable components

✓ No dead code

✓ Consistent naming

✓ Easy navigation

---

# 22. Long-Term Maintenance

Repository growth should occur by:

- adding handbook pages,
- adding reusable components,
- refining documentation.

Avoid large-scale restructuring unless absolutely necessary.

The repository should evolve incrementally.

---

# Relationship to Other Documents

This document defines the physical organisation of the repository.

Together, Documents **00–10** provide a complete specification covering:

- Product vision
- User profile
- Training philosophy
- Technical architecture
- UI/UX
- Components
- Development workflow
- Repository structure

These documents collectively form the authoritative blueprint for building and maintaining Project Atlas.

---

**End of Document**