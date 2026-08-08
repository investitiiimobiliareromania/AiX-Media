// src/components/layout/site-header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/constants/navigation";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { Radio, Search, Menu, X, ChevronDown, Layers, ExternalLink } from "lucide-react";
import { EcosystemMenu } from "@/components/ecosystem/EcosystemMenu";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileEcosystemOpen, setMobileEcosystemOpen] = useState(false);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileEcosystemOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handler);
    }
    return () => document.removeEventListener("keydown", handler);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-neutral-800/80 text-white w-full">
      {/* Market Ticker */}
      <div className="bg-[#0a0a0a] border-b border-neutral-900 px-3 sm:px-4 py-1.5 text-xs text-neutral-400 no-scrollbar w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase text-[10px] shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>AiX Terminal</span>
          </div>
          <div className="text-[11px] font-mono text-neutral-500">
            Data source offline • Market data currently unavailable.
          </div>
          <div className="hidden lg:flex items-center gap-3 text-neutral-500 font-mono text-[10px] shrink-0">
            <span>BUCHAREST</span>
            <span>•</span>
            <span>LONDON</span>
            <span>•</span>
            <span>NEW YORK</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-screen-xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-amber-500/10">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors uppercase truncate">
              AiX <span className="text-amber-400 font-light">MEDIA</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 -mt-0.5 font-mono hidden sm:block truncate">
              Business &amp; Intelligence Network
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 min-h-[36px] ${
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

        {/* Actions */}
        <div className="flex items-center gap-2.5 flex-wrap max-w-full justify-end w-full">
          {/* Desktop Ecosystem Dropdown */}
          <div className="hidden sm:block">
            <EcosystemMenu />
          </div>
          {/* Search */}
          <Link
            href="/search"
            className="w-11 h-11 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/40 flex items-center justify-center"
            aria-label="Search AiX Media Terminal"
          >
            <Search className="w-4 h-4 text-amber-400" />
          </Link>
          {/* Radio */}
          <Link
            href="/radio"
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-300 hover:border-amber-400 text-xs font-semibold"
          >
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Radio Live</span>
          </Link>
          {/* Mobile Ecosystem Toggle */}
          <button
            type="button"
            onClick={() => setMobileEcosystemOpen(!mobileEcosystemOpen)}
            className="xl:hidden w-11 h-11 rounded-lg bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800 flex items-center justify-center"
            aria-expanded={mobileEcosystemOpen}
            aria-controls="mobile-ecosystem-accordion"
            aria-label={mobileEcosystemOpen ? "Închide ecosistemul" : "Deschide ecosistemul"}
          >
            {mobileEcosystemOpen ? <X className="w-5 h-5 text-amber-400" /> : <Layers className="w-5 h-5" />}
          </button>
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-11 h-11 rounded-lg bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800 flex items-center justify-center"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
            aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <aside
          id="mobile-menu-drawer"
          className="fixed inset-y-0 right-0 top-0 z-60 bg-[#070707] border-l border-neutral-800 overflow-y-auto px-4 py-6 space-y-6 w-[min(100vw,420px)] max-w-full"
        >
          {/* Ecosystem Accordion Toggle */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-3">
            <button
              onClick={() => setMobileEcosystemOpen(!mobileEcosystemOpen)}
              className="w-full flex items-center justify-between text-left"
              aria-expanded={mobileEcosystemOpen}
              aria-controls="mobile-ecosystem-accordion"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">AiX Ecosystem</span>
                <span className="text-[9px] font-mono text-neutral-400 border border-neutral-800 rounded px-1.5 py-0.5">9 Platforme</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${mobileEcosystemOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileEcosystemOpen && (
              <div id="mobile-ecosystem-accordion" className="pt-3 space-y-2.5 border-t border-neutral-900">
                <p className="text-[11px] text-neutral-400 font-mono">Platforme dedicate din rețeaua Cristian Văduva Ecosystem:</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {AIX_ECOSYSTEM_NODES.map((node) => (
                    <div
                      key={node.id}
                      className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white truncate">{node.name}</span>
                          <span className="text-[9px] font-mono text-amber-400/80">{node.categoryLabel}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5 break-words">{node.description}</p>
                      </div>
                      <a
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label={`Accesează ${node.name}`}
                        className="shrink-0 inline-flex items-center justify-center gap-1 px-3 py-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-black text-xs font-mono font-bold"
                      >
                        <span>ACCESEAZĂ</span>
                        <span>→</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary Navigation */}
          <div className="space-y-2">
            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 px-1">Secțiuni Principale</span>
            <div className="grid grid-cols-2 gap-2">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-mono font-semibold flex items-center justify-between min-h-[44px] ${
                      isActive
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                        : "bg-neutral-900/90 border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.isBadge && (
                      <span className="text-[9px] px-1 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">{item.isBadge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-4 border-t border-neutral-900 space-y-3">
            <Link
              href="/radio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-lg bg-amber-500 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Radio className="w-4 h-4" />
              <span>Ascultă AiX Radio Live</span>
            </Link>
            <a
              href="https://cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 text-xs font-mono flex items-center justify-between min-h-[44px]"
            >
              <span>Cristian Văduva Advisory Network</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        </aside>
      )}
    </header>
  );
}

export function Navbar() {
  return <SiteHeader />;
}
