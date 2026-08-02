import { ListOrdered } from "lucide-react";

interface DrillStepProps {
  term: string;
  children: React.ReactNode;
}

export function DrillStep({ term, children }: DrillStepProps) {
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-0.5 py-2.5 border-b border-atlas-border last:border-b-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-atlas-accent pt-0.5">
        {term}
      </dt>
      <dd className="text-sm text-atlas-text-secondary leading-relaxed">{children}</dd>
    </div>
  );
}

interface DrillCardProps {
  title: string;
  children: React.ReactNode;
}

export function DrillCard({ title, children }: DrillCardProps) {
  return (
    <div className="my-6 rounded-lg border border-atlas-border bg-atlas-surface overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-atlas-hover/50 border-b border-atlas-border">
        <ListOrdered className="h-4 w-4 text-atlas-accent shrink-0" />
        <h4 className="text-sm font-semibold text-atlas-text-primary">{title}</h4>
      </div>
      <dl className="px-4">{children}</dl>
    </div>
  );
}
