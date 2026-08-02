import { useId } from "react";
import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { CableStack } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

export function PallofPressFigure({ alt }: { alt?: string }) {
  const markerId = useId().replace(/:/g, "");
  return (
    <FigureCanvas
      title="Pallof Press — resist rotation"
      alt={alt ?? "Pallof press, front view showing anti-rotation"}
    >
      {/* Cable stack on the left, pulley at chest height */}
      <CableStack x={150} columnH={230} />

      {/* Standing figure facing the viewer, arms extended out against the
          cable while the core braces against rotation */}
      <Fig
        pose={{
          head: { x: 310, y: 100 },
          torso: [
            { x: 310, y: 132 },
            { x: 310, y: 256 },
          ],
          arms: [
            [{ x: 306, y: 136 }, { x: 276, y: 152 }, { x: 232, y: 160 }],
            [{ x: 314, y: 134 }, { x: 286, y: 148 }, { x: 240, y: 156 }],
          ],
          legs: [
            [{ x: 306, y: 258 }, { x: 306, y: 340 }, { x: 302, y: 422 }],
            [{ x: 314, y: 258 }, { x: 314, y: 340 }, { x: 318, y: 422 }],
          ],
        }}
      />

      {/* Handle at the hands, cable running from the stack to the handle */}
      <line
        x1={236}
        y1={148}
        x2={236}
        y2={172}
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
      />
      <line x1={150} y1={222} x2={236} y2={160} stroke={FIG.equipment} strokeWidth={2} />

      {/* Anti-rotation: dashed curved arrow around the right side of the trunk,
          arrowheads at both ends showing the rotation being resisted */}
      <g>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={FIG.annotation} />
          </marker>
        </defs>
        <path
          d="M 370 150 Q 425 210 370 270"
          fill="none"
          stroke={FIG.annotation}
          strokeWidth={2.5}
          strokeDasharray={FIG.dash}
          strokeLinecap="round"
          markerStart={`url(#${markerId})`}
          markerEnd={`url(#${markerId})`}
        />
      </g>
      <Label x={330} y={318}>resist rotation</Label>

      {/* Annotation: the press-out direction */}
      <Arrow x1={278} y1={110} x2={238} y2={152} />
      <Label x={160} y={96}>press forward</Label>
    </FigureCanvas>
  );
}
