"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/Sidebar";

interface MobileSidebarProps {
  onSearchOpen?: () => void;
}

export function MobileSidebar({ onSearchOpen }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-atlas-text-secondary hover:bg-atlas-hover hover:text-atlas-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-accent"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 bg-atlas-bg-secondary">
        <Sidebar
          onSearchOpen={onSearchOpen}
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
