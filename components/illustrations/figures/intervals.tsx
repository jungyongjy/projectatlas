import { FigureCanvas } from "../fig/FigureCanvas";
import { TrackOval } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

/* Six by 400 m intervals: the track oval with six numbered work
 * segments marked, a dashed work route around the lap, and a
 * work/recovery key. */

const CX = 320;
const CY = 240;
const RX = 200;
const RY = 85;

// six evenly spaced work markers around the oval (clockwise from the right)
const ANGLES = [0, 60, 120, 180, 240, 300];
const PTS = ANGLES.map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(rad), y: CY + RY * Math.sin(rad), rad };
});

// dashed work route connecting the six segments around the lap
const ARC = PTS.map((p, i) =>
  i === 0
    ? `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
    : `A ${RX} ${RY} 0 0 1 ${p.x.toFixed(1)} ${p.y.toFixed(1)}`,
).join(" ");

export function IntervalsFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Intervals — six by 400 metres"
      alt={alt ?? "Six by 400 metre interval pattern on a track"}
    >
      <TrackOval x={CX} y={CY} rx={RX} ry={RY} />

      {/* dashed work route around the lap */}
      <path d={ARC} fill="none" stroke={FIG.body} strokeWidth={2.5} strokeDasharray={FIG.dash} />

      {/* numbered work markers */}
      {PTS.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={7} fill={FIG.body} stroke="none" />
          <text
            x={p.x + 15 * Math.cos(p.rad)}
            y={p.y + 15 * Math.sin(p.rad) + 4}
            textAnchor="middle"
            fill={FIG.label}
            fontFamily={FIG.font}
            fontSize={11}
          >
            {i + 1}
          </text>
        </g>
      ))}

      {/* running direction */}
      <Arrow x1={444} y1={186} x2={474} y2={200} />

      {/* centre label */}
      <text
        x={CX}
        y={CY + 6}
        textAnchor="middle"
        fill={FIG.body}
        fontFamily={FIG.font}
        fontSize={20}
      >
        6 × 400 m
      </text>

      {/* work / recovery key */}
      <circle cx={210} cy={406} r={6} fill={FIG.body} stroke="none" />
      <Label x={222} y={410}>work — 400 m</Label>
      <circle cx={400} cy={406} r={6} fill="none" stroke={FIG.ghost} strokeWidth={2} strokeDasharray={FIG.dash} />
      <Label x={412} y={410}>recovery — walk 90–120 s</Label>
    </FigureCanvas>
  );
}
