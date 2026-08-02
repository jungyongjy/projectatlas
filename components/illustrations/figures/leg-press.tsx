import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Arrow } from "../fig/Arrow";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

export function LegPressFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Leg Press — foot placement"
      alt={alt ?? "Leg Press foot position: shoulder-width and mid-platform"}
    >
      {/* Machine: upright foot platform, reclined seat + backrest */}
      <g
        fill="none"
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* foot platform slab */}
        <rect x={150} y={160} width={60} height={268} fill={FIG.equipmentFill} stroke={FIG.equipment} />
        {/* seat pad */}
        <rect x={285} y={344} width={115} height={8} fill={FIG.equipmentFill} />
        {/* reclined backrest pad, aligned behind the torso */}
        <line x1={408} y1={264} x2={348} y2={353} strokeWidth={12} />
        {/* seat column and base frame */}
        <line x1={360} y1={352} x2={360} y2={428} />
        <line x1={180} y1={424} x2={400} y2={424} />
      </g>

      {/* Seated, reclined figure with both feet pressing the platform */}
      <Fig
        pose={{
          head: { x: 410, y: 230 },
          torso: [
            { x: 395, y: 255 },
            { x: 335, y: 344 },
          ],
          arms: [
            [{ x: 399, y: 262 }, { x: 362, y: 316 }, { x: 332, y: 360 }],
            [{ x: 393, y: 260 }, { x: 370, y: 314 }, { x: 346, y: 356 }],
          ],
          legs: [
            // near foot on the platform
            [{ x: 335, y: 344 }, { x: 252, y: 356 }, { x: 172, y: 300 }],
            // far foot on the platform, slightly higher
            [{ x: 335, y: 344 }, { x: 268, y: 360 }, { x: 196, y: 294 }],
          ],
        }}
      />

      {/* Annotation: shoulder-width feet, mid-platform */}
      <Label x={118} y={138}>shoulder-width, mid-platform</Label>
      <Arrow x1={140} y1={220} x2={170} y2={298} />
      <Arrow x1={196} y1={210} x2={196} y2={292} />
    </FigureCanvas>
  );
}
