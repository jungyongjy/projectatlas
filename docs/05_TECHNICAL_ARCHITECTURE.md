# 05_TECHNICAL_ARCHITECTURE.md

# Project Atlas

## Technical Architecture

**Version:** 1.0.0

**Status:** Finalised

**Purpose:** Define the software architecture, engineering principles, project structure, and implementation standards for Project Atlas.

---

# 1. Philosophy

Project Atlas is intentionally engineered as a **static documentation website** rather than a web application.

The architecture prioritises:

- simplicity
- maintainability
- performance
- scalability
- readability

Every engineering decision should reduce future maintenance cost.

---

# 2. Architecture Principles

Atlas follows several non-negotiable engineering principles.

## 1. Content First

Knowledge should live separately from UI.

Never embed large handbook content inside React components.

Instead:

```
MDX Content

↓

Content Loader

↓

Reusable Components

↓

Rendered UI
```

This allows handbook updates without modifying application logic.

---

## 2. Static First

Atlas should use Static Site Generation (SSG) wherever possible.

Reasons:

- Faster loading
- Better SEO
- Lower hosting costs
- Simpler deployment
- Improved reliability

Dynamic rendering should only be introduced if absolutely necessary.

---

## 3. Component Driven

Every reusable UI element should exist as an independent component.

Example:

```
Sidebar

Search Dialog

Table of Contents

Exercise Card

Info Box

Warning Box

Checklist

Version Badge

Breadcrumb

Callout

Decision Tree
```

Avoid duplicated JSX.

---

## 4. Separation of Concerns

Never mix:

- business logic
- styling
- content
- utility functions

Example:

```
components/
    ExerciseCard.tsx

content/
    exercises/
        pullup.mdx

lib/
    search.ts

types/
    exercise.ts
```

---

## 5. Progressive Enhancement

Atlas should remain usable even when JavaScript fails.

Navigation and content should degrade gracefully.

---

# 3. Tech Stack

## Framework

Next.js 15

App Router

---

## Language

TypeScript

Strict Mode enabled.

---

## Styling

TailwindCSS

Avoid inline styling.

---

## UI

shadcn/ui

Only where useful.

Do not overuse components simply because they exist.

---

## Icons

Lucide

Primary icon library.

---

## Content

MDX

Each handbook page should be stored independently.

---

## Search

Fuse.js

Entirely client-side.

---

## Deployment

Vercel

No server required.

---

# 4. Directory Structure

```
atlas/

app/

components/

content/

lib/

public/

styles/

types/

docs/

README.md

CHANGELOG.md

LICENSE.md

package.json
```

---

# 5. Recommended Folder Structure

```
app/

layout.tsx

page.tsx

blueprint/

running/

strength/

mobility/

nutrition/

decision-engine/

exercise-library/

scientific-appendix/

references/

version-history/
```

---

## Components

```
components/

layout/

navigation/

search/

ui/

cards/

handbook/

decision-tree/

exercise/

checklist/

version/
```

Each directory should contain only related components.

---

## Content

```
content/

blueprint/

running/

strength/

mobility/

nutrition/

decision-engine/

exercise-library/

scientific/

references/
```

Every chapter should exist as an independent MDX document.

---

## Lib

```
lib/

search.ts

mdx.ts

utils.ts

constants.ts

navigation.ts
```

---

## Types

```
types/

exercise.ts

navigation.ts

version.ts

decision-tree.ts

handbook.ts
```

---

# 6. State Management

Atlas intentionally avoids global state libraries.

Do NOT use:

- Redux
- Zustand
- MobX

Instead use:

React state

Context (only where necessary)

Local Storage

This keeps complexity extremely low.

---

# 7. Data Flow

```
MDX

↓

Loader

↓

Parser

↓

Component

↓

Page
```

No database.

No API.

No backend.

---

# 8. Local Storage

Only two features require persistence.

## Weekly Checklist

```
atlas-weekly-checklist
```

---

## Theme Preference (Future)

