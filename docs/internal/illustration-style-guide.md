# Illustration Style Guide

Internal engineering conventions for the SVG figure kit used in handbook diagrams. Every handbook diagram must be built from this kit so the whole library reads as one visual system.

All primitives live under `components/illustrations/fig/`; concrete diagrams live under `components/illustrations/figures/` and are registered in `components/illustrations/Figure.tsx`.

| File | Role |
| --- | --- |
| `components/illustrations/fig/FigureCanvas.tsx` | 640×480 frame, ground line, title, a11y label |
| `components/illustrations/fig/palette.ts` | the one source of truth for every colour/token |
| `components/illustrations/fig/Fig.tsx` | human figure primitive (`<Fig />`) |
| `components/illustrations/fig/types.ts` | `Pose` / `Point` shapes for a figure |
| `components/illustrations/fig/Equipment.tsx` | all machine / implement primitives |
| `components/illustrations/fig/Arrow.tsx` | annotation arrows |
| `components/illustrations/fig/Label.tsx` | annotation text |

---

## 1. Canvas

Every diagram is a single `<FigureCanvas>` — the fixed 640×480 stage.

- **viewBox**: `0 0 640 480`.
- **Frame**: `rounded-xl`, `border` using the atlas surface/border tokens (drawn by the wrapping `<figure>` in `FigureCanvas.tsx`).
- **Background**: `#161616` (`FIG.bg`).
- **Ground line**: `y = 428` (`FIG.groundY`) drawn in `#2a2a2a` (`FIG.grid`), `strokeWidth 1.5`.

```tsx
import { FigureCanvas } from "../fig/FigureCanvas";

<FigureCanvas
  title="Romanian Deadlift — hip hinge, neutral spine" // optional, see Annotations
  alt="Romanian deadlift hip hinge with a neutral spine" // required, becomes the aria-label
>
  {/* figures, equipment, arrows, labels */}
</FigureCanvas>
```

Reference: `components/illustrations/fig/FigureCanvas.tsx`, `components/illustrations/fig/palette.ts`.

The palette module is the single source of truth for tokens — never hardcode a hex anywhere in a figure:

```ts
// components/illustrations/fig/palette.ts
export const FIG = {
  viewBox: { w: 640, h: 480 },
  groundY: 428,
  bg: "#161616",          // canvas background
  grid: "#2a2a2a",        // ground line
  body: "#4f8ef7",        // primary figure
  ghost: "#7a7a7a",       // dashed start position
  equipment: "#3a3a3a",   // equipment outline
  equipmentFill: "#232323",
  annotation: "#f39c12",  // arrows / highlights
  label: "#9a9a9a",
  strokeWidth: 3.5,
  dash: "7 6",
  font: "JetBrains Mono, monospace",
} as const;
```

---

## 2. Figures (`Fig`)

Human figures are built from the `Fig` primitive. A figure is one head circle plus limb polylines — nothing else (no faces, no muscles).

- **Head**: circle `r = 13` (`headRadius` defaults to 13), filled with the figure colour.
- **Limbs**: single polylines — torso, per-arm `shoulder → elbow → wrist`, per-leg `hip → knee → ankle`.
- **Stroke**: `strokeWidth 3.5` (`FIG.strokeWidth`), round caps and joins.
- **Ghost**: pass `ghost` for a start position — stroke becomes `#7a7a7a` (`FIG.ghost`) with a `7 6` dash (`FIG.dash`).
- **Facing**: human figures always face **left** in side views (the chest faces the left edge of the canvas).

```tsx
import { Fig } from "../fig/Fig";
import type { Pose } from "../fig/types";

const pose: Pose = {
  head: { x: 290, y: 92 },
  torso: [
    { x: 298, y: 112 },   // shoulder
    { x: 282, y: 178 },   // mid
    { x: 258, y: 252 },   // hip
  ],
  arms: [
    [{ x: 298, y: 122 }, { x: 246, y: 176 }, { x: 210, y: 232 }], // far arm
    [{ x: 296, y: 124 }, { x: 300, y: 180 }, { x: 296, y: 236 }], // near arm
  ],
  legs: [
    [{ x: 258, y: 252 }, { x: 246, y: 352 }, { x: 240, y: 428 }],
    [{ x: 258, y: 252 }, { x: 296, y: 350 }, { x: 308, y: 428 }],
  ],
};

<Fig pose={pose} />              // primary (blue)
<Fig ghost pose={startPose} />   // start position (dashed grey)
```

