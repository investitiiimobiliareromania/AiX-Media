import * as React from "react";
import type { Metadata } from "next";
import { AcademyHub } from "@/components/sections/academy-hub";

export const metadata: Metadata = {
  title: "AiX Academy | Hub Educațional Premium",
  description: "Cea mai avansată resursă educațională din România despre Asigurări, Real Estate și Planificare Financiară.",
};

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24 selection:bg-blue-600 selection:text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-xs mb-8 uppercase tracking-[0.2em] shadow-lg">
            Knowledge Center
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 text-foreground tracking-tighter leading-[1.1]">
            AiX Academy
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Ghiduri extinse, analize de piață și concepte financiare complexe explicate simplu. Salvează articolele favorite și construiește-ți independența.
          </p>
        </div>

        <AcademyHub />
      </div>
    </main>
  );
}
