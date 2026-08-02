import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { CableStack, FootPlatform, Seat } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

export function CableRowFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Seated Cable Row — handle to the ribs"
      alt={alt ?? "Seated cable row, side view"}
    >
      {/* Machine: low-pulley cable stack at the front (left), foot platform,
          seat and an upright backrest behind the torso. Side-view convention:
          the figure faces LEFT — cable/handle in front, backrest on the right. */}
      <CableStack x={130} columnH={140} />
      <FootPlatform x={235} y={416} width={60} />
      <Seat x={345} y={344} width={90} />
      <g
        fill="none"
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* upright backrest pad behind the torso */}
        <line x1={366} y1={214} x2={360} y2={350} strokeWidth={12} />
        {/* backrest column + ground base */}
        <line x1={362} y1={350} x2={362} y2={428} />
        <line x1={330} y1={428} x2={400} y2={428} />
      </g>

      {/* Seated figure: torso upright, feet on the platform, handle to the ribs */}
      <Fig
        pose={{
          head: { x: 326, y: 168 },
          torso: [
            { x: 322, y: 198 },
            { x: 328, y: 342 },
          ],
          arms: [
            [{ x: 320, y: 202 }, { x: 350, y: 260 }, { x: 310, y: 272 }],
            [{ x: 326, y: 200 }, { x: 356, y: 256 }, { x: 316, y: 270 }],
          ],
          legs: [
            [{ x: 328, y: 342 }, { x: 298, y: 372 }, { x: 248, y: 414 }],
            [{ x: 330, y: 346 }, { x: 304, y: 378 }, { x: 254, y: 414 }],
          ],
        }}
      />

      {/* Handle at the ribs, cable running back to the low pulley */}
      <line
        x1={310}
        y1={260}
        x2={310}
        y2={284}
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
      />
      <line x1={130} y1={294} x2={310} y2={272} stroke={FIG.equipment} strokeWidth={2} />

      {/* Annotation: pull the handle to the ribs */}
      <Arrow x1={230} y1={258} x2={306} y2={270} />
      <Label x={176} y={252}>pull to the ribs</Label>
    </FigureCanvas>
  );
}
