export interface IndustryLeaderCompany {
  name: string;
  symbol?: string;
  slug?: string;
  sector: string;
  metricLabel: string;
  metricValue: string;
  description: string;
  isListed: boolean;
}

export interface IndustryRiskCategory {
  category: 'Macro' | 'Reglementare' | 'Finanțare' | 'Cerere' | 'Operațional';
  title: string;
  severity: 'Ridicată' | 'Medie' | 'Controlată';
  description: string;
}

export interface IndustryMajorProject {
  name: string;
  value: string;
  leadEntity: string;
  status: string;
  description: string;
}

export interface IndustryIntelligenceDossier {
  id: string;
  slug: string;
  name: string;
  heroTagline: string;
  marketSize: string;
  marketSizeClassification: 'Official' | 'Audited' | 'Estimated' | 'Indicative';
  growthYoY: string;
  growthClassification: 'Official' | 'Audited' | 'Estimated' | 'Indicative';
  methodology: string;
  sourceProvenance: string;
  coverImage: string;
  executiveSummary: string;
  marketDefinition: string;
  leaders: IndustryLeaderCompany[];
  keyDrivers: {
    title: string;
    description: string;
  }[];
  risks: IndustryRiskCategory[];
  capitalContext: {
    capitalIntensity: 'Foarte Ridicată' | 'Ridicată' | 'Medie' | 'Flexibilă';
    financingConditions: string;
    investmentActivity: string;
    majorProjects: IndustryMajorProject[];
  };
  strategicOutlook: {
    growthDirection: string;
    catalysts: string[];
    constraints: string[];
    monitoringItems: string[];
  };
  relatedIntelligence: {
    newsCategory: string;
    relatedCompanies: { name: string; slug: string; symbol: string }[];
    marketsCoverage: string;
    hasRealEstateLink?: boolean;
  };
}

