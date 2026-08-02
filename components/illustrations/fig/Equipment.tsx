import { FIG } from "./palette";

/*
 * Equipment primitives — the kit's machine / implement vocabulary.
 *
 * Every component renders in the shared equipment palette
 * (FIG.equipment outline, FIG.equipmentFill infill) at FIG.strokeWidth,
 * so any diagram can drop them in and stay on-palette by construction.
 *
 * Anchor conventions (documented per component):
 *   - Horizontal implements (Barbell, Dumbbell, PulleyBar) anchor at the
 *     CENTRE of their main bar: (x, y).
 *   - Ground-sitting pieces (Bench, FootPlatform, Cone) anchor at the
 *     centre of their footprint; vertical ones default their base to
 *     FIG.groundY unless given an explicit y.
 *   - Vertical structures (CableStack, Wall) anchor at a caller-chosen
 *     point and extend a fixed height.
 */

interface GroundSitProps {
  x: number;
  y?: number;
}

/** Straight Olympic-style bar with a plate cluster at each end. */
export function Barbell({
  x,
  y,
  width = 180,
}: {
  x: number;
  y: number;
  width?: number;
}) {
  const half = width / 2;
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round">
      <line x1={x - half} y1={y} x2={x + half} y2={y} />
      {/* left plate cluster */}
      <rect x={x - half - 9} y={y - 6} width={18} height={12} fill={FIG.equipmentFill} stroke="none" />
      {/* right plate cluster */}
      <rect x={x + half - 9} y={y - 6} width={18} height={12} fill={FIG.equipmentFill} stroke="none" />
      {/* collars just inside the plates */}
      <line x1={x - half + 12} y1={y - 5} x2={x - half + 12} y2={y + 5} strokeWidth={2} />
      <line x1={x + half - 12} y1={y - 5} x2={x + half - 12} y2={y + 5} strokeWidth={2} />
    </g>
  );
}

/** Short handled dumbbell, horizontal, anchored at the centre of the bar. */
export function Dumbbell({
  x,
  y,
  length = 48,
}: {
  x: number;
  y: number;
  length?: number;
}) {
  const half = length / 2;
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round">
      <line x1={x - half} y1={y} x2={x + half} y2={y} />
      <rect x={x - half - 7} y={y - 5} width={9} height={10} fill={FIG.equipmentFill} stroke="none" />
      <rect x={x + half - 2} y={y - 5} width={9} height={10} fill={FIG.equipmentFill} stroke="none" />
    </g>
  );
}

/**
 * Flat weight bench. `x` is the horizontal centre of the seat; `height`
 * is the seat-top height above the ground line. Two legs reach the floor.
 */
export function Bench({
  x,
  height,
  width = 130,
}: {
  x: number;
  height: number;
  width?: number;
}) {
  const half = width / 2;
  const top = FIG.groundY - height;
  const legL = x - half + 10;
  const legR = x + half - 10;
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round">
      {/* seat cushion */}
      <rect x={x - half} y={top - 4} width={width} height={10} fill={FIG.equipmentFill} stroke="none" />
      {/* seat rails */}
      <line x1={x - half} y1={top} x2={x + half} y2={top} />
      {/* legs */}
      <line x1={legL} y1={top} x2={legL} y2={FIG.groundY} />
      <line x1={legR} y1={top} x2={legR} y2={FIG.groundY} />
    </g>
  );
}

/**
 * Small seat / box / plyo stool. (x, y) is the centre of the seat surface;
 * legs drop to the ground line.
 */
export function Seat({
  x,
  y,
  width = 90,
}: {
  x: number;
  y: number;
  width?: number;
}) {
  const half = width / 2;
  const legL = x - half + 8;
  const legR = x + half - 8;
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round">
      <rect x={x - half} y={y - 3} width={width} height={8} fill={FIG.equipmentFill} stroke="none" />
      <line x1={x - half} y1={y} x2={x + half} y2={y} />
      <line x1={legL} y1={y} x2={legL} y2={FIG.groundY} />
      <line x1={legR} y1={y} x2={legR} y2={FIG.groundY} />
    </g>
  );
}

