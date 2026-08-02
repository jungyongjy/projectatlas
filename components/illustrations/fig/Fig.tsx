import type { Pose, Point } from "./types";
import { FIG } from "./palette";

interface FigProps { pose: Pose; ghost?: boolean }

export function Fig({ pose, ghost }: FigProps) {
  const { head, headRadius = 13, torso, arms, legs } = pose;
  const stroke = ghost ? FIG.ghost : FIG.body;
  const style = ghost ? { stroke, strokeDasharray: FIG.dash } : { stroke };
  const points = (pts: Point[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <g
      fill="none"
      strokeWidth={FIG.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...style}
    >
      <circle cx={head.x} cy={head.y} r={headRadius} fill={stroke} stroke="none" />
      <polyline points={points(torso)} />
      {arms.map((a, i) => <polyline key={`a${i}`} points={points(a)} />)}
      {legs.map((l, i) => <polyline key={`l${i}`} points={points(l)} />)}
    </g>
  );
}
