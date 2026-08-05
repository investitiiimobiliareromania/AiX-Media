import { type Metadata } from "next";
import { getEconomicEvents } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Calendar, Globe2, AlertCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Economic Calendar & Market Events | AiX Media",
  description:
    "Institutional macroeconomic calendar tracking BNR interest rate decisions, ECB monetary meetings, CPI releases, and BVB dividend ex-dates.",
  alternates: { canonical: "/calendar" },
};

export default function CalendarPage() {
  const events = getEconomicEvents();

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow="AiX Macro Calendar"
        headline="Institutional Economic & Policy Release Calendar"
        description="Track BNR monetary policy decisions, ECB meetings, inflation releases, and dividend ex-dates across Romanian and European markets."
        ctaLabel="View Today's Events"
        ctaHref="#events"
      />

      <section id="events" className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Scheduled Releases
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">Central Bank & Macro Events</h2>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800">
            EEST Timezone
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4 text-center">Impact</th>
                <th className="py-3 px-4 text-right">Actual</th>
                <th className="py-3 px-4 text-right">Forecast</th>
                <th className="py-3 px-4 text-right">Previous</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-neutral-900/80 transition-colors">
                  <td className="py-3.5 px-4 text-neutral-300">
                    <span className="font-bold text-white block">{ev.date}</span>
                    <span className="text-[10px] text-neutral-500">{ev.time}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-400">{ev.country}</td>
                  <td className="py-3.5 px-4 font-semibold text-white max-w-xs">{ev.title}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        ev.importance === "HIGH"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {ev.importance}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-400">{ev.actual || "—"}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-300">{ev.forecast || "—"}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-500">{ev.previous || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
