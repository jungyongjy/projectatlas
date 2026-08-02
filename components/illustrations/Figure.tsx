import { RdlFigure } from "./figures/rdl";

/**
 * A figure component receives an optional alt so MDX authors can override
 * the diagram's accessible label per instance. Each figure falls back to
 * its own default alt when none is passed.
 */
type FigureComponent = React.ComponentType<{ alt?: string }>;

const registry: Record<string, FigureComponent> = {
  rdl: RdlFigure,
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
