interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-atlas-text-primary mb-3">
        {title}
      </h1>
      <p className="text-base text-atlas-text-secondary leading-relaxed max-w-2xl mb-8">
        {description}
      </p>
      <div className="rounded-lg border border-atlas-border bg-atlas-surface p-6">
        <p className="text-sm text-atlas-text-muted">
          This section will be populated with detailed handbook content during
          the content authoring phases (Phases 4–13).
        </p>
      </div>
    </div>
  );
}