The `Pose` type (`components/illustrations/fig/types.ts`) documents the shape:

```ts
interface Pose {
  head: Point;
  headRadius?: number;   // default 13
  torso: Point[];        // shoulder → … → hip (2-3 points)
  arms: Point[][];       // per arm: shoulder → elbow → wrist
  legs: Point[][];       // per leg: hip → knee → ankle
}
```

All coordinates are in the 640×480 canvas space.

Reference: `components/illustrations/fig/Fig.tsx`, `components/illustrations/fig/types.ts`.

---

## 3. Equipment

Equipment is drawn **only** via the kit primitives in `components/illustrations/fig/Equipment.tsx`. Never draw a machine or implement inline.

- **Outline**: `#3a3a3a` (`FIG.equipment`).
- **Fill**: `#232323` (`FIG.equipmentFill`) for solid bodies (cushions, plates, stacks).
- **Stroke width**: `3.5` (`FIG.strokeWidth`) — the same as figures.

```tsx
import { Bench, Barbell, CableStack, Cone } from "../fig/Equipment";

<Bench x={450} height={44} width={110} />
<Barbell x={360} y={254} width={170} />
<CableStack x={520} />
<Cone x={110} />
```

### Anchor conventions

Each primitive anchors at a documented point. Follow the per-component JSDoc in `Equipment.tsx`:

| Primitive | Anchor `(x, y)` | Notes |
| --- | --- | --- |
| `Barbell` | centre of the main bar | `width` 180 default; filled plate clusters at each end, collars inset |
| `Dumbbell` | centre of the bar | `length` 48 default |
| `Bench` | `x` = horizontal centre of the seat; `height` = seat-top height **above** the ground line | `width` 130 default; two legs reach the floor |
| `Seat` | centre of the seat surface | `width` 90 default; legs drop to the ground line |
| `FootPlatform` | centre of the **top edge** | `depth` 12 default; pass `y = FIG.groundY - depth` to sit flush on the floor |
| `CableStack` | centre of the base on the floor | `columnH` 250 default; `y` defaults to `FIG.groundY`; pulley housing at top, weight stack near the base |
| `PulleyBar` | centre of the bar | `width` 72 default; attachment cable stub rises above |
| `TrackOval` | ellipse centre | `rx` 220 / `ry` 88 default; inner lane divider in `FIG.grid` |
| `Cone` | centre of the base | `y` defaults to `FIG.groundY` |
| `Wall` | **top** of the wall face | `height` 110 default; a foot is drawn when the wall reaches the ground |

Summary rule of thumb (from the `Equipment.tsx` header comment): horizontal implements (`Barbell`, `Dumbbell`, `PulleyBar`) anchor at the centre of their bar; ground-sitting pieces (`Bench`, `FootPlatform`, `Cone`) anchor at the centre of their footprint, with vertical pieces defaulting their base to `FIG.groundY`; vertical structures (`CableStack`, `Wall`) anchor at a caller-chosen point and extend a fixed height.

---

## 4. Annotations

### Arrows (`Arrow`)

Dashed annotation arrows in the highlight amber, with a filled arrowhead.

- **Colour**: `#f39c12` (`FIG.annotation`).
- **Dash**: `6 5` (`strokeDasharray` in `Arrow.tsx`).
- **Head**: small filled triangle via an SVG `<marker>`; each instance gets a unique marker id so multiple arrows never collide.

```tsx
import { Arrow } from "../fig/Arrow";

<Arrow x1={250} y1={120} x2={222} y2={196} />
```

Reference: `components/illustrations/fig/Arrow.tsx`.

### Labels (`Label`)

All diagram text goes through the `Label` component — never raw `<text>`.

- **Font**: JetBrains Mono (`FIG.font`).
- **Size**: `14`.
- **Colour**: `#9a9a9a` (`FIG.label`) by default.
- **Strong**: `strong` uses the figure accent `#4f8ef7` (`FIG.body`) — for spine lines, key joints, and emphasis.
- `(x, y)` is the SVG **text baseline start**.

```tsx
import { Label } from "../fig/Label";

<Label x={210} y={112}>hips back</Label>
<Label x={330} y={200} strong>neutral spine</Label>
```

Reference: `components/illustrations/fig/Label.tsx`.

### Figure title

The `title` prop on `FigureCanvas` renders a small label at the **top-left** (`x = 20`, `y = 30`).

