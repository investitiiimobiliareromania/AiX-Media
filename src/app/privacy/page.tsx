import React from "react";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Politica de Confidențialitate — AiX Media",
  description: "Politica oficială de confidențialitate și protecție a datelor cu caracter personal pe platforma AiX Media.",
};

export default function PrivacyPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-neutral-100 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-white border-b border-[var(--border)] pb-4">Politica de Confidențialitate</h1>
      <p className="text-xs font-mono text-neutral-400">Data intrării în vigoare: August 2026</p>

      <p className="lead text-neutral-300 font-serif leading-relaxed text-base sm:text-lg">
        Această Politică de Confidențialitate explică modul în care {contactConfig.name} (&quot;noi&quot; sau &quot;operatorul&quot;) prelucrează și protejează datele cu caracter personal ale vizitatorilor platformei AiX Media, în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) (Regulamentul UE 2016/679).
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">1. Operatorul de Date</h2>
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-5 font-mono text-xs text-neutral-300 space-y-2 shadow-lg">
        <p><strong>Nume:</strong> <span className="text-white">{contactConfig.name}</span></p>
        <p><strong>Locație:</strong> <span className="text-white">{contactConfig.location}</span></p>
        <p><strong>Email Contact:</strong> <a href={`mailto:${contactConfig.email}`} className="text-amber-400 hover:underline">{contactConfig.email}</a></p>
        <p><strong>Telefon Contact:</strong> <a href={`tel:${contactConfig.phone}`} className="text-amber-400 hover:underline">{contactConfig.phoneDisplay}</a></p>
      </div>

      <h2 className="font-serif text-xl font-bold text-white mt-8">2. Datele Colectate</h2>
      <p className="text-neutral-300 font-serif leading-relaxed text-sm sm:text-base">
        Principiul nostru de bază este minimizarea datelor. Colectăm doar datele transmise benevol prin formularele de contact (nume, date de contact și mesajul transmis) pentru a vă putea răspunde solicitărilor.
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">3. Drepturile Dumneavoastră conform GDPR</h2>
      <p className="text-neutral-300 font-serif">În calitate de persoană vizată, beneficiați de:</p>
      <ul className="list-disc pl-5 space-y-1.5 text-neutral-300 font-serif text-sm sm:text-base">
        <li>Dreptul de acces la date;</li>
        <li>Dreptul la rectificarea datelor inexacte;</li>
        <li>Dreptul la ștergerea datelor (&quot;dreptul de a fi uitat&quot;);</li>
        <li>Dreptul la restricționarea prelucrării;</li>
        <li>Dreptul de a vă retrage consimțământul în orice moment;</li>
        <li>Dreptul de a depune plângere către ANSPDCP (anspdcp@dataprotection.ro).</li>
      </ul>
    </section>
  );
}

