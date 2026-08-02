import { FigureCanvas } from "../fig/FigureCanvas";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

/* Norwegian 4×4: a timeline bar of four 4-minute work blocks separated
 * by three 3-minute active recoveries, with a heart-rate zone band
 * annotated above the work. */

const X0 = 80;
const WIDTH = 500;
const SCALE = WIDTH / 25; // 25 total minutes → px per minute
const BAR_Y = 250;
const BAR_H = 64;

const BLOCKS = [
  { kind: "work", min: 4 },
  { kind: "recovery", min: 3 },
  { kind: "work", min: 4 },
  { kind: "recovery", min: 3 },
  { kind: "work", min: 4 },
  { kind: "recovery", min: 3 },
  { kind: "work", min: 4 },
];

export function Norwegian4x4Figure({ alt }: { alt?: string }) {
  // cumulative x positions, computed without mutation
  const segments = BLOCKS.reduce<
    { kind: string; min: number; x: number; w: number }[]
  >((acc, block) => {
    const x = acc.length === 0 ? X0 : acc[acc.length - 1].x + acc[acc.length - 1].w;
    return [...acc, { ...block, x, w: block.min * SCALE }];
  }, []);

  return (
    <FigureCanvas
      title="Norwegian 4×4 — work and recovery blocks"
      alt={alt ?? "Norwegian 4x4 interval structure with work and recovery blocks"}
    >
      {/* heart-rate zone band */}
      <rect x={X0} y={168} width={WIDTH} height={40} fill={FIG.annotation} opacity={0.12} />
      <Label x={X0 + 4} y={192}>85–95% max HR (work zone)</Label>

      {/* timeline bar */}
      {segments.map((seg, i) => (
        <g key={i}>
          <rect
            x={seg.x}
            y={BAR_Y}
            width={seg.w}
            height={BAR_H}
            fill={seg.kind === "work" ? FIG.body : FIG.grid}
            opacity={seg.kind === "work" ? 0.92 : 0.5}
          />
          <text
            x={seg.x + seg.w / 2}
            y={BAR_Y + BAR_H / 2 + 5}
            textAnchor="middle"
            fill={seg.kind === "work" ? FIG.bg : FIG.label}
            fontFamily={FIG.font}
            fontSize={13}
          >
            {seg.kind === "work" ? `${seg.min} min` : `${seg.min} min`}
          </text>
          <text
            x={seg.x + seg.w / 2}
            y={BAR_Y - 10}
            textAnchor="middle"
            fill={FIG.label}
            fontFamily={FIG.font}
            fontSize={11}
            letterSpacing={1}
          >
            {seg.kind === "work" ? "WORK" : "RECOVER"}
          </text>
          {/* dashed connector: HR stays elevated during work */}
          {seg.kind === "work" && (
            <line
              x1={seg.x + seg.w / 2}
              y1={208}
              x2={seg.x + seg.w / 2}
              y2={BAR_Y}
              stroke={FIG.annotation}
              strokeWidth={2}
              strokeDasharray="4 5"
            />
          )}
        </g>
      ))}

      {/* caption */}
      <Label x={104} y={452}>4 work intervals, each followed by a 3 min active recovery</Label>
    </FigureCanvas>
  );
}
