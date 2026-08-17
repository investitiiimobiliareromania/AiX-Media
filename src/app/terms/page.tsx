import React from "react";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Termeni și Condiții — AiX Media",
  description: "Termenii și condițiile oficiale de utilizare a platformei AiX Media.",
};

export default function TermsPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-neutral font-sans">
      <h1 className="text-3xl font-black text-neutral-950 border-b border-neutral-200 pb-4">Termeni și Condiții</h1>
      <p className="text-xs font-mono text-neutral-500">Data intrării în vigoare: August 2026</p>

      <p className="lead text-neutral-700">
        Acești Termeni și Condiții (&quot;Termeni&quot;) guvernează accesul și utilizarea platformei AiX Media (&quot;Platforma&quot;).
      </p>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">1. Acceptarea Termenilor</h2>
      <p>
        Prin accesarea sau utilizarea Platformei, confirmați că ați citit, înțeles și sunteți de acord cu acești Termeni, precum și cu Politica de Confidențialitate și Politica de Cookie-uri.
      </p>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">2. Caracterul Informativ al Conținutului</h2>
      <p>
        Toate analizele, articolele, materialele video, episoadele de podcast și sintezele statistice sunt publicate exclusiv în scop informativ și educațional. Acestea nu constituie consultanță financiară, juridică sau fiscală.
      </p>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">3. Drepturi de Proprietate Intelectuală</h2>
      <p>
        Designul platformei, articolele originale și conținutul media realizat de Cristian Văduva sunt protejate de legislația privind drepturile de autor.
      </p>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">4. Contact</h2>
      <p className="font-mono text-xs text-neutral-700">
        Titular: {contactConfig.name}<br />
        Email: {contactConfig.email}<br />
        Telefon: {contactConfig.phoneDisplay}
      </p>
    </section>
  );
}
