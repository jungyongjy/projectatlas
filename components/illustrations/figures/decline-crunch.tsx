import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

export function DeclineCrunchFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Decline Crunch — curl up from the flat start"
      alt={alt ?? "Decline crunch, side view showing start and top positions"}
    >
      {/* Decline bench: head end low (left), feet hooked at the high end (right).
          Side-view convention: the figure faces LEFT. */}
      <g
        fill="none"
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* bench surface sloping down to the left */}
        <line x1={470} y1={310} x2={180} y2={400} strokeWidth={12} />
        {/* foot-hook pad at the high end */}
        <rect x={458} y={286} width={14} height={40} fill={FIG.equipmentFill} />
        {/* support legs + base */}
        <line x1={210} y1={398} x2={210} y2={428} />
        <line x1={445} y1={326} x2={445} y2={428} />
        <line x1={185} y1={428} x2={470} y2={428} />
      </g>

      {/* Start (ghost): lying flat on the bench, torso aligned with the slope */}
      <Fig
        ghost
        pose={{
          head: { x: 235, y: 372 },
          torso: [
            { x: 300, y: 356 },
            { x: 400, y: 330 },
          ],
          arms: [
            [{ x: 298, y: 356 }, { x: 320, y: 342 }, { x: 296, y: 336 }],
            [{ x: 306, y: 354 }, { x: 326, y: 338 }, { x: 304, y: 332 }],
          ],
          legs: [
            [{ x: 400, y: 330 }, { x: 438, y: 322 }, { x: 462, y: 318 }],
            [{ x: 404, y: 334 }, { x: 442, y: 322 }, { x: 466, y: 322 }],
          ],
        }}
      />

      {/* Top (primary): torso curled, shoulders lifted toward the knees */}
      <Fig
        pose={{
          head: { x: 300, y: 296 },
          torso: [
            { x: 318, y: 286 },
            { x: 404, y: 330 },
          ],
          arms: [
            [{ x: 314, y: 290 }, { x: 326, y: 304 }, { x: 308, y: 308 }],
            [{ x: 322, y: 286 }, { x: 332, y: 298 }, { x: 316, y: 302 }],
          ],
          legs: [
            [{ x: 404, y: 330 }, { x: 438, y: 322 }, { x: 462, y: 318 }],
            [{ x: 408, y: 334 }, { x: 442, y: 322 }, { x: 466, y: 322 }],
          ],
        }}
      />

      {/* Dashed arc of the crunch, bulging up toward the curled head */}
      <path
        d="M 235 372 Q 248 302 300 296"
        fill="none"
        stroke={FIG.annotation}
        strokeWidth={2.5}
        strokeDasharray={FIG.dash}
        strokeLinecap="round"
      />
      <Label x={240} y={250}>crunch</Label>
    </FigureCanvas>
  );
}
