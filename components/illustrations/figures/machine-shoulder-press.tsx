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
      {/* Machine: backrest, seat and shoulder-height press handles.
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
        <line x1={368} y1={200} x2={360} y2={330} strokeWidth={12} />
        {/* backrest column + ground base */}
        <line x1={364} y1={330} x2={364} y2={428} />
        <line x1={320} y1={428} x2={420} y2={428} />
      </g>
      <Seat x={346} y={326} width={84} />
      {/* press handles at shoulder height (far + near), in front of the figure */}
      <PulleyBar x={328} y={186} width={52} />
      <PulleyBar x={316} y={194} width={52} />

      {/* Start (primary): hands at shoulder height on the handles */}
      <Fig
        pose={{
          head: { x: 344, y: 146 },
          torso: [
            { x: 336, y: 170 },
            { x: 346, y: 322 },
          ],
          arms: [
            [{ x: 334, y: 176 }, { x: 324, y: 242 }, { x: 316, y: 194 }],
            [{ x: 342, y: 174 }, { x: 334, y: 238 }, { x: 328, y: 186 }],
          ],
          legs: [
            [{ x: 346, y: 322 }, { x: 310, y: 328 }, { x: 302, y: 428 }],
            [{ x: 342, y: 326 }, { x: 302, y: 332 }, { x: 294, y: 428 }],
          ],
        }}
      />
      {/* Finish (ghost): arms extended overhead */}
      <Fig
        ghost
        pose={{
          head: { x: 344, y: 146 },
          torso: [
            { x: 336, y: 170 },
            { x: 346, y: 322 },
          ],
          arms: [
            [{ x: 334, y: 176 }, { x: 322, y: 108 }, { x: 318, y: 50 }],
            [{ x: 342, y: 174 }, { x: 336, y: 108 }, { x: 340, y: 48 }],
          ],
          legs: [
            [{ x: 346, y: 322 }, { x: 310, y: 328 }, { x: 302, y: 428 }],
            [{ x: 342, y: 326 }, { x: 302, y: 332 }, { x: 294, y: 428 }],
          ],
        }}
      />

      {/* Annotation: the press-up motion */}
      <Arrow x1={250} y1={214} x2={300} y2={96} />
      <Label x={150} y={240}>press overhead</Label>
    </FigureCanvas>
  );
}
