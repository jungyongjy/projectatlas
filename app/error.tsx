"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RotateCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-24">
      <div className="flex flex-col items-center text-center max-w-md">
        <AlertTriangle className="h-12 w-12 text-atlas-warning mb-6" />
        <h1 className="text-2xl font-semibold text-atlas-text-primary mb-2">
          Something went wrong
        </h1>
        <p className="text-base text-atlas-text-muted mb-8 leading-relaxed">
          Unable to load this page. The handbook content may be temporarily
          unavailable.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-atlas-surface border border-atlas-border text-sm font-medium text-atlas-text-secondary hover:bg-atlas-hover transition-colors"
          >
            <RotateCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-atlas-surface border border-atlas-border text-sm font-medium text-atlas-text-secondary hover:bg-atlas-hover transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Handbook
          </Link>
        </div>
      </div>
    </div>
  );
}
