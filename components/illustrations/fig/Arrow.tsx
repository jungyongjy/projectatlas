import { useId } from "react";
import { FIG } from "./palette";

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Dashed annotation arrow in the atlas-warning amber. Draws from
 * (x1, y1) to (x2, y2) with a small filled arrowhead at the tip.
 * Each instance gets its own marker so multiple arrows never collide
 * on the same SVG canvas.
 */
export function Arrow({ x1, y1, x2, y2 }: ArrowProps) {
  // useId is unique per instance; strip React's ":" so it is safe in url(#…)
  const markerId = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill={FIG.annotation} />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={FIG.annotation}
        strokeWidth={2.5}
        strokeDasharray="6 5"
        markerEnd={`url(#${markerId})`}
      />
    </g>
  );
}
