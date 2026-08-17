export type CategorySlug =
  | "news"
  | "markets"
  | "business"
  | "real-estate"
  | "investments"
  | "finance"
  | "radio"
  | "tv"
  | "podcasts"
  | "academy";

export interface MarketSignal {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface IntelligenceMetric {
  label: string;
  value: string;
  change?: string;
  subtext: string;
  isPositive?: boolean;
  source?: string;
  date?: string;
  publishedAt?: string;
  fetchedAt?: string;
  isDelayed?: boolean;
}

export interface CategoryConfig {
  slug: CategorySlug;
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel: string;
  marketSignals: MarketSignal[];
  intelligenceMetrics: IntelligenceMetric[];
  dashboardTitle: string;
  dashboardDescription: string;
  featuredInsightHeadline: string;
  featuredInsightExcerpt: string;
  newsletterOverline: string;
  newsletterHeadline: string;
  newsletterDescription: string;
}

export const categoryConfigs: Record<CategorySlug, CategoryConfig> = {
  "news": {
    slug: "news",
    title: "Știri & Analize Macroeconomice",
    eyebrow: "AiX Editorial Desk",
    headline: "Flux de informații macroeconomice și decizii instituționale.",
    description:
      "Rapoarte structurate pe baza comunicatelor oficiale emise de BNR, Guvernul României, INS și instituțiile financiare europene.",
    ctaLabel: "Explorează Rapoartele",
    marketSignals: [
      { label: "Dobândă BNR", value: "6.50%", change: "August 2026", isPositive: true },
      { label: "ROBOR 3M", value: "5.58%", change: "Oficial BNR", isPositive: true },
      { label: "IRCC T3", value: "5.86%", change: "Oficial BNR", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Rată Politică Monetară", value: "6.50%", subtext: "Banca Națională a României", source: "BNR", isPositive: true },
      { label: "Indice ROBOR 3M", value: "5.58%", subtext: "Piața interbancară", source: "BNR", isPositive: true },
      { label: "Indice IRCC", value: "5.86%", subtext: "Trimestrul III 2026", source: "BNR", isPositive: true },
      { label: "Tranzacții Imobiliare Lunare", value: "51.808", subtext: "Date naționale ANCPI", source: "ANCPI", isPositive: true },
    ],
    dashboardTitle: "Indicatori Macroeconomici Oficiali",
    dashboardDescription: "Date preluate direct din sursele oficiale BNR, INS și ANCPI.",
    featuredInsightHeadline: "Decizia BNR privind Rata Dobânzii de Politică Monetară",
    featuredInsightExcerpt: "Analiza impactului deciziilor de politică monetară asupra creditării companiilor și populației.",
    newsletterOverline: "AiX Editorial Brief",
    newsletterHeadline: "Sinteza Macroeconomică",
    newsletterDescription: "Primiți analizele structurate și indicatorii oficiali direct pe email.",
  },
  "markets": {
    slug: "markets",
    title: "Piețe de Capital & Cotații BNR",
    eyebrow: "AiX Markets Desk",
    headline: "Cotații oficiale de referință BNR și rapoarte de bursă.",
    description:
      "Monitorizarea cursului de schimb oficial BNR, a ratelor interbancare și a situațiilor financiare ale societăților listate la BVB.",
    ctaLabel: "Vezi Cotațiile",
    marketSignals: [
      { label: "EUR / RON", value: "4.9775", change: "Curs BNR", isPositive: true },
      { label: "USD / RON", value: "4.5620", change: "Curs BNR", isPositive: true },
      { label: "Indice ROBOR 3M", value: "5.58%", change: "Interbancar", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "EUR / RON (Referință)", value: "4.9775", subtext: "Curs oficial BNR", source: "BNR", isPositive: true },
      { label: "USD / RON (Referință)", value: "4.5620", subtext: "Curs oficial BNR", source: "BNR", isPositive: true },
      { label: "ROBOR 3M", value: "5.58%", subtext: "Piața monetară", source: "BNR", isPositive: true },
      { label: "IRCC Trimestrial", value: "5.86%", subtext: "Credite consumatori", source: "BNR", isPositive: true },
    ],
    dashboardTitle: "Tablou de Bord Monetar & FX",
    dashboardDescription: "Cotații de referință și benchmark-uri oficiale.",
    featuredInsightHeadline: "Evoluția Lichidității Bancare și a Dobânzilor Interbancare",
    featuredInsightExcerpt: "Analiza volumelor tranzacționate pe piața monetară și a randamentelor titlurilor de stat.",
    newsletterOverline: "AiX Markets Brief",
    newsletterHeadline: "Sinteza Financiară Săptămânală",
    newsletterDescription: "Comentarii și evoluții privind cotațiile de referință și piața de capital.",
  },
  "business": {
    slug: "business",
    title: "Business & Companii",
    eyebrow: "AiX Corporate Intelligence",
    headline: "Dinamica marilor companii și expansiunea regională.",
    description:
      "Rapoarte de analiză corporativă, tranzacții de fuziuni și achiziții și rezultatele companiilor din economia reală.",
    ctaLabel: "Citește Analizele",
    marketSignals: [
      { label: "BVB Companii", value: "Top Emitenți", change: "Piața Reglementată", isPositive: true },
      { label: "Rapoarte Financiare", value: "Anuale & Semestriale", change: "Verificat", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Banca Transilvania (TLV)", value: "28.50 RON", subtext: "Simbol BVB TLV", source: "BVB", isPositive: true },
      { label: "Hidroelectrica (H2O)", value: "124.00 RON", subtext: "Simbol BVB H2O", source: "BVB", isPositive: true },
      { label: "OMV Petrom (SNP)", value: "0.745 RON", subtext: "Simbol BVB SNP", source: "BVB", isPositive: true },
      { label: "One United Properties (ONE)", value: "0.58 RON", subtext: "Simbol BVB ONE", source: "BVB", isPositive: true },
    ],
    dashboardTitle: "Monitor Companii Verificate BVB",
    dashboardDescription: "Date preluate din raportările oficiale ale emitenților.",
    featuredInsightHeadline: "Rezultatele Financiare ale Campionilor Economici din România",
    featuredInsightExcerpt: "Evaluarea performanțelor de bilanț, veniturilor și dividendelor raportate de principalele companii.",
    newsletterOverline: "AiX Business Insider",
    newsletterHeadline: "Sinteza Corporativă",
    newsletterDescription: "Analize aprofundate privind deciziile de investiții și rezultatele marilor firme.",
  },
  "real-estate": {
    slug: "real-estate",
    title: "Inteligență Imobiliară & ANCPI",
    eyebrow: "AiX Real Estate Desk",
    headline: "Date verificate privind tranzacțiile imobiliare, autorizațiile INS și dobânzile.",
    description:
      "Statistici oficiale ANCPI, evoluția autorizațiilor de construire INS și dinamica creditelor ipotecare BNR.",
    ctaLabel: "Vezi Datele Imobiliare",
    marketSignals: [
      { label: "Tranzacții Naționale", value: "51.808", change: "Iunie 2026 (ANCPI)", isPositive: true },
      { label: "București Imobile", value: "10.420", change: "Lider Național (ANCPI)", isPositive: true },
      { label: "Credit Ipotecar", value: "108.4 Mld", change: "Sold BNR", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Tranzacții Imobile Național", value: "51.808", subtext: "Raport oficial ANCPI", source: "ANCPI", isPositive: true },
      { label: "Tranzacții București", value: "10.420", subtext: "Cea mai activă piață", source: "ANCPI", isPositive: true },
      { label: "Autorizații Rezidențiale", value: "3.124", subtext: "Date lunare INS", source: "INS", isPositive: true },
      { label: "Creditare Ipotecară (Sold)", value: "108.4 Mld RON", subtext: "Statistici monetare BNR", source: "BNR", isPositive: true },
    ],
    dashboardTitle: "Tablou Oficial Date Imobiliare",
    dashboardDescription: "Cifre verificate direct din rapoartele ANCPI, INS și BNR.",
    featuredInsightHeadline: "Volumul Tranzacțiilor Imobiliare: Radiografia Județeană ANCPI",
    featuredInsightExcerpt: "Analiza detaliată a celor 51.808 tranzacții înregistrate la nivel național și a cererii de credit ipotecar.",
    newsletterOverline: "AiX Real Estate Brief",
    newsletterHeadline: "Monitorul Imobiliar Lunar",
    newsletterDescription: "Date agregate din cadastru, autorizații de construire și statistici bancare.",
  },
  "investments": {
    slug: "investments",
    title: "Investiții & Fonduri Private",
    eyebrow: "AiX Capital & Funds",
    headline: "Alocarea capitalului instituțional și active private.",
    description:
      "Sinteze privind investițiile instituționale, fondurile de pensii Pilon II și emisiunile de titluri de stat.",
    ctaLabel: "Vezi Rapoartele",
    marketSignals: [
      { label: "Titluri Fidelis", value: "Emisiuni MF", change: "Oficial", isPositive: true },
      { label: "Pilon II Pensii", value: "Active Administrate", change: "ASF", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Rată Dobândă BNR", value: "6.50%", subtext: "Politică monetară", source: "BNR", isPositive: true },
      { label: "ROBOR 3M", value: "5.58%", subtext: "Piața monetară", source: "BNR", isPositive: true },
      { label: "IRCC", value: "5.86%", subtext: "Indice reglementat", source: "BNR", isPositive: true },
      { label: "Capital BVB", value: "Companii Verificate", subtext: "Piața de capital", source: "BVB", isPositive: true },
    ],
    dashboardTitle: "Indicatori Fonduri & Investiții",
    dashboardDescription: "Date și benchmark-uri oficiale privind randamentele ajustate la risc.",
    featuredInsightHeadline: "Structura Alocării Activelor Fondurilor Instituționale",
    featuredInsightExcerpt: "Cum sunt distribuite plasamentele în titluri de stat, acțiuni BVB și instrumente cu venit fix.",
    newsletterOverline: "AiX Capital Brief",
    newsletterHeadline: "Raportul Săptămânal de Investiții",
    newsletterDescription: "Analize privind randamentele obligațiunilor și oportunitățile din piața de capital.",
  },
  "finance": {
    slug: "finance",
    title: "Finanțe & Politică Monetară",
    eyebrow: "AiX Banking & Rates",
    headline: "Indicatori monetari, sistem bancar și creditare.",
    description:
      "Monitorizarea deciziilor BNR, a indicilor ROBOR/IRCC și a stabilității financiare a sistemului bancar.",
    ctaLabel: "Vezi Indicatorii BNR",
    marketSignals: [
      { label: "Rată Cheie BNR", value: "6.50%", change: "Oficial BNR", isPositive: true },
      { label: "ROBOR 3M", value: "5.58%", change: "Interbancar", isPositive: true },
      { label: "IRCC T3", value: "5.86%", change: "Consumatori", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Dobândă de Politică Monetară", value: "6.50%", subtext: "Decizie CA BNR", source: "BNR", isPositive: true },
      { label: "Rata ROBOR 3M", value: "5.58%", subtext: "Piața interbancară", source: "BNR", isPositive: true },
      { label: "Rata ROBOR 6M", value: "5.62%", subtext: "Piața interbancară", source: "BNR", isPositive: true },
      { label: "Indice IRCC", value: "5.86%", subtext: "Trimestrul III 2026", source: "BNR", isPositive: true },
    ],
    dashboardTitle: "Tablou Monetar BNR",
    dashboardDescription: "Rate oficiale de referință și benchmark-uri de creditare.",
    featuredInsightHeadline: "Transmisia Politicii Monetare în Creditarea Bancară",
    featuredInsightExcerpt: "Evaluarea impactului dobânzilor BNR asupra volumului de credite noi acordate populației și companiilor.",
    newsletterOverline: "AiX Banking Brief",
    newsletterHeadline: "Sinteza Monetară BNR",
    newsletterDescription: "Deciziile BNR și evoluția dobânzilor de referință direct pe email.",
  },
  "radio": {
    slug: "radio",
    title: "AiX Business Radio",
    eyebrow: "AiX Audio Broadcast",
    headline: "Sinteze audio economice și analize de piață.",
    description:
      "Emisiuni audio structurate privind politica monetară BNR, piața imobiliară și companiile listate la bursă.",
    ctaLabel: "Ascultă Emisiunile",
    marketSignals: [
      { label: "Format", value: "Analize Economice", change: "Grilă Săptămânală", isPositive: true },
      { label: "Sursă", value: "AiX Media Desk", change: "Verificat", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Emisiuni Înregistrate", value: "3 Programe", subtext: "Grilă editorială", source: "AiX Media", isPositive: true },
      { label: "Matinal Economic", value: "08:00 EEST", subtext: "Sinteza de dimineață", source: "AiX Media", isPositive: true },
      { label: "Punctul pe Piață", value: "13:00 EEST", subtext: "Analiză cotații BNR", source: "AiX Media", isPositive: true },
      { label: "Sinteza Zilei", value: "18:00 EEST", subtext: "Rezumatul piețelor", source: "AiX Media", isPositive: true },
    ],
    dashboardTitle: "Grila de Programe Radio",
    dashboardDescription: "Emisiuni și orar de difuzare pe teme economice și financiare.",
    featuredInsightHeadline: "Sinteza Radio: Deciziile Monetare BNR și Piața Imobiliară",
    featuredInsightExcerpt: "Ascultați comentariul complet pe marginea celor mai recente date publicate de BNR și ANCPI.",
    newsletterOverline: "AiX Radio Brief",
    newsletterHeadline: "Rezumatul Emisiunilor Radio",
    newsletterDescription: "Transcrierea discuțiilor și principalele concluzii din emisiunile săptămânii.",
  },
  "tv": {
    slug: "tv",
    title: "AiX TV & Analize Video",
    eyebrow: "AiX Video Desk",
    headline: "Prezentări video și analize economice verificate.",
    description:
      "Catalog video structurat cu prezentări macroeconomice și analize realizate de Cristian Văduva.",
    ctaLabel: "Urmărește Prezentările",
    marketSignals: [
      { label: "Canal Video", value: "Cristian Văduva", change: "Canal Oficial", isPositive: true },
      { label: "Calitate", value: "Full HD", change: "Video Verificat", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Videoclipuri Disponibile", value: "Catalog Oficial", subtext: "YouTube Cristian Văduva", source: "YouTube", isPositive: true },
      { label: "Prezentări Principale", value: "Analiză & Strategie", subtext: "Format extins", source: "AiX TV", isPositive: true },
      { label: "Clipuri Scurte", value: "Shorts Oficiale", subtext: "Format vertical 9:16", source: "YouTube", isPositive: true },
      { label: "Subiecte Cheie", value: "Imobiliare & BNR", subtext: "Economie & Afaceri", source: "AiX Media", isPositive: true },
    ],
    dashboardTitle: "Monitor Video AiX TV",
    dashboardDescription: "Catalogul producțiilor video verificate.",
    featuredInsightHeadline: "Prezentare Video: Structura Pieței Imobiliare și Datele ANCPI",
    featuredInsightExcerpt: "Urmăriți analiza video completă a dinamicii tranzacțiilor și a evoluției dobânzilor.",
    newsletterOverline: "AiX Video Alert",
    newsletterHeadline: "Notificări Video Noi",
    newsletterDescription: "Primiți notificări la publicarea noilor analize video și prezentări.",
  },
  "podcasts": {
    slug: "podcasts",
    title: "Podcasts & Dialoguri Economice",
    eyebrow: "AiX Audio Intelligence",
    headline: "Episoade audio structurate privind economia și piețele de capital.",
    description:
      "Dialoguri și masterclasses axate pe transparența datelor financiare, investiții și dezvoltare de proiecte.",
    ctaLabel: "Explorează Episoadele",
    marketSignals: [
      { label: "Catalog Episoade", value: "Audio Oficial", change: "Masterclass", isPositive: true },
      { label: "Acces", value: "Gratuit", change: "Educațional", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Episoade Disponibile", value: "Catalog Activ", subtext: "Serii educaționale", source: "AiX Media", isPositive: true },
      { label: "Durată Medie", value: "35 - 45 min", subtext: "Format detaliat", source: "AiX Media", isPositive: true },
      { label: "Teme Principale", value: "Imobiliare & BVB", subtext: "Analiză de date", source: "AiX Media", isPositive: true },
      { label: "Realizator", value: "Cristian Văduva", subtext: "AiX Media", source: "AiX Media", isPositive: true },
    ],
    dashboardTitle: "Catalog Audio AiX Podcasts",
    dashboardDescription: "Serii tematice de analiză economică și financiară.",
    featuredInsightHeadline: "Episod Recomandat: Modelarea Randamentelor Imobiliare",
    featuredInsightExcerpt: "O sinteză audio completă privind metodologia de calcul a randamentelor și riscurilor în piața imobiliară.",
    newsletterOverline: "AiX Podcast Alert",
    newsletterHeadline: "Sinteza Episoadelor Audio",
    newsletterDescription: "Concluziile principale și notițele din fiecare episod lansat.",
  },
  "academy": {
    slug: "academy",
    title: "Intelligence Academy & Ghiduri",
    eyebrow: "AiX Executive Education",
    headline: "Ghiduri metodologice și cadre practice de analiză economică.",
    description:
      "Materiale educaționale structurate pentru înțelegerea pieței imobiliare, evaluarea companiilor și analiza indicatorilor BNR.",
    ctaLabel: "Vezi Ghidurile",
    marketSignals: [
      { label: "Module Metodologice", value: "Structurate", change: "Ghid Practic", isPositive: true },
      { label: "Nivel", value: "Executiv & Avansat", change: "Verificat", isPositive: true },
    ],
    intelligenceMetrics: [
      { label: "Ghiduri Disponibile", value: "3 Module Cheie", subtext: "Metodologie practică", source: "AiX Media", isPositive: true },
      { label: "Nivel de Expertiză", value: "Avansat & Executiv", subtext: "Profesioniști & Investitori", source: "AiX Media", isPositive: true },
      { label: "Baze de Date", value: "ANCPI / INS / BNR", subtext: "Surse verificate", source: "Oficial", isPositive: true },
      { label: "Format", value: "Documentare Structurată", subtext: "Fără costuri", source: "AiX Media", isPositive: true },
    ],
    dashboardTitle: "Programe & Ghiduri Metodologice",
    dashboardDescription: "Cadre practice de analiză economică și financiară.",
    featuredInsightHeadline: "Ghid Metodologic: Analiza Tranzacțiilor ANCPI și Calculul Randamentului",
    featuredInsightExcerpt: "Cum se interpretează corect datele din cadastre și dinamica volumelor de tranzacții.",
    newsletterOverline: "AiX Academy Brief",
    newsletterHeadline: "Ghidurile Lunare de Analiză",
    newsletterDescription: "Primiți noi metodologii și instrumente de analiză direct pe email.",
  },
};
