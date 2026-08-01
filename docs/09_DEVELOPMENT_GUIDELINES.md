# 09_DEVELOPMENT_GUIDELINES.md

# Project Atlas

## Development Guidelines

**Version:** 1.0.0

**Status:** Finalised

**Purpose:** Define the engineering standards, coding conventions, Git workflow, review process, and long-term maintenance philosophy for Project Atlas.

---

# 1. Philosophy

Project Atlas is designed to outlive individual technologies.

The codebase should remain understandable and maintainable years after its initial implementation.

The guiding principle is:

> **Optimise for readability before cleverness.**

Future contributors should understand a feature within minutes rather than hours.

---

# 2. Engineering Principles

Every contribution should satisfy the following principles.

### Simplicity

Prefer the simplest solution that solves the problem.

---

### Consistency

Follow existing patterns.

Do not introduce new paradigms without strong justification.

---

### Predictability

Components should behave exactly as expected.

Avoid surprising side effects.

---

### Scalability

Adding a new handbook page should require minimal engineering work.

---

### Maintainability

Every line of code has a future maintenance cost.

Keep that cost low.

---

# 3. Coding Standards

## Language

TypeScript

Strict Mode enabled.

Avoid:

```
any
```

Prefer:

```
unknown

generic types

explicit interfaces
```

---

## React

Prefer:

Functional Components

Server Components where appropriate

Small components

Pure rendering

Avoid:

Large page components

Nested conditional rendering

Business logic inside JSX

---

## Naming

### Components

```
ExerciseCard.tsx

WorkoutCard.tsx

CoachNote.tsx
```

---

### Hooks

```
useSearch.ts

useChecklist.ts
```

---

### Utilities

```
search.ts

mdx.ts

navigation.ts
```

---

### Types

```
exercise.ts

navigation.ts
```

---

### Content

```
zone2.mdx

pull-up.mdx
```

---

# 4. Folder Ownership

Each folder has a single responsibility.

```
app/

Application routing

components/

Reusable UI

content/

Handbook content

lib/

Utilities

types/

Shared interfaces

public/

Images and assets

docs/

Project documentation
```

Never blur responsibilities.

---

# 5. Component Rules

Every component must:

- Solve one problem.
- Accept typed props.
- Avoid business logic.
- Remain reusable.
- Be independently testable.

If a component exceeds ~250 lines, consider splitting it.

---

# 6. Styling Standards

Use:

TailwindCSS utilities.

Avoid:

Large CSS files.

Inline styles.

!important.

Global overrides.

If styling is repeated more than three times, extract it into a reusable component.

---

# 7. MDX Standards

Every handbook page should include:

1. Overview
2. Why It Matters
3. Practical Application
4. Common Mistakes
5. Coach Notes
6. Scientific Notes
7. References (when applicable)

This structure should remain consistent across Atlas.

---

# 8. Imports

Order imports consistently.

```
React

↓

Third-party libraries

↓

Internal components

↓

Utilities

↓

Types

↓

Styles
```

Avoid circular dependencies.

---

# 9. Comments

Good code should explain **how**.

Comments should explain **why**.

Avoid redundant comments.

Bad:

```ts
// Increment count
count++
```

Good:

```ts
// Required because Fuse.js expects a zero-based index.
```

---

# 10. Error Handling

Errors should fail gracefully.

Avoid application crashes.

Examples:

Missing MDX → Show fallback page.

Missing image → Show placeholder.

Broken reference → Log warning.

---

# 11. Accessibility Standards

Every new component must support:

- Keyboard navigation
- Screen readers
- Focus visibility
- Semantic HTML
- WCAG AA contrast

Accessibility is not a later enhancement.

It is part of the definition of done.

---

# 12. Performance Standards

Every feature should consider:

- Bundle size
- Render performance
- Static generation
- Lazy loading where appropriate

Avoid introducing dependencies for small problems.

---

# 13. Git Workflow

Recommended flow:

```
main

↓

feature branch

↓

Pull Request

↓

Review

↓

Squash Merge
```

Never develop directly on `main`.

---

# 14. Commit Message Convention

Follow Conventional Commits.

Examples:

```
feat: add handbook search

fix: correct sidebar collapse

docs: update running handbook

refactor: simplify navigation

style: improve spacing

test: add search tests

chore: update dependencies
```

---

# 15. Pull Request Checklist

Every PR should answer:

- What changed?
- Why was it changed?
- Any breaking changes?
- Screenshots (if UI changed)
- Documentation updated?

---

# 16. Code Review Checklist

Before approving code:

### Architecture

- Single responsibility?
- Reusable?
- Matches project structure?

---

### Readability

- Clear names?
- Easy to understand?
- Minimal complexity?

---

### Accessibility

- Keyboard support?
- Semantic HTML?
- Focus states?

---

### Performance

- Avoid unnecessary renders?
- Avoid heavy dependencies?
- Static where possible?

---

### Documentation

- Comments where needed?
- MDX updated?
- Changelog updated?

---

# 17. Dependency Policy

Before adding a dependency ask:

1. Can this be implemented in <100 lines?

2. Is the dependency actively maintained?

3. Does it significantly increase bundle size?

4. Is it likely to remain useful long-term?

If the answer to any is "No", reconsider.

---

# 18. Version Control

Atlas follows Semantic Versioning.

```
MAJOR.MINOR.PATCH
```

Examples:

```
1.0.0

1.1.0

1.1.1

2.0.0
```

---

# 19. Changelog

Every release should update:

```
CHANGELOG.md
```

Format:

```
## Added

## Changed

## Fixed

## Removed
```

---

# 20. Documentation Ownership

Every engineering change should update documentation if it changes:

- behaviour
- architecture
- navigation
- public interfaces

Documentation should never become outdated.

---

# 21. Future Contributors

Future contributors (human or AI) should:

- Read Documents 00–09 before making architectural changes.
- Follow existing conventions.
- Avoid redesigning completed systems without strong evidence.
- Keep Atlas documentation-first.

---

# 22. Definition of Done

A feature is complete when:

- Code is readable.
- TypeScript passes.
- ESLint passes.
- Build succeeds.
- Responsive layout verified.
- Accessibility verified.
- Documentation updated.
- Changelog updated (if applicable).
- Code reviewed.

---

# 23. Long-Term Vision

Atlas should remain:

- Fast
- Stable
- Easy to maintain
- Documentation-first
- Framework-agnostic where practical

The project should evolve through incremental refinement rather than periodic rewrites.

---

# Final Principle

Every engineering decision should answer one question:

> **"Will this make Atlas easier to maintain five years from now?"**

If the answer is no, reconsider the implementation.

---

**End of Document**