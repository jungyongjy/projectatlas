import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Bench, Dumbbell } from "../fig/Equipment";
import { Arrow } from "../fig/Arrow";
import { Label } from "../fig/Label";

export function BulgarianFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Bulgarian Split Squat — rear foot elevated"
      alt={alt ?? "Bulgarian Split Squat stance with the rear foot on a bench"}
    >
      {/* Bench behind the figure; the rear foot rests on it */}
      <Bench x={410} height={44} />
      {/* Deep split-squat bottom: front leg bent ~90°, torso upright, dumbbells at the sides */}
      <Fig
        pose={{
          head: { x: 306, y: 178 },
          torso: [
            { x: 312, y: 196 },
            { x: 302, y: 330 },
          ],
          arms: [
            [{ x: 316, y: 206 }, { x: 306, y: 262 }, { x: 296, y: 322 }],
            [{ x: 308, y: 206 }, { x: 322, y: 258 }, { x: 334, y: 310 }],
          ],
          legs: [
            // front leg, knee bent ~90° over the planted foot
            [{ x: 302, y: 330 }, { x: 256, y: 334 }, { x: 248, y: 428 }],
            // rear leg, resting on the bench
            [{ x: 302, y: 330 }, { x: 354, y: 376 }, { x: 370, y: 384 }],
          ],
        }}
      />
      {/* Dumbbells hanging at each hand */}
      <Dumbbell x={296} y={330} />
      <Dumbbell x={334} y={318} />
      {/* Annotation */}
      <Arrow x1={450} y1={352} x2={390} y2={386} />
      <Label x={392} y={342}>rear foot on bench</Label>
    </FigureCanvas>
  );
}
