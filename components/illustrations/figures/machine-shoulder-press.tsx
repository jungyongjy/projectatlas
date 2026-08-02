import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Seat, PulleyBar } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

export function MachineShoulderPressFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Machine Shoulder Press — press overhead"
      alt={alt ?? "Machine shoulder press, side view"}
    >
      {/* Machine: backrest, seat and shoulder-height press handles */}
      <g
        fill="none"
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* backrest pad behind the torso */}
        <line x1={252} y1={200} x2={258} y2={330} strokeWidth={12} />
        {/* backrest column + ground base */}
        <line x1={256} y1={330} x2={256} y2={428} />
        <line x1={234} y1={428} x2={356} y2={428} />
      </g>
      <Seat x={294} y={326} width={84} />
      {/* press handles at shoulder height (far + near) */}
      <PulleyBar x={312} y={186} width={52} />
      <PulleyBar x={324} y={194} width={52} />

      {/* Start (primary): hands at shoulder height on the handles */}
      <Fig
        pose={{
          head: { x: 296, y: 146 },
          torso: [
            { x: 304, y: 170 },
            { x: 294, y: 322 },
          ],
          arms: [
            [{ x: 306, y: 176 }, { x: 316, y: 242 }, { x: 324, y: 194 }],
            [{ x: 298, y: 174 }, { x: 306, y: 238 }, { x: 312, y: 186 }],
          ],
          legs: [
            [{ x: 294, y: 322 }, { x: 330, y: 328 }, { x: 338, y: 428 }],
            [{ x: 298, y: 326 }, { x: 338, y: 332 }, { x: 346, y: 428 }],
          ],
        }}
      />
      {/* Finish (ghost): arms extended overhead */}
      <Fig
        ghost
        pose={{
          head: { x: 296, y: 146 },
          torso: [
            { x: 304, y: 170 },
            { x: 294, y: 322 },
          ],
          arms: [
            [{ x: 306, y: 176 }, { x: 314, y: 110 }, { x: 312, y: 52 }],
            [{ x: 298, y: 174 }, { x: 304, y: 108 }, { x: 300, y: 48 }],
          ],
          legs: [
            [{ x: 294, y: 322 }, { x: 330, y: 328 }, { x: 338, y: 428 }],
            [{ x: 298, y: 326 }, { x: 338, y: 332 }, { x: 346, y: 428 }],
          ],
        }}
      />

      {/* Annotation: the press-up motion */}
      <Arrow x1={390} y1={214} x2={352} y2={120} />
      <Label x={400} y={250}>press overhead</Label>
    </FigureCanvas>
  );
}
