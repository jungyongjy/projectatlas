import { MessageSquareQuote } from "lucide-react";

interface CoachNoteProps {
  children: React.ReactNode;
}

export function CoachNote({ children }: CoachNoteProps) {
  return (
    <div className="my-6 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-5">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquareQuote className="h-4 w-4 text-cyan-400 shrink-0" />
        <span className="text-sm font-semibold text-cyan-400">
          Coach Notes
        </span>
      </div>
      <div className="text-sm text-atlas-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
