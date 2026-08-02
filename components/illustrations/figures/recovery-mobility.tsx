import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

/* Recovery mobility: two scenarios split by a vertical divider.
 * Left — "move": gentle walking for general soreness.
 * Right — "rest": sitting still through sharp pain. */

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

export function RecoveryMobilityFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Recovery Mobility — move, or rest"
      alt={alt ?? "Recovery mobility: move with general soreness, rest through sharp pain"}
    >
      {/* vertical divider */}
      <line x1={320} y1={136} x2={320} y2={428} stroke={FIG.grid} strokeWidth={1.5} strokeDasharray="6 6" />

      {/* MOVE — gentle walking figure, facing LEFT */}
      <PanelTitle x={160}>MOVE</PanelTitle>
      <Fig
        pose={{
          head: { x: 160, y: 150 },
          torso: [
            { x: 163, y: 178 },
            { x: 160, y: 302 },
          ],
          arms: [
            [{ x: 166, y: 184 }, { x: 172, y: 230 }, { x: 176, y: 272 }],
            [{ x: 160, y: 184 }, { x: 152, y: 232 }, { x: 146, y: 276 }],
          ],
          legs: [
            [{ x: 160, y: 302 }, { x: 150, y: 332 }, { x: 142, y: 428 }],
            [{ x: 160, y: 302 }, { x: 175, y: 336 }, { x: 192, y: 428 }],
          ],
        }}
      />
      <Label x={59} y={452}>move with general soreness</Label>

      {/* REST — seated figure, hands resting on the knees */}
      <PanelTitle x={480}>REST</PanelTitle>
      <Fig
        pose={{
          head: { x: 470, y: 240 },
          torso: [
            { x: 476, y: 268 },
            { x: 482, y: 388 },
          ],
          arms: [
            [{ x: 478, y: 274 }, { x: 452, y: 330 }, { x: 442, y: 396 }],
            [{ x: 474, y: 274 }, { x: 508, y: 332 }, { x: 518, y: 398 }],
          ],
          legs: [
            [{ x: 482, y: 388 }, { x: 445, y: 404 }, { x: 428, y: 424 }],
            [{ x: 482, y: 388 }, { x: 520, y: 404 }, { x: 540, y: 424 }],
          ],
        }}
      />
      <Label x={388} y={452}>rest through sharp pain</Label>
    </FigureCanvas>
  );
}
