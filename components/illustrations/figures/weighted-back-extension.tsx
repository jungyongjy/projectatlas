import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Arrow } from "../fig/Arrow";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

export function WeightedBackExtensionFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Weighted Back Extension — start and top positions"
      alt={alt ?? "Weighted back extension, side view showing start and top positions"}
    >
      {/* Machine: elevated hip pad, slanted board, ankle support */}
      <g
        fill="none"
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* hip pad */}
        <rect x={280} y={300} width={50} height={14} fill={FIG.equipmentFill} />
        {/* column + base foot */}
        <line x1={305} y1={314} x2={305} y2={428} />
        <line x1={288} y1={428} x2={330} y2={428} />
        {/* slanted bench board down to the ankle pad */}
        <line x1={330} y1={316} x2={440} y2={370} strokeWidth={11} />
        {/* ankle support */}
        <rect x={436} y={356} width={28} height={30} fill={FIG.equipmentFill} />
      </g>

      {/* Bottom position (ghost): torso hangs down, plate held at the chest */}
      <Fig
        ghost
        pose={{
          head: { x: 265, y: 413 },
          torso: [
            { x: 272, y: 392 },
            { x: 300, y: 306 },
          ],
          arms: [
            [{ x: 272, y: 392 }, { x: 266, y: 388 }, { x: 262, y: 382 }],
            [{ x: 268, y: 392 }, { x: 262, y: 388 }, { x: 258, y: 382 }],
          ],
          legs: [
            [{ x: 300, y: 306 }, { x: 392, y: 348 }, { x: 440, y: 370 }],
            [{ x: 304, y: 308 }, { x: 398, y: 350 }, { x: 446, y: 372 }],
          ],
        }}
      />

      {/* Top position: hips on the pad, torso horizontal, plate held at the chest */}
      <Fig
        pose={{
          head: { x: 160, y: 278 },
          torso: [
            { x: 205, y: 294 },
            { x: 300, y: 306 },
          ],
          arms: [
            [{ x: 205, y: 300 }, { x: 222, y: 282 }, { x: 234, y: 274 }],
            [{ x: 201, y: 300 }, { x: 216, y: 284 }, { x: 228, y: 276 }],
          ],
          legs: [
            [{ x: 300, y: 306 }, { x: 392, y: 348 }, { x: 440, y: 370 }],
            [{ x: 304, y: 308 }, { x: 398, y: 350 }, { x: 446, y: 372 }],
          ],
        }}
      />

      {/* Weight plate held at the chest (top) and hanging at the chest (bottom) */}
      <rect x={228} y={270} width={14} height={36} rx={3} fill={FIG.equipmentFill} stroke={FIG.equipment} strokeWidth={2.5} />
      <rect x={260} y={366} width={14} height={32} rx={3} fill={FIG.equipmentFill} stroke={FIG.equipment} strokeWidth={2.5} />

      {/* Annotation */}
      <Arrow x1={370} y1={300} x2={324} y2={315} />
      <Label x={330} y={294}>hips on pad</Label>
    </FigureCanvas>
  );
}
