import { type Metadata } from "next";
import { getRadioShows, getLiveRadioShow } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { RadioLivePlayer } from "@/components/radio/RadioLivePlayer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Calendar, Mic } from "lucide-react";
import { radioService } from "@/services/radio.service";
import { RadioProgram } from "@/types/radio";

// Server Component – fetch stream config directly

// generateMetadata removed – using static metadata export

export const metadata: Metadata = {
  title: "AiX Business Radio | AiX Media",
  description: "Comentarii economice, sinteze de piață, actualizări BNR și emisiuni de analiză financiară.",
  alternates: { canonical: "/radio" },
};

export default async function RadioPage() {
  const shows = getRadioShows();
  const liveShow = getLiveRadioShow();
  const programs = await radioService.getPrograms();
  const currentProgram = programs.find((p) => p.id === liveShow.id) || programs[0];
  const schedule = await radioService.getSchedule();

  // Determine next program after current time
  const now = new Date();
  const next = schedule.find((s) => {
    const [h = 0, m = 0] = s.startTime.split(":").map(Number);
    const start = new Date();
    start.setHours(h, m, 0, 0);
    return start > now;
  });

  const nextProgram = next
    ? {
        id: next.id,
        title: next.programTitle,
        slug: "",
        description: "",
        coverImage: "",
        presenterId: "",
        presenterName: next.presenterName,
        category: "",
        duration: `${next.startTime}-${next.endTime}`,
        status: "Published" as const,
      } as RadioProgram
    : undefined;

  const streamConfig = await radioService.getStreamConfig();

  return (
    <div className="space-y-8 pb-16 pt-4 text-neutral-100">
      <PremiumHero
        eyebrow="AiX Audio Editorial"
        headline="Programe Radio &amp; Sinteze Economice"
        description="Sinteze audio ale indicatorilor monetari BNR, comentarii pe marginea evoluţiilor imobiliare și analize corporative."
        ctaLabel="Vezi Grila de Emisiuni"
        ctaHref="#shows"
        marketSignals={[
          { label: "Format", value: "Emisiuni Economice", change: "Grilă Programată", isPositive: true },
          { label: "Sursă", value: "AiX Media Desk", change: "Verificat", isPositive: true },
        ]}
      />

      {/* Primary Radio Player Component */}
      {currentProgram && streamConfig && (
        <RadioLivePlayer
          streamConfig={streamConfig}
          currentProgram={currentProgram}
          nextProgram={nextProgram}
        />
      )}

      {/* Program Schedule & Shows Directory */}
      <section id="shows" className="p-6 md:p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl text-neutral-100">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Grilă de Programe &amp; Realizatori
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-white mt-1">Catalog Emisiuni Economice</h2>
          </div>
          <span className="text-xs font-mono text-neutral-300 bg-[var(--surface-elevated)] px-3 py-1.5 rounded-lg border border-[var(--border)] shadow-xs">
            Program Săptămânal
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shows.map((show) => (
            <div
              key={show.id}
              className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3 hover:border-amber-500/40 transition-colors shadow-xs group"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-amber-400 font-bold">{show.airTime}</span>
                <span className="px-2 py-0.5 rounded bg-[var(--surface-elevated)] text-neutral-300 border border-[var(--border)] text-[10px] font-semibold">
                  PROGRAMAT
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                {show.title}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">{show.description}</p>
              <div className="pt-3 border-t border-[var(--border)] text-xs font-mono text-neutral-400 flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-amber-500" />
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
