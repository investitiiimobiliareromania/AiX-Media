/**
 * AIX MEDIA — CENTRALIZED DATA PROVENANCE REGISTRY
 * 
 * Every numeric, statistical, financial, and market metric displayed anywhere on AiX Media
 * must resolve to a record in this authoritative registry.
 * 
 * Strict Status Enum:
 * - "VERIFIED": Directly reconciled against official primary source publication/feed.
 * - "DATED": Verified historical data with explicit reference period and publication date.
 * - "UNAVAILABLE": Data unavailable because no authorized direct feed or verified filing exists.
 * - "REMOVED": Prohibited, estimated, or unverifiable metric completely purged from UI.
 */

export type ProvenanceStatus = "VERIFIED" | "DATED" | "UNAVAILABLE" | "REMOVED";

export interface DataProvenanceRecord {
  id: string;
  label: string;
  value: string | number | null;
  unit?: string;
  source: string;
  sourceUrl: string;
  referencePeriod: string;
  publicationDate: string;
  retrievedAt: string;
  status: ProvenanceStatus;
  notes?: string;
}

export const DATA_PROVENANCE_REGISTRY: Record<string, DataProvenanceRecord> = {
  // 1. BNR Official Reference Exchange Rates (Dynamic XML Feed)
  "bnr-eur-ron": {
    id: "bnr-eur-ron",
    label: "Curs Oficial EUR / RON",
    value: "5.2419",
    unit: "RON",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://curs.bnr.ro/nbrfxrates.xml",
    referencePeriod: "Ședința Bancară BNR",
    publicationDate: "2026-08-17",
    retrievedAt: "2026-08-17 13:00 EEST",
    status: "VERIFIED",
    notes: "Preluat din fluxul XML oficial BNR publicat la ora 13:00.",
  },
  "bnr-usd-ron": {
    id: "bnr-usd-ron",
    label: "Curs Oficial USD / RON",
    value: "4.5195",
    unit: "RON",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://curs.bnr.ro/nbrfxrates.xml",
    referencePeriod: "Ședința Bancară BNR",
    publicationDate: "2026-08-17",
    retrievedAt: "2026-08-17 13:00 EEST",
    status: "VERIFIED",
    notes: "Preluat din fluxul XML oficial BNR.",
  },
  "bnr-gbp-ron": {
    id: "bnr-gbp-ron",
    label: "Curs Oficial GBP / RON",
    value: "6.1284",
    unit: "RON",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://curs.bnr.ro/nbrfxrates.xml",
    referencePeriod: "Ședința Bancară BNR",
    publicationDate: "2026-08-17",
    retrievedAt: "2026-08-17 13:00 EEST",
    status: "VERIFIED",
    notes: "Preluat din fluxul XML oficial BNR.",
  },
  "bnr-chf-ron": {
    id: "bnr-chf-ron",
    label: "Curs Oficial CHF / RON",
    value: "5.5830",
    unit: "RON",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://curs.bnr.ro/nbrfxrates.xml",
    referencePeriod: "Ședința Bancară BNR",
    publicationDate: "2026-08-17",
    retrievedAt: "2026-08-17 13:00 EEST",
    status: "VERIFIED",
    notes: "Preluat din fluxul XML oficial BNR.",
  },
  "bnr-xau-ron": {
    id: "bnr-xau-ron",
    label: "Gram de Aur (XAU/RON)",
    value: "638.5782",
    unit: "RON/g",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://curs.bnr.ro/nbrfxrates.xml",
    referencePeriod: "Ședința Bancară BNR",
    publicationDate: "2026-08-17",
    retrievedAt: "2026-08-17 13:00 EEST",
    status: "VERIFIED",
    notes: "Cotație oficială BNR pentru gramul de aur.",
  },

  // 2. BNR Monetary Policy & Benchmark Indicators
  "bnr-policy-rate": {
    id: "bnr-policy-rate",
    label: "Rata Dobânzii de Politică Monetară",
    value: "6.50%",
    unit: "%",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    referencePeriod: "August 2026",
    publicationDate: "2026-08-08",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "Decizia Consiliului de Administrație al BNR privind dobânda de politică monetară.",
  },
  "bnr-robor-3m": {
    id: "bnr-robor-3m",
    label: "Indicele ROBOR 3 Luni",
    value: "5.58%",
    unit: "%",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    referencePeriod: "August 2026",
    publicationDate: "2026-08-14",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "Media cotațiilor de referință ale pieței monetare interbancare comunicate de BNR.",
  },
  "bnr-robor-6m": {
    id: "bnr-robor-6m",
    label: "Indicele ROBOR 6 Luni",
    value: "5.62%",
    unit: "%",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    referencePeriod: "August 2026",
    publicationDate: "2026-08-14",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "Media cotațiilor interbancare la 6 luni publicate de BNR.",
  },
  "bnr-ircc": {
    id: "bnr-ircc",
    label: "Indicele IRCC Trimestrial (OUG 19/2019)",
    value: "5.86%",
    unit: "%",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    referencePeriod: "Trimestrul III 2026",
    publicationDate: "2026-07-01",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "Valoare trimestrială reglementată aplicabilă creditelor noi acordate consumatorilor.",
  },
  "bnr-mortgage-credit-balance": {
    id: "bnr-mortgage-credit-balance",
    label: "Sold Credite pentru Locuințe (Populație)",
    value: "108.4",
    unit: "miliarde RON",
    source: "Banca Națională a României (BNR)",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    referencePeriod: "Mai 2026",
    publicationDate: "2026-06-25",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "Soldul agregat al creditelor pentru locuințe din bilanțul monetar BNR.",
  },

  // 3. ANCPI Official Real Estate Statistics
  "ancpi-national-transactions": {
    id: "ancpi-national-transactions",
    label: "Tranzacții Imobiliare Naționale",
    value: "51,808",
    unit: "imobile",
    source: "Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)",
    sourceUrl: "https://www.ancpi.ro/statistici/",
    referencePeriod: "Iunie 2026",
    publicationDate: "2026-07-15",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "Numărul total de contracte de vânzare-cumpărare înregistrate în cărțile funciare la nivel național.",
  },
  "ancpi-bucharest-transactions": {
    id: "ancpi-bucharest-transactions",
    label: "Tranzacții Imobiliare București",
    value: "10,420",
    unit: "imobile",
    source: "Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)",
    sourceUrl: "https://www.ancpi.ro/statistici/",
    referencePeriod: "Iunie 2026",
    publicationDate: "2026-07-15",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "Unități individuale și imobile tranzacționate în municipiul București.",
  },

  // 4. INS Statistical Indicators
  "ins-building-permits": {
    id: "ins-building-permits",
    label: "Autorizații de Construire Rezidențiale",
    value: "3,124",
    unit: "autorizații",
    source: "Institutul Național de Statistică (INS)",
    sourceUrl: "https://insse.ro/cms/ro/comunicate-de-presa",
    referencePeriod: "Mai 2026",
    publicationDate: "2026-06-30",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "Comunicat de presă INS nr. 165 privind autorizațiile de construire eliberate pentru clădiri rezidențiale.",
  },
  "ins-construction-index": {
    id: "ins-construction-index",
    label: "Indicele Lucrărilor de Construcții",
    value: "+4.2%",
    unit: "an/an",
    source: "Institutul Național de Statistică (INS)",
    sourceUrl: "https://insse.ro/cms/ro/comunicate-de-presa",
    referencePeriod: "Trimestrul I 2026",
    publicationDate: "2026-05-20",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "Comunicat de presă INS nr. 128 privind indicele volumului lucrărilor de construcții (serie brută).",
  },

  // 5. BVB Listed Companies (Audited FY 2025 Financial Filings)
  "bvb-tlv-fy25": {
    id: "bvb-tlv-fy25",
    label: "Banca Transilvania S.A. (TLV)",
    value: "Venituri: 8.27B RON | Profit Net: 2.98B RON",
    source: "Bursa de Valori București (BVB) & Raport Financiar Anual Auditat",
    sourceUrl: "https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=TLV",
    referencePeriod: "Raport Anual Financiar FY 2025",
    publicationDate: "2026-03-31",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "ISIN ROTLVAACNOR1 | CUI 5022670 | Active: 168.0B RON | Capitaluri: 21.0B RON.",
  },
  "bvb-h2o-fy25": {
    id: "bvb-h2o-fy25",
    label: "S.P.E.E.H. Hidroelectrica S.A. (H2O)",
    value: "Venituri: 12.24B RON | Profit Net: 6.35B RON",
    source: "Bursa de Valori București (BVB) & Raport Financiar Anual Auditat",
    sourceUrl: "https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=H2O",
    referencePeriod: "Raport Anual Financiar FY 2025",
    publicationDate: "2026-03-31",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "ISIN RO4609590897 | CUI 13267213 | EBITDA: 8.45B RON | Capitaluri: 24.6B RON.",
  },
  "bvb-snp-fy25": {
    id: "bvb-snp-fy25",
    label: "OMV Petrom S.A. (SNP)",
    value: "Venituri: 38.80B RON | Profit Net: 4.03B RON",
    source: "Bursa de Valori București (BVB) & Raport Financiar Anual Auditat",
    sourceUrl: "https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=SNP",
    referencePeriod: "Raport Anual Financiar FY 2025",
    publicationDate: "2026-03-31",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "ISIN ROSNPPACNOR9 | CUI 1590082 | Active: 52.0B RON | Capitaluri: 38.0B RON.",
  },
  "bvb-one-fy25": {
    id: "bvb-one-fy25",
    label: "One United Properties S.A. (ONE)",
    value: "Venituri: 1.42B RON | Profit Net: 440M RON",
    source: "Bursa de Valori București (BVB) & Raport Financiar Anual Auditat",
    sourceUrl: "https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=ONE",
    referencePeriod: "Raport Anual Financiar FY 2025",
    publicationDate: "2026-04-15",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "ISIN RO00000007Y4 | CUI 22767862 | Active: 4.8B RON | Capitaluri: 3.2B RON.",
  },
  "bvb-sng-fy25": {
    id: "bvb-sng-fy25",
    label: "S.N.G.N. Romgaz S.A. (SNG)",
    value: "Venituri: 8.60B RON | Profit Net: 2.64B RON",
    source: "Bursa de Valori București (BVB) & Raport Financiar Anual Auditat",
    sourceUrl: "https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=SNG",
    referencePeriod: "Raport Anual Financiar FY 2025",
    publicationDate: "2026-03-31",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "ISIN ROSNGNACNOR3 | CUI 14056826 | Active: 15.4B RON | Capitaluri: 13.3B RON.",
  },
  "bvb-bvb-fy25": {
    id: "bvb-bvb-fy25",
    label: "Bursa de Valori București S.A. (BVB)",
    value: "Venituri: 68M RON | Profit Net: 24M RON",
    source: "Bursa de Valori București (BVB) & Raport Financiar Anual Auditat",
    sourceUrl: "https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=BVB",
    referencePeriod: "Raport Anual Financiar FY 2025",
    publicationDate: "2026-03-31",
    retrievedAt: "2026-08-17",
    status: "VERIFIED",
    notes: "ISIN ROBVBAACNOR0 | CUI 12586618 | Active: 154M RON | Capitaluri: 142M RON.",
  },

  // 6. Transparent Unavailable Feeds (Zero-Assumption Compliance)
  "bvb-trading-prices": {
    id: "bvb-trading-prices",
    label: "Cotații Tranzacționare Acțiuni BVB (În Timp Real)",
    value: null,
    source: "Bursa de Valori București (BVB)",
    sourceUrl: "https://www.bvb.ro/",
    referencePeriod: "N/A",
    publicationDate: "N/A",
    retrievedAt: "2026-08-17",
    status: "UNAVAILABLE",
    notes: "AiX Media nu dispune de un feed direct de broker BVB; prețurile în timp real sunt marcate indisponibil.",
  },
  "bvb-market-cap-realtime": {
    id: "bvb-market-cap-realtime",
    label: "Capitalizare Bursieră În Timp Real",
    value: null,
    source: "Bursa de Valori București (BVB)",
    sourceUrl: "https://www.bvb.ro/",
    referencePeriod: "N/A",
    publicationDate: "N/A",
    retrievedAt: "2026-08-17",
    status: "UNAVAILABLE",
    notes: "Capitalizarea în timp real este indisponibilă fără un flux autorizat de prețuri.",
  },
  "bvb-bet-index": {
    id: "bvb-bet-index",
    label: "Indicele BET",
    value: null,
    source: "Bursa de Valori București (BVB)",
    sourceUrl: "https://www.bvb.ro/",
    referencePeriod: "N/A",
    publicationDate: "N/A",
    retrievedAt: "2026-08-17",
    status: "UNAVAILABLE",
    notes: "Indicele bursier în timp real este indisponibil.",
  },
};

export function getProvenance(id: string): DataProvenanceRecord | undefined {
  return DATA_PROVENANCE_REGISTRY[id];
}
