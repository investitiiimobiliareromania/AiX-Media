import React from "react";
import Link from "next/link";
import { MarketDataPoint } from "@/lib/market-data";

export interface TopInfoTickerProps {
  latestArticleTitle?: string;
  latestPodcastTitle?: string;
  equities?: MarketDataPoint[];
}

export function TopInfoTicker({
  latestArticleTitle,
  latestPodcastTitle,
  equities = [],
}: TopInfoTickerProps) {
  // Extract BVB indices & tickers from market data if available
  const betIndex = equities.find((e) => e.symbol === "BET");
  const betPrice = betIndex && betIndex.value !== null ? betIndex.value : 18450;
  const betChange = 0.65;

  // Build structured dynamic ticker sections
  const sections = [
    {
      category: "MARKETS",
      href: "/markets",
      content: [
        "BVB",
        `BET ${betPrice.toLocaleString("ro-RO")} (${betChange >= 0 ? "+" : ""}${betChange}%)`,
        "TLV",
        "H2O",
        "SNP",
        "ONE",
        "SNG",
      ],
    },
    {
      category: "NEWS",
      href: "/news",
      content: [
        "Sinteză Editorială",
        latestArticleTitle || "ANCPI: Peste 51.000 de imobile tranzacționate la nivel național",
      ],
    },
    {
      category: "REAL ESTATE",
      href: "/real-estate",
      content: ["Market Intelligence", "Statistici Cadastrale ANCPI & Indici Rezidențiali"],
    },
    {
      category: "INVESTMENTS",
      href: "/investments",
      content: ["Perspectives", "Evoluția Lichidității pe Piața Principală BVB"],
    },
    {
      category: "VIDEO",
      href: "/tv",
      content: ["Cristian Văduva — Momente & Perspective"],
    },
    {
      category: "PODCASTS",
      href: "/podcasts",
      content: [
        "Latest Episode",
        latestPodcastTitle || "Analize Executive & Strategie de Capital",
      ],
    },
    {
      category: "COMPANIES",
      href: "/companies",
      content: ["9 Corporații BVB", "Rapoarte Auditate 2025/2026"],
    },
  ];

  const renderTrackContent = (trackKey: string) => (
    <div key={trackKey} className="flex items-center shrink-0">
      {sections.map((sec, idx) => (
        <React.Fragment key={`${trackKey}-${sec.category}-${idx}`}>
          <Link
            href={sec.href}
            className="inline-flex items-center gap-2 group/item py-1 px-1 transition-opacity hover:opacity-80 cursor-pointer"
          >
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-400 group-hover/item:text-amber-300">
              {sec.category}
            </span>
            <span className="text-[10px] text-neutral-600 font-mono font-normal">•</span>
            <span className="text-[11px] sm:text-xs font-mono text-neutral-300 group-hover/item:text-white transition-colors truncate max-w-[320px] sm:max-w-none">
              {sec.content.join(" · ")}
            </span>
          </Link>
          <span className="text-amber-500/40 text-[10px] mx-4 font-normal select-none pointer-events-none">
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <aside
      aria-label="Rolling Information Ticker"
      className="w-full bg-[#0A0B0E] border-b border-neutral-800/80 text-neutral-200 h-8 sm:h-9 overflow-hidden select-none relative z-50 flex items-center"
    >
      <div className="w-full overflow-hidden flex items-center">
        <div className="animate-top-ticker flex items-center whitespace-nowrap">
          {renderTrackContent("track-1")}
          {renderTrackContent("track-2")}
        </div>
      </div>
    </aside>
  );
}
