import { RdlFigure } from "./figures/rdl";
import { BulgarianFigure } from "./figures/bulgarian";
import { HipThrustFigure } from "./figures/hip-thrust";
import { LegPressFigure } from "./figures/leg-press";
import { LegCurlFigure } from "./figures/leg-curl";
import { WeightedBackExtensionFigure } from "./figures/weighted-back-extension";
import { ChestPressFigure } from "./figures/chest-press";
import { MachineShoulderPressFigure } from "./figures/machine-shoulder-press";
import { LateralRaiseFigure } from "./figures/lateral-raise";
import { CableTricepsExtensionFigure } from "./figures/cable-triceps-extension";
import { FacePullFigure } from "./figures/face-pull";
import { RearDeltReverseFlyFigure } from "./figures/rear-delt-reverse-fly";
import { CableRowFigure } from "./figures/cable-row";
import { PullUpsFigure } from "./figures/pull-ups";
import { PreacherCurlFigure } from "./figures/preacher-curl";
import { HammerCurlFigure } from "./figures/hammer-curl";
import { PallofPressFigure } from "./figures/pallof-press";
import { DeclineCrunchFigure } from "./figures/decline-crunch";
import { DecisionTreeFigure } from "./figures/decision-tree";
import { WarmUpRoutineFigure } from "./figures/warm-up-routine";
import { RecoveryMobilityFigure } from "./figures/recovery-mobility";
import { RunningGaitFigure } from "./figures/running-gait";
import { IntervalsFigure } from "./figures/intervals";
import { LongRunPaceFigure } from "./figures/long-run-pace";
import { Norwegian4x4Figure } from "./figures/norwegian-4x4";
import { StridesFigure } from "./figures/strides";
import { ThresholdFigure } from "./figures/threshold";
import { Zone2ThresholdFigure } from "./figures/zone2-threshold";

/**
 * A figure component receives an optional alt so MDX authors can override
 * the diagram's accessible label per instance. Each figure falls back to
 * its own default alt when none is passed.
 */
type FigureComponent = React.ComponentType<{ alt?: string }>;

const registry: Record<string, FigureComponent> = {
  rdl: RdlFigure,
  bulgarian: BulgarianFigure,
  hipThrust: HipThrustFigure,
  legPress: LegPressFigure,
  legCurl: LegCurlFigure,
  weightedBackExtension: WeightedBackExtensionFigure,
  chestPress: ChestPressFigure,
  machineShoulderPress: MachineShoulderPressFigure,
  lateralRaise: LateralRaiseFigure,
  cableTricepsExtension: CableTricepsExtensionFigure,
  facePull: FacePullFigure,
  rearDeltReverseFly: RearDeltReverseFlyFigure,
  cableRow: CableRowFigure,
  pullUps: PullUpsFigure,
  preacherCurl: PreacherCurlFigure,
  hammerCurl: HammerCurlFigure,
  pallofPress: PallofPressFigure,
  declineCrunch: DeclineCrunchFigure,
  decisionTree: DecisionTreeFigure,
  warmUpRoutine: WarmUpRoutineFigure,
  recoveryMobility: RecoveryMobilityFigure,
  runningGait: RunningGaitFigure,
  intervals: IntervalsFigure,
  longRunPace: LongRunPaceFigure,
  norwegian4x4: Norwegian4x4Figure,
  strides: StridesFigure,
  threshold: ThresholdFigure,
  zone2Threshold: Zone2ThresholdFigure,
};

interface FigureProps {
  /** Registered SVG figure name. Ignored when `src` is provided. */
  name?: keyof typeof registry | (string & {});
  /** Photo path (from /public). When present, renders a photo instead of the registered SVG figure. */
  src?: string;
  alt?: string;
  caption?: string;
}

export function Figure({ name, src, alt, caption }: FigureProps) {
  const Component = name ? registry[name as string] : undefined;
  const body = src ? (
    // eslint-disable-next-line @next/next/no-img-element -- static varied-aspect MDX illustrations; no next/image pipeline in this codebase
    <img
      src={src}
      alt={alt ?? caption ?? ""}
      loading="lazy"
      className="rounded-xl border border-atlas-border w-full h-auto"
    />
  ) : Component ? (
    <Component alt={alt} />
  ) : null;
  return (
    <figure className="my-10 w-full max-w-xl mx-auto">
      {body}
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-atlas-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
