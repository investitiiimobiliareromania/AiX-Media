export interface NeighborhoodProfile {
  id: string;
  name: string;
  sector: string;
  avgPriceSqm: number; // in EUR
  yoYChange: string; // e.g. "+8.5%"
  rentalAvgSqm: number; // in EUR/sqm/month
  grossYield: string; // e.g. "6.9%"
  activeProjectsCount: number;
  supplyDemandRatio: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  highlights: string[];
}

export interface DeveloperInstitutionalProfile {
  id: string;
  name: string;
  slug: string;
  legalName: string;
  founded: string;
  headquarters: string;
  ceo: string;
  segment: string;
  activeProjectsCount: number;
  deliveredUnits: string;
  pipelineUnits: string;
  revenue: string;
  profit: string;
  keyProjects: string[];
  description: string;
}

export interface RealEstateProjectItem {
  id: string;
  name: string;
  slug: string;
  developer: string;
  location: string;
  sectorOrArea: string;
  type: 'Residential' | 'Office' | 'Mixed-Use' | 'Logistics';
  status: 'Under Construction' | 'Completed' | 'Planning';
  deliveryDate: string;
  totalUnits: string;
  startingPrice: string;
  amenities: string[];
  description: string;
}

export interface CommercialSegmentMetric {
  segment: 'Office A-Class' | 'Retail & Malls' | 'Industrial & Logistics' | 'Land Acquisitions';
  stock: string;
  vacancyRate: string;
  primeRent: string; // EUR/sqm/month
  primeYield: string;
  keyDrivers: string[];
}

export interface RealEstateReportItem {
  id: string;
  title: string;
  category: string;
  period: string;
  summary: string;
  keyFindings: string[];
  author: string;
  publishedAt: string;
}

export const neighborhoodProfiles: NeighborhoodProfile[] = [
  {
    id: 'n-herastrau',
    name: 'Herăstrău - Aviatorilor',
    sector: 'Sector 1',
    avgPriceSqm: 4200,
    yoYChange: '+9.4%',
    rentalAvgSqm: 18.5,
    grossYield: '5.3%',
    activeProjectsCount: 8,
    supplyDemandRatio: 'Cerere Ridicată / Ofertă Limitată',
    riskLevel: 'Low',
    highlights: ['Zonă ultra-premium', 'Apropiere Parcul Regele Mihai I', 'Randamente stabile de închiriere'],
  },
  {
    id: 'n-floreasca',
    name: 'Floreasca - Barbu Văcărescu',
    sector: 'Sector 1 / 2',
    avgPriceSqm: 3650,
    yoYChange: '+8.8%',
    rentalAvgSqm: 16.0,
    grossYield: '5.8%',
    activeProjectsCount: 12,
    supplyDemandRatio: 'Cerere Mare Corporate',
    riskLevel: 'Low',
    highlights: ['Polul de business al Capitalei', 'Construcții noi verzi LEED/BREEAM', 'Servicii & retail premium'],
  },
  {
    id: 'n-pipera',
    name: 'Pipera - Nord',
    sector: 'Sector 2 / Ilfov',
    avgPriceSqm: 2450,
    yoYChange: '+7.1%',
    rentalAvgSqm: 11.5,
    grossYield: '6.4%',
    activeProjectsCount: 22,
    supplyDemandRatio: 'Ofertă Mare în Construcție',
    riskLevel: 'Medium',
    highlights: ['Școli internaționale', 'Proiecte rezidențiale de mari dimensiuni', 'Infrastructură în extindere'],
  },
  {
    id: 'n-tineretului',
    name: 'Tineretului - Timpuri Noi',
    sector: 'Sector 4',
    avgPriceSqm: 2250,
    yoYChange: '+10.2%',
    rentalAvgSqm: 12.0,
    grossYield: '6.9%',
    activeProjectsCount: 10,
    supplyDemandRatio: 'Cerere Mare de Închiriere',
    riskLevel: 'Low',
    highlights: ['Metrou Timpuri Noi & Parcul Tineretului', 'Hub de birouri Vastint', 'Ritm alert de creștere'],
  },
  {
    id: 'n-cotroceni',
    name: 'Cotroceni - Eroilor',
    sector: 'Sector 5',
    avgPriceSqm: 2850,
    yoYChange: '+6.5%',
    rentalAvgSqm: 14.0,
    grossYield: '5.9%',
    activeProjectsCount: 4,
    supplyDemandRatio: 'Ofertă Foarte Limitată',
    riskLevel: 'Low',
    highlights: ['Cartier istoric protejat', 'Proximitate Spitalul Universitar & UPB', 'Valoare patrimonială ridicată'],
  },
  {
    id: 'n-titan',
    name: 'Titan - Park Lake',
    sector: 'Sector 3',
    avgPriceSqm: 1680,
    yoYChange: '+5.4%',
    rentalAvgSqm: 9.5,
    grossYield: '7.1%',
    activeProjectsCount: 15,
    supplyDemandRatio: 'Echilibrat',
    riskLevel: 'Low',
    highlights: ['Parcul Alexandru Ioan Cuza (IOR)', 'Rețea densă de transport', 'Excelent raport preț/calitate'],
  },
];

