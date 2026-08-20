import { type Metadata } from "next";
import { getEconomicEvents } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Calendar Macroeconomic & Evenimente Oficiale | AiX Media",
  description:
    "Calendarul deciziilor de politică monetară BNR, ședințelor BCE, publicării indicelui inflației INS și a rapoartelor financiare BVB.",
  alternates: { canonical: "/calendar" },
};

export default function CalendarPage() {
  const events = getEconomicEvents();

  return (
    <div className="space-y-8 pb-16 pt-4 text-neutral-100">
      <PremiumHero
        eyebrow="Calendar Oficial"
        headline="Decizii Monetare &amp; Publicări Macroeconomice"
        description="Monitorizarea ședințelor Consiliului de Administrație al BNR, comunicatelor INS și termenelor de raportare corporativă."
        ctaLabel="Vezi Evenimentele Programate"
        ctaHref="#events"
      />

      <section id="events" className="p-6 md:p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-4 gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Evenimente Programate
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-white mt-1">Calendarul Deciziilor Instituționale</h2>
          </div>
          <span className="text-xs font-mono text-neutral-300 bg-[var(--surface-elevated)] px-3 py-1.5 rounded-lg border border-[var(--border)] shadow-xs">
            Fus Orar EEST (București)
          </span>
        </div>

        <div className="overflow-x-auto bg-[var(--surface-elevated)] rounded-xl border border-[var(--border)] shadow-xs">
          <table className="w-full text-left border-collapse font-mono text-xs text-neutral-300">
            <thead>
              <tr className="border-b border-[var(--border)] text-neutral-400 bg-[var(--surface-elevated)] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-bold">Dată &amp; Oră</th>
                <th className="py-3 px-4 font-bold">Țară</th>
                <th className="py-3 px-4 font-bold">Eveniment</th>
                <th className="py-3 px-4 text-center font-bold">Impact</th>
                <th className="py-3 px-4 text-right font-bold">Valoare Actuală</th>
                <th className="py-3 px-4 text-right font-bold">Prognoză</th>
                <th className="py-3 px-4 text-right font-bold">Anterior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E0]">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-[var(--surface-elevated)] transition-colors">
                  <td className="py-3.5 px-4 text-neutral-300">
                    <span className="font-bold text-white block">{ev.date}</span>
                    <span className="text-[10px] text-neutral-500">{ev.time}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-400">{ev.country}</td>
                  <td className="py-3.5 px-4 font-serif font-semibold text-white max-w-xs">{ev.title}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        ev.importance === "HIGH"
                          ? "bg-rose-950/40 text-rose-400 border border-rose-500/30"
                          : "bg-[var(--surface-elevated)] text-neutral-300 border border-[var(--border)]"
                      }`}
                    >
                      {ev.importance}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-white">{ev.actual || "—"}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-400">{ev.forecast || "—"}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-500">{ev.previous || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}

