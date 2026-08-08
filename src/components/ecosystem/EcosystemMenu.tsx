"use client";

import React, { useState, useRef, useEffect } from "react";
import { getEcosystemCategorized } from "@/config/ecosystem";

export const EcosystemMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categorized = getEcosystemCategorized();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-label="Toggle AiX Ecosystem Navigation"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
        <span>Ecosystem</span>
        <svg
          className={`h-3 w-3 text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-amber-400" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-neutral-950 border border-neutral-800 p-5 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95">
          <div className="border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
                AiX Ecosystem
              </span>
              <h4 className="text-xs font-bold text-white font-serif">Connected Intelligence & Services</h4>
            </div>
            <span className="text-[9px] font-mono text-neutral-500 border border-neutral-800 rounded px-1.5 py-0.5">
              9 Nodes
            </span>
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {Object.entries(categorized).map(([catKey, catGroup]) => (
              <div key={catKey}>
                <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1.5 px-1">
                  {catGroup.label}
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {catGroup.items.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      aria-label={`Open ${item.name} website`}
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-neutral-900 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-neutral-200 group-hover:text-amber-400 transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-1">{item.description}</p>
                      </div>
                      <span className="text-xs text-neutral-600 group-hover:text-amber-400 transition-colors pl-2">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-800 pt-3 mt-4 text-center">
            <a
              href="https://cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-neutral-400 hover:text-amber-400 transition-colors"
            >
              Cristian Văduva Intelligence Network ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
