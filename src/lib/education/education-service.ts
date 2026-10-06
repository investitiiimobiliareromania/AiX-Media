export interface EducationalArticle {
  id: string;
  slug: string;
  title: string;
  category:
    | "money"
    | "credit"
    | "real-estate"
    | "insurance"
    | "markets"
    | "business"
    | "tax"
    | "economy"
    | "dubai"
    | "aviation"
    | "construction";
  categoryLabel: string;
  shortAnswer: string;
  whatItMeans: string;
  whyItMatters: string;
  exampleScenario: string;
  whyYes: string[];
  whyNot: string[];
  whyNow: string;
  benefits: string[];
  risks: string[];
  whatToCheck: string[];
  commonMistakes: string[];
  keyTakeaway: string;
  relatedSources: { name: string; url?: string }[];
  readTime: string;
}

export const educationalArticles: EducationalArticle[] = [
  // ==========================================
  // 1. INSURANCE EDUCATION
  // ==========================================
  {
    id: "edu-rca-vs-casco",
    slug: "rca-vs-casco-diferente-esentiale-protectie",
    title: "RCA vs. CASCO: Ce acoperă fiecare poliță și diferențele esențiale de protecție",
    category: "insurance",
    categoryLabel: "Asigurări Auto",
    shortAnswer:
      "RCA este obligatorie prin lege și acoperă pagubele produse terților (victimele unui accident provocat de tine), în timp ce CASCO este facultativă și despăgubește daunele aduse propriului tău vehicul (accidente, furt, vandalism, fenomene meteo).",
    whatItMeans:
      "Asigurarea de Răspundere Civilă Auto (RCA) protejează patrimoniul tău de pretențiile financiare ale altor șoferi sau pietoni în caz de culpă. CASCO este o poliță de bunuri care repară mașina ta indiferent dacă accidentul a fost provocat de tine sau de un autor necunoscut.",
    whyItMatters:
      "Mulți proprietari cred eronat că RCA le repară propria mașină. Fără CASCO, costul reparației propriului vehicul în caz de culpă, grindină sau autor necunoscut este suportat 100% din propriul buzunar.",
    exampleScenario:
      "Dacă lovești o altă mașină într-o intersecție din neatenție: polița ta RCA va repara integral mașina celuilalt șofer. Mașina ta va putea fi reparată pe cheltuiala asigurătorului doar dacă deții o poliță CASCO valabilă.",
    whyYes: [
      "Protejează investiția într-un autoturism cu valoare de piață semnificativă.",
      "Acoperă daune majore din fenomene naturale (grindină, inundații, căderi de corpuri pe caroserie).",
      "Include asistență rutieră extinsă și mașină la schimb pe durata reparațiilor.",
      "Obligatorie prin contractul de finanțare în cazul mașinilor achiziționate prin leasing sau credit auto.",
    ],
    whyNot: [
      "Pentru vehicule foarte vechi (peste 10-12 ani), prima anuală CASCO poate reprezenta un procent disproporționat de mare din valoarea de piață a mașinii.",
      "Dacă franșiza contractuală este ridicată, daunele minore (zgârieturi de parcare) nu sunt rentabil de deschis la asigurător.",
    ],
    whyNow:
      "Costul mediu al reparațiilor auto în atelierele autorizate a crescut semnificativ pe fondul complexității senzorilor ADAS și a farurilor Matrix LED, o daună minoră la caroserie putând depăși 15.000 RON.",
    benefits: [
      "Liniște financiară în caz de daune totale, furt sau incendiu.",
      "Reparații cu piese de origine în rețele de service agreate.",
      "Acoperire teritorială extinsă (România + țările din Spațiul Economic European).",
    ],
    risks: [
      "Pierderea clasei de bonus pe polița CASCO în caz de daune repetate din culpă proprie.",
      "Neacoperirea daunelor dacă șoferul a încălcat grav clauzele contractuale (conducere sub influența alcoolului, lipsă ITP valabil).",
    ],
    whatToCheck: [
      "Nivelul franșizei pe eveniment (fixă în EUR/RON sau procentuală).",
      "Clauza de decontare (regie proprie vs. reparație directă în service autorizat).",
      "Dacă sunt acoperite daunele produse de fenomene meteo și hidro-meteorologice.",
      "Prezența clauzei de furt parțial (oglinzi, catalizator, roți) și vandalism.",
    ],
    commonMistakes: [
      "Alegerea unei franșize prea mari doar pentru a reduce prima lunară, fără fond de rezervă pentru a o plăti la daună.",
      "Nedeclararea modificărilor sau accesoriilor opționale montate ulterior pe mașină (jante speciale, colantare).",
    ],
    keyTakeaway:
      "RCA te apără de datoriile față de terți; CASCO îți protejează propriul activ mobil. O strategie echilibrată evaluează valoarea mașinii, riscul de utilizare și nivelul optim al franșizei.",
    relatedSources: [
      { name: "Autoritatea de Supraveghere Financiară (ASF)", url: "https://asfromania.ro" },
      { name: "BAAR (Biroul Asigurătorilor de Autovehicule)", url: "https://baar.ro" },
    ],
    readTime: "5 min read",
  },
  {
    id: "edu-pad-vs-facultativa-locuinta",
    slug: "pad-vs-asigurare-facultativa-locuinta-ghid-complet",
    title: "Ce acoperă polița obligatorie PAD vs. o asigurare facultativă completă de locuință?",
    category: "insurance",
    categoryLabel: "Asigurări Imobiliare",
    shortAnswer:
      "Polița PAD este strict obligatorie prin Legea 260/2008 și acoperă doar 3 riscuri naturale catastrofice (cutremur, inundații naturale, alunecări de teren) până la limita legală de 20.000 EUR (sau 10.000 EUR pentru tip B). Asigurarea facultativă extinde protecția la incendiu, explozie, furt, țevi sparte, furtuni și bunuri interioare, la valoarea reală de reconstrucție a imobilului.",
    whatItMeans:
      "PAD este o poliță de bază cu sumă asigurată fixată prin lege. O locuință de 150.000 EUR nu va primi niciodată mai mult de 20.000 EUR din PAD în caz de distrugere totală prin cutremur. Diferența de 130.000 EUR, plus riscurile cotidiene (incendiu, conducte de apă sparte), este acoperită exclusiv de polița facultativă.",
    whyItMatters:
      "În România, incendiul și avariile instalațiilor de apă reprezintă peste 80% din frecvența daunelor casnice înregistrate de asigurători. Acestea NU sunt acoperite de polița PAD.",
    exampleScenario:
      "Dacă un scurtcircuit provoacă un incendiu în apartament, distrugând bucătăria și mobilierul: polița PAD nu acordă nicio despăgubire (fiind incendiu, nu cutremur/inundație naturală). Asigurarea facultativă va despăgubi atât refacerea pereților/instalațiilor, cât și electrocasnicele și mobilierul asigurat.",
    whyYes: [
      "Protejează cel mai valoros activ patrimonial al familiei la valoarea reală de piață/reconstrucție.",
      "Include răspunderea civilă față de vecini (de exemplu, dacă o inundație de la mașina ta de spălat afectează etajele inferioare).",
      "Acoperă costurile de cazare temporară dacă locuința devine nelocuibilă în urma unui eveniment asigurat.",
    ],
    whyNot: [
      "Polița facultativă nu poate fi încheiată legal fără a avea în vigoare și polița obligatorie PAD.",
      "Imobilele încadrate în clasa I de risc seismic (bulină roșie) sunt excluse de la asigurare de majoritatea societăților de profil.",
    ],
    whyNow:
      "Fenomenele meteo extreme (furtuni violente, grindină, precipitații torențiale) și vechimea instalațiilor sanitare în blocurile construite înainte de 1990 sporesc riscul de avarii accidentale.",
    benefits: [
      "Acoperire completă: clădire + bunuri interioare + răspundere civilă legală față de terți.",
      "Asistență tehnică de urgență la domiciliu (instalator, lăcătuș, electrician) inclusă în pachetele premium.",
    ],
    risks: [
      "Subasigurarea: dacă declari o valoare a locuinței mai mică decât costul real de reconstrucție, despăgubirea se reduce proporțional.",
    ],
    whatToCheck: [
      "Dacă suma asigurată a clădirii acoperă costul actualizat de reconstrucție la prețurile actuale ale materialelor.",
      "Suma alocată pentru bunurile din casă (mobilier, electronice, finisaje premium).",
      "Limita de răspundere civilă față de vecini (recomandat minimum 10.000 - 20.000 EUR).",
      "Excluderile specifice (infiltrații prin terasă neizolată, igrasie, vicii de construcție).",
    ],
    commonMistakes: [
      "Confundarea valorii de piață (care include și terenul/locația) cu costul de reconstrucție al clădirii.",
      "Omiterea asigurării anexelor (boxă, garaj, terase) sau a bunurilor de mare valoare.",
    ],
    keyTakeaway:
      "PAD este fundamentul legal catastrofic minim; asigurarea facultativă este scutul real complet care îți protejează căminul și stabilitatea financiară.",
    relatedSources: [
      { name: "PAID România (Pool-ul de Asigurare Împotriva Dezastrelor Naturale)", url: "https://paidromania.ro" },
      { name: "Autoritatea de Supraveghere Financiară (ASF)", url: "https://asfromania.ro" },
    ],
    readTime: "6 min read",
  },
  {
    id: "edu-subasigurare-regula-proportionala",
    slug: "ce-este-subasigurarea-si-regula-proportionala",
    title: "Ce este subasigurarea și cum funcționează regula proporțională la plata despăgubirilor?",
    category: "insurance",
    categoryLabel: "Concepte & Ghid Daune",
    shortAnswer:
      "Subasigurarea apare atunci când suma asigurată declarată în poliță este mai mică decât valoarea reală a bunului la data daunei. În acest caz, conform Codului Civil (Art. 2217), asigurătorul aplică regula proporțională: despăgubește doar procentul din daună corespunzător raportului dintre suma asigurată și valoarea reală.",
    whatItMeans:
      "Dacă o clădire cu valoare reală de reconstrucție de 200.000 EUR este asigurată doar pentru 100.000 EUR (adică 50% din valoare), în cazul unei daune parțiale de 20.000 EUR, asigurătorul va achita doar 50% din pagubă (10.000 EUR), chiar dacă dauna este mult sub plafonul maxim al poliței.",
    whyItMatters:
      "Mulți asigurați își subevaluează intenționat imobilele sau utilajele pentru a plăti o primă de asigurare mai mică, fără să știe că regula proporțională se aplică și la daune parțiale mici, lăsându-i cu cheltuieli neacoperite.",
    exampleScenario:
      "Deții un stoc de mărfuri în valoare reală de 1.000.000 RON, dar îl declari în poliță la 600.000 RON (grad de acoperire 60%). Are loc un incident cu o daună parțială de 100.000 RON. Asigurătorul va plăti doar 60.000 RON, diferența de 40.000 RON rămânând în sarcina ta.",
    whyYes: [
      "Asigurarea la valoarea reală completă elimină orice reducere sau penalizare la dosarul de daună.",
      "Garantează fondurile necesare pentru refacerea 1:1 a activului afectat.",
    ],
    whyNot: [
      "Nu există niciun motiv tehnic sau financiar valid pentru a accepta subasigurarea conștientă a activelor esențiale.",
    ],
    whyNow:
      "Inflația cumulată a costurilor de construcție și a materialelor din ultimii ani a transformat multe polițe vechi în polițe subasigurate dacă sumele nu au fost indexate.",
    benefits: [
      "Despăgubire integrală la valoarea facturilor de reparație sau reconstrucție.",
      "Predictibilitate totală în gestionarea riscului patrimonial.",
    ],
    risks: [
      "Pierderi financiare masive suportate din fonduri proprii în caz de incendiu sau avarie parțială.",
    ],
    whatToCheck: [
      "Dacă polița conține clauza de indexare automată cu rata inflației din construcții.",
      "Dacă valoarea declarată reflectă devizul actualizat de reconstrucție, nu valoarea istorică de achiziție din contractul notarial vechi.",
    ],
    commonMistakes: [
      "Menținerea aceleiași sume asigurate an după an, deși imobilul a fost renovat masiv sau extins.",
    ],
    keyTakeaway:
      "Suma asigurată trebuie să fie întotdeauna egală cu valoarea de înlocuire de nou a bunului; economia de câțiva lei la prima anuală se poate transforma într-o pierdere de zeci de mii de euro la daună.",
    relatedSources: [
      { name: "Codul Civil Român (Art. 2217 - Regula Proporțională)" },
      { name: "UNSAR (Uniunea Națională a Societăților de Asigurare din România)", url: "https://unsar.ro" },
    ],
    readTime: "5 min read",
  },

  // ==========================================
  // 2. CREDIT & MONEY EDUCATION
  // ==========================================
  {
    id: "edu-cum-functioneaza-ircc",
    slug: "cum-functioneaza-indicele-ircc-calcul-evolutie",
    title: "Cum funcționează indicele IRCC și cum influențează direct rata la creditul ipotecar?",
    category: "credit",
    categoryLabel: "Creditare & Dobânzi",
    shortAnswer:
      "IRCC (Indicele de Referință pentru Creditele Consumatorilor) este calculat trimestrial de BNR ca medie aritmetică a ratelor de dobândă zilnice ale tranzacțiilor interbancare efective. Se aplică creditelor acordate consumatorilor după mai 2019 (OUG 19/2019) cu un decalaj de un trimestru.",
    whatItMeans:
      "Dobânda variabilă a unui credit ipotecar în lei este formată din: IRCC trimestrial (stabilit de BNR) + Marja fixă a băncii (negociată la semnare, uzual între 1,90% și 2,40%). Când IRCC crește, rata lunară crește; când IRCC scade, rata lunară scade automat la data de 1 a fiecărui trimestru.",
    whyItMatters:
      "Pentru că IRCC reflectă tranzacțiile din urmă cu două trimestre (T2 se aplică în T4), evoluția dobânzilor poate fi anticipată cu până la 3 luni înainte de intrarea în vigoare.",
    exampleScenario:
      "La un credit de 400.000 RON pe 25 de ani: cu IRCC de 5,86% și marjă de 2,10% (dobândă totală 7,96%), rata lunară este de circa 3.080 RON. Dacă IRCC coboară la 5,00%, rata scade la circa 2.840 RON/lună (economie anuală de ~2.880 RON).",
    whyYes: [
      "IRCC este mai stabil și mai puțin volatil decât ROBOR în perioadele de relaxare a lichidității interbancare.",
      "Calculul este 100% transparent, verificat și publicat oficial de BNR la fiecare început de trimestru.",
    ],
    whyNot: [
      "Într-un mediu de creștere rapidă a dobânzilor de politică monetară, dobânda variabilă transferă riscul de piață direct asupra bugetului debitorului.",
    ],
    whyNow:
      "Ciclul de relaxare monetară al BNR conferă o perspectivă de temperare a costurilor creditării variabile în trimestrele următoare.",
    benefits: [
      "Scăderea automată a ratelor când dobânzile interbancare se relaxează, fără costuri de renegociere.",
      "Marja băncii rămâne fixă prin contract pe întreaga durată a împrumutului.",
    ],
    risks: [
      "Creșterea ratei lunare peste capacitatea de plată dacă inflația reaccelerează și banca centrală majorează dobânzile.",
    ],
    whatToCheck: [
      "Nivelul marjei fixe a băncii (o marjă de 2,00% este mult mai competitivă decât una de 2,75%).",
      "Datele trimestriale de actualizare (1 ianuarie, 1 aprilie, 1 iulie, 1 octombrie).",
      "Plafonul de îndatorare DTI (max 40% conform regulamentului BNR).",
    ],
    commonMistakes: [
      "Privirea doar la rata inițială fără testarea unui scenariu de stres (+2 puncte procentuale la IRCC).",
    ],
    keyTakeaway:
      "IRCC este barometrul oficial al costului banilor pentru populație. Înțelegerea formulei sale permite debitorilor să anticipeze modificarea ratelor și să evalueze oportun momentul unei refinanțări cu dobândă fixă.",
    relatedSources: [
      { name: "Banca Națională a României (BNR)", url: "https://www.bnr.ro" },
      { name: "OUG 19/2019 privind protecția consumatorilor" },
    ],
    readTime: "5 min read",
  },
  {
    id: "edu-dobanda-fixa-vs-variabila",
    slug: "dobanda-fixa-vs-dobanda-variabila-credit-ipotecar",
    title: "Dobândă Fixă vs. Dobândă Variabilă: Ce structură de credit să alegi?",
    category: "credit",
    categoryLabel: "Creditare Ipotecară",
    shortAnswer:
      "Dobânda fixă oferă o rată lunară neschimbată pe o perioadă contractuală stabilită (de regulă primii 3 sau 5 ani), protejându-te de volatilitatea pieței. Dobânda variabilă (IRCC + marjă) fluctuează trimestrial, putând fi mai avantajoasă doar atunci când dobânzile generale din economie se află într-o traiectorie accelerată de scădere.",
    whatItMeans:
      "Alegerea dintre dobândă fixă și variabilă este o decizie de gestiune a riscului: cumperi siguranță și predictibilitate bugetară (fixă) sau accepți volatilitate cu speranța unor costuri mai mici în viitor (variabilă).",
    whyItMatters:
      "Peste 65% din noile credite ipotecare acordate în România în 2025-2026 au fost structurate cu dobândă fixă în primii 3-5 ani, băncile oferind marje promoționale de intrare foarte competitive (5,6% - 6,2%).",
    exampleScenario:
      "Un debitor cu venit fix și cheltuieli de familie stricte alege o dobândă fixă de 5,90% pe 5 ani. Indiferent dacă apar crize geopolitice sau inflația crește, rata lui lunară rămâne exact aceeași timp de 60 de luni.",
    whyYes: [
      "Dobândă Fixă: Predictibilitate totală a bugetului familial; zero stres la modificările trimestriale ale indicilor BNR.",
      "Dobândă Variabilă: Beneficiezi imediat de scăderea ratelor fără costuri de refinanțare dacă BNR taie dobânda cheie.",
    ],
    whyNot: [
      "Dobândă Fixă: Dacă dobânzile din piață scad dramatic, rămâi ancorat la rata fixă inițială până când decizi să refinanțezi.",
      "Dobândă Variabilă: Risc de depășire a gradului de îndatorare în cazul unor șocuri macroeconomice neprevăzute.",
    ],
    whyNow:
      "În prezent, ofertele bancare cu dobândă fixă pe 3 sau 5 ani au niveluri nominale inferioare dobânzii variabile curente (IRCC 5,86% + marjă 2,1% = 7,96%), oferind o economie imediată din prima lună.",
    benefits: [
      "Protecție împotriva inflației și crizelor monetare.",
      "Posibilitatea de a refinanța oricând creditul fără comision de rambursare anticipată (0% conform legii la dobânzi variabile / max 1% la fixe).",
    ],
    risks: [
      "La expirarea perioadei fixe (după 3 sau 5 ani), creditul trece automat pe dobândă variabilă (IRCC + marjă) dacă nu se renegociază.",
    ],
    whatToCheck: [
      "Care este marja băncii aplicabilă după expirarea perioadei de dobândă fixă.",
      "Dacă există comisioane de administrare lunare ascunse în DAE.",
      "Costurile de transfer și taxele notariale în cazul unei viitoare refinanțări.",
    ],
    commonMistakes: [
      "Compararea doar a dobânzii nominale în loc de DAE (Dobânda Anuală Efectivă).",
      "Ignorarea ofertelor de refinanțare la finalul perioadei de dobândă fixă.",
    ],
    keyTakeaway:
      "Dacă prețuiești liniștea și siguranța lunară, dobânda fixă pe 3-5 ani este soluția optimă; dacă ai venituri mari, flexibile și intenționezi să rambursezi anticipat în 2-3 ani, dobânda variabilă poate fi luată în calcul.",
    relatedSources: [
      { name: "Banca Națională a României (BNR)", url: "https://www.bnr.ro" },
      { name: "Ghidul Consumatorului de Credite Bancare" },
    ],
    readTime: "6 min read",
  },

  // ==========================================
  // 3. REAL ESTATE EDUCATION
  // ==========================================
  {
    id: "edu-randament-brut-vs-net-imobiliare",
    slug: "randament-brut-vs-randament-net-investitii-imobiliare",
    title: "Cum se calculează randamentul brut (Gross Yield) vs. randamentul net al unei proprietăți?",
    category: "real-estate",
    categoryLabel: "Investiții Imobiliare",
    shortAnswer:
      "Randamentul brut (Gross Yield) reprezintă raportul dintre chiria anuală totală și prețul de achiziție al proprietății. Randamentul net (Net Yield) scade din venit toate cheltuielile reale: impozit pe venit (8% efectiv + CASS), fond de rulment, mentenanță, asigurări, comision de administrare și rata de neocupare (vacancy rate).",
    whatItMeans:
      "Un randament brut de 7,0% comunicat în ofertele de vânzare se transformă în mod real într-un randament net de 5,2% - 5,6% după achitarea tuturor obligațiilor fiscale, a costurilor de uzură și a perioadelor fără chiriaș.",
    whyItMatters:
      "Investitorii care calculează doar randamentul brut își supraestimează profitabilitatea și pot avea surprize neplăcute atunci când calculează fluxul net de numerar (cash-flow-ul) lunar.",
    exampleScenario:
      "Cumperi un apartament cu 100.000 EUR (cu taxe notariale incluse) și îl închiriezi cu 550 EUR/lună (6.600 EUR/an). Randamentul brut este de 6,60%. După impozitul pe chirie (~530 EUR), asigurări (~120 EUR), reparații/fond de rezervă (~400 EUR) și o lună de neocupare la 2 ani (~275 EUR/an), venitul net este de 5.275 EUR/an, adică un randament net real de 5,27%.",
    whyYes: [
      "Calculul net oferă o comparație corectă cu alte instrumente financiare (titluri de stat Fidelis de 6,0% - 6,8% neimpozabile).",
      "Permite selectarea proprietăților cu cerere constantă de închiriere și costuri reduse de mentenanță.",
    ],
    whyNot: [
      "O proprietate cu randament brut uriaș (peste 9-10%) poate ascunde riscuri majore: zonă periferică degradată, degradare rapidă a finisajelor sau chiriași rău-platnici.",
    ],
    whyNow:
      "Modificările fiscale privind impozitarea chiriilor (revenirea la deducerea forfetară de 20% și plafoanele CASS) fac obligatorie recalcularea precisă a rentabilității nete.",
    benefits: [
      "Cunoașterea exactă a perioadei de amortizare a investiției (payback period).",
      "Planificarea corectă a bugetului pentru reparații și modernizări periodice.",
    ],
    risks: [
      "Risc de neocupare prelungită dacă prețul cerut este peste media cartierului.",
      "Costuri neprevăzute de reparații la instalațiile sanitare sau electrocasnice.",
    ],
    whatToCheck: [
      "Istoricul chiriei reale încasate în bloc/zonă, nu prețurile din anunțurile active nesoluționate.",
      "Nivelul cheltuielilor de întreținere pe timp de iarnă.",
      "Regimul fiscal aplicabil veniturilor din cedarea folosinței bunurilor.",
    ],
    commonMistakes: [
      "Omiterea cheltuielilor notariale și a comisionului de agenție din baza de calcul a investiției totale.",
      "Presupunerea unei ocupări nerealiste de 100% timp de 10 ani consecutivi fără nicio lună liberă.",
    ],
    keyTakeaway:
      "Randamentul brut vinde proprietăți; randamentul net generează avere reală. Calculează întotdeauna pe cifre nete conservatoare.",
    relatedSources: [
      { name: "ANCPI (Statistici Cadastrale Tranzacții)", url: "https://ancpi.ro" },
      { name: "Ghidul Fiscal ANAF pentru Închirieri" },
    ],
    readTime: "5 min read",
  },
  {
    id: "edu-due-diligence-carte-funciara",
    slug: "ce-trebuie-sa-verifici-inainte-de-cumpararea-unui-imobil",
    title: "Checklist Due Diligence Imobiliar: Ce documente și aspecte legale să verifici înainte de semnare?",
    category: "real-estate",
    categoryLabel: "Ghid Tranzacții",
    shortAnswer:
      "Înainte de a plăti orice avans sau de a semna un antecontract notarial, este obligatoriu să verifici extrasul de carte funciară pentru informare (sarcini, ipoteci, litigii), actele de proprietate în lanț continuu, certificatul de urbanism, releveul cadastral și adeverința de la asociația de proprietari.",
    whatItMeans:
      "Due diligence-ul imobiliar reprezintă verificarea juridică și tehnică amănunțită a imobilului pentru a te asigura că vânzătorul este proprietar legitim, că nu există procese pe rol și că spațiul construit corespunde milimetric cu actele avizate.",
    whyItMatters:
      "Modificările interioare neautorizate (dărâmarea de pereți fără autorizație de construire) blochează aprobarea creditului ipotecar bancar și atrag sancțiuni contravenționale.",
    exampleScenario:
      "Un cumpărător a plătit un avans direct fără extras de carte funciară recent. Ulterior a aflat că apartamentul avea notată o promisiune bilaterală de vânzare anterioară și o ipotecă executabilă, blocând vânzarea timp de 18 luni în instanță.",
    whyYes: [
      "Elimină riscul de a cumpăra un imobil grevat de sarcini sau supus revendicărilor pe Legea 10/2001.",
      "Garantează intabularea rapidă a dreptului de proprietate la oficiul de cadastru.",
    ],
    whyNot: [
      "Nu există nicio situație în care să fie recomandată omiterea verificării juridice complete.",
    ],
    whyNow:
      "Reglementările cadastrale și urbanistice actuale impun o conformitate strictă între planurile cadastrale ANCPI și realitatea din teren.",
    benefits: [
      "Siguranță patrimonială deplină.",
      "Aprobare fără obstacole a dosarului de creditare la orice bancă comercială.",
    ],
    risks: [
      "Pierderea avansului dacă antecontractul nu conține clauze clare de restituire în caz de vicii de titlu sau refuz bancar justificat.",
    ],
    whatToCheck: [
      "Extrasul de Carte Funciară pentru Informare (vechime sub 24-48 ore).",
      "Certificatul de performanță energetică (clasa energetică a clădirii).",
      "Releveul cadastral (să coincidă cu pereții existenți în realitate).",
      "Certificatul fiscal emis de Direcția de Taxe și Impozite Locale (datorii la zero).",
      "Adeverința de la Asociația de Proprietari privind cotele de întreținere.",
    ],
    commonMistakes: [
      "Semnarea de promisiuni de vânzare sub semnătură privată fără autentificare notarială și fără notare în Cartea Funciară.",
    ],
    keyTakeaway:
      "În imobiliare, un document neverificat este un risc asumat. Efectuează întotdeauna verificarea completă a Cărții Funciare prin notar public înainte de transferul banilor.",
    relatedSources: [
      { name: "ANCPI (Agenția Națională de Cadastru și Publicitate Imobiliară)", url: "https://ancpi.ro" },
      { name: "Uniunea Națională a Notarilor Publici din România (UNNPR)" },
    ],
    readTime: "6 min read",
  },

  // ==========================================
  // 4. MARKETS & CAPITAL EDUCATION
  // ==========================================
  {
    id: "edu-ce-este-indicele-bet-bvb",
    slug: "ce-este-indicele-bet-si-cum-se-investeste-la-bvb",
    title: "Ce este indicele BET și cum funcționează investițiile în acțiunile companiilor de la BVB?",
    category: "markets",
    categoryLabel: "Burse & Capital",
    shortAnswer:
      "Indicele BET (Bucharest Exchange Trading) este principalul indice al Bursei de Valori București și urmărește evoluția celor mai lichide 20 de companii românești listate (precum Banca Transilvania, Hidroelectrica, OMV Petrom, Romgaz, One United Properties).",
    whatItMeans:
      "Investiția în acțiunile indicelui BET îți permite să devii coproprietar al marilor campioni economici din România, beneficiind atât de aprecierea valorii acțiunilor, cât și de dividendele anuale plătite din profitul net realizat.",
    whyItMatters:
      "BVB oferă în mod tradițional unele dintre cele mai ridicate randamente ale dividendelor din Europa Centrală și de Est (Dividend Yield mediu de 6% - 9% la marii emitenți din energie și utilități).",
    exampleScenario:
      "Dacă deții 1.000 de acțiuni la o companie energetică ce distribuie un dividend brut de 5 RON/acțiune, vei încasa 5.000 RON brut (impozit pe dividend reținut la sursă de 8% = 4.600 RON net), păstrând totodată acțiunile în portofoliu.",
    whyYes: [
      "Protecție pe termen lung împotriva inflației prin deținerea de active productive reale.",
      "Flux recurent de venit pasiv prin dividende anuale reinvestibile.",
      "Lichiditate ridicată: poți vinde acțiunile în câteva secunde în timpul orelor de tranzacționare.",
    ],
    whyNot: [
      "Volatilitate pe termen scurt: prețul acțiunilor fluctuează zilnic în funcție de știri macroeconomice și rezultate corporative.",
      "Nu este recomandat pentru fonduri de urgență sau bani necesari pe un orizont mai scurt de 3-5 ani.",
    ],
    whyNow:
      "Creșterea constantă a activelor fondurilor de pensii Pilon II și noile listări de companii consolidează lichiditatea structurală a pieței locale de capital.",
    benefits: [
      "Acces la creșterea celor mai profitabile sectoare din România (energie, bănci, tehnologie, imobiliare).",
      "Tranzacționare digitală simplă prin intermediul brokerilor autorizați de ASF.",
    ],
    risks: [
      "Riscul de piață și riscul specific de companie (modificări legislative, supra-impozitare sectorială).",
    ],
    whatToCheck: [
      "Multiplii de evaluare: raportul P/E (Preț / Profit net) și P/BV (Preț / Activ net).",
      "Istoricul de plată și sustenabilitatea ratei de distribuție a dividendelor (Payout Ratio).",
      "Gradul de îndatorare și marja de profit operațional EBITDA.",
    ],
    commonMistakes: [
      "Concentrarea tuturor banilor într-o singură acțiune în loc de diversificare pe cel puțin 5-10 companii din industrii diferite.",
      "Vânzarea în panică în timpul corecțiilor temporare de piață.",
    ],
    keyTakeaway:
      "Bursa de Valori București transformă capitalul pasiv în parteneriat economic real. Pentru randamente optime, combină diversificarea indicelui BET cu reinvestirea dividendelor pe termen lung.",
    relatedSources: [
      { name: "Bursa de Valori București (BVB)", url: "https://www.bvb.ro" },
      { name: "Autoritatea de Supraveghere Financiară (ASF)", url: "https://asfromania.ro" },
    ],
    readTime: "6 min read",
  },

  // ==========================================
  // 5. DUBAI & INTERNATIONAL EDUCATION
  // ==========================================
  {
    id: "edu-dubai-off-plan-vs-ready",
    slug: "achizitia-off-plan-vs-ready-dubai-ghid-investitor",
    title: "Achiziția Off-Plan vs. Ready în Dubai: Avantaje, riscuri și cadrul legal Escrow DLD",
    category: "dubai",
    categoryLabel: "Dubai Real Estate",
    shortAnswer:
      "Proprietățile Off-Plan (în fază de proiect) se achiziționează cu planuri flexibile de plată eșalonate (ex: 60% pe durata construcției și 40% la predare) și potențial de apreciere a capitalului. Proprietățile Ready (finalizate) generează flux imediat de chirie din prima zi, dar necesită plata integrală (cash sau credit) la semnare.",
    whatItMeans:
      "În Dubai, toate plățile pentru proiectele off-plan sunt blocate prin lege în conturi escrow supravegheate de RERA (Real Estate Regulatory Agency). Dezvoltatorul poate retrage banii doar pe măsură ce inspectorii oficiali DLD certifică finalizarea fiecărei etape de construcție.",
    whyItMatters:
      "Cadrul legal din Dubai (Legea nr. 8/2007 privind conturile escrow) protejează investitorul împotriva riscului de fraudă sau abandon al șantierului, oferind un grad ridicat de securitate a capitalului internațional.",
    exampleScenario:
      "Un investitor cumpără un apartament off-plan de 1.200.000 AED în Business Bay cu plan de plată 50/50. Plătește 20% avans la semnare, apoi tranșe semestriale de 10% timp de 3 ani, iar restul de 50% la predarea cheilor.",
    whyYes: [
      "Planuri de plată fără dobândă direct de la dezvoltatori de top (Emaar, Nakheel, Select Group).",
      "Preț de intrare inferior proprietăților finalizate din aceeași zonă prime.",
      "Eligibilitate pentru UAE Golden Visa dacă investiția totală depășește 2.000.000 AED (~500.000 EUR).",
    ],
    whyNot: [
      "Proprietatea nu produce venit pasiv din chirii pe perioada construcției (2-3 ani).",
      "Posibilitatea unor întârzieri de 6-12 luni la finalizarea și recepția tehnică a proiectului.",
    ],
    whyNow:
      "Cererea internațională susținută de noi rezidenți și regimul de 0% impozit pe venit personal mențin atractivitatea randamentelor din chirii (6,5% - 7,8% brut anual).",
    benefits: [
      "0% impozit pe venit din chirii și 0% impozit pe câștigul de capital.",
      "Proprietate de tip Freehold (deținere 100% pe viață pentru cetățeni străini).",
    ],
    risks: [
      "Risc valutar dacă moneda ta de bază nu este corelată cu dolarul american (AED este legat fix de USD la 3,6725).",
      "Costurile de mentenanță (Service Charges) specifice clădirilor de lux.",
    ],
    whatToCheck: [
      "Numărul contului Escrow DLD înregistrat oficial în portalul Dubai Land Department.",
      "Istoricul de livrare și reputația dezvoltatorului (track record de proiecte finalizate la timp).",
      "Nivelul estimat al Service Charges pe sq.ft/an.",
    ],
    commonMistakes: [
      "Virarea avansului în conturi bancare corporative generale în loc de contul Escrow dedicat al proiectului aprobat de DLD.",
    ],
    keyTakeaway:
      "Off-plan pentru acumulare de capital cu efort de lichiditate eșalonat; Ready pentru cash-flow imediat și rezidență instantă. Verifică întotdeauna contul Escrow DLD pe aplicația Dubai REST.",
    relatedSources: [
      { name: "Dubai Land Department (DLD)", url: "https://dubailand.gov.ae" },
      { name: "RERA (Real Estate Regulatory Agency Dubai)" },
    ],
    readTime: "6 min read",
  },

  // ==========================================
  // 6. HEALTH & SPECIAL INSURANCE EDUCATION
  // ==========================================
  {
    id: "edu-asigurare-sanatate-vs-abonament",
    slug: "asigurare-sanatate-privata-vs-abonament-medical-clinica",
    title: "Asigurare Privată de Sănătate vs. Abonament Medical la Clinică: Ghid comparativ",
    category: "insurance",
    categoryLabel: "Asigurări de Sănătate",
    shortAnswer:
      "Abonamentul medical acoperă consultații de rutină și analize de bază într-o singură rețea de clinici. Asigurarea privată de sănătate este o poliță completă de despăgubire ce acoperă spitalizarea, intervențiile chirurgicale complexe, investigațiile imagistice avansate (RMN, CT) și a doua opinie medicală în orice clinică privată din țară sau străinătate.",
    whatItMeans:
      "Abonamentul este un pachet de servicii ambulatorii pre-plătite; asigurarea este un mecanism de transfer al riscului financiar major (tratamente chirurgicale de zeci de mii de lei).",
    whyItMatters:
      "O problemă medicală acută sau o operație majoră poate costa între 15.000 și 80.000 RON într-un spital privat. Abonamentul medical nu acoperă aceste costuri spitalicești, în timp ce asigurarea le decontează direct.",
    exampleScenario:
      "Ai nevoie de o intervenție chirurgicală la genunchi (menisc/ligamente). Cu un abonament clinic plătești integral costul operației și al spitalizării (~18.000 RON). Cu o poliță de asigurare de sănătate, asigurătorul decontează direct 100% din costul intervenției în spitalul privat partener.",
    whyYes: [
      "Protejează economiile familiei în caz de diagnostic grav, spitalizare neprevăzută sau operație.",
      "Libertatea de a alege medicul și spitalul privat fără a fi limitat la un singur furnizor.",
      "Deductibilitate fiscală legală de până la 400 EUR/an pentru angajați și companii.",
    ],
    whyNot: [
      "Polița conține perioade de așteptare (uzual 6-12 luni) pentru afecțiuni preexistente sau naștere.",
      "Prima anuală crește odată cu vârsta asiguratului.",
    ],
    whyNow:
      "Costul serviciilor medicale spitalicești private a crescut, făcând asigurarea privată cel mai eficient scut financiar împotriva riscurilor de sănătate.",
    benefits: [
      "Decontare directă la externare fără a plăti din buzunar.",
      "Acoperire pentru a doua opinie medicală la spitale de elită din Europa.",
    ],
    risks: [
      "Excluderea afecțiunilor cronice nedeclarate la completarea chestionarului medical inițial.",
    ],
    whatToCheck: [
      "Plafonul anual de spitalizare și intervenții chirurgicale (recomandat minimum 50.000 - 100.000 EUR/an).",
      "Dacă include acoperire pentru investigații imagistice complexe (RMN, CT, PET-CT).",
      "Rețeaua de spitale partenere cu decontare directă.",
    ],
    commonMistakes: [
      "Presupunerea că abonamentul medical oferit de angajator include spitalizarea și operațiile.",
    ],
    keyTakeaway:
      "Abonamentul este pentru prevenție și analize anuale; asigurarea privată de sănătate este pentru urgențe majore, spitalizare și operații costisitoare.",
    relatedSources: [
      { name: "UNSAR (Uniunea Națională a Societăților de Asigurare)", url: "https://unsar.ro" },
      { name: "Autoritatea de Supraveghere Financiară (ASF)", url: "https://asfromania.ro" },
    ],
    readTime: "5 min read",
  },
  {
    id: "edu-cyber-insurance-nis2",
    slug: "ce-este-cyber-insurance-directiva-nis2-imm",
    title: "Cyber Insurance & Directiva NIS2: Cum își protejează companiile sistemele și răspunderea digitală",
    category: "insurance",
    categoryLabel: "Cyber Risk & Business",
    shortAnswer:
      "Cyber Insurance este o poliță specializată de risc comercial care despăgubește daunele cauzate de atacuri informatice (ransomware, furt de date, breșe GDPR, oprirea activității IT), acoperind costurile echipei de investigație forensic, recuperarea bazelor de date, asistența juridică și pierderea de profit operațional.",
    whatItMeans:
      "O poliță tradițională de patrimoniu sau răspundere civilă generală exclude riscurile intangibile de software și date. Cyber Insurance acoperă atât pierderile proprii ale companiei (First Party), cât și pretențiile clienților afectați de scurgerea datelor (Third Party).",
    whyItMatters:
      "Directiva Europeană NIS2 impune răspunderea personală a managementului și amenzi administrative de până la 10 milioane EUR sau 2% din cifra de afaceri globală pentru deficiențe grave de securitate cibernetică.",
    exampleScenario:
      "O companie de logistică este blocată timp de 5 zile de un atac de tip ransomware. Polița Cyber Insurance achită onorariile experților de investigare forensic, suportă costurile juridice de notificare a autorităților și acoperă profitul nerealizat pe perioada opririi serverelor.",
    whyYes: [
      "Asigură continuitatea afacerii și protejează fluxul de numerar în caz de atac informatic masiv.",
      "Include acces 24/7 la o celulă de criză cu specialiști de securitate IT și avocați specializați.",
      "Facilitează conformarea cu standardele de conformitate cerute de partenerii internaționali.",
    ],
    whyNot: [
      "Polița nu poate fi încheiată dacă compania nu îndeplinește cerințele minime de igienă cibernetică (autentificare MFA, backup offline, audit de securitate).",
    ],
    whyNow:
      "Intrarea în vigoare a legislației naționale de transpunere a Directivei NIS2 transformă securitatea cibernetică într-o obligație legală a conducerii executive.",
    benefits: [
      "Despăgubirea pierderilor din întreruperea activității (Business Interruption).",
      "Acoperirea costurilor de apărare în instanță și a despăgubirilor civile pentru încălcarea confidențialității datelor.",
    ],
    risks: [
      "Neacoperirea incidentelor produse de neglijență sistemică gravă sau utilizarea de software fără licență.",
    ],
    whatToCheck: [
      "Sub-limita pentru daunele cauzate de șantaj cibernetic (extorsion / ransomware).",
      "Clauza de notificare promptă a incidentului (de regulă în primele 24-48 de ore).",
      "Excluderile privind actele de război cibernetic statal (state-sponsored cyber warfare).",
    ],
    commonMistakes: [
      "Convingerea că firewall-ul și antivirusul elimină necesitatea unei polițe de transfer al riscului financiar.",
    ],
    keyTakeaway:
      "În economia digitală, un atac cibernetic nu este o chestiune de 'dacă', ci de 'când'. Cyber Insurance este centura de siguranță financiară a oricărei companii moderne.",
    relatedSources: [
      { name: "Directoratul Național de Securitate Cibernetică (DNSC)", url: "https://dnsc.ro" },
      { name: "Directiva Europeană (UE) 2022/2555 (NIS2)" },
    ],
    readTime: "6 min read",
  },

  // ==========================================
  // 7. MONEY & TAX EDUCATION
  // ==========================================
  {
    id: "edu-fond-urgenta-vs-oportunitate",
    slug: "fond-de-urgenta-vs-fond-de-oportunitate-gestiune-lichiditate",
    title: "Fond de Urgență vs. Fond de Oportunitate: Cum se dimensionează rezerva optimă de lichiditate",
    category: "money",
    categoryLabel: "Finanțe Personale & Lichiditate",
    shortAnswer:
      "Fondul de Urgență este o rezervă financiară de 3-6 luni de cheltuieli de bază, păstrată în instrumente cu risc zero și acces instant (depozite la vedere, conturi de economii). Fondul de Oportunitate este capital lichid dedicat fructificării unor scăderi de piață, achiziții imobiliare sub prețul zonei sau investiții strategice.",
    whatItMeans:
      "Fondul de urgență este un scut de protecție împotriva șocurilor neprevăzute (pierderea venitului, urgențe medicale), în timp ce fondul de oportunitate este o sabie pentru expansiunea capitalului atunci când apar oportunități atractive.",
    whyItMatters:
      "Fără un fond de urgență solid, ești forțat să vinzi acțiuni sau active imobiliare în pierdere atunci când apare o nevoie bruscă de numerar.",
    exampleScenario:
      "O familie cu cheltuieli lunare de 8.000 RON menține un fond de urgență de 40.000 RON (5 luni de cheltuieli) într-un cont de economii. Separat, deține un fond de oportunitate de 50.000 RON în titluri de stat Fidelis pe termen scurt, gata de folosit la o corecție la bursă.",
    whyYes: [
      "Elimină stresul financiar și dependența de credite rapide de consum cu dobânzi mari.",
      "Permite luarea deciziilor de carieră și afaceri dintr-o poziție de forță și independență.",
    ],
    whyNot: [
      "Păstrarea unei rezerve excesive de lichiditate (peste 12 luni de cheltuieli) în conturi curente fără dobândă generează pierderi din cauza inflației.",
    ],
    whyNow:
      "Randamentele atractive oferite de titlurile de stat și conturile de economii permit păstrarea lichidității cu protecție reală a puterii de cumpărare.",
    benefits: [
      "Stabilitate psihologică și reziliență financiară.",
      "Capacitatea de a acționa rapid când piețele oferă oportunități de cumpărare la discount.",
    ],
    risks: [
      "Erodarea valorii dacă banii sunt păstrați în conturi de card fără nicio dobândă.",
    ],
    whatToCheck: [
      "Disponibilitatea fondurilor: banii de urgență trebuie să poată fi retrași în maximum 24 de ore.",
      "Garantarea depozitelor bancare (până la 100.000 EUR per deponent per bancă prin FGDB).",
    ],
    commonMistakes: [
      "Plasarea fondului de urgență în acțiuni volatile sau criptomonede.",
      "Confundarea cheltuielilor de vacanță cu urgențele neprevăzute.",
    ],
    keyTakeaway:
      "Protejează-ți baza cu 3-6 luni de fond de urgență ultra-lichid; alimentează fondul de oportunitate pentru a investi disciplinat când ceilalți sunt forțați să vândă.",
    relatedSources: [
      { name: "Fondul de Garantare a Depozitelor Bancare (FGDB)", url: "https://fgdb.ro" },
      { name: "Banca Națională a României (BNR)", url: "https://bnr.ro" },
    ],
    readTime: "5 min read",
  },
  {
    id: "edu-impozitare-dividende-vs-salarii-tax",
    slug: "impozitare-dividende-vs-salarii-pfa-regim-fiscal",
    title: "Impozitarea Dividendelor vs. Salarii & PFA: Cadrul fiscal și calculul contribuțiilor CASS",
    category: "tax",
    categoryLabel: "Fiscalitate & Structuri",
    shortAnswer:
      "În România, dividendele distribuite de persoanele juridice sunt impozitate cu 8% reținut la sursă, la care se adaugă contribuția CASS (sănătate) de 10% plafonată la 6, 12 sau 24 de salarii minime brute pe an. Salariile suportă o sarcină fiscală totală de circa 41,5% (CAS 25%, CASS 10%, Impozit 10%), iar PFA-urile au plafoane specifice de CAS și CASS.",
    whatItMeans:
      "Distribuirea profitului prin dividende rămâne una dintre cele mai eficiente căi de remunerare a asociaților și fondatorilor de companii, cu o sarcină fiscală combinată substanțial mai mică decât munca salariată.",
    whyItMatters:
      "Înțelegerea plafoanelor CASS la dividende permite antreprenorilor să își planifice calendarul de distribuție a dividendelor trimestriale și declarația unică fără penalități.",
    exampleScenario:
      "Un asociat unic încasează 300.000 RON dividende nete într-un an fiscal. Societatea reține și virează impozitul de 8% (~26.087 RON). Asociatul depune Declarația Unică și achită plafonul maxim CASS de 24 de salarii minime brute (~8.880 RON la salariul minim de 3.700 RON), rezultând o rată efectivă totală de taxare sub 11%.",
    whyYes: [
      "Optimizare fiscală 100% legală a fluxurilor de retragere a profiturilor nete din companie.",
      "Posibilitatea distribuirii de dividende interimare trimestriale pe baza situațiilor financiare interimare.",
    ],
    whyNot: [
      "Dividendele nu generează vechime în muncă și contribuții la sistemul public de pensii (CAS), necesitând investiții private paralele pentru pensie.",
    ],
    whyNow:
      "Modificările anuale ale Codului Fiscal impun verificarea la zi a plafoanelor salariului minim pe economie aplicabile pentru calculul CASS.",
    benefits: [
      "Retragerea transparentă a profitului cu o sarcină fiscală redusă.",
      "Plata unică anuală a contribuției CASS prin Declarația Unică (termen 25 mai).",
    ],
    risks: [
      "Distribuirea de dividende din companii fără profit contabil real sau cu datorii fiscale atrage răspunderea asociaților.",
    ],
    whatToCheck: [
      "Existența profitului net contabil și a rezervelor legale constituite înainte de distribuire.",
      "Termenele de plată a impozitului pe dividende (până la data de 25 a lunii următoare plății).",
    ],
    commonMistakes: [
      "Omiterea depunerii Declarației Unice pentru CASS-ul aferent dividendelor care depășesc 6 salarii minime.",
    ],
    keyTakeaway:
      "Dividendele oferă o eficiență fiscală ridicată pentru profiturile antreprenoriale. Planifică distribuțiile trimestrial și monitorizează plafoanele CASS aplicabile.",
    relatedSources: [
      { name: "Agenția Națională de Administrare Fiscală (ANAF)", url: "https://anaf.ro" },
      { name: "Codul Fiscal Român (Legea 227/2015 cu modificările ulterioare)" },
    ],
    readTime: "6 min read",
  },

  // ==========================================
  // 8. ECONOMY & MACRO EDUCATION
  // ==========================================
  {
    id: "edu-politica-monetara-bnr-transmisie",
    slug: "rata-dobanzii-politica-monetara-bnr-mecanism-transmisie",
    title: "Rata Dobânzii de Politică Monetară BNR: Cum influențează economia, inflația și cursul de schimb",
    category: "economy",
    categoryLabel: "Macroeconomie & Politică Monetară",
    shortAnswer:
      "Rata dobânzii de politică monetară este principalul instrument prin care Banca Națională a României (BNR) temperează inflația și gestionează lichiditatea din piață. Când BNR majorează dobânda, creditarea se scumpește, consumul se temperează, iar leul tinde să se aprecieze; când BNR reduce dobânda, stimularea creditării accelerează activitatea economică.",
    whatItMeans:
      "Rata cheie este costul la care băncile comerciale se pot împrumuta de la banca centrală sau pot plasa excesul de lichiditate prin facilitatea de depozit.",
    whyItMatters:
      "Deciziile Consiliului de Administrație al BNR determină direct traiectoria indicilor interbancari ROBOR și IRCC, influențând ratele a milioane de debitori și randamentele oferite la depozite.",
    exampleScenario:
      "Când inflația a accelerat la peste 10%, BNR a majorat treptat dobânda de politică monetară până la 7,00%, temperând cererea agregată de consum și stabilizând cursul EUR/RON în jurul valorii de 4,97.",
    whyYes: [
      "Stabilitatea prețurilor protejează puterea de cumpărare a veniturilor populației.",
      "Dobânzile atractive atrag capitaluri străine și mențin stabilitatea monedei naționale.",
    ],
    whyNot: [
      "Dobânzile ridicate pe perioade prea lungi pot frâna ritmul investițiilor corporative și pot crește costul serviciului datoriei publice.",
    ],
    whyNow:
      "Ciclul de normalizare și reducere treptată a ratelor deschide o perioadă favorabilă pentru refinanțări și investiții pe termen lung.",
    benefits: [
      "Predictibilitate macroeconomică pentru planurile de afaceri pe 3-5 ani.",
      "Ancorarea așteptărilor inflaționiste ale piețelor financiare.",
    ],
    risks: [
      "Variațiile bruște de lichiditate interbancară pot genera volatilitate temporară a dobânzilor de piață.",
    ],
    whatToCheck: [
      "Calendarul ședințelor de politică monetară ale BNR (8 ședințe pe an).",
      "Raportul trimestrial asupra inflației prezentat de Guvernatorul BNR.",
      "Diferențialul de dobândă față de ratele Băncii Centrale Europene (BCE) și Rezervei Federale (Fed).",
    ],
    commonMistakes: [
      "Presupunerea că o tăiere a dobânzii cheie se transmite instantaneu în contractele de credit (decalaj de 3-6 luni).",
    ],
    keyTakeaway:
      "Rata BNR este termostatul monetar al României. Urmărește deciziile de politică monetară pentru a înțelege din timp direcția dobânzilor și a creditării.",
    relatedSources: [
      { name: "Banca Națională a României (BNR)", url: "https://bnr.ro" },
      { name: "Banca Centrală Europeană (BCE)", url: "https://ecb.europa.eu" },
    ],
    readTime: "6 min read",
  },

  // ==========================================
  // 9. AVIATION & MOBILITY EDUCATION
  // ==========================================
  {
    id: "edu-zbor-privat-charter-vs-linie",
    slug: "zbor-privat-charter-vs-curse-de-linie-costuri-eficienta",
    title: "Zbor Privat Charter vs. Curse de Linie: Cum se evaluează costul total, flexibilitatea și valoarea timpului",
    category: "aviation",
    categoryLabel: "Aviation & Executive Mobility",
    shortAnswer:
      "Zborul privat charter oferă control complet asupra orarului de decolare, acces la terminale VIP dedicate (FBO) cu îmbarcare în 15 minute, confidențialitate absolută și rute directe fără escale spre aeroporturi secundare inaccesibile curselor comerciale. Pentru grupuri de afaceri sau echipe executive, valoarea timpului economisit și flexibilitatea operațională justifică adesea costul per oră de zbor.",
    whatItMeans:
      "În timp ce biletul de linie cumpără un simplu loc într-un avion cu sute de pasageri și orar rigid, charterul privat închiriază întreaga aeronavă și echipajul dedicat pe ruta și intervalul orar dorite.",
    whyItMatters:
      "Pentru un consiliu executiv sau un investitor, evitarea pierderii a 4-6 ore în aeroporturi mari de tranzit permite vizitarea a 2-3 fabrici sau șantiere în orașe europene diferite în aceeași zi calendaristică.",
    exampleScenario:
      "O echipă de 6 directori trebuie să ajungă la o întâlnire de fuziune la Geneva, apoi la un audit tehnic la Graz și înapoi la București. Pe curse de linie, traseul ar dura 3 zile cu 4 escale și nopți de cazare. Cu un jet privat mediu (Midsize Jet), întregul itinerariu se finalizează în 12 ore.",
    whyYes: [
      "Eficiență maximă de timp: sosire la terminal cu 15 minute înainte de decolare, control vamal privat dedicat.",
      "Aterizare pe aeroporturi executive mai apropiate de destinația finală.",
      "Confidențialitate deplină pentru discuții de afaceri și negocieri strategice în timpul zborului.",
      "Siguranță operațională verificată conform standardelor internaționale EASA / FAA.",
    ],
    whyNot: [
      "Costul per oră de zbor este substanțial superior unui bilet comercial standard dacă zborul este efectuat de o singură persoană.",
      "Disponibilitatea aeronavelor poate fi redusă în perioadele de vârf turistic dacă rezervarea nu se face din timp.",
    ],
    whyNow:
      "Aglomerarea marilor hub-uri aeroportuare europene și frecvența întârzierilor curselor de linie sporesc atractivitatea soluțiilor de mobilitate aeriană privată.",
    benefits: [
      "Flexibilitate totală de reprogramare a zborului dacă ședința de lucru se prelungește.",
      "Confort superior al cabinei configurate pentru lucru și odihnă.",
    ],
    risks: [
      "Costuri suplimentare pentru picioare goale (Empty Legs) dacă zborul de retur nu este optimizat.",
    ],
    whatToCheck: [
      "Certificatul de Operator Aerian (AOC - Air Operator Certificate) al companiei care operează zborul.",
      "Anul de fabricație și istoricul de mentenanță al aeronavei (Part-145).",
      "Politica de anulare în caz de condiții meteorologice nefavorabile.",
    ],
    commonMistakes: [
      "Închirierea prin intermediari neautorizați care nu dețin acces direct la flota certificată AOC.",
    ],
    keyTakeaway:
      "Aviația privată nu este doar un simbol de confort, ci un multiplicator de timp și eficiență pentru decizii executive de anvergură.",
    relatedSources: [
      { name: "EASA (European Union Aviation Safety Agency)", url: "https://easa.europa.eu" },
      { name: "Autoritatea Aeronautică Civilă Română (AACR)", url: "https://caa.ro" },
    ],
    readTime: "5 min read",
  },

  // ==========================================
  // 10. CONSTRUCTION & EXECUTION EDUCATION
  // ==========================================
  {
    id: "edu-receptie-lucrari-carte-tehnica",
    slug: "receptia-la-terminarea-lucrarilor-cartea-tehnica-a-constructiei",
    title: "Recepția la Terminarea Lucrărilor și Cartea Tehnică a Construcției: Ce trebuie să verifice beneficiarul",
    category: "construction",
    categoryLabel: "Construcții & Diriginție de Șantier",
    shortAnswer:
      "Recepția la terminarea lucrărilor este procedura legală obligatorie (HG 273/1994 și Legea 10/1995) prin care comisia formată din investitor, diriginte de șantier, proiectant și reprezentantul primăriei certifică finalizarea clădirii conform autorizației de construire și proiectului tehnic. Cartea Tehnică a Construcției reunește toate avizele, procesele-verbale de lucrări ascunse, certificatele de calitate ale materialelor și testele de rezistență ale betonului.",
    whatItMeans:
      "Fără procesul-verbal de recepție la terminarea lucrărilor semnat și fără Cartea Tehnică completă, clădirea nu poate fi intabulată la cadastru și nu poate fi dată legal în folosință.",
    whyItMatters:
      "Viciile de structură ascunse (armare necorespunzătoare, beton sub clasa proiectată, lipsă hidroizolație la fundație) pot fi identificate doar prin verificarea proceselor-verbale de lucrări ascunse din Cartea Tehnică.",
    exampleScenario:
      "Un cumpărător al unei case noi solicită Cartea Tehnică înainte de achiziție. Descoperă că lipsesc probele de presiune la instalațiile termice și buletinele de încercare a betonului din fundație, permițându-i să condiționeze plata finală de remedierea expertizei tehnice.",
    whyYes: [
      "Garantează conformitatea structurală și siguranța în exploatare conform normativelor antiseismice P100.",
      "Asigură valabilitatea garanției legale acordate de constructor (minim 3 ani pentru finisaje, pe toată durata de existență pentru structura de rezistență).",
      "Permite obținerea fără obstacole a certificatului de atestare a edificării și intabularea dreptului de proprietate.",
    ],
    whyNot: [
      "Nu există nicio justificare legală sau tehnică pentru a accepta recepția unei clădiri cu lucrări neconforme sau dosar incomplet.",
    ],
    whyNow:
      "Standardele moderne de eficiență energetică (nZEB - clădiri cu consum de energie aproape zero) impun verificări riguroase ale punților termice și ale certificatului de performanță energetică la recepție.",
    benefits: [
      "Siguranță totală a investiției și protecție juridică împotriva viciilor ascunse.",
      "Valoare ridicată de revânzare susținută de documentația tehnică completă.",
    ],
    risks: [
      "Refuzul intabulării la ANCPI dacă procesul-verbal de recepție are obiecțiuni nesoluționate sau neconcordanțe de suprafețe.",
    ],
    whatToCheck: [
      "Prezența tuturor proceselor-verbale de faze determinante semnate de Inspectoratul de Stat în Construcții (ISC).",
      "Buletinele de analiză a calității betonului și certificatele de conformitate ale oțelului beton.",
      "Planurile 'As-Built' (proiectul tehnic actualizat cu modificările executate efectiv pe șantier).",
    ],
    commonMistakes: [
      "Semnarea procesului-verbal de recepție fără remedierea completă a listei de anexe și remedieri (punch list).",
    ],
    keyTakeaway:
      "Cartea Tehnică este pașaportul de siguranță al oricărui imobil. Verifică fiecare proces-verbal de lucrări ascunse alături de un diriginte de șantier autorizat înainte de plata finală.",
    relatedSources: [
      { name: "Inspectoratul de Stat în Construcții (ISC)", url: "https://isc.gov.ro" },
      { name: "Legea nr. 10/1995 privind calitatea în construcții" },
    ],
    readTime: "6 min read",
  },
];

export function getAllEducationalArticles(): EducationalArticle[] {
  return educationalArticles;
}

export function getEducationalArticlesByCategory(category: string): EducationalArticle[] {
  return educationalArticles.filter((a) => a.category === category);
}

export function getEducationalArticleBySlug(slug: string): EducationalArticle | undefined {
  return educationalArticles.find((a) => a.slug === slug);
}
