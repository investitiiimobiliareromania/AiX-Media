export interface DubaiPrimeArea {
  id: string;
  name: string;
  category: 'Ultra-Luxury' | 'Prime Waterfront' | 'Urban Core' | 'Master Planned Community';
  avgPriceSqFtAED: number;
  avgPriceSqFtEUR: number;
  grossYieldAnnualPct: number;
  netYieldAnnualPct: number;
  occupancyRatePct: number;
  offPlanSharePct: number;
  readySharePct: number;
  keyDrivers: string[];
  notableProjects: string[];
  source: string;
  sourceUrl: string;
  reportingPeriod: string;
}

export interface DubaiMarketBenchmark {
  id: string;
  title: string;
  value: string;
  period: string;
  source: string;
  sourceUrl: string;
  description: string;
}

export const dubaiMarketBenchmarks: DubaiMarketBenchmark[] = [
  {
    id: 'dld-volume-h1',
    title: 'Tranzacții Rezidențiale DLD (Semestrul I 2026)',
    value: '76,120 tranzacții',
    period: 'S1 2026',
    source: 'Dubai Land Department (DLD)',
    sourceUrl: 'https://dubailand.gov.ae',
    description: 'Volumul total al tranzacțiilor rezidențiale înregistrate oficial în registrul funciar DLD.',
  },
  {
    id: 'dld-total-value',
    title: 'Valoare Totală Tranzacționată DLD',
    value: '228.5 Mld AED (~57 Mld EUR)',
    period: 'S1 2026',
    source: 'Dubai Land Department (DLD)',
    sourceUrl: 'https://dubailand.gov.ae',
    description: 'Suma agregată a vânzărilor pe piața off-plan și piața secundară (ready properties).',
  },
  {
    id: 'dld-offplan-split',
    title: 'Pondere Vânzări Off-Plan vs. Ready',
    value: '58% Off-Plan / 42% Ready',
    period: 'S1 2026',
    source: 'DLD & RERA',
    sourceUrl: 'https://dubailand.gov.ae',
    description: 'Cererea rămâne alimentată de planurile de plată post-handover oferite de dezvoltatori.',
  },
  {
    id: 'golden-visa-threshold',
    title: 'Plafon Investiție Golden Visa (10 Ani)',
    value: '2,000,000 AED (~500,000 EUR)',
    period: 'Cadru Legal 2026 (ICP / GDRFA)',
    source: 'Federal Authority for Identity, Citizenship, Customs and Port Security (ICP)',
    sourceUrl: 'https://icp.gov.ae',
    description: 'Permis de rezidență de 10 ani acordat investitorilor imobiliari (achiziție cash sau credit ipotecar aprobat).',
  },
];

export const dubaiPrimeAreas: DubaiPrimeArea[] = [
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    category: 'Ultra-Luxury',
    avgPriceSqFtAED: 3850,
    avgPriceSqFtEUR: 960,
    grossYieldAnnualPct: 6.2,
    netYieldAnnualPct: 5.1,
    occupancyRatePct: 91,
    offPlanSharePct: 35,
    readySharePct: 65,
    keyDrivers: [
      'Ofertă de vile și proprietăți pe malul mării strict limitată fizic',
      'Cerere puternică de la cumpărători internaționali de tip High-Net-Worth (HNWIs)',
      'Lichiditate ridicată pe segmentul branded residences (Armani, Six Senses)',
    ],
    notableProjects: ['The Palm Crown', 'Six Senses Residences', 'Como Residences'],
    source: 'DLD Official Open Data',
    sourceUrl: 'https://dubailand.gov.ae',
    reportingPeriod: 'S1 2026',
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    category: 'Urban Core',
    avgPriceSqFtAED: 2950,
    avgPriceSqFtEUR: 735,
    grossYieldAnnualPct: 6.8,
    netYieldAnnualPct: 5.6,
    occupancyRatePct: 94,
    offPlanSharePct: 52,
    readySharePct: 48,
    keyDrivers: [
      'Epicentrul turistic și financiar (Burj Khalifa, Dubai Mall, Dubai Opera)',
      'Randamente atractive pe regim de închiriere pe termen scurt (Holiday Homes)',
      'Prezența dominantă a dezvoltatorului master Emaar Properties',
    ],
    notableProjects: ['Burj Crown', 'The Address Residences Opera', 'St. Regis Downtown'],
    source: 'DLD Official Open Data',
    sourceUrl: 'https://dubailand.gov.ae',
    reportingPeriod: 'S1 2026',
  },
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    category: 'Prime Waterfront',
    avgPriceSqFtAED: 2150,
    avgPriceSqFtEUR: 535,
    grossYieldAnnualPct: 7.4,
    netYieldAnnualPct: 6.1,
    occupancyRatePct: 96,
    offPlanSharePct: 22,
    readySharePct: 78,
    keyDrivers: [
      'Cea mai lichidă zonă rezidențială pentru expați din clasa medie-superioară',
      'Acces direct la plajă, metrou, tramvai și facilități comerciale',
      'Randamente brute constante susținute de chiriași pe termen lung (1 an)',
    ],
    notableProjects: ['Marina Vista', 'Stella Maris', 'Ciel Tower Marina'],
    source: 'DLD Official Open Data',
    sourceUrl: 'https://dubailand.gov.ae',
    reportingPeriod: 'S1 2026',
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    category: 'Urban Core',
    avgPriceSqFtAED: 2420,
    avgPriceSqFtEUR: 605,
    grossYieldAnnualPct: 7.6,
    netYieldAnnualPct: 6.3,
    occupancyRatePct: 93,
    offPlanSharePct: 65,
    readySharePct: 35,
    keyDrivers: [
      'Extinderea canalului navigabil Dubai Canal și proximitatea de Downtown',
      'Punct focal pentru proiecte branded residences (Bugatti, Pagani, Franck Muller)',
      'Cerere intensă din partea profesioniștilor din sectorul fintech și consultanță',
    ],
    notableProjects: ['Bugatti Residences by Binghatti', 'Peninsula by Select Group', 'Canal Crown'],
    source: 'DLD Official Open Data',
    sourceUrl: 'https://dubailand.gov.ae',
    reportingPeriod: 'S1 2026',
  },
  {
    id: 'dubai-hills-estate',
    name: 'Dubai Hills Estate',
    category: 'Master Planned Community',
    avgPriceSqFtAED: 2280,
    avgPriceSqFtEUR: 570,
    grossYieldAnnualPct: 6.9,
    netYieldAnnualPct: 5.7,
    occupancyRatePct: 95,
    offPlanSharePct: 60,
    readySharePct: 40,
    keyDrivers: [
      'Comunitate verde cu teren de golf de 18 găuri, spital King’s College și Dubai Hills Mall',
      'Preferată de familii de expați și investitori orientați spre apreciere de capital',
      'Infrastructură urbană integrată de master developer Emaar',
    ],
    notableProjects: ['Park Horizon', 'Golf Place Terraces', 'Address Hillcrest'],
    source: 'DLD Official Open Data',
    sourceUrl: 'https://dubailand.gov.ae',
    reportingPeriod: 'S1 2026',
  },
  {
    id: 'emirates-hills',
    name: 'Emirates Hills / Jumeirah Golf',
    category: 'Ultra-Luxury',
    avgPriceSqFtAED: 4200,
    avgPriceSqFtEUR: 1050,
    grossYieldAnnualPct: 5.4,
    netYieldAnnualPct: 4.5,
    occupancyRatePct: 89,
    offPlanSharePct: 15,
    readySharePct: 85,
    keyDrivers: [
      'Enclava exclusivistă de vile private mari de tip mansion ("Beverly Hills of Dubai")',
      'Securitate privată 24/7 și terenuri de golf internaționale de campionat',
      'Proprietăți unice cu suprafețe utile de peste 800 - 2.500 mp',
    ],
    notableProjects: ['Emirates Hills Signature Mansions', 'Jumeirah Golf Estates Mansions'],
    source: 'DLD Official Open Data',
    sourceUrl: 'https://dubailand.gov.ae',
    reportingPeriod: 'S1 2026',
  },
];

