import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

/* Long run: a flat, steady pace line sitting inside a tinted
 * "conversational pace" band, with a small runner heading off at the
 * start. The flatness of the line is the point — even effort, no surges. */

export function LongRunPaceFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Long run — steady conversational pace"
      alt={alt ?? "Long run, a steady conversational pace maintained for distance"}
    >
      {/* small runner at the start, heading right */}
      <Fig
        pose={{
          head: { x: 140, y: 200 },
          torso: [
            { x: 142, y: 228 },
            { x: 146, y: 322 },
          ],
          arms: [
            [{ x: 144, y: 234 }, { x: 160, y: 260 }, { x: 170, y: 292 }],
            [{ x: 142, y: 234 }, { x: 126, y: 260 }, { x: 118, y: 292 }],
          ],
          legs: [
            [{ x: 146, y: 322 }, { x: 156, y: 372 }, { x: 164, y: 428 }],
            [{ x: 146, y: 322 }, { x: 134, y: 374 }, { x: 126, y: 428 }],
          ],
        }}
      />
      <Label x={96} y={452}>start</Label>

      {/* conversational pace band */}
      <rect
        x={210} y={276} width={380} height={48}
        fill={FIG.body} opacity={0.14}
      />
      {/* flat pace line through the band */}
      <line
        x1={210} y1={300} x2={590} y2={300}
        stroke={FIG.body} strokeWidth={FIG.strokeWidth} strokeLinecap="round"
      />

      {/* annotation: conversational pace */}
      <Label x={330} y={262} strong>conversational pace</Label>
      <Arrow x1={452} y1={268} x2={452} y2={280} />

      {/* finish marker */}
      <line x1={590} y1={276} x2={590} y2={324} stroke={FIG.grid} strokeWidth={2} strokeDasharray={FIG.dash} />
      <Label x={578} y={452}>finish</Label>

      {/* even-effort caption */}
      <Label x={150} y={470}>7–10 km at a pace you could hold in conversation</Label>
    </FigureCanvas>
  );
}
