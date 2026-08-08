import { type Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PremiumHero } from "@/components/media/PremiumHero";
import { contactConfig } from "@/config/contact";
import { Mail, Phone, MapPin, ShieldCheck, MessageSquare, Globe, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Editorial Desk | AiX Media",
  description:
    "Direct contact channels for AiX Media, executive intelligence briefings, media inquiries, and private consultations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="space-y-12 pb-16">
      <PremiumHero
        eyebrow="AiX Media Intelligence Desk"
        headline="Contact & Direct Consultation Desk"
        description="Direct communication line for editorial intelligence, media inquiries, strategic partnerships, and private advisory."
        ctaLabel="Send Direct Inquiry"
        ctaHref="#form"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="form">
        {/* Left Column: Direct Contact Identity */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                Founder &amp; Principal Strategist
              </div>
              <h3 className="text-xl font-black text-white mt-1">{contactConfig.name}</h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Business &amp; Market Intelligence Operations
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs font-mono text-neutral-300 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{contactConfig.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${contactConfig.email}`} className="hover:text-amber-400 transition-colors">
                  {contactConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${contactConfig.phone}`} className="hover:text-amber-400 transition-colors">
                  {contactConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={contactConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: {contactConfig.whatsappDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={contactConfig.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <span>cristianvaduva.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e0c07] to-[#050505] border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Confidential Direct Channel
            </div>
            <h4 className="text-sm font-bold text-white">Investigative &amp; Market Intelligence Tips</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-mono">
              Direct and confidential communication regarding corporate governance, capital allocation, and market insights.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Transmite un Mesaj Direct</h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Selectați sau specificați tipul solicitării pentru a fi procesată direct în rețeaua AiX Media.
            </p>
          </div>

          <ContactForm sourceContext="Pagina Oficială de Contact AiX Media" />
        </div>
      </div>
    </div>
  );
}
