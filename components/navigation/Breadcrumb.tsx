"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

/**
 * Generate breadcrumb segments from the current pathname.
 * Converts /running/zone-2 → [{ label: "Running", href: "/running" }, { label: "Zone 2" }]
 */

function capitalizeWords(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getBreadcrumbs(
  pathname: string,
): { label: string; href?: string }[] {
  if (pathname === "/") return [];

  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = capitalizeWords(segment);
    return { label, href: index < segments.length - 1 ? href : undefined };
  });
}

export function Breadcrumb() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
      <Link
        href="/"
        className="inline-flex items-center text-atlas-text-muted hover:text-atlas-text-secondary transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
        aria-label="Home"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {crumbs.map((crumb) => (
        <span key={crumb.label} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-atlas-text-muted" />
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="text-xs text-atlas-text-muted hover:text-atlas-text-secondary transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-xs font-medium text-atlas-text-primary">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
