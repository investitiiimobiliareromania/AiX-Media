import React from "react";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Termeni și Condiții — AiX Media",
  description: "Termenii și condițiile oficiale de utilizare a platformei AiX Media.",
};

export default function TermsPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-neutral-100 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-white border-b border-[var(--border)] pb-4">Termeni și Condiții</h1>
      <p className="text-xs font-mono text-neutral-400">Data intrării în vigoare: August 2026</p>

      <p className="lead text-neutral-300 font-serif leading-relaxed text-base sm:text-lg">
        Acești Termeni și Condiții (&quot;Termeni&quot;) guvernează accesul și utilizarea platformei AiX Media (&quot;Platforma&quot;).
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">1. Acceptarea Termenilor</h2>
      <p className="text-neutral-300 font-serif leading-relaxed text-sm sm:text-base">
        Prin accesarea sau utilizarea Platformei, confirmați că ați citit, înțeles și sunteți de acord cu acești Termeni, precum și cu Politica de Confidențialitate și Politica de Cookie-uri.
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">2. Caracterul Informativ al Conținutului</h2>
      <p className="text-neutral-300 font-serif leading-relaxed text-sm sm:text-base">
        Toate analizele, articolele, materialele video, episoadele de podcast și sintezele statistice sunt publicate exclusiv în scop informativ și educațional. Acestea nu constituie consultanță financiară, juridică sau fiscală.
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">3. Drepturi de Proprietate Intelectuală</h2>
      <p className="text-neutral-300 font-serif leading-relaxed text-sm sm:text-base">
        Designul platformei, articolele originale și conținutul media realizat de Cristian Văduva sunt protejate de legislația privind drepturile de autor.
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">4. Contact</h2>
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-5 font-mono text-xs text-neutral-300 space-y-1.5 shadow-lg">
        <p><strong>Titular:</strong> <span className="text-white">{contactConfig.name}</span></p>
        <p><strong>Email:</strong> <a href={`mailto:${contactConfig.email}`} className="text-amber-400 hover:underline">{contactConfig.email}</a></p>
        <p><strong>Telefon:</strong> <a href={`tel:${contactConfig.phone}`} className="text-amber-400 hover:underline">{contactConfig.phoneDisplay}</a></p>
      </div>
    </section>
  );
}

