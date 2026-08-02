import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Dumbbell } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";

export function RearDeltReverseFlyFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Rear Delt Reverse Fly — hinge forward, arms wide"
      alt={alt ?? "Rear delt reverse fly, front view"}
    >
      {/* Torso hinged forward at the hips (front view): hips high, head hanging
          just below the wide shoulders, arms spread out to the sides */}
      <Fig
        pose={{
          head: { x: 320, y: 316 },
          torso: [
            { x: 320, y: 300 },
            { x: 320, y: 220 },
          ],
          arms: [
            [{ x: 318, y: 300 }, { x: 252, y: 304 }, { x: 182, y: 298 }],
            [{ x: 322, y: 300 }, { x: 388, y: 304 }, { x: 458, y: 298 }],
          ],
          legs: [
            [{ x: 318, y: 220 }, { x: 306, y: 396 }, { x: 304, y: 428 }],
            [{ x: 322, y: 220 }, { x: 334, y: 396 }, { x: 336, y: 428 }],
          ],
        }}
      />
      {/* Dumbbells at the raised hands */}
      <Dumbbell x={182} y={298} />
      <Dumbbell x={458} y={298} />

      <Label x={88} y={272}>arms wide, elbows soft</Label>
      <Arrow x1={118} y1={284} x2={168} y2={296} />
      <Arrow x1={420} y1={260} x2={360} y2={226} />
      <Label x={332} y={232}>hinge forward</Label>
    </FigureCanvas>
  );
}
