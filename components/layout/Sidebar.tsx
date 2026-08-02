"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationConfig } from "@/lib/navigation";
import { APP_VERSION } from "@/lib/constants";
import { NavGroup } from "@/components/navigation/NavGroup";
import { SearchButton } from "@/components/navigation/SearchButton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  className?: string;
  onSearchOpen?: () => void;
  onNavigate?: () => void;
}

export function Sidebar({ className, onSearchOpen, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col bg-atlas-bg-secondary border-r border-atlas-border",
        "h-full w-[280px] shrink-0",
        className,
      )}
    >
      {/* ── Logo / Home ── */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-atlas-border">
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent rounded"
          onClick={onNavigate}
        >
          <BookOpen className="h-5 w-5 text-atlas-accent" />
          <span className="text-sm font-semibold text-atlas-text-primary tracking-tight">
            Atlas
          </span>
        </Link>

        <span className="ml-auto font-mono text-[10px] text-atlas-text-muted bg-atlas-surface border border-atlas-border rounded px-1.5 py-0.5">
          v{APP_VERSION}
        </span>
      </div>

      {/* ── Search ── */}
      <div className="px-3 py-3">
        <SearchButton onClick={onSearchOpen} />
      </div>

      {/* ── Navigation ── */}
      <ScrollArea className="flex-1 px-3 pb-6">
        <nav aria-label="Handbook navigation" className="py-2">
          <ul className="space-y-8">
            {navigationConfig.groups.map((group) => (
              <NavGroup
                key={group.title}
                title={group.title}
                items={group.items}
              />
            ))}
          </ul>
        </nav>
      </ScrollArea>

      {/* ── Footer ── */}
      <div className="px-5 py-3 border-t border-atlas-border">
        <Link
          href="/version-history"
          className={cn(
            "block text-xs text-atlas-text-muted hover:text-atlas-text-secondary transition-colors rounded px-2 py-1 -mx-2",
            pathname === "/version-history" && "text-atlas-accent",
          )}
          onClick={onNavigate}
        >
          Version History
        </Link>
      </div>
    </aside>
  );
}
