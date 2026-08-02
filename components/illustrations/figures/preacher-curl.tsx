import { FigureCanvas } from "../fig/FigureCanvas";
import { Fig } from "../fig/Fig";
import { Seat } from "../fig/Equipment";
import { Label } from "../fig/Label";
import { FIG } from "../fig/palette";

export function PreacherCurlFigure({ alt }: { alt?: string }) {
  return (
    <FigureCanvas
      title="Preacher Curl — elbow braced on the angled pad"
      alt={alt ?? "Preacher curl, side view"}
    >
      {/* Preacher bench: angled arm pad sloping down to the front (left), seat
          and support column behind on the right. Side-view convention: the
          figure faces LEFT — pad and curl in front, seat behind. */}
      <g
        fill="none"
        stroke={FIG.equipment}
        strokeWidth={FIG.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* angled pad the upper arm rests on */}
        <line x1={324} y1={214} x2={228} y2={330} strokeWidth={12} />
        {/* pad support column + base plate */}
        <line x1={250} y1={336} x2={250} y2={428} />
        <line x1={205} y1={428} x2={345} y2={428} />
      </g>
      <Seat x={388} y={342} width={88} />

      {/* Curled position (primary): upper arm on the pad, forearm curled up */}
      <Fig
        pose={{
          head: { x: 306, y: 160 },
          torso: [
            { x: 322, y: 196 },
            { x: 362, y: 330 },
          ],
          arms: [
            [{ x: 322, y: 206 }, { x: 226, y: 326 }, { x: 196, y: 248 }],
            [{ x: 330, y: 202 }, { x: 232, y: 322 }, { x: 202, y: 244 }],
          ],
          legs: [
            [{ x: 362, y: 330 }, { x: 352, y: 372 }, { x: 342, y: 428 }],
            [{ x: 366, y: 334 }, { x: 358, y: 376 }, { x: 350, y: 428 }],
          ],
        }}
      />

      {/* Extended bottom (ghost): forearm hanging straight down from the elbow */}
      <Fig
        ghost
        pose={{
          head: { x: 306, y: 160 },
          torso: [
            { x: 322, y: 196 },
            { x: 362, y: 330 },
          ],
          arms: [
            [{ x: 322, y: 206 }, { x: 226, y: 326 }, { x: 226, y: 412 }],
            [{ x: 330, y: 202 }, { x: 232, y: 322 }, { x: 232, y: 408 }],
          ],
          legs: [
            [{ x: 362, y: 330 }, { x: 352, y: 372 }, { x: 342, y: 428 }],
            [{ x: 366, y: 334 }, { x: 358, y: 376 }, { x: 350, y: 428 }],
          ],
        }}
      />

      {/* Dumbbells at the hands (side view: plate clusters seen edge-on) */}
      <line x1={196} y1={252} x2={196} y2={268} stroke={FIG.equipment} strokeWidth={8} strokeLinecap="round" />
      <line x1={226} y1={416} x2={226} y2={428} stroke={FIG.equipment} strokeWidth={8} strokeLinecap="round" />

      {/* Dashed arc of the curl, bulging toward the forearm sweep */}
      <path
        d="M 226 412 Q 205 320 196 248"
        fill="none"
        stroke={FIG.annotation}
        strokeWidth={2.5}
        strokeDasharray={FIG.dash}
        strokeLinecap="round"
      />
      <Label x={118} y={392}>forearm curl</Label>
    </FigureCanvas>
  );
}
