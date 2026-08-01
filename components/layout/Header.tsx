"use client";

import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

interface HeaderProps {
  title?: string;
  description?: string;
  onSearchOpen?: () => void;
}

export function Header({ title, description, onSearchOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-atlas-border">
      <div className="flex items-center gap-4 px-4 lg:px-8 h-14">
        {/* Mobile menu trigger */}
        <MobileSidebar onSearchOpen={onSearchOpen} />

        {/* Breadcrumb + title */}
        <div className="flex flex-col justify-center min-w-0">
          <Breadcrumb />
          {title && (
            <h1 className="text-sm font-semibold text-atlas-text-primary truncate">
              {title}
            </h1>
          )}
        </div>
      </div>

      {description && (
        <div className="px-4 lg:px-8 pb-4">
          <p className="text-sm text-atlas-text-muted">{description}</p>
        </div>
      )}
    </header>
  );
}
