import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

export function PullUpsFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Pull-up — dead hang to chin over bar"
      alt={alt ?? "Pull-up range of motion: dead hang to chin over bar"}
    >
      {/* Overhead pull-up bar spanning both positions */}
      <g fill="none" stroke={FIG.equipment} strokeWidth={FIG.strokeWidth} strokeLinecap="round">
        <line x1={210} y1={40} x2={430} y2={40} />
        <line x1={210} y1={35} x2={210} y2={45} />
        <line x1={430} y1={35} x2={430} y2={45} />
      </g>

      {/* Start (primary, left): full dead hang — arms extended, body suspended */}
      <Fig
        pose={{
          head: { x: 300, y: 100 },
          torso: [
            { x: 300, y: 148 },
            { x: 300, y: 300 },
          ],
          arms: [
            [{ x: 290, y: 152 }, { x: 282, y: 96 }, { x: 274, y: 40 }],
            [{ x: 310, y: 152 }, { x: 318, y: 96 }, { x: 326, y: 40 }],
          ],
          legs: [
            [{ x: 296, y: 302 }, { x: 296, y: 380 }, { x: 294, y: 418 }],
            [{ x: 304, y: 302 }, { x: 304, y: 380 }, { x: 306, y: 418 }],
          ],
        }}
      />

      {/* Finish (ghost, right): chin over the bar — elbows bent, body pulled up */}
      <Fig
        ghost
        pose={{
          head: { x: 390, y: 26 },
          torso: [
            { x: 390, y: 68 },
            { x: 390, y: 218 },
          ],
          arms: [
            [{ x: 384, y: 72 }, { x: 368, y: 116 }, { x: 380, y: 40 }],
            [{ x: 396, y: 72 }, { x: 412, y: 116 }, { x: 400, y: 40 }],
          ],
          legs: [
            [{ x: 386, y: 220 }, { x: 386, y: 280 }, { x: 384, y: 320 }],
            [{ x: 394, y: 220 }, { x: 394, y: 280 }, { x: 396, y: 320 }],
          ],
        }}
      />

      {/* Annotations: the bar line at the finish position and the hang start */}
      <Arrow x1={422} y1={24} x2={396} y2={40} />
      <Label x={432} y={18}>chin over bar</Label>

      <Arrow x1={180} y1={250} x2={294} y2={250} />
      <Label x={108} y={245}>dead hang</Label>
    </FigureCanvas>
  );
}
