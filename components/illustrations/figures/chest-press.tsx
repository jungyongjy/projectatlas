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
      {/* Machine: backrest, seat and two chest-height press handles */}
      <g
        fill="none"
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* backrest pad behind the torso */}
        <line x1={250} y1={212} x2={259} y2={352} strokeWidth={12} />
        {/* backrest column + ground base */}
        <line x1={256} y1={352} x2={256} y2={428} />
        <line x1={232} y1={428} x2={360} y2={428} />
      </g>
      <Seat x={292} y={344} width={86} />
      {/* press handles at chest height (far + near) */}
      <PulleyBar x={382} y={222} width={56} />
      <PulleyBar x={394} y={234} width={56} />

      {/* Start (primary): seated, hands at the chest holding the handles */}
      <Fig
        pose={{
          head: { x: 290, y: 186 },
          torso: [
            { x: 296, y: 208 },
            { x: 290, y: 344 },
          ],
          arms: [
            [{ x: 296, y: 212 }, { x: 348, y: 248 }, { x: 394, y: 234 }],
            [{ x: 288, y: 210 }, { x: 336, y: 242 }, { x: 382, y: 222 }],
          ],
          legs: [
            [{ x: 290, y: 344 }, { x: 326, y: 348 }, { x: 334, y: 428 }],
            [{ x: 294, y: 348 }, { x: 336, y: 352 }, { x: 344, y: 428 }],
          ],
        }}
      />
      {/* Finish (ghost): arms extended forward, pressing out */}
      <Fig
        ghost
        pose={{
          head: { x: 290, y: 186 },
          torso: [
            { x: 296, y: 208 },
            { x: 290, y: 344 },
          ],
          arms: [
            [{ x: 296, y: 212 }, { x: 392, y: 226 }, { x: 440, y: 228 }],
            [{ x: 288, y: 210 }, { x: 382, y: 222 }, { x: 430, y: 224 }],
          ],
          legs: [
            [{ x: 290, y: 344 }, { x: 326, y: 348 }, { x: 334, y: 428 }],
            [{ x: 294, y: 348 }, { x: 336, y: 352 }, { x: 344, y: 428 }],
          ],
        }}
      />

      {/* Annotation: the press-out motion */}
      <Arrow x1={408} y1={272} x2={436} y2={240} />
      <Label x={372} y={296}>press forward</Label>
    </FigureCanvas>
  );
}
