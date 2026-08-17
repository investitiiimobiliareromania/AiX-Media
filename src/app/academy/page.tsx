import { type Metadata } from "next";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { GraduationCap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Intelligence Academy & Ghiduri Economice | AiX Media",
  description:
    "Ghiduri structurate, modele de analiză a randamentelor imobiliare și cadre de interpretare a pieței de capital.",
  alternates: { canonical: "/academy" },
};

const courses = [
  {
    title: "Modelarea Randamentelor Imobiliare & Analiza Datelor ANCPI",
    category: "Real Estate Academy",
    duration: "Ghid Metodologic Structurat",
    level: "Nivel Executiv",
    description: "Calculul randamentului net (NOI), interpretarea contractelor de vânzare-cumpărare și corelarea cu dobânzile de referință BNR.",
  },
  {
    title: "Evaluarea Companiilor Listate la BVB & Interpretarea Rapoartelor",
    category: "Markets Academy",
    duration: "Cadru de Analiză Financiară",
    level: "Avansat",
    description: "Analiza situațiilor financiare anuale și semestriale, a indicatorilor P/E, EBITDA și a istoricului dividendelor plătite de emitenții BVB.",
  },
  {
    title: "Indicatorii Macroeconomici: Inflație, Politică Monetară & IRCC",
    category: "Macro Academy",
    duration: "Sinteză Teoretică & Practică",
    level: "Nivel Executiv",
    description: "Înțelegerea mecanismului de transmisie al politicii monetare a BNR, calculul indicilor ROBOR/IRCC și impactul asupra creditării.",
  },
];

export default function AcademyPage() {
  return (
    <div className="space-y-8 pb-16 pt-4">
      <PremiumHero
        eyebrow="Educație &amp; Metodologie Economică"
        headline="Ghiduri Practice &amp; Modele de Analiză"
        description="Materiale educaționale și metodologii structurate pentru profesioniști, investitori și decidenți din mediul de afaceri."
        ctaLabel="Explorează Materialele"
        ctaHref="#courses"
      />

      <section id="courses" className="space-y-6">
        <div className="border-b border-neutral-200 pb-3">
          <h2 className="text-2xl font-black text-neutral-950 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-700" />
            Module Educaționale &amp; Ghiduri Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-800 font-bold">{course.category}</span>
                  <span className="px-2 py-0.5 rounded bg-white text-neutral-700 border border-neutral-200">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-950 leading-snug">{course.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{course.description}</p>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">{course.duration}</span>
                <span className="text-neutral-950 font-bold flex items-center gap-1 hover:underline cursor-pointer">
                  <span>Accesează</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
