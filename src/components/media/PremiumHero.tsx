import React from "react";
import Link from "next/link";
import { MarketSignal } from "@/config/category-configs";
import { ArrowRight, Compass } from "lucide-react";

interface PremiumHeroProps {
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  marketSignals?: MarketSignal[];
}

export function PremiumHero({
  eyebrow,
  headline,
  description,
  ctaLabel = "Explorează Rapoartele",
  ctaHref = "/news",
  secondaryCtaLabel = "Indicatori de Piață",
  secondaryCtaHref = "/markets",
  marketSignals = [],
}: PremiumHeroProps) {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden rounded-2xl bg-[var(--surface-editorial)] border border-[var(--border)] mb-8 shadow-xl text-[var(--foreground-muted)]">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          {eyebrow}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight">
          {headline}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-serif">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href={ctaHref}
            className="px-6 py-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-editorial)] text-[var(--foreground)] font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer min-h-[44px]"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryCtaHref}
            className="px-6 py-3 rounded-xl bg-[var(--surface-editorial)] hover:bg-[var(--surface-editorial)] border border-[var(--border)] text-[var(--foreground-muted)] font-semibold text-xs font-mono uppercase tracking-wider transition-all min-h-[44px] flex items-center justify-center"
          >
            {secondaryCtaLabel}
          </Link>
        </div>

        {marketSignals.length > 0 && (
          <div className="pt-6 border-t border-[var(--border)] max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3 text-left font-mono">
            {marketSignals.map((signal, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[var(--surface-editorial)] border border-[var(--border)] shadow-xs">
                <div className="text-[11px] text-neutral-400">{signal.label}</div>
                <div className="text-base font-bold text-white mt-0.5">{signal.value}</div>
                {signal.change && (
                  <div
                    className={`text-[10px] font-semibold ${
                      signal.isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {signal.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

