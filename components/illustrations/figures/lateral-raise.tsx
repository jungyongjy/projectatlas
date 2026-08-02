import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Seat, Dumbbell } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

export function LateralRaiseFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Seated Lateral Raise — raise to shoulder height"
      alt={alt ?? "Seated lateral raise, front view"}
    >
      <Seat x={320} y={286} width={90} />

      {/* Primary: arms raised to shoulder height, forming a T */}
      <Fig
        pose={{
          head: { x: 320, y: 118 },
          torso: [
            { x: 320, y: 148 },
            { x: 320, y: 282 },
          ],
          arms: [
            [{ x: 318, y: 152 }, { x: 252, y: 154 }, { x: 184, y: 152 }],
            [{ x: 322, y: 152 }, { x: 388, y: 154 }, { x: 456, y: 152 }],
          ],
          legs: [
            [{ x: 318, y: 284 }, { x: 288, y: 292 }, { x: 282, y: 428 }],
            [{ x: 322, y: 284 }, { x: 352, y: 292 }, { x: 358, y: 428 }],
          ],
        }}
      />
      {/* Ghost: left arm hanging in the down position */}
      <Fig
        ghost
        pose={{
          head: { x: 320, y: 118 },
          torso: [
            { x: 320, y: 148 },
            { x: 320, y: 282 },
          ],
          arms: [
            [{ x: 318, y: 152 }, { x: 302, y: 202 }, { x: 298, y: 248 }],
            [{ x: 322, y: 152 }, { x: 388, y: 154 }, { x: 456, y: 152 }],
          ],
          legs: [
            [{ x: 318, y: 284 }, { x: 288, y: 292 }, { x: 282, y: 428 }],
            [{ x: 322, y: 284 }, { x: 352, y: 292 }, { x: 358, y: 428 }],
          ],
        }}
      />

      {/* Dumbbells at the raised hands + ghost weight in the down position */}
      <Dumbbell x={184} y={152} />
      <Dumbbell x={456} y={152} />
      <Dumbbell x={298} y={252} />

      {/* Dashed arc of the raise from down to shoulder height */}
      <path
        d="M 298 250 Q 208 246 184 152"
        fill="none"
        stroke={FIG.annotation}
        strokeWidth={2.5}
        strokeDasharray={FIG.dash}
        strokeLinecap="round"
      />

      <Label x={88} y={126}>raise to shoulder height</Label>
      <Arrow x1={112} y1={140} x2={170} y2={150} />
    </FigureCanvas>
  );
}
