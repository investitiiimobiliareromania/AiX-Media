import { type Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllAuthors } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Users, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Board & Analysts | AiX Media",
  description:
    "Meet the journalists, economic analysts, and media executives shaping AiX Media's institutional reporting.",
  alternates: { canonical: "/authors" },
};

export default function AuthorsPage() {
  const authorList = getAllAuthors();

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow="AiX Editorial Board"
        headline="Institutional Journalists & Senior Economic Analysts"
        description="Our newsroom combines deep financial sector expertise, macroeconomic modeling, and investigative journalism across Central & Eastern Europe."
        ctaLabel="Meet the Team"
        ctaHref="#team"
      />

      <section id="team" className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            Senior Analysts & Correspondents
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {authorList.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all hover:bg-neutral-900 space-y-4 shadow-xl block"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/40 shrink-0">
                  <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{author.name}</h3>
                  <span className="text-xs font-mono text-amber-400">{author.role}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">{author.bio}</p>

              <div className="pt-3 border-t border-neutral-800 flex flex-wrap gap-1.5 font-mono text-[10px]">
                {author.expertise.map((exp, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                    {exp}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
