"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extract headings from the DOM and render a sticky table of contents
 * with scroll-spy highlighting. Desktop only.
 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  // Track DOM read outside render cycle
  const pendingHeadings = useRef<TOCHeading[] | null>(null);

  // Read headings from DOM on mount
  const readHeadings = useCallback(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(
        "article h2[id], article h3[id]",
      ),
    );

    return elements.map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: parseInt(el.tagName[1], 10),
    }));
  }, []);

  // Schedule heading read on mount via requestAnimationFrame
  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (cancelled) return;
      const items = readHeadings();
      pendingHeadings.current = items;
      setHeadings(items);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [readHeadings]);

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="hidden xl:block sticky top-20 w-[220px] shrink-0 self-start max-h-[calc(100vh-6rem)] overflow-y-auto"
    >
      <h2 className="text-xs font-semibold text-atlas-text-muted uppercase tracking-wider mb-3 px-1">
        On this page
      </h2>

      <ul className="space-y-0.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block text-xs py-1 px-2 rounded transition-colors duration-200 border-l-2",
                "hover:text-atlas-text-primary hover:bg-atlas-hover/40",
                heading.level === 3 && "pl-4",
                activeId === heading.id
                  ? "text-atlas-accent border-atlas-accent bg-atlas-accent/5 font-medium"
                  : "text-atlas-text-muted border-transparent",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
