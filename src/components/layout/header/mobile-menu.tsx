"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/common/logo";
import { Text } from "@/components/common/typography";
import { SearchUi } from "@/components/layout/header/search-ui";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/constants/categories";
import { primaryNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  className?: string;
};

export function MobileMenu({ className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Open navigation menu"
            className={cn(
              "text-muted-foreground hover:text-foreground lg:hidden",
              className,
            )}
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-border bg-background sm:max-w-md">
        <SheetHeader className="border-b border-border pb-6">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Logo />
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col gap-8 py-8">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Sections</p>
            <ul className="space-y-1">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-3 text-lg font-medium text-foreground transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Verticals</p>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="group block space-y-1"
                  >
                    <span className="text-base font-medium text-foreground transition-colors group-hover:text-gold">
                      {category.label}
                    </span>
                    <Text size="sm" tone="muted">
                      {category.description}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mt-auto border-t border-border pt-6">
          <SearchUi className="w-full justify-end" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
