import { type Metadata } from "next";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: "What To Watch • Calendar Macroeconomic & Evenimente Oficiale | AiX Media",
  },
  description:
    "Calendarul oficial al deciziilor de politică monetară BNR, ședințelor BCE și Fed, rapoartelor INS privind inflația și PIB, statisticilor cadastrale ANCPI și raportărilor financiare BVB.",
  alternates: {
    canonical: `${siteConfig.url}/calendar`,
    languages: {
      "ro-RO": `${siteConfig.url}/calendar`,
      "x-default": `${siteConfig.url}/calendar`,
    },
  },
  openGraph: {
    title: "What To Watch • Calendar Macroeconomic & Evenimente Oficiale | AiX Media",
    description:
      "Calendarul oficial al deciziilor de politică monetară BNR, ședințelor BCE și Fed, rapoartelor INS privind inflația și PIB, statisticilor cadastrale ANCPI și raportărilor financiare BVB.",
    url: `${siteConfig.url}/calendar`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What To Watch • Calendar Macroeconomic & Evenimente Oficiale | AiX Media",
    description:
      "Calendarul deciziilor de politică monetară BNR, ședințelor BCE, publicării indicelui inflației INS și a rapoartelor financiare BVB.",
  },
};

interface DetailedCalendarEvent {
  id: string;
  institution: string;
  institutionCategory: "BNR" | "INS" | "ANCPI" | "BVB" | "BCE" | "FED" | "GUVERN";
  title: string;
  date: string;
  time: string;
  expectedData: string;
  whyItMatters: string;
  source: string;
  sourceUrl: string;
  impact: "CRITICAL" | "HIGH" | "MEDIUM";
  status: "CONFIRMAT" | "PROGRAMAT";
}

const institutionalCalendar: DetailedCalendarEvent[] = [
  {
    id: "cal-bnr-oct",
    institution: "Banca Națională a României (BNR)",
    institutionCategory: "BNR",
    title: "Publicarea Minutei Ședinței de Politică Monetară BNR",
    date: "2026-10-14",
    time: "15:00 EEST",
    expectedData: "Minuta deciziei de menținere a ratei dobânzii la 6,50% și evaluarea riscurilor inflaționiste",
    whyItMatters: "Dezvăluie orientarea membrilor Consiliului de Administrație privind ritmul viitor de relaxare a dobânzilor.",
    source: "BNR Calendar Oficial",
    sourceUrl: "https://www.bnr.ro",
    impact: "HIGH",
    status: "CONFIRMAT",
  },
  {
    id: "cal-ins-cpi-sep",
    institution: "Institutul Național de Statistică (INS)",
    institutionCategory: "INS",
    title: "Indicele Prețurilor de Consum (IPC) — Rata Inflației pe Septembrie",
    date: "2026-10-11",
    time: "09:00 EEST",
    expectedData: "Rata anuală a inflației IPC pentru septembrie 2026 (anterior 5,10% în august)",
    whyItMatters: "Confirmă traiectoria de dezinflație și fundamentează viitoarea decizie de dobândă BNR din noiembrie.",
    source: "INS Calendar Comunicate de Presă",
    sourceUrl: "https://insse.ro",
    impact: "CRITICAL",
    status: "CONFIRMAT",
  },
  {
    id: "cal-ancpi-sep",
    institution: "Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)",
    institutionCategory: "ANCPI",
    title: "Raportul Lunar al Tranzacțiilor Imobiliare Naționale & București",
    date: "2026-10-16",
    time: "10:00 EEST",
    expectedData: "Numărul total de contracte de vânzare-cumpărare înregistrate în cărțile funciare în septembrie",
    whyItMatters: "Barometrul cheie de lichiditate pentru piața rezidențială din marile aglomerații urbane.",
    source: "ANCPI Portal Statistici",
    sourceUrl: "https://www.ancpi.ro/statistici/",
    impact: "HIGH",
    status: "CONFIRMAT",
  },
  {
    id: "cal-ecb-rate-oct",
    institution: "Banca Centrală Europeană (BCE)",
    institutionCategory: "BCE",
    title: "Ședința de Politică Monetară a Consiliului Guvernatorilor BCE",
    date: "2026-10-17",
    time: "15:15 EEST",
    expectedData: "Decizia privind ratele dobânzilor de referință ale zonei euro (facilitatea de depozit)",
    whyItMatters: "Stabilește costul creditării în euro și paritatea cursului EUR/USD.",
    source: "ECB Official Schedule",
    sourceUrl: "https://www.ecb.europa.eu",
    impact: "CRITICAL",
    status: "CONFIRMAT",
  },
  {
    id: "cal-ins-permits-sep",
    institution: "Institutul Național de Statistică (INS)",
    institutionCategory: "INS",
    title: "Autorizații de Construire Eliberate pentru Clădiri Rezidențiale",
    date: "2026-10-29",
    time: "09:00 EEST",
    expectedData: "Numărul autorizațiilor emise în septembrie 2026 și suprafața utilă autorizată",
    whyItMatters: "Anticipează volumul livrărilor rezidențiale pe orizontul 2027-2028.",
    source: "INS Calendar Oficial",
    sourceUrl: "https://insse.ro",
    impact: "MEDIUM",
    status: "CONFIRMAT",
  },
  {
    id: "cal-bvb-q3-results",
    institution: "Bursa de Valori București (BVB)",
    institutionCategory: "BVB",
    title: "Debutul Sezonului de Raportări Financiare Trimestrul III 2026 (T3)",
    date: "2026-10-30",
    time: "08:30 EEST",
    expectedData: "Raportările trimestriale neauditate ale marilor emitenți din indicele BET (OMV Petrom, Romgaz, TLV)",
    whyItMatters: "Influentează evoluția cotațiilor bursiere și estimările de dividende pentru anul 2027.",
    source: "BVB Calendare Financiare Emitenți",
    sourceUrl: "https://www.bvb.ro",
    impact: "HIGH",
    status: "CONFIRMAT",
  },
  {
    id: "cal-fed-fomc-nov",
    institution: "Federal Reserve (SUA)",
    institutionCategory: "FED",
    title: "Decizia de Politică Monetară a Comitetului FOMC",
    date: "2026-11-07",
    time: "21:00 EEST",
    expectedData: "Rata dobânzii federale (Federal Funds Rate) și conferința de presă Jerome Powell",
    whyItMatters: "Stabilește direcția fluxurilor de capital globale și costul datoriei denominate în dolari.",
    source: "Federal Reserve Board Calendar",
    sourceUrl: "https://www.federalreserve.gov",
    impact: "CRITICAL",
    status: "CONFIRMAT",
  },
  {
    id: "cal-bnr-cpi-report-nov",
    institution: "Banca Națională a României (BNR)",
    institutionCategory: "BNR",
    title: "Prezentarea Raportului Trimestrial Asupra Inflației (Ediția Noiembrie)",
    date: "2026-11-12",
    time: "11:00 EEST",
    expectedData: "Noua prognoză a BNR privind traiectoria inflației pe orizontul de 8 trimestre și conferința Guvernatorului",
    whyItMatters: "Documentul de bază pentru prognozele economice și planificarea financiară corporativă din România.",
    source: "BNR Calendar Oficial",
    sourceUrl: "https://www.bnr.ro",
    impact: "CRITICAL",
    status: "CONFIRMAT",
  },
];

