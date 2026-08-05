import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getPodcastEpisodes } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { PodcastCard } from "@/components/media/PodcastCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Mic, Radio, Headphones } from "lucide-react";

const slug = "podcasts";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

export default function PodcastsPage() {
  const podcasts = getPodcastEpisodes();

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
            <Mic className="w-5 h-5 text-amber-400" />
            Latest Podcast Masterclasses & Dialogues
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {podcasts.map((pod) => (
            <PodcastCard key={pod.id} episode={pod} />
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
