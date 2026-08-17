import React from "react";
import Link from "next/link";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Conformitate GDPR — AiX Media",
  description: "Informații privind conformitatea cu Regulamentul General privind Protecția Datelor (GDPR).",
};

export default function GdprPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-neutral font-sans space-y-6">
      <h1 className="text-3xl font-black text-neutral-950 border-b border-neutral-200 pb-4">Conformitate GDPR</h1>
      <p className="text-xs font-mono text-neutral-500">Data intrării în vigoare: August 2026</p>

      <p className="lead text-neutral-700">
        Această pagină prezintă măsurile specifice aplicate pe platforma AiX Media pentru respectarea Regulamentului General privind Protecția Datelor (GDPR) (Regulamentul UE 2016/679).
      </p>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">1. Cine este Operatorul de Date?</h2>
      <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 font-mono text-xs text-neutral-700 space-y-2">
        <p><strong>Nume:</strong> {contactConfig.name}</p>
        <p><strong>Locație:</strong> {contactConfig.location}</p>
        <p><strong>Email Direct:</strong> <a href={`mailto:${contactConfig.email}`} className="text-neutral-950 underline">{contactConfig.email}</a></p>
        <p><strong>Telefon:</strong> <a href={`tel:${contactConfig.phone}`} className="text-neutral-950 underline">{contactConfig.phoneDisplay}</a></p>
      </div>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">2. Drepturile Persoanelor Vizate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
          <h3 className="text-sm font-bold text-neutral-950 font-mono uppercase tracking-wider">Acces &amp; Rectificare</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Aveți dreptul de a solicita confirmarea și o copie a datelor prelucrate, precum și rectificarea oricăror date inexacte.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
          <h3 className="text-sm font-bold text-neutral-950 font-mono uppercase tracking-wider">Ștergere (&quot;Dreptul de a fi uitat&quot;)</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Puteți solicita ștergerea datelor cu caracter personal în cazul în care acestea nu mai sunt necesare sau vă retrageți consimțământul.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-neutral-200 flex gap-4 text-xs font-mono">
        <Link href="/privacy" className="text-neutral-900 underline font-semibold">
          Politica de Confidențialitate &rarr;
        </Link>
        <span className="text-neutral-400">|</span>
        <Link href="/cookies" className="text-neutral-900 underline font-semibold">
          Politica de Cookie-uri &rarr;
        </Link>
      </div>
    </section>
  );
}
