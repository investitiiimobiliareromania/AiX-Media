"use client";

import React from "react";
import Link from "next/link";
import { footerNavigation } from "@/constants/navigation";
import { Radio, Tv, Mail, ArrowRight, ShieldCheck, Globe, Award } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#030303] text-neutral-400 border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-bold text-black text-2xl shadow-lg">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-white uppercase">
                  AiX <span className="text-amber-400 font-light">MEDIA</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">
                  Business & Intelligence Network
                </span>
              </div>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              Romania&apos;s next-generation business and intelligence media platform. Delivering macroeconomic insights, capital markets analysis, real estate dynamics, broadcasting 24/7 on AiX Radio.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Institutional Rigor
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" />
                CEE Coverage
              </span>
            </div>
          </div>

          {/* Media Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Media Products
            </h4>
            <ul className="space-y-2 text-sm">
              {footerNavigation.media.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Intelligence Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Editorial Verticals
            </h4>
            <ul className="space-y-2 text-sm">
              {footerNavigation.intelligence.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Executive Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Executive Briefing
            </h4>
            <p className="text-xs text-neutral-400">
              Receive private market intelligence reports before markets open.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="executive@company.com"
                className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded focus:border-amber-400 focus:outline-none text-white"
              />
              <button
                type="submit"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe Briefing</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <div>
            © {new Date().getFullYear()} AiX Media Group. All rights reserved. Bloomberg-level analytical integrity.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/news" className="hover:text-amber-400">Privacy Policy</Link>
            <Link href="/news" className="hover:text-amber-400">Terms of Service</Link>
            <Link href="/news" className="hover:text-amber-400">Editorial Code</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return <SiteFooter />;
}
