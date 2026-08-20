import React from "react";
import Link from "next/link";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Conformitate GDPR — AiX Media",
  description: "Informații privind conformitatea cu Regulamentul General privind Protecția Datelor (GDPR).",
};

export default function GdprPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-neutral-100 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-white border-b border-[var(--border)] pb-4">Conformitate GDPR</h1>
      <p className="text-xs font-mono text-neutral-400">Data intrării în vigoare: August 2026</p>

      <p className="lead text-neutral-300 font-serif leading-relaxed text-base sm:text-lg">
        Această pagină prezintă măsurile specifice aplicate pe platforma AiX Media pentru respectarea Regulamentului General privind Protecția Datelor (GDPR) (Regulamentul UE 2016/679).
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">1. Cine este Operatorul de Date?</h2>
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6 font-mono text-xs text-neutral-300 space-y-2 shadow-lg">
        <p><strong>Nume:</strong> <span className="text-white">{contactConfig.name}</span></p>
        <p><strong>Locație:</strong> <span className="text-white">{contactConfig.location}</span></p>
        <p><strong>Email Direct:</strong> <a href={`mailto:${contactConfig.email}`} className="text-amber-400 hover:underline">{contactConfig.email}</a></p>
        <p><strong>Telefon:</strong> <a href={`tel:${contactConfig.phone}`} className="text-amber-400 hover:underline">{contactConfig.phoneDisplay}</a></p>
      </div>

      <h2 className="font-serif text-xl font-bold text-white mt-8">2. Drepturile Persoanelor Vizate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2 shadow-md">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-amber-400">Acces &amp; Rectificare</h3>
          <p className="text-xs text-neutral-300 leading-relaxed font-serif">
            Aveți dreptul de a solicita confirmarea și o copie a datelor prelucrate, precum și rectificarea oricăror date inexacte.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2 shadow-md">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-amber-400">Ștergere (&quot;Dreptul de a fi uitat&quot;)</h3>
          <p className="text-xs text-neutral-300 leading-relaxed font-serif">
            Puteți solicita ștergerea datelor cu caracter personal în cazul în care acestea nu mai sunt necesare sau vă retrageți consimțământul.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-[var(--border)] flex gap-4 text-xs font-mono">
        <Link href="/privacy" className="text-amber-400 hover:underline font-semibold">
          Politica de Confidențialitate &rarr;
        </Link>
        <span className="text-neutral-600">|</span>
        <Link href="/cookies" className="text-amber-400 hover:underline font-semibold">
          Politica de Cookie-uri &rarr;
        </Link>
      </div>
    </section>
  );
}

