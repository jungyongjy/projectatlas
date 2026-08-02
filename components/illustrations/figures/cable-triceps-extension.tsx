import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { CableStack, PulleyBar } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { Arrow } from "../fig/Arrow";
import { FIG } from "../fig/palette";

export function CableTricepsExtensionFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Cable Triceps Extension — elbows pinned"
      alt={alt ?? "Cable triceps extension, front view"}
    >
      {/* Cable stack behind the figure, high pulley overhead */}
      <CableStack x={320} columnH={230} />

      {/* Finish (primary): elbows pinned, forearms extended down */}
      <Fig
        pose={{
          head: { x: 320, y: 108 },
          torso: [
            { x: 320, y: 140 },
            { x: 320, y: 300 },
          ],
          arms: [
            [{ x: 316, y: 144 }, { x: 304, y: 224 }, { x: 290, y: 310 }],
            [{ x: 324, y: 144 }, { x: 336, y: 224 }, { x: 350, y: 310 }],
          ],
          legs: [
            [{ x: 318, y: 300 }, { x: 304, y: 382 }, { x: 302, y: 428 }],
            [{ x: 322, y: 300 }, { x: 336, y: 382 }, { x: 338, y: 428 }],
          ],
        }}
      />
      {/* Start (ghost): forearms flexed up, elbows still pinned */}
      <Fig
        ghost
        pose={{
          head: { x: 320, y: 108 },
          torso: [
            { x: 320, y: 140 },
            { x: 320, y: 300 },
          ],
          arms: [
            [{ x: 316, y: 144 }, { x: 304, y: 224 }, { x: 288, y: 182 }],
            [{ x: 324, y: 144 }, { x: 336, y: 224 }, { x: 352, y: 182 }],
          ],
          legs: [
            [{ x: 318, y: 300 }, { x: 304, y: 382 }, { x: 302, y: 428 }],
            [{ x: 322, y: 300 }, { x: 336, y: 382 }, { x: 338, y: 428 }],
          ],
        }}
      />

      {/* cable + handle bar drawn over the figure: the bar runs in front of the thighs */}
      <line x1={320} y1={216} x2={320} y2={292} stroke={FIG.equipment} strokeWidth={2} />
      <PulleyBar x={320} y={310} width={96} />

      {/* Dashed arc of the forearm extension on the left side */}
      <path
        d="M 288 182 Q 252 246 290 310"
        fill="none"
        stroke={FIG.annotation}
        strokeWidth={2.5}
        strokeDasharray={FIG.dash}
        strokeLinecap="round"
      />

      <Label x={96} y={170}>extend the forearms</Label>
      <Arrow x1={372} y1={212} x2={344} y2={222} />
      <Label x={376} y={206}>elbows pinned</Label>
    </FigureCanvas>
  );
}