export const developerProfiles: DeveloperInstitutionalProfile[] = [
  {
    id: 'dev-one',
    name: 'One United Properties',
    slug: 'one-united-properties',
    legalName: 'ONE UNITED PROPERTIES S.A.',
    founded: '2009',
    headquarters: 'București, Calea Floreasca 159',
    ceo: 'Victor Căpitanu & Andrei Diaconescu',
    segment: 'Residential & Office Premium Verzi',
    activeProjectsCount: 14,
    deliveredUnits: '4,200+ Apartamente',
    pipelineUnits: '6,500+ Unități',
    revenue: '1.42 Mld RON (FY 2025)',
    profit: '440 Mil RON (FY 2025)',
    keyProjects: ['One Floreasca City', 'One High District', 'One Lake Club', 'One Cotroceni Park'],
    description: 'Cel mai mare dezvoltator imobiliar rezidențial și mixt listat la Bursa de Valori București (simbol: ONE).',
  },
  {
    id: 'dev-skanska',
    name: 'Skanska Romania',
    slug: 'skanska-romania',
    legalName: 'SKANSKA CONSTRUCTION ROMANIA SRL',
    founded: '2011',
    headquarters: 'București, Equilibrium Building',
    ceo: 'Aurelia Luca',
    segment: 'Commercial Office A-Class & ESG Development',
    activeProjectsCount: 3,
    deliveredUnits: '180,000 mp Birouri',
    pipelineUnits: '60,000 mp',
    revenue: '320 Mil RON (Est.)',
    profit: '85 Mil RON',
    keyProjects: ['Equilibrium 1 & 2', 'Campus 6.1-6.3', 'Green Court Bucharest'],
    description: 'Dezvoltator suedez lider pe segmentul clădirilor de birouri sustenabile cu certificare LEED Platinum.',
  },
  {
    id: 'dev-vastint',
    name: 'Vastint Romania',
    slug: 'vastint-romania',
    legalName: 'VASTINT ROMANIA SRL',
    founded: '2008',
    headquarters: 'București, Timpuri Noi Square',
    ceo: 'Antoniu Panait',
    segment: 'Mixed-Use Urban Regeneration & Office',
    activeProjectsCount: 4,
    deliveredUnits: '120,000 mp Birouri & Retail',
    pipelineUnits: '150,000 mp',
    revenue: '280 Mil RON',
    profit: '74 Mil RON',
    keyProjects: ['Timpuri Noi Square', 'Business Garden Bucharest'],
    description: 'Divizia imobiliară a grupului Interogo (IKEA), specializată pe proiecte majore de regenerare urbană.',
  },
];

