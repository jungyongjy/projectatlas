import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

export function Hip9090Figure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Hip 90/90 — both hips flexed to 90 degrees"
      alt={alt ?? "Hip 90/90 stretch position with both hips flexed to 90 degrees"}
    >
      {/* Seated figure, side view facing LEFT. Front shin forward, rear
          thigh back, both hips flexed to 90 degrees. */}
      <Fig
        pose={{
          head: { x: 294, y: 206 },
          torso: [
            { x: 300, y: 240 },
            { x: 304, y: 380 },
          ],
          arms: [
            // hands resting toward each shin
            [{ x: 300, y: 246 }, { x: 270, y: 300 }, { x: 208, y: 398 }],
            [{ x: 306, y: 244 }, { x: 340, y: 320 }, { x: 398, y: 402 }],
          ],
          legs: [
            // front leg: thigh forward, shin forward at 90°
            [{ x: 304, y: 380 }, { x: 238, y: 380 }, { x: 150, y: 420 }],
            // rear leg: thigh perpendicular (back), shin down to the floor
            [{ x: 304, y: 380 }, { x: 404, y: 380 }, { x: 412, y: 428 }],
          ],
        }}
      />
      {/* small feet */}
      <line x1={150} y1={420} x2={134} y2={420} stroke={FIG.body} strokeWidth={FIG.strokeWidth} strokeLinecap="round" />
      <line x1={412} y1={428} x2={428} y2={428} stroke={FIG.body} strokeWidth={FIG.strokeWidth} strokeLinecap="round" />

      {/* Dashed 90° angle arcs at each hip, labelled */}
      <path
        d="M 304 362 A 18 18 0 0 0 286 380"
        fill="none" stroke={FIG.annotation} strokeWidth={2.5}
        strokeDasharray={FIG.dash} strokeLinecap="round"
      />
      <Label x={278} y={348} strong>90°</Label>
      <path
        d="M 304 362 A 18 18 0 0 1 322 380"
        fill="none" stroke={FIG.annotation} strokeWidth={2.5}
        strokeDasharray={FIG.dash} strokeLinecap="round"
      />
      <Label x={322} y={348} strong>90°</Label>
    </FigureCanvas>
  );
}
