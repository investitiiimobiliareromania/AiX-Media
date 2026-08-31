import React from "react";
import Link from "next/link";
import { footerNavigation } from "@/constants/navigation";
import { contactConfig } from "@/config/contact";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { FooterNewsletterForm } from "./FooterNewsletterForm";
import { ShieldCheck, Globe, Mail, Phone, MessageSquare, MapPin } from "lucide-react";

export function SiteFooter() {

  return (
    <footer className="bg-[var(--surface)] text-[var(--foreground-muted)] border-t border-[var(--border)] pt-16 pb-12 mt-16 w-full">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        
        {/* AiX Ecosystem Directory Bar */}
        <div className="mb-12 rounded-2xl border-[var(--border)] bg-[var(--surface-editorial)] p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4 mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
                AiX Ecosystem
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Rețeaua Integrată de Servicii și Analiză
              </h3>
            </div>
            <a
              href="https://cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-neutral-300 hover:text-amber-400 underline inline-flex items-center gap-1 font-mono transition-colors"
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
                className="group flex flex-col p-2.5 rounded-xl border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-editorial)] hover:border-[var(--accent-bronze)]/50 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-200 group-hover:text-amber-400 transition-colors truncate">
                    {node.name}
                  </span>
                  <span className="text-[10px] text-neutral-500 group-hover:text-amber-400 transition-colors">
                    ↗
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono mt-1 truncate">
                  {new URL(node.url).hostname}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border)]">
          {/* Brand & Personal Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-elevated)] border border-neutral-800 flex items-center justify-center font-black text-amber-400 text-lg shadow-xs group-hover:border-amber-500/40 transition-colors">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white uppercase">
                  AiX <span className="text-amber-500 font-medium">MEDIA</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono -mt-0.5">
                  Financial &amp; Real Estate Intelligence
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md font-serif">
              Platformă digitală de analiză macroeconomică, cotații oficiale de referință BNR, date imobiliare ANCPI și profiluri corporative BVB, fondată de {contactConfig.name}.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{contactConfig.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`mailto:${contactConfig.email}`} className="hover:text-white transition-colors">
                  {contactConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`tel:${contactConfig.phone}`} className="hover:text-white transition-colors">
                  {contactConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <a
                  href={contactConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: {contactConfig.whatsappDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                Date Verificate Oficial
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                Acoperire Națională &amp; CEE
              </span>
            </div>
          </div>

          {/* Intelligence Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider font-mono">
              Verticale de Analiză
            </h4>
            <ul className="space-y-2 text-xs">
              {footerNavigation.intelligence.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 text-neutral-400 transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem & Services Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider font-mono">
              Platforme Ecosistem
            </h4>
            <ul className="space-y-2 text-xs">
              {footerNavigation.services.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("http") ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-400 text-neutral-400 transition-colors block py-0.5"
                    >
                      {item.label} ↗
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-amber-400 text-neutral-400 transition-colors block py-0.5"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Executive Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider font-mono">
              Sinteză Periodică
            </h4>
            <p className="text-xs text-neutral-400 font-serif leading-relaxed">
              Primiți rapoartele macroeconomice și analizele imobiliare direct pe email.
            </p>
            <FooterNewsletterForm />
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <div>
            © {new Date().getFullYear()} AiX Media • {contactConfig.name}. Toate drepturile rezervate.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">Confidențialitate</Link>
            <Link href="/cookies" className="hover:text-amber-400 transition-colors">Cookies</Link>
            <Link href="/gdpr" className="hover:text-amber-400 transition-colors">GDPR</Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">Termeni și Condiții</Link>
            <Link href="/legal" className="hover:text-amber-400 transition-colors">Aviz Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );

}

export function Footer() {
  return <SiteFooter />;
}
