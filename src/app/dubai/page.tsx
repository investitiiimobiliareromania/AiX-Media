import { type Metadata } from "next";
import {
  dubaiMarketBenchmarks,
  dubaiPrimeAreas,
  comparisonBucharestVsDubai,
} from "@/lib/data-intelligence/dubai-data";
import { PremiumHero } from "@/components/media/PremiumHero";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import {
  Building2,
  Award,
  ArrowRight,
  ExternalLink,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Dubai Property Intelligence & Investiții Imobiliare | AiX Media",
  },
  description:
    "Ghid complet și analize de piață bazate pe date oficiale DLD (Dubai Land Department): randamente din chirii, Palm Jumeirah, Downtown, Dubai Marina, Golden Visa și comparație 1M€ București vs Dubai.",
  alternates: {
    canonical: `${siteConfig.url}/dubai`,
    languages: {
      "ro-RO": `${siteConfig.url}/dubai`,
      "x-default": `${siteConfig.url}/dubai`,
    },
  },
  openGraph: {
    title: "Dubai Property Intelligence & Investiții Imobiliare | AiX Media",
    description:
      "Ghid complet și analize de piață bazate pe date oficiale DLD (Dubai Land Department): randamente din chirii, Palm Jumeirah, Downtown, Dubai Marina, Golden Visa și comparație 1M€ București vs Dubai.",
    url: `${siteConfig.url}/dubai`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Property Intelligence & Investiții Imobiliare | AiX Media",
    description:
      "Ghid complet și analize de piață bazate pe date oficiale DLD: randamente, Golden Visa și comparație 1M€ București vs Dubai.",
  },
};

