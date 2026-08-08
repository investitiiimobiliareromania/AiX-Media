"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { categoriesList, CategoryInfo } from "@/constants/categories";
import { mainNavigation, NavItem } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  className?: string;
};

export function MobileMenu({ className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
        aria-label={open ? "Închide meniul" : "Deschide meniul"}
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div id="mobile-menu-drawer" className="fixed inset-0 top-16 z-50 bg-black/95 p-6 overflow-y-auto space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
              Main Verticals
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mainNavigation.map((item: NavItem) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="p-3 rounded bg-neutral-900 border border-neutral-800 text-sm font-bold text-white hover:text-amber-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
