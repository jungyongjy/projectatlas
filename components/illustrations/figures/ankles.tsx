import { useId } from "react";
import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

/* Three compact leg+foot views in one canvas: dorsiflexion, plantar
 * flexion, and ankle circles. Each panel shares the same layout so the
 * three motions read as one consistent sequence. Side-view convention:
 * the foot points LEFT. */

const PANEL = [
  { cx: 115, title: "DORSIFLEXION", caption: "toes up" },
  { cx: 320, title: "PLANTARFLEXION", caption: "toes down" },
  { cx: 525, title: "CIRCLES", caption: "rotate ankle" },
];

/** A bare lower body: a full leg (hip → knee → ankle) with no head or torso. */
function Leg({ cx, ghost }: { cx: number; ghost?: boolean }) {
  return (
    <Fig
      ghost={ghost}
      pose={{
        head: { x: cx + 2, y: 150 },
        headRadius: 0,
        torso: [],
        arms: [],
        legs: [[{ x: cx + 2, y: 150 }, { x: cx, y: 300 }, { x: cx - 2, y: 428 }]],
      }}
    />
  );
}

/** The foot as a short line past the ankle. `kind` sets the ankle motion. */
function Foot({
  cx,
  kind,
  ghost,
}: {
  cx: number;
  kind: "flat" | "up" | "down";
  ghost?: boolean;
}) {
  const stroke = ghost ? FIG.ghost : FIG.body;
  const dash = ghost ? FIG.dash : undefined;
  if (kind === "up") {
    // dorsiflexion: toes lift toward the shin, heel stays down
    return (
      <line
        x1={cx - 2} y1={428} x2={cx - 52} y2={392}
        stroke={stroke} strokeWidth={FIG.strokeWidth} strokeLinecap="round"
        strokeDasharray={dash}
      />
    );
  }
  if (kind === "down") {
    // plantar flexion: heel lifts, ball/toes stay on the ground
    const pts = [{ x: cx - 2, y: 428 }, { x: cx + 4, y: 404 }, { x: cx - 54, y: 428 }];
    return (
      <polyline
        points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={stroke} strokeWidth={FIG.strokeWidth} strokeLinecap="round"
        strokeLinejoin="round" strokeDasharray={dash}
      />
    );
  }
  // neutral / flat foot
  return (
    <line
      x1={cx - 2} y1={428} x2={cx - 58} y2={428}
      stroke={stroke} strokeWidth={FIG.strokeWidth} strokeLinecap="round"
      strokeDasharray={dash}
    />
  );
}

/** Dashed amber motion arc with an arrowhead at the tip. */
function MotionArc({ d }: { d: string }) {
  const markerId = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10" refX="8.5" refY="5"
          markerWidth="7" markerHeight="7" orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill={FIG.annotation} />
        </marker>
      </defs>
      <path
        d={d}
        fill="none" stroke={FIG.annotation} strokeWidth={2.5}
        strokeDasharray={FIG.dash} strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />
    </g>
  );
}

function PanelTitle({ x, children }: { x: number; children: string }) {
  return (
    <text
      x={x} y={120} textAnchor="middle"
      fill={FIG.label} fontFamily={FIG.font} fontSize={13} letterSpacing={1}
    >
      {children}
    </text>
  );
}

export function AnklesFigure({ alt }: { alt?: string }) {
  const [p1, p2, p3] = PANEL;
  return (
    <FigureCanvas
      title="Ankle Mobility — dorsiflexion, plantar flexion, circles"
      alt={alt ?? "Ankle mobility exercises: dorsiflexion, plantar flexion, and circles"}
    >
      {/* sub-frame dividers */}
      <line x1={217.5} y1={136} x2={217.5} y2={428} stroke={FIG.grid} strokeWidth={1.5} />
      <line x1={422.5} y1={136} x2={422.5} y2={428} stroke={FIG.grid} strokeWidth={1.5} />

      {/* Panel 1 — dorsiflexion */}
      <PanelTitle x={p1.cx}>{p1.title}</PanelTitle>
      <Leg cx={p1.cx} />
      <Foot cx={p1.cx} kind="flat" ghost />
      <Foot cx={p1.cx} kind="up" />
      <MotionArc d={`M ${p1.cx - 56} 420 Q ${p1.cx - 52} 396 ${p1.cx - 44} 394`} />
      <Label x={p1.cx - 36} y={452}>{p1.caption}</Label>

      {/* Panel 2 — plantar flexion */}
      <PanelTitle x={p2.cx}>{p2.title}</PanelTitle>
      <Leg cx={p2.cx} />
      <Foot cx={p2.cx} kind="flat" ghost />
      <Foot cx={p2.cx} kind="down" />
      <MotionArc d={`M ${p2.cx - 52} 422 Q ${p2.cx - 16} 412 ${p2.cx + 2} 402`} />
      <Label x={p2.cx - 42} y={452}>{p2.caption}</Label>

      {/* Panel 3 — ankle circles */}
      <PanelTitle x={p3.cx}>{p3.title}</PanelTitle>
      <Leg cx={p3.cx} />
      <Foot cx={p3.cx} kind="flat" />
      <MotionArc d={`M ${p3.cx - 40} 406 A 22 16 0 0 1 ${p3.cx + 4} 406`} />
      <Label x={p3.cx - 52} y={452}>{p3.caption}</Label>
    </FigureCanvas>
  );
}
