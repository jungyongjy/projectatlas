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
import { AnklesFigure } from "./figures/ankles";
import { CalfStretchFigure } from "./figures/calf-stretch";
import { Hip9090Figure } from "./figures/hip-90-90";
import { ThoracicRotationFigure } from "./figures/thoracic-rotation";
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
  ankles: AnklesFigure,
  calfStretch: CalfStretchFigure,
  hip9090: Hip9090Figure,
  thoracicRotation: ThoracicRotationFigure,
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
  name: keyof typeof registry | (string & {});
  alt?: string;
  caption?: string;
}

export function Figure({ name, alt, caption }: FigureProps) {
  const Component = registry[name as string];
  if (!Component) return null;
  return (
    <figure className="my-10 w-full max-w-xl mx-auto">
      <Component alt={alt} />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-atlas-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
