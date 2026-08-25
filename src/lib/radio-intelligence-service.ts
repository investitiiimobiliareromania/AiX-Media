export interface RadioStationItem {
  id: string;
  name: string;
  slug: string;
  category: 'Business & News' | 'Macro & Policy' | 'Markets & Economy' | 'Culture & Tech';
  logo: string;
  country: string;
  city: string;
  language: string;
  streamUrl: string;
  website: string;
  description: string;
  frequency: string;
  status: 'LIVE' | 'STANDBY';
  currentShow?: string;
  currentHost?: string;
}

export const verifiedRadioStations: RadioStationItem[] = [
  {
    id: 'st-rra',
    name: 'Radio România Actualități',
    slug: 'radio-romania-actualitati',
    category: 'Macro & Policy',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop',
    country: 'România',
    city: 'București',
    language: 'Română',
    streamUrl: '/api/radio/stream-proxy?url=http://stream2.srr.ro:8000/rra',
    website: 'http://www.romania-actualitati.ro',
    description: 'Postul public național cu buletine oficiale de știri economice, transmisiuni BNR, comunicate de presă INS și analize macroeconomice.',
    frequency: '102.0 FM București',
    status: 'LIVE',
    currentShow: 'Jurnalul de Știri Economice & Matinal RRA',
    currentHost: 'Redacția RRA',
  },
  {
    id: 'st-bbc',
    name: 'BBC World Service',
    slug: 'bbc-world-service',
    category: 'Business & News',
    logo: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400&auto=format&fit=crop',
    country: 'Marea Britanie / Global',
    city: 'Londra',
    language: 'Engleză',
    streamUrl: '/api/radio/stream-proxy?url=http://stream.live.vc.bbcmedia.co.uk/bbc_world_service',
    website: 'https://www.bbc.co.uk/sounds/play/live:bbc_world_service',
    description: 'Sursa globală de știri financiare, analiza piețelor internaționale, geo-politică și decizii macroeconomice.',
    frequency: 'Global Satellite / IP',
    status: 'LIVE',
    currentShow: 'Global Business Daily',
    currentHost: 'BBC Newsroom',
  },
  {
    id: 'st-npr',
    name: 'NPR News & Business',
    slug: 'npr-news-business',
    category: 'Markets & Economy',
    logo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
    country: 'Statele Unite',
    city: 'Washington D.C.',
    language: 'Engleză',
    streamUrl: 'https://npr-ice.streamguys1.com/live.mp3',
    website: 'https://www.npr.org',
    description: 'Actualitate financiară din SUA, evoluția Wall Street, analiza Rezervei Federale (Fed) și tendințe în tehnologie.',
    frequency: 'US National / IP Stream',
    status: 'LIVE',
    currentShow: 'Morning Edition & Market Summary',
    currentHost: 'NPR Business Desk',
  },
  {
    id: 'st-rrc',
    name: 'Radio România Cultural',
    slug: 'radio-romania-cultural',
    category: 'Culture & Tech',
    logo: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=400&auto=format&fit=crop',
    country: 'România',
    city: 'București',
    language: 'Română',
    streamUrl: '/api/radio/stream-proxy?url=http://stream2.srr.ro:8000/rrc',
    website: 'http://www.radioromaniacultural.ro',
    description: 'Dezbateri despre inovație, antreprenoriat cultural, tehnologie, arhitectură și urbanism în România.',
    frequency: '101.3 FM București',
    status: 'LIVE',
    currentShow: 'Cultura de Business & Ora de Știință',
    currentHost: 'Redacția RRC',
  },
  {
    id: 'st-bucurestifm',
    name: 'București FM',
    slug: 'bucuresti-fm',
    category: 'Business & News',
    logo: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&auto=format&fit=crop',
    country: 'România',
    city: 'București',
    language: 'Română',
    streamUrl: '/api/radio/stream-proxy?url=http://stream2.srr.ro:8000/bucurestifm',
    website: 'http://www.bucurestifm.ro',
    description: 'Informații urbane, dezvoltări imobiliare în Capitală, infrastructură și dinamica afacerilor locale din București.',
    frequency: '98.3 FM București',
    status: 'LIVE',
    currentShow: 'Bucureștiul de Afaceri',
    currentHost: 'Redacția București FM',
  },
  {
    id: 'st-franceinfo',
    name: 'France Info',
    slug: 'france-info',
    category: 'Business & News',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop',
    country: 'Franța',
    city: 'Paris',
    language: 'Franceză',
    streamUrl: 'https://icecast.radiofrance.fr/franceinfo-midfi.mp3',
    website: 'https://www.francetvinfo.fr/replay-radio/france-info/',
    description: 'Informații economice europene, bursa Euronext, decizii BCE și sinteze din zona euro.',
    frequency: 'Paris / IP Stream',
    status: 'LIVE',
    currentShow: 'France Info Économie',
    currentHost: 'Radio France Desk',
  },
];
