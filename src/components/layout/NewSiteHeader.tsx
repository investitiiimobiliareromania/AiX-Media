// src/components/layout/NewSiteHeader.tsx
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { mainNavigation } from "@/constants/navigation";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";

/**
 * Clean, robust responsive header implementation.
 * Mobile (<768px): logo, ecosystem button, menu button.
 * Desktop (>=768px): logo, navigation links, ecosystem button.
 */
export function NewSiteHeader() {
  const pathname = usePathname();

  // Mobile state
  const [menuOpen, setMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);

  // Desktop ecosystem dropdown state
  const [ecosystemDesktopOpen, setEcosystemDesktopOpen] = useState(false);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape key closes any open overlay
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setEcosystemOpen(false);
        setEcosystemDesktopOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Click‑outside for desktop ecosystem dropdown
  useEffect(() => {
    if (!ecosystemDesktopOpen) return;
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#desktop-ecosystem-button") && !target.closest("#desktop-ecosystem-panel")) {
        setEcosystemDesktopOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [ecosystemDesktopOpen]);

  /** Helper to render navigation links */
  const renderNavLinks = () =>
    mainNavigation.map((item) => {
      const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
      return (
        <Link
          key={item.href}
          href={item.href}
          className={`px-2.5 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 min-h-[36px] ${
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
    });

  /** Helper to render mobile menu portal */
  const renderMobileMenu = () => {
    if (!menuOpen || typeof document === "undefined") return null;
    return createPortal(
      <>
        <div
          data-testid="mobile-overlay"
          className="fixed inset-0 bg-black/70"
          style={{ zIndex: 99998 }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <aside
          id="mobile-menu-drawer"
          data-testid="mobile-drawer"
          className="fixed inset-y-0 right-0 w-[min(88vw,420px)] max-w-full bg-[#050505] overflow-y-auto p-4"
          style={{ zIndex: 99999, height: "100dvh" }}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close menu"
            className="absolute top-2 right-2 text-amber-400"
            onClick={() => setMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
          {/* Primary navigation (mobile) */}
          <nav className="mt-10 space-y-2">
            {renderNavLinks()}
          </nav>
          {/* Mobile Ecosystem accordion */}
          <div className="mt-8 border-t border-neutral-900 pt-4">
            <button
              type="button"
              aria-label="Toggle Ecosystem"
              aria-expanded={ecosystemOpen}
              aria-controls="mobile-ecosystem-panel"
              className="w-full flex items-center justify-between text-left text-neutral-300"
              onClick={() => setEcosystemOpen((prev) => !prev)}
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                AiX Ecosystem
              </span>
              <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${ecosystemOpen ? "rotate-180" : ""}`} />
            </button>
            {ecosystemOpen && (
              <div id="mobile-ecosystem-panel" className="mt-3 space-y-2">
                {AIX_ECOSYSTEM_NODES.map((node) => (
                  <a
                    key={node.id}
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2.5 rounded bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:border-amber-500/30 hover:text-white text-sm"
                  >
                    {node.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </aside>
      </>
      , document.body
    );
  };

  return (
    <header className="relative z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-neutral-800/80 text-white">
      {/* Inner container */}
      <div className="mx-auto flex w-full max-w-[1600px] min-w-0 items-center px-4 md:px-6 h-16">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2.5 group">
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

        {/* Desktop navigation – visible md+ */}
        <nav className="hidden md:flex flex-1 min-w-0 items-center gap-2 ml-6" aria-label="Main Navigation">
          {renderNavLinks()}
        </nav>

        {/* Desktop Ecosystem button – visible md+ */}
        <div className="hidden md:flex items-center ml-auto">
          <button
            id="desktop-ecosystem-button"
            type="button"
            aria-label="Open AiX Ecosystem"
            aria-expanded={ecosystemDesktopOpen}
            aria-controls="desktop-ecosystem-panel"
            className="flex items-center gap-1 px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/30"
            onClick={() => setEcosystemDesktopOpen((prev) => !prev)}
          >
            AiX Ecosystem
            <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${ecosystemDesktopOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Mobile controls – visible <md */}
        <div className="flex md:hidden ml-auto items-center gap-2">
          {/* Mobile Ecosystem */}
          <button
            type="button"
            aria-label="Open AiX Ecosystem"
            aria-expanded={ecosystemOpen}
            aria-controls="mobile-ecosystem-panel"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center"
            onClick={() => setEcosystemOpen((prev) => !prev)}
          >
            ECOSYSTEM
          </button>
          {/* Mobile Menu */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-drawer"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay & drawer – rendered via portal */}
      {renderMobileMenu()}


      {/* Desktop Ecosystem dropdown panel */}
      {ecosystemDesktopOpen && (
        <div
          id="desktop-ecosystem-panel"
          className="absolute top-full right-0 mt-1 w-64 bg-[#070707] border border-neutral-800 shadow-xl rounded p-4 z-[9999]"
        >
          {AIX_ECOSYSTEM_NODES.map((node) => (
            <a
              key={node.id}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2.5 rounded bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:border-amber-500/30 hover:text-white text-sm mb-2"
            >
              {node.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
