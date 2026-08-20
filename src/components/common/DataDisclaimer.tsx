import React from "react";
import { Info } from "lucide-react";

interface DataDisclaimerProps {
  type?: "general" | "market" | "real-estate";
  className?: string;
}

export function DataDisclaimer({ type = "general", className = "" }: DataDisclaimerProps) {
  return (
    <div
      className={`p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-400 text-xs leading-relaxed flex items-start gap-3 shadow-sm ${className}`}
    >
      <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
      <div className="space-y-1.5 font-serif">
        <p className="font-bold text-white font-mono uppercase text-[10px] tracking-widest">
          Transparență Instituțională &amp; Clauză de Declinare a Responsabilității
        </p>
        <p className="text-neutral-300">
          Datele economice, financiare și statistice sunt furnizate exclusiv în scop informativ și provin, acolo unde este disponibil, din surse oficiale. Indicatorii pot fi actualizați, revizuiți sau publicați cu întârziere de către instituțiile emitente. Ratele de referință BNR nu reprezintă cotații de piață în timp real. Informațiile nu constituie recomandări de investiții, consultanță financiară sau ofertă de tranzacționare.
        </p>
        {type === "market" && (
          <p className="text-[11px] text-neutral-400 font-mono pt-1">
            Cursul valutar BNR reprezintă cotația oficială de referință a zilei bancare și nu echivalează cu o cotație de tranzacționare în timp real.
          </p>
        )}
        {type === "real-estate" && (
          <p className="text-[11px] text-neutral-400 font-mono pt-1">
            Statisticile imobiliare reflectă exclusiv numărul contractelor de vânzare-cumpărare înregistrate în cadastrul oficial ANCPI și autorizațiile eliberate de INS.
          </p>
        )}
      </div>
    </div>
  );
}

