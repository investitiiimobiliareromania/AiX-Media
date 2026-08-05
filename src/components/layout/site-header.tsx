"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/constants/navigation";
import { getMarketItems } from "@/lib/media/service";
import { Radio, Tv, Search, Menu, X, TrendingUp } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const markets = getMarketItems();

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-neutral-800/80 text-white">
      {/* Top Ticker / Market Bar */}
      <div className="bg-[#0a0a0a] border-b border-neutral-900 px-4 py-1.5 text-xs text-neutral-400 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 whitespace-nowrap">
          <div className="flex items-center gap-2 text-amber-400 font-semibold tracking-wider uppercase text-[10px]">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            AiX Markets Terminal
          </div>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {markets.slice(0, 7).map((item) => (
              <div key={item.symbol} className="flex items-center gap-2">
                <span className="font-mono text-neutral-300 font-medium">{item.symbol}:</span>
                <span className="font-mono text-white">{item.value}</span>
                <span
                  className={`font-mono text-[11px] ${
                    item.isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {item.changeDaily}
                </span>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4 text-neutral-500 font-mono text-[11px]">
            <span>BUCHAREST</span>
            <span>•</span>
            <span>LONDON</span>
            <span>•</span>
            <span>NEW YORK</span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-amber-500/10">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors uppercase">
                AiX <span className="text-amber-400 font-light">MEDIA</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 -mt-1 font-mono">
                Business & Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                    isActive
                      ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                      : "text-neutral-300 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  {item.label}
                  {item.isBadge && (
                    <span
                      className={`text-[8px] px-1 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                        item.isBadge === "LIVE"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse"
                          : "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                      }`}
                    >
                      {item.isBadge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/search"
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/40 transition-colors"
              aria-label="Search FT Terminal"
            >
              <Search className="w-4 h-4 text-amber-400" />
            </Link>

            <Link
              href="/radio"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-neutral-900 to-neutral-800 border border-amber-500/30 text-amber-300 hover:border-amber-400 text-xs font-semibold transition-all shadow-sm hover:shadow-amber-500/10"
            >
              <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>Radio Live</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0a0a] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 hover:text-amber-400 hover:border-amber-500/30 flex items-center justify-between font-mono"
              >
                <span>{item.label}</span>
                {item.isBadge && (
                  <span className="text-[9px] px-1 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {item.isBadge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-900 flex flex-col gap-2">
            <Link
              href="/radio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded bg-amber-500 text-black font-semibold text-center text-xs font-mono flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4" />
              Listen to AiX Radio Live
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Navbar() {
  return <SiteHeader />;
}