export default function DubaiPropertyPage() {
  return (
    <div className="space-y-12 pb-16 pt-4 text-neutral-100">
      {/* Hero */}
      <PremiumHero
        eyebrow="DUBAI PROPERTY INTELLIGENCE"
        headline="Piața Imobiliară Dubai: Date Oficiale DLD &amp; Randamente"
        description="Analiză structurată pe date oficiale ale Dubai Land Department (DLD) și RERA: randamente din chirii, segmente rezidențiale prime, cadrul legal Golden Visa și comparație strategică de randament."
        ctaLabel="Vezi Zonele Prime &amp; Randamente"
        ctaHref="#prime-areas"
      />

      {/* 1. Official DLD Benchmarks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-500" />
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
              Indicatori Oficiali Dubai Land Department (DLD)
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">Date Oficiale S1 2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dubaiMarketBenchmarks.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2.5 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                  {b.period}
                </span>
                <h3 className="font-serif text-sm font-bold text-neutral-200">{b.title}</h3>
              </div>

              <div className="text-xl md:text-2xl font-serif font-bold text-white">
                {b.value}
              </div>

              <p className="text-xs text-neutral-400 font-serif leading-relaxed border-t border-[var(--border)] pt-2">
                {b.description}
              </p>

              <div className="text-[10px] font-mono text-neutral-500 pt-1 flex justify-between">
                <span>Sursă: {b.source}</span>
                <a
                  href={b.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  DLD Portal ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Prime Districts & Yields */}
      <section id="prime-areas" className="space-y-6">
        <div className="border-b border-[var(--border)] pb-3 space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            PRIME DISTRICT WATCH
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
            Zone Rezidențiale Cheie, Prețuri &amp; Randamente din Chirii
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif">
            Randamente brute și nete anuale medii din închirierea proprietăților rezidențiale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dubaiPrimeAreas.map((area) => (
            <div
              key={area.id}
              className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-mono text-xs font-bold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                    {area.category}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Ocupare: <strong className="text-white">{area.occupancyRatePct}%</strong>
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white">{area.name}</h3>

                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Preț Mediu / sq.ft</span>
                    <span className="text-white font-bold">{area.avgPriceSqFtAED} AED</span>
                    <span className="text-neutral-400 text-[10px] block">(~{area.avgPriceSqFtEUR} €/sq.ft)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block text-[10px]">Randament Brut (Gross Yield)</span>
                    <span className="text-amber-400 font-bold text-base">{area.grossYieldAnnualPct}%</span>
                    <span className="text-neutral-400 text-[10px] block">Net: ~{area.netYieldAnnualPct}%</span>
                  </div>
                </div>
              </div>

              {/* Drivers & Off-Plan Split */}
              <div className="space-y-3 pt-2 border-t border-[var(--border)] text-xs font-serif text-neutral-300">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase block">
                    Factori de Creștere:
                  </span>
                  {area.keyDrivers.map((d, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                      <span className="text-amber-500">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-lg bg-neutral-900/50 border border-neutral-800 text-[10px] font-mono text-neutral-400 flex justify-between">
                  <span>Distribuție vânzări:</span>
                  <span className="text-white font-bold">{area.offPlanSharePct}% Off-Plan / {area.readySharePct}% Ready</span>
                </div>
              </div>

              {/* Provenance */}
              <div className="text-[10px] font-mono text-neutral-500 flex justify-between pt-2 border-t border-neutral-900">
                <span>Sursă: {area.source}</span>
                <span>Perioadă: {area.reportingPeriod}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. €1M In Bucharest vs €1M In Dubai Comparison */}
      <section className="p-6 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-2xl">
        <div className="border-b border-[var(--border)] pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <Scale className="w-4 h-4" />
            Comparație Editorială &amp; Financiară
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
            1.000.000 € în București Prime vs. 1.000.000 € în Dubai Prime
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif">
            Analiză comparativă obiectivă pe baza datelor de tranzacționare, regimului fiscal și protecției cumpărătorilor.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 text-[10px] uppercase">
                <th className="py-3 px-4">Criteriu Financiar / Legal</th>
                <th className="py-3 px-4 text-amber-400">București Prime (Zona Nord)</th>
                <th className="py-3 px-4 text-amber-400">Dubai Prime (Downtown/Marina)</th>
                <th className="py-3 px-4 text-neutral-400">Explicație &amp; Notă de Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 font-serif">
              {comparisonBucharestVsDubai.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-950/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-mono text-xs">
                    {row.dimension}
                  </td>
                  <td className="py-3 px-4 text-neutral-200">{row.bucharestPrime}</td>
                  <td className="py-3 px-4 text-neutral-200">{row.dubaiPrime}</td>
                  <td className="py-3 px-4 text-neutral-400 text-[11px]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Golden Visa Guide */}
      <section className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-neutral-950 via-[var(--surface-elevated)] to-amber-950/30 border border-amber-500/40 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Award className="w-4 h-4" />
            UAE Golden Visa • Cadrul Legal 2026
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Condiții de Eligibilitate pentru Rezidența pe 10 Ani prin Investiții Imobiliare
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed max-w-3xl">
            Rezidența Golden Visa acordă dreptul de ședere pe 10 ani pentru investitor, soț/soție și copii, fără a fi necesară prezența continuă în Emiratele Arabe Unite (nu expiră dacă proprietarul petrece mai mult de 6 luni în afara țării).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-serif text-neutral-300">
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
            <span className="text-amber-400 font-mono font-bold block text-[11px]">1. Prag Minim 2M AED</span>
            <p>
              Investiția totală în una sau mai multe proprietăți rezidențiale/comerciale trebuie să însumeze minimum 2.000.000 AED (~500.000 EUR).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
            <span className="text-amber-400 font-mono font-bold block text-[11px]">2. Off-Plan &amp; Credit Bancar</span>
            <p>
              Sunt eligibile proprietățile off-plan (cu avans plătit conform cerințelor DLD) și proprietățile achiziționate prin credit ipotecar la o bancă locală autorizată.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
            <span className="text-amber-400 font-mono font-bold block text-[11px]">3. Beneficii Fiscale Complete</span>
            <p>
              0% impozit pe venit personal, 0% impozit pe câștiguri de capital, repatrierea integrală a fondurilor și cont bancar local în AED/USD/EUR.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-500/20">
          <span className="text-xs font-mono text-neutral-400">
            Sursă: Dubai Land Department (DLD) &amp; ICP UAE
          </span>
          <a
            href="https://homefind.cristianvaduva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Consultanță Proprietăți Dubai via HomeFind</span>
            <ArrowRight className="w-4 h-4" />
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </section>

      {/* Statutory Disclaimer & Newsletter */}
      <DataDisclaimer type="real-estate" />

      <NewsletterBox
        overline="AiX Dubai Brief"
        headline="Rapoarte Trimestriale DLD &amp; Oportunități"
        description="Abonați-vă pentru a primi analizele comparative de randament și cele mai noi date cadastrale din Dubai."
      />
    </div>
  );
}
