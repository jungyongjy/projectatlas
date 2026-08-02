import { FlaskConical } from "lucide-react";
import { Callout, type CalloutStyle } from "./Callout";

const style: CalloutStyle = {
  label: "Scientific Notes",
  icon: FlaskConical,
  color: "border-purple-500/40 text-purple-400",
  bg: "bg-purple-500/5",
};

export function ScientificNote({ children }: { children: React.ReactNode }) {
  return <Callout style={style}>{children}</Callout>;
}
