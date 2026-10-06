"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Globe,
  Search,
  ArrowRight,
} from "lucide-react";
import { primaryNavigation, mobileNavigationSections } from "@/constants/navigation";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { MarketDataPoint } from "@/lib/market-data";

interface NewSiteHeaderProps {
  currencies?: MarketDataPoint[];
}

export function NewSiteHeader({ currencies = [] }: NewSiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  // Desktop active dropdown menu (null when none open)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [ecosystemDesktopOpen, setEcosystemDesktopOpen] = useState(false);

  // Sticky header scroll behavior
  const [headerVisible, setHeaderVisible] = useState(true);
  const scrollRef = useRef({ lastScrollY: 0, drawerOpen: false });
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Update ref for drawer state
  useEffect(() => {
    scrollRef.current.drawerOpen = mobileMenuOpen;
  }, [mobileMenuOpen]);

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
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Route change auto-close
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setEcosystemDesktopOpen(false);
  }

  // Escape key listener & outside click handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        setEcosystemDesktopOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (navContainerRef.current && !navContainerRef.current.contains(target)) {
        setActiveDropdown(null);
        setEcosystemDesktopOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const bnrDate = currencies.find((c) => c.publishedAt)?.publishedAt;

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      setMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
    }
  };

  /** Render Desktop Navigation Bar */
  const renderDesktopNavigation = () => (
    <nav
      ref={navContainerRef}
      className="hidden lg:flex items-center gap-1 xl:gap-2 relative"
      aria-label="Main Navigation"
    >
      {primaryNavigation.map((item) => {
        const hasSubmenu = item.items && item.items.length > 0;
        const isDropdownOpen = activeDropdown === item.label;
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href)) ||
          (item.items && item.items.some((sub) => pathname === sub.href || pathname.startsWith(sub.href)));

        if (!hasSubmenu) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all min-h-[36px] flex items-center ${
                isActive
                  ? "text-amber-400 font-bold bg-[var(--surface-elevated)] border border-[var(--border)] shadow-xs"
                  : "text-neutral-300 hover:text-white hover:bg-[var(--surface-subtle)]"
              }`}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <div key={item.label} className="relative">
            <button
              type="button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              onClick={() => {
                setEcosystemDesktopOpen(false);
                setActiveDropdown(isDropdownOpen ? null : item.label);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all min-h-[36px] flex items-center gap-1 cursor-pointer ${
                isActive || isDropdownOpen
                  ? "text-amber-400 font-bold bg-[var(--surface-elevated)] border border-[var(--border)] shadow-xs"
                  : "text-neutral-300 hover:text-white hover:bg-[var(--surface-subtle)]"
              }`}
            >
              <span>{item.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180 text-amber-400" : "text-neutral-400"
                }`}
              />
            </button>

            {/* Dropdown Menu Panel */}
            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-neutral-950 border border-[var(--border)] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
              >
                <div className="p-2 border-b border-[var(--border)] mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                    {item.label} • AiX Intelligence
                  </span>
                  <Link
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="text-[11px] font-mono text-neutral-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <span>Overview</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-1">
                  {item.items?.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setActiveDropdown(null)}
                        className={`block p-2.5 rounded-xl transition-all group ${
                          isSubActive
                            ? "bg-neutral-900 border border-amber-500/30 text-amber-400 font-bold"
                            : "hover:bg-[var(--surface-subtle)] border border-transparent text-neutral-200 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="group-hover:text-amber-400 transition-colors">
                            {subItem.label}
                          </span>
                          <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                        </div>
                        {subItem.description && (
                          <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1 font-serif">
                            {subItem.description}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  /** Render Mobile Drawer */
  const renderMobileDrawer = () => {
    if (typeof document === "undefined" || !mobileMenuOpen) return null;

    return createPortal(
      <>
        {/* Backdrop Overlay */}
        <div
          data-testid="mobile-overlay"
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          style={{ zIndex: 99998 }}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-out Navigation Drawer */}
        <aside
          id="mobile-menu-drawer"
          data-testid="mobile-drawer"
          className="fixed inset-y-0 right-0 top-0 bottom-0 w-full sm:w-[420px] bg-neutral-950 border-l border-neutral-800 text-neutral-100 overflow-y-auto flex flex-col shadow-2xl"
          style={{ zIndex: 99999, height: "100dvh" }}
          aria-label="Mobile Navigation"
        >
          {/* Header row inside drawer */}
          <div className="flex items-center justify-between p-5 border-b border-neutral-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-black text-amber-400 text-sm">
                A
              </div>
              <span className="font-bold text-neutral-200 text-xs font-mono uppercase tracking-widest">
                AiX Navigation
              </span>
            </div>
            <button
              type="button"
              aria-label="Close navigation"
              className="p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search in mobile drawer */}
          <div className="p-5 pb-3 border-b border-neutral-900 shrink-0">
            <form onSubmit={handleMobileSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Caută în știri, date &amp; companii..."
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </form>
          </div>

          {/* Nav Content Sections */}
          <div className="p-5 space-y-6 flex-1 overflow-y-auto">
            {mobileNavigationSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
                  {section.title}
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px] ${
                          isActive
                            ? "bg-neutral-900 text-amber-400 border border-amber-500/30 font-bold"
                            : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Ecosystem Network Section */}
            <div className="space-y-3 pt-3 border-t border-neutral-900">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
                  Ecosistem Cristian Văduva
                </span>
                <Globe className="w-3.5 h-3.5 text-amber-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AIX_ECOSYSTEM_NODES.map((node) => (
                  <a
                    key={node.id}
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 hover:bg-neutral-850 transition-all block group min-h-[44px]"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-200 group-hover:text-amber-400">
                      <span>{node.name}</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-amber-400" />
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                      {node.categoryLabel}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </>,
      document.body
    );
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[var(--surface-elevated)]/95 backdrop-blur-md border-b border-[var(--border)] text-[var(--foreground)] transition-transform duration-300 ease-in-out ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Official BNR Sub-Header Ticker */}
      <div className="bg-[var(--surface-elevated)] border-b border-[var(--border)] px-4 py-1.5 text-xs text-[var(--foreground-muted)] w-full overflow-hidden">
        <div className="mx-auto flex items-center justify-between gap-4 max-w-[1600px] w-full min-w-0">
          <div className="flex items-center gap-2 text-neutral-300 font-semibold uppercase text-[10px] tracking-wider shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-amber-500">Curs Oficial BNR</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto font-mono text-[11px] no-scrollbar">
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
                <span className="text-[10px] text-neutral-400 shrink-0 hidden md:inline">
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
            setMobileMenuOpen(false);
            setActiveDropdown(null);
            setEcosystemDesktopOpen(false);
          }}
          className="shrink-0 flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-black text-amber-400 text-lg shadow-sm group-hover:border-amber-500/40 transition-colors">
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
        <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-4">
          {renderDesktopNavigation()}
        </div>

        {/* Desktop Right Actions (Ecosystem + Search) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Ecosystem Dropdown Trigger */}
          <div className="relative">
            <button
              id="desktop-ecosystem-button"
              type="button"
              aria-expanded={ecosystemDesktopOpen}
              aria-controls="desktop-ecosystem-panel"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-semibold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                ecosystemDesktopOpen
                  ? "text-amber-400 border-amber-500/40 font-bold"
                  : "text-neutral-300 hover:text-white hover:border-amber-500/30"
              }`}
              onClick={() => {
                setActiveDropdown(null);
                setEcosystemDesktopOpen((prev) => !prev);
              }}
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>Network</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  ecosystemDesktopOpen ? "rotate-180 text-amber-400" : "text-neutral-400"
                }`}
              />
            </button>

            {/* Desktop Ecosystem Dropdown Panel */}
            {ecosystemDesktopOpen && (
              <div
                id="desktop-ecosystem-panel"
                className="absolute top-full right-0 mt-2 w-80 bg-neutral-950 border border-[var(--border)] shadow-2xl rounded-2xl p-3 z-50 text-neutral-100 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="p-2 border-b border-[var(--border)] mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                    Ecosistem Cristian Văduva
                  </span>
                  <Globe className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="space-y-1">
                  {AIX_ECOSYSTEM_NODES.map((node) => (
                    <a
                      key={node.id}
                      href={node.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setEcosystemDesktopOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-[var(--surface-subtle)] border border-transparent hover:border-[var(--border)] transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-neutral-200 group-hover:text-amber-400">
                        <span>{node.name}</span>
                        <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-amber-400" />
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1 font-serif">
                        {node.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Search Button */}
          <Link
            href="/search"
            aria-label="Căutare pe site"
            className="p-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
          >
            <Search className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <Link
            href="/search"
            aria-label="Căutare pe site"
            className="p-2 rounded-xl text-neutral-300 hover:text-white bg-[var(--surface-subtle)] border border-[var(--border)] min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          >
            <Search className="w-5 h-5 text-neutral-300" />
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
            className="p-2 rounded-xl text-neutral-300 hover:text-white bg-[var(--surface-subtle)] border border-[var(--border)] min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Portal-rendered Mobile Drawer */}
      {renderMobileDrawer()}
    </header>
  );
}
