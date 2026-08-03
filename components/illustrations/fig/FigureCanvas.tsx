import { FIG } from "./palette";

interface FigureCanvasProps {
  title?: string;       // small uppercase label, top-left
  alt: string;          // a11y
  children: React.ReactNode;
}

export function FigureCanvas({ title, alt, children }: FigureCanvasProps) {
  return (
    <div className="my-10 w-full max-w-xl mx-auto">
      <div className="rounded-xl border border-atlas-border bg-atlas-surface overflow-hidden">
        <svg
          viewBox={`0 0 ${FIG.viewBox.w} ${FIG.viewBox.h}`}
          role="img"
          aria-label={alt}
          className="w-full h-auto block"
          focusable="false"
        >
          <rect width={FIG.viewBox.w} height={FIG.viewBox.h} fill={FIG.bg} />
          <line x1={0} y1={FIG.groundY} x2={FIG.viewBox.w} y2={FIG.groundY}
                stroke={FIG.grid} strokeWidth={1.5} />
          {title && (
            <text x={20} y={30} fill={FIG.label} fontFamily={FIG.font} fontSize={13} letterSpacing={1}>
              {title.toUpperCase()}
            </text>
          )}
          {children}
        </svg>
      </div>
    </div>
  );
}
