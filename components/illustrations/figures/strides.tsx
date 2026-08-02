import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";

/* Strides: a single runner in a relaxed stride with a dashed amber
 * acceleration arrow running from an easy jog (0) up to 80–90% of max
 * speed over a 50 m span. The stride stays relaxed — technique, not
 * effort. */

export function StridesFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Strides — relaxed 50 m acceleration"
      alt={alt ?? "Strides, a relaxed 50 metre acceleration at 80 to 90 percent"}
    >
      {/* relaxed-stride runner on the ground */}
      <Fig
        pose={{
          head: { x: 430, y: 150 },
          torso: [
            { x: 432, y: 180 },
            { x: 436, y: 300 },
          ],
          arms: [
            [{ x: 434, y: 186 }, { x: 452, y: 212 }, { x: 462, y: 244 }],
            [{ x: 430, y: 186 }, { x: 416, y: 212 }, { x: 408, y: 244 }],
          ],
          legs: [
            [{ x: 436, y: 300 }, { x: 452, y: 352 }, { x: 462, y: 428 }],
            [{ x: 436, y: 300 }, { x: 418, y: 356 }, { x: 408, y: 428 }],
          ],
        }}
      />

      {/* acceleration arrow 0 → 80–90% */}
      <Arrow x1={80} y1={412} x2={560} y2={412} />
      <Label x={72} y={400}>0</Label>
      <Label x={492} y={400}>80–90%</Label>
      <Label x={312} y={426}>50 m</Label>

      {/* caption */}
      <Label x={140} y={452}>relaxed stride — fast but easy, ~90% of max speed</Label>
    </FigureCanvas>
  );
}
