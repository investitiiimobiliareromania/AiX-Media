"use client";

import React, { useState } from "react";
import Link from "next/link";
import { footerNavigation } from "@/constants/navigation";
import { contactConfig } from "@/config/contact";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { ArrowRight, ShieldCheck, Globe, Mail, Phone, MessageSquare, MapPin } from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Abonat Footer",
          contact: email,
          message: "Abonat din footer la sinteza AiX Media",
          source: "AiX Media Footer",
          pageUrl: typeof window !== "undefined" ? window.location.href : "N/A",
        }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // ignore
    }
  };

  return (
    <footer className="bg-neutral-50 text-neutral-600 border-t border-neutral-200 pt-16 pb-12 mt-16 w-full">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        
        {/* AiX Ecosystem Directory Bar */}
        <div className="mb-12 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4 mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700">
                AiX Ecosystem
              </span>
              <h3 className="text-base font-bold text-neutral-950 mt-0.5">
                Rețeaua Integrată de Servicii și Analiză
              </h3>
            </div>
            <a
              href="https://cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-neutral-900 hover:text-amber-700 underline inline-flex items-center gap-1 font-mono"
            >
              <span>cristianvaduva.com</span>
              <span>↗</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {AIX_ECOSYSTEM_NODES.map((node) => (
              <a
                key={node.id}
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Accesează ${node.name}`}
                className="group flex flex-col p-2.5 rounded-lg border border-neutral-100 bg-neutral-50 hover:bg-white hover:border-amber-400/60 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 group-hover:text-amber-800 transition-colors truncate">
                    {node.name}
                  </span>
                  <span className="text-[10px] text-neutral-400 group-hover:text-amber-800 transition-colors">
                    ↗
                  </span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono mt-1 truncate">
                  {new URL(node.url).hostname}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-200">
          {/* Brand & Personal Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center font-black text-amber-400 text-lg shadow-xs">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-neutral-950 uppercase">
                  AiX <span className="text-amber-600 font-medium">MEDIA</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono -mt-0.5">
                  Financial &amp; Real Estate Intelligence
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
              Platformă digitală de analiză economică, monitorizare a deciziilor monetare BNR și agregare a datelor imobiliare oficiale, fondată de {contactConfig.name}.
            </p>

            <div className="space-y-1.5 pt-2 text-xs font-mono text-neutral-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{contactConfig.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <a href={`mailto:${contactConfig.email}`} className="hover:text-neutral-950 transition-colors">
                  {contactConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <a href={`tel:${contactConfig.phone}`} className="hover:text-neutral-950 transition-colors">
                  {contactConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a
                  href={contactConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-800 transition-colors"
                >
                  WhatsApp: {contactConfig.whatsappDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                Date Verificate Oficial
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-700" />
                Acoperire Națională &amp; CEE
              </span>
            </div>
          </div>

          {/* Intelligence Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider font-mono">
              Verticale de Analiză
            </h4>
            <ul className="space-y-2 text-xs">
              {footerNavigation.intelligence.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-neutral-950 text-neutral-600 transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Media Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider font-mono">
              Media &amp; Podcast
            </h4>
            <ul className="space-y-2 text-xs">
              {footerNavigation.media.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-neutral-950 text-neutral-600 transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Executive Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider font-mono">
              Sinteză Periodică
            </h4>
            <p className="text-xs text-neutral-600">
              Primiți noutățile macroeconomice și analizele imobiliare direct pe email.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
                Abonare confirmată!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="adresa@email.com"
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:border-amber-600 focus:outline-none text-neutral-900 placeholder:text-neutral-400 shadow-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Abonează-te</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} AiX Media • {contactConfig.name}. Toate drepturile rezervate.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/contact" className="hover:text-neutral-950">Contact</Link>
            <Link href="/privacy" className="hover:text-neutral-950">Confidențialitate</Link>
            <Link href="/cookies" className="hover:text-neutral-950">Cookies</Link>
            <Link href="/gdpr" className="hover:text-neutral-950">GDPR</Link>
            <Link href="/terms" className="hover:text-neutral-950">Termeni și Condiții</Link>
            <Link href="/legal" className="hover:text-neutral-950">Aviz Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return <SiteFooter />;
}
