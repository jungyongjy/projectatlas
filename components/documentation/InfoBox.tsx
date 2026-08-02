import { Info } from "lucide-react";
import { Callout, type CalloutStyle } from "./Callout";

const style: CalloutStyle = {
  label: "Information",
  icon: Info,
  color: "border-atlas-accent/40 text-atlas-accent",
  bg: "bg-atlas-accent/5",
};

export function InfoBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return <Callout style={style} title={title}>{children}</Callout>;
}
