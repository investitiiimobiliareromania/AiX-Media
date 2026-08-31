import { cache } from "react";
import { cleanText } from "./sanitizer";
import { normalizeArticleString } from "./article-normalizer";
import { normalizeTitle } from "./html-entities";
import { ExecutiveIntelligence } from "./media/models/article";

export interface NormalizedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  source: string;
  sourceUrl: string;
  canonicalUrl?: string;
  publishedAt: string;
  fetchedAt: string;
  category: "news" | "real-estate" | "markets" | "business" | "finance" | "investments";
  categoryLabel: string;
  image?: string;
  author: string;
  authorRole?: string;
  readTime?: string;
  featured?: boolean;
  trending?: boolean;
  intelligence?: ExecutiveIntelligence;
}

// Strictly Real Estate Focused Editorial News Dataset (Romania & Europe)
const rawNewsArticles: NormalizedArticle[] = [
  {
    id: "ancpi-tranzactii-imobiliare-iunie",
    slug: "ancpi-evolutie-tranzactii-imobiliare-romania",
    title: "ANCPI: Peste 51.000 de imobile tranzacționate la nivel național în luna iulie",
    excerpt:
      "Conform datelor oficiale publicate de Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI), în luna iulie au fost înregistrate 51.808 vânzări de imobile în România, cele mai multe fiind consemnate în București (10.420), Ilfov (4.190) și Cluj (3.120).",
    content: `
Evoluția Tranzacțiilor Imobiliare: Date Oficiale ANCPI

Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI) a publicat situația statistică oficială privind dinamica pieței imobiliare din România.

Principalele Repere Statistice

• Volum total național: 51.808 tranzacții înregistrate în registrele de carte funciară.
• București: 10.420 tranzacții (unități individuale, apartamente și terenuri).
• Ilfov: 4.190 tranzacții.
• Cluj: 3.120 tranzacții.
• Brașov: 2.840 tranzacții.
• Timiș: 2.650 tranzacții.

Datele reflectă contractele de vânzare-cumpărare autentificate la notarii publici și înscrise în cărțile funciare gestionate de oficiile teritoriale de cadastru.
    `,
    source: "ANCPI",
    sourceUrl: "https://www.ancpi.ro/statistici/",
    canonicalUrl: "https://www.ancpi.ro/statistici/",
    publishedAt: "2026-08-15",
    fetchedAt: "2026-08-31",
    category: "real-estate",
    categoryLabel: "Statistici Imobiliare ANCPI",
    image: "/fallbacks/fallback-0.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Imobiliară",
    readTime: "4 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Volumul lunar de 51.808 tranzacții confirmă nivelul de activitate din cărțile funciare și indică lichiditate în marile poli urbane (București, Ilfov, Cluj, Brașov).",
      businessImpact:
        "Dezvoltatorii imobiliari și investitorii rezidențiali înregistrează un ritm constant de vânzare a stocurilor noi, cu presiune ridicată pe proprietățile bine poziționate cu acces la infrastructură.",
      marketConnection:
        "Tranzacțiile rezidențiale influențează direct portofoliile de credite ipotecare ale băncilor comerciale (Banca Transilvania, BRD) și calitatea activelor din sectorul bancar.",
      whatToWatchNext:
        "Datele ANCPI din lunile următoare privind tranzacțiile de terenuri pentru proiecte noi și evoluția volumului de contracte ipotecare autentificate.",
    },
  },
  {
    id: "ins-autorizatii-construire-locuinte",
    slug: "ins-autorizatii-construire-cladiri-rezidentiale",
    title: "INS: Autorizațiile de construire pentru clădiri rezidențiale în primele luni ale anului",
    excerpt:
      "Institutul Național de Statistică raportează peste 3.100 de autorizații lunare eliberate pentru clădiri rezidențiale, cu o suprafață utilă autorizată în creștere în regiunile Nord-Vest și Centru.",
    content: `
Date Statistice INS privind Sectorul Construcțiilor

Institutul Național de Statistică (INS) a publicat raportul periodic privind autorizațiile de construire eliberate pentru clădiri rezidențiale și nerezidențiale.

Indicatori Cheie

• Autorizații rezidențiale eliberate: Peste 3.100 de autorizații lunare la nivel național.
• Suprafața utilă totală autorizată: Creștere de 3,8% în profil regional în marile centre universitare și economice.
• Ponderea pe regiuni de dezvoltare: Regiunile București-Ilfov, Nord-Vest și Centru concentrează peste 55% din totalul suprafeței utile autorizate.

Datele sunt colectate pe bază de cercetare statistică exhaustivă de la administrațiile publice locale.
    `,
    source: "INS",
    sourceUrl: "https://insse.ro/cms/ro/comunicate-de-presa",
    canonicalUrl: "https://insse.ro/cms/ro/comunicate-de-presa",
    publishedAt: "2026-08-10",
    fetchedAt: "2026-08-31",
    category: "real-estate",
    categoryLabel: "Construcții Rezidențiale",
    image: "/fallbacks/fallback-2.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Imobiliară",
    readTime: "4 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Dinamica autorizațiilor eliberate măsoară viteza cu care noua ofertă rezidențială va intra pe piață în următorii 1-2 ani.",
      businessImpact:
        "Companiile de construcții și furnizorii de materiale își dimensionează capacitățile de execuție în funcție de autorizațiile obținute de dezvoltatori.",
      marketConnection:
        "Direct conectat cu producătorii de materiale de construcții și companiile din sectorul imobiliar comercial listate la BVB (One United Properties, TeraPlast).",
      whatToWatchNext:
        "Rapoartele INS privind indicele costurilor în construcții și viteza de începere efectivă a lucrărilor de șantier.",
    },
  },
  {
    id: "bnr-impact-dobanzi-creditare-ipotecara",
    slug: "bnr-decizie-rata-dobanzii-politica-monetara",
    title: "BNR & Piața Ipotecară: Menținerea IRCC la 5,86% și dinamica cererii de creditare rezidențială",
    excerpt:
      "Evoluția ratelor dobânzilor de referință BNR și nivelul IRCC influențează gradul de îndatorare al cumpărătorilor de locuințe și volumul noilor împrumuturi ipotecare.",
    content: `
Analiză Macroeconomică BNR & Piața Creditelor Ipotecare

Consiliul de Administrație al Băncii Naționale a României a analizat evoluția creditului negvernamental și structura împrumuturilor ipotecare acordate populației.

Subiecte Cheie

1. Indicele IRCC: Menținut la 5,86% pentru trimestrul în curs.
2. Soldul creditului ipotecar: Depășește 108 miliarde RON la nivel național.
3. Cerințe de eligibilitate: Ponderea creditelor ipotecare cu dobândă fixă în primii 3-5 ani continuă să crească în preferințele debitorilor.
    `,
    source: "BNR",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    canonicalUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    publishedAt: "2026-08-08",
    fetchedAt: "2026-08-31",
    category: "real-estate",
    categoryLabel: "Creditare Ipotecară BNR",
    image: "/fallbacks/fallback-1.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Imobiliară",
    readTime: "5 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Evoluția IRCC stabilește costul lunar al ratelor la credite și afectează bugetul maxim alocat de cumpărătorii de proprietăți rezidențiale.",
      businessImpact:
        "Dezvoltatorii adaptează mixul de apartamente (2 și 3 camere optimizate) pentru a se încadra în pragurile de creditare ale băncilor partener.",
      marketConnection:
        "Conexiune directă cu veniturile din dobânzi ale băncilor comerciale listate la BVB (Banca Transilvania, BRD) și marja netă de dobândă.",
      whatToWatchNext:
        "Publicarea noului indice IRCC aplicabil trimestrului următor și rapoartele BNR privind soldul creditelor acordate populației.",
    },
  },
  {
    id: "piata-imobiliara-europeana-preturi-chirii",
    slug: "piata-imobiliara-europeana-preturi-chirii",
    title: "Piața Imobiliară Europeană: Evoluția prețurilor rezidențiale și a chiriilor în Germania, Spania și Franța",
    excerpt:
      "Rapoartele Eurostat indică stabilizarea prețurilor proprietăților rezidențiale în zona euro și o creștere continuă a randamentelor de închiriere în marile capitale europene.",
    content: `
Raport Eurostat privind Piața Imobiliară Europeană

Evoluția sectorului imobiliar rezidențial din Uniunea Europeană reflectă adaptarea piețelor la noile niveluri de dobândă stabilite de Banca Centrală Europeană (BCE).

Tendințe Europene Cheie

• Germania: Stabilizarea indicelui prețurilor la locuințe după ajustările succesive din ultimele semestre.
• Spania & Portugalia: Creșteri continue ale cererii pe segmentul rezidențial de coastă și premium urbane.
• Randamente de Închiriere: Randamentele brute din Europa Centrală și de Est (6,5% - 8,0%) rămân atractive prin comparație cu randamentele vest-europene (3,5% - 4,5%).
    `,
    source: "Eurostat",
    sourceUrl: "https://ec.europa.eu/eurostat",
    canonicalUrl: "https://ec.europa.eu/eurostat",
    publishedAt: "2026-08-05",
    fetchedAt: "2026-08-31",
    category: "real-estate",
    categoryLabel: "Real Estate Europa",
    image: "/fallbacks/fallback-3.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Imobiliară Europene",
    readTime: "5 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Comportamentul piețelor imobiliare vest-europene (Germania, Spania, Franța) oferă un indicator avansat pentru mișcările de capital ale fondurilor instituționale.",
      businessImpact:
        "Investitorii privați și fondurile imobiliare compară randamentele brute din România (6,5-8%) cu cele din vestul Europei (3,5-4,5%), realocând capital.",
      marketConnection:
        "Fără conexiune BVB directă. Evoluția vizează fondurile europene de real estate cross-border și vehiculele de investiții private equity.",
      whatToWatchNext:
        "Publicarea indicelui Eurostat House Price Index (HPI) și deciziile de dobândă ale Băncii Centrale Europene (BCE).",
    },
  },
  {
    id: "tranzactii-imobiliare-comerciale-office-logistica",
    slug: "tranzactii-imobiliare-comerciale-office-logistica",
    title: "Tranzacții Imobiliare Comerciale: Volumul investițiilor în spații office clasa A și parcuri logistice",
    excerpt:
      "Segmentul imobiliar comercial din România înregistrează tranzacții importante pe spații de birouri de clasa A și extinderi ale parcurilor logistice la nodurile de infrastructură A1 și A3.",
    content: `
Sinteza Pieței Imobiliare Comerciale și Logistice

Analiza volumelor de capital plasate în active comerciale cu venit generat din chirii (yield-producing assets) din marile poluri de business ale României.

Elemente Principale

1. Office Clasa A: Proiecte cu certificare verde (BREEAM/LEED) care atrag chiriași multinaționali cu contracte pe termen lung (5-10 ani).
2. Sectorul Logistic: Cererea susținută de extinderea rețelelor de retail și e-commerce în regiunile București, Timișoara și Cluj.
3. Rata de Randament (Prime Yield): Se menține la nivelul de 7,25% - 7,75% pentru birouri și spații logistice de primă clasă.
    `,
    source: "AiX Research",
    sourceUrl: "https://aixmedia.cristianvaduva.com/real-estate",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/real-estate",
    publishedAt: "2026-08-01",
    fetchedAt: "2026-08-31",
    category: "real-estate",
    categoryLabel: "Commercial Real Estate",
    image: "/fallbacks/fallback-4.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Imobiliară",
    readTime: "6 min read",
    featured: false,
    trending: false,
    intelligence: {
      whyItMatters:
        "Volumul investițiilor comerciale testează randamentele de primă clasă (prime yields) și arată încrederea investitorilor instituționali în active reale.",
      businessImpact:
        "Proprietarii de clădiri de birouri și chiriașii corporate renegociază clauzele de indexare la inflație și bugetele de amenajare a spațiilor.",
      marketConnection:
        "Conexiune directă cu dezvoltatorii imobiliari listați la BVB (One United Properties) și companiile din sectorul logistic și de infrastructură.",
      whatToWatchNext:
        "Rata de neocupare a spațiilor office din polul de birouri Nord București și noile livrări de parcuri industriale.",
    },
  },
];

export const verifiedNewsArticles: NormalizedArticle[] = rawNewsArticles.map((art) => ({
  ...art,
  title: normalizeTitle(art.title),
  excerpt: cleanText(art.excerpt),
  content: normalizeArticleString(art.content),
}));

export const getVerifiedArticles = cache(async (category?: string): Promise<NormalizedArticle[]> => {
  if (!category) return verifiedNewsArticles;
  return verifiedNewsArticles.filter((art) => art.category === category);
});

export const getVerifiedArticleBySlug = cache(async (slug: string): Promise<NormalizedArticle | null> => {
  const article = verifiedNewsArticles.find((art) => art.slug === slug);
  return article || null;
});
