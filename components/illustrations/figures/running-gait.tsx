import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

/* Three stances of a single runner across the canvas — mid-stance,
 * push-off, then swing — read left to right as the gait cycle. The
 * runner faces RIGHT (direction of travel). */

function PhaseTitle({ x, children }: { x: number; children: string }) {
  return (
    <text
      x={x} y={110} textAnchor="middle"
      fill={FIG.label} fontFamily={FIG.font} fontSize={13} letterSpacing={1}
    >
      {children}
    </text>
  );
}

export function RunningGaitFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Running gait — stance and swing phases"
      alt={alt ?? "Running gait cycle showing the stance and swing phases"}
    >
      {/* Phase 1 — mid-stance: support leg under the hip, torso upright */}
      <PhaseTitle x={130}>MID-STANCE</PhaseTitle>
      <Fig
        pose={{
          head: { x: 130, y: 150 },
          torso: [
            { x: 132, y: 180 },
            { x: 132, y: 300 },
          ],
          arms: [
            [{ x: 133, y: 186 }, { x: 152, y: 212 }, { x: 160, y: 244 }],
            [{ x: 131, y: 186 }, { x: 116, y: 212 }, { x: 108, y: 244 }],
          ],
          legs: [
            [{ x: 132, y: 300 }, { x: 132, y: 364 }, { x: 132, y: 428 }],
            [{ x: 132, y: 300 }, { x: 148, y: 350 }, { x: 160, y: 428 }],
          ],
        }}
      />
      <Label x={92} y={452}>foot under hip</Label>

      {/* progression arrow */}
      <Arrow x1={215} y1={250} x2={245} y2={250} />

      {/* Phase 2 — push-off: lean forward, back leg extends and drives */}
      <PhaseTitle x={320}>PUSH-OFF</PhaseTitle>
      <Fig
        pose={{
          head: { x: 318, y: 142 },
          torso: [
            { x: 320, y: 172 },
            { x: 328, y: 294 },
          ],
          arms: [
            [{ x: 322, y: 178 }, { x: 342, y: 204 }, { x: 354, y: 236 }],
            [{ x: 318, y: 178 }, { x: 304, y: 206 }, { x: 296, y: 240 }],
          ],
          legs: [
            [{ x: 328, y: 294 }, { x: 298, y: 346 }, { x: 270, y: 428 }],
            [{ x: 328, y: 294 }, { x: 350, y: 322 }, { x: 362, y: 396 }],
          ],
        }}
      />
      <Label x={278} y={452}>push through the toe</Label>

      {/* progression arrow */}
      <Arrow x1={405} y1={250} x2={435} y2={250} />

      {/* Phase 3 — swing: recovery leg drives the knee forward */}
      <PhaseTitle x={510}>SWING</PhaseTitle>
      <Fig
        pose={{
          head: { x: 508, y: 150 },
          torso: [
            { x: 510, y: 180 },
            { x: 512, y: 300 },
          ],
          arms: [
            [{ x: 512, y: 186 }, { x: 530, y: 212 }, { x: 538, y: 244 }],
            [{ x: 510, y: 186 }, { x: 496, y: 212 }, { x: 488, y: 244 }],
          ],
          legs: [
            [{ x: 512, y: 300 }, { x: 534, y: 330 }, { x: 546, y: 398 }],
            [{ x: 512, y: 300 }, { x: 494, y: 360 }, { x: 486, y: 428 }],
          ],
        }}
      />
      <Label x={468} y={452}>knee drives forward</Label>
    </FigureCanvas>
  );
}
