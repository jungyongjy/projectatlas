# Visual & Content Polish Pass (Final) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Atlas read like a single, professionally designed handbook — fix every markdown-rendering defect, replace the illustration system with a unified SVG figure kit, standardise tables/callouts/references/typography, and pass a final visual-consistency audit.

**Architecture:** Atlas is a Next.js 16 App Router site that compiles MDX at runtime via `next-mdx-remote/rsc` (`lib/mdx.ts`) into styled React via a central component map (`components/handbook/mdx-components.tsx`). All content lives in `content/**/*.mdx`. The two largest defects are root causes, not per-page typos: (1) `lib/mdx.ts` passes **empty remark/rehype plugin arrays**, so no table parses (GFM off), no heading has an `id` (slug off → TOC broken), and there are no anchor links; (2) the illustration system is 32 hand-coded stick-figure SVGs with no shared drawing logic. The plan fixes the pipeline once, then swaps the illustration system for a parameterised SVG figure kit drawn from a single set of constants, then sweeps content presentation (tables → cards, citations → reference cards, callouts unified) and closes with a build-verified consistency audit.

**Tech Stack:** Next.js 16.2.12, React 19, TypeScript, Tailwind v4 (CSS-first, tokens in `app/globals.css` `@theme`/`:root`), `@mdx-js/mdx` v3 + `next-mdx-remote` v6, `remark-gfm` v4, `rehype-slug` v6, `rehype-autolink-headings` v7, `lucide-react` icons, `fuse.js` search. Dark theme only.

## Global Constraints

- **Do NOT redesign the app**: no new pages, no routing changes, no navigation changes, no new features, no changes to the training programme or handbook content beyond presentation.
- **Architecture is stable** — the fix surface is `lib/mdx.ts`, `components/handbook/mdx-components.tsx`, `components/documentation/*`, `components/illustrations/*` (new), `app/globals.css`, and `content/**/*.mdx` (presentation only). Do not touch `app/**` routing, `components/layout/**`, `lib/navigation*`, or `components/checklist/**`.
- **Dark theme only** (permanent). Design tokens (from `app/globals.css`): accent `#4f8ef7`, success `#2ecc71`, warning `#f39c12`, error `#e74c3c`, bg `#0b0b0b`, surface `#161616`, hover `#1f1f1f`, border `#2a2a2a`, text-primary `#f5f5f5`, text-secondary `#b8b8b8`, text-muted `#7a7a7a`.
- **Typography**: Inter (sans) / JetBrains Mono (mono) via `next/font/google` (`--font-inter`, `--font-jetbrains-mono`). SVG labels use JetBrains Mono.
- **AGENTS.md**: this is a modified Next.js; before using any Next.js API not already present in this codebase, read `node_modules/next/dist/docs/` for the relevant guide.
- **Every task ends with a verified deliverable** — see "Verification loops" below. Never mark a task complete with the build failing.
- Commit after each task with a descriptive message ending in the Co-Authored-By trailer.

## Verification Loops (used throughout)

Two project-local checks are added in Task 1 and reused by later tasks.

1. **`npm run lint`** — eslint must pass with zero errors.
2. **`npm run build`** — production build must succeed.
3. **`node scripts/check-mdx.mjs`** (created Task 1) — asserts every `.mdx` file compiles under the enabled plugins without exposing raw pipes/underscored heading IDs, and that table/heading nodes are produced. Fail = a rendering defect.
4. **Visual**: `npm run dev`, open `http://localhost:3000/<route>`, verify in browser. For every illustration task, render the target page and confirm the figure is anatomically coherent, on-grid, and consistent with the kit.

Reference figure (route → file): exercise `romanian-deadlift`, mobility `hips`, running `zone-2`, `decision-engine`.

---

### Task 1: Enable the MDX remark/rehype pipeline (root-cause rendering fix)

**Files:**
- Modify: `lib/mdx.ts:143-149` (plugin arrays)
- Create: `scripts/check-mdx.mjs`
- Modify: `package.json` (`"check:mdx"` script)

**Interfaces:**
- Produces: script `node scripts/check-mdx.mjs` — exits 0 when every MDX file's compiled output contains a `table` node for at least one table-typed input and heading nodes carry `id`s; exits 1 otherwise. Used by all later tasks as a regression gate.

**Why:** `lib/mdx.ts` currently passes `remarkPlugins: []` and `rehypePlugins: []`. Verified: with empty plugins, `| A | B |` compiles to a paragraph whose text is literally `| A | B |\n|---|---|\n| 1 | 2 |` — every table on the site renders as raw pipe characters. `rehype-slug` missing means headings have no `id`, so `TableOfContents` (which queries `article h2[id], article h3[id]`) renders nothing on every page. These are the two highest-impact defects in the spec.

- [ ] **Step 1: Import the plugins in `lib/mdx.ts`**

Add at the top of `lib/mdx.ts`:

```ts
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
```

- [ ] **Step 2: Wire them into `getMdxPage`**

Replace the empty plugin arrays (`lib/mdx.ts:145-148`):

```ts
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
```

Leave `rehype-pretty-code` deliberately disabled (it requires theme configuration and the handbook has almost no code blocks; enabling it would risk build errors for zero visual benefit).

- [ ] **Step 3: Create the regression script `scripts/check-mdx.mjs`**

```js
// scripts/check-mdx.mjs
// Verifies every MDX file compiles with the enabled pipeline and that
// tables produce real <table> nodes and headings carry ids.
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const root = join(process.cwd(), "content");
let failures = 0;
let checked = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".mdx")) {
      checked++;
      const src = readFileSync(full, "utf-8");
      const body = src.replace(/^---[\s\S]*?\n---/, "");
      const hasTableMarkup = /\|.*\|\s*\n\s*\|[-:| ]+\|/.test(body);
      try {
        const vfile = await compile(body, {
          outputFormat: "function-body",
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        });
        const out = String(vfile);
        if (hasTableMarkup && !out.includes("table:")) {
          failures++;
          console.log(`FAIL: ${full} — table markup does not produce a table node`);
        }
        if (/\b[A-Za-z][^`]*\b/.test(body) && !/<h[1-6][^>]*id=/.test(out)) {
          failures++;
          console.log(`FAIL: ${full} — headings carry no id`);
        }
      } catch (e) {
        failures++;
        console.log(`FAIL: ${full} — ${e.message}`);
      }
    }
  }
}
walk(root);
console.log(`Checked ${checked} files, ${failures} failures.`);
process.exit(failures ? 1 : 0);
```

- [ ] **Step 4: Add the npm script**

In `package.json` `"scripts"`, add: `"check:mdx": "node scripts/check-mdx.mjs"`.

- [ ] **Step 5: Run the gate**

Run: `node scripts/check-mdx.mjs` and `npm run lint`.
Expected: script exits 0 for all files; lint clean.

- [ ] **Step 6: Verify tables + TOC render**

Run: `npm run dev`; open `/exercise-library/romanian-deadlift`.
Expected: the Parameter table renders as a real bordered table (no literal `|`); the `2.4 km` TOC in the right rail shows the page's `##` headings (previously empty).

