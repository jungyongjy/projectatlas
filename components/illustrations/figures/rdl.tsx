import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";

export function RdlFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Romanian Deadlift — hip hinge, neutral spine"
      alt={alt ?? "Romanian deadlift hip hinge with a neutral spine"}
    >
      {/* Primary figure: hips pushed back, torso ~40° to vertical, knees softly bent */}
      <Fig
        pose={{
          head: { x: 290, y: 92 },
          torso: [
            { x: 298, y: 112 },
            { x: 282, y: 178 },
            { x: 258, y: 252 },
          ],
          arms: [
            [{ x: 298, y: 122 }, { x: 246, y: 176 }, { x: 210, y: 232 }],
            [{ x: 296, y: 124 }, { x: 300, y: 180 }, { x: 296, y: 236 }],
          ],
          legs: [
            [{ x: 258, y: 252 }, { x: 246, y: 352 }, { x: 240, y: 428 }],
            [{ x: 258, y: 252 }, { x: 296, y: 350 }, { x: 308, y: 428 }],
          ],
        }}
      />
      {/* Barbell at shin height */}
      <g stroke="#3a3a3a" strokeWidth={5} strokeLinecap="round">
        <line x1={180} y1={228} x2={360} y2={228} />
        <rect x={178} y={222} width={14} height={12} fill="#232323" stroke="none" />
        <rect x={348} y={222} width={14} height={12} fill="#232323" stroke="none" />
      </g>
      {/* Annotations */}
      <Arrow x1={250} y1={120} x2={222} y2={196} />
      <Label x={210} y={112}>hips back</Label>
      <Label x={330} y={200} strong>neutral spine</Label>
    </FigureCanvas>
  );
}
