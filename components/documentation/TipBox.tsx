import { Lightbulb } from "lucide-react";
import { Callout, type CalloutStyle } from "./Callout";

const style: CalloutStyle = {
  label: "Tip",
  icon: Lightbulb,
  color: "border-atlas-success/40 text-atlas-success",
  bg: "bg-atlas-success/5",
};

export function TipBox({ children }: { children: React.ReactNode }) {
  return <Callout style={style}>{children}</Callout>;
}
