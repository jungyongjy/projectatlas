import { FigureCanvas } from "../fig/FigureCanvas";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

/* Threshold run: a single continuous, comfortably-hard effort line held
 * steady above the Zone 2 band for the whole session. The unbroken line
 * is the point — no surges, no intervals. */

export function ThresholdFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Threshold — continuous comfortably-hard effort"
      alt={alt ?? "Threshold run, a continuous comfortably hard effort"}
    >
      {/* continuous effort line, held above the Zone 2 band */}
      <line
        x1={100} y1={270} x2={560} y2={270}
        stroke={FIG.annotation} strokeWidth={FIG.strokeWidth} strokeLinecap="round"
      />

      {/* annotation: comfortably hard */}
      <Label x={250} y={252} strong>comfortably hard</Label>
      <Arrow x1={365} y1={256} x2={365} y2={266} />

      {/* Zone 2 band below the effort line */}
      <rect
        x={100} y={340} width={460} height={44}
        fill={FIG.body} opacity={0.14}
      />
      <Label x={108} y={364}>Zone 2 — conversational, easy</Label>

      {/* dashed guide showing the effort line sits above Zone 2 */}
      <line x1={100} y1={270} x2={100} y2={340} stroke={FIG.grid} strokeWidth={2} strokeDasharray={FIG.dash} />
      <line x1={560} y1={270} x2={560} y2={340} stroke={FIG.grid} strokeWidth={2} strokeDasharray={FIG.dash} />

      {/* start / finish ticks on the effort line */}
      <line x1={100} y1={258} x2={100} y2={282} stroke={FIG.grid} strokeWidth={2} />
      <line x1={560} y1={258} x2={560} y2={282} stroke={FIG.grid} strokeWidth={2} />
      <Label x={88} y={238}>start</Label>
      <Label x={538} y={238}>finish</Label>

      {/* caption */}
      <Label x={120} y={452}>20–30 min at a pace you could hold for an hour, RPE 6–7</Label>
    </FigureCanvas>
  );
}
