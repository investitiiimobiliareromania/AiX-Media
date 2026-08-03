import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { Overline } from "@/components/common/typography";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import type { MarketSignal } from "@/config/category-configs";

interface PremiumHeroProps {
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  marketSignals?: MarketSignal[];
  className?: string;
}

export function PremiumHero({
  eyebrow,
  headline,
  description,
  ctaLabel = "Explore Intelligence",
  ctaHref = "#intelligence",
  secondaryCtaLabel,
  secondaryCtaHref,
  marketSignals = [],
  className,
}: PremiumHeroProps) {
  return (
    <section
      className={cn("relative overflow-hidden bg-background", className)}
      aria-labelledby="premium-hero-headline"
    >
      {/* ── Atmospheric background layers ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Radial gold glow — top left */}
        <div className="absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.11_85/0.10)_0%,transparent_65%)]" />
        {/* Secondary glow — bottom right */}
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.11_85/0.05)_0%,transparent_65%)]" />
        {/* Fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 2.5%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 2.5%) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Bottom fade into content */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="flex min-h-[85vh] flex-col justify-center py-28 lg:py-36">

          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-gold flex-shrink-0" aria-hidden />
            <Overline className="text-gold tracking-[0.22em]">{eyebrow}</Overline>
          </div>

          {/* Main headline */}
          <h1
            id="premium-hero-headline"
            className="font-display text-balance text-foreground"
            style={{
              fontSize: "var(--text-display-3xl)",
              lineHeight: "1.02",
              letterSpacing: "-0.025em",
              maxWidth: "16ch",
            }}
          >
            {headline}
          </h1>

          {/* Description */}
          <p
            className="mt-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground"
            style={{ fontSize: "clamp(1rem, 1vw + 0.75rem, 1.25rem)" }}
          >
            {description}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2.5 bg-foreground px-7 py-3.5 text-sm font-semibold tracking-wide text-background transition-colors duration-200 hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {ctaLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>

            {secondaryCtaLabel && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-foreground/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </div>

          {/* Market signals strip */}
          {marketSignals.length > 0 && (
            <div className="mt-20 border-t border-border pt-10">
              <p className="mb-6 text-[0.65rem] font-semibold tracking-[0.22em] text-muted-foreground/60 uppercase">
                Live Market Signals
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-14 sm:gap-y-0">
                {marketSignals.map((signal) => (
                  <div key={signal.label} className="flex flex-col gap-1">
                    <span className="font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
                      {signal.label}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-xl font-medium tabular-nums text-foreground">
                        {signal.value}
                      </span>
                      {signal.suffix && (
                        <span className="font-mono text-xs text-muted-foreground">
                          {signal.suffix}
                        </span>
                      )}
                    </div>
                    {signal.description && (
                      <span
                        className={cn(
                          "font-mono text-[0.6rem] tracking-wide",
                          signal.trend === "up"
                            ? "text-emerald-400"
                            : signal.trend === "down"
                              ? "text-red-400"
                              : "text-muted-foreground/60",
                        )}
                      >
                        {signal.trend === "up"
                          ? "↑ "
                          : signal.trend === "down"
                            ? "↓ "
                            : "→ "}
                        {signal.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scroll indicator */}
          <div className="mt-16 flex items-center gap-3 text-muted-foreground/50" aria-hidden>
            <ChevronDown className="h-4 w-4 animate-bounce" />
            <span className="text-[0.65rem] font-medium tracking-[0.22em] uppercase">Scroll</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
