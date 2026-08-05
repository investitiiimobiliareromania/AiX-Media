import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { GraduationCap, BookOpen, Award, CheckCircle, ArrowRight } from "lucide-react";

const slug = "academy";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

const courses = [
  {
    title: "Commercial Real Estate Yield & Cap Rate Teardowns",
    category: "Real Estate Academy",
    duration: "4 Modules • 8 Hours",
    level: "Executive Level",
    description: "Learn how institutional funds model NOI, leverage ratios, and exit cap rates in Bucharest and CEE.",
  },
  {
    title: "BVB Valuation & Capital Market Frameworks",
    category: "Markets Academy",
    duration: "6 Modules • 12 Hours",
    level: "Advanced",
    description: "In-depth equity analysis of top Bucharest Stock Exchange companies, dividend yield modeling, and float liquidity.",
  },
  {
    title: "Venture Capital & Private Equity Due Diligence",
    category: "Investments Academy",
    duration: "5 Modules • 10 Hours",
    level: "Executive Level",
    description: "Private capital allocation strategies, term sheet negotiation, and cross-border M&A playbooks.",
  },
];

export default function AcademyPage() {
  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow={config.eyebrow}
        headline={config.headline}
        description={config.description}
        ctaLabel={config.ctaLabel}
        marketSignals={config.marketSignals}
      />

      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            Executive Courses & Masterclasses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-400 font-semibold">{course.category}</span>
                  <span className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{course.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{course.description}</p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">{course.duration}</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer">
                  <span>Enroll Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
