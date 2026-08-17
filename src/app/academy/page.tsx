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
    <div className="space-y-8 pb-16 pt-4 text-neutral-100">
      <PremiumHero
        eyebrow="Educație &amp; Metodologie Economică"
        headline="Ghiduri Practice &amp; Modele de Analiză"
        description="Materiale educaționale și metodologii structurate pentru profesioniști, investitori și decidenți din mediul de afaceri."
        ctaLabel="Explorează Materialele"
        ctaHref="#courses"
      />

      <section id="courses" className="space-y-6">
        <div className="border-b border-[#262932] pb-3">
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            Module Educaționale &amp; Ghiduri Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#111317] border border-[#262932] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-400 font-bold">{course.category}</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#171920] text-neutral-300 border border-[#262932]">
                    {course.level}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">{course.title}</h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-serif">{course.description}</p>
              </div>

              <div className="pt-4 border-t border-[#262932] flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">{course.duration}</span>
                <span className="text-white font-bold flex items-center gap-1 group-hover:text-amber-400 transition-colors cursor-pointer">
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

