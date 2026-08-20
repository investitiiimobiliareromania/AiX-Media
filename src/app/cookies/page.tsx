import React from "react";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Politica de Cookie-uri — AiX Media",
  description: "Politica privind utilizarea fișierelor cookie și stocarea locală pe platforma AiX Media.",
};

export default function CookiesPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-neutral-100 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-white border-b border-[var(--border)] pb-4">Politica de Cookie-uri</h1>
      <p className="text-xs font-mono text-neutral-400">Data intrării în vigoare: August 2026</p>

      <p className="lead text-neutral-300 font-serif leading-relaxed text-base sm:text-lg">
        Această pagină detaliază modul în care platforma AiX Media utilizează tehnologiile minime de stocare locală necesare funcționării site-ului.
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">1. Abordare Minimală a Cookie-urilor</h2>
      <p className="text-neutral-300 font-serif leading-relaxed text-sm sm:text-base">
        Platforma AiX Media <strong>nu</strong> utilizează cookie-uri de urmărire agresivă sau publicitate intruzivă de la terți. Utilizăm doar cookie-uri tehnice esențiale pentru memorarea preferințelor de navigare și salvarea consimțământului dumneavoastră.
      </p>

      <h2 className="font-serif text-xl font-bold text-white mt-8">2. Contact</h2>
      <p className="text-neutral-300 font-serif">Pentru orice întrebare referitoare la această politică:</p>
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-5 font-mono text-xs text-neutral-300 space-y-1.5 shadow-lg">
        <p><strong>Titular:</strong> <span className="text-white">{contactConfig.name}</span></p>
        <p><strong>Email:</strong> <a href={`mailto:${contactConfig.email}`} className="text-amber-400 hover:underline">{contactConfig.email}</a></p>
        <p><strong>Telefon:</strong> <a href={`tel:${contactConfig.phone}`} className="text-amber-400 hover:underline">{contactConfig.phoneDisplay}</a></p>
      </div>
    </section>
  );
}

