import { type Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllAuthors } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Redacția & Autori | AiX Media",
  description:
    "Echipa editorială și realizatorii de conținut economic ai rețelei AiX Media.",
  alternates: { canonical: "/authors" },
};

export default function AuthorsPage() {
  const authorList = getAllAuthors();

  return (
    <div className="space-y-8 pb-16 pt-4">
      <PremiumHero
        eyebrow="Redacția AiX Media"
        headline="Echipa Editorială &amp; Fondator"
        description="Analize economice, monitorizarea piețelor de capital și a datelor imobiliare oficiale."
        ctaLabel="Vezi Echipa"
        ctaHref="#team"
      />

      <section id="team" className="space-y-6">
        <div className="border-b border-neutral-200 pb-3">
          <h2 className="text-2xl font-black text-neutral-950 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-700" />
            Redacția &amp; Realizatori
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authorList.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-colors space-y-4 shadow-xs block"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-neutral-300 bg-white shrink-0 shadow-xs">
                  <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-950">{author.name}</h3>
                  <span className="text-xs font-mono text-amber-800 font-semibold">{author.role}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">{author.bio}</p>

              {author.expertise && author.expertise.length > 0 && (
                <div className="pt-3 border-t border-neutral-200 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {author.expertise.map((exp, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white text-neutral-700 border border-neutral-200">
                      {exp}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
