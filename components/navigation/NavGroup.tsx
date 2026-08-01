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

export function NavGroup({ title, items }: NavGroupProps) {
  const pathname = usePathname();

  // Determine if any child is active — if so, start expanded
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
          "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent",
          hasActiveChild
            ? "text-atlas-text-primary"
            : "text-atlas-text-secondary hover:text-atlas-text-primary",
        )}
        aria-expanded={expanded}
      >
        <span className="flex-1 text-left">{title}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-atlas-text-muted transition-transform duration-150",
            expanded && "rotate-180",
          )}
        />
      </button>

      {expanded && (
        <ul className="mt-1 space-y-0.5 border-l border-atlas-border ml-3 pl-2">
          {items.map((item) => (
            <NavItem key={item.href} title={item.title} href={item.href} />
          ))}
          {items.some((i) => i.children) && (
            <ul className="mt-0.5 space-y-0.5">
              {items
                .flatMap((item) => item.children ?? [])
                .map((child) => (
                  <NavItem
                    key={child.href}
                    title={child.title}
                    href={child.href}
                    indent
                  />
                ))}
            </ul>
          )}
        </ul>
      )}
    </li>
  );
}
