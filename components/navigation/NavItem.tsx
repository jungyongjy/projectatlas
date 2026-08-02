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
        "relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent",
        isActive
          ? "bg-atlas-accent/10 text-atlas-accent font-medium"
          : "text-atlas-text-secondary hover:bg-atlas-hover/70 hover:text-atlas-text-primary",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active indicator bar */}
      <span
        className={cn(
          "absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-atlas-accent transition-opacity duration-150",
          isActive ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
      <span className="truncate">{title}</span>
    </Component>
  );
}
