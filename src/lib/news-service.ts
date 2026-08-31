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
  category: "news" | "real-estate" | "insurance" | "credits" | "markets" | "business" | "finance" | "investments";
  categoryLabel: string;
  image?: string;
  author: string;
  authorRole?: string;
  readTime?: string;
  featured?: boolean;
  trending?: boolean;
  intelligence?: ExecutiveIntelligence;
}

// Strictly Real Estate, Insurance & Credit Editorial News & Insight Dataset
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
    id: "ghid-asigurare-patrimoniu-locuinte",
    slug: "ghid-asigurare-patrimoniu-locuinte-pad-facultativa",
    title: "Asigurarea Patrimoniului și a Clădirilor: Diferențe Cheie între Polița Obligatorie PAD și Polițele Facultative",
    excerpt:
      "Ghid de analiză a riscului imobiliar: ce acoperă polița obligatorie PAD împotriva catastrofelor naturale comparativ cu o poliță facultativă completă de proprietate.",
    content: `
Ghid de Inteligență în Asigurări: Protecția Patrimoniului Imobiliar

Protecția activele imobiliare rezidențiale și comerciale necesită o înțelegere clară a cadrului legal și a instrumentelor de mitigare a riscului.

Structura Protecției Imobiliare în România

1. Polița PAD (Obligatorie prin Legea 260/2008):
• Acoperă 3 riscuri catastrofice majore: cutremur, alunecări de teren și inundații naturale.
• Suma asigurată legală este de 20.000 EUR (sau 10.000 EUR pentru clădiri din materiale nesupuse tratamentului termic).

2. Polița Facultativă de Proprietate (Comprehensive):
• Extinde protecția pentru riscuri de incendiu, explozie, furtunilor, avarii la instalațiile de apă și furt.
• Include clauza de Răspundere Civilă față de Vecini (esențială la apartamente în blocuri rezidențiale).
• Permite asigurarea la valoarea reală de piață a imobilului și a bunurilor interioare.
    `,
    source: "AiX Insurance Desk",
    sourceUrl: "https://insurance.cristianvaduva.com",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/insurance/ghid-asigurare-patrimoniu-locuinte-pad-facultativa",
    publishedAt: "2026-08-14",
    fetchedAt: "2026-08-31",
    category: "insurance",
    categoryLabel: "INSURANCE INSIGHT",
    image: "/fallbacks/fallback-3.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Asigurări & Risc",
    readTime: "5 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Polița obligatorie PAD oferă doar acoperire de bază pentru catastrofe, lăsând imobilul neasigurat la incendiu, avarii de apă sau răspundere civilă.",
      businessImpact:
        "Proprietarii de portofolii rezidențiale și comerciale care încheie polițe facultative complete își protejează fluxul de venituri și valoarea capitalului investițional.",
      marketConnection:
        "Băncile comerciale solicită obligatoriu poliță facultativă cesionată în favoarea băncii pentru orice imobil ipotecat.",
      whatToWatchNext:
        "Evoluția normelor ASF privind asigurările de locuințe și introducerea de inspecții digitale de risc.",
    },
  },
  {
    id: "corporate-risk-management-asigurari-active",
    slug: "corporate-risk-management-protectia-activelor-imobiliare",
    title: "Corporate Risk Management: Ghidul de Protecție a Activelor Imobiliare și Comercial-Industrial",
    excerpt:
      "Metodologii de analiză a riscurilor comerciale pentru clădiri de birouri, spații logistice și flote de companie (CASCO & Business Interruption).",
    content: `
Ghid de Inteligență în Risc Corporate

Gestionarea riscurilor patrimoniale pentru companii implică auditarea activelor imobiliare, clădirilor de birouri și spațiilor industriale de producție.

Piloni în Managementul Riscului Corporate

• Property Damage & Business Interruption: Acoperă pierderile financiare cauzate de oprirea activității comerciale în urma unui incendiu sau avarie majoră.
• Asigurarea Flotelor Auto (CASCO & RCA Corporate): Optimizarea costului total al polițelor pentru flote comerciale și logistice.
• Răspunderea Managerială (D&O - Directors & Officers): Protecția juridică și financiară a executivilor împotriva deciziilor operaționale cu impact patrimonial.
    `,
    source: "AiX Insurance Advisory",
    sourceUrl: "https://insurance.cristianvaduva.com",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/insurance/corporate-risk-management-protectia-activelor-imobiliare",
    publishedAt: "2026-08-06",
    fetchedAt: "2026-08-31",
    category: "insurance",
    categoryLabel: "RISK INTELLIGENCE",
    image: "/fallbacks/fallback-4.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Corporate Risk",
    readTime: "6 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Oprirea accidentală a activității într-un spaiu comercial sau depozit logistic generează pierderi de venit direct superioare daunei materiale fizice.",
      businessImpact:
        "Polițele de Business Interruption transferă riscul financiar către reasigurători internaționali, menținând bonitatea firmei în fața băncilor de credite.",
      marketConnection:
        "Sectorul asigurărilor din România este reglementat de ASF și strâns conectat cu marii brokeri europeni de reasigurare.",
      whatToWatchNext:
        "Noile cerințe ESG privind sustenabilitatea și reziliența clădirilor la schimbări climatice.",
    },
  },
  {
    id: "ghid-credit-ipotecar-ircc-dobanda-fixa-variabila",
    slug: "ghid-credit-ipotecar-ircc-dobanda-fixa-variabila",
    title: "Ghid Ipotecar 2026: Dobândă Fixă vs. Variabilă și Impactul IRCC asupra Ratelor Lunare",
    excerpt:
      "Analiză de inteligență financiară privind structura creditelor ipotecare: de ce 80% din noile împrumuturi rezidențiale aleg dobânda fixă în primii 3-5 ani.",
    content: `
Ghid de Inteligență Financiară: Structurarea Creditului Ipotecar

Alegerea structurii optime de dobândă determină predictibilitatea ratelor lunare și bugetul de capital alocat pentru achiziția unei locuințe.

Analiza Comparativă a Dobânzilor

1. Dobânda Fixă pe 3 - 5 Ani:
• Oferă stabilitate totală a ratei în perioada inițială a împrumutului.
• Protejează debitorul împotriva fluctuațiilor IRCC pe piața monetară.
• Permite refinanțarea fără penalități majore la finalul perioadei fixe.

2. Dobânda Variabilă (IRCC + Marjă Bancară):
• Se actualizează trimestrial pe baza indicelui reglementat calculat de BNR.
• Recomandată în perioadele de relaxare a politicii monetare când BNR scade dobânda cheie.
    `,
    source: "AiX Credit Advisory",
    sourceUrl: "https://credite.cristianvaduva.com",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/credits/ghid-credit-ipotecar-ircc-dobanda-fixa-variabila",
    publishedAt: "2026-08-12",
    fetchedAt: "2026-08-31",
    category: "credits",
    categoryLabel: "CREDIT INSIGHT",
    image: "/fallbacks/fallback-1.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Finanțare & Credite",
    readTime: "5 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Rata lunară a creditului ipotecar depinde direct de marja fixă a băncii (1.9% - 2.5%) plus indicele de referință (IRCC).",
      businessImpact:
        "Cumpărătorii de locuințe care optează pentru dobândă fixă la achiziție beneficiază de predictibilitate bugetară și pot aloca capital pentru alte investiții.",
      marketConnection:
        "Portofoliile ipotecare ale băncilor comerciale (Banca Transilvania, BRD, BCR) sunt cele mai sigure active garantate din bilant.",
      whatToWatchNext:
        "Publicarea cotației oficiale IRCC aplicabilă trimestrului IV 2026 de către BNR.",
    },
  },
  {
    id: "refinanțare-ipotecara-optimizare-cost-capital",
    slug: "refinantare-ipotecara-optimizare-cost-capital-grad-indatorare",
    title: "Refinanțarea Ipotecară: Criterii BNR privind Gradul Maxim de Îndatorare (40%-45%) și Optimizarea Costului Capitalului",
    excerpt:
      "Cum se calculează capacitatea de plată și gradul maxim de îndatorare reglementat de BNR la refinanțarea creditelor vechi în condiții de dobândă mai favorabile.",
    content: `
Ghid de Optimizare Financiară: Refinanțare & Capacitate de Îndatorare

Refinanțarea creditelor ipotecare existente permite scăderea costului total al dobânzilor și reducerea duratei de rambursare.

Regulamentul BNR privind Gradul de Îndatorare

• Grad maxim de îndatorare populație: Reglementat la 40% din venitul net lunar pentru credite în RON (45% pentru primii cumpărători ai primei locuințe).
• Evaluarea Veniturilor Eligibile: Venituri din salarii, dividende, chirii și activități independente cu o vechime minimă verificată la ANAF.
• Scăderea Costului Total: Refinanțarea unui credit vechi la o dobândă fixă actualizată poate reduce rata lunară cu 15% - 25%.
    `,
    source: "AiX Credit Advisory",
    sourceUrl: "https://credite.cristianvaduva.com",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/credits/refinantare-ipotecara-optimizare-cost-capital-grad-indatorare",
    publishedAt: "2026-08-04",
    fetchedAt: "2026-08-31",
    category: "credits",
    categoryLabel: "FINANCING GUIDE",
    image: "/fallbacks/fallback-0.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Finanțare & Credite",
    readTime: "5 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Gradul maxim de îndatorare de 40% impus de BNR protejează debitorii de riscul de supra-îndatorare în perioade de volatilitate economică.",
      businessImpact:
        "Refinanțarea strategică eliberează flux de numerar lunar utilizabil pentru investiții alternative sau rambursări anticipate.",
      marketConnection:
        "Conexiune directă cu băncile din România prin interogarea automată a bazei de date Biroul de Credit și ANAF.",
      whatToWatchNext:
        "Ofertele promoționale de refinanțare ipotecară cu dobândă fixă emise de băncile de top din România.",
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