/**
 * Low step / foot platform sitting on the floor. (x, y) is the centre of
 * the top edge; the box is `depth` tall. Pass y = FIG.groundY - depth to
 * place it flush with the ground.
 */
export function FootPlatform({
  x,
  y = FIG.groundY - 12,
  width = 64,
  depth = 12,
}: {
  x: number;
  y?: number;
  width?: number;
  depth?: number;
}) {
  const half = width / 2;
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect
        x={x - half}
        y={y}
        width={width}
        height={depth}
        fill={FIG.equipmentFill}
        stroke={FIG.equipment}
      />
    </g>
  );
}

/**
 * Weight-stack cable machine. (x, y) is the centre of the base on the
 * floor; the column rises `columnH` with the pulley housing at its top
 * and a weight stack near the bottom.
 */
export function CableStack({
  x,
  y,
  columnH = 250,
}: GroundSitProps & {
  columnH?: number;
}) {
  const base = y ?? FIG.groundY;
  const top = base - columnH;
  const stackBottom = base - 12;
  const stackTop = base - 92;
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* guide column */}
      <line x1={x} y1={top} x2={x} y2={base} />
      {/* pulley housing */}
      <rect x={x - 18} y={top} width={36} height={18} rx={4} fill={FIG.equipmentFill} stroke={FIG.equipment} />
      {/* cable dropping from the pulley */}
      <line x1={x} y1={top + 18} x2={x} y2={top + 34} strokeWidth={2} />
      {/* weight stack */}
      <rect x={x - 14} y={stackTop} width={28} height={stackBottom - stackTop} fill={FIG.equipmentFill} stroke={FIG.equipment} />
      {/* base plate */}
      <line x1={x - 22} y1={base} x2={x + 22} y2={base} />
    </g>
  );
}

/** Lat-pulldown / row handle bar. (x, y) is the centre of the bar. */
export function PulleyBar({
  x,
  y,
  width = 72,
}: {
  x: number;
  y: number;
  width?: number;
}) {
  const half = width / 2;
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round">
      <line x1={x - half} y1={y} x2={x + half} y2={y} />
      {/* attachment cable stub */}
      <line x1={x} y1={y - 4} x2={x} y2={y - 18} strokeWidth={2} />
    </g>
  );
}

/** Running track oval, anchored at the ellipse centre. */
export function TrackOval({
  x,
  y,
  rx = 220,
  ry = 88,
}: {
  x: number;
  y: number;
  rx?: number;
  ry?: number;
}) {
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth}>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} />
      {/* inner lane divider */}
      <ellipse cx={x} cy={y} rx={rx - 22} ry={ry - 22} strokeWidth={1.5} stroke={FIG.grid} />
    </g>
  );
}

/** Traffic cone. (x, y) is the centre of the base (defaults to the ground). */
export function Cone({ x, y = FIG.groundY }: GroundSitProps) {
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path
        d={`M ${x - 10} ${y} L ${x - 5} ${y - 26} L ${x + 5} ${y - 26} L ${x + 10} ${y} Z`}
        fill={FIG.equipmentFill}
        stroke={FIG.equipment}
      />
      <line x1={x - 14} y1={y} x2={x + 14} y2={y} />
    </g>
  );
}

/**
 * Wall / post the figure can lean against. (x, y) is the top of the wall
 * face; the face drops `height` px. When it reaches the ground a foot is
 * drawn so the wall reads as anchored.
 */
export function Wall({
  x,
  y,
  height = 110,
}: {
  x: number;
  y: number;
  height?: number;
}) {
  const bottom = y + height;
  const hitsGround = bottom >= FIG.groundY - 1;
  return (
    <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round">
      <line x1={x} y1={y} x2={x} y2={hitsGround ? FIG.groundY : bottom} />
      {/* wall cap */}
      <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
      {hitsGround && <line x1={x - 12} y1={FIG.groundY} x2={x + 12} y2={FIG.groundY} />}
    </g>
  );
}
