"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { TableOfContents } from "@/components/documentation/TableOfContents";
import { CommandPalette } from "@/components/search/CommandPalette";
import type { SearchIndex } from "@/types/search";

interface DocsLayoutProps {
  searchIndex: SearchIndex[];
  children: React.ReactNode;
}

export function DocsLayout({ searchIndex, children }: DocsLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const handleSearchClose = useCallback(() => {
    setSearchOpen(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar onSearchOpen={handleSearchOpen} />
      </div>

      {/* ── Main content area ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Content + TOC */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <main id="main-content" className="flex-1 min-w-0 overflow-y-auto">
            <article className="px-4 lg:px-8 py-8 max-w-3xl mx-auto">
              {children}
            </article>

            <Footer />
          </main>

          {/* Table of contents (desktop only) */}
          <div className="hidden xl:block pr-6 pt-8">
            <TableOfContents />
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <CommandPalette
        open={searchOpen}
        onOpenChange={handleSearchClose}
        searchIndex={searchIndex}
      />
    </div>
  );
}
