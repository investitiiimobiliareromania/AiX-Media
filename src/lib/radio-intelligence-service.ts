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
    logo: '/fallbacks/fallback-1.jpg',
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
    id: 'st-bucurestifm',
    name: 'București FM',
    slug: 'bucuresti-fm',
    category: 'Business & News',
    logo: '/fallbacks/fallback-2.jpg',
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
    id: 'st-rrc',
    name: 'Radio România Cultural',
    slug: 'radio-romania-cultural',
    category: 'Culture & Tech',
    logo: '/fallbacks/fallback-3.jpg',
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
    id: 'st-radiocluj',
    name: 'Radio Cluj (Transilvania News)',
    slug: 'radio-cluj',
    category: 'Markets & Economy',
    logo: '/fallbacks/fallback-4.jpg',
    country: 'România',
    city: 'Cluj-Napoca',
    language: 'Română',
    streamUrl: '/api/radio/stream-proxy?url=http://stream2.srr.ro:8000/radiocluj',
    website: 'http://www.radiocluj.ro',
    description: 'Actualitate economică din Transilvania, hub-ul IT din Cluj, piețe regionale și mediul de afaceri local.',
    frequency: '95.6 FM Cluj',
    status: 'LIVE',
    currentShow: 'Economia Transilvană & IT Hub',
    currentHost: 'Redacția Radio Cluj',
  },
  {
    id: 'st-radiotimisoara',
    name: 'Radio Timișoara (Banat Business)',
    slug: 'radio-timisoara',
    category: 'Business & News',
    logo: '/fallbacks/fallback-5.jpg',
    country: 'România',
    city: 'Timișoara',
    language: 'Română',
    streamUrl: '/api/radio/stream-proxy?url=http://stream2.srr.ro:8000/radiotimisoara',
    website: 'http://www.radiotimisoara.ro',
    description: 'Industria automotive, investiții străine în Banat, parcuri logistice și conexiuni comerciale cu Europa Centrală.',
    frequency: '105.9 FM Timișoara',
    status: 'LIVE',
    currentShow: 'Banat Business & Industrie',
    currentHost: 'Redacția Radio Timișoara',
  },
  {
    id: 'st-rri',
    name: 'Radio Romania International (English)',
    slug: 'radio-romania-international',
    category: 'Macro & Policy',
    logo: '/fallbacks/fallback-6.jpg',
    country: 'România / Global',
    city: 'București',
    language: 'Engleză',
    streamUrl: '/api/radio/stream-proxy?url=http://stream2.srr.ro:8000/rri1',
    website: 'http://www.rri.ro',
    description: 'Romanian financial news, BVB capital market summaries, European policy updates and international economic reporting.',
    frequency: 'Global Satellite / IP Stream',
    status: 'LIVE',
    currentShow: 'Romania Financial Review',
    currentHost: 'RRI English Service',
  },
  {
    id: 'st-franceinfo',
    name: 'France Info',
    slug: 'france-info',
    category: 'Business & News',
    logo: '/fallbacks/fallback-7.jpg',
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
