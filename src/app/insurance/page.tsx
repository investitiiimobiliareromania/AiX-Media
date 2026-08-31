import { type Metadata } from "next";
import { articleService } from "@/services/article.service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import {
  Shield,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Home,
  AlertTriangle,
  Building2,
  Car,
  HeartPulse,
  Stethoscope,
  Plane,
  PackageCheck,
  Briefcase,
  HelpCircle,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Insurance & Risk Information | AiX Media",
  description:
    "Informații despre asigurări, protecția proprietăților, bunuri, persoane, vehicule și riscuri comerciale.",
  alternates: {
    canonical: `${siteConfig.url}/insurance`,
  },
};

export default async function InsurancePage() {
  const allArticles = await articleService.getPublishedArticles();
  const insuranceArticles = allArticles.filter(
    (art) =>
      art.category === "insurance" ||
      art.title.toLowerCase().includes("asigurare") ||
      art.title.toLowerCase().includes("patrimoniu") ||
      art.title.toLowerCase().includes("risc")
  );

  const checklistItems = [
    { num: "01", text: "Ce este efectiv asigurat (clădire, finisaje, bunuri, răspundere)?" },
    { num: "02", text: "Care este suma asigurată totală și cum se raportează la valoarea reală?" },
    { num: "03", text: "Care sunt limitele maxime de despăgubire pe eveniment?" },
    { num: "04", text: "Care sunt franșizele (suma sau procentul suportat de asigurat)?" },
    { num: "05", text: "Care sunt excluderile explicite stabilite în condițiile generale?" },
    { num: "06", text: "Există sub-limite specifice (ex: bijuterii, echipamente IT)?" },
    { num: "07", text: "Cum se calculează despăgubirea (valoare de nou vs. valoare de înlocuire cu uzură)?" },
    { num: "08", text: "Este acoperită valoarea de reconstrucție a imobilului?" },
    { num: "09", text: "Sunt bunurile personale ale membrilor familiei incluse în poliță?" },
    { num: "10", text: "Există acoperire pentru răspundere civilă față de terți / vecini?" },
    { num: "11", text: "Care sunt obligațiile de prevenire și întreținere ale asiguratului?" },
    { num: "12", text: "Care este procedura exactă de notificare a daunei și termenul legal?" },
  ];

  return (
    <div className="space-y-16 pb-24 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 1. Minimalist Editorial Header Banner */}
      <section className="p-8 md:p-12 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
              <Shield className="w-4 h-4 text-amber-500" />
              Insurance &amp; Risk Information
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Insurance &amp; Protecția Patrimoniului
            </h1>
            <p className="text-base md:text-lg text-neutral-300 font-serif leading-relaxed">
              Informații despre asigurări, protecția proprietăților, bunuri, persoane, vehicule și riscuri comerciale.
            </p>
          </div>

          <a
            href="https://insurance.cristianvaduva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[48px]"
          >
            <span>Request Insurance Analysis</span>
            <ArrowRight className="w-4 h-4" />
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </section>

      {/* 2. TIPURI DE ASIGURĂRI (01 TO 09 VISUAL CARDS) */}
      <section className="space-y-8">
        <div className="border-b border-[var(--border)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Categorii &amp; Concepte
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
              Tipuri de Asigurări &amp; Structura Acoperirilor
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">9 Categorii Principale</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 01 — ASIGURAREA LOCUINȚEI */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">01</span>
                <Home className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Asigurarea Locuinței
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Analiza structurii de protecție rezidențială: acoperirea clădirii, finisajelor, instalațiilor, bunurilor interioare și a răspunderii civile față de terți/vecini.
              </p>
              
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-300 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>PAD ≠ asigurare completă de locuință</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <a
                href="https://insurance.cristianvaduva.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>Protect Your Property</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 02 — PAD */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">02</span>
                <Shield className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Polița Obligatorie PAD
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Reglementată prin Legea 260/2008. Acoperă exclusiv 3 riscuri catastrofice naturale: cutremur, inundații naturale și alunecări de teren. Nu acoperă incendii, avarii de apă sau furt.
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Obligatorie prin lege pentru proprietari</li>
                <li className="flex items-center gap-1.5">• Acoperire plafonată de bază</li>
                <li className="flex items-center gap-1.5">• Necesită completare cu poliță facultativă</li>
              </ul>
            </div>
          </div>

          {/* 03 — ASIGURAREA FACULTATIVĂ */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">03</span>
                <Building2 className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Asigurarea Facultativă a Locuinței
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Extinde acoperirea la valoarea reală de piață a imobilului. Include riscuri de incendiu, explozie, avarii la instalațiile sanitare, furt, vandalism și răspundere civilă.
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Protecție clădire, finisaje &amp; mobilier</li>
                <li className="flex items-center gap-1.5">• Clauză răspundere civilă vecini</li>
                <li className="flex items-center gap-1.5">• Solicitată de bănci la credite ipotecare</li>
              </ul>
            </div>
          </div>

          {/* 04 — ASIGURAREA AUTO */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">04</span>
                <Car className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Asigurarea Auto (RCA vs. CASCO)
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Diferențierea dintre obligația legală RCA (despăgubirea prejudiciilor cauzate terților) și protecția facultativă CASCO (daune proprii, accidente, furt, vandalism, fenomene naturale).
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-amber-400 font-bold block">RCA</span>
                  <span className="text-neutral-400">Prejudicii terți</span>
                </div>
                <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-amber-400 font-bold block">CASCO</span>
                  <span className="text-neutral-400">Daune proprii &amp; furt</span>
                </div>
              </div>
            </div>
          </div>

          {/* 05 — ASIGURAREA DE VIAȚĂ */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">05</span>
                <HeartPulse className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Asigurarea de Viață
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Instrument de protecție financiară a familiei și beneficiarilor desemnați în cazul riscului de deces sau invaliditate. Polițe temporare de risc vs. produse cu componente speciale.
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Susținere financiară pentru dependenți</li>
                <li className="flex items-center gap-1.5">• Protecție atașată creditelor mari</li>
                <li className="flex items-center gap-1.5">• Sumă asigurată agreată contractual</li>
              </ul>
            </div>
          </div>

          {/* 06 — ASIGURAREA DE SĂNĂTATE */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">06</span>
                <Stethoscope className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Asigurarea de Sănătate
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Acoperirea cheltuielilor pentru consultații, investigații paraclinice, spitalizare și intervenții chirurgicale. Diferențiere clară față de un simplu abonament la clinici private.
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Rețele medicale extinse &amp; spitalizare</li>
                <li className="flex items-center gap-1.5">• Decontare directă sau rambursare</li>
                <li className="flex items-center gap-1.5">• Limite anuale &amp; perioade de așteptare</li>
              </ul>
            </div>
          </div>

          {/* 07 — ASIGURAREA DE CĂLĂTORIE */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">07</span>
                <Plane className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Asigurarea de Călătorie
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Mitigarea costurilor neprevăzute în străinătate: urgențe medicale, spitalizare de urgență, repatriere, pierdere sau întârziere bagaje, stornare / stornare bilet (storno).
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Acoperire tratamente de urgență peste hotare</li>
                <li className="flex items-center gap-1.5">• Clauză storno &amp; anulare zboruri</li>
                <li className="flex items-center gap-1.5">• Extensii pentru sporturi de agrement</li>
              </ul>
            </div>
          </div>

          {/* 08 — ASIGURAREA BUNURILOR */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">08</span>
                <PackageCheck className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Asigurarea Bunurilor &amp; Valorilor
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Protecția echipamentelor electronice, mobilierului de valoare, utilajelor sau colectiilor speciale. Înțelegerea diferenței dintre valoarea contabilă/de achiziție și suma asigurată.
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Evaluare individuală pe inventar</li>
                <li className="flex items-center gap-1.5">• Acoperire furt prin efracție &amp; daune</li>
                <li className="flex items-center gap-1.5">• Condiții specifice de depozitare/securitate</li>
              </ul>
            </div>
          </div>

          {/* 09 — ASIGURAREA PENTRU COMPANII */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">09</span>
                <Briefcase className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Asigurări Corporate &amp; Business Risk
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif">
                Soluții pentru companii: Property Damage, Business Interruption (pierderea profitului din întreruperea activității), Cyber Risk, Răspundere Generală &amp; D&amp;O (Directors &amp; Officers).
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-neutral-400">
                <li className="flex items-center gap-1.5">• Protecția activelor imobiliare comerciale</li>
                <li className="flex items-center gap-1.5">• Continuitate operațională &amp; stocuri</li>
                <li className="flex items-center gap-1.5">• Răspundere managerială și profesională</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHECKLIST: CE TREBUIE SĂ VERIFICI ÎNAINTE SĂ CUMPERI O POLIȚĂ */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-8 shadow-xl">
        <div className="border-b border-[var(--border)] pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            Checklist de Verificare
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Ce Trebuie Să Verifici Înainte Să Cumperi O Poliță
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif">
            Ghid practic în 12 puncte esențiale pentru evaluarea oricărui contract de asigurare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {checklistItems.map((item) => (
            <div
              key={item.num}
              className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-start gap-3.5"
            >
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 shrink-0">
                {item.num}
              </span>
              <p className="text-xs text-neutral-200 leading-relaxed font-serif">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. REAL EDITORIAL NEWS ARTICLES (IF PRESENT) */}
      {insuranceArticles.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-[var(--border)] pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Știri &amp; Informații Verificate
            </span>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Flux Editorial Asigurări &amp; Protecție
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}

      {/* 5. FINAL CTA SECTION: PROTECT WHAT YOU HAVE BUILT */}
      <section className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#0F1015] to-[var(--surface-elevated)] border border-amber-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-amber-500" />
            PROTECT WHAT YOU HAVE BUILT
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
            O poliță bună nu înseamnă doar o primă mai mică. Înseamnă acoperirea corectă a riscului.
          </h2>
          <p className="text-sm md:text-base text-neutral-300 font-serif leading-relaxed">
            Pentru o analiză personalizată a polițelor și evaluarea riscurilor patrimoniale, accesați platforma dedicată de consultanță.
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href="https://insurance.cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-xl cursor-pointer min-h-[48px]"
            >
              <span>Request Insurance Analysis</span>
              <ArrowRight className="w-4 h-4" />
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. GENERAL EDUCATIONAL DISCLAIMER */}
      <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] font-mono text-neutral-400 leading-relaxed">
        <span className="text-amber-500 font-bold uppercase mr-1">Notă Informativă:</span>
        Informațiile prezentate pe această pagină au caracter general și educațional și nu reprezintă ofertă financiară, recomandare personalizată sau contract de asigurare. Condițiile, criteriile și costurile diferă în funcție de produs, instituție și profilul clientului.
      </div>

      <DataDisclaimer type="general" />

      <NewsletterBox
        overline="AiX Insurance Brief"
        headline="Notificări &amp; Informații Asigurări"
        description="Abonați-vă pentru a primi informații actualizate privind domeniul asigurărilor și protecției proprietăților."
      />
    </div>
  );
}