export interface ComparativeMetric {
  dimension: string;
  bucharestPrime: string;
  dubaiPrime: string;
  notes: string;
}

export const comparisonBucharestVsDubai: ComparativeMetric[] = [
  {
    dimension: 'Buget de Investiție Tipic',
    bucharestPrime: '1,000,000 EUR (~5.0M RON)',
    dubaiPrime: '1,000,000 EUR (~4,000,000 AED)',
    notes: 'Baza de calcul pentru portofolii rezidențiale prime sau unități luxury.',
  },
  {
    dimension: 'Suprafață Achiziționată Prime',
    bucharestPrime: '~300 - 380 mp utili (Zona Nord / Herăstrău / Primăverii)',
    dubaiPrime: '~135 - 180 mp utili (Downtown / Marina / Business Bay)',
    notes: 'Prețul pe metru pătrat util în București prime este de ~2.600 - 3.500 €/mp vs. ~5.500 - 7.500 €/mp în Dubai prime.',
  },
  {
    dimension: 'Randament Brut din Chirie (Gross Yield)',
    bucharestPrime: '5.8% - 7.2% pe an',
    dubaiPrime: '6.5% - 7.8% pe an',
    notes: 'În Dubai chiriile se plătesc tradițional în 1-4 cecuri anuale în avans.',
  },
  {
    dimension: 'Impozit pe Veniturile din Chirii',
    bucharestPrime: '10% (cu deducere forfetară 20% = 8% efectiv) + CASS',
    dubaiPrime: '0% (Fără impozit pe venitul persoanelor fizice)',
    notes: 'În EAU nu există impozit pe venit personal, impozit pe câștiguri de capital sau impozit pe succesiune.',
  },
  {
    dimension: 'Taxe de Transfer la Achiziție',
    bucharestPrime: 'Taxe notariale + Carte Funciară (~1.5% - 2.5%) + TVA (după caz)',
    dubaiPrime: 'Taxă de transfer DLD: 4% fix + comision administrativ (5.000 AED)',
    notes: 'DLD fee este achitată integral la înregistrarea contractului de vânzare (Oqood sau Title Deed).',
  },
  {
    dimension: 'Moneda Venitului & Risc Valutar',
    bucharestPrime: 'Chirii indexate în EUR, încasate în RON la cursul BNR',
    dubaiPrime: 'Chirii în AED (monedă legată fix de USD la paritatea 3.6725 AED/USD)',
    notes: 'Investiția în Dubai oferă expunere directă pe dolarul american.',
  },
  {
    dimension: 'Beneficiu Suplimentar de Rezidență',
    bucharestPrime: 'Cetățenie UE / Drept de ședere standard în România',
    dubaiPrime: 'Eligibilitate automată pentru UAE Golden Visa (10 ani)',
    notes: 'Proprietatea de peste 2M AED conferă viza de rezidență pentru investitor și familie.',
  },
  {
    dimension: 'Cadrul de Protecție a Cumpărătorului Off-Plan',
    bucharestPrime: 'Conturi escrow bancare / Antecontracte notariale (Legea 10/1995)',
    dubaiPrime: 'Conturi Escrow garantate prin lege RERA / DLD (Legea nr. 8/2007)',
    notes: 'În Dubai dezvoltatorul primește fondurile doar pe măsură ce inginerii DLD certifică stadiul fizic al construcției.',
  },
];
