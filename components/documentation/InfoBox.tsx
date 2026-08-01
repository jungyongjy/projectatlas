import { Info } from "lucide-react";

interface InfoBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function InfoBox({ title = "Information", children }: InfoBoxProps) {
  return (
    <div className="my-6 rounded-lg border border-atlas-accent/30 bg-atlas-accent/5 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-4 w-4 text-atlas-accent shrink-0" />
        <span className="text-sm font-semibold text-atlas-accent">
          {title}
        </span>
      </div>
      <div className="text-sm text-atlas-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
