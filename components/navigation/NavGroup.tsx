"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/components/navigation/NavItem";
import type { NavItem as NavItemType } from "@/types/navigation";

interface NavGroupProps {
  title: string;
  items: NavItemType[];
}

/**
 * A sidebar section. The group title is an expandable label; child pages
 * nest beneath their parent item with a left guide line (Vercel style).
 */
export function NavGroup({ title, items }: NavGroupProps) {
  const pathname = usePathname();

  // Determine if any child is active, so the group starts expanded
  const hasActiveChild = useMemo(
    () =>
      items.some(
        (item) =>
          pathname === item.href ||
          pathname.startsWith(item.href + "/") ||
          item.children?.some(
            (child) =>
              pathname === child.href ||
              pathname.startsWith(child.href + "/"),
          ),
      ),
    [items, pathname],
  );

  const [expanded, setExpanded] = useState(hasActiveChild);

  return (
    <li>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent",
          hasActiveChild
            ? "text-atlas-text-secondary"
            : "text-atlas-text-muted hover:text-atlas-text-secondary",
        )}
        aria-expanded={expanded}
      >
        <span className="flex-1 text-left">{title}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-atlas-text-muted transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>

      {expanded && (
        <ul className="mt-1.5 space-y-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <NavItem title={item.title} href={item.href} />
              {item.children && item.children.length > 0 && (
                <ul className="mt-0.5 space-y-0.5 border-l border-atlas-border ml-3 pl-3">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavItem title={child.title} href={child.href} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
