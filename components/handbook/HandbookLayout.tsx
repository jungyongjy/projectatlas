import type { HandbookMetadata } from "@/types/metadata";
import { PageHeader } from "@/components/documentation/PageHeader";

interface HandbookLayoutProps {
  metadata: HandbookMetadata;
  children: React.ReactNode;
}

export function HandbookLayout({ metadata, children }: HandbookLayoutProps) {
  return (
    <article>
      <PageHeader title={metadata.title} description={metadata.description} />

      {/* Metadata bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-atlas-border">
        {metadata.readingTime && (
          <span className="text-xs text-atlas-text-muted">
            {metadata.readingTime} read
          </span>
        )}
        {metadata.lastUpdated && (
          <span className="text-xs text-atlas-text-muted">
            Updated:{" "}
            <time dateTime={metadata.lastUpdated}>{metadata.lastUpdated}</time>
          </span>
        )}
        {metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex text-[10px] font-mono text-atlas-text-muted bg-atlas-surface border border-atlas-border rounded px-1.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* MDX content */}
      <div className="prose-custom">{children}</div>
    </article>
  );
}