export const industryDossiers: IndustryIntelligenceDossier[] = [
  // 1. ENERGIE & UTILITĂȚI
  {
    id: 'ind-energy',
    slug: 'energy',
    name: 'Energie & Utilități',
    heroTagline: 'Producție Hidroenergetică, Gaze Naturale, Hidrocarburi & Tranziție spre Regenerabile',
    marketSize: '~65 Miliarde RON Cifră de Afaceri Cumulată',
    marketSizeClassification: 'Estimated',
    growthYoY: '+4.8% YoY',
    growthClassification: 'Indicative',
    methodology:
      'Calcul agregat pe baza veniturilor raportate conform IFRS de către producătorii principali (OMV Petrom, Hidroelectrica, Romgaz, Nuclearelectrica) și distribuitorii autorizați ANRE.',
    sourceProvenance: 'ANRE, Rapoarte Financiare Auditate BVB, Institutul Național de Statistică (INS)',
    coverImage: '/fallbacks/story-energy-solar.jpg',
    executiveSummary:
      'Sectorul energetic din România traversează o etapă istorică de transformare, susținut de investițiile strategice în perimetrul offshore Neptun Deep (OMV Petrom & Romgaz), extinderea capacităților nucleare de la Cernavodă și explozia capacităților fotovoltaice și eoliene. România are potențialul confirmat de a deveni cel mai mare producător net de gaze naturale din Uniunea Europeană.',
    marketDefinition:
      'Industria cuprinde generarea, transportul, distribuția și furnizarea de energie electrică (hidro, nucleară, solară, eoliană, termo), precum și explorarea, extracția, rafinarea și comercializarea gazelor naturale și a produselor petroliere.',
    leaders: [
      {
        name: 'Hidroelectrica S.A.',
        symbol: 'H2O',
        slug: 'hidroelectrica',
        sector: 'Energie Regenerabilă & Hidro',
        metricLabel: 'Venituri FY 2025',
        metricValue: '12.24 Mld RON',
        description: 'Liderul producției de energie verde din România cu 187 hidrocentrale (6.3 GW) și o marjă EBITDA excepțională de ~69%.',
        isListed: true,
      },
      {
        name: 'OMV Petrom S.A.',
        symbol: 'SNP',
        slug: 'omv-petrom',
        sector: 'Energie Integrată Oil, Gas & Power',
        metricLabel: 'Venituri FY 2025',
        metricValue: '38.80 Mld RON',
        description: 'Cel mai mare grup energetic din Europa de Sud-Est, co-operator al proiectului Neptun Deep și operator al rafinăriei Petrobrazi.',
        isListed: true,
      },
      {
        name: 'S.N.G.N. Romgaz S.A.',
        symbol: 'SNG',
        slug: 'romgaz',
        sector: 'Extracție & Producție Gaze Naturale',
        metricLabel: 'Venituri FY 2025',
        metricValue: '8.60 Mld RON',
        description: 'Principalul producător și furnizor de gaze naturale terestre din România, partener 50% în exploatarea offshore din Marea Neagră.',
        isListed: true,
      },
      {
        name: 'S.N. Nuclearelectrica S.A.',
        symbol: 'SNN',
        slug: 'nuclearelectrica',
        sector: 'Energie Nucleară',
        metricLabel: 'Venituri FY 2025',
        metricValue: '7.45 Mld RON',
        description: 'Operatorul reactoarelor 1 și 2 de la Cernavodă, asigurând aproximativ 20% din consumul național de energie electrică fără emisii CO2.',
        isListed: true,
      },
      {
        name: 'Societatea Energetică Electrica S.A.',
        symbol: 'EL',
        slug: 'bursa-de-valori-bucuresti',
        sector: 'Distribuție & Furnizare Energie',
        metricLabel: 'Venituri FY 2025',
        metricValue: '9.80 Mld RON',
        description: 'Operator regional cheie de distribuție deservind peste 3.9 milioane de puncte de consum în centrul și nordul țării.',
        isListed: true,
      },
    ],
    keyDrivers: [
      {
        title: 'Proiectul Strategic Offshore Neptun Deep',
        description: 'Investiție comună de 4 miliarde EUR între OMV Petrom și Romgaz pentru extragerea a peste 100 miliarde metri cubi de gaze naturale începând cu 2027.',
      },
      {
        title: 'Extinderea Programului Nuclear Național',
        description: 'Construcția Unităților 3 și 4 de la Cernavodă (tehnologie CANDU) și retehnologizarea Unității 1 pentru prelungirea duratei de viață cu 30 de ani.',
      },
      {
        title: 'Mecanismul CfD și Fondul de Modernizare UE',
        description: 'Alocarea a miliarde de euro prin Contracte pentru Diferență (CfD) pentru susținerea a peste 5.000 MW de capacități solare și eoliene noi.',
      },
    ],
    risks: [
      {
        category: 'Reglementare',
        title: 'Plafonări de Preț și Taxe pe Supraprofit',
        severity: 'Ridicată',
        description: 'Mecanismele de plafonare/compensare instituite prin OUG și contribuțiile impuse la Fondul de Tranziție Energetică afectează predictibilitatea marjelor de comercializare.',
      },
      {
        category: 'Macro',
        title: 'Volatilitatea Cotațiilor TTF și a Energiei OPCOM',
        severity: 'Medie',
        description: 'Fluctuațiile cotațiilor europene de referință la gaze și energie electrică pe piața spot comprimă marjele de vânzare angro.',
      },
      {
        category: 'Operațional',
        title: 'Condițiile Hidrologice și Fluctuațiile Debitelor',
        severity: 'Medie',
        description: 'Capacitatea de generare a Hidroelectrica depinde direct de regimul precipitațiilor și debitele fluviale ale Dunării și râurilor interioare.',
      },
      {
        category: 'Finanțare',
        title: 'Costul Capitalului pentru Investiții Masive pe Termen Lung',
        severity: 'Controlată',
        description: 'Proiectele mari de infrastructură energetică necesită structuri complexe de finanțare sindicalizată cu bănci internaționale de dezvoltare (BEI, BERD).',
      },
    ],
    capitalContext: {
      capitalIntensity: 'Foarte Ridicată',
      financingConditions:
        'Sector caracterizat prin generare puternică de numerar operațional, acces direct la piețele de capital BVB/LSE și sprijin masiv nerambursabil prin Fondul de Modernizare UE.',
      investmentActivity: 'Peste 15 miliarde EUR estimate în derulare pe orizontul 2024-2030.',
      majorProjects: [
        {
          name: 'Exploatarea Gazelor de Mare Adâncime Neptun Deep',
          value: '4.000.000.000 EUR',
          leadEntity: 'OMV Petrom & Romgaz',
          status: 'În Execuție',
          description: 'Foraj de adâncime și infrastructură de conducte submarine în Marea Neagră.',
        },
        {
          name: 'Retehnologizarea Amenajării Hidroelectrice Vidraru',
          value: '188.000.000 EUR',
          leadEntity: 'Hidroelectrica',
          status: 'Contract Semnat / În Lucru',
          description: 'Creșterea randamentului și prelungirea operării cu 30 de ani.',
        },
      ],
    },
    strategicOutlook: {
      growthDirection: 'România devine polul de securitate și independență energetică al Europei Centrale și de Est.',
      catalysts: [
        'Demararea producției comerciale Neptun Deep în 2027',
        'Dezvoltarea interconectorilor regionali de gaz și electricitate (Coridorul Vertical)',
        'Stocarea de energie în baterii industriale și hidrocentrale cu acumulare prin pompaj',
      ],
      constraints: [
        'Capacitatea de preluare a rețelei de transport gestionate de Transelectrica',
        'Viteza proceselor de avizare și acorduri de mediu',
      ],
      monitoringItems: [
        'Deciziile ANRE privind tarifele de transport și distribuție',
        'Evoluția prețului certificatelor de emisii CO2 (EU ETS)',
        'Debitul Dunării la intrarea în țară (secțiunea Baziaș)',
      ],
    },
    relatedIntelligence: {
      newsCategory: 'business',
      relatedCompanies: [
        { name: 'Hidroelectrica', slug: 'hidroelectrica', symbol: 'H2O' },
        { name: 'OMV Petrom', slug: 'omv-petrom', symbol: 'SNP' },
        { name: 'Romgaz', slug: 'romgaz', symbol: 'SNG' },
        { name: 'Nuclearelectrica', slug: 'nuclearelectrica', symbol: 'SNN' },
      ],
      marketsCoverage: 'Indicele BET Energy, acțiuni H2O, SNP, SNG, SNN la Bursa de Valori București.',
      hasRealEstateLink: false,
    },
  },

  // 2. BĂNCI & SERVICII FINANCIARE
  {
    id: 'ind-banking',
    slug: 'banking',
    name: 'Bănci & Servicii Financiare',
    heroTagline: 'Sistem Bancar Universal, Intermediere Financiară, Creditare Corporate & M&A',
    marketSize: '~950 Miliarde RON Active Agregate',
    marketSizeClassification: 'Official',
    growthYoY: '+11.2% YoY',
    growthClassification: 'Official',
    methodology:
      'Date oficiale raportate de Banca Națională a României (BNR) în Rapoartele de Stabilitate Financiară și Situațiile Agregate ale Instituțiilor de Credit.',
    sourceProvenance: 'Banca Națională a României (BNR), Asociația Română a Băncilor (ARB), BVB',
    coverImage: '/fallbacks/story-banking-finance.jpg',
    executiveSummary:
      'Sistemul bancar românesc prezintă niveluri ridicate de solvabilitate (>22%), rate de neperformanță (NPL) la minime istorice (~2.1%) și o profitabilitate solidă susținută de marjele de dobândă. Anii 2024-2026 sunt marcați de o consolidare accelerată prin achiziții strategice de top.',
    marketDefinition:
      'Sectorul include instituțiile de credit (bănci comerciale universale, bănci de retail și corporate), societățile de servicii de investiții financiare (SSIF), fondurile de pensii private Pilon II/III și companiile de leasing.',
    leaders: [
      {
        name: 'Banca Transilvania S.A.',
        symbol: 'TLV',
        slug: 'banca-transilvania',
        sector: 'Bănci Comerciale Universale',
        metricLabel: 'Active Totale FY 2025',
        metricValue: '168.0 Mld RON',
        description: 'Liderul detașat al pieței bancare cu o cotă de active de peste 21.5% și peste 4.2 milioane de clienți activi.',
        isListed: true,
      },
      {
        name: 'Banca Comercială Română (BCR)',
        symbol: 'ERSTE',
        slug: 'banca-transilvania',
        sector: 'Grup Bancar Universal',
        metricLabel: 'Active Totale',
        metricValue: '112.0 Mld RON',
        description: 'Al doilea mare grup bancar din România, subsidiară a Erste Group Austria, lider în creditare corporativă și soluția digitală George.',
        isListed: false,
      },
      {
        name: 'BRD - Groupe Société Générale',
        symbol: 'BRD',
        slug: 'banca-transilvania',
        sector: 'Bancă Universală',
        metricLabel: 'Active Totale',
        metricValue: '82.0 Mld RON',
        description: 'A treia bancă din sistem conform activelor, subsidiară a grupului francez Société Générale, emitent de top pe piața BVB.',
        isListed: true,
      },
      {
        name: 'UniCredit Bank România S.A.',
        symbol: 'UCB',
        slug: 'banca-transilvania',
        sector: 'Corporate & Retail Banking',
        metricLabel: 'Active Agregate',
        metricValue: '68.5 Mld RON',
        description: 'Jucător major consolidat prin tranzacția istorică de preluare a subsidiarei Alpha Bank România.',
        isListed: false,
      },
    ],
    keyDrivers: [
      {
        title: 'Marje Nete de Dobândă (NIM) Sustenabile',
        description: 'Nivelul dobânzii de politică monetară BNR (6.50%) susține marje atractive pe fondul creșterii cererii de creditare a companiilor.',
      },
      {
        title: 'Valul de Consolidare M&A Bancară',
        description: 'Preluarea OTP Bank România de către Banca Transilvania și fuziunea UniCredit cu Alpha Bank redefinește topul primilor 5 jucători.',
      },
      {
        title: 'Digitalizarea Creditării și Platformele Omnichannel',
        description: 'Peste 85% din tranzacțiile de retail și IMM se desfășoară digital prin ecosisteme mobile avansate.',
      },
    ],
    risks: [
      {
        category: 'Reglementare',
        title: 'Taxa pe Cifra de Afaceri Bancară (2%)',
        severity: 'Ridicată',
        description: 'Impozitarea suplimentară a veniturilor operaționale bancare pune presiune pe randamentul capitalului (ROE).',
      },
      {
        category: 'Macro',
        title: 'Evoluția Ratelor Dobânzilor BNR și Riscul de Credit',
        severity: 'Medie',
        description: 'Menținerea dobânzilor ridicate testează capacitatea de rambursare pe segmentele de retail vulnerabile.',
      },
      {
        category: 'Cerere',
        title: 'Încetinirea Creditării Ipotecare',
        severity: 'Medie',
        description: 'Sensibilitatea cumpărătorilor la nivelul indicilor IRCC și ROBOR influențează direct volumele de noi contracte ipotecare.',
      },
    ],
    capitalContext: {
      capitalIntensity: 'Ridicată',
      financingConditions:
        'Băncile locale beneficiază de baze largi de depozite interne și acces facil la piețele de obligațiuni MREL senior nepreferențiale.',
      investmentActivity: 'Emisiuni continue de obligațiuni verzi și transformare digitală a infrastructurii IT.',
      majorProjects: [
        {
          name: 'Integrarea Operațională a Rețelei OTP Bank',
          value: '347.500.000 EUR',
          leadEntity: 'Banca Transilvania',
          status: 'În Curs de Finalizare',
          description: 'Fuziune prin absorbție a portofoliilor de clienți și sistemelor de plăți.',
        },
      ],
    },
    strategicOutlook: {
      growthDirection: 'Creșterea gradului de intermediere financiară raportat la PIB spre media regională europeană.',
      catalysts: [
        'Finanțarea proiectelor majore de infrastructură și parcuri industriale PNRR',
        'Creșterea continuă a activelor acumulate în fondurile de pensii Pilon II (>150 Mld RON)',
      ],
      constraints: ['Taxa sectorială pe cifra de afaceri bancară', 'Gradul scăzut de alfabetizare financiară în mediul rural'],
      monitoringItems: [
        'Deciziile Consiliului de Administrație BNR privind dobânda cheie',
        'Rata creditelor neperformante (NPL ratio)',
        'Evoluția trimestrială a indicilor IRCC și ROBOR 3M',
      ],
    },
    relatedIntelligence: {
      newsCategory: 'business',
      relatedCompanies: [
        { name: 'Banca Transilvania', slug: 'banca-transilvania', symbol: 'TLV' },
        { name: 'Bursa de Valori București', slug: 'bursa-de-valori-bucuresti', symbol: 'BVB' },
      ],
      marketsCoverage: 'Ratele BNR, indicii ROBOR/IRCC, cotații TLV și BRD la BVB.',
      hasRealEstateLink: true,
    },
  },

  // 3. DEZVOLTARE IMOBILIARĂ & CONSTRUCȚII
  {
    id: 'ind-realestate',
    slug: 'real-estate',
    name: 'Dezvoltare Imobiliară & Construcții',
    heroTagline: 'Rezidențial Premium, Spații de Birouri Verzi, Parcuri Logistice & Tranzacții Naționale',
    marketSize: '~45 Miliarde RON Valoare Anuală Estimată',
    marketSizeClassification: 'Estimated',
    growthYoY: '+7.4% YoY',
    growthClassification: 'Indicative',
    methodology:
      'Agregare pe baza volumului lunar oficial de peste 51.000 tranzacții imobiliare ANCPI, suprafețelor autorizate de construire INS și evaluărilor dezvoltatorilor listați.',
    sourceProvenance: 'Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI), INS, BVB',
    coverImage: '/fallbacks/story-construction-strabag.jpg',
    executiveSummary:
      'Piața imobiliară din România rămâne una dintre cele mai dinamice din Europa Centrală și de Est, susținută de tranzacții lunare de peste 51.000 de proprietăți (ANCPI), randamente de închiriere de 7.5-8.0% în marile centre urbane și dezvoltarea puternică a proiectelor de regenerare urbană multifuncțională.',
    marketDefinition:
      'Cuprinde dezvoltarea, vânzarea și administrarea de clădiri rezidențiale noi, clădiri de birouri de clasă A cu certificări verzi (LEED, BREEAM), parcuri industriale și spații logistice, precum și centre comerciale.',
    leaders: [
      {
        name: 'One United Properties S.A.',
        symbol: 'ONE',
        slug: 'one-united-properties',
        sector: 'Dezvoltare Imobiliară Rezidențială & Birouri',
        metricLabel: 'Venituri FY 2025',
        metricValue: '1.42 Mld RON',
        description: 'Liderul pieței de dezvoltări rezidențiale și birouri verzi premium, listat pe piața principală BVB (indicele BET).',
        isListed: true,
      },
      {
        name: 'Dedeman Real Estate / Pavăl Holding',
        symbol: 'DEDEMAN',
        slug: 'dedeman',
        sector: 'Investiții Imobiliare Comerciale',
        metricLabel: 'Portofoliu Active',
        metricValue: '>1.0 Mld EUR',
        description: 'Deținătorul unora dintre cele mai mari complexe de birouri de clasă A din Capitală (The Bridge, Dacia One, U Center).',
        isListed: false,
      },
      {
        name: 'Skanska România',
        symbol: 'SKANSKA',
        slug: 'one-united-properties',
        sector: 'Dezvoltare Birouri Sustenabile',
        metricLabel: 'Proiecte Active',
        metricValue: 'Equilibrium & Campus',
        description: 'Dezvoltator internațional suedez recunoscut pentru implementarea standardelor LEED Platinum și WELL Core & Shell.',
        isListed: false,
      },
      {
        name: 'Vastint România',
        symbol: 'VASTINT',
        slug: 'one-united-properties',
        sector: 'Regenerare Urbană Mixtă',
        metricLabel: 'Portofoliu Dezvoltare',
        metricValue: 'Timpuri Noi & Business Garden',
        description: 'Dezvoltator axat pe cartiere mixte moderne cu funcțiuni de birouri, servicii comunitare și rezidențial.',
        isListed: false,
      },
    ],
    keyDrivers: [
      {
        title: 'Tranzacții Naționale Sustenabile (ANCPI)',
        description: 'Volumele lunare de tranzacționare de peste 51.000 unități imobiliare indică o cerere structurală stabilă în marile poli economici.',
      },
      {
        title: 'Randamente Investiționale Superioare (Yields 7.5-8.0%)',
        description: 'Randamentele din București și Cluj-Napoca continuă să atragă capital instituțional comparativ cu piețele mature din Europa de Vest (4.5-5.5%).',
      },
      {
        title: 'Certificări Verzi și Standarde nZEB',
        description: 'Standardele nZEB (nearly Zero-Energy Building) devin obligatorii și solicitate de marile corporații multinaționale chiriașe.',
      },
    ],
    risks: [
      {
        category: 'Reglementare',
        title: 'Blocajele de Autorizare Urbanistică în București',
        severity: 'Ridicată',
        description: 'Întârzierile în aprobarea noului Plan Urbanistic General (PUG) și anularea PUZ-urilor sectoriale reduc oferta de noi proiecte autorizate.',
      },
      {
        category: 'Reglementare',
        title: 'Regimul TVA 19% la Locuințe peste 600.000 RON',
        severity: 'Medie',
        description: 'Creșterea cotei de TVA pentru unitățile rezidențiale de clasă medie pune presiune pe bugetele familiilor cumpărătoare.',
      },
      {
        category: 'Finanțare',
        title: 'Costul Finanțării de Dezvoltare (Development Loans)',
        severity: 'Medie',
        description: 'Băncile solicită cote ridicate de pre-vânzare (pre-sales) și aport propriu de capital de minimum 30-40%.',
      },
    ],
    capitalContext: {
      capitalIntensity: 'Foarte Ridicată',
      financingConditions:
        'Dezvoltatorii folosesc structuri mixte: equity de la acționari, credite de investiții imobiliare sindicate și emisiuni de acțiuni/obligațiuni la BVB.',
      investmentActivity: 'Proiecte de peste 3 miliarde EUR în derulare în București, Cluj-Napoca, Timișoara, Iași și Brașov.',
      majorProjects: [
        {
          name: 'One Lake Club & One High District',
          value: '350.000.000 EUR',
          leadEntity: 'One United Properties',
          status: 'În Construcție',
          description: 'Dezvoltări rezidențiale de mare anvergură pe malul lacurilor din nordul Capitalei.',
        },
      ],
    },
    strategicOutlook: {
      growthDirection: 'Consolidarea dezvoltărilor multifuncționale integrate (live-work-play) și a logisticii de ultimul kilometru.',
      catalysts: [
        'Aderarea României la OCDE și îmbunătățirea ratingului de țară',
        'Deblocarea reglementărilor de urbanism metropolitan',
        'Extinderea infrastructurii de transport rapid (metrou M6 Otopeni și centura A0)',
      ],
      constraints: ['Costul terenurilor pretabile pentru proiecte mari', 'Durata lungă de obținere a racordurilor la rețelele de utilități'],
      monitoringItems: [
        'Statistica lunară a contractelor de vânzare-cumpărare ANCPI',
        'Indicele prețurilor rezidențiale (EUR/mp util)',
        'Rata de neocupare pe segmentul de birouri de clasă A',
      ],
    },
    relatedIntelligence: {
      newsCategory: 'real-estate',
      relatedCompanies: [
        { name: 'One United Properties', slug: 'one-united-properties', symbol: 'ONE' },
        { name: 'Dedeman', slug: 'dedeman', symbol: 'DEDEMAN' },
      ],
      marketsCoverage: 'Acțiuni ONE la BVB, statistici oficiale ANCPI în secțiunea Real Estate.',
      hasRealEstateLink: true,
    },
  },

  // 4. CONSTRUCȚII & INFRASTRUCTURĂ
  {
    id: 'ind-construction',
    slug: 'construction',
    name: 'Construcții & Infrastructură',
    heroTagline: 'Autostrăzi, Căi Ferate, Magistrale de Metrou & Mari Proiecte Publice și Private',
    marketSize: '~42 Miliarde RON Lucrări Anuale',
    marketSizeClassification: 'Official',
    growthYoY: '+21.2% YoY',
    growthClassification: 'Official',
    methodology: 'Date oficiale din buletinele de statistică ale lucrărilor de construcții publicate de INS.',
    sourceProvenance: 'Institutul Național de Statistică (INS), Ministerul Transporturilor, CNAIR',
    coverImage: '/fallbacks/story-construction-strabag.jpg',
    executiveSummary:
      'Sectorul construcțiilor de infrastructură din România înregistrează ritmuri record de creștere de peste 20% anual, impulsionat de cele peste 800 km de autostrăzi și drumuri expres aflate simultan în execuție (Autostrada Moldovei A7, A0 București, A1 Sibiu-Pitești), finanțate prin PNRR și fonduri europene de coeziune.',
    marketDefinition:
      'Include lucrările de inginerie civilă (autostrăzi, drumuri, căi ferate, poduri, tuneluri, aeroporturi), construcțiile inginerești speciale și clădirile nerezidențiale industriale.',
    leaders: [
      {
        name: 'STRABAG SRL România',
        symbol: 'STR',
        slug: 'one-united-properties',
        sector: 'Antreprenor General Infrastructură Mare',
        metricLabel: 'Cifră Afaceri FY 2025',
        metricValue: '2.15 Mld RON',
        description: 'Filiala gigantului austriac STRABAG SE, constructor de autostrăzi, căi ferate, piste aeroportuare și clădiri civile.',
        isListed: false,
      },
      {
        name: 'Grupul UMB Spedition',
        symbol: 'UMB',
        slug: 'one-united-properties',
        sector: 'Constructor Drumuri & Autostrăzi',
        metricLabel: 'Cifră Afaceri Cumulată',
        metricValue: '>8.0 Mld RON',
        description: 'Cel mai mare constructor român de infrastructură rutieră, principalul executant al tronsoanelor Autostrăzii Moldovei A7.',
        isListed: false,
      },
      {
        name: 'Webuild România (ex-Astaldi)',
        symbol: 'WEBUILD',
        slug: 'one-united-properties',
        sector: 'Inginerie Specială & Poduri',
        metricLabel: 'Proiecte Cheie',
        metricValue: 'Podul Brăila & A1',
        description: 'Lider în proiecte complexe de infrastructură: podul suspendat de la Brăila și secțiuni montane pe A1 Sibiu-Pitești.',
        isListed: false,
      },
      {
        name: 'Porr Construct România',
        symbol: 'PORR',
        slug: 'one-united-properties',
        sector: 'Infrastructură Feroviară & Rutieră',
        metricLabel: 'Proiecte Active',
        metricValue: 'A1 Secțiunea 4',
        description: 'Constructor austriac specializat în execuția primului tunel de autostradă forat prin metoda NATM din România.',
        isListed: false,
      },
    ],
    keyDrivers: [
      {
        title: 'Absorbția Fondurilor din PNRR și Programul Transport',
        description: 'Peste 12 miliarde EUR alocate exclusiv pentru infrastructura de transport rutier și feroviar cu termene stricte de finalizare.',
      },
      {
        title: 'Deschiderea Coridoarelor Transeuropene (TEN-T)',
        description: 'Finalizarea legăturilor rutiere între portul Constanța, frontiera de vest (Nădlac) și frontiera de nord-est (Siret).',
      },
    ],
    risks: [
      {
        category: 'Operațional',
        title: 'Deficitul de Forță de Muncă Calificată și Ingineri',
        severity: 'Ridicată',
        description: 'Nevoia de peste 50.000 de muncitori în construcții acoperită parțial prin recrutarea de personal din Asia de Sud-Est.',
      },
      {
        category: 'Finanțare',
        title: 'Presiunea pe Costurile Materialelor de Construcții',
        severity: 'Medie',
        description: 'Volatilitatea prețurilor la oțel beton, agregate de carieră și mixturi asfaltice influențează indexarea contractelor publice.',
      },
    ],
    capitalContext: {
      capitalIntensity: 'Foarte Ridicată',
      financingConditions: 'Garanții bancare masive de bună execuție și fluxuri de decontare asigurate de la bugetul de stat și Comisia Europeană.',
      investmentActivity: 'Peste 20 miliarde EUR în contracte semnate și în derulare.',
      majorProjects: [
        {
          name: 'Autostrada Moldovei A7 (Ploiești - Pașcani)',
          value: '3.200.000.000 EUR',
          leadEntity: 'CNAIR / Grupul UMB',
          status: 'În Execuție Accelerată',
          description: 'Peste 320 km de autostradă nouă cu finalizări programate etapizat.',
        },
      ],
    },
    strategicOutlook: {
      growthDirection: 'Finalizarea rețelei de bază de autostrăzi a României și modernizarea coridoarelor feroviare de mare viteză.',
      catalysts: ['Recepția la termen a tronsoanelor A7 și A0', 'Demararea forajelor la Magistrala 6 de metrou spre Otopeni'],
      constraints: ['Capacitatea administrativă de expropriere și relocare a utilităților'],
      monitoringItems: ['Ritmul lunar de decontare transmis de CNAIR și CFR', 'Indicele costului în construcții publicat de INS'],
    },
    relatedIntelligence: {
      newsCategory: 'business',
      relatedCompanies: [{ name: 'STRABAG', slug: 'one-united-properties', symbol: 'STR' }],
      marketsCoverage: 'Obligațiuni suverane de infrastructură emise de Ministerul Finanțelor.',
      hasRealEstateLink: true,
    },
  },

  // 5. AUTOMOTIVE & COMPONENTE
  {
    id: 'ind-automotive',
    slug: 'automotive',
    name: 'Automotive & Componente',
    heroTagline: 'Producție de Vehicule, Sisteme Electronice Avansate & Centre Globale R&D',
    marketSize: '~38 Miliarde EUR Cifră de Afaceri Cumulată',
    marketSizeClassification: 'Estimated',
    growthYoY: '+3.5% YoY',
    growthClassification: 'Indicative',
    methodology: 'Date statistice agregate furnizate de ACAROM (Asociația Constructorilor de Automobile din România).',
    sourceProvenance: 'ACAROM, Ministerul Economiei, INS',
    coverImage: '/fallbacks/story-automotive-lepas.jpg',
    executiveSummary:
      'Industria auto din România generează peste 12% din PIB-ul național și peste 28% din exporturile totale ale țării. Cu două mari uzine de asamblare (Dacia Mioveni și Ford Otosan Craiova) și o rețea de peste 600 de furnizori de componente tier-1 și tier-2, România este un pol esențial al industriei auto europene.',
    marketDefinition:
      'Include asamblarea de vehicule de pasageri și utilitare, fabricarea de componente mecanice, electrice și electronice, precum și activități avansate de cercetare-dezvoltare software auto (ADAS, powertrain hibrid, baterii).',
    leaders: [
      {
        name: 'Automobile Dacia S.A.',
        symbol: 'DACIA',
        slug: 'automobile-dacia',
        sector: 'Constructor Auto & Vehicule',
        metricLabel: 'Venituri FY 2025',
        metricValue: '26.50 Mld RON',
        description: 'Cea mai mare companie din România după cifra de afaceri, producător al modelelor Duster, Sandero, Jogger și al noului SUV Bigster.',
        isListed: false,
      },
      {
        name: 'Continental România',
        symbol: 'CONTI',
        slug: 'automobile-dacia',
        sector: 'Componente & Software Auto',
        metricLabel: 'Cifră Afaceri',
        metricValue: '16.2 Mld RON',
        description: 'Grup tehnologic de top operând 5 facilități industriale și 4 mari centre R&D cu peste 19.000 de angajați în România.',
        isListed: false,
      },
      {
        name: 'Ford Otosan Craiova',
        symbol: 'FORD',
        slug: 'automobile-dacia',
        sector: 'Producător Vehicule & Motoare',
        metricLabel: 'Capacitate Anuală',
        metricValue: '272.000 Unități',
        description: 'Uzina din Craiova asamblează modelul Puma și gama de vehicule comerciale Courier în variante termice și electrice.',
        isListed: false,
      },
      {
        name: 'Autoliv România',
        symbol: 'AUTOLIV',
        slug: 'automobile-dacia',
        sector: 'Sisteme de Siguranță Pasivă',
        metricLabel: 'Angajați Locali',
        metricValue: 'Peste 11.000',
        description: 'Lider mondial în producția de volane, centuri de siguranță și module airbag pentru cei mai mari constructori globali.',
        isListed: false,
      },
    ],
    keyDrivers: [
      {
        title: 'Producția Noului Dacia Bigster la Mioveni',
        description: 'Intrarea mărcii Dacia în segmentul C al SUV-urilor compacte cu marje de profit superioare.',
      },
      {
        title: 'Huburile R&D de Software Auto din România',
        description: 'Centrele din Timișoara, Iași, Sibiu și Brașov dezvoltă soluții esențiale pentru conducerea autonomă și arhitecturi electrice.',
      },
    ],
    risks: [
      {
        category: 'Macro',
        title: 'Evoluția Cererii pe Piețele Europene de Export',
        severity: 'Ridicată',
        description: 'Peste 85% din producția auto din România este destinată piețelor din Franța, Germania, Italia și Marea Britanie.',
      },
      {
        category: 'Reglementare',
        title: 'Tranziția Europeană către 2035 Zero Emisii',
        severity: 'Medie',
        description: 'Adaptarea liniilor tehnologice de motoare termice la noile standarde de electrificare și reglementările Euro 7.',
      },
    ],
    capitalContext: {
      capitalIntensity: 'Foarte Ridicată',
      financingConditions: 'Investiții directe corporative ale giganților globali (Renault Group, Ford Otosan, Continental AG, Bosch).',
      investmentActivity: 'Peste 500 milioane EUR investiți anual în robotizare și retehnologizare.',
      majorProjects: [
        {
          name: 'Lansarea Fabricației Modelului Dacia Bigster',
          value: '200.000.000 EUR',
          leadEntity: 'Automobile Dacia / Renault Group',
          status: 'Producție de Serie',
          description: 'Robotizarea liniilor de caroserie și montaj la uzina din Mioveni.',
        },
      ],
    },
    strategicOutlook: {
      growthDirection: 'Consolidarea poziției de hub de inginerie software și producție competitivă de modele hibride.',
      catalysts: ['Succesul comercial al gamei Dacia Bigster', 'Accelerarea producției modelului electric Ford Puma'],
      constraints: ['Costul energiei industriale și presiunea pe costul forței de muncă'],
      monitoringItems: ['Numărul lunar de autoturisme produse în România (ACAROM)', 'Înmatriculările auto noi din Uniunea Europeană (ACEA)'],
    },
    relatedIntelligence: {
      newsCategory: 'business',
      relatedCompanies: [{ name: 'Automobile Dacia', slug: 'automobile-dacia', symbol: 'DACIA' }],
      marketsCoverage: 'Indicatori industriali INS, indici de export automotive.',
      hasRealEstateLink: false,
    },
  },

  // 6. RETAIL FMCG & BRICOLAJ
  {
    id: 'ind-retail',
    slug: 'retail',
    name: 'Retail FMCG & Bricolaj',
    heroTagline: 'Rețele de Hipermarketuri, Segmentul Discount, DIY & Comerț cu Amănuntul',
    marketSize: '~120 Miliarde RON Cifră Afaceri Agregată',
    marketSizeClassification: 'Estimated',
    growthYoY: '+6.2% YoY',
    growthClassification: 'Indicative',
    methodology: 'Bilanțuri anuale depuse la Ministerul Finanțelor și date INS privind indicele volumului cifrei de afaceri în comerțul cu amănuntul.',
    sourceProvenance: 'Ministerul Finanțelor, INS, Consiliul Concurenței',
    coverImage: '/fallbacks/story-retail-globus.jpg',
    executiveSummary:
      'Retailul din România beneficiază de o piață internă de 19 milioane de consumatori cu putere de cumpărare în creștere. Formatul de discount (Lidl, Penny) și rețeaua națională a campionului local de bricolaj Dedeman domină clasamentele cifrelor de afaceri.',
    marketDefinition:
      'Include comerțul alimentar cu amănuntul (hipermarketuri, supermarketuri, discounteri, proximitate) și comerțul nealimentar specializat (bricolaj, mobilier, electrocasnice, fashion).',
    leaders: [
      {
        name: 'Dedeman S.R.L.',
        symbol: 'DEDEMAN',
        slug: 'dedeman',
        sector: 'Retail Bricolaj & DIY',
        metricLabel: 'Venituri FY 2025',
        metricValue: '11.80 Mld RON',
        description: 'Cea mai mare companie antreprenorială românească, liderul pieței de bricolaj cu peste 60 de hipermarketuri la nivel național.',
        isListed: false,
      },
      {
        name: 'Lidl România',
        symbol: 'LIDL',
        slug: 'dedeman',
        sector: 'Retail Discounter Alimentar',
        metricLabel: 'Cifră Afaceri',
        metricValue: '21.8 Mld RON',
        description: 'Liderul pieței de retail alimentar din România, operând o rețea de peste 350 de magazine și 6 centre logistice moderne.',
        isListed: false,
      },
      {
        name: 'Kaufland România',
        symbol: 'KAUFLAND',
        slug: 'dedeman',
        sector: 'Hipermarketuri FMCG',
        metricLabel: 'Cifră Afaceri',
        metricValue: '18.5 Mld RON',
        description: 'Liderul pe segmentul hipermarketurilor mari cu peste 175 de magazine pe plan național.',
        isListed: false,
      },
      {
        name: 'Carrefour România',
        symbol: 'CARREFOUR',
        slug: 'dedeman',
        sector: 'Retail Multiformat',
        metricLabel: 'Cifră Afaceri',
        metricValue: '12.4 Mld RON',
        description: 'Operator multiformat consolidat prin integrarea rețelei de hipermarketuri Cora.',
        isListed: false,
      },
    ],
    keyDrivers: [
      {
        title: 'Reziliența Consumului Privat',
        description: 'Creșterea salariului mediu net pe economie și stabilitatea pieței muncii susțin coșul mediu de cumpărături.',
      },
      {
        title: 'Extinderea Rețelelor de Retail Parks în Orașe Secundare',
        description: 'Dezvoltarea de parcuri de retail moderne în orașe cu populație între 30.000 și 100.000 de locuitori.',
      },
    ],
    risks: [
      {
        category: 'Reglementare',
        title: 'Plafonarea Adaosurilor Comerciale la Alimente de Bază',
        severity: 'Medie',
        description: 'Intervențiile legislative de plafonare restrâng marjele brute pe categoriile de produse esențiale.',
      },
      {
        category: 'Operațional',
        title: 'Creșterea Costurilor cu Salariul Minim și Energia',
        severity: 'Medie',
        description: 'Sectorul retail este intensiv în forță de muncă și consumator semnificativ de utilități pentru spațiile comerciale.',
      },
    ],
    capitalContext: {
      capitalIntensity: 'Medie',
      financingConditions: 'Cash-flow zilnic stabil și reinvestirea profiturilor nete de către marile rețele.',
      investmentActivity: 'Peste 800 milioane EUR anual în deschiderea de magazine noi și depozite logistice automate.',
      majorProjects: [
        {
          name: 'Construcția Noilor Centre Logistice Regionale Dedeman',
          value: '80.000.000 EUR',
          leadEntity: 'Dedeman S.R.L.',
          status: 'Operațional / În Extindere',
          description: 'Depozite logistice de clasa A pentru optimizarea aprovizionării naționale.',
        },
      ],
    },
    strategicOutlook: {
      growthDirection: 'Digitalizarea experienței de cumpărare (Self-Checkout, comenzi online cu livrare rapidă) și sustenabilitate.',
      catalysts: ['Dezvoltarea comerțului electronic alimentar și a platformelor de fidelizare digitală'],
      constraints: ['Penuria de spații logistice în apropierea marilor centre urbane'],
      monitoringItems: ['Indicele volumului cifrei de afaceri în comerțul cu amănuntul (INS)', 'Rata inflației anuale la alimente și mărfuri nealimentare'],
    },
    relatedIntelligence: {
      newsCategory: 'business',
      relatedCompanies: [{ name: 'Dedeman', slug: 'dedeman', symbol: 'DEDEMAN' }],
      marketsCoverage: 'Indicatori de consum INS, analize privind puterea de cumpărare.',
      hasRealEstateLink: true,
    },
  },

  // 7. TEHNOLOGIE, SOFTWARE & AI
  {
    id: 'ind-tech',
    slug: 'technology',
    name: 'Tehnologie, Software & AI',
    heroTagline: 'Enterprise Automation, Securitate Cibernetică, Centre de Date & Startup-uri AI',
    marketSize: '~9 Miliarde EUR (Peste 7% din PIB-ul României)',
    marketSizeClassification: 'Official',
    growthYoY: '+12.5% YoY',
    growthClassification: 'Official',
    methodology: 'Date raportate de ANIS (Asociația Patronală a Industriei de Software și Servicii) și Institutul Național de Statistică.',
    sourceProvenance: 'ANIS, INS, Rapoarte SEC 10-K',
    coverImage: '/fallbacks/story-apple-tech-cia.jpg',
    executiveSummary:
      'Sectorul IT&C este unul dintre principalele motoare de valoare adăugată din economia României, generând peste 7% din PIB și exporturi de servicii software de peste 6 miliarde EUR. România este țara de origine a primului decacorn global din regiune (UiPath) și a liderului global de securitate cibernetică Bitdefender.',
    marketDefinition:
      'Cuprinde dezvoltarea de produse software proprietare (Enterprise AI, Cybersecurity), serviciile de inginerie software la comandă (custom development), centrele de servicii partajate (SSC) și infrastructura de centre de date (Cloud / Data Centers).',
    leaders: [
      {
        name: 'UiPath Inc.',
        symbol: 'PATH',
        slug: 'uipath',
        sector: 'Robotic Process Automation & Enterprise AI',
        metricLabel: 'Venituri Globale FY 2025',
        metricValue: '1.31 Mld USD',
        description: 'Liderul mondial în automatizarea proceselor de afaceri prin agenți AI, companie fondată în București și listată la bursa din New York (NYSE: PATH).',
        isListed: true,
      },
      {
        name: 'Bitdefender',
        symbol: 'BITDEF',
        slug: 'uipath',
        sector: 'Cybersecurity & Endpoint Protection',
        metricLabel: 'Venituri Estimate',
        metricValue: '>300M USD',
        description: 'Lider global în tehnologii de securitate cibernetică protejând peste 500 de milioane de utilizatori și infrastructuri enterprise în 170+ țări.',
        isListed: false,
      },
      {
        name: 'Endava România',
        symbol: 'DAVA',
        slug: 'uipath',
        sector: 'Servicii Digitale & IT Consulting',
        metricLabel: 'Angajați în România',
        metricValue: 'Peste 4.500',
        description: 'Companie globală de servicii IT oferind consultanță și dezvoltare software avansată pentru mari bănci și companii de tehnologie.',
        isListed: false,
      },
    ],
    keyDrivers: [
      {
        title: 'Adopția Tehnologiilor Enterprise AI și Automatizării Agentice',
        description: 'Integrarea modelelor lingvistice mari (LLM) în fluxurile de lucru corporative deschide oportunități majore pentru pionierii RPA.',
      },
      {
        title: 'Investițiile în Centre de Date de Mare Capacitate',
        description: 'Dezvoltarea de proiecte noi de centre de date de sute de megawați pentru infrastructura cloud regională a Europei de Sud-Est.',
      },
    ],
    risks: [
      {
        category: 'Reglementare',
        title: 'Modificările Fiscale privind Facilitățile IT',
        severity: 'Medie',
        description: 'Eliminarea scutirilor de impozit pe venit a impus ajustări salariale pentru menținerea competitivității internaționale.',
      },
      {
        category: 'Macro',
        title: 'Prudența Bugetelor IT pe Piețele Cheie din SUA și Vestul Europei',
        severity: 'Medie',
        description: 'Ciclurile de vânzare mai lungi pentru contractele mari de transformare digitală afectează ritmul de creștere al firmelor de outsourcing.',
      },
    ],
    capitalContext: {
      capitalIntensity: 'Flexibilă',
      financingConditions: 'Runde de capital de risc (Venture Capital), listări pe piețele internaționale (NYSE) și profitabilitate operațională ridicată.',
      investmentActivity: 'Peste 400 milioane EUR atrase de startup-urile AI și companiile locale în ultimii ani.',
      majorProjects: [
        {
          name: 'Dezvoltarea Ecosistemului UiPath Autopilot & Agentic AI',
          value: '150.000.000 USD',
          leadEntity: 'UiPath Inc.',
          status: 'Lansat Comercial',
          description: 'Asistent AI integrat pentru automatizarea sarcinilor complexe de afaceri.',
        },
      ],
    },
    strategicOutlook: {
      growthDirection: 'Tranziția de la servicii software bazate pe timp și materiale către produse proprietare cu proprietate intelectuală (IP) și AI.',
      catalysts: ['Apariția noii generații de startup-uri AI fondate de ingineri români', 'Dezvoltarea huburilor tehnologice din București, Cluj, Iași și Timișoara'],
      constraints: ['Deficitul de specialiști seniori în domenii avansate (Machine Learning, Quantum Computing)'],
      monitoringItems: ['Volumul exporturilor de servicii informatice (Balanța de Plăți BNR)', 'Numărul de specialiști IT&C activi în România (INS)'],
    },
    relatedIntelligence: {
      newsCategory: 'technology',
      relatedCompanies: [{ name: 'UiPath', slug: 'uipath', symbol: 'PATH' }],
      marketsCoverage: 'Cotații internaționale NYSE: PATH, indicatori de export servicii IT.',
      hasRealEstateLink: false,
    },
  },
];

export function getIndustryDossier(slug: string): IndustryIntelligenceDossier | undefined {
  return industryDossiers.find((ind) => ind.slug === slug || ind.id === slug);
}
