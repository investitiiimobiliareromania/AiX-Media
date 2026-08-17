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

export const realEstateOfficialMetrics: RealEstateMetric[] = [
  {
    id: "ancpi-national-transactions",
    label: "Tranzacții Imobiliare Naționale",
    value: "51,808",
    unit: "imobile",
    subtext: "Total vânzări de imobile la nivel național înregistrate oficial în cadastrul ANCPI",
    source: "ANCPI",
    sourceUrl: "https://www.ancpi.ro/statistici/",
    referencePeriod: "Iunie 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "transactions",
  },
  {
    id: "ancpi-bucharest-transactions",
    label: "Tranzacții Imobiliare București",
    value: "10,420",
    unit: "imobile",
    subtext: "Volumul lunar de unități individuale și terenuri înregistrate în Capitală",
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
    subtext: "Autorizații eliberate pentru clădiri rezidențiale la nivel național conform INS",
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
    subtext: "Evoluția volumului lucrărilor de construcții ca serie brută conform INS",
    source: "INS",
    sourceUrl: "https://insse.ro/cms/ro/comunicate-de-presa",
    referencePeriod: "T1 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "construction",
  },
  {
    id: "bnr-mortgage-credit",
    label: "Sold Credite pentru Locuințe",
    value: "108.4",
    unit: "miliarde RON",
    subtext: "Soldul agregat al creditelor pentru locuințe acordate populației conform BNR",
    source: "BNR",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    referencePeriod: "Mai 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "mortgage",
  },
  {
    id: "bnr-ircc-reference",
    label: "Indicele IRCC Trimestrial",
    value: "5.86%",
    unit: "%",
    subtext: "Indicele de referință reglementat de BNR pentru creditele acordate consumatorilor",
    source: "BNR",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    referencePeriod: "T3 2026",
    fetchedAt: "2026-08-17",
    status: "available",
    category: "mortgage",
  },
];

export async function getRealEstateMetrics(): Promise<RealEstateMetric[]> {
  return realEstateOfficialMetrics;
}
