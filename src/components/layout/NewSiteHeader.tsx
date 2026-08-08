"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// Canonical ecosystem nodes
const ECOSYSTEM_NODES = [
  { name: 'AiX OS', url: 'https://os.cristianvaduva.com' },
  { name: 'AiX Health', url: 'https://health.cristianvaduva.com' },
  { name: 'Subvenții', url: 'https://subventii.cristianvaduva.com' },
  { name: 'HomeFind', url: 'https://homefind.cristianvaduva.com' },
  { name: 'CV Finance / Credite', url: 'https://credite.cristianvaduva.com' },
  { name: 'Insurance', url: 'https://insurance.cristianvaduva.com' },
  { name: 'Cristian Văduva', url: 'https://cristianvaduva.com' },
  { name: 'AiX Luxury', url: 'https://aixluxury.com' },
  { name: 'Market Pulse', url: 'https://cristianvaduva.com/market-pulse' },
];

export function NewSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);

  // Global Escape handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setEcosystemOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Click‑outside for desktop ecosystem dropdown
  useEffect(() => {
    if (!ecosystemOpen) return;
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#ecosystem-panel') && !target.closest('#ecosystem-button')) {
        setEcosystemOpen(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [ecosystemOpen]);

  return (
    <header className="sticky top-0 z-[9999] bg-[#050505]/95 backdrop-blur-md border-b border-neutral-800/80 text-white w-full">
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

        {/* Desktop Controls */}
        <div className="flex items-center gap-4">
          {/* Desktop Ecosystem Button */}
          <button
            id="ecosystem-button"
            type="button"
            aria-expanded={ecosystemOpen}
            aria-controls="ecosystem-panel"
            aria-label="AiX Ecosystem"
            onClick={() => setEcosystemOpen(prev => !prev)}
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/40"
          >
            AiX Ecosystem
            <ChevronDown className={`w-4 h-4 transition-transform ${ecosystemOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Search */}
          <Link
            href="/search"
            className="w-11 h-11 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/40 flex items-center justify-center"
            aria-label="Search AiX Media Terminal"
          >
            <Search className="w-4 h-4 text-amber-400" />
          </Link>

          {/* Mobile MENU button */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-drawer"
            aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
            onClick={() => setMenuOpen(prev => !prev)}
            className="lg:hidden w-11 h-11 rounded-lg bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800 flex items-center justify-center"
          >
            {menuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      
      {/* Mobile Overlay and Drawer rendered via portal */}
      {menuOpen && typeof document !== 'undefined' && createPortal(
        <>
          {/* Overlay */}
          <div
            data-testid="mobile-overlay"
            className="fixed inset-0"
            style={{
              zIndex: 99998,
              background: 'rgba(0,0,0,0.65)',
            }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside
            id="aix-mobile-menu"
            data-testid="mobile-drawer"
            className="fixed top-0 right-0 bottom-0 p-4"
            style={{
              zIndex: 99999,
              width: 'min(88vw, 420px)',
              maxWidth: '100vw',
              height: '100dvh',
              background: '#050505',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close menu"
              data-testid="drawer-close"
              className="absolute top-2 right-2 text-amber-400"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            {/* Primary Navigation */}
            <nav className="space-y-2 mt-10">
              <Link href="/news" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">News</Link>
              <Link href="/markets" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">Markets</Link>
              <Link href="/business" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">Business</Link>
              <Link href="/real-estate" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">Real Estate</Link>
              <Link href="/investments" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">Investments</Link>
              <Link href="/finance" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">Finance</Link>
              <Link href="/companies" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">Companies</Link>
              <Link href="/calendar" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">Calendar</Link>
              <Link href="/search" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">Search</Link>
              <Link href="/radio" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-200 hover:border-amber-500/30 hover:text-white">Radio</Link>
            </nav>
            {/* Ecosystem Accordion */}
            <div className="border-t border-neutral-900 pt-4 mt-4">
              <button
                type="button"
                aria-expanded={ecosystemOpen}
                aria-controls="mobile-ecosystem-panel"
                onClick={() => setEcosystemOpen(prev => !prev)}
                className="w-full flex items-center justify-between text-left text-neutral-300 hover:text-white"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  AiX Ecosystem
                </span>
                <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${ecosystemOpen ? 'rotate-180' : ''}`} />
              </button>
              {ecosystemOpen && (
                <div id="mobile-ecosystem-panel" className="mt-3 space-y-2">
                  {ECOSYSTEM_NODES.map(node => (
                    <a
                      key={node.name}
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
        </>,
        document.body
      )}

      {/* Desktop Ecosystem Dropdown */}
      {ecosystemOpen && (
        <div
          id="ecosystem-panel"
          className="absolute top-full right-0 mt-1 w-64 bg-[#070707] border border-neutral-800 shadow-xl rounded z-[9999] p-4"
        >
          {ECOSYSTEM_NODES.map(node => (
            <a
              key={node.name}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-2 last:mb-0 text-sm text-neutral-300 hover:text-white"
            >
              {node.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
