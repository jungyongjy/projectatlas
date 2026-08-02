export const FIG = {
  viewBox: { w: 640, h: 480 },
  groundY: 428,
  bg: "#161616",          // atlas-surface
  grid: "#2a2a2a",        // atlas-border, ground line
  body: "#4f8ef7",        // atlas-accent — primary figure
  ghost: "#7a7a7a",       // atlas-text-muted — dashed start position
  equipment: "#3a3a3a",   // machine / equipment outline
  equipmentFill: "#232323",
  annotation: "#f39c12",  // atlas-warning — arrows / highlights
  label: "#9a9a9a",
  strokeWidth: 3.5,
  dash: "7 6",
  font: "JetBrains Mono, monospace",
} as const;
