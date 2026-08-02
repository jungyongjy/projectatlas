import { AlertTriangle } from "lucide-react";
import { Callout, type CalloutStyle } from "./Callout";

const style: CalloutStyle = {
  label: "Warning",
  icon: AlertTriangle,
  color: "border-atlas-warning/40 text-atlas-warning",
  bg: "bg-atlas-warning/5",
};

export function WarningBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return <Callout style={style} title={title}>{children}</Callout>;
}
