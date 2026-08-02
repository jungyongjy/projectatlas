"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { WEEKLY_CHECKLIST_KEY } from "@/lib/constants";

interface ChecklistItem {
  id: string;
  label: string;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: "gym-1", label: "Gym Session 1 (Mon)" },
  { id: "run-hard", label: "Hard Run (Tue)" },
  { id: "gym-2", label: "Gym Session 2 (Wed)" },
  { id: "run-zone2", label: "Zone 2 Run (Thu)" },
  { id: "gym-3", label: "Gym Session 3 (Fri)" },
  { id: "run-long", label: "Long Run (Sat)" },
  { id: "mobility", label: "Mobility (5–10 min daily)" },
  { id: "protein", label: "Protein ≥140 g" },
  { id: "sleep", label: "Sleep ≥7 hours" },
  { id: "hydration", label: "Hydration ≥2 L" },
  { id: "recovery-review", label: "Recovery Review" },
];

export function WeeklyChecklist() {
  // Hydration-safe: load persisted state lazily (server always gets an
  // empty object) but only render the real content after mount, so the
  // server and client first render both show the skeleton.
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(WEEKLY_CHECKLIST_KEY) ?? "{}");
    } catch {
      return {};
    }
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Flip the flag once after mount so the first client render matches the
    // server-rendered skeleton, avoiding a hydration mismatch from local data.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Persist state to localStorage on change
  const persist = useCallback((newChecked: Record<string, boolean>) => {
    try {
      localStorage.setItem(WEEKLY_CHECKLIST_KEY, JSON.stringify(newChecked));
    } catch {
      // Storage full or unavailable
    }
  }, []);

  const toggleItem = useCallback(
    (id: string) => {
      setChecked((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const resetAll = useCallback(() => {
    const empty: Record<string, boolean> = {};
    setChecked(empty);
    persist(empty);
  }, [persist]);

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const totalCount = DEFAULT_ITEMS.length;

  // Show a skeleton until mounted so the server and client first render match.
  if (!mounted) {
    return (
      <div className="rounded-lg border border-atlas-border bg-atlas-surface p-5">
        <div className="h-5 w-32 bg-atlas-hover rounded animate-pulse mb-4" />
        <div className="space-y-2">
          {DEFAULT_ITEMS.map((item) => (
            <div key={item.id} className="h-8 bg-atlas-hover rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-atlas-border bg-atlas-surface p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-atlas-text-primary">
            Weekly Checklist
          </h3>
          <p className="text-xs text-atlas-text-muted mt-0.5">
            Resets each week: track what matters
          </p>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="text-xs text-atlas-text-muted hover:text-atlas-text-secondary transition-colors px-2 py-1 rounded hover:bg-atlas-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
          aria-label="Reset all checklist items"
        >
          Reset
        </button>
      </div>

      {/* Items */}
      <ul className="space-y-1">
        {DEFAULT_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                "hover:bg-atlas-hover focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-atlas-accent",
                checked[item.id]
                  ? "text-atlas-text-muted"
                  : "text-atlas-text-secondary",
              )}
              aria-checked={checked[item.id] ?? false}
              role="checkbox"
            >
              {/* Checkbox */}
              <span
                className={cn(
                  "inline-flex items-center justify-center h-5 w-5 rounded border shrink-0 transition-colors",
                  checked[item.id]
                    ? "bg-atlas-success border-atlas-success text-white"
                    : "border-atlas-border bg-transparent",
                )}
              >
                {checked[item.id] && (
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>

              {/* Label */}
              <span
                className={cn(
                  "text-sm",
                  checked[item.id] && "line-through",
                )}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-atlas-border flex items-center justify-between">
        <span className="text-xs text-atlas-text-muted">
          {checkedCount} of {totalCount} completed
        </span>
        <span className="text-xs text-atlas-text-muted">
          {checkedCount === totalCount
            ? "All done, great week"
            : checkedCount >= totalCount * 0.7
              ? "Almost there"
              : "Keep going"}
        </span>
      </div>
    </div>
  );
}
