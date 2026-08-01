import { AlertTriangle } from "lucide-react";

interface WarningBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function WarningBox({ title = "Warning", children }: WarningBoxProps) {
  return (
    <div className="my-6 rounded-lg border border-atlas-warning/30 bg-atlas-warning/5 p-5">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-4 w-4 text-atlas-warning shrink-0" />
        <span className="text-sm font-semibold text-atlas-warning">
          {title}
        </span>
      </div>
      <div className="text-sm text-atlas-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