- [ ] **Step 7: Commit**

```bash
git add lib/mdx.ts scripts/check-mdx.mjs package.json
git commit -m "fix(mdx): enable remark-gfm, rehype-slug, and autolink headings

Tables were rendering as raw pipe characters and no heading had an id,
which broke the table of contents on every page.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Define `.prose-custom` and consolidate content typography

**Files:**
- Modify: `app/globals.css` (define `.prose-custom`; trim duplicated element typography in `@layer base`)
- Verify: `app/loading.tsx`, `app/not-found.tsx`, `app/error.tsx`, `app/page.tsx` still render correctly after base-layer trim

**Interfaces:**
- Consumes: `components/handbook/HandbookLayout.tsx:42` already wraps MDX in `<div className="prose-custom">`.
- Produces: `.prose-custom` as the single typography source for MDX content; `@layer base` left with only non-content rules.

**Why:** `.prose-custom` is referenced in `HandbookLayout.tsx` but **defined nowhere** — a dead class. Meanwhile element-level typography (`h1`–`h4`, `p`, `ul/ol`, `blockquote`, `table`, `hr`, `code`, `pre`) is duplicated in `@layer base` with different values than the `mdx-components.tsx` classNames (e.g. base `p { mb-4 }` vs component `mb-7`). Two sources of truth is exactly the "inconsistent spacing" the spec calls out. Fix: one source of truth (the MDX component map, which is the render path for all content), and `.prose-custom` as the wrapper that establishes rhythm the element components don't own (first-child flush, wrapper width).

- [ ] **Step 1: Define `.prose-custom`**

Add to `app/globals.css` after the `@layer base` block:

```css
/* ── MDX content wrapper (defined once; see HandbookLayout) ── */
.prose-custom {
  max-width: none;
}
.prose-custom > :first-child {
  margin-top: 0;
}
.prose-custom figure,
.prose-custom img {
  margin-left: auto;
  margin-right: auto;
}
```

- [ ] **Step 2: Trim duplicated element typography from `@layer base`**

In `app/globals.css`, remove the element rules `h1`, `h2`, `h3`, `h4`, `p`, `a`, `code`, `pre`, `pre code`, `blockquote`, `ul, ol`, `li`, `table`, `th`, `td`, `hr` from `@layer base` (lines ~144-209). Keep `*`, `body`, `html`, `:focus-visible`, `::selection`, `::-webkit-scrollbar*`. Rationale: MDX content is the only consumer of those bare-element styles, and it already styles every element via `mdx-components.tsx`; the homepage (`app/page.tsx`) styles its own elements explicitly with classNames.

- [ ] **Step 3: Standardise heading/paragraph/list rhythm in `mdx-components.tsx`**

Apply these values (the canonical spacing scale — whitespace should feel intentional, Apple-like):

- `h2`: `mt-14 mb-5 pb-2 border-b border-atlas-border` (keep `scroll-mt-10`)
- `h3`: `mt-10 mb-4`
- `h4`: `mt-8 mb-3`
- `p`: `mb-6` (keep `leading-[1.75]`, `max-w-[72ch]`)
- `ul`, `ol`: `mb-6 pl-6 space-y-2`
- `li`: `text-atlas-text-secondary leading-relaxed` (no per-item bottom margin; rely on `space-y-2`)
- `table` wrapper: `my-8`
- `hr`: `my-10`

(Edit only the `className` strings in `components/handbook/mdx-components.tsx`.)

- [ ] **Step 4: Verify non-MDX pages are unaffected**

Run `npm run dev`; check `/` (homepage), `/some/missing/route` (not-found), and force an error page. Expected: no layout regressions from removing the base-element rules.

- [ ] **Step 5: Gate + commit**

Run `npm run lint` and `npm run build`. Then:

```bash
git add app/globals.css components/handbook/mdx-components.tsx
git commit -m "style(mdx): define .prose-custom and single-source content typography

.prose-custom was referenced but never defined. Element-level base styles
duplicated the MDX component map with conflicting spacing values; removed
them so MDX typography lives in exactly one place.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Build `DrillCard` / `DrillStep` MDX components

**Files:**
- Create: `components/documentation/DrillCard.tsx`
- Modify: `components/handbook/mdx-components.tsx` (register)

**Interfaces:**
- Produces MDX API used by Tasks 4-5:

```mdx
<DrillCard title="1. Standing Calf Stretch">
  <DrillStep term="Position">Hands on wall, one leg back, heel down</DrillStep>
  <DrillStep term="Movement">Lean forward until stretch is felt in the calf</DrillStep>
  <DrillStep term="Hold">30–45 seconds per side</DrillStep>
</DrillCard>
```

**Why:** Spec #2 — replace instructional `| Parameter | Guideline |` tables (mobility `Position/Movement/Hold`, exercise `Sets × Reps / Range / ...`) with structured cards that read better on desktop and mobile. Rendering as a definition-list-style card keeps it semantic.

- [ ] **Step 1: Create `components/documentation/DrillCard.tsx`**

```tsx
import { ListOrdered } from "lucide-react";

interface DrillStepProps {
  term: string;
  children: React.ReactNode;
}

export function DrillStep({ term, children }: DrillStepProps) {
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-0.5 py-2.5 border-b border-atlas-border last:border-b-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-atlas-accent pt-0.5">
        {term}
      </dt>
      <dd className="text-sm text-atlas-text-secondary leading-relaxed">{children}</dd>
    </div>
  );
}

interface DrillCardProps {
  title: string;
  children: React.ReactNode;
}

export function DrillCard({ title, children }: DrillCardProps) {
  return (
    <div className="my-6 rounded-lg border border-atlas-border bg-atlas-surface overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-atlas-hover/50 border-b border-atlas-border">
        <ListOrdered className="h-4 w-4 text-atlas-accent shrink-0" />
        <h4 className="text-sm font-semibold text-atlas-text-primary">{title}</h4>
      </div>
      <dl className="px-4">{children}</dl>
    </div>
  );
}
```

- [ ] **Step 2: Register in `mdx-components.tsx`**

Import both and add to the `mdxComponents` object:

```tsx
  DrillCard,
  DrillStep,
```

- [ ] **Step 3: Verify a sample renders**

Create a throwaway `content/tmp-drill-test.mdx` with the sample above, open `/tmp-drill-test`, confirm the card renders (header row, labelled definition rows, hairline dividers), then delete the throwaway file.

- [ ] **Step 4: Gate + commit**

`npm run lint` clean; `node scripts/check-mdx.mjs` clean. Commit:

