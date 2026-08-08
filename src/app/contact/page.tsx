import { type Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PremiumHero } from "@/components/media/PremiumHero";
import { Mail, Phone, MapPin, ShieldCheck, Radio, Building2, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Editorial Desk | AiX Media",
  description:
    "Get in touch with the AiX Media newsroom, executive briefing team, media relations, and corporate intelligence desk.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="space-y-12 pb-16">
      <PremiumHero
        eyebrow="AiX Media Desk"
        headline="Contact Newsroom & Executive Intelligence Desk"
        description="Whether you have an editorial tip, corporate inquiry, sponsorship proposal, or media request, our team responds promptly."
        ctaLabel="Send Inquiry"
        ctaHref="#form"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="form">
        {/* Left Column: Direct Contact Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              AiX Media Group Headquarters
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-mono">
              Digital business &amp; intelligence broadcasting across Bucharest, CEE, and European financial capitals.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>redactie@aixmedia.ro</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+40 21 900 8800</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Strada Aviatorilor 42, Sector 1, București, România</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e0c07] to-[#050505] border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Confidential Whistleblower Line
            </div>
            <h4 className="text-sm font-bold text-white">Investigative Journalism Tips</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-mono">
              Our investigative unit accepts encrypted documents and tips regarding corporate governance, capital market anomalies, and public policy.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Transmite un Mesaj Direct</h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Selectați sau specificați tipul solicitării pentru a fi direcționată direct către departamentul de resort.
            </p>
          </div>

          <ContactForm sourceContext="Pagina Oficială de Contact AiX Media" />
        </div>
      </div>
    </div>
  );
}
