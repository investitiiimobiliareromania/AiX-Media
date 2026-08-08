"use client";

import React, { useState, useRef, useEffect } from "react";
import { getEcosystemCategorized } from "@/config/ecosystem";
import { X, ChevronDown, ExternalLink } from "lucide-react";

export const EcosystemMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const categorized = getEcosystemCategorized();

  // Close menu on click outside or Escape press
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Lock body scroll when open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:text-amber-400 hover:border-amber-500/40 transition-colors cursor-pointer min-h-[36px]"
        aria-expanded={isOpen}
        aria-label="Toggle AiX Ecosystem Navigation"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
        <span>Ecosystem</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-amber-400" : ""
          }`}
        />
      </button>

      {/* Menu Container */}
      {isOpen && (
        <>
          {/* Mobile Overlay Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel Container: Fixed full-width on Mobile (<640px), Absolute positioned on Desktop (>=640px) */}
          <div className="fixed inset-x-0 top-16 bottom-0 z-50 w-full max-w-full bg-neutral-950/98 border-t border-neutral-800 p-4 overflow-y-auto sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96 sm:max-w-[calc(100vw-2rem)] sm:rounded-xl sm:border sm:p-5 sm:shadow-2xl sm:max-h-[80vh] box-border animate-in fade-in-50 zoom-in-95">
            {/* Panel Header */}
            <div className="border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
                  AiX Ecosystem
                </span>
                <h4 className="text-xs font-bold text-white font-serif">
                  Connected Intelligence &amp; Services
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-neutral-400 border border-neutral-800 rounded px-1.5 py-0.5">
                  9 Platforms
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md bg-neutral-900 text-neutral-400 hover:text-white sm:hidden"
                  aria-label="Close Ecosystem Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Categorized List */}
            <div className="space-y-5">
              {Object.entries(categorized).map(([catKey, catGroup]) => (
                <div key={catKey} className="space-y-2">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400/90 border-b border-neutral-900 pb-1">
                    {catGroup.label}
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {catGroup.items.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center justify-between p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40 hover:bg-neutral-900 transition-colors gap-3 min-w-0"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                              {item.name}
                            </span>
                            <span className="text-[9px] font-mono text-neutral-500 shrink-0">
                              {new URL(item.url).hostname}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5 break-words">
                            {item.description}
                          </p>
                        </div>

                        {/* Explicit Accesează CTA Button */}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          aria-label={`Accesează ${item.name}`}
                          className="shrink-0 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-black text-[11px] font-mono font-semibold transition-all cursor-pointer min-h-[32px]"
                        >
                          <span>Accesează</span>
                          <span>→</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Panel Footer */}
            <div className="border-t border-neutral-800 pt-3 mt-5 text-center">
              <a
                href="https://cristianvaduva.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-400 hover:text-amber-400 transition-colors"
              >
                <span>Cristian Văduva Advisory Network</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
