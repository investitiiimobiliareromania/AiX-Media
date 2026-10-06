import React from "react";
import { MapPin } from "lucide-react";

interface SectorData {
  sector: string;
  name: string;
  monthlyTransactions: string;
  avgGrossYield: string;
  profile: string;
  keyDrivers: string;
  source: string;
  period: string;
}

export const bucharestSectorData: SectorData[] = [
  {
    sector: "Sectorul 1",
    name: "Herăstrău, Floreasca, Primăverii, Băneasa, Aviației",
    monthlyTransactions: "~2.150 tranzacții",
    avgGrossYield: "5.6% - 6.4%",
    profile: "Polul rezidențial de lux și corporate al Capitalei. Concentrează cele mai ridicate prețuri pe metru pătrat și cele mai mari bugete de investiție.",
    keyDrivers: "Cerere puternică de la expați și directori corporate, proximitatea parcurilor Herăstrău și Kiseleff, hub-uri de birouri Pipera/Floreasca.",
    source: "ANCPI & Date Oficiale",
    period: "August 2026",
  },
  {
    sector: "Sectorul 2",
    name: "Colentina, Obor, Pantelimon, Tei, Barbu Văcărescu",
    monthlyTransactions: "~1.820 tranzacții",
    avgGrossYield: "6.2% - 7.1%",
    profile: "Mix de dezvoltări noi în zona Barbu Văcărescu / Fabrica de Glucoză și fond construit clasic în cartierele tradiționale.",
    keyDrivers: "Transformarea fostelor platforme industriale în ansambluri mixte rezidențial-office, conexiune rapidă la metrou.",
    source: "ANCPI & Date Oficiale",
    period: "August 2026",
  },
  {
    sector: "Sectorul 3",
    name: "Titan, Dristor, Vitan, Nicolae Grigorescu, Pallady",
    monthlyTransactions: "~2.380 tranzacții",
    avgGrossYield: "6.8% - 7.6%",
    profile: "Cel mai activ sector după volumul brut de tranzacții rezidențiale. Polul Pallady a livrat cel mai mare volum de unități noi accesibile.",
    keyDrivers: "Infrastructură comercială masivă pe bulevardul Pallady, parcurile IOR și Titan, acces facil la linia 1 de metrou.",
    source: "ANCPI & Date Oficiale",
    period: "August 2026",
  },
  {
    sector: "Sectorul 4",
    name: "Berceni, Olteniței, Tineretului, Apărătorii Patriei",
    monthlyTransactions: "~1.790 tranzacții",
    avgGrossYield: "6.5% - 7.4%",
    profile: "Investiții publice majore în pasaje rutiere (Europa Unită), extinderea magistralei de metrou M2 spre Tudor Arghezi și parcuri noi.",
    keyDrivers: "Prețuri accesibile pentru tineri cumpărători de primă locuință, modernizarea infrastructurii urbane de către administrația locală.",
    source: "ANCPI & Date Oficiale",
    period: "August 2026",
  },
  {
    sector: "Sectorul 5",
    name: "Cotroceni, 13 Septembrie, Rahova, Ferentari",
    monthlyTransactions: "~1.180 tranzacții",
    avgGrossYield: "6.0% - 7.0%",
    profile: "Contrast puternic între zona exclusivistă Cotroceni (vile istorice protejate) și potențialul de regenerare urbană din 13 Septembrie / Rahova.",
    keyDrivers: "Reconversii urbane pe foste situri industriale, proximitatea de centrul istoric și hub-ul universitar Medicină/Drept.",
    source: "ANCPI & Date Oficiale",
    period: "August 2026",
  },
  {
    sector: "Sectorul 6",
    name: "Drumul Taberei, Militari, Crângași, Politehnica",
    monthlyTransactions: "~1.365 tranzacții",
    avgGrossYield: "6.4% - 7.3%",
    profile: "Pol rezidențial matur cu cerere constantă pentru închirieri studențești (Poli / Grozăvești) și familii (Drumul Taberei).",
    keyDrivers: "Magistrala de metrou M5, Parcul Drumul Taberei reabilitat, centre comerciale mari (AFI Cotroceni, Plaza România).",
    source: "ANCPI & Date Oficiale",
    period: "August 2026",
  },
  {
    sector: "Județul Ilfov",
    name: "Pipera-Voluntari, Otopeni, Popești-Leordeni, Chiajna, Mogoșoaia, Corbeanca",
    monthlyTransactions: "~4.435 tranzacții",
    avgGrossYield: "6.2% - 7.5%",
    profile: "Zona metropolitană cu cea mai rapidă expansiune rezidențială orizontală (case/vile) și ansambluri noi de blocuri la limita administrativă.",
    keyDrivers: "Migrația familiilor către case cu curte, Autostrada de Centură A0, proximitatea școlilor internaționale din Pipera/Otopeni.",
    source: "ANCPI & Date Oficiale",
    period: "August 2026",
  },
];

export function BucharestSectorWatch() {
  return (
    <section className="p-6 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl space-y-8">
      <div className="border-b border-[var(--border)] pb-4 space-y-1">
        <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
          <MapPin className="w-4 h-4" />
          Bucharest &amp; Ilfov Market Watch
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
          Analiză Teritorială: Sectoarele 1-6 &amp; Ilfov
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-serif">
          Profilul tranzacțional, randamentele estimate și factorii de dezvoltare urbană conform datelor cadastrale ANCPI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bucharestSectorData.map((item) => (
          <div
            key={item.sector}
            className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-md"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                  {item.sector}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {item.monthlyTransactions}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-white leading-snug">
                {item.name}
              </h3>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                {item.profile}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-neutral-900 text-xs font-mono">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-neutral-500">Randament brut chirie:</span>
                <span className="text-amber-400 font-bold">{item.avgGrossYield}</span>
              </div>
              <div className="text-[11px] text-neutral-400 leading-relaxed font-serif bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-800/60">
                <strong className="text-neutral-300 font-mono text-[10px] uppercase block mb-0.5">Factori Cheie:</strong>
                {item.keyDrivers}
              </div>
              <div className="flex justify-between text-[10px] text-neutral-500 pt-1">
                <span>Sursă: {item.source}</span>
                <span>Perioadă: {item.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
