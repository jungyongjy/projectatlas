import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Seat, PulleyBar } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

export function ChestPressFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Machine Chest Press — start and finish"
      alt={alt ?? "Machine chest press, side view"}
    >
      {/* Machine: backrest, seat and two chest-height press handles.
          Side-view convention: the figure faces LEFT — backrest on the right,
          press handles on the left. */}
      <g
        fill="none"
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* backrest pad behind the torso (right side) */}
        <line x1={374} y1={214} x2={366} y2={350} strokeWidth={12} />
        {/* backrest column + ground base */}
        <line x1={370} y1={350} x2={370} y2={428} />
        <line x1={326} y1={428} x2={430} y2={428} />
      </g>
      <Seat x={348} y={344} width={86} />
      {/* press handles at chest height (far + near), in front of the figure */}
      <PulleyBar x={258} y={222} width={56} />
      <PulleyBar x={246} y={234} width={56} />

      {/* Start (primary): seated, hands at the chest holding the handles */}
      <Fig
        pose={{
          head: { x: 350, y: 186 },
          torso: [
            { x: 344, y: 208 },
            { x: 350, y: 344 },
          ],
          arms: [
            [{ x: 344, y: 212 }, { x: 292, y: 248 }, { x: 246, y: 234 }],
            [{ x: 352, y: 210 }, { x: 304, y: 242 }, { x: 258, y: 222 }],
          ],
          legs: [
            [{ x: 350, y: 344 }, { x: 314, y: 348 }, { x: 306, y: 428 }],
            [{ x: 346, y: 348 }, { x: 304, y: 352 }, { x: 296, y: 428 }],
          ],
        }}
      />
      {/* Finish (ghost): arms extended forward, pressing out */}
      <Fig
        ghost
        pose={{
          head: { x: 350, y: 186 },
          torso: [
            { x: 344, y: 208 },
            { x: 350, y: 344 },
          ],
          arms: [
            [{ x: 344, y: 212 }, { x: 248, y: 226 }, { x: 200, y: 228 }],
            [{ x: 352, y: 210 }, { x: 258, y: 222 }, { x: 210, y: 224 }],
          ],
          legs: [
            [{ x: 350, y: 344 }, { x: 314, y: 348 }, { x: 306, y: 428 }],
            [{ x: 346, y: 348 }, { x: 304, y: 352 }, { x: 296, y: 428 }],
          ],
        }}
      />

      {/* Annotation: the press-out motion */}
      <Arrow x1={252} y1={272} x2={202} y2={238} />
      <Label x={214} y={296}>press forward</Label>
    </FigureCanvas>
  );
}
