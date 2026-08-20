import { type Metadata } from "next";
import { getPodcastEpisodes } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { PodcastCard } from "@/components/media/PodcastCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "Podcasts Economice & Dialoguri Strategice | AiX Media",
  description:
    "Episoade audio și interviuri de analiză economică, investiții imobiliare și strategii corporative.",
  alternates: { canonical: "/podcasts" },
};

export default function PodcastsPage() {
  const podcasts = getPodcastEpisodes();

  return (
    <div className="space-y-8 pb-16 pt-4 text-neutral-100">
      <PremiumHero
        eyebrow="AiX Audio &amp; Podcast"
        headline="Dialoguri Economice &amp; Masterclasses Audio"
        description="Serii audio structurate privind transparența datelor imobiliare, piețele de capital și deciziile monetare."
        ctaLabel="Explorează Episoadele"
        ctaHref="#episodes"
        marketSignals={[
          { label: "Episoade Disponibile", value: `${podcasts.length}`, change: "Audio Verificat", isPositive: true },
          { label: "Format", value: "Masterclass", change: "Fără publicitate", isPositive: true },
        ]}
      />

      <section id="episodes" className="space-y-6">
        <div className="border-b border-[var(--border)] pb-3">
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Mic className="w-5 h-5 text-amber-500" />
            Catalog Episoade Audio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {podcasts.map((pod) => (
            <PodcastCard key={pod.id} episode={pod} />
          ))}
        </div>
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}

