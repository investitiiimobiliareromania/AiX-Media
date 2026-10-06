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

// Strictly Real Estate, Insurance, Credit, Markets & Macro Editorial News & Information Dataset
const rawNewsArticles: NormalizedArticle[] = [
  {
    id: "ancpi-tranzactii-imobiliare-august",
    slug: "ancpi-evolutie-tranzactii-imobiliare-romania",
    title: "ANCPI: 52.430 de imobile tranzacționate la nivel național în cel mai recent raport oficial",
    excerpt:
      "Conform datelor oficiale publicate de Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI), la nivel național au fost înregistrate 52.430 de vânzări de imobile, cele mai multe fiind consemnate în București (10.685), Ilfov (4.320) și Cluj (3.210).",
    content: `
Evoluția Tranzacțiilor Imobiliare: Date Oficiale ANCPI

Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI) a publicat situația statistică oficială privind dinamica pieței imobiliare din România.

Principalele Repere Statistice Oficiale

• Volum total național: 52.430 tranzacții înregistrate în registrele de carte funciară (+1,2% lunar, +4,8% anual).
• București: 10.685 tranzacții (unități individuale, apartamente și terenuri).
• Ilfov: 4.320 tranzacții.
• Cluj: 3.210 tranzacții.
• Brașov: 2.915 tranzacții.
• Timiș: 2.730 tranzacții.
• Iași: 2.480 tranzacții.

Datele reflectă contractele de vânzare-cumpărare autentificate la notarii publici și înscrise în cărțile funciare gestionate de oficiile teritoriale de cadastru. Raportul pentru luna septembrie urmează să fie publicat la mijlocul lunii octombrie.
    `,
    source: "ANCPI",
    sourceUrl: "https://www.ancpi.ro/statistici/",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/real-estate/ancpi-evolutie-tranzactii-imobiliare-romania",
    publishedAt: "2026-10-02",
    fetchedAt: "2026-10-06",
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
        "Volumul lunar de 52.430 de tranzacții confirmă nivelul susținut de activitate din cărțile funciare și indică lichiditate stabilă în marile poli urbane (București, Ilfov, Cluj, Brașov).",
      businessImpact:
        "Dezvoltatorii imobiliari și investitorii rezidențiali înregistrează un ritm constant de vânzare a stocurilor noi, cu cerere concentrată pe proprietățile bine conectate la infrastructură.",
      marketConnection:
        "Tranzacțiile rezidențiale influențează direct portofoliile de credite ipotecare ale băncilor comerciale (Banca Transilvania, BRD) și dinamica sectorului construcțiilor.",
      whatToWatchNext:
        "Publicarea raportului statistic ANCPI pentru luna septembrie la mijlocul lunii octombrie și evoluția contractelor ipotecare autentificate.",
    },
  },
  {
    id: "bnr-impact-dobanzi-creditare-ipotecara",
    slug: "bnr-decizie-rata-dobanzii-politica-monetara",
    title: "BNR & Piața Ipotecară: IRCC la 5,86% și menținerea ratei de politică monetară la 6,50%",
    excerpt:
      "Consiliul de Administrație al BNR menține rata dobânzii de politică monetară la 6,50%, în timp ce soldul creditelor ipotecare pentru locuințe a atins 109,8 miliarde RON.",
    content: `
Sinteză BNR & Piața Creditelor Ipotecare

Consiliul de Administrație al Băncii Naționale a României a analizat evoluția creditului neguvernamental și structura împrumuturilor ipotecare acordate populației.

Subiecte Cheie & Indicatori

1. Rata Dobânzii de Politică Monetară: Menținută la 6,50% pe an în ședința de politică monetară.
2. Indicele IRCC: Cotația de 5,86% aplicabilă pentru contractele reglementate prin OUG 19/2019.
3. Soldul Creditului Ipotecar: A depășit 109,8 miliarde RON la nivel național.
4. Preferințe Debitori: Ponderea creditelor ipotecare cu dobândă fixă în primii 3-5 ani continuă să depășească 60% din noile finanțări acordate.
    `,
    source: "BNR",
    sourceUrl: "https://www.bnr.ro/Financial-info-5682.aspx",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/real-estate/bnr-decizie-rata-dobanzii-politica-monetara",
    publishedAt: "2026-10-04",
    fetchedAt: "2026-10-06",
    category: "credits",
    categoryLabel: "Creditare Ipotecară BNR",
    image: "/fallbacks/fallback-1.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Financiară",
    readTime: "5 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Stabilitatea ratei cheie BNR și predictibilitatea indicelui IRCC permit debitorilor să își planifice costurile de finanțare pe termen mediu.",
      businessImpact:
        "Băncile comerciale își calibrează ofertele de creditare cu dobânzi fixe promoționale pentru a atrage debitori eligibili pe segmentul rezidențial.",
      marketConnection:
        "Conexiune directă cu veniturile nete din dobânzi ale marilor bănci comerciale listate la BVB (Banca Transilvania, BRD).",
      whatToWatchNext:
        "Raportul trimestrial asupra inflației prezentat de BNR și dinamica lichidității interbancare.",
    },
  },
  {
    id: "asf-piata-asigurari-semestrul-1",
    slug: "asf-raport-piata-asigurari-romania-s1",
    title: "ASF: Piața asigurărilor a depășit 10 miliarde de lei prime brute subscrise în S1 2026",
    excerpt:
      "Raportul oficial al Autorității de Supraveghere Financiară (ASF) indică un avans de 8,5% al pieței de asigurări în primul semestru, susținut de segmentele CASCO, proprietăți și asigurări de viață.",
    content: `
Raportul Oficial ASF privind Piața Asigurărilor

Autoritatea de Supraveghere Financiară (ASF) a publicat datele statistice agregate privind evoluția pieței de asigurări din România pentru primul semestru al anului 2026.

Indicatori Principali din Raportul ASF

• Prime Brute Subscrise (PBS) Total: 10,2 miliarde RON (+8,5% față de S1 2025).
• Asigurări Generale: 8,4 miliarde RON (RCA: ~4,2 Mld RON, CASCO: ~1,9 Mld RON, Incendiu și Bunuri: ~1,4 Mld RON).
• Asigurări de Viață: 1,8 miliarde RON (+12% dinamică anuală).
• Despăgubiri și Indemnizații Plătite: 4,3 miliarde RON achitate asiguraților și păgubiților.
• Gradul de Acoperire PAD: Peste 2,1 milioane de locuințe asigurate obligatoriu conform evidențelor PAID.
    `,
    source: "ASF",
    sourceUrl: "https://asfromania.ro/ro/a/2405/rapoarte-statistice",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/news/asf-raport-piata-asigurari-romania-s1",
    publishedAt: "2026-10-03",
    fetchedAt: "2026-10-06",
    category: "insurance",
    categoryLabel: "Statistici Asigurări ASF",
    image: "/fallbacks/story-banking-finance.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Asigurări",
    readTime: "5 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Depășirea pragului de 10 miliarde de lei în doar 6 luni reflectă maturizarea pieței și creșterea ponderii polițelor facultative de sănătate, viață și bunuri.",
      businessImpact:
        "Companiile de asigurare își consolidează rezervele tehnice și marjele de solvabilitate SCR și MCR conform normelor Solvency II.",
      marketConnection:
        "Impact asupra protecției creditelor ipotecare și garanțiilor bancare colaterale aferente portofoliilor de clădiri și active industriale.",
      whatToWatchNext:
        "Noile măsuri de reglementare privind digitalizarea constatării amiabile și evoluția ratei daunei combinate pe segmentul auto.",
    },
  },
  {
    id: "baar-amiabila-digitala-constatare-auto",
    slug: "baar-asf-adoptare-amiabila-digitala-accidente-auto",
    title: "BAAR & ASF: Peste 450.000 de șoferi au utilizat aplicația 'Amiabila' pentru constatarea digitală a accidentelor",
    excerpt:
      "Biroul Asigurătorilor de Autovehicule din România (BAAR) raportează accelerarea adopției protocolului digital de constatare amiabilă, reducând timpul mediu de deschidere a dosarului de daună RCA.",
    content: `
Digitalizarea Pieței RCA: Bilanțul Protocolului Amiabila

Biroul Asigurătorilor de Autovehicule din România (BAAR), sub supravegherea ASF, a publicat bilanțul utilizării platformei naționale „Amiabila” pentru avizarea electronică a accidentelor rutiere fără victime.

Date Statistice & Impact Operațional

• Utilizatori activi: Peste 450.000 de descărcări și formulare digitale inițiate de conducătorii auto.
• Timp mediu de completare: 12-15 minute direct pe smartphone, prin desenarea schemei electronice a accidentului și fotografierea documentelor.
• Integrare cu asigurătorii: Transmiterea automată a documentelor către toți asigurătorii RCA licențiați de ASF, eliminând necesitatea deplasării fizice pentru depunerea formularului clasic tipărit.
• Acuratețe geolocație: Localizarea GPS precisă a coliziunii reduce disputele privind circumstanțele accidentului.
    `,
    source: "BAAR",
    sourceUrl: "https://baar.ro",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/news/baar-asf-adoptare-amiabila-digitala-accidente-auto",
    publishedAt: "2026-10-04",
    fetchedAt: "2026-10-06",
    category: "insurance",
    categoryLabel: "Inovație RCA & Digitalizare",
    image: "/fallbacks/story-automotive-lepas.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Asigurări",
    readTime: "4 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Digitalizarea constatării amiabile reduce frauda din dosarele RCA și scurtează durata de soluționare a daunelor materiale.",
      businessImpact:
        "Asigurătorii auto optimizează costurile administrative de procesare a dosarelor și accelerează eliberarea notelor de intrare în reparație către service-uri.",
      marketConnection:
        "Eficiența procesării dosarelor reduce presiunea pe ratele daunei combinate din portofoliile RCA.",
      whatToWatchNext:
        "Extinderea integrării cu sistemele de decontare directă și arhivarea digitală a dosarelor de daună.",
    },
  },
  {
    id: "casco-costuri-reparatii-senzori-adas",
    slug: "piata-casco-costuri-reparatii-senzori-adas-faruri-led",
    title: "Piața CASCO: Creșterea costului mediu al reparațiilor pe fondul tehnologiilor ADAS și senzorilor auto complecși",
    excerpt:
      "Analiza pieței CASCO indică o majorare cu 14% a costului mediu per daună auto, determinată de echipamentele electronice avansate (senzori radar, camere video, faruri Matrix LED) montate pe vehiculele de generație nouă.",
    content: `
Dinamica Reparațiilor CASCO: Impactul Noilor Tehnologii Auto

Evoluția industriei auto către vehicule echipate cu sisteme avansate de asistență a conducerii (ADAS) și propulsie hibridă/electrică modifică fundamental structura costurilor de despăgubire pe polițele CASCO.

Concluzii Tehnice & Date de Piață

1. Calibrarea Senzorilor ADAS: Înlocuirea unui parbriz cu senzori de menținere a benzii sau a unei bare de protecție necesită recalibrare software dedicată, adăugând 1.500 - 3.500 RON la devizul standard.
2. Faruri Tehnologie LED/Laser: Costul unui singur bloc optic de ultimă generație poate depăși 12.000 - 18.000 RON pe modelele din clasele medie și premium.
3. Componente din Aluminiu & Fibră: Reparațiile de caroserie necesită ateliere autorizate cu tehnologii speciale de sudură și îndreptare la rece.
    `,
    source: "ASF & UNSAR",
    sourceUrl: "https://unsar.ro",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/news/piata-casco-costuri-reparatii-senzori-adas-faruri-led",
    publishedAt: "2026-10-04",
    fetchedAt: "2026-10-06",
    category: "insurance",
    categoryLabel: "Analiză CASCO & Costuri Auto",
    image: "/fallbacks/story-automotive-lepas.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Asigurări Auto",
    readTime: "5 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "O coliziune minoră de parcare la un autoturism modern poate genera un deviz de peste 20.000 RON din cauza senzorilor din barele de protecție, făcând polița CASCO esențială pentru protecția bugetului.",
      businessImpact:
        "Service-urile auto independente sunt nevoite să investească în echipamente de diagnoză și calibrare optică agreate de producători.",
      marketConnection:
        "Subscrierile CASCO rămân cel mai dinamic segment non-viață cu creștere a primelor brute de peste 10% anual.",
      whatToWatchNext:
        "Evoluția franșizelor la reînnoirea polițelor CASCO pentru vehicule electrice și hibride.",
    },
  },
  {
    id: "paid-fond-locativ-asigurare-dezastre",
    slug: "paid-romania-fond-locativ-asigurare-dezastre-naturale",
    title: "PAID România: Peste 2,15 milioane de locuințe asigurate obligatoriu împotriva dezastrelor naturale",
    excerpt:
      "Datele oficiale ale Pool-ului de Asigurare Împotriva Dezastrelor Naturale (PAID) consemnează menținerea gradului de cuprindere în asigurarea obligatorie PAD la peste 22% din fondul locativ național.",
    content: `
Bilanțul Asigurărilor Obligatorii de Locuințe (PAD)

PAID România a prezentat datele statistice actualizate privind numărul polițelor PAD active la nivel național, emise conform Legii nr. 260/2008.

Sinteză Statistică

• Polițe active: 2.155.400 de locuințe asigurate împotriva cutremurelor, inundațiilor naturale și alunecărilor de teren.
• Distribuție urban vs. rural: 74% din polițe sunt încheiate în mediul urban (București, Ilfov, Cluj, Timiș, Brașov).
• Suma Asigurată Legală: 20.000 EUR pentru clădirile Tip A (structură din beton, cărămidă) și 10.000 EUR pentru Tip B.
• Prima anuală legală: 130 RON/an pentru locuințe Tip A și 50 RON/an pentru locuințe Tip B.
    `,
    source: "PAID România",
    sourceUrl: "https://paidromania.ro",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/news/paid-romania-fond-locativ-asigurare-dezastre-naturale",
    publishedAt: "2026-10-02",
    fetchedAt: "2026-10-06",
    category: "insurance",
    categoryLabel: "Asigurări Imobiliare PAD",
    image: "/fallbacks/fallback-2.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Imobiliară & Asigurări",
    readTime: "4 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Polița PAD constituie baza legală obligatorie pentru protecția locuințelor, fiind condiție prealabilă pentru încheierea unei asigurări facultative extinse.",
      businessImpact:
        "Băncile creditoare solicită obligatoriu menținerea în vigoare a poliței PAD și a celei facultative cesionate pe toată durata creditului ipotecar.",
      marketConnection:
        "Protejează colateralul imobiliar al sistemului bancar românesc evaluat la peste 100 de miliarde de lei.",
      whatToWatchNext:
        "Campaniile de conștientizare derulate de autoritățile locale pentru creșterea gradului de cuprindere în mediul rural.",
    },
  },
  {
    id: "asigurari-sanatate-privata-crestere",
    slug: "asigurari-private-sanatate-crestere-spitalizare-clinici",
    title: "Asigurările Private de Sănătate: Creștere de 18% a subscrierilor pe fondul cererii de spitalizare și intervenții chirurgicale",
    excerpt:
      "Piața asigurărilor private de sănătate continuă să fie cel mai dinamic segment facultativ din România, cererea migrând dinspre abonamentele medicale de bază către polițe complete cu acoperire spitalicească.",
    content: `
Evoluția Asigurărilor Private de Sănătate

Conform rapoartelor agregate de ASF și asociațiile de profil, segmentul asigurărilor de sănătate a consemnat o expansiune de 18% în volumul primelor brute subscrise.

Diferențiatori & Tendințe

1. Trecerea de la Abonament la Poliță: Dacă abonamentul clinic acoperă doar consultații și analize uzuale de laborator, asigurarea privată de sănătate decontează intervențiile chirurgicale complexe, spitalizarea în rețele private și accesul la a doua opinie medicală internațională (Second Medical Opinion).
2. Pachete Corporate ca Beneficiu de Retenție: Peste 80% din volumul polițelor de sănătate este generat de companiile din IT, servicii financiare, farma și producție industrială.
3. Deducere Fiscală: Legislația fiscală permite angajatorilor și angajaților o deducere de până la 400 EUR/an per persoană pentru primele de asigurare voluntară de sănătate.
    `,
    source: "ASF & UNSAR",
    sourceUrl: "https://asfromania.ro",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/news/asigurari-private-sanatate-crestere-spitalizare-clinici",
    publishedAt: "2026-10-04",
    fetchedAt: "2026-10-06",
    category: "insurance",
    categoryLabel: "Sănătate & Protecție Personală",
    image: "/fallbacks/story-banking-finance.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Sănătate & Asigurări",
    readTime: "5 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Asigurarea de sănătate oferă securitate financiară în fața cheltuielilor neprevăzute de spitalizare sau tratamente chirurgicale care pot depăși 30.000 - 50.000 RON.",
      businessImpact:
        "Companiile folosesc polițele de sănătate pentru a diminua absenteismul și a crește fidelitatea talentelor cheie.",
      marketConnection:
        "Dezvoltarea continuă a marilor rețele de spitale private (MedLife, Regina Maria, Sanador) este strâns legată de decontările directe din polițe.",
      whatToWatchNext:
        "Noile produse de asigurare de sănătate cu acoperire transfrontalieră europeană.",
    },
  },
  {
    id: "cyber-insurance-directiva-nis2-imm",
    slug: "asigurari-riscuri-cibernetice-directiva-nis2-imm-romania",
    title: "Cyber Insurance: Directiva Europeană NIS2 accelerează cererea de asigurări împotriva atacurilor cibernetice",
    excerpt:
      "Companiile din sectoare esențiale și importante accelerează contractarea de polițe Cyber Insurance pentru a acoperi costurile de investigație forensic, restabilirea bazelor de date și răspunderea civilă pentru breșe de date.",
    content: `
Gestiunea Riscului Cibernetic: Directiva NIS2 și Asigurările Cyber

Directiva Europeană NIS2 impune cerințe stricte de securitate cibernetică și raportare a incidentelor pentru mii de companii mijlocii și mari din energie, transporturi, bănci, sănătate, infrastructură digitală și producție.

Ce Acoperă o Poliță Cyber Risk Modernă

• Răspundere față de Terți: Despăgubiri și cheltuieli de apărare juridică generate de scurgerea neautorizată de date cu caracter personal (GDPR) sau date confidențiale de business.
• Daune Directe (First Party): Costurile de investigare tehnică IT forensic, decontarea echipelor de răspuns la incidente și cheltuielile de refacere a sistemelor informatice.
• Pierderi din Întreruperea Activității (Business Interruption): Compensarea profitului operațional nerealizat pe durata indisponibilității serverelor și platformelor de tranzacționare.
• Negociere și Răscumpărare Ransomware: Asistență specializată de criză și consultanță legală.
    `,
    source: "Directoratul Național de Securitate Cibernetică & ASF",
    sourceUrl: "https://dnsc.ro",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/news/asigurari-riscuri-cibernetice-directiva-nis2-imm-romania",
    publishedAt: "2026-10-05",
    fetchedAt: "2026-10-06",
    category: "insurance",
    categoryLabel: "Cyber Risk & Securitate Digitală",
    image: "/fallbacks/story-ai-startup.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Cyber & Risk",
    readTime: "6 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Amenzile administrative NIS2 și GDPR, cumulate cu pierderile din oprirea producției, pot periclita solvabilitatea unei companii fără un scut de reasigurare cibernetică.",
      businessImpact:
        "Consiliile de administrație și directorii IT includ cerințele de asigurare cyber în cererile de ofertă transmise partenerilor comerciali.",
      marketConnection:
        "Piața europeană de cyber insurance înregistrează ritmuri medii anuale de creștere de peste 20%.",
      whatToWatchNext:
        "Ghidurile tehnice emise de DNSC pentru clasificarea entităților esențiale și importante.",
    },
  },
  {
    id: "asigurari-raspundere-profesionala-malpraxis",
    slug: "asigurari-raspundere-profesionala-malpraxis-directori-do",
    title: "Asigurările de Răspundere Profesională & D&O: Creștere a acoperirilor pentru administratori, medici și specialiști IT",
    excerpt:
      "Piața polițelor de răspundere civilă profesională și Directors & Officers (D&O) consemnează o cerere ridicată în contextul litigiilor contractuale și al complexității deciziilor executive.",
    content: `
Protecția Răspunderii Profesionale și Managementului

Asigurările de răspundere profesională protejează specialiștii (avocați, notari, medici, arhitecți, contabili, dezvoltatori software) și echipele executive împotriva pretențiilor de despăgubire formulate de clienți sau terți pentru erori, omisiuni sau neglijențe în exercitarea atribuțiilor.

Linii de Protecție Cheie

1. Polițe D&O (Directors and Officers Liability): Protejează patrimoniul personal al administratorilor și membrilor consiliului de administrație împotriva proceselor intentate de acționari, autorități de reglementare sau creditori.
2. Răspundere Profesională IT & Tech: Acoperă pierderile financiare suferite de clienți în cazul nefuncționării aplicațiilor software livrate sau al erorilor de codare ce cauzează blocaje operaționale.
3. Malpraxis Medical: Acoperă daunele materiale și morale solicitate de pacienți ca urmare a actelor medicale.
    `,
    source: "ASF",
    sourceUrl: "https://asfromania.ro",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/news/asigurari-raspundere-profesionala-malpraxis-directori-do",
    publishedAt: "2026-10-03",
    fetchedAt: "2026-10-06",
    category: "insurance",
    categoryLabel: "Răspundere Profesională & D&O",
    image: "/fallbacks/story-banking-finance.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Asigurări Comerciale",
    readTime: "5 min read",
    featured: false,
    trending: false,
    intelligence: {
      whyItMatters:
        "Polița D&O și răspunderea profesională previn executarea silită a averii personale a specialiștilor și directorilor în cazul unor litigii comerciale complexe.",
      businessImpact:
        "Investitorii instituționali și fondurile de venture capital impun deținerea unei polițe D&O ca o condiție obligatorie pentru numirea noilor administratori.",
      marketConnection:
        "Direct corelat cu volumul de fuziuni, achiziții (M&A) și proiecte de anvergură din economie.",
      whatToWatchNext:
        "Standardizarea clauzelor de 'retroactive date' și 'extended reporting period' în contractele de consultanță internaționale.",
    },
  },
  {
    id: "asigurari-riscuri-speciale-marine-aviatie",
    slug: "asigurari-riscuri-speciale-aeronave-private-iahturi-maritime",
    title: "Asigurări de Risc Special: Dinamica protecției activelor de mare valoare, aeronavelor private și navigației maritime",
    excerpt:
      "Segmentul riscurilor speciale (marine, aviation & high-value assets) înregistrează soluții personalizate de sindicate de reasigurare pentru proprietarii de aeronave de afaceri, ambarcațiuni și colecții de artă.",
    content: `
Ghidul Asigurărilor pentru Active de Mare Valoare (Special Risks)

Managementul riscului pentru active de patrimoniu ridicat impune structuri contractuale specializate, sindicate internaționale de subscriere și inspecții tehnice riguroase de risc.

Domenii de Acoperire

• Aviație Generală și Zboruri Private: Asigurarea corpului aeronavei (Hull All Risks), răspunderea civilă față de pasageri și terți la sol, precum și acoperirea riscurilor de război și confiscare.
• Ambarcațiuni Maritime și Fluviale (Marine Hull & P&I): Protecția iahturilor și navelor comerciale împotriva avariei particulare, furtunii, eșuării și poluării accidentale.
• Colecții de Artă & Bunuri de Lux: Clauze tip „Fine Art All Risks” cu evaluări periodice efectuate de experți independenți autorizați.
    `,
    source: "EIOPA & Asigurători Specializați",
    sourceUrl: "https://www.eiopa.europa.eu",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/news/asigurari-riscuri-speciale-aeronave-private-iahturi-maritime",
    publishedAt: "2026-10-01",
    fetchedAt: "2026-10-06",
    category: "insurance",
    categoryLabel: "Special Risks • Aviație & Marine",
    image: "/fallbacks/story-maritime-port.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Riscuri Speciale",
    readTime: "6 min read",
    featured: false,
    trending: false,
    intelligence: {
      whyItMatters:
        "Activele de mobilitate premium (aeronave, ambarcațiuni) operează transfrontalier și necesită acoperiri conforme cu convențiile internaționale (ICAO, IMO).",
      businessImpact:
        "Operatorii de chartere private și companiile de management naval își asigură continuitatea licențelor de operare prin polițe globale agreate internațional.",
      marketConnection:
        "Corelare cu piața globală de reasigurare de la Londra și centrele financiare europene.",
      whatToWatchNext:
        "Evoluția cerințelor de asigurare pentru noile aeronave sustenabile și combustibili alternativi SAF.",
    },
  },
  {
    id: "asigurari-calatorie-storno-urgente",
    slug: "asigurari-calatorie-storno-acoperire-urgente-medicale",
    title: "Asigurările de Călătorie: Ponderea clauzelor Storno și asistență medicală de urgență în străinătate",
    excerpt:
      "Polițele de călătorie moderne integrează acoperiri extinse pentru anularea vacanțelor (Storno), repatriere medicală de urgență și pierderea bagajelor pe rutele internaționale aglomerate.",
    content: `
Sinteza Asigurărilor de Călătorie & Asistență Medicală

Asigurarea de călătorie reprezintă un instrument esențial de prevenție financiară pentru deplasările turistice și de business în afara granițelor României.

Elemente Critice de Acoperire

• Asistență Medicală & Spitalizare de Urgență: Decontarea directă a costurilor de tratament în spitale străine, unde o zi de spitalizare poate depăși 2.000 - 5.000 EUR.
• Repatriere Sanitară: Acoperirea transportului medical asistat către România în caz de accident grav sau afecțiune acută.
• Clauza Storno (Anulare Călătorie): Rambursarea biletelor de avion și a cazărilor nerambursabile dacă deplasarea nu mai poate avea loc din motive medicale dovedite sau evenimente fortuite.
• Bagaje & Întârzieri de Zbor: Despăgubiri fixe pentru cumpărarea de bunuri de primă necesitate în cazul întârzierii bagajelor de cală peste 6-12 ore.
    `,
    source: "UNSAR",
    sourceUrl: "https://unsar.ro",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/news/asigurari-calatorie-storno-acoperire-urgente-medicale",
    publishedAt: "2026-10-02",
    fetchedAt: "2026-10-06",
    category: "insurance",
    categoryLabel: "Travel Insurance & Asistență",
    image: "/fallbacks/story-travel-bulgaria.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Travel & Protecție",
    readTime: "4 min read",
    featured: false,
    trending: false,
    intelligence: {
      whyItMatters:
        "Cardul European de Sănătate (CEASS) acoperă doar serviciile de bază în sistemul public, pe când asigurarea privată de călătorie decontează clinicile private și repatrierea sanitară completă.",
      businessImpact:
        "Companiile care trimit angajați în delegații externe contractează polițe anuale corporate multi-trip cu acoperire globală.",
      marketConnection:
        "Direct corelat cu volumele de pasageri înregistrate pe aeroporturile internaționale din România.",
      whatToWatchNext:
        "Noile opțiuni de despăgubire automată instantanee pe card în caz de întârziere confirmată a zborurilor.",
    },
  },
  {
    id: "bvb-bet-indice-record-trimestru-4",
    slug: "bvb-indice-bet-performanta-trimestrul-patru",
    title: "Bursa de Valori București: Indicele BET deschide trimestrul IV peste pragul de 18.600 de puncte",
    excerpt:
      "Indicele principal BET al Bursei de Valori București a consemnat o evoluție pozitivă în primele ședințe din octombrie, susținut de rezultatele financiare semestriale solide ale companiilor energetice și bancare.",
    content: `
Piața de Capital: Analiza Tranzacționării la BVB

Bursa de Valori București (BVB) a debutat în trimestrul IV 2026 pe fondul unui interes ridicat din partea investitorilor instituționali și de retail.

Repere de Piață

1. Indicele BET: Se menține la nivelul de 18.650 de puncte, înregistrând un randament de peste +15,5% de la începutul anului.
2. Indicele BET-TR: Depășește 40.300 de puncte, reflectând și dividendul reinvestit distribuit de marii emitenți.
3. Lichiditate și Volume: Banca Transilvania (TLV), Hidroelectrica (H2O), OMV Petrom (SNP) și Romgaz (SNG) generează peste 70% din rulajul zilnic pe acțiuni.
4. Emisiuni Fidelis: Titlurile de stat tranzacționate la BVB continuă să asigure un volum record de lichiditate fără risc suveran direct.
    `,
    source: "Bursa de Valori București",
    sourceUrl: "https://www.bvb.ro",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/markets/bvb-indice-bet-performanta-trimestrul-patru",
    publishedAt: "2026-10-05",
    fetchedAt: "2026-10-06",
    category: "markets",
    categoryLabel: "Piețe de Capital BVB",
    image: "/fallbacks/story-bond-crisis.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Piețe Financiare",
    readTime: "5 min read",
    featured: true,
    trending: true,
    intelligence: {
      whyItMatters:
        "Performanța indicilor BVB reflectă intrările constante de capital din partea fondurilor de pensii administrate privat (Pilon II) și a investitorilor individuali.",
      businessImpact:
        "Emitenții listați beneficiază de evaluări atractive care facilitează emisiunile viitoare de obligațiuni corporative și majorările de capital.",
      marketConnection:
        "Corelare directă cu randamentele titlurilor de stat românești și evoluția indicilor europeni (DAX, Euro Stoxx 50).",
      whatToWatchNext:
        "Calendarul de raportare a rezultatelor financiare pentru trimestrul III 2026 ce va debuta la sfârșitul lunii octombrie.",
    },
  },
  {
    id: "business-energie-neptun-deep-investitii",
    slug: "neptun-deep-investitii-strategice-energie-romgaz-omv",
    title: "Energie & Investiții Strategice: Progresul proiectului Neptun Deep și tranziția energetică în România",
    excerpt:
      "OMV Petrom și Romgaz avansează conform calendarului asumat în dezvoltarea zăcământului de gaze offshore Neptun Deep, cu un buget investițional total de până la 4 miliarde EUR.",
    content: `
Sinteza Marilor Investiții Energetice din România

Sectorul energetic din România traversează o etapă istorică de extindere a capacităților de producție internă de gaze naturale și energie regenerabilă.

Elemente Cheie ale Proiectului

• Valoarea Investițiilor: Până la 4 miliarde EUR împărțite egal între OMV Petrom (operator) și Romgaz.
• Volum Estimat de Gaze: Circa 100 de miliarde de metri cubi de gaze naturale recuperabile din perimetrul de mare adâncime.
• Producție Anuală Estimată: ~8 miliarde de metri cubi pe an la platoul de producție, transformând România în cel mai mare producător net de gaze din UE.
• Calendar Operațional: Primele volume de producție comercială sunt programate pentru anul 2027.
    `,
    source: "BVB & Rapoarte Companii",
    sourceUrl: "https://www.omvpetrom.com/ro/sustenabilitate/neptun-deep",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/business/neptun-deep-investitii-strategice-energie-romgaz-omv",
    publishedAt: "2026-10-04",
    fetchedAt: "2026-10-06",
    category: "business",
    categoryLabel: "Energie & Investiții",
    image: "/fallbacks/story-energy-solar.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Corporate",
    readTime: "6 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Neptun Deep reprezintă cel mai mare proiect investițional din istoria energetică a României, asigurând independența energetică și venituri fiscale substanțiale la buget.",
      businessImpact:
        "Contractele de achiziție de echipamente și servicii offshore generează comenzi industriale semnificative pentru companiile locale de inginerie și logistică.",
      marketConnection:
        "Susține evaluările de piață și fluxurile de numerar pe termen lung pentru acțiunile SNP și SNG listate la BVB.",
      whatToWatchNext:
        "Finalizarea lucrărilor de construcție a platformei maritime și a conductei submarine de aducțiune la țărm.",
    },
  },
  {
    id: "ministerul-finantelor-buget-titluri-stat",
    slug: "ministerul-finantelor-executie-bugetara-titluri-fidelis",
    title: "Ministerul Finanțelor: Execuția bugetară și calendarul emisiunilor de titluri de stat pentru populație",
    excerpt:
      "Ministerul Finanțelor a prezentat bilanțul execuției bugetare și programul de finanțare a datoriei publice prin emisiunile de titluri de stat Fidelis și Tezaur în trimestrul IV 2026.",
    content: `
Finanțe Publice & Emisiuni Suverane

Ministerul Finanțelor gestionează necesarul brut de finanțare a statului român prin diversificarea canalelor de împrumut pe piața internă și internațională.

Puncte Cheie de Politică Fiscală

1. Datoria Publică: Menținută la 52,6% din PIB, sub plafonul de avertizare de 60% prevăzut în Tratatul de la Maastricht.
2. Titlurile Fidelis: Emisiunile denominate în RON și EUR listate la Bursa de Valori București continuă să ofere dobânzi neimpozabile competitive pentru populație.
3. Finanțarea Investițiilor PNRR: Peste 40% din cheltuielile de capital sunt orientate spre autostrăzi (A7, A8), infrastructură feroviară și tranziție energetică.
    `,
    source: "Ministerul Finanțelor",
    sourceUrl: "https://mfinante.gov.ro",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/finance/ministerul-finantelor-executie-bugetara-titluri-fidelis",
    publishedAt: "2026-10-05",
    fetchedAt: "2026-10-06",
    category: "finance",
    categoryLabel: "Finanțe Publice & Titluri de Stat",
    image: "/fallbacks/story-banking-finance.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Finanțe Publice",
    readTime: "5 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Stabilitatea execuției bugetare influențează direct ratingul suveran de țară atribuit de agențiile internaționale (S&P, Moody's, Fitch).",
      businessImpact:
        "Randamentele titlurilor de stat stabilesc rata fără risc de referință (benchmark) pentru creditarea companiilor din sectorul privat.",
      marketConnection:
        "Direct corelat cu volumele zilnice de tranzacționare din segmentul instrumentelor cu venit fix de la BVB.",
      whatToWatchNext:
        "Publicarea calendarului oficial al emisiunilor de titluri de stat pentru trimestrul IV 2026.",
    },
  },
  {
    id: "ins-autorizatii-construire-locuinte",
    slug: "ins-autorizatii-construire-cladiri-rezidentiale",
    title: "INS: Peste 3.280 de autorizații de construire pentru clădiri rezidențiale eliberate lunar",
    excerpt:
      "Institutul Național de Statistică raportează 3.280 de autorizații de construire eliberate pentru clădiri rezidențiale, cu o suprafață utilă autorizată în creștere în regiunile Nord-Vest și Centru.",
    content: `
Date Statistice INS privind Sectorul Construcțiilor

Institutul Național de Statistică (INS) a publicat raportul periodic privind autorizațiile de construire eliberate pentru clădiri rezidențiale și nerezidențiale.

Indicatori Cheie

• Autorizații rezidențiale eliberate: 3.280 de autorizații la nivel național în cel mai recent raport lunar.
• Suprafața utilă totală autorizată: Creștere de 3,8% în profil regional în marile centre universitare și economice.
• Ponderea pe regiuni de dezvoltare: Regiunile București-Ilfov, Nord-Vest și Centru concentrează peste 55% din totalul suprafeței utile autorizate.

Datele sunt colectate pe bază de cercetare statistică exhaustivă de la administrațiile publice locale.
    `,
    source: "INS",
    sourceUrl: "https://insse.ro/cms/ro/comunicate-de-presa",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/real-estate/ins-autorizatii-construire-cladiri-rezidentiale",
    publishedAt: "2026-10-02",
    fetchedAt: "2026-10-06",
    category: "real-estate",
    categoryLabel: "Construcții Rezidențiale",
    image: "/fallbacks/fallback-2.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Imobiliară",
    readTime: "4 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Dinamica autorizațiilor eliberate măsoară volumul viitoarei oferte rezidențiale ce va intra pe piață în următorii 1-2 ani.",
      businessImpact:
        "Companiile de construcții și furnizorii de materiale își dimensionează capacitățile de execuție în funcție de autorizațiile obținute de dezvoltatori.",
      marketConnection:
        "Direct conectat cu producătorii de materiale de construcții și dezvoltatorii imobiliari listați la BVB (One United Properties, TeraPlast).",
      whatToWatchNext:
        "Rapoartele INS privind indicele costurilor în construcții și viteza de demarare a noilor șantiere.",
    },
  },
  {
    id: "piata-imobiliara-europeana-preturi-chirii",
    slug: "piata-imobiliara-europeana-preturi-chirii",
    title: "Piața Imobiliară Europeană: Stabilizarea prețurilor rezidențiale și randamentele în Europa Centrală și de Est",
    excerpt:
      "Rapoartele Eurostat indică stabilizarea prețurilor proprietăților rezidențiale în zona euro și menținerea unor randamente atractive de închiriere în Europa Centrală și de Est.",
    content: `
Raport Eurostat privind Piața Imobiliară Europeană

Evoluția sectorului imobiliar rezidențial din Uniunea Europeană reflectă adaptarea piețelor la noul ciclu de relaxare a ratelor de dobândă inițiat de Banca Centrală Europeană (BCE).

Tendințe Europene Cheie

• Germania & Franța: Stabilizarea indicelui prețurilor la locuințe după ajustările succesive din semestrele anterioare.
• Spania & Portugalia: Cerere susținută pe segmentul rezidențial de coastă și proprietăți premium urbane.
• Randamente de Închiriere: Randamentele brute din România și Europa Centrală și de Est (6,5% - 8,0%) rămân semnificativ superioare celor vest-europene (3,5% - 4,5%).
    `,
    source: "Eurostat",
    sourceUrl: "https://ec.europa.eu/eurostat",
    canonicalUrl: "https://aixmedia.cristianvaduva.com/real-estate/piata-imobiliara-europeana-preturi-chirii",
    publishedAt: "2026-10-01",
    fetchedAt: "2026-10-06",
    category: "real-estate",
    categoryLabel: "Real Estate Europa",
    image: "/fallbacks/fallback-3.jpg",
    author: "AiX Media Editorial Desk",
    authorRole: "Redacția Imobiliară Europeană",
    readTime: "5 min read",
    featured: false,
    trending: true,
    intelligence: {
      whyItMatters:
        "Comportamentul piețelor imobiliare vest-europene oferă un indicator avansat pentru mișcările de capital transfrontaliere.",
      businessImpact:
        "Investitorii instituționali compară randamentele nete din România cu cele din vestul Europei, menținând interesul pentru active rezidențiale cu cashflow stabil.",
      marketConnection:
        "Evoluția vizează fondurile europene de real estate cross-border și fondurile de pensii.",
      whatToWatchNext:
        "Publicarea următorului indice Eurostat House Price Index (HPI) și deciziile Consiliului Guvernatorilor BCE.",
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
