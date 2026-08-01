import { ExternalLink } from "lucide-react";

interface ReferenceCardProps {
  authors: string;
  year: string;
  title: string;
  journal?: string;
  doi?: string;
  link?: string;
}

export function ReferenceCard({
  authors,
  year,
  title,
  journal,
  doi,
  link,
}: ReferenceCardProps) {
  return (
    <div className="my-4 rounded-lg border border-atlas-border bg-atlas-surface p-4">
      <p className="text-sm text-atlas-text-secondary mb-1">
        <span className="text-atlas-text-primary font-medium">{authors}</span>
        {" "}({year})
      </p>
      <p className="text-sm text-atlas-text-primary font-medium mb-1">
        {title}
      </p>
      {(journal || doi) && (
        <p className="text-xs text-atlas-text-muted mb-2">
          {journal && <span>{journal}</span>}
          {journal && doi && <span> — </span>}
          {doi && <span className="font-mono">DOI: {doi}</span>}
        </p>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-atlas-accent hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          View source
        </a>
      )}
    </div>
  );
}
