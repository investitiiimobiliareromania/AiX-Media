import React from "react";
import { Info } from "lucide-react";

interface DataDisclaimerProps {
  type?: "general" | "market" | "real-estate";
  className?: string;
}

export function DataDisclaimer({ type = "general", className = "" }: DataDisclaimerProps) {
  return (
    <div
      className={`p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-600 text-xs leading-relaxed flex items-start gap-3 shadow-xs ${className}`}
    >
      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-bold text-neutral-950 font-mono uppercase text-[11px] tracking-wider">
          Transparență Instituțională &amp; Clauză de Declinare a Responsabilității
        </p>
        <p className="text-neutral-700">
          Informațiile economice și de piață sunt furnizate exclusiv în scop informativ. Ratele de referință și indicatorii statistici sunt publicați conform calendarelor oficiale ale instituțiilor emitente (BNR, ANCPI, INS, BVB) și pot suferi revizuiri când sursele oficiale publică date actualizate. Cotațiile de piață nu sunt în timp real decât dacă sunt identificate explicit ca atare și susținute de un flux direct autorizat.
        </p>
        {type === "market" && (
          <p className="text-[11px] text-neutral-500 font-mono pt-1">
            Cursul valutar BNR reprezintă cotația oficială de referință a zilei bancare și nu echivalează cu o cotație de tranzacționare în timp real.
          </p>
        )}
        {type === "real-estate" && (
          <p className="text-[11px] text-neutral-500 font-mono pt-1">
            Statisticile imobiliare reflectă exclusiv numărul contractelor de vânzare-cumpărare înregistrate în cadastrul oficial ANCPI și autorizațiile eliberate de INS.
          </p>
        )}
      </div>
    </div>
  );
}
