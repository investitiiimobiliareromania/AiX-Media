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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const ref = scrollRef.current;

      // If drawer is open, keep header visible
      if (ref.drawerOpen) {
        setHeaderVisible(true);
        ref.lastScrollY = currentScrollY;
        return;
      }

      // Always visible near top
      if (currentScrollY <= 80) {
        setHeaderVisible(true);
        ref.lastScrollY = currentScrollY;
        return;
      }

      const diff = currentScrollY - ref.lastScrollY;
      if (Math.abs(diff) < 10) return;

      if (diff > 0) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }

      ref.lastScrollY = currentScrollY;
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
    <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ml-6" aria-label="Main Navigation">
      {mainNavigation.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              isActive
                ? "text-neutral-950 font-bold bg-neutral-100 border border-neutral-300"
                : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50"
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
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          style={{ zIndex: 99998 }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <aside
          id="mobile-menu-drawer"
          data-testid="mobile-drawer"
          className="fixed inset-y-0 right-0 top-0 bottom-0 w-full sm:w-[380px] bg-white border-l border-neutral-200 overflow-y-auto flex flex-col p-6 shadow-2xl"
          style={{ zIndex: 99999, height: "100dvh" }}
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <span className="font-bold text-neutral-900 text-sm font-mono uppercase tracking-wider">
                AiX Navigation
              </span>
            </div>
            <button
              type="button"
              aria-label="Close navigation"
              className="p-2 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="py-6 space-y-1.5 flex-1">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold transition-colors min-h-[44px] ${
                    isActive
                      ? "bg-amber-50 text-amber-900 border border-amber-200 font-bold"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setEcosystemMobileOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-900 font-semibold text-sm hover:bg-neutral-200 min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-600" />
                Explore AiX Ecosystem
              </span>
              <ExternalLink className="w-4 h-4 text-neutral-500" />
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
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          style={{ zIndex: 99998 }}
          onClick={() => setEcosystemMobileOpen(false)}
          aria-hidden="true"
        />
        <aside
          id="mobile-ecosystem-drawer"
          className="fixed inset-y-0 right-0 top-0 bottom-0 w-full sm:w-[380px] bg-white border-l border-neutral-200 overflow-y-auto flex flex-col p-6 shadow-2xl"
          style={{ zIndex: 99999, height: "100dvh" }}
          aria-label="AiX Ecosystem Navigation"
        >
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <span className="font-bold text-neutral-900 text-sm font-mono uppercase tracking-wider">
                AiX Ecosystem
              </span>
            </div>
            <button
              type="button"
              aria-label="Close ecosystem menu"
              className="p-2 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setEcosystemMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 space-y-3 flex-1">
            <p className="text-xs text-neutral-500 mb-4">
              Integrated platforms, research verticals, and media networks across the AiX group.
            </p>
            {AIX_ECOSYSTEM_NODES.map((node) => (
              <a
                key={node.id}
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setEcosystemMobileOpen(false)}
                className="block p-3.5 rounded-xl border border-neutral-200 hover:border-amber-500 hover:bg-amber-50/50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-900 group-hover:text-amber-900">
                    {node.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-700" />
                </div>
                <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{node.description}</p>
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
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 text-neutral-900 transition-transform duration-300 ease-in-out ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Official BNR Sub-Header Ticker */}
      <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-1.5 text-xs text-neutral-600 w-full overflow-x-auto">
        <div className="mx-auto flex items-center justify-between gap-4 max-w-[1600px] w-full">
          <div className="flex items-center gap-2 text-neutral-900 font-semibold uppercase text-[10px] tracking-wider shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-600" />
            <span>Curs Oficial BNR</span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto font-mono text-[11px]">
            {currencies.length > 0 && currencies.some((c) => c.value !== null) ? (
              <>
                {currencies
                  .filter((c) => c.value !== null)
                  .map((c) => (
                    <div key={c.symbol} className="flex items-center gap-1.5 shrink-0">
                      <span className="text-neutral-500 font-medium">{c.symbol}</span>
                      <span className="text-neutral-900 font-bold">{c.value?.toFixed(4)}</span>
                    </div>
                  ))}
                <span className="text-[10px] text-neutral-500 shrink-0">
                  Sursă: BNR {bnrDate ? `• ${bnrDate}` : ""}
                </span>
              </>
            ) : (
              <span className="text-neutral-500 font-mono text-xs">
                Sursă: BNR • Date de referință în curs de actualizare
              </span>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-neutral-500 font-mono text-[9px] uppercase tracking-wider shrink-0">
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
          <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center font-black text-amber-400 text-lg shadow-sm">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight text-neutral-950 uppercase">
              AiX <span className="text-amber-600 font-medium">MEDIA</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-500 -mt-0.5 font-mono hidden sm:block">
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
            aria-label="Open AiX Ecosystem"
            aria-expanded={ecosystemDesktopOpen}
            aria-controls="desktop-ecosystem-panel"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-800 hover:text-neutral-950 hover:bg-neutral-200 text-xs font-semibold font-mono uppercase tracking-wider transition-colors"
            onClick={() => setEcosystemDesktopOpen((prev) => !prev)}
          >
            <Globe className="w-3.5 h-3.5 text-amber-600" />
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
            aria-label="Open AiX Ecosystem"
            aria-expanded={ecosystemMobileOpen}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200"
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
            className="flex min-h-[44px] min-w-[44px] items-center justify-center p-2 rounded-md text-neutral-800 hover:bg-neutral-100"
            onClick={() => {
              setEcosystemMobileOpen(false);
              setMenuOpen((prev) => !prev);
            }}
          >
            {menuOpen ? <X className="w-6 h-6 text-neutral-950" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Ecosystem Dropdown Panel */}
      {ecosystemDesktopOpen && (
        <div
          id="desktop-ecosystem-panel"
          className="absolute top-full right-4 xl:right-12 mt-1 w-80 bg-white border border-neutral-200 shadow-xl rounded-xl p-4 z-[9999]"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-2">
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
                className="block p-2.5 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                  <span>{node.name}</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">{node.description}</p>
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
