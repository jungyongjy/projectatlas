import { useId } from "react";
import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

export function ThoracicRotationFigure({ alt }: { alt?: string }) {
  const markerId = useId().replace(/:/g, "");
  return (
    <FigureCanvas
      title="Thoracic Rotation — rotate the spine, not the hips"
      alt={alt ?? "Thoracic spine rotation, rotating the spine rather than the hips"}
    >
      {/* Half-kneeling, facing LEFT: front shin planted, rear knee down,
          arms crossed over the chest, torso rotated. */}
      <Fig
        pose={{
          head: { x: 322, y: 170 },
          torso: [
            { x: 324, y: 200 },
            { x: 315, y: 300 },
          ],
          arms: [
            // crossed arms in front of the chest
            [{ x: 326, y: 206 }, { x: 308, y: 244 }, { x: 298, y: 272 }],
            [{ x: 320, y: 208 }, { x: 306, y: 250 }, { x: 316, y: 282 }],
          ],
          legs: [
            // front shin vertical, foot planted
            [{ x: 315, y: 300 }, { x: 252, y: 360 }, { x: 250, y: 428 }],
            // rear knee on the ground
            [{ x: 315, y: 300 }, { x: 392, y: 405 }, { x: 424, y: 428 }],
          ],
        }}
      />
      {/* Rotation arrow around the spine axis (behind the upper back),
          arrowheads at both ends */}
      <g>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10" refX="8.5" refY="5"
            markerWidth="7" markerHeight="7" orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={FIG.annotation} />
          </marker>
        </defs>
        <path
          d="M 372 196 Q 416 232 372 272"
          fill="none" stroke={FIG.annotation} strokeWidth={2.5}
          strokeDasharray={FIG.dash} strokeLinecap="round"
          markerStart={`url(#${markerId})`} markerEnd={`url(#${markerId})`}
        />
      </g>
      <Label x={386} y={292}>rotate the spine</Label>
      <Label x={330} y={348}>spine, not hips</Label>
    </FigureCanvas>
  );
}