```bash
git add components/documentation/DrillCard.tsx components/handbook/mdx-components.tsx
git commit -m "feat(mdx): add DrillCard/DrillStep structured instruction cards

Reusable definition-list card used to replace instructional parameter
tables per the polish spec.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: Convert mobility instruction tables → `DrillCard` (5 files)

**Files:**
- Modify: `content/mobility/ankles.mdx`, `content/mobility/calves.mdx`, `content/mobility/hips.mdx`, `content/mobility/recovery.mdx`, `content/mobility/thoracic-spine.mdx`
- Test: `node scripts/check-mdx.mjs` + grep gate below

**Interfaces:**
- Consumes: `DrillCard`/`DrillStep` from Task 3.
- Produces: zero `| **Position** |` tables remaining in `content/mobility/`.

**Why:** These 5 files hold ~50 instructional `Position/Movement/Hold/Reps/Breathing` tables (the exact anti-pattern in spec #2). Only these "how to perform" tables convert; genuine data tables on the same pages (e.g. `hips.mdx` Current Status) stay.

- [ ] **Step 1: Convert each routine block**

For every `### N. <Name>` section whose body is a Parameter table, replace:

```mdx
### 1. Standing Calf Stretch

| Parameter | Guideline |
|-----------|-----------|
| **Position** | Hands on wall, one leg back, heel down |
| **Movement** | Lean forward until stretch is felt in the calf |
| **Hold** | 30–45 seconds per side |
```

with:

```mdx
### 1. Standing Calf Stretch

<DrillCard title="1. Standing Calf Stretch">
  <DrillStep term="Position">Hands on wall, one leg back, heel down</DrillStep>
  <DrillStep term="Movement">Lean forward until stretch is felt in the calf</DrillStep>
  <DrillStep term="Hold">30–45 seconds per side</DrillStep>
</DrillCard>
```

The `DrillCard` header may duplicate the `###` heading text; if so, drop the `###` heading and keep only the card (preferred — the card header carries the name). Follow the same file's existing callout/paragraph spacing: one blank line before/after the card. Preserve any non-table prose that follows a table (e.g. "The soleus (deeper calf muscle)…" paragraphs stay).

- [ ] **Step 2: Run the grep gate**

```bash
grep -rE '^\|\s*\*\*Position\*\*' content/mobility --include=*.mdx
```

Expected: no matches.

- [ ] **Step 3: Build + visual check**

`npm run build`; `npm run dev` and open `/mobility/calves`, `/mobility/hips`. Expected: every routine renders as a card, cards aligned to the content column, no horizontal scroll.

- [ ] **Step 4: Commit**

```bash
git add content/mobility
git commit -m "content(mobility): replace instruction parameter tables with DrillCards

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: Convert exercise Parameter tables → `DrillCard` (16 files)

**Files:**
- Modify: every `content/exercise-library/*.mdx` except `index.mdx` (16 files)
- Test: grep gate + build

**Interfaces:**
- Consumes: `DrillCard`/`DrillStep` from Task 3.

**Why:** The `| Parameter | Guideline |` table in the `Execution` section of every exercise page is an instruction table (spec #2). The `Alternatives` tables (Exercise/Notes) and the `index.mdx` Transfer Ratings legend are genuine data — they stay as tables.

- [ ] **Step 1: Convert each page's Execution parameter table**

For each of the 16 pages, after the numbered `## Execution` list, replace the `| Parameter | Guideline |` table with a `DrillCard`. Example (`romanian-deadlift.mdx`):

```mdx
<DrillCard title="Programme Parameters">
  <DrillStep term="Sets × Reps">2 × 10</DrillStep>
  <DrillStep term="Range">Lower until hamstring stretch is felt; typically mid-shin</DrillStep>
  <DrillStep term="Knees">Slightly bent, fixed angle throughout</DrillStep>
  <DrillStep term="Spine">Neutral throughout; avoid rounding</DrillStep>
</DrillCard>
```

Preserve every row's content verbatim (values only — drop the `**bold**` markers). If a row contains a dash `—` (e.g. "Loading: Dumbbells…"), keep the whole value as written.

- [ ] **Step 2: Run the grep gate**

```bash
grep -rE '^\|\s*\*\*Sets|^\|\s*\*\*Range|^\|\s*\*\*Loading' content/exercise-library --include=*.mdx
```

Expected: no matches.

- [ ] **Step 3: Build + visual check**

`npm run build`; spot-check `/exercise-library/romanian-deadlift`, `/exercise-library/bulgarian-split-squat`, `/exercise-library/lateral-raise`.

- [ ] **Step 4: Commit**

```bash
git add content/exercise-library
git commit -m "content(exercises): replace execution parameter tables with DrillCards

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: Unify the callout components

**Files:**
- Modify: `components/documentation/InfoBox.tsx`, `CoachNote.tsx`, `ScientificNote.tsx`, `WarningBox.tsx`, `TipBox.tsx`
- Create: `components/documentation/callout.css.ts` (or a shared `Callout.tsx`)

**Interfaces:**
- Consumes: nothing new — callouts are already used 200+ times in content; API stays identical (children + optional `title`).
- Produces: five callout components sharing one visual contract: same border radius/padding/spacing, same icon size/weight, same header/body text styles, each with a stable semantic colour (info=accent, coach=cyan, science=purple, tip=success, warning=warning) sourced from shared constants.

**Why:** Spec #8. Today the five callouts duplicate the same JSX with subtly different values (hardcoded `cyan-500`, `purple-500` vs theme tokens `atlas-warning`, `atlas-success`; some `my-6`, header `mb-2`, etc.). One shared base removes drift and makes the system extensible.

- [ ] **Step 1: Create the shared base `components/documentation/Callout.tsx`**

```tsx
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CalloutStyle {
  label: string;
  icon: LucideIcon;
  /** border + text + icon colour */
  color: string;
  /** subtle background tint */
  bg: string;
}

