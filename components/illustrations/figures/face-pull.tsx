import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { CableStack } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

export function FacePullFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Face Pull — rope to the face"
      alt={alt ?? "Face pull, front view"}
    >
      {/* Cable stack behind-right, high pulley */}
      <CableStack x={452} columnH={230} />

      {/* Figure: elbows high and wide, rope pulled to the face */}
      <Fig
        pose={{
          head: { x: 320, y: 116 },
          torso: [
            { x: 320, y: 148 },
            { x: 320, y: 300 },
          ],
          arms: [
            [{ x: 318, y: 152 }, { x: 250, y: 168 }, { x: 304, y: 150 }],
            [{ x: 322, y: 152 }, { x: 390, y: 168 }, { x: 336, y: 150 }],
          ],
          legs: [
            [{ x: 318, y: 300 }, { x: 304, y: 384 }, { x: 302, y: 428 }],
            [{ x: 322, y: 300 }, { x: 336, y: 384 }, { x: 338, y: 428 }],
          ],
        }}
      />

      {/* cable from the pulley to the rope knot, then rope ends to each hand */}
      <line x1={452} y1={218} x2={352} y2={190} stroke={FIG.equipment} strokeWidth={2} />
      <line x1={352} y1={190} x2={304} y2={150} stroke={FIG.equipment} strokeWidth={2} />
      <line x1={352} y1={190} x2={336} y2={150} stroke={FIG.equipment} strokeWidth={2} />

      <Label x={96} y={148}>elbows high and wide</Label>
      <Arrow x1={166} y1={158} x2={244} y2={163} />
    </FigureCanvas>
  );
}
