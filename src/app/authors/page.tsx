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
    <div className="space-y-8 pb-16 pt-4 text-neutral-100">
      <PremiumHero
        eyebrow="Redacția AiX Media"
        headline="Echipa Editorială &amp; Fondator"
        description="Analize economice, monitorizarea piețelor de capital și a datelor imobiliare oficiale."
        ctaLabel="Vezi Echipa"
        ctaHref="#team"
      />

      <section id="team" className="space-y-6">
        <div className="border-b border-[var(--border)] pb-3">
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            Redacția &amp; Realizatori
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authorList.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/50 hover:bg-[var(--surface-elevated)] transition-all space-y-4 shadow-xl block group"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--surface-elevated)] shrink-0 shadow-md">
                  <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{author.name}</h3>
                  <span className="text-xs font-mono text-amber-400 font-semibold">{author.role}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-serif">{author.bio}</p>

              {author.expertise && author.expertise.length > 0 && (
                <div className="pt-3 border-t border-[var(--border)] flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {author.expertise.map((exp, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md bg-[var(--surface-elevated)] text-neutral-300 border border-[var(--border)]">
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

