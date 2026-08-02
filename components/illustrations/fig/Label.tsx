import type { ReactNode } from "react";
import { FIG } from "./palette";

interface LabelProps {
  x: number;
  y: number;
  children: ReactNode;
  strong?: boolean;
}

/**
 * Small annotation label. `(x, y)` is the SVG text baseline start.
 * Strong labels use the figure accent colour (spine lines, key joints);
 * plain labels use the muted label colour.
 */
export function Label({ x, y, children, strong }: LabelProps) {
  return (
    <text
      x={x}
      y={y}
      fill={strong ? FIG.body : FIG.label}
      fontFamily={FIG.font}
      fontSize={14}
    >
      {children}
    </text>
  );
}
