// ── Navigation configuration ──
// Single source of truth for all Atlas navigation.
// Used by Sidebar, Breadcrumb, and Search components.

import type { NavigationConfig } from "@/types/navigation";

export const navigationConfig: NavigationConfig = {
  groups: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Blueprint",
          href: "/blueprint",
          children: [
            { title: "Philosophy", href: "/blueprint/philosophy" },
            { title: "Goals", href: "/blueprint/goals" },
            { title: "Principles", href: "/blueprint/principles" },
            { title: "Weekly Schedule", href: "/blueprint/weekly-schedule" },
          ],
        },
        {
          title: "Version History",
          href: "/version-history",
        },
      ],
    },
    {
      title: "Training",
      items: [
        {
          title: "Running",
          href: "/running",
          children: [
            { title: "Philosophy", href: "/running/philosophy" },
            { title: "Zone 2", href: "/running/zone-2" },
            { title: "Threshold", href: "/running/threshold" },
            { title: "Intervals", href: "/running/intervals" },
            { title: "Norwegian 4×4", href: "/running/norwegian-4x4" },
            { title: "Strides", href: "/running/strides" },
            { title: "Long Run", href: "/running/long-run" },
            { title: "Warm-Up", href: "/running/warm-up" },
            { title: "Race Week", href: "/running/race-week" },
            { title: "FAQ", href: "/running/faq" },
          ],
        },
        {
          title: "Strength",
          href: "/strength",
          children: [
            { title: "Philosophy", href: "/strength/philosophy" },
            { title: "Concurrent Training", href: "/strength/concurrent-training" },
            { title: "Weekly Programme", href: "/strength/weekly-program" },
            { title: "Progression Model", href: "/strength/progression-model" },
            { title: "Exercise Selection", href: "/strength/exercise-selection" },
            { title: "Deload Strategy", href: "/strength/deload-strategy" },
            { title: "FAQ", href: "/strength/faq" },
          ],
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Mobility",
          href: "/mobility",
          children: [
            { title: "Thoracic Spine", href: "/mobility/thoracic-spine" },
            { title: "Calves", href: "/mobility/calves" },
            { title: "Ankles", href: "/mobility/ankles" },
            { title: "Hips", href: "/mobility/hips" },
            { title: "Warm-Up", href: "/mobility/warm-up" },
            { title: "Recovery", href: "/mobility/recovery" },
          ],
        },
        {
          title: "Nutrition",
          href: "/nutrition",
          children: [
            { title: "Protein", href: "/nutrition/protein" },
            { title: "Calories", href: "/nutrition/calories" },
            { title: "Hydration", href: "/nutrition/hydration" },
            { title: "Carbohydrates", href: "/nutrition/carbohydrates" },
            { title: "Supplements", href: "/nutrition/supplements" },
            { title: "Meal Timing", href: "/nutrition/meal-timing" },
            { title: "Recovery", href: "/nutrition/recovery" },
            { title: "Travel", href: "/nutrition/travel" },
          ],
        },
      ],
    },
    {
      title: "Reference",
      items: [
        {
          title: "Exercise Library",
          href: "/exercise-library",
        },
        {
          title: "Decision Engine",
          href: "/decision-engine",
        },
        {
          title: "Scientific Appendix",
          href: "/scientific-appendix",
        },
        {
          title: "References",
          href: "/references",
        },
      ],
    },
  ],
};
