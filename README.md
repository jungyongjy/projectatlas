<div align="center">

<img src="/images/logos/atlas-icon.svg" width="96" height="96" alt="Atlas logo" />

# Project Atlas

**A documentation-first operating manual for long-term hybrid athletic development.**

Built for one athlete. Designed to last decades.

[![Version](https://img.shields.io/badge/version-1.0.1-4f8ef7)](https://github.com/jungyong/projectatlas)
[![Licence](https://img.shields.io/badge/licence-MIT-2ecc71)](https://github.com/jungyong/projectatlas/blob/main/LICENSE.md)
[![Framework](https://img.shields.io/badge/Next.js-16.2.12-000000?logo=next.js)](https://nextjs.org/)
[![Deployment](https://img.shields.io/badge/deployed-Vercel-000000?logo=vercel)](https://vercel.com/)

</div>

---

## What is Atlas?

Atlas is **not** a workout tracker, a fitness dashboard, or an AI coach. It is a handbook: a single source of truth for training decisions, programming rationale, and the science behind every recommendation.

Atlas answers three questions:

- **What should I do?** Every session, every exercise, every week.
- **Why am I doing it?** The rationale behind every programming decision.
- **How do I know if I should change it?** The decision frameworks and recovery signals that guide adjustment.

The project intentionally separates **knowledge** from **execution**. Workout logging belongs to specialised external tools (Hevy, Garmin, Fitbit, Bevel). Atlas owns the reasoning that sits above those tools.

## Philosophy

> Consistency beats optimisation.

Most athletes fail because they continuously search for better programmes rather than executing good ones consistently. Atlas intentionally prioritises sustainability over perfection. Every exercise, every running session, and every nutrition recommendation is evaluated against a single question:

**Will this still make sense five years from now?**

The programme is built on five principles:

1. **Train for decades**, sustainability above short-term gains
2. **The hybrid athlete**, meaningful competence across strength, endurance, and physique
3. **Minimum effective dose**, maximise adaptation per unit of fatigue
4. **High return on investment**, every exercise must justify its recovery cost
5. **Consistency over novelty**, progression through execution, not rotation

## Screenshots

| Homepage | Handbook | Exercise reference |
|----------|----------|--------------------|
| ![Homepage](/images/screenshots/homepage.png) | ![Handbook](/images/screenshots/handbook.png) | ![Exercise](/images/screenshots/exercise.png) |

## Features

- **Documentation-first handbook**, over 70 MDX pages spanning Blueprint, Running, Strength, Mobility, and Nutrition
- **Exercise Library**, reference pages for every exercise in the programme, with execution guides, transfer ratings, and coach notes
- **Decision Engine**, interactive if-then guidance for poor sleep, missed workouts, travel, and minor injuries
- **Scientific Appendix**, evidence summaries on concurrent training, hypertrophy, running economy, and recovery
- **Full-text search**, Fuse.js powered command palette (Ctrl + K) with weighted ranking
- **Weekly Checklist**, interactive progress tracking with local storage persistence
- **Version History**, a visual timeline of the handbook's evolution
- **Responsive documentation shell**, sidebar navigation, breadcrumbs, and table of contents
- **Print-optimised styles**, handbook pages render cleanly to paper or PDF
- **Accessible**, WCAG AA focus states, semantic HTML, and a skip-to-content link

## Architecture

Atlas is a fully static documentation application built on the Next.js App Router.

```
                ┌────────────────────────────┐
                │       Next.js App          │
                │  App Router + Turbopack    │
                └────────────┬───────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
  ┌─────▼─────┐       ┌──────▼──────┐      ┌──────▼──────┐
  │ MDX       │       │ Build-time  │      │ Client-side │
  │ content   │       │ search      │      │ search      │
  │ pipeline  │       │ index       │      │ (Fuse.js)   │
  └───────────┘       └─────────────┘      └─────────────┘
```

- **Static generation**, every handbook page is pre-rendered at build time from MDX via `generateStaticParams` and `next-mdx-remote`.
- **Single source of truth**, navigation lives in `lib/navigation.ts`; version history in `lib/version-data.ts`; decision trees in `lib/decision-data.ts`.
- **Design tokens**, a dark-only theme driven by CSS variables in `app/globals.css`, consumed through Tailwind utility classes.
- **No runtime backend**, no database, no authentication, no cloud sync. The handbook is a static bundle served from a CDN.

## Folder structure

```
atlas/
├── app/                  # Next.js App Router pages and layouts
│   └── (docs)/           # Handbook route group (sidebar + TOC shell)
├── components/
│   ├── layout/           # Sidebar, header, footer, docs shell
│   ├── navigation/       # Nav group, nav item, breadcrumb, search button
│   ├── documentation/    # TOC, callouts, page header, reference cards
│   ├── handbook/         # MDX component map, layout wrapper
│   ├── search/           # Command palette (Fuse.js)
│   └── ui/               # Shadcn UI primitives
├── content/              # All MDX handbook content
│   ├── blueprint/        # Philosophy, goals, principles, weekly schedule
│   ├── running/          # Zone 2 through race week
│   ├── strength/         # Programme, progression, exercise selection
│   ├── mobility/         # Body-region mobility guides
│   ├── nutrition/        # Protein through travel
│   ├── exercise-library/ # Individual exercise references
│   ├── decision-engine/  # Interactive decision trees
│   └── scientific/       # Evidence summaries
├── lib/                  # Navigation, search, MDX, and version utilities
├── types/                # Shared TypeScript interfaces
├── public/images/        # Branding, screenshots, and illustrations
└── docs/                 # Engineering specifications
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm 10 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/jungyong/projectatlas.git
cd projectatlas

# Install dependencies
npm install
```

### Local development

```bash
# Start the development server
npm run dev

# Open http://localhost:3000
```

### Production build

```bash
# Build for production
npm run build

# Start the production server
npm run start

# Lint and format
npm run lint
npm run format
```

## Technology stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | Next.js 16 (App Router, Turbopack)  |
| Language      | TypeScript (strict)                 |
| Styling       | Tailwind CSS v4 + shadcn/ui         |
| Icons         | Lucide                              |
| Content       | MDX (next-mdx-remote)               |
| Search        | Fuse.js (client-side)               |
| Components    | Base UI, cmdk                       |
| Deployment    | Vercel                              |

## Deployment

Atlas is designed to deploy as a fully static site on [Vercel](https://vercel.com/). No environment variables, no database, no server functions are required.

```bash
# Deploy with the Vercel CLI
vercel --prod
```

The production build is a static export of pre-rendered pages, so it can also be hosted on any static file server or CDN.

## Roadmap

The handbook is designed to evolve slowly and deliberately. Future work will refine rather than redesign:

- **Content depth**, expand running and mobility guidance with more detailed periodisation
- **Illustrations**, add instructional diagrams to exercise, mobility, and running pages
- **Search improvements**, refine result ranking and snippet quality
- **Reading experience**, continue to polish typography, spacing, and navigation

## Licence

[MIT](LICENSE.md)

---

*Train for decades. Not for Instagram.*
