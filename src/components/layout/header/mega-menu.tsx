"use client";

import Link from "next/link";
import { useState } from "react";

import { Text } from "@/components/common/typography";
import { categoryBySlug } from "@/constants/categories";
import type { NavItem } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  items: NavItem[];
  className?: string;
};

export function MegaMenu({ items, className }: MegaMenuProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <nav
      aria-label="Primary"
      className={cn("relative hidden lg:block", className)}
      onMouseLeave={() => setActiveItem(null)}
    >
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const category = item.category ? categoryBySlug[item.category] : null;
          const isActive = activeItem === item.href;

          return (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => setActiveItem(item.href)}
              onFocus={() => setActiveItem(item.href)}
            >
              <Link
                href={item.href}
                className={cn(
                  "block px-3 py-2 text-sm font-medium tracking-wide transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>

              {category && isActive ? (
                <div className="absolute top-full left-1/2 z-50 w-[22rem] -translate-x-1/2 pt-3">
                  <div className="border border-border bg-background p-6 shadow-none">
                    <p className="text-xs tracking-[0.2em] text-gold uppercase">
                      {category.label}
                    </p>
                    <Text size="sm" tone="muted" className="mt-3">
                      {category.description}
                    </Text>
                    <Link
                      href={item.href}
                      className="mt-5 inline-flex text-sm font-medium text-foreground transition-colors hover:text-gold"
                    >
                      Explore {category.label}
                    </Link>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
