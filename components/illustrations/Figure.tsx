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