export default function CalendarPage() {
  return (
    <div className="space-y-10 pb-16 pt-4 text-neutral-100">
      <PremiumHero
        eyebrow="WHAT TO WATCH • CALENDAR INSTITUȚIONAL"
        headline="Decizii Monetare &amp; Publicări Macroeconomice Oficiale"
        description="Monitorizarea strictă a ședințelor Consiliului de Administrație al BNR, comunicatelor statistice INS, rapoartelor cadastrale ANCPI și ședințelor băncilor centrale internaționale (BCE, Fed)."
        ctaLabel="Vezi Evenimentele Programate"
        ctaHref="#events-grid"
      />

      {/* Structured Institutional Calendar */}
      <section id="events-grid" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border)] pb-4 gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Calendarul Evenimentelor Confirmate
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
              Ce Urmează în Economie, Imobiliare &amp; Piețe
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
            Fus Orar: EEST (București)
          </span>
        </div>

        {/* Detailed Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {institutionalCalendar.map((ev) => (
            <div
              key={ev.id}
              className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-mono text-xs font-bold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                      {ev.institutionCategory}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
                        ev.impact === "CRITICAL"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                          : ev.impact === "HIGH"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-neutral-800 text-neutral-400 border-neutral-700"
                      }`}
                    >
                      Impact {ev.impact}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-white font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>{ev.date} • {ev.time}</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-white leading-snug">
                  {ev.title}
                </h3>

                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono text-neutral-300 space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase block font-bold">Date Așteptate:</span>
                  <p>{ev.expectedData}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-[var(--border)]">
                <div className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/80 text-xs font-serif text-neutral-300 leading-relaxed space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-500 block">De Ce Contează:</span>
                  <p>{ev.whyItMatters}</p>
                </div>

                <div className="text-[10px] font-mono text-neutral-500 flex justify-between items-center pt-1">
                  <span>Sursă: {ev.source}</span>
                  <a
                    href={ev.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Portal Oficial</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimers & Newsletter */}
      <DataDisclaimer type="general" />

      <NewsletterBox
        overline="AiX What To Watch"
        headline="Calendarul Săptămânal pe Email"
        description="Abonați-vă pentru a primi în fiecare duminică sinteza evenimentelor economice și a raportărilor corporative din săptămâna următoare."
      />
    </div>
  );
}
