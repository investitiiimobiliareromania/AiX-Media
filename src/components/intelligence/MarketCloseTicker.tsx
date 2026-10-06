import React from "react";
import { dailyMarketCloseItems } from "@/lib/data-intelligence/data-hub-service";
import Link from "next/link";

export function MarketCloseTicker() {
  return (
    <div className="p-4 md:p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            AIX MARKET CLOSE • SINTEZĂ COTAȚII OFICIALE
          </span>
        </div>
        <Link
          href="/markets"
          className="text-[11px] font-mono text-neutral-400 hover:text-amber-400 transition-colors"
        >
          Toate Piețele →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {dailyMarketCloseItems.map((item) => {
          const isUp = item.direction === "up";
          const isDown = item.direction === "down";

          return (
            <div
              key={item.symbol}
              className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold text-white">{item.symbol}</span>
                <span className="text-neutral-500 text-[9px]">{item.source}</span>
              </div>

              <div className="text-sm md:text-base font-serif font-bold text-amber-400">
                {item.value}
              </div>

              <div
                className={`flex items-center justify-between text-[10px] font-mono font-bold ${
                  isUp ? "text-emerald-400" : isDown ? "text-rose-400" : "text-neutral-400"
                }`}
              >
                <span>{item.change}</span>
                <span>{item.changePct}</span>
              </div>

              <div className="text-[9px] font-mono text-neutral-500 pt-1 border-t border-neutral-900 flex justify-between">
                <span>{item.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
