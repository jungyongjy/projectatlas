import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

export function LegCurlFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Seated Leg Curl — knee flexion range"
      alt={alt ?? "Seated leg curl, side view"}
    >
      {/* Machine: backrest, thigh pad, seat column and padded lever arm behind the calves */}
      <g
        fill="none"
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* reclined backrest pad, behind the upper back */}
        <line x1={278} y1={196} x2={322} y2={330} strokeWidth={12} />
        {/* thigh-support pad */}
        <rect x={195} y={326} width={175} height={12} fill={FIG.equipmentFill} />
        {/* seat column + base */}
        <line x1={310} y1={338} x2={310} y2={428} />
        <line x1={295} y1={428} x2={350} y2={428} />
        {/* lever arm + padded pad behind the calves */}
        <line x1={310} y1={390} x2={256} y2={390} />
        <rect x={242} y={378} width={28} height={24} fill={FIG.equipmentFill} />
      </g>

      {/* Seated start position: thighs on the pad, shins hanging vertical */}
      <Fig
        pose={{
          head: { x: 255, y: 196 },
          torso: [
            { x: 262, y: 216 },
            { x: 260, y: 326 },
          ],
          arms: [
            [{ x: 266, y: 226 }, { x: 260, y: 280 }, { x: 250, y: 318 }],
            [{ x: 262, y: 226 }, { x: 268, y: 282 }, { x: 260, y: 320 }],
          ],
          legs: [
            [{ x: 260, y: 326 }, { x: 200, y: 330 }, { x: 198, y: 428 }],
            [{ x: 260, y: 326 }, { x: 212, y: 332 }, { x: 212, y: 428 }],
          ],
        }}
      />
      {/* Ghost of the curled position: heel back and up to the pad */}
      <Fig
        ghost
        pose={{
          head: { x: 255, y: 196 },
          torso: [
            { x: 262, y: 216 },
            { x: 260, y: 326 },
          ],
          arms: [
            [{ x: 266, y: 226 }, { x: 260, y: 280 }, { x: 250, y: 318 }],
            [{ x: 262, y: 226 }, { x: 268, y: 282 }, { x: 260, y: 320 }],
          ],
          legs: [
            // curled lower leg, heel swung back and up
            [{ x: 260, y: 326 }, { x: 200, y: 330 }, { x: 269, y: 399 }],
            [{ x: 260, y: 326 }, { x: 212, y: 332 }, { x: 212, y: 428 }],
          ],
        }}
      />

      {/* Dashed arc marking the knee-flexion range (hanging → curled) */}
      <path
        d="M 198 428 A 98 98 0 0 0 269 399"
        fill="none"
        stroke={FIG.annotation}
        strokeWidth={2.5}
        strokeDasharray={FIG.dash}
        strokeLinecap="round"
      />
      <Label x={120} y={296}>knee flexion</Label>
    </FigureCanvas>
  );
}