- Uppercased automatically.
- JetBrains Mono, size `13`, `letterSpacing 1`.
- Muted label colour (`FIG.label`).

```tsx
<FigureCanvas title="Pull-up — dead hang to chin over bar" alt="…">
```

Reference: `components/illustrations/fig/FigureCanvas.tsx`.

---

## 5. Composition rules

- **Padding**: keep figures, equipment, and labels at least **20px** from the frame edges.
- **No overlap**: never let a label overlap a figure or equipment. Place labels in open space and let `Arrow` point at the thing being annotated.
- **One highlight**: a diagram uses the amber `#f39c12` (`FIG.annotation`) for **at most one** highlight concept (arrows, highlight labels). Everything else stays on the figure/ghost/equipment/label tokens.
- **Multi-panel diagrams**: use **equal gutters** between panels (see `warm-up-routine.tsx`, which spaces three panels evenly across the 640px canvas and separates them with horizontal arrows).
- **Facing left**: side-view figures face left; place the start/ghost position and movement arrow consistently with that convention.
- **Alt text**: every diagram carries a descriptive `alt` — either on the `FigureCanvas` or overridden per instance via the `alt` prop accepted by every registered figure.

---

## 6. Do / Don't

**Do**
- Use ghost figures (`<Fig ghost />`) for start positions and ranges of motion.
- Give every diagram a descriptive `alt`.
- Keep to the 640×480 canvas.
- Use JetBrains Mono for all text (via `Label`, the `FigureCanvas` title, or `FIG.font`).
- Import equipment from the kit (`components/illustrations/fig/Equipment.tsx`).
- Use the amber `#f39c12` sparingly — one highlight per diagram.

**Don't**
- Don't draw faces or muscles — a figure is a head circle plus limb polylines.
- Don't introduce colours outside the palette — use the `FIG.*` tokens, never new hex values.
- Don't use inline hex codes in figure components — import `FIG` and reference named tokens.
- Don't use raw `<text>` for labels — use the `Label` component.
- Don't draw equipment inline — use the `Equipment` primitives.

> Note: a few older diagrams (e.g. some early lifts in `components/illustrations/figures/`) predate the kit and still contain inline strokes/hex. These are migration targets; new and edited diagrams must follow the rules above.

---

## Example

A minimal but complete diagram, assembled entirely from the kit:

```tsx
import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Bench, Barbell } from "../fig/Equipment";
import { Arrow } from "../fig/Arrow";
import { Label } from "../fig/Label";

export function ExampleFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Barbell Hip Thrust — start and top"
      alt={alt ?? "Barbell hip thrust, side view showing start and top positions"}
    >
      <Bench x={450} height={44} width={110} />
      <Fig
        ghost
        pose={{
          head: { x: 508, y: 398 },
          torso: [{ x: 470, y: 378 }, { x: 365, y: 410 }],
          arms: [
            [{ x: 470, y: 384 }, { x: 462, y: 404 }, { x: 454, y: 422 }],
            [{ x: 464, y: 384 }, { x: 460, y: 402 }, { x: 452, y: 420 }],
          ],
          legs: [
            [{ x: 365, y: 410 }, { x: 300, y: 330 }, { x: 290, y: 428 }],
            [{ x: 365, y: 410 }, { x: 320, y: 334 }, { x: 310, y: 428 }],
          ],
        }}
      />
      <Fig
        pose={{
          head: { x: 502, y: 368 },
          torso: [{ x: 470, y: 378 }, { x: 368, y: 268 }],
          arms: [
            [{ x: 470, y: 384 }, { x: 452, y: 406 }, { x: 438, y: 424 }],
            [{ x: 466, y: 384 }, { x: 460, y: 402 }, { x: 454, y: 420 }],
          ],
          legs: [
            [{ x: 368, y: 268 }, { x: 285, y: 270 }, { x: 278, y: 428 }],
            [{ x: 368, y: 268 }, { x: 300, y: 272 }, { x: 293, y: 428 }],
          ],
        }}
      />
      <Barbell x={360} y={254} width={170} />
      <Arrow x1={380} y1={400} x2={380} y2={292} />
      <Label x={215} y={234}>drive hips up</Label>
    </FigureCanvas>
  );
}
```

Register the component in `components/illustrations/Figure.tsx` under its camelCase name, then use it in MDX via `<Figure name="example" />`.
