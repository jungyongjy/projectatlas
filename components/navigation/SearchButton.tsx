"use client";

import { Search, Command } from "lucide-react";

interface SearchButtonProps {
  onClick?: () => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-md border border-atlas-border bg-atlas-surface px-3 py-2 text-sm text-atlas-text-muted hover:bg-atlas-hover hover:text-atlas-text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
      aria-label="Search handbook"
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-left">Search handbook...</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-atlas-bg-secondary border border-atlas-border px-1.5 py-0.5 font-mono text-[10px] text-atlas-text-muted">
        <Command className="h-2.5 w-2.5" />
        <span>K</span>
      </kbd>
    </button>
  );
}
