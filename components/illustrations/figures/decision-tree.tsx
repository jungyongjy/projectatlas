import { FigureCanvas } from "../fig/FigureCanvas";
import { Arrow } from "../fig/Arrow";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

/* If-then decision tree: a single situation node branches on a rule —
 * "yes" (proceed, body blue) or "no" (adjust, annotation amber) — to two
 * terminal outcome chips. Dashed amber arrows carry both branches. Pure
 * flow diagram, no human figure. */

export function DecisionTreeFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="IF-THEN DECISION TREE"
      alt={alt ?? "Decision tree flow, if-then guidance branching"}
    >
      {/* Decision node — equipment-outlined rounded rectangle */}
      <rect
        x={200}
        y={76}
        width={240}
        height={64}
        rx={14}
        fill={FIG.equipmentFill}
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
      />
      <text
        x={320}
        y={114}
        textAnchor="middle"
        fill={FIG.label}
        fontFamily={FIG.font}
        fontSize={16}
        letterSpacing={1}
      >
        SITUATION
      </text>

      {/* Yes branch — dashed annotation arrow to the proceed chip */}
      <Arrow x1={270} y1={140} x2={170} y2={296} />
      <Label x={240} y={224} strong>
        yes
      </Label>

      {/* No branch — dashed annotation arrow to the adjust chip */}
      <Arrow x1={370} y1={140} x2={470} y2={296} />
      <text
        x={392}
        y={224}
        fill={FIG.annotation}
        fontFamily={FIG.font}
        fontSize={14}
      >
        no
      </text>

      {/* Terminal outcome chips — proceed path (body blue) and adjust path (annotation amber) */}
      <rect x={90} y={296} width={150} height={56} rx={12} fill={FIG.body} />
      <text
        x={165}
        y={331}
        textAnchor="middle"
        fill={FIG.bg}
        fontFamily={FIG.font}
        fontSize={15}
        letterSpacing={1}
      >
        TRAIN ON
      </text>

      <rect
        x={400}
        y={296}
        width={150}
        height={56}
        rx={12}
        fill={FIG.annotation}
      />
      <text
        x={475}
        y={331}
        textAnchor="middle"
        fill={FIG.bg}
        fontFamily={FIG.font}
        fontSize={15}
        letterSpacing={1}
      >
        ADJUST
      </text>

      {/* takeaway */}
      <text
        x={320}
        y={452}
        textAnchor="middle"
        fill={FIG.label}
        fontFamily={FIG.font}
        fontSize={13}
      >
        clear rules remove in-the-moment guesswork
      </text>
    </FigureCanvas>
  );
}
