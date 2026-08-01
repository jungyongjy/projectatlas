import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-24">
      <div className="flex flex-col items-center text-center max-w-md">
        <FileQuestion className="h-12 w-12 text-atlas-text-muted mb-6" />
        <h1 className="text-2xl font-semibold text-atlas-text-primary mb-2">
          Page not found
        </h1>
        <p className="text-base text-atlas-text-muted mb-8 leading-relaxed">
          This page does not exist in the Atlas handbook. It may have been
          moved, renamed, or not yet written.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-atlas-surface border border-atlas-border text-sm font-medium text-atlas-text-secondary hover:bg-atlas-hover transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Handbook
        </Link>
      </div>
    </div>
  );
}
