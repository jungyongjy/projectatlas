import { FlaskConical } from "lucide-react";

interface ScientificNoteProps {
  children: React.ReactNode;
}

export function ScientificNote({ children }: ScientificNoteProps) {
  return (
    <div className="my-6 rounded-lg border border-purple-500/30 bg-purple-500/5 p-5">
      <div className="flex items-center gap-2 mb-2">
        <FlaskConical className="h-4 w-4 text-purple-400 shrink-0" />
        <span className="text-sm font-semibold text-purple-400">
          Scientific Notes
        </span>
      </div>
      <div className="text-sm text-atlas-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
