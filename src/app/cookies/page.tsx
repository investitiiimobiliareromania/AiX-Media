import React from "react";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Politica de Cookie-uri — AiX Media",
  description: "Politica privind utilizarea fișierelor cookie și stocarea locală pe platforma AiX Media.",
};

export default function CookiesPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-neutral font-sans">
      <h1 className="text-3xl font-black text-neutral-950 border-b border-neutral-200 pb-4">Politica de Cookie-uri</h1>
      <p className="text-xs font-mono text-neutral-500">Data intrării în vigoare: August 2026</p>

      <p className="lead text-neutral-700">
        Această pagină detaliază modul în care platforma AiX Media utilizează tehnologiile minime de stocare locală necesare funcționării site-ului.
      </p>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">1. Abordare Minimală a Cookie-urilor</h2>
      <p>
        Platforma AiX Media <strong>nu</strong> utilizează cookie-uri de urmărire agresivă sau publicitate intruzivă de la terți. Utilizăm doar cookie-uri tehnice esențiale pentru memorarea preferințelor de navigare și salvarea consimțământului dumneavoastră.
      </p>

      <h2 className="text-xl font-bold text-neutral-950 mt-8">2. Contact</h2>
      <p>Pentru orice întrebare referitoare la această politică:</p>
      <p className="font-mono text-xs text-neutral-700">
        Titular: {contactConfig.name}<br />
        Email: {contactConfig.email}<br />
        Telefon: {contactConfig.phoneDisplay}
      </p>
    </section>
  );
}
