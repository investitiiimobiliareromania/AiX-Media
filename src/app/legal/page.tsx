import React from "react";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Aviz Legal — AiX Media",
  description: "Informații legale oficiale, datele operatorului și mențiuni de responsabilitate pentru platforma AiX Media.",
};

export default function LegalPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-neutral-100 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-white border-b border-[var(--border)] pb-4">Aviz Legal</h1>
      
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6 my-6 font-mono text-xs text-neutral-300 space-y-2.5 shadow-lg">
        <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Identificare Operator</p>
        <p><strong>Titular Platformă:</strong> <span className="text-white">{contactConfig.name}</span></p>
        <p><strong>Adresă Web Oficială:</strong> <a href={siteConfig.url} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">{siteConfig.url}</a></p>
        <p><strong>Locație:</strong> <span className="text-white">{contactConfig.location}</span></p>
        <p><strong>Email Contact:</strong> <a href={`mailto:${contactConfig.email}`} className="text-amber-400 hover:underline">{contactConfig.email}</a></p>
        <p><strong>Telefon Contact:</strong> <a href={`tel:${contactConfig.phone}`} className="text-amber-400 hover:underline">{contactConfig.phoneDisplay}</a></p>
        <p className="text-[10px] text-neutral-400 pt-2 border-t border-[var(--border)]">
          * Mențiune: AiX Media este o platformă digitală de analiză și conținut editorial operată de Cristian Văduva.
        </p>
      </div>

      <h2 className="font-serif text-xl font-bold text-white mt-8">1. Scopul Platformei</h2>
      <p className="text-neutral-300 font-serif leading-relaxed text-sm sm:text-base">
        AiX Media este o platformă media și de informare dedicată analizelor economice, monitorizării indicatorilor macroeconomici emiși de BNR, sintezelor din piața imobiliară pe baza datelor ANCPI/INS și profilurilor companiilor listate la Bursa de Valori București.
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">2. Declinarea Responsabilității privind Consultanța Financiară</h2>
      <p className="text-white font-serif font-semibold">
        Informațiile publicate pe AiX Media au un caracter exclusiv informativ și educațional și nu constituie:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-neutral-300 font-serif text-sm sm:text-base">
        <li>Consultanță de investiții, recomandări financiare sau intermediere de tranzacții;</li>
        <li>Consultanță juridică, fiscală sau contabilă;</li>
        <li>O ofertă sau solicitare de a cumpăra sau vinde active ori valori mobiliare.</li>
      </ul>
      <p className="text-neutral-400 font-serif text-sm leading-relaxed">
        Utilizatorii sunt sfătuiți să consulte profesioniști autorizați înainte de a lua orice decizie financiară sau investițională.
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">3. Proveniența Datelor</h2>
      <p className="text-neutral-300 font-serif leading-relaxed text-sm sm:text-base">
        Cotațiile monetare, datele statistice și informațiile corporative sunt preluate din surse publice oficiale:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-neutral-300 font-serif text-sm sm:text-base">
        <li>Banca Națională a României (BNR) — fluxul XML oficial de curs valutar și indicatori monetari;</li>
        <li>Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI) — rapoarte statistice lunare;</li>
        <li>Institutul Național de Statistică (INS) — comunicate privind construcțiile și inflația;</li>
        <li>Bursa de Valori București (BVB) — rapoarte oficiale și paginile emitenților.</li>
      </ul>
    </section>
  );
}

