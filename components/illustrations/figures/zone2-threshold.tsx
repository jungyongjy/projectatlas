import { FigureCanvas } from "../fig/FigureCanvas";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

/* Zone 2 vs threshold: two matched intensity bands side by side — Zone 2
 * (body blue, conversational) and threshold (annotation amber,
 * comfortably hard) — each with its own descriptors. Consistent band
 * geometry so the two read as one comparison. */

interface IntensityBandProps {
  cx: number;
  title: string;
  inside: string;
  color: string;
  lines: string[];
}

function IntensityBand({ cx, title, inside, color, lines }: IntensityBandProps) {
  const half = 90;
  return (
    <g>
      <text
        x={cx} y={118} textAnchor="middle"
        fill={FIG.label} fontFamily={FIG.font} fontSize={13} letterSpacing={1}
      >
        {title}
      </text>
      <rect
        x={cx - half} y={140} width={half * 2} height={44}
        rx={6} fill={color} opacity={0.3}
      />
      <text
        x={cx} y={166} textAnchor="middle"
        fill={color} fontFamily={FIG.font} fontSize={15}
      >
        {inside}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x={cx} y={212 + i * 22} textAnchor="middle"
          fill={FIG.label} fontFamily={FIG.font} fontSize={13}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function Zone2ThresholdFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Intensity — Zone 2 vs threshold"
      alt={alt ?? "Zone 2 versus threshold intensity comparison"}
    >
      {/* vertical divider between the two zones */}
      <line x1={320} y1={118} x2={320} y2={428} stroke={FIG.grid} strokeWidth={2} strokeDasharray={FIG.dash} />

      <IntensityBand
        cx={160}
        title="ZONE 2"
        inside="conversational"
        color={FIG.body}
        lines={["60–70% max HR", "hours per week"]}
      />
      <IntensityBand
        cx={480}
        title="THRESHOLD"
        inside="comfortably hard"
        color={FIG.annotation}
        lines={["85–90% max HR", "20–40 min sessions"]}
      />

      {/* takeaway */}
      <Label x={196} y={452} strong>most weekly mileage lives in Zone 2</Label>
    </FigureCanvas>
  );
}
