import { type Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PremiumHero } from "@/components/media/PremiumHero";
import { contactConfig } from "@/config/contact";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { Mail, Phone, MapPin, ShieldCheck, MessageSquare, Globe, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Redacția Editorială | AiX Media",
  description:
    "Canale oficiale de comunicare directă cu redacția AiX Media și Cristian Văduva.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="space-y-10 pb-16 pt-4">
      <PremiumHero
        eyebrow="Redacție &amp; Consultanță"
        headline="Canale de Comunicare Directă"
        description="Punct de contact pentru solicitări de informații, propuneri de analize economice și cooperare instituțională."
        ctaLabel="Transmite un Mesaj"
        ctaHref="#form"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="form">
        {/* Left Column: Direct Contact Identity */}
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs">
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-amber-700 font-bold">
                Fondator &amp; Realizator
              </div>
              <h3 className="text-xl font-black text-neutral-950 mt-1">{contactConfig.name}</h3>
              <p className="text-xs text-neutral-600 font-mono mt-0.5">
                AiX Media Intelligence Network
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs font-mono text-neutral-700 border-t border-neutral-200">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{contactConfig.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                <a href={`mailto:${contactConfig.email}`} className="hover:text-neutral-950 transition-colors font-medium">
                  {contactConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <a href={`tel:${contactConfig.phone}`} className="hover:text-neutral-950 transition-colors font-medium">
                  {contactConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                <a
                  href={contactConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-800 transition-colors font-medium"
                >
                  WhatsApp: {contactConfig.whatsappDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-neutral-600 shrink-0" />
                <a
                  href={contactConfig.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-950 transition-colors flex items-center gap-1 underline font-medium"
                >
                  <span>cristianvaduva.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-neutral-900 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Canal Oficial Confidențial
            </div>
            <h4 className="text-sm font-bold text-neutral-950">Informații &amp; Sugestii de Analiză</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-mono">
              Comunicare directă privind guvernanța corporativă, rapoartele financiare și datele imobiliare.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-neutral-950 tracking-tight">Transmite un Mesaj Direct</h2>
            <p className="text-xs text-neutral-600 font-mono mt-1">
              Completați formularul de mai jos pentru a lua legătura cu redacția AiX Media.
            </p>
          </div>

          <ContactForm sourceContext="Pagina Oficială de Contact AiX Media" />
        </div>
      </div>

      {/* Ecosystem Access Section */}
      <section className="pt-8 border-t border-neutral-200 space-y-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-amber-700 font-bold block mb-1">
            Rețeaua AiX Ecosystem
          </span>
          <h2 className="text-2xl font-black text-neutral-950 tracking-tight">
            Puncte de Acces Specializate
          </h2>
          <p className="text-xs text-neutral-600 font-mono mt-1 max-w-2xl">
            Accesați platformele specializate din cadrul grupului pentru consultanță imobiliară, patrimoniu și piețe de capital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {AIX_ECOSYSTEM_NODES.map((node) => (
            <div
              key={node.id}
              className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors flex flex-col justify-between group shadow-xs min-w-0"
            >
              <div>
                <div className="flex items-center justify-between mb-2 gap-1">
                  <span className="text-[10px] font-mono text-amber-700 uppercase font-bold truncate">
                    {node.categoryLabel}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                    {new URL(node.url).hostname}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-neutral-950 group-hover:text-amber-800 transition-colors">
                  {node.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{node.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100">
                <a
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Accesează ${node.name}`}
                  className="inline-flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-neutral-100 text-neutral-900 hover:bg-neutral-900 hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer w-full min-h-[36px]"
                >
                  <span>Accesează</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