interface CalloutProps {
  style: CalloutStyle;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ style, title, children }: CalloutProps) {
  const { label, icon: Icon, color, bg } = style;
  return (
    <div className={cn("my-6 rounded-lg border p-5", color, bg)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="text-sm font-semibold">{title ?? label}</span>
      </div>
      <div className="text-sm text-atlas-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite the five components on top of `Callout`**

`InfoBox.tsx`:

```tsx
import { Info } from "lucide-react";
import { Callout, type CalloutStyle } from "./Callout";

const style: CalloutStyle = {
  label: "Information",
  icon: Info,
  color: "border-atlas-accent/40 text-atlas-accent",
  bg: "bg-atlas-accent/5",
};

export function InfoBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return <Callout style={style} title={title}>{children}</Callout>;
}
```

`CoachNote.tsx`: `label: "Coach Notes"`, `icon: MessageSquareQuote`, `color: "border-cyan-500/40 text-cyan-400"`, `bg: "bg-cyan-500/5"`.
`ScientificNote.tsx`: `label: "Scientific Notes"`, `icon: FlaskConical`, `color: "border-purple-500/40 text-purple-400"`, `bg: "bg-purple-500/5"`.
`WarningBox.tsx`: `label: "Warning"`, `icon: AlertTriangle`, `color: "border-atlas-warning/40 text-atlas-warning"`, `bg: "bg-atlas-warning/5"`.
`TipBox.tsx`: `label: "Tip"`, `icon: Lightbulb`, `color: "border-atlas-success/40 text-atlas-success"`, `bg: "bg-atlas-success/5"`.

Keep each component's exported name and prop signature byte-identical to today so no content file changes.

- [ ] **Step 3: Verify**

`npm run lint`; `npm run dev`, open `/blueprint/philosophy` (dense callout usage) and `/mobility/calves`. Confirm: identical padding/radius/spacing across all five types; icons aligned to header text; hover/active none; contrast of tinted text on `#161616` still ≥ 4.5:1 for the `text-sm` labels (cyan-400 ≈ `#22d3ee`, purple-400 ≈ `#c084fc`, both fine).

- [ ] **Step 4: Commit**

```bash
git add components/documentation
git commit -m "style(callouts): unify all callout types on a shared Callout base

Info/Coach/Science/Tip/Warning now share one visual contract (padding,
radius, spacing, icon size) with per-type semantic colours.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: Convert plain-text citations → `ReferenceCard` (references + scientific pages)

**Files:**
- Modify: `content/references/index.mdx` (12 citations)
- Modify: `content/scientific/concurrent-training.mdx`, `deloads.mdx`, `hypertrophy.mdx`, `mobility.mdx`, `plyometrics.mdx`, `protein.mdx`, `recovery.mdx`, `running-economy.mdx` (13 citations total)
- Modify: `components/documentation/ReferenceCard.tsx` (polish: DOI row + spacing)

**Interfaces:**
- Consumes: existing `ReferenceCard` MDX component (already registered, currently 0 usages).
- Produces: every plain-text bullet citation replaced by a `<ReferenceCard>`; `ReferenceCard` gains a clearer DOI/URL line and consistent card padding.

**Why:** Spec #9. `ReferenceCard` exists but is never used — all ~25 citations render as plain bullet lists. Converting to structured cards is a content-only change.

- [ ] **Step 1: Polish `ReferenceCard` (visual only)**

Update `components/documentation/ReferenceCard.tsx`: card `p-5`, authors line `text-sm`, title `text-sm font-medium`, journal row as a separate `text-xs text-atlas-text-muted` line, DOI shown as a monospace chip with the DOI, and the "View source" link as before. Keep props `authors, year, title, journal?, doi?, link?` unchanged.

- [ ] **Step 2: Convert `content/references/index.mdx`**

For each bullet, parse into fields and replace. Example (`references/index.mdx:18`):

```mdx
- Wilson, J.M., Marin, P.J., Rhea, M.R., Wilson, S.M., Loenneke, J.P., & Anderson, J.C. (2012). Concurrent training: a meta-analysis examining interference of aerobic and resistance exercises. *Journal of Strength and Conditioning Research*, 26(8), 2293–2307.
```

becomes:

```mdx
<ReferenceCard
  authors="Wilson, J.M., Marin, P.J., Rhea, M.R., Wilson, S.M., Loenneke, J.P., & Anderson, J.C."
  year="2012"
  title="Concurrent training: a meta-analysis examining interference of aerobic and resistance exercises"
  journal="Journal of Strength and Conditioning Research, 26(8), 2293–2307"
  link="https://doi.org/10.1519/JSC.0b013e31823a3e29"
/>
```

Use the official DOI when you are certain of it; otherwise **omit** `link`/`doi` rather than guessing (a card without a DOI is correct; a wrong DOI is a defect). Keep the same `## Section` groupings as today.

- [ ] **Step 3: Convert the `scientific/*` citation lists**

Each file ends with a plain bullet list under a `### Key Reference`-style heading. Replace each bullet with its `<ReferenceCard>` under the existing heading. For `running-economy.mdx:58` also keep the in-prose `(Sports Medicine)` mention as-is.

- [ ] **Step 4: Verify**

`npm run lint`; `node scripts/check-mdx.mjs`; `npm run dev` open `/references` and `/scientific/concurrent-training`. Expected: cards render with authors/year/title/journal; no plain-text bullets remain; page order/sections unchanged.

- [ ] **Step 5: Commit**

```bash
git add components/documentation/ReferenceCard.tsx content/references content/scientific
git commit -m "content(references): render citations as structured ReferenceCards

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 8: Build the unified SVG figure kit

**Files:**
- Create: `components/illustrations/fig/palette.ts`
- Create: `components/illustrations/fig/types.ts`
- Create: `components/illustrations/fig/Fig.tsx`
- Create: `components/illustrations/fig/FigureCanvas.tsx`
- Create: `components/illustrations/fig/Equipment.tsx`
- Create: `components/illustrations/fig/Label.tsx`
- Create: `components/illustrations/fig/Arrow.tsx`

**Interfaces:**

`palette.ts` (all constants live here — one design language):

```ts
export const FIG = {
  viewBox: { w: 640, h: 480 },
  groundY: 428,
  bg: "#161616",          // atlas-surface
  grid: "#2a2a2a",        // atlas-border, ground line
  body: "#4f8ef7",        // atlas-accent — primary figure
  ghost: "#7a7a7a",       // atlas-text-muted — dashed start position
  equipment: "#3a3a3a",   // machine / equipment outline
  equipmentFill: "#232323",
  annotation: "#f39c12",  // atlas-warning — arrows / highlights
  label: "#9a9a9a",
  strokeWidth: 3.5,
  dash: "7 6",
  font: "JetBrains Mono, monospace",
} as const;
```

`types.ts`:

```ts
export interface Point { x: number; y: number }
/** A figure is a head + limb polylines. All coordinates are in the 640×480 canvas. */
export interface Pose {
  head: Point;
  headRadius?: number;          // default 13
  torso: Point[];               // shoulder → … → hip (2-3 points)
  arms: Point[][];              // per arm: shoulder → elbow → wrist
  legs: Point[][];              // per leg: hip → knee → ankle
}
```

`Fig.tsx` — renders one human figure:

```tsx
import type { Pose } from "./types";
import { FIG } from "./palette";

interface FigProps { pose: Pose; ghost?: boolean }

export function Fig({ pose, ghost }: FigProps) {
  const { head, headRadius = 13, torso, arms, legs } = pose;
  const stroke = ghost ? FIG.ghost : FIG.body;
  const style = ghost ? { stroke, strokeDasharray: FIG.dash } : { stroke };
  const points = (pts: Point[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <g
      fill="none"
      strokeWidth={FIG.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...style}
    >
      <circle cx={head.x} cy={head.y} r={headRadius} fill={stroke} stroke="none" />
      <polyline points={points(torso)} />
      {arms.map((a, i) => <polyline key={`a${i}`} points={points(a)} />)}
      {legs.map((l, i) => <polyline key={`l${i}`} points={points(l)} />)}
    </g>
  );
}
```

`FigureCanvas.tsx` — the standard frame every diagram uses:

```tsx
import { FIG } from "./palette";

interface FigureCanvasProps {
  title?: string;       // small uppercase label, top-left
  alt: string;          // a11y
  children: React.ReactNode;
}

export function FigureCanvas({ title, alt, children }: FigureCanvasProps) {
  return (
    <figure className="my-10 w-full max-w-xl mx-auto">
      <div className="rounded-xl border border-atlas-border bg-atlas-surface overflow-hidden">
        <svg
          viewBox={`0 0 ${FIG.viewBox.w} ${FIG.viewBox.h}`}
          role="img"
          aria-label={alt}
          className="w-full h-auto block"
          focusable="false"
        >
          <rect width={FIG.viewBox.w} height={FIG.viewBox.h} fill={FIG.bg} />
          <line x1={0} y1={FIG.groundY} x2={FIG.viewBox.w} y2={FIG.groundY}
                stroke={FIG.grid} strokeWidth={1.5} />
          {title && (
            <text x={20} y={30} fill={FIG.label} fontFamily={FIG.font} fontSize={13} letterSpacing={1}>
              {title.toUpperCase()}
            </text>
          )}
          {children}
        </svg>
      </div>
    </figure>
  );
}
```

`Equipment.tsx` — named primitives, each accepts `{ x, y, ... }` and renders in the `equipment`/`equipmentFill` palette with the same stroke width: `<Barbell />`, `<Dumbbell />`, `<Bench height />`, `<Seat />`, `<FootPlatform />`, `<CableStack />`, `<PulleyBar />`, `<TrackOval />`, `<Cone />`, `<Wall />`.

`Label.tsx`:

```tsx
interface LabelProps { x: number; y: number; children: React.ReactNode; strong?: boolean }
// renders <text fill={strong ? FIG.body : FIG.label} fontFamily={FIG.font} fontSize={14}>…
```

`Arrow.tsx` — dashed annotation arrow with arrowhead in `FIG.annotation`:

```tsx
interface ArrowProps { x1: number; y1: number; x2: number; y2: number }
// <line … stroke={FIG.annotation} strokeWidth={2.5} strokeDasharray="6 5" markerEnd={…}/>
```

**Why:** Specs #3, #4, #5. Every diagram, old and new, composes these primitives with shared constants → identical stroke width, proportions, palette, font, frame. This is the mechanism that makes "one recognisable style" true by construction, not by convention.

- [ ] **Step 1: Create all six files above verbatim**

- [ ] **Step 2: Create a reference composition to prove the kit**

Create `components/illustrations/figures/rdl.tsx` (the reference diagram, used as the template for all others):

```tsx
import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";

export function RdlFigure() {
  return (
    <FigureCanvas
      title="Romanian Deadlift — hip hinge, neutral spine"
      alt="Romanian deadlift hip hinge with a neutral spine"
    >
      {/* Primary figure: hips pushed back, torso ~40° to vertical, knees softly bent */}
      <Fig
        pose={{
          head: { x: 290, y: 92 },
          torso: [
            { x: 298, y: 112 },
            { x: 282, y: 178 },
            { x: 258, y: 252 },
          ],
          arms: [
            [{ x: 298, y: 122 }, { x: 246, y: 176 }, { x: 210, y: 232 }],
            [{ x: 296, y: 124 }, { x: 300, y: 180 }, { x: 296, y: 236 }],
          ],
          legs: [
            [{ x: 258, y: 252 }, { x: 246, y: 352 }, { x: 240, y: 428 }],
            [{ x: 258, y: 252 }, { x: 296, y: 350 }, { x: 308, y: 428 }],
          ],
        }}
      />
      {/* Barbell at shin height */}
      <g stroke="#3a3a3a" strokeWidth={5} strokeLinecap="round">
        <line x1={180} y1={228} x2={360} y2={228} />
        <rect x={178} y={222} width={14} height={12} fill="#232323" stroke="none" />
        <rect x={348} y={222} width={14} height={12} fill="#232323" stroke="none" />
      </g>
      {/* Annotations */}
      <Arrow x1={250} y1={120} x2={222} y2={196} />
      <Label x={210} y={112}>hips back</Label>
      <Label x={330} y={200} strong>neutral spine</Label>
    </FigureCanvas>
  );
}
```

- [ ] **Step 3: Visual check the reference**

Register `RdlFigure` in `mdx-components.tsx` temporarily, or render it in a scratch MDX file; open the page. Verify: figure is a clean profile silhouette, stroke `3.5` consistent, head filled, labels in mono, ground line present, annotations dashed amber, canvas centred at `max-w-xl`. Iterate the reference until it reads as "professionally drawn" — this reference sets the standard every other diagram matches.

- [ ] **Step 4: Gate + commit**

`npm run lint` clean. Commit:

```bash
git add components/illustrations
git commit -m "feat(illustrations): build unified SVG figure kit with RDL reference

One palette, one frame, one Fig primitive — every future diagram composes
these, guaranteeing identical stroke, proportions, and typography.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 9: Redraw lower-body exercise diagrams (6)

**Files:**
- Create: `components/illustrations/figures/bulgarian.tsx`, `hip-thrust.tsx`, `leg-press.tsx`, `leg-curl.tsx`, `weighted-back-extension.tsx` (RDL done in Task 8)
- Test: visual per diagram

**Interfaces:**
- Consumes: kit from Task 8 (`Fig`, `FigureCanvas`, `Equipment`, `Label`, `Arrow`).
- Produces: five figure components, each `<FigureCanvas title alt>` wrapping composed primitives. Alt text = the alt from the current `<img>` tags (Task 16 source of truth).

**Why:** Spec #3 — replace the amateur lower-body diagrams. Every figure uses the kit so proportions/stroke/palette match the RDL reference exactly.

- [ ] **Step 1: Draw each figure (compose primitives, iterate visually)**

Follow the reference conventions — profile view facing left for side-view exercises, kit palette only, ground line at `y=428`, labels in mono `FIG.label`:

- `bulgarian.tsx` — side view, rear foot on a bench (bench = `Equipment.Bench`), front leg bent ~90°, torso upright, dumbbells hanging at sides.
- `hip-thrust.tsx` — side view, shoulder blades on a flat bench, hips extended at top, `ghost` pose for the floor start position, barbell across hips.
- `leg-press.tsx` — side view, seated with feet on the foot platform; annotate the shoulder-width foot position with two `Arrow`s and a label ("shoulder-width, mid-platform").
- `leg-curl.tsx` — side view, seated on machine, padded arm behind calves; small dashed arc annotation showing knee-flexion range.
- `weighted-back-extension.tsx` — side view, hips on pad, torso horizontal, `ghost` pose for the bottom position, plate held at chest.

Each step: write the component using kit primitives → open the page (register the figure in a scratch file or wire the eventual `Figure` name) → compare against RDL reference for stroke/proportion consistency → adjust coordinates. Do not commit a diagram until it visually matches the kit's standard.

- [ ] **Step 2: Gate + commit**

`npm run lint` clean. Commit all five at once:

```bash
git add components/illustrations/figures
git commit -m "feat(illustrations): redraw lower-body exercise diagrams with the figure kit

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 10: Redraw upper-body push diagrams (6)

**Files:**
- Create: `components/illustrations/figures/chest-press.tsx`, `machine-shoulder-press.tsx`, `lateral-raise.tsx`, `cable-triceps-extension.tsx`, `face-pull.tsx`, `rear-delt-reverse-fly.tsx`

**Interfaces:**
- Consumes: Task 8 kit. Produces: six figure components.

**Why:** Spec #3 continuation.

- [ ] **Step 1: Draw each figure**

- `chest-press.tsx` — side view, seated, handles at chest; `ghost` pose for the arms-extended finish; use `Equipment.Seat` + two `PulleyBar`s.
- `machine-shoulder-press.tsx` — side view, seated, press overhead; `ghost` for arms-extended top.
- `lateral-raise.tsx` — front view, arms at shoulder height forming a T; dashed motion arc from the down position; dumbbells.
- `cable-triceps-extension.tsx` — front view, standing, cable stack behind, elbows pinned, forearms extended down; `ghost` for the flexed start.
- `face-pull.tsx` — front view, rope pulled to face, elbows high and wide; cable stack + rope.
- `rear-delt-reverse-fly.tsx` — front view, torso hinged forward, arms wide; dumbbells.

Each step: write → render → compare to reference → adjust. Match alt text to the existing `<img>` tags.

- [ ] **Step 2: Gate + commit**

`npm run lint` clean; commit all six together.

```bash
git add components/illustrations/figures
git commit -m "feat(illustrations): redraw upper-body push diagrams with the figure kit

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 11: Redraw upper-body pull / arms / core diagrams (6)

**Files:**
- Create: `components/illustrations/figures/cable-row.tsx`, `pull-ups.tsx`, `preacher-curl.tsx`, `hammer-curl.tsx`, `pallof-press.tsx`, `decline-crunch.tsx`

**Interfaces:** Consumes Task 8 kit; produces six figure components.

- [ ] **Step 1: Draw each figure**

- `cable-row.tsx` — side view, seated, feet on platform, torso upright, handle to ribs; cable stack.
- `pull-ups.tsx` — front view, dead hang + `ghost` chin-over-bar pose; overhead bar; annotate the bar line ("chin over bar").
- `preacher-curl.tsx` — side view, seated at preacher bench, upper arms on the angled pad, forearms curled; `ghost` for extended bottom.
- `hammer-curl.tsx` — front view, standing, neutral grip dumbbells, forearms vertical.
- `pallof-press.tsx` — front view, side-on cable, arms extended forward resisting rotation; cable stack; annotate anti-rotation with an arrow.
- `decline-crunch.tsx` — side view, on decline bench, torso curled; `ghost` for the flat start; annotate the crunch arc.

- [ ] **Step 2: Gate + commit**

`npm run lint` clean; commit all six together.

```bash
git add components/illustrations/figures
git commit -m "feat(illustrations): redraw pull/arms/core diagrams with the figure kit

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 12: Redraw mobility diagrams (6)

**Files:**
- Create: `components/illustrations/figures/ankles.tsx`, `calf-stretch.tsx`, `hip-90-90.tsx`, `thoracic-rotation.tsx`, `warm-up-routine.tsx`, `recovery-mobility.tsx`

**Interfaces:** Consumes Task 8 kit; produces six figure components.

- [ ] **Step 1: Draw each figure**

- `ankles.tsx` — three small views in one canvas (dorsiflexion, plantar flexion, circles) each with a compact Fig leg+foot; use consistent sub-frame layout (three panels, same gutter).
- `calf-stretch.tsx` — side view, standing lunge against a wall, back heel down, `Equipment.Wall`.
- `hip-90-90.tsx` — side view, seated, front shin forward at 90°, rear thigh perpendicular; dashed angle annotations at both hips labelled "90°".
- `thoracic-rotation.tsx` — side view, half-kneeling, arms crossed, torso rotated; arrow on the rotation axis.
- `warm-up-routine.tsx` — horizontal three-step sequence (raise temp → mobilise → activate) as three mini-figures in one canvas with arrows between.
- `recovery-mobility.tsx` — two figures split by a vertical divider: "move" (walking figure) vs "rest" (seated figure); label each side.

- [ ] **Step 2: Gate + commit**

`npm run lint` clean; commit all six together.

```bash
git add components/illustrations/figures
git commit -m "feat(illustrations): redraw mobility diagrams with the figure kit

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 13: Redraw running diagrams (7)

**Files:**
- Create: `components/illustrations/figures/running-gait.tsx`, `intervals.tsx`, `long-run-pace.tsx`, `norwegian-4x4.tsx`, `strides.tsx`, `threshold.tsx`, `zone2-threshold.tsx`

**Interfaces:** Consumes Task 8 kit; produces seven figure components.

**Note:** these are pace/structure concepts, not static exercises — they primarily use `Equipment.TrackOval`, pace-zone bands, and timing blocks, with a single Fig only where a gait/posture point is being made (gait, strides). Keep the kit's frame and palette; the "figure" is often a diagram, which is consistent with the style guide (same frame, stroke, typography).

- [ ] **Step 1: Draw each diagram**

- `running-gait.tsx` — three stances of a single runner (mid-stance, push-off, swing) using three ghost/body figures across the canvas; label each phase.
- `intervals.tsx` — track oval with 6 work segments marked; "6 × 400 m" label; work/recovery key.
- `long-run-pace.tsx` — flat pace line with a steady band labelled "conversational pace"; small runner figure.
- `norwegian-4x4.tsx` — 4 work blocks (4 min) separated by 3 recovery blocks (3 min) as a timeline bar; annotate heart-rate zone band.
- `strides.tsx` — single runner, relaxed stride; acceleration arrow from 0 → 80–90%; label "50 m".
- `threshold.tsx` — continuous effort line above the Zone 2 band; label "comfortably hard".
- `zone2-threshold.tsx` — two horizontal intensity bands side by side (Zone 2 vs Threshold) with descriptors; consistent band styling.

- [ ] **Step 2: Gate + commit**

`npm run lint` clean; commit all seven together.

```bash
git add components/illustrations/figures
git commit -m "feat(illustrations): redraw running diagrams with the figure kit

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 14: Redraw the decision-tree diagram (1)

**Files:**
- Create: `components/illustrations/figures/decision-tree.tsx`

**Interfaces:** Consumes Task 8 kit; produces one diagram component.

- [ ] **Step 1: Draw the tree**

`decision-tree.tsx` — a clean if-then flow: rounded decision node (rectangle with `equipment` outline, `equipmentFill`), "Yes"/"No" edges as dashed `annotation` arrows, terminal outcome chips. Match the page's existing copy ("If-then guidance"). No human figure required. Keep node/edge spacing consistent with the kit's grid.

- [ ] **Step 2: Gate + commit**

`npm run lint` clean; commit.

```bash
git add components/illustrations/figures/decision-tree.tsx
git commit -m "feat(illustrations): redraw decision tree diagram with the figure kit

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 15: Wire figures into MDX — replace all 32 `<img>` tags, delete orphaned SVGs

**Files:**
- Create: `components/illustrations/Figure.tsx` (name → component registry)
- Modify: `components/handbook/mdx-components.tsx` (register `Figure`)
- Modify: all content files that contain `<img src="/images/...svg">` (32 img tags across `exercise-library` 18, `mobility` 6, `running` 7, `decision-engine` 1)
- Delete: the 32 now-orphaned SVGs under `public/images/exercise/`, `public/images/mobility/`, `public/images/running/`, `public/images/decision-engine/`

**Interfaces:**
- Consumes: all figure components from Tasks 8-14.
- Produces: MDX API `<Figure name="rdl" />`; standardised figure layout (centred, `max-w-xl`, caption) on every handbook page.

**Why:** Specs #3 (replace diagrams) and #5 (image layout). Replacing `<img>` with the `Figure` component removes the per-tag layout classNames (`my-6 w-full max-w-md rounded-lg border`) — layout becomes a property of the system, so every page is consistent by construction.

- [ ] **Step 1: Create `components/illustrations/Figure.tsx`**

```tsx
import { RdlFigure } from "./figures/rdl";
import { BulgarianFigure } from "./figures/bulgarian";
// …one import per figure component from Tasks 8–14…

const registry: Record<string, React.ComponentType> = {
  rdl: RdlFigure,
  bulgarian: BulgarianFigure,
  // …one entry per diagram, key = the slug segment of the old SVG name…
};

interface FigureProps {
  name: keyof typeof registry | (string & {});
  alt?: string;
  caption?: string;
}

export function Figure({ name, alt, caption }: FigureProps) {
  const Component = registry[name as string];
  if (!Component) return null;
  return (
    <figure className="my-10 w-full max-w-xl mx-auto">
      <Component />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-atlas-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
```

The figure components already set their own `alt` inside `FigureCanvas`; the `alt`/`caption` props on `Figure` are optional refinements.

- [ ] **Step 2: Register `Figure` in `mdx-components.tsx`**

- [ ] **Step 3: Replace all `<img>` tags**

For each of the 32 occurrences, replace:

```mdx
<img src="/images/exercise/rdl-hip-hinge.svg" alt="Romanian Deadlift hip hinge with a neutral spine" className="my-6 w-full max-w-md rounded-lg border border-atlas-border" />
```

with:

```mdx
<Figure name="rdl" />
```

Map: `bulgarian-stance` → `bulgarian`, `leg-press-foot-position` → `legPress`… (use `name` = camelCase of the old file's base segment minus noise, one canonical key per figure). For diagrams that carry instructive value in their caption, add `caption="…"` using the old alt text.

- [ ] **Step 4: Delete the orphaned SVGs**

`git rm public/images/exercise/*.svg public/images/mobility/*.svg public/images/running/*.svg public/images/decision-engine/*.svg` — but NOT `public/images/logos/` or `public/images/screenshots/`.

- [ ] **Step 5: Verify**

`grep -rn '<img src="/images/exercise' content` → no matches. `node scripts/check-mdx.mjs` clean. `npm run build`. `npm run dev`: visit one page per section (`/exercise-library/chest-press`, `/mobility/hips`, `/running/zone-2`, `/decision-engine`); confirm every diagram renders centred at a consistent size with no horizontal scroll on a 375px viewport.

- [ ] **Step 6: Commit**

```bash
git add components/illustrations/Figure.tsx components/handbook/mdx-components.tsx content public/images
git commit -m "feat(illustrations): swap all <img> diagrams for the Figure component

Removes 32 hand-coded SVG files in favour of one consistent figure system;
image layout becomes a property of the component, not per-page classNames.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 16: Write the Unified Illustration Style Guide

**Files:**
- Create: `docs/internal/illustration-style-guide.md`

**Why:** Spec #4 — the design language must be documented so future diagrams (and future editors) follow it. This is an internal engineering doc (no new public page — the spec forbids adding pages).

- [ ] **Step 1: Write the guide**

Document, with code samples pointing at the real kit files:

- **Canvas**: 640×480, rounded-xl frame, `bg #161616`, ground line `y=428` in `#2a2a2a`.
- **Figure**: `Fig` primitive — head circle `r=13` filled `#4f8ef7`; limbs single polylines, `stroke-width 3.5`, round caps; ghost (start positions) dashed `7 6` in `#7a7a7a`. Human figures always face left in side views.
- **Equipment**: only via `Equipment` primitives — outline `#3a3a3a`, fill `#232323`, same stroke width.
- **Annotations**: `Arrow` dashed `6 5` in `#f39c12`; labels via `Label` in `JetBrains Mono`, size 14, colour `#9a9a9a`, strong labels `#4f8ef7`. Title label top-left, uppercase, size 13.
- **Composition rules**: min 20px padding from frame edges; never overlap figure and labels; one highlight colour (`#f39c12`) per diagram; multi-panel diagrams use equal gutters.
- **Do / Don't**: a small section (e.g. "Do use ghost figures for ranges of motion; Don't draw faces or muscles; Don't introduce new colours").

- [ ] **Step 2: Link from AGENTS-style docs**

Add a one-line pointer in `docs/internal/AGENTS.md` (or the project overview doc) to the style guide. Do not create a new route.

- [ ] **Step 3: Commit**

```bash
git add docs/internal/illustration-style-guide.md docs/internal/AGENTS.md
git commit -m "docs: add unified illustration style guide

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 17: Accessibility + mobile pass

**Files:**
- Modify: `app/globals.css` (`--atlas-text-muted` → `#8f8f8f`; add a responsive check for `figure`/`table` overflow)
- Modify: `components/documentation/ReferenceCard.tsx` (if Task 7 polish was insufficient)
- Verify: every page on a 375px viewport; heading hierarchy; alt text

**Why:** Specs #10, #11. The concrete defects: `--atlas-text-muted #7a7a7a` fails AA contrast (≈4.1:1) at small sizes on `#161616`; illustrations were `max-w-md`+bordered per-tag (now fixed by the kit); tables already wrap in `overflow-x-auto` via `mdx-components.tsx`.

- [ ] **Step 1: Fix muted-text contrast**

In `app/globals.css`, change `--atlas-text-muted: #7a7a7a` to `#8f8f8f`. Verify: contrast on `#161616` ≈ 5.0:1 (passes AA for normal text). Sweep pages for any text using `text-atlas-text-muted` at small sizes (tags, labels, footnotes) — all now pass.

- [ ] **Step 2: Verify heading hierarchy + semantics**

Check every page: exactly one `h1` (PageHeader), `h2`/`h3` nest correctly (no skipped levels), figures use `role="img"` + `aria-label` (FigureCanvas does), callouts keep `aria-hidden` icons, links have visible focus (global `:focus-visible` exists). Fix any page that violates (typically an `h3` directly after `h1` or a stray `h1` in body).

- [ ] **Step 3: Mobile sweep**

With DevTools at 375px, visit one page per category: exercise, mobility, running, nutrition (densest tables), decision-engine. Confirm: no horizontal scroll (tables wrap, figures shrink with `w-full`), margins consistent (article `px-4 lg:px-8`), long words/URLs wrap (add `break-words` to `a` in `mdx-components` if a DOI link overflows).

- [ ] **Step 4: Gate + commit**

`npm run lint`, `npm run build`. Commit:

```bash
git add app/globals.css components/handbook/mdx-components.tsx components/documentation
git commit -m "a11y(mobile): raise muted-text contrast, fix heading semantics, mobile sweep

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 18: Search visual polish (presentation only)

**Files:**
- Modify: `components/search/CommandPalette.tsx`

**Why:** Spec #12 — search is complete; only presentation. Three concrete improvements, no redesign:

- [ ] **Step 1: Improve empty states**

In `CommandPalette.tsx`, give the two `CommandEmpty` blocks a `SearchX` / `Search` icon above the text (matching the existing muted styling) and keep the copy. Single small component change:

```tsx
import { Search, SearchX } from "lucide-react";
// in the no-results branch:
<SearchX className="h-8 w-8 text-atlas-text-muted mb-2" aria-hidden="true" />
// in the no-query branch:
<Search className="h-8 w-8 text-atlas-text-muted mb-2" aria-hidden="true" />
```

- [ ] **Step 2: Sharpen match highlighting**

Change the `<mark>` class from `bg-atlas-accent/20 text-atlas-accent` to `bg-atlas-accent/25 text-atlas-accent font-medium rounded-sm px-0.5` (brighter fill + medium weight reads as "selected" without changing behaviour).

- [ ] **Step 3: Confirm keyboard + focus**

Verify with cmdk: arrow keys move through results, Enter opens, Esc closes, and `CommandItem` shows the global focus ring (`outline-atlas-accent`). Fix only if broken (e.g. add `focus-visible:outline-2 focus-visible:outline-atlas-accent` to `CommandItem` styling in `components/ui/command.tsx` if absent).

- [ ] **Step 4: Gate + commit**

`npm run lint`, `npm run build`. Commit:

```bash
git add components/search/CommandPalette.tsx components/ui/command.tsx
git commit -m "style(search): polish empty states, match highlighting, focus affordance

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 19: Final repository-wide consistency audit

**Files:**
- Verify-only + straggler fixes across `content/**`, `components/**`, `app/globals.css`

**Why:** Specs #1, #13, #14. Close the loop: prove no page exposes raw markdown, all layouts match their content type, and the whole site reads as one design system.

- [ ] **Step 1: Run every gate**

`node scripts/check-mdx.mjs`, `npm run lint`, `npm run build` — all green.

- [ ] **Step 2: Automated raw-markdown sweep**

```bash
grep -rnE '\|' content --include=*.mdx | grep -vE '^\S+:\d+:\s*<[A-Z]|link|/\||^\s*\|' 
```

Review the results by hand: any remaining pipe that is not a GFM table separator (header row / divider) is a defect to fix. Also sweep for `**` (unclosed bold), `[` without `](` (broken links), and `\*\*` escapes.

- [ ] **Step 3: Layout-consistency spot-check**

Confirm same-type pages share structure: all 16 exercise pages (Overview/Purpose/Execution/Common Mistakes/Running Transfer/Alternatives + DrillCard), all 5 mobility routine pages (routines as DrillCards, Common Mistakes, callouts), running session pages (Purpose/Execution/Benefits/Progression/Common Mistakes). Fix any page that drifted.

- [ ] **Step 4: Visual pass on every section root**

Visit `/blueprint`, `/running`, `/strength`, `/mobility`, `/nutrition`, `/exercise-library`, `/scientific`, `/references`, `/decision-engine`, `/` and the current programme. Confirm: consistent figure sizing, callout spacing, heading rhythm, card padding, border radius, hover states, colours — one coherent system. Fix stragglers.

- [ ] **Step 5: Update README screenshots if figures visibly changed the look**

If the homepage or handbook screenshots in `public/images/screenshots/` no longer reflect the site, re-capture them following the repo's existing README workflow (see commit `32e4556`).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "polish: final visual consistency audit

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Self-Review (run before execution handoff)

**Spec coverage:**
1. *Fix ALL markdown rendering* → Task 1 (root cause) + Task 19 (sweep). ✅
2. *Remove tables that hurt readability* → Tasks 3-5 (DrillCard conversions). ✅
3. *Replace every diagram* → Tasks 8-15 (kit + 32 redraws + swap). ✅
4. *Unified illustration style guide* → Task 16. ✅
5. *Improve image layout* → Task 15 (Figure component owns layout). ✅
6. *Typography audit* → Task 2 (.prose-custom + single source). ✅
7. *Handbook layout consistency* → Task 19 Step 3 (structure audit). ✅
8. *Callout components* → Task 6. ✅
9. *Scientific references* → Task 7. ✅
10. *Mobile optimisation* → Task 17 Step 3. ✅
11. *Accessibility* → Task 17 (contrast, semantics, alt, focus). ✅
12. *Search visual polish* → Task 18. ✅
13. *Repository-wide consistency* → Task 19. ✅
14. *Preserve architecture* → Global Constraints; no routing/page/nav/programme changes. ✅

**Placeholder scan:** every step names files, code, or an exact command; diagram tasks specify the pose/equipment/annotation contract and the visual-verification step (no "TBD" coordinates — the reference in Task 8 sets the convention the rest follow).

**Type consistency:** `Fig`'s `Pose` (`head`/`torso`/`arms`/`legs`) is defined once in Task 8 and referenced unchanged in Tasks 9-13; `Figure`'s `name` registry keys are the single naming authority used by Task 15's MDX swaps; `DrillCard`/`DrillStep` props match between Tasks 3-5; callout props (`style`, `title`, `children`) match between Task 6 steps; `ReferenceCard` props unchanged between Task 7 steps.
