import React from "react";
import Link from "next/link";
import { MarketSignal } from "@/config/category-configs";
import { ArrowRight, ShieldCheck, TrendingUp, Compass } from "lucide-react";

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
  ctaLabel = "Explore Analysis",
  ctaHref = "/news",
  secondaryCtaLabel = "View Market Terminal",
  secondaryCtaHref = "/markets",
  marketSignals = [],
}: PremiumHeroProps) {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e0e0e] to-[#050505] border border-neutral-800/80 mb-12 shadow-2xl">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          {eyebrow}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
          {headline}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href={ctaHref}
            className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryCtaHref}
            className="px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-sm transition-all"
          >
            {secondaryCtaLabel}
          </Link>
        </div>

        {marketSignals.length > 0 && (
          <div className="pt-8 border-t border-neutral-800/80 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 text-left font-mono">
            {marketSignals.map((signal, i) => (
              <div key={i} className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
                <div className="text-[11px] text-neutral-400">{signal.label}</div>
                <div className="text-base font-bold text-white mt-0.5">{signal.value}</div>
                <div
                  className={`text-[10px] ${
                    signal.isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {signal.change}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