```
atlas-theme
```

No other persistent storage should exist.

---

# 9. Routing

Use App Router.

Example

```
/

running

running/zone2

running/threshold

strength

mobility

nutrition

exercise-library/pull-up

references

version-history
```

URLs should remain clean.

---

# 10. MDX Strategy

Every handbook page should be an MDX file.

Example

```
running/

zone2.mdx

threshold.mdx

strides.mdx
```

Never combine unrelated content into one massive file.

---

# 11. Component Philosophy

Every component should have one responsibility.

Good example

```
ExerciseCard

only displays exercise information.
```

Bad example

```
ExerciseCard

loads content

updates state

fetches search

renders navigation

contains styling

contains business logic
```

---

# 12. Styling Philosophy

Tailwind utilities only.

Avoid:

Custom CSS unless reusable.

Avoid:

!important

Avoid:

Large CSS files.

---

# 13. Typography

Fonts

Inter

JetBrains Mono

Content width

Approximately 70–80 characters per line.

Documentation should remain comfortable to read for long periods.

---

# 14. Performance Targets

Target:

First Contentful Paint

<1.5 s

Largest Contentful Paint

<2.5 s

JavaScript bundle

As small as practical.

Avoid unnecessary dependencies.

---

# 15. Accessibility

Every page should include:

Semantic headings

Keyboard navigation

Visible focus states

Accessible colour contrast

ARIA labels where appropriate

Images require descriptive alt text.

---

# 16. Search Architecture

```
MDX Files

↓

Metadata

↓

Fuse.js Index

↓

Ctrl + K Dialog

↓

Results
```

The search index should be generated locally.

No remote service.

---

# 17. Navigation

Navigation should be generated from a configuration object.

Avoid manually maintaining links inside multiple components.

Example

```
navigation.ts

↓

Sidebar

↓

Breadcrumb

↓

Search
```

Single source of truth.

---

# 18. Error Handling

Unknown routes

↓

404 page

Missing MDX

↓

Graceful fallback

Malformed content

↓

Developer warning

Application should never crash because of handbook content.

---

# 19. Future Scalability

The architecture should support future additions such as:

- Equipment Guide
- Race Strategy
- Annual Review
- Travel Training
- Injury Management

without restructuring the application.

---

# 20. Code Philosophy

Prefer:

Explicit code

Readable code

Small files

Predictable naming

Avoid:

Premature optimisation

Over-engineering

Deep inheritance

Complex abstractions

---

# 21. Naming Conventions

Components

```
ExerciseCard.tsx
```

Pages

```
page.tsx
```

Hooks

```
useSearch.ts
```

Utilities

```
search.ts
```

Types

```
exercise.ts
```

MDX

```
zone2.mdx
```

Use consistent PascalCase and kebab-case according to Next.js conventions.

---

# 22. Deployment

Deployment target:

Vercel

Requirements:

- Zero configuration
- Static generation
- No environment variables
- No backend services

Deployment should be possible directly from GitHub.

---

# 23. Future AI Assistance

Atlas is intentionally designed so AI coding assistants can contribute safely.

By separating:

- content
- UI
- logic
- utilities

future AI tools can modify individual areas without affecting unrelated systems.

This modularity is a deliberate architectural goal.

---

# 24. Definition of Done

The technical architecture is considered complete when:

- All handbook content is MDX-based.
- Navigation is configuration-driven.
- Components are reusable.
- No duplicated business logic exists.
- Lighthouse targets are achieved.
- The project deploys successfully to Vercel.
- Folder structure remains clean and scalable.

---

# Relationship to Other Documents

This document defines **how Atlas is engineered**.

Subsequent documents define:

- **06_UI_UX_GUIDELINES.md**: visual language and interaction design.
- **07_COMPONENT_SPECIFICATION.md**: detailed component catalogue.
- **08_IMPLEMENTATION_ROADMAP.md**: phased development strategy.

All implementation decisions should conform to the architectural principles established here.

---

**End of Document**