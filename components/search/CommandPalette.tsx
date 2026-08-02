"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  BookOpen,
  Footprints,
  Dumbbell,
  PersonStanding,
  Search,
  SearchX,
  Apple,
  GitBranch,
  LibraryBig,
  FlaskConical,
  BookMarked,
  History,
  CalendarDays,
  FileText,
} from "lucide-react";
import type { SearchIndex, SearchResult } from "@/types/search";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchIndex: SearchIndex[];
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  blueprint: BookOpen,
  training: CalendarDays,
  running: Footprints,
  strength: Dumbbell,
  mobility: PersonStanding,
  nutrition: Apple,
  "decision-engine": GitBranch,
  "exercise-library": LibraryBig,
  "scientific-appendix": FlaskConical,
  references: BookMarked,
  "version-history": History,
};

const CATEGORY_LABELS: Record<string, string> = {
  blueprint: "Blueprint",
  training: "Training",
  running: "Running",
  strength: "Strength",
  mobility: "Mobility",
  nutrition: "Nutrition",
  "decision-engine": "Decision Engine",
  "exercise-library": "Exercise Library",
  "scientific-appendix": "Scientific Appendix",
  references: "References",
  "version-history": "Version History",
};

/**
 * Global search command palette with Fuse.js fuzzy search,
 * keyboard navigation, and highlighted matches.
 */
export function CommandPalette({
  open,
  onOpenChange,
  searchIndex,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Initialize Fuse.js with the search index
  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          // Ranking priority: page title > heading > tags > body content
          { name: "title", weight: 3 },
          { name: "headings", weight: 2 },
          { name: "tags", weight: 1.5 },
          { name: "content", weight: 1 },
          { name: "category", weight: 0.5 },
        ],
        threshold: 0.4,
        distance: 100,
        includeMatches: true,
        minMatchCharLength: 1,
        ignoreLocation: true,
      }),
    [searchIndex],
  );

  // Perform search
  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];

    const fuseResults = fuse.search(query.trim());

    return fuseResults.slice(0, 12).map((result) => ({
      title: result.item.title,
      href: result.item.href,
      snippet: result.item.content.slice(0, 150),
      category: result.item.category,
      tags: result.item.tags,
      matches: result.matches as SearchResult["matches"],
    }));
  }, [query, fuse]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const result of results) {
      const cat = result.category || "other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(result);
    }
    return groups;
  }, [results]);

  // Ctrl+K keyboard shortcut
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    },
    [open, onOpenChange],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Handle dialog open/close with query reset
  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        setQuery("");
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange],
  );

  // Handle item selection
  const handleSelect = useCallback(
    (href: string) => {
      setQuery("");
      onOpenChange(false);
      router.push(href);
    },
    [router, onOpenChange],
  );

  // Highlight matching text
  const highlightMatches = useCallback(
    (text: string, matches?: SearchResult["matches"]) => {
      if (!matches || matches.length === 0) return text;

      // Collect all match indices
      const allIndices: [number, number][] = [];
      for (const match of matches) {
        if (match.indices) {
          for (const idx of match.indices) {
            allIndices.push([idx[0], idx[1]]);
          }
        }
      }

      if (allIndices.length === 0) return text;

      // Sort and merge overlapping indices
      allIndices.sort((a, b) => a[0] - b[0]);
      const merged: [number, number][] = [];
      for (const idx of allIndices) {
        const last = merged[merged.length - 1];
        if (last && idx[0] <= last[1] + 1) {
          last[1] = Math.max(last[1], idx[1]);
        } else {
          merged.push([...idx]);
        }
      }

      // Build highlighted JSX
      const parts: React.ReactNode[] = [];
      let cursor = 0;
      for (let i = 0; i < merged.length; i++) {
        const [start, end] = merged[i];
        if (start > cursor) {
          parts.push(text.slice(cursor, start));
        }
        parts.push(
          <mark
            key={i}
            className="bg-atlas-accent/25 text-atlas-accent font-medium rounded-sm px-0.5"
          >
            {text.slice(start, end + 1)}
          </mark>,
        );
        cursor = end + 1;
      }
      if (cursor < text.length) {
        parts.push(text.slice(cursor));
      }

      return <>{parts}</>;
    },
    [],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Search Handbook"
      description="Search across all handbook pages, exercises, and reference materials."
    >
      <CommandInput
        placeholder="Search the handbook..."
        value={query}
        onValueChange={setQuery}
      />

      <CommandList>
        {/* Empty state with query */}
        {query.trim() && results.length === 0 && (
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-8">
              <SearchX
                className="h-8 w-8 text-atlas-text-muted mb-2"
                aria-hidden="true"
              />
              <p className="text-sm text-atlas-text-muted">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-atlas-text-muted">
                Try a different search term
              </p>
            </div>
          </CommandEmpty>
        )}

        {/* No query, show hint */}
        {!query.trim() && (
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-8">
              <Search
                className="h-8 w-8 text-atlas-text-muted mb-2"
                aria-hidden="true"
              />
              <p className="text-sm text-atlas-text-muted">
                Type to search the handbook
              </p>
              <p className="text-xs text-atlas-text-muted">
                Search across titles, content, and tags
              </p>
            </div>
          </CommandEmpty>
        )}

        {/* Results grouped by category */}
        {Object.entries(groupedResults).map(([category, items]) => {
          const Icon = CATEGORY_ICONS[category] ?? FileText;
          const label = CATEGORY_LABELS[category] ?? category;

          return (
            <CommandGroup
              key={category}
              heading={
                <span className="flex items-center gap-1.5">
                  <Icon className="h-3 w-3" />
                  {label}
                </span>
              }
            >
              {items.map((result) => (
                <CommandItem
                  key={result.href}
                  value={`${result.title} ${result.category} ${result.tags.join(" ")}`}
                  onSelect={() => handleSelect(result.href)}
                >
                  <div className="flex flex-col items-start gap-0.5 min-w-0">
                    <span className="text-sm font-medium text-atlas-text-primary">
                      {highlightMatches(result.title, result.matches)}
                    </span>
                    {result.snippet && (
                      <span className="text-xs text-atlas-text-muted line-clamp-2">
                        {highlightMatches(result.snippet, result.matches)}
                      </span>
                    )}
                    {result.tags.length > 0 && (
                      <span className="flex gap-1 mt-0.5">
                        {result.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-atlas-text-muted bg-atlas-surface border border-atlas-border rounded px-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}

        {/* Footer with keyboard hints */}
        {results.length > 0 && (
          <div className="flex items-center justify-between px-3 py-2 border-t border-atlas-border text-[10px] text-atlas-text-muted">
            <span className="flex items-center gap-3">
              <span>
                <kbd className="font-mono bg-atlas-surface border border-atlas-border rounded px-1 py-0.5 text-[10px]">
                  ↑↓
                </kbd>{" "}
                Navigate
              </span>
              <span>
                <kbd className="font-mono bg-atlas-surface border border-atlas-border rounded px-1 py-0.5 text-[10px]">
                  ↵
                </kbd>{" "}
                Open
              </span>
            </span>
            <span>
              <kbd className="font-mono bg-atlas-surface border border-atlas-border rounded px-1 py-0.5 text-[10px]">
                Esc
              </kbd>{" "}
              Close
            </span>
          </div>
        )}
      </CommandList>
    </CommandDialog>
  );
}
