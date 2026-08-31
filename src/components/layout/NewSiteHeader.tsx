// src/components/layout/NewSiteHeader.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ExternalLink, Globe } from "lucide-react";
import { mainNavigation } from "@/constants/navigation";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { MarketDataPoint } from "@/lib/market-data";

interface NewSiteHeaderProps {
  currencies?: MarketDataPoint[];
}

export function NewSiteHeader({ currencies = [] }: NewSiteHeaderProps) {
  const pathname = usePathname();

  // Mobile drawer states (separated cleanly)
  const [menuOpen, setMenuOpen] = useState(false);
  const [ecosystemMobileOpen, setEcosystemMobileOpen] = useState(false);

  // Desktop ecosystem dropdown state
  const [ecosystemDesktopOpen, setEcosystemDesktopOpen] = useState(false);

  // Sticky header scroll behavior
  const [headerVisible, setHeaderVisible] = useState(true);
  const scrollRef = useRef({ lastScrollY: 0, drawerOpen: false });

  // Update ref for drawer state
  useEffect(() => {
    scrollRef.current.drawerOpen = menuOpen || ecosystemMobileOpen;
  }, [menuOpen, ecosystemMobileOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const ref = scrollRef.current;

          if (ref.drawerOpen || currentScrollY <= 80) {
            setHeaderVisible(true);
            ref.lastScrollY = currentScrollY;
            ticking = false;
            return;
          }

          const diff = currentScrollY - ref.lastScrollY;
          if (Math.abs(diff) >= 15) {
            setHeaderVisible(diff <= 0);
            ref.lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    const isAnyDrawerOpen = menuOpen || ecosystemMobileOpen;
    if (isAnyDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, ecosystemMobileOpen]);

  // Route change auto-close
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setEcosystemMobileOpen(false);
    setEcosystemDesktopOpen(false);
  }

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setEcosystemMobileOpen(false);
        setEcosystemDesktopOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Desktop dropdown outside click
  useEffect(() => {
    if (!ecosystemDesktopOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#desktop-ecosystem-button") && !target.closest("#desktop-ecosystem-panel")) {
        setEcosystemDesktopOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ecosystemDesktopOpen]);

  const bnrDate = currencies.find((c) => c.publishedAt)?.publishedAt;

  /** Render Desktop Navigation Links */
  const renderDesktopNavLinks = () => (
    <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 ml-6" aria-label="Main Navigation">
      {mainNavigation.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all min-h-[36px] flex items-center ${
              isActive
                ? "text-white font-bold bg-[var(--surface-elevated)] border border-[var(--border)] shadow-xs text-amber-400"
                : "text-neutral-400 hover:text-white hover:bg-[var(--surface-elevated)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  /** Render Mobile Drawer */
  const renderMobileDrawers = () => {
    if (typeof document === "undefined") return null;

    // Normal Navigation Menu Drawer
    const navDrawer = menuOpen ? (
      <>
        <div
          data-testid="mobile-overlay"
          className="fixed inset-0 bg-[var(--surface-elevated)]/70 backdrop-blur-xs transition-opacity"
          style={{ zIndex: 99998 }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <aside
          id="mobile-menu-drawer"
          data-testid="mobile-drawer"
          className="fixed inset-y-0 right-0 top-0 bottom-0 w-full sm:w-[380px] bg-[var(--surface-elevated)] border-l border-[var(--border)] text-neutral-100 overflow-y-auto flex flex-col p-6 shadow-2xl"
          style={{ zIndex: 99999, height: "100dvh" }}
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-bold text-neutral-200 text-xs font-mono uppercase tracking-widest">
                AiX Navigation
              </span>
            </div>
            <button
              type="button"
              aria-label="Close navigation"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[var(--surface-elevated)] min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="py-6 space-y-2 flex-1">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors min-h-[48px] ${
                    isActive
                      ? "bg-[var(--surface-elevated)] text-amber-400 border border-amber-500/30 font-bold"
                      : "text-neutral-300 hover:bg-[var(--surface-elevated)] hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setEcosystemMobileOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-200 font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[var(--surface-elevated)] hover:text-white min-h-[48px] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                Explore AiX Ecosystem
              </span>
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </aside>
      </>
    ) : null;

    // Ecosystem Drawer (Dedicated)
    const ecosystemDrawer = ecosystemMobileOpen ? (
      <>
        <div
          data-testid="ecosystem-overlay"
          className="fixed inset-0 bg-[var(--surface-elevated)]/70 backdrop-blur-xs transition-opacity"
          style={{ zIndex: 99998 }}
          onClick={() => setEcosystemMobileOpen(false)}
          aria-hidden="true"
        />
        <aside
          id="mobile-ecosystem-drawer"
          className="fixed inset-y-0 right-0 top-0 bottom-0 w-full sm:w-[380px] bg-[var(--surface-elevated)] border-l border-[var(--border)] text-neutral-100 overflow-y-auto flex flex-col p-6 shadow-2xl"
          style={{ zIndex: 99999, height: "100dvh" }}
          aria-label="AiX Ecosystem Navigation"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-bold text-neutral-200 text-xs font-mono uppercase tracking-widest">
                AiX Ecosystem
              </span>
            </div>
            <button
              type="button"
              aria-label="Close ecosystem menu"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[var(--surface-elevated)] min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors cursor-pointer"
              onClick={() => setEcosystemMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 space-y-3 flex-1">
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-serif">
              Rețeaua de servicii de consultanță, platforme de date imobiliare și publicații economice din ecosistemul AiX Media.
            </p>
            {AIX_ECOSYSTEM_NODES.map((node) => (
              <a
                key={node.id}
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setEcosystemMobileOpen(false)}
                className="block p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-amber-500/50 hover:bg-[var(--surface-elevated)] transition-all group min-h-[48px]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-100 group-hover:text-amber-400 transition-colors">
                    {node.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{node.description}</p>
              </a>
            ))}
          </div>
        </aside>
      </>
    ) : null;

    return createPortal(
      <>
        {navDrawer}
        {ecosystemDrawer}
      </>,
      document.body
    );
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[var(--surface-elevated)]/95 backdrop-blur-md border-b border-[var(--border)] text-[var(--foreground)] transition-transform duration-300 ease-in-out ${headerVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Official BNR Sub-Header Ticker */}
      <div className="bg-[var(--surface-elevated)] border-b border-[var(--border)] px-4 py-1.5 text-xs text-[var(--foreground-muted)] w-full overflow-x-auto">
        <div className="mx-auto flex items-center justify-between gap-4 max-w-[1600px] w-full">
          <div className="flex items-center gap-2 text-neutral-300 font-semibold uppercase text-[10px] tracking-wider shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-amber-500">Curs Oficial BNR</span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto font-mono text-[11px]">
            {currencies.length > 0 && currencies.some((c) => c.value !== null) ? (
              <>
                {currencies
                  .filter((c) => c.value !== null)
                  .map((c) => (
                    <div key={c.symbol} className="flex items-center gap-1.5 shrink-0">
                      <span className="text-neutral-400 font-medium">{c.symbol}</span>
                      <span className="text-white font-bold">{c.value?.toFixed(4)}</span>
                    </div>
                  ))}
                <span className="text-[10px] text-neutral-400 shrink-0">
                  Sursă: BNR {bnrDate ? `• ${bnrDate}` : ""}
                </span>
              </>
            ) : (
              <span className="text-neutral-400 font-mono text-xs">
                Sursă: BNR • Date de referință în curs de actualizare
              </span>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-neutral-400 font-mono text-[9px] uppercase tracking-wider shrink-0">
            <span>București</span>
            <span>•</span>
            <span>London</span>
            <span>•</span>
            <span>New York</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex w-full max-w-[1600px] min-w-0 items-center justify-between px-4 md:px-6 h-16">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => {
            setMenuOpen(false);
            setEcosystemMobileOpen(false);
          }}
          className="shrink-0 flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--surface-elevated)] border border-neutral-800 flex items-center justify-center font-black text-amber-400 text-lg shadow-sm group-hover:border-amber-500/40 transition-colors">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight text-white uppercase">
              AiX <span className="text-amber-500 font-medium">MEDIA</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 -mt-0.5 font-mono hidden sm:block">
              Financial &amp; Real Estate Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        {renderDesktopNavLinks()}

        {/* Desktop Ecosystem Button */}
        <div className="hidden lg:flex items-center ml-auto">
          <button
            id="desktop-ecosystem-button"
            type="button"
            aria-expanded={ecosystemDesktopOpen}
            aria-controls="desktop-ecosystem-panel"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-300 hover:text-white hover:border-amber-500/40 hover:bg-[var(--surface-elevated)] text-xs font-semibold font-mono uppercase tracking-wider transition-all cursor-pointer"
            onClick={() => setEcosystemDesktopOpen((prev) => !prev)}
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>AiX Ecosystem</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${ecosystemDesktopOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex lg:hidden items-center gap-2 ml-auto">
          <button
            type="button"
            aria-expanded={ecosystemMobileOpen}
            className="flex min-h-[48px] min-w-[48px] items-center justify-center px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-[var(--surface-elevated)] text-neutral-200 border border-[var(--border)] active:bg-[var(--surface-elevated)] transition-colors"
            onClick={() => {
              setMenuOpen(false);
              setEcosystemMobileOpen((prev) => !prev);
            }}
          >
            ECOSYSTEM
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-drawer"
            className="flex min-h-[48px] min-w-[48px] items-center justify-center p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-[var(--surface-elevated)] active:bg-[var(--surface-elevated)] transition-colors"
            onClick={() => {
              setEcosystemMobileOpen(false);
              setMenuOpen((prev) => !prev);
            }}
          >
            {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Ecosystem Dropdown Panel */}
      {ecosystemDesktopOpen && (
        <div
          id="desktop-ecosystem-panel"
          className="absolute top-full right-4 xl:right-12 mt-1 w-80 bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl rounded-xl p-4 z-[9999] text-neutral-100"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold mb-2">
            AiX Ecosystem Platforms
          </div>
          <div className="space-y-1.5">
            {AIX_ECOSYSTEM_NODES.map((node) => (
              <a
                key={node.id}
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setEcosystemDesktopOpen(false)}
                className="block p-2.5 rounded-lg hover:bg-[var(--surface-elevated)] border border-transparent hover:border-[var(--border)] transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-neutral-200 group-hover:text-amber-400">
                  <span>{node.name}</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-amber-400" />
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{node.description}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Portal-rendered Mobile Drawers */}
      {renderMobileDrawers()}
    </header>
  );
}

