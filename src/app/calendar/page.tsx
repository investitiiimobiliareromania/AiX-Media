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
    <div className="space-y-8 pb-16 pt-4">
      <PremiumHero
        eyebrow="Calendar Oficial"
        headline="Decizii Monetare &amp; Publicări Macroeconomice"
        description="Monitorizarea ședințelor Consiliului de Administrație al BNR, comunicatelor INS și termenelor de raportare corporativă."
        ctaLabel="Vezi Evenimentele Programate"
        ctaHref="#events"
      />

      <section id="events" className="p-6 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-amber-700 font-bold tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Evenimente Programate
            </div>
            <h2 className="text-xl md:text-2xl font-black text-neutral-950 mt-1">Calendarul Deciziilor Instituționale</h2>
          </div>
          <span className="text-xs font-mono text-neutral-700 bg-white px-3 py-1.5 rounded-lg border border-neutral-200 shadow-xs">
            Fus Orar EEST (București)
          </span>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <table className="w-full text-left border-collapse font-mono text-xs text-neutral-700">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 bg-neutral-50 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-bold">Dată &amp; Oră</th>
                <th className="py-3 px-4 font-bold">Țară</th>
                <th className="py-3 px-4 font-bold">Eveniment</th>
                <th className="py-3 px-4 text-center font-bold">Impact</th>
                <th className="py-3 px-4 text-right font-bold">Valoare Actuală</th>
                <th className="py-3 px-4 text-right font-bold">Prognoză</th>
                <th className="py-3 px-4 text-right font-bold">Anterior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3.5 px-4 text-neutral-700">
                    <span className="font-bold text-neutral-950 block">{ev.date}</span>
                    <span className="text-[10px] text-neutral-500">{ev.time}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-800">{ev.country}</td>
                  <td className="py-3.5 px-4 font-semibold text-neutral-950 max-w-xs">{ev.title}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        ev.importance === "HIGH"
                          ? "bg-rose-50 text-rose-800 border border-rose-200"
                          : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                      }`}
                    >
                      {ev.importance}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-neutral-950">{ev.actual || "—"}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-600">{ev.forecast || "—"}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-400">{ev.previous || "—"}</td>
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
