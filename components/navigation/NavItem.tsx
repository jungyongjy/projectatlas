"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  title: string;
  href: string;
  icon?: string;
  external?: boolean;
  indent?: boolean;
}

export function NavItem({
  title,
  href,
  external = false,
  indent = false,
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
    <li>
      <Component
        {...linkProps}
        className={cn(
          "block rounded-md px-3 py-1.5 text-sm transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent",
          indent && "pl-6",
          isActive
            ? "bg-atlas-accent/10 text-atlas-accent font-medium"
            : "text-atlas-text-secondary hover:bg-atlas-hover hover:text-atlas-text-primary",
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {title}
      </Component>
    </li>
  );
}
