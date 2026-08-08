import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getRadioShows, getLiveRadioShow } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { RadioPlayer } from "@/components/media/RadioPlayer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Radio, Mic, Calendar, Clock, Volume2, ShieldCheck } from "lucide-react";

const slug = "radio";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: "Business commentary, live interviews, market updates, and executive podcasts.",
  alternates: { canonical: `/${slug}` },
};

export default function RadioPage() {
  const shows = getRadioShows();
  const liveShow = getLiveRadioShow() || shows[0];

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow="AiX Live Audio"
        headline={config.headline}
        description={config.description}
        ctaLabel={config.ctaLabel}
        marketSignals={config.marketSignals}
      />

      {/* Primary Radio Player */}
      <RadioPlayer currentShow={liveShow} allShows={shows} />

      {/* Program Schedule & Shows Directory */}
      <section className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Broadcasting Program & Hosts
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">Daily Shows & Host Directory</h2>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800">
            Broadcasting Live
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shows.map((show) => (
            <div
              key={show.id}
              className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-amber-400 font-bold">{show.airTime}</span>
                <span className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                  ON AIR
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{show.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{show.description}</p>
              <div className="pt-3 border-t border-neutral-800 text-xs font-mono text-neutral-300 flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-amber-400" />
                <span>Host: {show.host}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
