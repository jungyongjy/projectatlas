# Project Atlas

A documentation-first operating manual for long-term hybrid athletic development.

Built for one athlete. Designed to last decades.

## What is Atlas?

Atlas is **not** a workout tracker, a fitness dashboard, or an AI coach. It is a handbook — a single source of truth for training decisions, programming rationale, and the science behind every recommendation.

Atlas answers three questions:

- What should I do?
- Why am I doing it?
- How do I know if I should change it?

## Philosophy

> Consistency beats optimisation.

Most athletes fail because they continuously search for better programs rather than executing good ones consistently. Atlas intentionally prioritises sustainability over perfection.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (Strict) |
| Styling | TailwindCSS + shadcn/ui |
| Icons | Lucide |
| Content | MDX |
| Search | Fuse.js (client-side) |
| Deployment | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Format
npm run format
```

## Project Structure

```
app/          — Next.js App Router pages
components/   — Reusable UI components
content/      — MDX handbook content
lib/          — Utility functions
types/        — Shared TypeScript interfaces
public/       — Static assets
docs/         — Engineering specifications
```

## Features

- Documentation-first dark theme
- Sidebar navigation with nested sections
- Full-text search (Ctrl + K)
- MDX-powered handbook pages
- Exercise library with transfer ratings
- Decision engine (if-then guidance)
- Weekly checklist (local storage)
- Version history timeline
- Print-optimized styles
- WCAG AA accessible

## Explicit Non-Goals

Atlas intentionally does **not** include:

- Workout logging
- User authentication
- Cloud sync
- Social features
- AI chatbot
- Notifications
- Wearable integrations
- Macro tracking
- Progress analytics

These responsibilities belong to specialised external tools.

## Versioning

Atlas follows [Semantic Versioning](https://semver.org/).

## License

MIT

---

*Train for decades. Not for Instagram.*
