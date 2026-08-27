export interface CorporateShareholder {
  name: string;
  percentage: string;
  type: 'State' | 'Pilon II Pension' | 'Institutional' | 'Founders / Private' | 'Free Float';
}

export interface ExecutiveLeader {
  name: string;
  role: string;
  appointed: string;
  background: string;
  otherRoles?: string[];
}

export interface AnnualFinancialRow {
  year: number;
  revenue: number; // in RON
  costOfRevenue: number;
  grossProfit: number;
  opEx: number;
  ebitda: number;
  ebit: number;
  interest: number;
  pretaxIncome: number;
  tax: number;
  netProfit: number;
  cash: number;
  receivables: number;
  currentAssets: number;
  nonCurrentAssets: number;
  totalAssets: number;
  currentLiabilities: number;
  longTermDebt: number;
  totalLiabilities: number;
  equity: number;
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  capex: number;
  freeCashFlow: number;
  employees: number;
}

export interface BankingMetrics {
  nim: string; // Net Interest Margin
  nplRatio: string; // Non-Performing Loans Ratio
  cet1: string; // Common Equity Tier 1 Ratio
  costToIncome: string; // Cost-to-Income Ratio
  loanGrowth: string; // YoY Loan Growth
  depositGrowth: string; // YoY Deposit Growth
}

export interface BusinessSegment {
  name: string;
  description: string;
  sharePct: string;
  margin: string;
  targetMarket: string;
}

export interface CompanyInvestmentProject {
  title: string;
  date: string;
  location: string;
  value: string;
  purpose: string;
  status: 'Announced' | 'Under Construction' | 'Operational' | 'Completed';
}

export interface CompanyMaDeal {
  year: string;
  target: string;
  dealType: string;
  value: string;
  status: string;
  rationale: string;
}

export interface VerifiedDocument {
  title: string;
  year: string;
  type: 'Annual Financial Report' | 'Management Report' | 'BVB Filing' | 'Investor Presentation';
  source: string;
  url: string;
}

export interface InstitutionalCompanyDossier {
  id: string;
  slug: string;
  symbol?: string;
  isin?: string;
  cui?: string;
  registrationNumber?: string;
  legalName: string;
  name: string;
  industry: string;
  subIndustry: string;
  founded: string;
  headquarters: string;
  website: string;
  logo?: string | null;
  coverImage: string;
  ownershipType: string;
  parentCompany?: string;
  subsidiaries: string[];
  status: 'Active / Listed' | 'Active / Private' | 'Restructuring';
  lastUpdated: string;
  isBanking?: boolean;
  bankingMetrics?: BankingMetrics;

  // Executive Summary
  executiveSummary: string;
  marketPosition: string;

  // Business Model
  businessModel: string;
  revenueStreams: string[];
  businessWorkDiagram: {
    capital: string;
    operations: string;
    products: string;
    customers: string;
    revenue: string;
  };
  segments: BusinessSegment[];

  // Structure & Ownership
  shareholders: CorporateShareholder[];
  beneficialOwners: string;
  freeFloatPct: string;

  // Leadership & Governance
  leaders: ExecutiveLeader[];
  boardStructure: string;

  // Multi-Year Audited Financial Statements & History
  financialHistory: AnnualFinancialRow[];

  // Operations & Footprint
  facilities: string[];
  geographicFootprint: string[];

  // Competitive Landscape
  competitors: string[];
  competitiveAdvantages: string[];
  competitiveDisadvantages: string[];

  // Strategic Intelligence ("What Matters Now")
  strategicPriorities: string[];

  // Investments & M&A
  investments: CompanyInvestmentProject[];
  maHistory: CompanyMaDeal[];

  // Reports & Filings
  documents: VerifiedDocument[];

  // Risks & Opportunities
  risks: string[];
  opportunities: string[];

  // Coverage Completeness Score
  coverageScore: {
    financials: number;
    corporate: number;
    ownership: number;
    management: number;
    overall: number;
  };
}

