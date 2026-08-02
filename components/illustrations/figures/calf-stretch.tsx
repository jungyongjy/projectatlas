import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Wall } from "../fig/Equipment";
import { Arrow } from "../fig/Arrow";
import { Label } from "../fig/Label";

export function CalfStretchFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Calf Stretch — wall lean, back heel down"
      alt={alt ?? "Calf stretch against a wall with the back heel down"}
    >
      {/* Wall on the left; the figure leans into it, facing LEFT */}
      <Wall x={120} y={160} height={268} />
      <Fig
        pose={{
          head: { x: 205, y: 152 },
          torso: [
            { x: 216, y: 178 },
            { x: 252, y: 320 },
          ],
          arms: [
            // hands on the wall, front and back
            [{ x: 216, y: 184 }, { x: 170, y: 232 }, { x: 128, y: 266 }],
            [{ x: 222, y: 182 }, { x: 192, y: 240 }, { x: 134, y: 276 }],
          ],
          legs: [
            // front leg, knee softly bent
            [{ x: 252, y: 320 }, { x: 233, y: 352 }, { x: 222, y: 428 }],
            // straight back leg, heel planted
            [{ x: 252, y: 320 }, { x: 332, y: 352 }, { x: 378, y: 428 }],
          ],
        }}
      />
      {/* Annotations */}
      <Arrow x1={150} y1={200} x2={132} y2={262} />
      <Label x={150} y={190}>hands on wall</Label>
      <Arrow x1={420} y1={368} x2={388} y2={420} />
      <Label x={360} y={360}>back heel down</Label>
    </FigureCanvas>
  );
}
