import { versionHistory } from "@/lib/version-data";
import type { VersionChangeType } from "@/types/version";

const TYPE_STYLES: Record<
  VersionChangeType,
  { label: string; className: string }
> = {
  added: {
    label: "Added",
    className:
      "text-atlas-success bg-atlas-success/10 border-atlas-success/30",
  },
  changed: {
    label: "Changed",
    className: "text-atlas-accent bg-atlas-accent/10 border-atlas-accent/30",
  },
  fixed: {
    label: "Fixed",
    className: "text-atlas-warning bg-atlas-warning/10 border-atlas-warning/30",
  },
  removed: {
    label: "Removed",
    className: "text-atlas-error bg-atlas-error/10 border-atlas-error/30",
  },
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Vertical release timeline rendered from version-data.ts.
 * Each entry shows a version badge, release date, summary, a
 * type-tagged change list, and any release notes.
 */
export function VersionTimeline() {
  return (
    <div className="relative mt-10">
      {/* Vertical guide line */}
      <div
        className="absolute left-[9px] top-2 bottom-2 w-px bg-atlas-border"
        aria-hidden="true"
      />

      <ol className="space-y-10">
        {versionHistory.map((entry) => (
          <li key={entry.version} className="relative pl-10">
            {/* Dot marker */}
            <span
              className="absolute left-0 top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-atlas-accent bg-atlas-bg-secondary"
              aria-hidden="true"
            >
              <span className="h-2 w-2 rounded-full bg-atlas-accent" />
            </span>

            <div className="rounded-lg border border-atlas-border bg-atlas-surface p-5">
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm font-semibold text-atlas-accent">
                  v{entry.version}
                </span>
                <time
                  dateTime={entry.date}
                  className="text-xs text-atlas-text-muted"
                >
                  {formatDate(entry.date)}
                </time>
              </div>

              <p className="mb-4 text-sm text-atlas-text-secondary">
                {entry.summary}
              </p>

              {entry.changes.length > 0 && (
                <ul className="space-y-2">
                  {entry.changes.map((change, index) => {
                    const style = TYPE_STYLES[change.type];
                    return (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <span
                          className={`shrink-0 inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] ${style.className}`}
                        >
                          {style.label}
                        </span>
                        <span className="leading-relaxed text-atlas-text-secondary">
                          {change.description}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {entry.notes && (
                <p className="mt-4 border-t border-atlas-border pt-4 text-sm leading-relaxed text-atlas-text-muted">
                  {entry.notes}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}
