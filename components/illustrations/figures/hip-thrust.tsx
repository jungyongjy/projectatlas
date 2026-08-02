import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Bench, Barbell } from "../fig/Equipment";
import { Arrow } from "../fig/Arrow";
import { Label } from "../fig/Label";

export function HipThrustFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Barbell Hip Thrust — start and top positions"
      alt={alt ?? "Barbell hip thrust, side view showing start and top positions"}
    >
      {/* Flat bench under the shoulder blades */}
      <Bench x={450} height={44} width={110} />
      {/* Floor-start position (ghost): hips near the floor, feet planted */}
      <Fig
        ghost
        pose={{
          head: { x: 484, y: 346 },
          torso: [
            { x: 470, y: 378 },
            { x: 365, y: 410 },
          ],
          arms: [
            [{ x: 470, y: 384 }, { x: 462, y: 404 }, { x: 454, y: 422 }],
            [{ x: 464, y: 384 }, { x: 460, y: 402 }, { x: 452, y: 420 }],
          ],
          legs: [
            [{ x: 365, y: 410 }, { x: 300, y: 330 }, { x: 290, y: 428 }],
            [{ x: 365, y: 410 }, { x: 320, y: 334 }, { x: 310, y: 428 }],
          ],
        }}
      />
      {/* Top position: hips fully extended, head hanging off the bench end */}
      <Fig
        pose={{
          head: { x: 502, y: 368 },
          torso: [
            { x: 470, y: 378 },
            { x: 368, y: 268 },
          ],
          arms: [
            [{ x: 470, y: 384 }, { x: 452, y: 406 }, { x: 438, y: 424 }],
            [{ x: 466, y: 384 }, { x: 462, y: 402 }, { x: 454, y: 420 }],
          ],
          legs: [
            // knees flexed ~90°, shins vertical, feet flat
            [{ x: 368, y: 268 }, { x: 285, y: 270 }, { x: 278, y: 428 }],
            [{ x: 368, y: 268 }, { x: 300, y: 272 }, { x: 293, y: 428 }],
          ],
        }}
      />
      {/* Barbell across the hips */}
      <Barbell x={360} y={254} width={170} />
      {/* Annotation: hips rise from the floor start to the extended top */}
      <Arrow x1={380} y1={400} x2={380} y2={292} />
      <Label x={215} y={234}>drive hips up</Label>
    </FigureCanvas>
  );
}
