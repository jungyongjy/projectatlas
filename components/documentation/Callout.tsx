import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CalloutStyle {
  label: string;
  icon: LucideIcon;
  /** border + text + icon colour */
  color: string;
  /** subtle background tint */
  bg: string;
}

interface CalloutProps {
  style: CalloutStyle;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ style, title, children }: CalloutProps) {
  const { label, icon: Icon, color, bg } = style;
  return (
    <div className={cn("my-6 rounded-lg border p-5", color, bg)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="text-sm font-semibold">{title ?? label}</span>
      </div>
      <div className="text-sm text-atlas-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}
