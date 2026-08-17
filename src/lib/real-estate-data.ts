export interface RealEstateMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  subtext: string;
  source: string;
  sourceUrl: string;
  referencePeriod: string;
  fetchedAt: string;
  status: "available" | "unavailable";
  category: "transactions" | "permits" | "construction" | "mortgage";
}

export interface RealEstateCountyTransaction {
  county: string;
  transactions: number;
  referencePeriod: string;
  source: string;
  sourceUrl: string;
}

export const realEstateOfficialMetrics: RealEstateMetric[] = [
  {
    id: "ancpi-national-transactions",
    label: "Tranzacții Imobiliare Naționale",
    value: "51,808",
    unit: "imobile",
    subtext: "Tranzacții de vânzare-cumpărare la nivel național înregistrate în cadastru",
    source: "ANCPI",
    sourceUrl: "https://www.ancpi.ro/statistici/",
    referencePeriod: "Iunie 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "transactions",
  },
  {
    id: "ancpi-bucharest-transactions",
    label: "Tranzacții București (Total)",
    value: "10,420",
    unit: "imobile",
    subtext: "Volumul lunar de unități individuale și terenuri tranzacționate în Capitală",
    source: "ANCPI",
    sourceUrl: "https://www.ancpi.ro/statistici/",
    referencePeriod: "Iunie 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "transactions",
  },
  {
    id: "ins-building-permits",
    label: "Autorizații de Construire Rezidențiale",
    value: "3,124",
    unit: "autorizații",
    subtext: "Autorizații eliberate pentru clădiri rezidențiale la nivel național",
    source: "INS",
    sourceUrl: "https://insse.ro/cms/ro/comunicate-de-presa",
    referencePeriod: "Mai 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "permits",
  },
  {
    id: "ins-construction-index",
    label: "Indicele Lucrărilor de Construcții",
    value: "+4.2%",
    unit: "an/an",
    subtext: "Evoluția volumului total al lucrărilor de construcții ca serie brută",
    source: "INS",
    sourceUrl: "https://insse.ro/cms/ro/comunicate-de-presa",
    referencePeriod: "T1 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "construction",
  },
  {
    id: "bnr-mortgage-credit",
    label: "Sold Credite pentru Locuințe (Populație)",
    value: "108.4",
    unit: "miliarde RON",
    subtext: "Soldul total al creditelor ipotecare/imobiliare acordate populației",
    source: "BNR",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    referencePeriod: "Mai 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "mortgage",
  },
  {
    id: "bnr-ircc-reference",
    label: "Indicele de Referință pentru Creditele Consumatorilor (IRCC)",
    value: "5.86%",
    unit: "%",
    subtext: "Valoarea trimestrială oficială reglementată aplicabilă creditelor noi",
    source: "BNR",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    referencePeriod: "T3 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "mortgage",
  },
];

export const regionalTransactionsData: RealEstateCountyTransaction[] = [
  { county: "București", transactions: 10420, referencePeriod: "Iunie 2026", source: "ANCPI", sourceUrl: "https://www.ancpi.ro/statistici/" },
  { county: "Ilfov", transactions: 4190, referencePeriod: "Iunie 2026", source: "ANCPI", sourceUrl: "https://www.ancpi.ro/statistici/" },
  { county: "Cluj", transactions: 3120, referencePeriod: "Iunie 2026", source: "ANCPI", sourceUrl: "https://www.ancpi.ro/statistici/" },
  { county: "Brașov", transactions: 2840, referencePeriod: "Iunie 2026", source: "ANCPI", sourceUrl: "https://www.ancpi.ro/statistici/" },
  { county: "Timiș", transactions: 2650, referencePeriod: "Iunie 2026", source: "ANCPI", sourceUrl: "https://www.ancpi.ro/statistici/" },
  { county: "Constanța", transactions: 2410, referencePeriod: "Iunie 2026", source: "ANCPI", sourceUrl: "https://www.ancpi.ro/statistici/" },
];

export async function getRealEstateMetrics(): Promise<RealEstateMetric[]> {
  return realEstateOfficialMetrics;
}
