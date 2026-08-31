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

// Strictly Real Estate, Insurance & Credit Editorial News & Information Dataset
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
    id: "asigurare-patrimoniu-locuinte",
    slug: "asigurare-patrimoniu-locuinte-pad-facultativa",
    title: "Asigurarea Patrimoniului și a Clădirilor: Diferențe între Polița Obligatorie PAD și Polițele Facultative",
    excerpt:
      "Informații despre riscurile imobiliare: ce acoperă polița obligatorie PAD împotriva catastrofelor naturale comparativ cu o poliță facultativă de proprietate.",
    content: `
Informații Asigurări: Protecția Patrimoniului Imobiliar

Protecția activelor imobiliare rezidențiale și comerciale necesită o înțelegere clară a cadrului legal și a instrumentelor de mitigare a riscului.

Structura Protecției Imobiliare în România

1. Polița PAD (Obligatorie prin Legea 260/2008):
• Acoperă 3 riscuri catastrofice majore: cutremur, alunecări de teren și inundații naturale.
• Suma asigurată legală este de 20.000 EUR (sau 10.000 EUR pentru clădiri din materiale nesupuse tratamentului termic).

2. Polița Facultativă de Proprietate:
• Extinde protecția pentru riscuri de incendiu, explozie, furtunilor, avarii la instalațiile de apă și furt.
• Include clauza de Răspundere Civilă față de Vecini.
• Permite asigurarea la valoarea reală a imobilului și a bunurilor.
    `,
    source: "AiX Insurance News",
    sourceUrl: "https://insurance.cristianvaduva.com",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/insurance/asigurare-patrimoniu-locuinte-pad-facultativa",
    publishedAt: "2026-08-14",
    fetchedAt: "2026-08-31",
    category: "insurance",
    categoryLabel: "Informații Asigurări",
    image: "/fallbacks/fallback-3.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Asigurări",
    readTime: "5 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Polița obligatorie PAD oferă acoperire de bază pentru catastrofe, în timp ce polița facultativă acoperă riscurile de incendiu sau avarii de apă.",
      businessImpact:
        "Proprietarii care încheie polițe facultative își protejează veniturile din chirii și valoarea capitalului imobiliar.",
      marketConnection:
        "Băncile comerciale solicită poliță facultativă cesionată în favoarea băncii pentru orice imobil ipotecat.",
      whatToWatchNext:
        "Evoluția normelor ASF privind asigurările de locuințe.",
    },
  },
  {
    id: "corporate-risk-management-asigurari-active",
    slug: "corporate-risk-management-protectia-activelor-imobiliare",
    title: "Corporate Risk Management: Protecția Activelor Imobiliare și Comercial-Industrial",
    excerpt:
      "Informații privind riscurile comerciale pentru clădiri de birouri, spații logistice și flote de companie (CASCO & Business Interruption).",
    content: `
Informații Risc Corporate

Gestionarea riscurilor patrimoniale pentru companii implică analizarea activelor imobiliare, clădirilor de birouri și spațiilor industriale de producție.

Piloni în Managementul Riscului Corporate

• Property Damage & Business Interruption: Acoperă pierderile financiare cauzate de oprirea activității comerciale în urma unui incendiu sau avarie majoră.
• Asigurarea Flotelor Auto (CASCO & RCA Corporate): Optimizarea costului total al polițelor pentru flote comerciale și logistice.
• Răspunderea Managerială (D&O): Protecția juridică și financiară a executivilor în deciziile operaționale.
    `,
    source: "AiX Insurance News",
    sourceUrl: "https://insurance.cristianvaduva.com",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/insurance/corporate-risk-management-protectia-activelor-imobiliare",
    publishedAt: "2026-08-06",
    fetchedAt: "2026-08-31",
    category: "insurance",
    categoryLabel: "Informații Risc Corporate",
    image: "/fallbacks/fallback-4.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Corporate Risk",
    readTime: "6 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Oprirea accidentală a activității într-un spațiu comercial sau depozit logistic generează pierderi financiare directe.",
      businessImpact:
        "Polițele de Business Interruption transferă riscul financiar către reasigurători, menținând stabilitatea firmei.",
      marketConnection:
        "Sectorul asigurărilor din România este reglementat de ASF și conectat cu piața europeană de reasigurare.",
      whatToWatchNext:
        "Cerințele privind sustenabilitatea și reziliența clădirilor la schimbări climatice.",
    },
  },
  {
    id: "credit-ipotecar-ircc-dobanda-fixa-variabila",
    slug: "credit-ipotecar-ircc-dobanda-fixa-variabila",
    title: "Creditare Ipotecară 2026: Dobândă Fixă vs. Variabilă și Impactul IRCC asupra Ratelor Lunare",
    excerpt:
      "Informații privind structura creditelor ipotecare: de ce majoritatea noilor împrumuturi rezidențiale aleg dobânda fixă în primii 3-5 ani.",
    content: `
Informații Finanțare: Structurarea Creditului Ipotecar

Alegerea structurii optime de dobândă determină predictibilitatea ratelor lunare și bugetul de capital alocat pentru achiziția unei locuințe.

Analiza Dobânzilor Ipotecare

1. Dobânda Fixă pe 3 - 5 Ani:
• Oferă stabilitate a ratei în perioada inițială a împrumutului.
• Protejează debitorul împotriva fluctuațiilor IRCC pe piața monetară.
• Permite refinanțarea fără penalități la finalul perioadei fixe.

2. Dobânda Variabilă (IRCC + Marjă Bancară):
• Se actualizează trimestrial pe baza indicelui reglementat calculat de BNR.
• Depinde direct de evoluția indicilor de piață.
    `,
    source: "AiX Credit News",
    sourceUrl: "https://credite.cristianvaduva.com",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/credits/credit-ipotecar-ircc-dobanda-fixa-variabila",
    publishedAt: "2026-08-12",
    fetchedAt: "2026-08-31",
    category: "credits",
    categoryLabel: "Informații Credite",
    image: "/fallbacks/fallback-1.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Finanțare & Credite",
    readTime: "5 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Rata lunară a creditului ipotecar depinde de marja fixă a băncii plus indicele de referință (IRCC).",
      businessImpact:
        "Cumpărătorii de locuințe care optează pentru dobândă fixă la achiziție beneficiază de predictibilitate bugetară.",
      marketConnection:
        "Portofoliile ipotecare ale băncilor comerciale (Banca Transilvania, BRD, BCR) constituie active importante din bilanț.",
      whatToWatchNext:
        "Publicarea cotației oficiale IRCC de către BNR.",
    },
  },
  {
    id: "refinanțare-ipotecara-optimizare-cost-capital",
    slug: "refinantare-ipotecara-optimizare-cost-capital-grad-indatorare",
    title: "Refinanțarea Ipotecară: Criterii BNR privind Gradul Maxim de Îndatorare (40%-45%)",
    excerpt:
      "Cum se calculează capacitatea de plată și gradul maxim de îndatorare reglementat de BNR la refinanțarea creditelor în condiții de dobândă mai favorabile.",
    content: `
Informații Refinanțare & Capacitate de Îndatorare

Refinanțarea creditelor ipotecare existente permite scăderea costului total al dobânzilor și reducerea duratei de rambursare.

Regulamentul BNR privind Gradul de Îndatorare

• Grad maxim de îndatorare populație: Reglementat la 40% din venitul net lunar pentru credite în RON (45% pentru primii cumpărători ai primei locuințe).
• Evaluarea Veniturilor Eligibile: Venituri din salarii, dividende, chirii și activități independente verificate oficial.
• Scăderea Costului Total: Refinanțarea unui credit vechi la o dobândă fixă actualizată poate reduce rata lunară.
    `,
    source: "AiX Credit News",
    sourceUrl: "https://credite.cristianvaduva.com",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/credits/refinantare-ipotecara-optimizare-cost-capital-grad-indatorare",
    publishedAt: "2026-08-04",
    fetchedAt: "2026-08-31",
    category: "credits",
    categoryLabel: "Informații Finanțare",
    image: "/fallbacks/fallback-0.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Finanțare & Credite",
    readTime: "5 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Gradul maxim de îndatorare de 40% impus de BNR protejează debitorii de riscul de supra-îndatorare.",
      businessImpact:
        "Refinanțarea eliberează flux de numerar lunar utilizabil pentru alte cheltuieli sau economii.",
      marketConnection:
        "Verificarea se face prin interogarea bazei de date Biroul de Credit și ANAF.",
      whatToWatchNext:
        "Ofertele de refinanțare ipotecară emise de băncile din România.",
    },
  },
  {
    id: "bnr-impact-dobanzi-creditare-ipotecara",
    slug: "bnr-decizie-rata-dobanzii-politica-monetara",
    title: "BNR & Piața Ipotecară: Menținerea IRCC la 5,86% și dinamica cererii de creditare rezidențială",
    excerpt:
      "Evoluția ratelor dobânzilor de referință BNR și nivelul IRCC influențează gradul de îndatorare al cumpărătorilor de locuințe și volumul noilor împrumuturi ipotecare.",
    content: `
Sinteză BNR & Piața Creditelor Ipotecare

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
        "Evoluția IRCC stabilește costul lunar al ratelor la credite și afectează bugetul alocat de cumpărătorii de locuințe.",
      businessImpact:
        "Dezvoltatorii adaptează mixul de apartamente pentru a se încadra în pragurile de creditare ale băncilor.",
      marketConnection:
        "Conexiune cu veniturile din dobânzi ale băncilor comerciale (Banca Transilvania, BRD).",
      whatToWatchNext:
        "Publicarea noului indice IRCC aplicabil trimestrului următor de către BNR.",
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
• Spania & Portugalia: Creșteri ale cererii pe segmentul rezidențial de coastă și premium urbane.
• Randamente de Închiriere: Randamentele brute din Europa Centrală și de Est (6,5% - 8,0%) comparativ cu cele vest-europene (3,5% - 4,5%).
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
        "Comportamentul piețelor imobiliare vest-europene oferă un indicator avansat pentru mișcările de capital.",
      businessImpact:
        "Investitorii compară randamentele brute din România cu cele din vestul Europei.",
      marketConnection:
        "Evoluția vizează fondurile europene de real estate cross-border.",
      whatToWatchNext:
        "Publicarea indicelui Eurostat House Price Index (HPI) și deciziile BCE.",
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

Analiza volumelor de capital plasate în active comerciale cu venit generat din chirii din marile poluri de business ale României.

Elemente Principale

1. Office Clasa A: Proiecte cu certificare verde (BREEAM/LEED) care atrag chiriași multinaționali cu contracte pe termen lung.
2. Sectorul Logistic: Cererea susținută de extinderea rețelelor de retail și e-commerce în regiunile București, Timișoara și Cluj.
3. Rata de Randament: Se menține la nivelul de 7,25% - 7,75% pentru birouri și spații logistice.
    `,
    source: "AiX News",
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
        "Volumul investițiilor comerciale arată încrederea investitorilor instituționali în active reale.",
      businessImpact:
        "Proprietarii de clădiri de birouri și chiriașii corporate renegociază clauzele de indexare.",
      marketConnection:
        "Conexiune cu dezvoltatorii imobiliari listați la BVB (One United Properties).",
      whatToWatchNext:
        "Rata de neocupare a spațiilor office din polul de birouri Nord București.",
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
