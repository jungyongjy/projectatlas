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
        <line x1={318} y1={196} x2={362} y2={330} strokeWidth={12} />
        {/* thigh-support pad */}
        <rect x={235} y={326} width={175} height={12} fill={FIG.equipmentFill} />
        {/* seat column + base */}
        <line x1={350} y1={338} x2={350} y2={428} />
        <line x1={335} y1={428} x2={390} y2={428} />
        {/* lever arm + padded pad behind the calves */}
        <line x1={350} y1={390} x2={296} y2={390} />
        <rect x={282} y={378} width={28} height={24} fill={FIG.equipmentFill} />
      </g>

      {/* Seated start position: thighs on the pad, shins hanging vertical */}
      <Fig
        pose={{
          head: { x: 295, y: 196 },
          torso: [
            { x: 302, y: 216 },
            { x: 300, y: 326 },
          ],
          arms: [
            [{ x: 306, y: 226 }, { x: 300, y: 280 }, { x: 290, y: 318 }],
            [{ x: 302, y: 226 }, { x: 308, y: 282 }, { x: 300, y: 320 }],
          ],
          legs: [
            [{ x: 300, y: 326 }, { x: 240, y: 330 }, { x: 238, y: 428 }],
            [{ x: 300, y: 326 }, { x: 252, y: 332 }, { x: 252, y: 428 }],
          ],
        }}
      />
      {/* Ghost of the curled position: heel swung back and up to the pad */}
      <Fig
        ghost
        pose={{
          head: { x: 295, y: 196 },
          torso: [
            { x: 302, y: 216 },
            { x: 300, y: 326 },
          ],
          arms: [
            [{ x: 306, y: 226 }, { x: 300, y: 280 }, { x: 290, y: 318 }],
            [{ x: 302, y: 226 }, { x: 308, y: 282 }, { x: 300, y: 320 }],
          ],
          legs: [
            // curled lower leg, heel swung back and up
            [{ x: 300, y: 326 }, { x: 240, y: 330 }, { x: 327, y: 375 }],
            [{ x: 300, y: 326 }, { x: 252, y: 332 }, { x: 252, y: 428 }],
          ],
        }}
      />

      {/* Dashed arc marking the knee-flexion range, centered at the knee and
          sweeping from the hanging shin (straight down) to the curled shin */}
      <path
        d="M 240 385 A 55 55 0 0 0 289 355"
        fill="none"
        stroke={FIG.annotation}
        strokeWidth={2.5}
        strokeDasharray={FIG.dash}
        strokeLinecap="round"
      />
      <Label x={120} y={372}>knee flexion</Label>
    </FigureCanvas>
  );
}