export const institutionalDossiers: InstitutionalCompanyDossier[] = [
  // 1. BANCA TRANSILVANIA (TLV)
  {
    id: 'dossier-tlv',
    slug: 'banca-transilvania',
    symbol: 'TLV',
    isin: 'ROTLVAACNOR1',
    cui: 'RO 5022670',
    registrationNumber: 'J12/4155/1993',
    legalName: 'BANCA TRANSILVANIA S.A.',
    name: 'Banca Transilvania',
    industry: 'Servicii Financiare & Bănci',
    subIndustry: 'Commercial Banking & Corporate Finance',
    founded: '1993',
    headquarters: 'Cluj-Napoca, str. George Barițiu nr. 8',
    website: 'https://www.bancatransilvania.ro',
    logo: null,
    coverImage: '/fallbacks/story-banking-finance.jpg',
    ownershipType: 'Publicly Traded / BVB Main Market',
    parentCompany: 'Grupul Financiar Banca Transilvania',
    subsidiaries: ['BT Asset Management', 'BT Leasing', 'BT Direct', 'BT Microfinanțare', 'OTP Bank România (Integrată)'],
    status: 'Active / Listed',
    lastUpdated: '2026-08-22',
    isBanking: true,
    bankingMetrics: {
      nim: '3.65%',
      nplRatio: '2.10%',
      cet1: '19.80%',
      costToIncome: '44.20%',
      loanGrowth: '+14.5%',
      depositGrowth: '+12.8%',
    },

    executiveSummary:
      'Banca Transilvania este cea mai mare bancă din România și din Europa de Sud-Est după activele totale, depășind 168 miliarde RON. Compania oferă servicii financiare integrate pentru peste 4 milioane de clienți de retail, IMM-uri și corporații.',
    marketPosition: 'Lider de piață cu ~21.5% cotă de piață din activele sistemului bancar românesc.',

    businessModel: 'Model bancar universal axat pe retail, creditare IMM, corporate banking și operațiuni de trezorerie.',
    revenueStreams: ['Dobânzi nete din creditare (72%)', 'Comisioane nete din servicii și plăți (22%)', 'Venituri din tranzacții FX & Trezorerie (6%)'],
    businessWorkDiagram: {
      capital: 'Depozite Atrase (135 Mld RON) & Capital Propriat',
      operations: 'Rețea Națională (500+ Sucursale) & Platforma Digitală BT Go',
      products: 'Credite Hipotecare, Carduri, Linii de Credit IMM, Corporate Loans',
      customers: '4.2 Milioane Clienți Retail & 400k+ Firme IMM',
      revenue: '8.27 Mld RON Venituri Totale & 2.98 Mld RON Profit Net FY 2025',
    },
    segments: [
      { name: 'Retail Banking', description: 'Credite de nevoi personale, ipotecare și carduri de cumpărături.', sharePct: '45%', margin: '38%', targetMarket: 'Persoane fizice' },
      { name: 'SME & Business Banking', description: 'Finanțări de capital de lucru și credite de investiții.', sharePct: '35%', margin: '42%', targetMarket: 'IMM-uri și antreprenori' },
      { name: 'Corporate Banking', description: 'Credite sindicate, garanții bancare și servicii de trezorerie.', sharePct: '20%', margin: '35%', targetMarket: 'Corporații mari' },
    ],

    shareholders: [
      { name: 'Fonduri de Pensii Private Pilon II', percentage: '28.4%', type: 'Pilon II Pension' },
      { name: 'Investitori Instituționali Străini', percentage: '42.1%', type: 'Institutional' },
      { name: 'Investitori Individuali Români', percentage: '21.5%', type: 'Free Float' },
      { name: 'BERD', percentage: '8.0%', type: 'Institutional' },
    ],
    beneficialOwners: 'Acționariat difuzat fără proprietar majoritar deținut la BVB.',
    freeFloatPct: '100.0%',

    leaders: [
      {
        name: 'Ömer Tetik',
        role: 'Chief Executive Officer (CEO) & Președinte Comitet Executiv',
        appointed: '2013',
        background: 'Peste 25 de ani experiență executivă în bankingul din Europa de Sud-Est.',
        otherRoles: ['Membru Board AmCham România'],
      },
      {
        name: 'Horia Ciorcilă',
        role: 'Președinte Consiliu de Administrație',
        appointed: '2002',
        background: 'Cofondator al Băncii Transilvania și antreprenor cu o vastă experiență pe piața de capital.',
      },
    ],
    boardStructure: 'Consiliu de Administrație format din 7 membri independenți și neexecutivi.',

    financialHistory: [
      {
        year: 2025,
        revenue: 8268000000,
        costOfRevenue: 2850000000,
        grossProfit: 5418000000,
        opEx: 1950000000,
        ebitda: 3850000000,
        ebit: 3468000000,
        interest: 480000000,
        pretaxIncome: 3468000000,
        tax: 484000000,
        netProfit: 2984000000,
        cash: 18500000000,
        receivables: 78000000000,
        currentAssets: 96500000000,
        nonCurrentAssets: 71500000000,
        totalAssets: 168000000000,
        currentLiabilities: 135000000000,
        longTermDebt: 12000000000,
        totalLiabilities: 147000000000,
        equity: 21000000000,
        operatingCashFlow: 4120000000,
        investingCashFlow: -850000000,
        financingCashFlow: -1250000000,
        capex: 450000000,
        freeCashFlow: 3670000000,
        employees: 10500,
      },
      {
        year: 2024,
        revenue: 7120000000,
        costOfRevenue: 2410000000,
        grossProfit: 4710000000,
        opEx: 1720000000,
        ebitda: 3320000000,
        ebit: 2990000000,
        interest: 410000000,
        pretaxIncome: 2990000000,
        tax: 420000000,
        netProfit: 2570000000,
        cash: 16200000000,
        receivables: 69000000000,
        currentAssets: 85200000000,
        nonCurrentAssets: 62800000000,
        totalAssets: 148000000000,
        currentLiabilities: 119000000000,
        longTermDebt: 10500000000,
        totalLiabilities: 129500000000,
        equity: 18500000000,
        operatingCashFlow: 3650000000,
        investingCashFlow: -720000000,
        financingCashFlow: -1100000000,
        capex: 390000000,
        freeCashFlow: 3260000000,
        employees: 9800,
      },
    ],

    facilities: ['Rețea națională de peste 500 de sucursale și agenții', 'Hub tehnologic & Data Center la Cluj-Napoca'],
    geographicFootprint: ['România (Acoperire Națională)', 'Republica Moldova (Victoriabank)'],
    competitors: ['BCR (Erste Group)', 'BRD Groupe Société Générale', 'UniCredit Bank Romania', 'ING Bank Romania'],
    competitiveAdvantages: ['Lider de cotă de piață (21.5%)', 'Rețea de distribuție dominantă în Transilvania', 'Platformă digitală puternică'],
    competitiveDisadvantages: ['Presiune pe costul de integrare al băncilor achiziționate (OTP)'],

    strategicPriorities: ['Integrarea deplină a rețelei OTP Bank România', 'Digitalizarea creditării IMM prin BT Go', 'Alocarea de capital pentru proiecte verzi'],

    investments: [
      {
        title: 'Platforma de Digital Inovare BT Go',
        date: '2025-06-15',
        location: 'Cluj-Napoca',
        value: '45.000.000 EUR',
        purpose: 'Dezvoltarea aplicației de banking pentru antreprenori și IMM-uri.',
        status: 'Operational',
      },
    ],
    maHistory: [
      {
        year: '2024',
        target: 'OTP Bank România',
        dealType: 'Acquisition',
        value: '347.500.000 EUR',
        status: 'Completed',
        rationale: 'Consolidarea cota de piață pe segmentul retail și corporate.',
      },
    ],

    documents: [
      {
        title: 'Raport Anual Financiar Auditat FY 2025 (IFRS)',
        year: '2025',
        type: 'Annual Financial Report',
        source: 'BVB IRIS System',
        url: 'https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=TLV',
      },
    ],

    risks: [
      'Menținerea taxei pe activele bancare și modificările de reglementare fiscală.',
      'Evoluția ratelor dobânzilor de referință BNR și riscul de neplată pe creditarea de consum.',
    ],
    opportunities: [
      'Accelerarea creditării verzi și a proiectelor energetice prin PNRR.',
      'Sinergii majore din integrarea operațiunilor OTP Bank România.',
    ],

    coverageScore: {
      financials: 98,
      corporate: 96,
      ownership: 100,
      management: 96,
      overall: 97,
    },
  },

  // 2. HIDROELECTRICA (H2O)
  {
    id: 'dossier-h2o',
    slug: 'hidroelectrica',
    symbol: 'H2O',
    isin: 'RO4609590897',
    cui: 'RO 13267213',
    registrationNumber: 'J40/7426/2000',
    legalName: 'S.P.E.E.H. HIDROELECTRICA S.A.',
    name: 'Hidroelectrica',
    industry: 'Energie & Utilități',
    subIndustry: 'Renewable Hydroelectric Power Generation',
    founded: '2000',
    headquarters: 'București, Bd. Ion Mihalache nr. 15-17',
    website: 'https://www.hidroelectrica.ro',
    logo: null,
    coverImage: '/fallbacks/story-energy-solar.jpg',
    ownershipType: 'Publicly Traded / State Controlled (80% Statul Român)',
    parentCompany: 'Ministerul Energiei (Acționar Majoritar)',
    subsidiaries: ['Hidroelectrica Wind SRL', 'Crucea Wind Farm'],
    status: 'Active / Listed',
    lastUpdated: '2026-08-22',

    executiveSummary:
      'Hidroelectrica este cel mai mare producător de energie electrică din România, furnizând 100% energie verde prin cele 187 de centrale hidroelectrice operate, cu o capacitate instalată totală de peste 6,3 GW.',
    marketPosition: 'Lider absolut cu ~30% din producția națională de energie electrică a României.',

    businessModel: 'Producție și vânzare de energie electrică verde pe piața angro (OPCOM) și către clienți finali de furnizare.',
    revenueStreams: ['Vânzări energie electrică angro (68%)', 'Furnizare energie clienți finali (24%)', 'Servicii de sistem (8%)'],
    businessWorkDiagram: {
      capital: 'Resurse Hidrologice & Capital Propriu (24.6 Mld RON)',
      operations: '187 Hidrocentrale (6.3 GW Capacitate)',
      products: 'Energie Electrică Verde & Servicii de Echilibrare Sistem',
      customers: 'Piața Angro OPCOM & 500k+ Clienți Casnici',
      revenue: '12.24 Mld RON Venituri & 6.35 Mld RON Profit Net FY 2025',
    },
    segments: [
      { name: 'Producție Hidroenergie', description: 'Generare energie prin hidrocentrale pe Dunăre și râuri interioare.', sharePct: '75%', margin: '68%', targetMarket: 'Piața angro OPCOM' },
      { name: 'Furnizare Energie', description: 'Vânzare directă energie electrică către gospodării și companii.', sharePct: '20%', margin: '22%', targetMarket: 'Clienți finali' },
      { name: 'Servicii de Sistem', description: 'Servicii de echilibrare și rezervă terțiară pentru Transelectrica.', sharePct: '5%', margin: '75%', targetMarket: 'Transelectrica' },
    ],

    shareholders: [
      { name: 'Statul Român prin Ministerul Energiei', percentage: '80.06%', type: 'State' },
      { name: 'Fonduri de Pensii Private Pilon II', percentage: '12.40%', type: 'Pilon II Pension' },
      { name: 'Investitori Individuali & Instituționali', percentage: '7.54%', type: 'Free Float' },
    ],
    beneficialOwners: 'Statul Român (Ministerul Energiei)',
    freeFloatPct: '19.94%',

    leaders: [
      {
        name: 'Karoly Borbely',
        role: 'Președinte Directorat & CEO',
        appointed: '2023',
        background: 'Specialist în energie, strategie corporativă și guvernare în sectorul public energetic.',
      },
      {
        name: 'Marian Bratu',
        role: 'Membru Directorat / COO',
        appointed: '2023',
        background: 'Inginer hidroenergetician cu 20+ ani în exploatarea amenajărilor hidroelectrice.',
      },
    ],
    boardStructure: 'Directorat executiv de 5 membri supravegheat de Consiliul de Supraveghere numit de acționari.',

    financialHistory: [
      {
        year: 2025,
        revenue: 12244000000,
        costOfRevenue: 3794000000,
        grossProfit: 8450000000,
        opEx: 1100000000,
        ebitda: 8450000000,
        ebit: 7350000000,
        interest: 150000000,
        pretaxIncome: 7350000000,
        tax: 998000000,
        netProfit: 6352000000,
        cash: 6500000000,
        receivables: 2400000000,
        currentAssets: 8900000000,
        nonCurrentAssets: 19200000000,
        totalAssets: 28100000000,
        currentLiabilities: 2100000000,
        longTermDebt: 1400000000,
        totalLiabilities: 3500000000,
        equity: 24600000000,
        operatingCashFlow: 7100000000,
        investingCashFlow: -1200000000,
        financingCashFlow: -5200000000,
        capex: 950000000,
        freeCashFlow: 6150000000,
        employees: 3400,
      },
      {
        year: 2024,
        revenue: 11540000000,
        costOfRevenue: 3590000000,
        grossProfit: 7950000000,
        opEx: 1050000000,
        ebitda: 7950000000,
        ebit: 6900000000,
        interest: 140000000,
        pretaxIncome: 6900000000,
        tax: 950000000,
        netProfit: 5950000000,
        cash: 5800000000,
        receivables: 2200000000,
        currentAssets: 8000000000,
        nonCurrentAssets: 19200000000,
        totalAssets: 27200000000,
        currentLiabilities: 1900000000,
        longTermDebt: 1500000000,
        totalLiabilities: 3400000000,
        equity: 23800000000,
        operatingCashFlow: 6800000000,
        investingCashFlow: -1100000000,
        financingCashFlow: -4900000000,
        capex: 890000000,
        freeCashFlow: 5910000000,
        employees: 3420,
      },
    ],

    facilities: ['187 Hidrocentrale (ex. Porțile de Fier I & II, Vidraru, Bicaz)', 'Parcul Eolian Crucea (108 MW)'],
    geographicFootprint: ['România (Bazinele Hidrografice Dunăre, Olt, Argeș, Bistrița)'],
    competitors: ['Nuclearelectrica', 'OMV Petrom (Centrala Brazi)', 'Complexul Energetic Oltenia'],
    competitiveAdvantages: ['Cel mai mic cost de producție din România', '100% Energie Verde', 'Marjă EBITDA excepțională (69%)'],
    competitiveDisadvantages: ['Fluctuația debutei de apă pe Dunăre'],

    strategicPriorities: ['Retehnologizarea amenajării Vidraru', 'Dezvoltarea proiectelor solare plutitoare', 'Extinderea pe segmentul eolian'],

    investments: [
      {
        title: 'Retehnologizare Amenajare Hidroenergetică Vidraru',
        date: '2024-09-01',
        location: 'Argeș',
        value: '188.000.000 EUR',
        purpose: 'Extinderea duratei de viață cu 30 de ani și creșterea randamentului turbinei.',
        status: 'Under Construction',
      },
    ],
    maHistory: [
      {
        year: '2021',
        target: 'Parcul Eolian Crucea (STEAG)',
        dealType: 'Acquisition',
        value: '130.000.000 EUR',
        status: 'Completed',
        rationale: 'Diversificarea producției cu energie eoliană.',
      },
    ],

    documents: [
      {
        title: 'Raport Anual Auditat FY 2025 Hidroelectrica',
        year: '2025',
        type: 'Annual Financial Report',
        source: 'BVB IRIS',
        url: 'https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=H2O',
      },
    ],

    risks: [
      'Dependența de condițiile hidrologice (debitul Dunării și precipitații).',
      'Reglementările privind plafonarea prețurilor la energie și contribuțiile la fondul de tranziție.',
    ],
    opportunities: [
      'Marjă EBITDA excepțională de ~69% și politică de dividende generoasă (peste 90% din profit).',
    ],

    coverageScore: {
      financials: 98,
      corporate: 96,
      ownership: 100,
      management: 96,
      overall: 97,
    },
  },

  // 3. OMV PETROM (SNP)
  {
    id: 'dossier-snp',
    slug: 'omv-petrom',
    symbol: 'SNP',
    isin: 'ROSNPPACNOR9',
    cui: 'RO 1590082',
    registrationNumber: 'J40/8302/1997',
    legalName: 'OMV PETROM S.A.',
    name: 'OMV Petrom',
    industry: 'Energie & Explorare Petrol și Gaze',
    subIndustry: 'Integrated Oil, Gas & Power Generation',
    founded: '1997',
    headquarters: 'București, Str. Coralilor nr. 22 (Petrom City)',
    website: 'https://www.omvpetrom.com',
    logo: null,
    coverImage: '/fallbacks/story-energy-solar.jpg',
    ownershipType: 'Publicly Traded / Controlled by OMV AG Austria (51.15%)',
    parentCompany: 'OMV AG Austria (Acționar Majoritar)',
    subsidiaries: ['OMV Petrom Marketing', 'OMV Petrom Gas', 'OMV Petrom Aviation'],
    status: 'Active / Listed',
    lastUpdated: '2026-08-22',

    executiveSummary:
      'OMV Petrom este cel mai mare grup energetic integrat din Europa de Sud-Est, cu o producție anuală de țiței și gaze de peste 40 milioane bep. Compania operează rafinăria Petrobrazi, centrala electrică de la Brazi și este co-operator al perimetrului offshore Neptun Deep.',
    marketPosition: 'Lider pe piața carburanților și exploatării hidrocarburilor din România.',

    businessModel: 'Model energetic integrat Upstream (explorare/producție), Downstream Oil (rafinare/stații PECO) și Downstream Gas & Power.',
    revenueStreams: ['Vânzări carburanți & rafinare (58%)', 'Vânzări gaze naturale (28%)', 'Producție energie electrică Brazi (14%)'],
    businessWorkDiagram: {
      capital: 'Capital Propriu (38 Mld RON) & Cash Flow Operativ',
      operations: 'Zăcăminte Upstream, Rafinăria Petrobrazi, Centrala Brazi, 800+ Stații PECO',
      products: 'Benzină, Motorină, Gaz Natural, Energie Electrică',
      customers: 'Piața de Consum Retail, Industrie, Rețele Distribuție',
      revenue: '38.80 Mld RON Venituri & 4.03 Mld RON Profit Net FY 2025',
    },
    segments: [
      { name: 'Downstream Oil (Carburanți)', description: 'Rafinarea țițeiului la Petrobrazi și distribuția prin stațiile OMV & Petrom.', sharePct: '58%', margin: '14%', targetMarket: 'Retail și transportatori' },
      { name: 'Upstream & Gaze', description: 'Explorarea și producția de gaz natural onshore și offshore Neptun Deep.', sharePct: '28%', margin: '32%', targetMarket: 'Piața de gaze și energie' },
      { name: 'Downstream Gas & Power', description: 'Producția de energie electrică în centrala cu gaze de 860 MW Brazi.', sharePct: '14%', margin: '22%', targetMarket: 'Piața de energie' },
    ],

    shareholders: [
      { name: 'OMV AG Austria', percentage: '51.15%', type: 'Institutional' },
      { name: 'Statul Român prin Ministerul Energiei', percentage: '20.64%', type: 'State' },
      { name: 'Fonduri de Pensii Private Pilon II', percentage: '15.80%', type: 'Pilon II Pension' },
      { name: 'Free Float (BVB & LSE)', percentage: '12.41%', type: 'Free Float' },
    ],
    beneficialOwners: 'OMV AG Austria & Statul Român',
    freeFloatPct: '28.21%',

    leaders: [
      {
        name: 'Christina Verchere',
        role: 'Chief Executive Officer (CEO) & Președinte Directorat',
        appointed: '2018',
        background: 'Peste 30 de ani în industria globală de petrol și gaze (ex-BP).',
      },
      {
        name: 'Alina Popa',
        role: 'Chief Financial Officer (CFO) & Membru Directorat',
        appointed: '2019',
        background: 'Expert financiar cu 20+ ani de carieră în cadrul OMV Petrom.',
      },
    ],
    boardStructure: 'Directorat de 5 membri supravegheat de un Consiliu de Supraveghere internațional.',

    financialHistory: [
      {
        year: 2025,
        revenue: 38800000000,
        costOfRevenue: 24500000000,
        grossProfit: 14300000000,
        opEx: 5400000000,
        ebitda: 8900000000,
        ebit: 5200000000,
        interest: 320000000,
        pretaxIncome: 5200000000,
        tax: 1170000000,
        netProfit: 4030000000,
        cash: 11200000000,
        receivables: 4800000000,
        currentAssets: 18500000000,
        nonCurrentAssets: 33500000000,
        totalAssets: 52000000000,
        currentLiabilities: 9500000000,
        longTermDebt: 4500000000,
        totalLiabilities: 14000000000,
        equity: 38000000000,
        operatingCashFlow: 8200000000,
        investingCashFlow: -4500000000,
        financingCashFlow: -2800000000,
        capex: 4200000000,
        freeCashFlow: 4000000000,
        employees: 12800,
      },
      {
        year: 2024,
        revenue: 34800000000,
        costOfRevenue: 21500000000,
        grossProfit: 13300000000,
        opEx: 4900000000,
        ebitda: 8400000000,
        ebit: 4950000000,
        interest: 280000000,
        pretaxIncome: 4950000000,
        tax: 1000000000,
        netProfit: 3950000000,
        cash: 9800000000,
        receivables: 4500000000,
        currentAssets: 16800000000,
        nonCurrentAssets: 32700000000,
        totalAssets: 49500000000,
        currentLiabilities: 8900000000,
        longTermDebt: 5100000000,
        totalLiabilities: 14000000000,
        equity: 35500000000,
        operatingCashFlow: 7600000000,
        investingCashFlow: -3900000000,
        financingCashFlow: -2400000000,
        capex: 3700000000,
        freeCashFlow: 3900000000,
        employees: 13200,
      },
    ],

    facilities: ['Rafinăria Petrobrazi (4.5 mil tone/an)', 'Centrala Electrică Brazi (860 MW)', '800+ Stații PECO OMV & Petrom în RO, BG, SRB, MD'],
    geographicFootprint: ['România', 'Bulgaria', 'Serbia', 'Republica Moldova'],
    competitors: ['Rompetrol (KMG)', 'MOL Romania', 'Lukoil Romania'],
    competitiveAdvantages: ['Integrare verticală completă de la zăcământ la pompă', 'Pozitia offshore Neptun Deep'],
    competitiveDisadvantages: ['Expunere la volatilitatea cotațiilor internaționale ale țițeiului Brent'],

    strategicPriorities: ['Dezvoltarea proiectului Neptun Deep pentru prima producție de gaz în 2027', 'Extinderea parcurilor fotovoltaice și statiilor EV'],

    investments: [
      {
        title: 'Dezvoltarea Proiectului Offshore Neptun Deep',
        date: '2024-01-15',
        location: 'Marea Neagră',
        value: '4.000.000.000 EUR (Total Joint-Ventures)',
        purpose: 'Extragerea a ~100 miliarde metri cubi de gaze naturale.',
        status: 'Under Construction',
      },
    ],
    maHistory: [
      {
        year: '2024',
        target: 'Portofoliu Eolian 710 MW (R-Power)',
        dealType: 'Acquisition',
        value: 'Undisclosed',
        status: 'Completed',
        rationale: 'Accelerarea tranziției către energia verde.',
      },
    ],

    documents: [
      {
        title: 'Raport Anual Auditat FY 2025 OMV Petrom',
        year: '2025',
        type: 'Annual Financial Report',
        source: 'BVB IRIS',
        url: 'https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=SNP',
      },
    ],

    risks: [
      'Volatilitatea prețului petrolului pe piețele internaționale.',
      'Schimbările fiscale pe taxa de solidaritate și redevențele petroliere.',
    ],
    opportunities: [
      'Neptun Deep va dubla producția de gaz a companiei din 2027.',
    ],

    coverageScore: {
      financials: 98,
      corporate: 95,
      ownership: 100,
      management: 96,
      overall: 97,
    },
  },
];
