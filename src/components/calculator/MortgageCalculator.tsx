"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<number>(120000); // in EUR or RON
  const [currency, setCurrency] = useState<"RON" | "EUR">("RON");
  const [downPaymentPct, setDownPaymentPct] = useState<number>(15); // %
  const [durationYears, setDurationYears] = useState<number>(25); // years
  const [rateType, setRateType] = useState<"fixed" | "variable">("variable");
  const [fixedRate, setFixedRate] = useState<number>(5.9); // %
  const [bankMargin, setBankMargin] = useState<number>(2.1); // %
  const irccCurrent = 5.86; // BNR Official IRCC
  const [monthlyNetIncome, setMonthlyNetIncome] = useState<number>(8500); // for DTI check

  // Calculations
  const calculations = useMemo(() => {
    const downPaymentAmount = (propertyPrice * downPaymentPct) / 100;
    const loanAmount = Math.max(0, propertyPrice - downPaymentAmount);
    
    // Annual interest rate
    const annualRatePct = rateType === "fixed" ? fixedRate : irccCurrent + bankMargin;
    const monthlyRate = annualRatePct / 100 / 12;
    const totalMonths = durationYears * 12;

    let monthlyPayment = 0;
    if (loanAmount > 0 && monthlyRate > 0 && totalMonths > 0) {
      monthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else if (loanAmount > 0 && totalMonths > 0) {
      monthlyPayment = loanAmount / totalMonths;
    }

    const totalRepayment = monthlyPayment * totalMonths;
    const totalInterest = Math.max(0, totalRepayment - loanAmount);

    // DTI (Debt-to-Income) estimation
    const dtiPct = monthlyNetIncome > 0 ? (monthlyPayment / monthlyNetIncome) * 100 : 0;
    const bnrCap = 40; // 40% for RON loans according to BNR Regulation 17/2018 (20% for foreign currency)
    const isWithinBnrCap = dtiPct <= (currency === "RON" ? bnrCap : 20);

    // First Year Breakdown
    const firstMonthInterest = loanAmount * monthlyRate;
    const firstMonthPrincipal = monthlyPayment - firstMonthInterest;

    return {
      loanAmount,
      downPaymentAmount,
      annualRatePct,
      monthlyPayment,
      totalRepayment,
      totalInterest,
      dtiPct,
      isWithinBnrCap,
      firstMonthInterest,
      firstMonthPrincipal,
    };
  }, [
    propertyPrice,
    downPaymentPct,
    durationYears,
    rateType,
    fixedRate,
    bankMargin,
    monthlyNetIncome,
    currency,
  ]);

  const formatNumber = (val: number) =>
    new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(Math.round(val));

  return (
    <div className="p-6 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--border)] pb-5 space-y-2">
        <div className="inline-flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
          <Calculator className="w-4 h-4" />
          AiX Mortgage Engine
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
          Calculator Credite Ipotecare &amp; Capacitate de Îndatorare
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-serif">
          Simulează rata lunară, structura dobânzilor și gradul de îndatorare reglementat de BNR (max 40% DTI).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Currency and Rate Type Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">Monedă Credit</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrency("RON");
                    if (propertyPrice === 120000) setPropertyPrice(450000);
                  }}
                  className={`py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                    currency === "RON"
                      ? "bg-amber-500 text-neutral-950 shadow-md"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700"
                  }`}
                >
                  RON (Lei)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrency("EUR");
                    if (propertyPrice === 450000) setPropertyPrice(120000);
                  }}
                  className={`py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                    currency === "EUR"
                      ? "bg-amber-500 text-neutral-950 shadow-md"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700"
                  }`}
                >
                  EUR (Euro)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">Structură Dobândă</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRateType("variable")}
                  className={`py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                    rateType === "variable"
                      ? "bg-amber-500 text-neutral-950 shadow-md"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700"
                  }`}
                >
                  Variabilă (IRCC)
                </button>
                <button
                  type="button"
                  onClick={() => setRateType("fixed")}
                  className={`py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                    rateType === "fixed"
                      ? "bg-amber-500 text-neutral-950 shadow-md"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700"
                  }`}
                >
                  Fixă (3-5 Ani)
                </button>
              </div>
            </div>
          </div>

          {/* Property Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-300 font-bold">Valoare Proprietate:</span>
              <span className="text-amber-400 font-bold text-sm">
                {formatNumber(propertyPrice)} {currency}
              </span>
            </div>
            <input
              type="range"
              min={currency === "RON" ? 100000 : 30000}
              max={currency === "RON" ? 2500000 : 600000}
              step={currency === "RON" ? 10000 : 5000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Down Payment Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-300 font-bold">
                Avans ({downPaymentPct}%):
              </span>
              <span className="text-amber-400 font-bold text-sm">
                {formatNumber(calculations.downPaymentAmount)} {currency}
              </span>
            </div>
            <input
              type="range"
              min={currency === "RON" ? 15 : 20}
              max={60}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="text-[11px] font-mono text-neutral-500 flex justify-between">
              <span>Minim legal BNR: {currency === "RON" ? "15%" : "20-25%"}</span>
              <span>Credit solicitat: {formatNumber(calculations.loanAmount)} {currency}</span>
            </div>
          </div>

          {/* Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-300 font-bold">Perioadă de Rambursare:</span>
              <span className="text-amber-400 font-bold text-sm">
                {durationYears} Ani ({durationYears * 12} luni)
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={durationYears}
              onChange={(e) => setDurationYears(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Interest Rate Controls */}
          {rateType === "variable" ? (
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400">IRCC Oficial BNR (T4 2026):</span>
                <span className="text-white font-bold">{irccCurrent}%</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400">Marjă Bancă Adăugată:</span>
                <span className="text-amber-400 font-bold">{bankMargin.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min={1.8}
                max={3.5}
                step={0.05}
                value={bankMargin}
                onChange={(e) => setBankMargin(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="text-right text-xs font-mono text-neutral-300 pt-1 border-t border-neutral-900">
                Rată Totală Dobândă: <strong className="text-amber-400">{calculations.annualRatePct.toFixed(2)}%</strong>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400">Dobândă Fixă Anuală:</span>
                <span className="text-amber-400 font-bold">{fixedRate.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min={4.9}
                max={8.5}
                step={0.1}
                value={fixedRate}
                onChange={(e) => setFixedRate(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="text-xs font-mono text-neutral-400">
                Oferte uzuale bănci comerciale pentru primii 3 sau 5 ani.
              </div>
            </div>
          )}

          {/* Monthly Net Income for DTI */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-300 font-bold">Venit Net Lunar Familie:</span>
              <span className="text-amber-400 font-bold text-sm">
                {formatNumber(monthlyNetIncome)} {currency}
              </span>
            </div>
            <input
              type="range"
              min={currency === "RON" ? 3000 : 800}
              max={currency === "RON" ? 35000 : 8000}
              step={currency === "RON" ? 500 : 100}
              value={monthlyNetIncome}
              onChange={(e) => setMonthlyNetIncome(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Right Panel: Results & Amortization */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-neutral-950 border border-amber-500/30 space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              REZULTAT ESTIMATIV
            </span>

            {/* Monthly Payment Big Card */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-neutral-400 font-mono text-xs">Rată Lunară Estimată (Anuitate)</span>
              <div className="text-3xl md:text-4xl font-serif font-bold text-amber-400">
                {formatNumber(calculations.monthlyPayment)} <span className="text-base text-neutral-300 font-mono">{currency}</span>
              </div>
              <div className="text-[11px] font-mono text-neutral-500 pt-1">
                Include principalul și dobânda la {calculations.annualRatePct.toFixed(2)}% pe an.
              </div>
            </div>

            {/* Cost Summary Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800/80">
                <span className="text-neutral-400 block text-[10px]">Total de Rambursat</span>
                <span className="text-white font-bold text-sm">
                  {formatNumber(calculations.totalRepayment)} {currency}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800/80">
                <span className="text-neutral-400 block text-[10px]">Total Dobândă Plătită</span>
                <span className="text-amber-400 font-bold text-sm">
                  {formatNumber(calculations.totalInterest)} {currency}
                </span>
              </div>
            </div>

            {/* DTI Indicator */}
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-300 font-bold">Grad de Îndatorare (DTI):</span>
                <span className={`font-bold text-sm ${calculations.isWithinBnrCap ? "text-emerald-400" : "text-rose-400"}`}>
                  {calculations.dtiPct.toFixed(1)}% {calculations.isWithinBnrCap ? "✓ În Plafon BNR" : "⚠ Depășește 40%"}
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${calculations.isWithinBnrCap ? "bg-emerald-500" : "bg-rose-500"}`}
                  style={{ width: `${Math.min(100, calculations.dtiPct)}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-neutral-400">
                Conform Regulamentului BNR nr. 17/2018, gradul maxim de îndatorare pentru creditele în lei este de 40% (20% pentru valută).
              </p>
            </div>

            {/* First Month Split */}
            <div className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/60 text-[11px] font-mono text-neutral-400 space-y-1">
              <div className="flex justify-between">
                <span>Rambursare principal (luna 1):</span>
                <span className="text-white">{formatNumber(calculations.firstMonthPrincipal)} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span>Cost dobândă (luna 1):</span>
                <span className="text-amber-400">{formatNumber(calculations.firstMonthInterest)} {currency}</span>
              </div>
            </div>
          </div>

          {/* Mandatory Statutory Disclaimer */}
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-[10px] font-mono text-neutral-400 leading-relaxed space-y-1">
            <span className="text-amber-400 font-bold uppercase block">Calcul Ilustrativ &amp; Notă Legală:</span>
            <p>
              Calculul prezentat are caracter strict orientativ și informativ. Nu constituie o ofertă sau o promisiune fermă de finanțare din partea AiX Media sau a vreunei bănci. Costurile exacte depind de profilul financiar al solicitantului, evaluarea imobilului, comisioanele de cont și polițele de asigurare aferente DAE.
            </p>
          </div>

          {/* Direct CTA */}
          <a
            href="https://credite.cristianvaduva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Consultă un Specialist Creditare</span>
            <ArrowRight className="w-4 h-4" />
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}
