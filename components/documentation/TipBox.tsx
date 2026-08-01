import { Lightbulb } from "lucide-react";

interface TipBoxProps {
  children: React.ReactNode;
}

export function TipBox({ children }: TipBoxProps) {
  return (
    <div className="my-6 rounded-lg border border-atlas-success/30 bg-atlas-success/5 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="h-4 w-4 text-atlas-success shrink-0" />
        <span className="text-sm font-semibold text-atlas-success">
          Tip
        </span>
      </div>
      <div className="text-sm text-atlas-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
