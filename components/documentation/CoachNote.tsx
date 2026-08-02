import { MessageSquareQuote } from "lucide-react";
import { Callout, type CalloutStyle } from "./Callout";

const style: CalloutStyle = {
  label: "Coach Notes",
  icon: MessageSquareQuote,
  color: "border-cyan-500/40 text-cyan-400",
  bg: "bg-cyan-500/5",
};

export function CoachNote({ children }: { children: React.ReactNode }) {
  return <Callout style={style}>{children}</Callout>;
}
