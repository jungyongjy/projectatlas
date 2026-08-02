import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Arrow } from "../fig/Arrow";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

/* Horizontal three-step warm-up sequence: raise body temperature,
 * mobilise, then activate. Three mini-figures in one canvas with
 * arrows between the steps. */

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

export function WarmUpRoutineFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Warm-Up Sequence — raise temp, mobilise, activate"
      alt={alt ?? "Warm-up sequence: raise body temperature, mobilise, then activate"}
    >
      {/* Step 1 — raise body temperature: light jog, arms pumping */}
      <PanelTitle x={115}>RAISE TEMP</PanelTitle>
      <Fig
        pose={{
          head: { x: 112, y: 140 },
          torso: [
            { x: 114, y: 170 },
            { x: 112, y: 300 },
          ],
          arms: [
            [{ x: 116, y: 176 }, { x: 132, y: 204 }, { x: 104, y: 232 }],
            [{ x: 110, y: 176 }, { x: 98, y: 210 }, { x: 118, y: 246 }],
          ],
          legs: [
            [{ x: 112, y: 300 }, { x: 96, y: 330 }, { x: 78, y: 428 }],
            [{ x: 112, y: 300 }, { x: 138, y: 344 }, { x: 160, y: 428 }],
          ],
        }}
      />
      <Label x={70} y={452}>light jog</Label>

      <Arrow x1={206} y1={250} x2={232} y2={250} />

      {/* Step 2 — mobilise: standing leg swing */}
      <PanelTitle x={320}>MOBILISE</PanelTitle>
      <Fig
        pose={{
          head: { x: 320, y: 140 },
          torso: [
            { x: 322, y: 170 },
            { x: 320, y: 300 },
          ],
          arms: [
            [{ x: 324, y: 176 }, { x: 340, y: 210 }, { x: 356, y: 244 }],
            [{ x: 318, y: 176 }, { x: 304, y: 208 }, { x: 296, y: 242 }],
          ],
          legs: [
            [{ x: 320, y: 300 }, { x: 318, y: 360 }, { x: 316, y: 428 }],
            [{ x: 320, y: 300 }, { x: 292, y: 258 }, { x: 270, y: 244 }],
          ],
        }}
      />
      <Label x={286} y={452}>leg swings</Label>

      <Arrow x1={410} y1={250} x2={436} y2={250} />

      {/* Step 3 — activate: bodyweight squat */}
      <PanelTitle x={525}>ACTIVATE</PanelTitle>
      <Fig
        pose={{
          head: { x: 524, y: 200 },
          torso: [
            { x: 526, y: 228 },
            { x: 522, y: 350 },
          ],
          arms: [
            [{ x: 528, y: 234 }, { x: 556, y: 252 }, { x: 566, y: 276 }],
            [{ x: 522, y: 234 }, { x: 550, y: 254 }, { x: 560, y: 280 }],
          ],
          legs: [
            [{ x: 522, y: 350 }, { x: 490, y: 362 }, { x: 482, y: 428 }],
            [{ x: 522, y: 350 }, { x: 552, y: 364 }, { x: 558, y: 428 }],
          ],
        }}
      />
      <Label x={482} y={452}>squat</Label>
    </FigureCanvas>
  );
}
