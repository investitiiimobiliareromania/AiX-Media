import { type Metadata } from "next";
import { getRadioShows, getLiveRadioShow } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { RadioPlayer } from "@/components/media/RadioPlayer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Calendar, Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "AiX Business Radio | AiX Media",
  description:
    "Comentarii economice, sinteze de piață, actualizări BNR și emisiuni de analiză financiară.",
  alternates: { canonical: "/radio" },
};

export default function RadioPage() {
  const shows = getRadioShows();
  const currentShow = getLiveRadioShow() || shows[0];

  return (
    <div className="space-y-8 pb-16 pt-4">
      <PremiumHero
        eyebrow="AiX Audio Editorial"
        headline="Programe Radio &amp; Sinteze Economice"
        description="Sinteze audio ale indicatorilor monetari BNR, comentarii pe marginea evoluțiilor imobiliare și analize corporative."
        ctaLabel="Vezi Grila de Emisiuni"
        ctaHref="#shows"
        marketSignals={[
          { label: "Format", value: "Emisiuni Economice", change: "Grilă Programată", isPositive: true },
          { label: "Sursă", value: "AiX Media Desk", change: "Verificat", isPositive: true },
        ]}
      />

      {/* Primary Radio Player Component */}
      {currentShow && <RadioPlayer currentShow={currentShow} allShows={shows} />}

      {/* Program Schedule & Shows Directory */}
      <section id="shows" className="p-6 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div>
            <div className="text-xs font-mono uppercase text-amber-700 font-bold tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Grilă de Programe &amp; Realizatori
            </div>
            <h2 className="text-xl md:text-2xl font-black text-neutral-950 mt-1">Catalog Emisiuni Economice</h2>
          </div>
          <span className="text-xs font-mono text-neutral-600 bg-white px-3 py-1.5 rounded-lg border border-neutral-200 shadow-xs">
            Program Săptămânal
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shows.map((show) => (
            <div
              key={show.id}
              className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-3 hover:border-neutral-300 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-neutral-950 font-bold">{show.airTime}</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200 text-[10px] font-semibold">
                  PROGRAMAT
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-950">{show.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{show.description}</p>
              <div className="pt-3 border-t border-neutral-100 text-xs font-mono text-neutral-700 flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-amber-700" />
                <span>Realizator: {show.host}</span>
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