export const projectItems: RealEstateProjectItem[] = [
  {
    id: 'proj-one-floreasca',
    name: 'One Floreasca City',
    slug: 'one-floreasca-city',
    developer: 'One United Properties',
    location: 'Calea Floreasca / Mircea Eliade',
    sectorOrArea: 'Sector 1',
    type: 'Mixed-Use',
    status: 'Completed',
    deliveryDate: '2023',
    totalUnits: '247 Apartamente + 24,000 mp Birouri',
    startingPrice: '3,900 EUR/mp',
    amenities: ['Parcare subterană 3 niveluri', 'Certificare LEED Platinum', 'Restaurante gourmet', 'Parc privat'],
    description: 'Proiect emblematic de regenerare urbană multifuncțională pe fostul amplasament Automatica.',
  },
  {
    id: 'proj-one-high-district',
    name: 'One High District',
    slug: 'one-high-district',
    developer: 'One United Properties',
    location: 'Șoseaua Fabrica de Glucoză',
    sectorOrArea: 'Sector 2',
    type: 'Residential',
    status: 'Under Construction',
    deliveryDate: 'Q4 2026',
    totalUnits: '786 Apartamente',
    startingPrice: '2,400 EUR/mp',
    amenities: ['3 Turnuri de 20 de etaje', 'Încălzire prin pardoseală', 'Pompă de căldură geotermală'],
    description: 'Dezvoltare rezidențială de mare înălțime cu eficiență energetică verde ridicată.',
  },
  {
    id: 'proj-timpuri-noi',
    name: 'Timpuri Noi Square (Faza II)',
    slug: 'timpuri-noi-square-2',
    developer: 'Vastint Romania',
    location: 'Splaiul Unirii nr. 165',
    sectorOrArea: 'Sector 4',
    type: 'Office',
    status: 'Under Construction',
    deliveryDate: 'Q3 2026',
    totalUnits: '60,000 mp Suprafață Închiriabilă',
    startingPrice: '16.5 EUR/mp/lună',
    amenities: ['Metrou la ieșire', 'Piste biciclete & dușuri', 'Piațetă pietonală cu cafenele'],
    description: 'Extinderea polului de birouri de la Timpuri Noi cu încă două clădiri clasa A.',
  },
];

export const commercialMetrics: CommercialSegmentMetric[] = [
  {
    segment: 'Office A-Class',
    stock: '3.42 Milioane mp',
    vacancyRate: '11.8%',
    primeRent: '21.5 EUR/mp/lună',
    primeYield: '7.25%',
    keyDrivers: ['Reconversia spre spații verzi ESG', 'Rata de întoarcere la birou 3-4 zile/săptămână', 'Proiecte puține noi în 2026'],
  },
  {
    segment: 'Industrial & Logistics',
    stock: '7.25 Milioane mp (Național)',
    vacancyRate: '5.4%',
    primeRent: '4.65 EUR/mp/lună',
    primeYield: '7.75%',
    keyDrivers: ['Expansiunea comerțului electronic', 'Dezvoltarea autostrăzilor A0 & A7', 'Huburi regionale lângă București, Timișoara, Cluj'],
  },
  {
    segment: 'Retail & Malls',
    stock: '4.15 Milioane mp',
    vacancyRate: '3.2%',
    primeRent: '75.0 EUR/mp/lună',
    primeYield: '7.00%',
    keyDrivers: ['Consum privat rezilient', 'Trafic ridicat în parcurile de retail regionale'],
  },
  {
    segment: 'Land Acquisitions',
    stock: '250+ Hectare Disponibile',
    vacancyRate: 'N/A',
    primeRent: '800 - 2,200 EUR/mp',
    primeYield: 'N/A',
    keyDrivers: ['Blocajele PUZ de sector din București', 'Orientarea spre terenuri cu autorizații existente'],
  },
];

export const realEstateReports: RealEstateReportItem[] = [
  {
    id: 'rep-q3-2026',
    title: 'Raportul Pieței Imobiliare București Q3 2026',
    category: 'Market Intelligence',
    period: 'Q3 2026',
    summary: 'Analiza prețurilor pe mp, volumul tranzacțiilor ANCPI și dinamica marjelor de dezvoltare rezidențială.',
    keyFindings: [
      'Prețul mediu pe mp în București a atins 1,780 EUR/mp (+8.4% YoY).',
      'Sectorul 1 înregistrează cea mai mare marjă de apreciere pe segmentul lux.',
      'Dobânzile ipotecare pe IRCC s-au stabilizat la 5.86%.',
    ],
    author: 'Departamentul de Research Imobiliar AiX Media',
    publishedAt: '2026-08-20',
  },
];
