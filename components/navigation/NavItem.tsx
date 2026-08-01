"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  title: string;
  href: string;
  external?: boolean;
}

/**
 * A single navigation link. Renders the anchor only; the parent is
 * responsible for the surrounding <li>. Active pages get a filled
 * indicator dot and a highlighted background.
 */
export function NavItem({
  title,
  href,
  external = false,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  const Component = external ? "a" : Link;

  const linkProps = external
    ? {
        href,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : { href };

  return (
    <Component
      {...linkProps}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent",
        isActive
          ? "bg-atlas-accent/10 text-atlas-accent font-medium"
          : "text-atlas-text-secondary hover:bg-atlas-hover hover:text-atlas-text-primary",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-atlas-accent"
          aria-hidden="true"
        />
      )}
      <span className="truncate">{title}</span>
    </Component>
  );
}
