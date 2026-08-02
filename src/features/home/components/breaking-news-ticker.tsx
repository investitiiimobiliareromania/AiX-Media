import Link from "next/link";

import { Container } from "@/components/layout/container";
import { primaryNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type BreakingNewsTickerProps = {
  className?: string;
};

export function BreakingNewsTicker({ className }: BreakingNewsTickerProps) {
  return (
    <div
      className={cn("border-b border-border bg-surface", className)}
      aria-label="Section navigation ticker"
    >
      <Container className="flex items-stretch">
        <div className="flex shrink-0 items-center border-r border-border px-4 py-3">
          <span className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
            Breaking
          </span>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden py-3">
          <div className="ticker-track flex w-max items-center gap-8 px-4">
            {[...primaryNavigation, ...primaryNavigation].map((item, index) => (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
