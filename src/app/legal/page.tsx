import React from "react";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Aviz Legal — AiX Media",
  description: "Informații legale oficiale, datele operatorului și mențiuni de responsabilitate pentru platforma AiX Media.",
};

export default function LegalPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-neutral font-sans">
      <h1 className="text-3xl font-black text-neutral-950 border-b border-neutral-200 pb-4">Aviz Legal</h1>
      
      <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 my-6 font-mono text-xs text-neutral-700 space-y-2.5">
        <p className="text-amber-800 font-bold uppercase tracking-wider text-[10px]">Identificare Operator</p>
        <p><strong>Titular Platformă:</strong> {contactConfig.name}</p>
        <p><strong>Adresă Web Oficială:</strong> <a href={siteConfig.url} target="_blank" rel="noopener noreferrer" className="text-neutral-950 underline">{siteConfig.url}</a></p>
        <p><strong>Locație:</strong> {contactConfig.location}</p>
        <p><strong>Email Contact:</strong> <a href={`mailto:${contactConfig.email}`} className="text-neutral-950 underline">{contactConfig.email}</a></p>
        <p><strong>Telefon Contact:</strong> <a href={`tel:${contactConfig.phone}`} className="text-neutral-950 underline">{contactConfig.phoneDisplay}</a></p>
        <p className="text-[10px] text-neutral-500 pt-2 border-t border-neutral-200">
          * Mențiune: AiX Media este o platformă digitală de analiză și conținut editorial operată de Cristian Văduva.
        </p>
      </div>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">1. Scopul Platformei</h2>
      <p>
        AiX Media este o platformă media și de informare dedicată analizelor economice, monitorizării indicatorilor macroeconomici emiși de BNR, sintezelor din piața imobiliară pe baza datelor ANCPI/INS și profilurilor companiilor listate la Bursa de Valori București.
      </p>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">2. Declinarea Responsabilității privind Consultanța Financiară</h2>
      <p className="text-neutral-900 font-semibold">
        Informațiile publicate pe AiX Media au un caracter exclusiv informativ și educațional și nu constituie:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-neutral-700">
        <li>Consultanță de investiții, recomandări financiare sau intermediere de tranzacții;</li>
        <li>Consultanță juridică, fiscală sau contabilă;</li>
        <li>O ofertă sau solicitare de a cumpăra sau vinde active ori valori mobiliare.</li>
      </ul>
      <p>
        Utilizatorii sunt sfătuiți să consulte profesioniști autorizați înainte de a lua orice decizie financiară sau investițională.
      </p>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">3. Proveniența Datelor</h2>
      <p>
        Cotațiile monetare, datele statistice și informațiile corporative sunt preluate din surse publice oficiale:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-neutral-700">
        <li>Banca Națională a României (BNR) — fluxul XML oficial de curs valutar și indicatori monetari;</li>
        <li>Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI) — rapoarte statistice lunare;</li>
        <li>Institutul Național de Statistică (INS) — comunicate privind construcțiile și inflația;</li>
        <li>Bursa de Valori București (BVB) — rapoarte oficiale și paginile emitenților.</li>
      </ul>
    </section>
  );
}
