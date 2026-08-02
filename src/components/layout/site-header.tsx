import Link from "next/link";

import { Logo } from "@/components/common/logo";
import { MarketStrip } from "@/components/layout/header/market-strip";
import { MegaMenu } from "@/components/layout/header/mega-menu";
import { MobileMenu } from "@/components/layout/header/mobile-menu";
import { SearchUi } from "@/components/layout/header/search-ui";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
import { primaryNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type StickyCategoryNavProps = {
  className?: string;
};

export function StickyCategoryNav({ className }: StickyCategoryNavProps) {
  return (
    <div
      className={cn(
        "hidden border-b border-border bg-background lg:block",
        className,
      )}
    >
      <Container>
        <nav aria-label="Categories" className="flex items-center gap-1 overflow-x-auto py-2">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
}

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header className={cn("sticky top-0 z-50 bg-background", className)}>
      <MarketStrip />
      <div className="border-b border-border">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
            <Logo />

            <MegaMenu items={primaryNavigation} />

            <div className="flex items-center gap-1">
              <SearchUi className="hidden sm:flex" />
              <MobileMenu />
            </div>
          </div>
        </Container>
      </div>

      <StickyCategoryNav />
      <Separator className="bg-border" />
    </header>
  );
}
