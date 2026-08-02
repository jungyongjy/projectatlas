import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Dumbbell } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";

export function HammerCurlFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Hammer Curl — neutral grip, forearms vertical"
      alt={alt ?? "Hammer curl, front view showing neutral grip"}
    >
      {/* Standing figure facing the viewer, forearms vertical, dumbbells held
          with a neutral (palms-in) grip. */}
      <Fig
        pose={{
          head: { x: 320, y: 96 },
          torso: [
            { x: 320, y: 132 },
            { x: 320, y: 250 },
          ],
          arms: [
            [{ x: 304, y: 140 }, { x: 292, y: 200 }, { x: 292, y: 148 }],
            [{ x: 336, y: 140 }, { x: 348, y: 200 }, { x: 348, y: 148 }],
          ],
          legs: [
            [{ x: 304, y: 252 }, { x: 304, y: 332 }, { x: 300, y: 424 }],
            [{ x: 336, y: 252 }, { x: 336, y: 332 }, { x: 340, y: 424 }],
          ],
        }}
      />

      {/* Dumbbells in a neutral grip: bars horizontal, plates at the ends */}
      <Dumbbell x={292} y={148} length={40} />
      <Dumbbell x={348} y={148} length={40} />

      {/* Annotation: neutral (palms-in) grip on the dumbbells */}
      <Arrow x1={248} y1={118} x2={284} y2={144} />
      <Label x={168} y={112}>neutral grip</Label>
    </FigureCanvas>
  );
}
