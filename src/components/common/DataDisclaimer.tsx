import React from "react";
import { Info } from "lucide-react";

interface DataDisclaimerProps {
  type?: "general" | "market" | "real-estate";
  className?: string;
}

export function DataDisclaimer({ type = "general", className = "" }: DataDisclaimerProps) {
  return (
    <div
      className={`p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-600 text-xs leading-relaxed flex items-start gap-3 ${className}`}
    >
      <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-semibold text-neutral-800">Transparență și Metodologie de Date</p>
        {type === "market" ? (
          <p>
            Valorile de piață și cotațiile monetare pot suferi revizuiri de la furnizorii oficiali de date.
            AiX Media nu prezintă informațiile financiare ca fiind în timp real dacă nu sunt susținute de un flux direct live autorizat. Cursul valutar și indicatorii monetari reprezintă cotațiile de referință oficiale BNR.
          </p>
        ) : type === "real-estate" ? (
          <p>
            Informațiile statistice privind tranzacțiile imobiliare, autorizațiile de construire și volumele din construcții sunt preluate exclusiv din rapoartele publice ale ANCPI, INS și BNR. Datele reflectă perioadele oficiale de raportare publicate de instituțiile emitente.
          </p>
        ) : (
          <p>
            Informațiile statistice și de piață sunt furnizate în scop informativ și sunt preluate din surse instituționale și publice oficiale. Datele pot fi revizuite de către emitentul original și nu se actualizează simultan pe toate canalele.
          </p>
        )}
      </div>
    </div>
  );
}
