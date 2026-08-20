"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { mainNavigation, NavItem } from "@/constants/navigation";

type MobileMenuProps = {
  className?: string;
};

export function MobileMenu({ className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-neutral-200 text-neutral-700 hover:text-neutral-950 shadow-xs"
        aria-label={open ? "Închide meniul" : "Deschide meniul"}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div id="mobile-menu-drawer" className="fixed inset-0 top-16 z-50 bg-[var(--surface-elevated)]/95 backdrop-blur-md p-6 overflow-y-auto space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-amber-700 font-bold tracking-wider">
              Secțiuni Principale
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mainNavigation.map((item: NavItem) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm font-bold text-neutral-950 hover:border-neutral-300"
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
