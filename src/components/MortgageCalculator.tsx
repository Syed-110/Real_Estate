"use client";

import React, { useState, useMemo } from "react";
import { Calculator, Percent, Sparkles, ArrowRight, IndianRupee, TrendingUp, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MortgageCalculatorProps {
  onOpenConsultation: () => void;
}

export default function MortgageCalculator({ onOpenConsultation }: MortgageCalculatorProps) {
  const { t, language } = useLanguage();

  // Price in INR: Range from ₹10 Lakhs to ₹1 Cr only (default ₹50 Lakhs)
  const [propertyPrice, setPropertyPrice] = useState<number>(5000000); // ₹50 Lakhs
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% p.a. standard Indian Home Loan
  const [loanTermYears, setLoanTermYears] = useState<number>(5); // Default 5 years (starting from 1 year)

  // Format INR according to Indian numbering system (Lakhs and Crores)
  const formatINR = (val: number) => {
    if (val >= 10000000) {
      const cr = val / 10000000;
      const crUnit = language === "hi" ? "करोड़" : language === "mr" ? "कोटी" : "Cr";
      const formatted = cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2);
      return `₹${formatted} ${crUnit}`;
    } else if (val >= 100000) {
      const lk = val / 100000;
      const lkUnit = language === "hi" ? "लाख" : language === "mr" ? "लाख" : "Lakh";
      const formatted = lk % 1 === 0 ? lk.toFixed(0) : lk.toFixed(2);
      return `₹${formatted} ${lkUnit}`;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatMonthlyEmi = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const calculations = useMemo(() => {
    const downPaymentAmount = (propertyPrice * downPaymentPct) / 100;
    const principal = propertyPrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = Math.max(1, loanTermYears * 12);

    let monthlyEmi = 0;
    if (monthlyRate > 0) {
      monthlyEmi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      monthlyEmi = principal / totalPayments;
    }

    const totalLoanCost = monthlyEmi * totalPayments;
    const totalInterest = Math.max(0, totalLoanCost - principal);

    // Prime Indian luxury gross rental yield (~4.5% to 5.2% gross)
    const annualRentalIncome = propertyPrice * 0.048;
    // Estimated 5-year capital appreciation in prime Mumbai/Delhi/Goa micro-markets (~38%)
    const projected5YearAppreciation = propertyPrice * 0.38;

    return {
      downPaymentAmount,
      principal,
      monthlyEmi,
      totalInterest,
      annualRentalIncome,
      projected5YearAppreciation,
    };
  }, [propertyPrice, downPaymentPct, interestRate, loanTermYears]);

  return (
    <section id="calculator" className="py-12 md:py-20 relative bg-obsidian-900/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t("calcBadge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            {t("calcTitle1")}{" "}
            <span className="text-gold-gradient">{t("calcTitle2")}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-light">
            {t("calcSubtitle")}
          </p>
        </div>

        {/* Two-Column Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders and Inputs */}
          <div className="lg:col-span-7 glass-panel-gold rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-serif font-bold text-white">{t("calcParameters")}</h3>
              <span className="text-xs text-gold-400 tracking-wider uppercase font-semibold flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5" />
                <span>INR (₹)</span>
              </span>
            </div>

            {/* Property Price Slider (₹10 Lakhs to ₹1 Cr) */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">{t("calcPrice")}</span>
                <span className="text-lg font-serif font-bold text-gold-300">
                  {formatINR(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={1000000} // ₹10 Lakhs
                max={10000000} // ₹1 Cr
                step={100000} // step ₹1 Lakh
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>₹10 Lakhs</span>
                <span>₹35 Lakhs</span>
                <span>₹70 Lakhs</span>
                <span>₹1 Cr</span>
              </div>

              {/* Quick Investment Tier Selector Chips (₹10 L to ₹1 Cr) */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/5">
                {[
                  { label: "₹10 Lakhs", val: 1000000 },
                  { label: "₹25 Lakhs", val: 2500000 },
                  { label: "₹40 Lakhs", val: 4000000 },
                  { label: "₹50 Lakhs", val: 5000000 },
                  { label: "₹65 Lakhs", val: 6500000 },
                  { label: "₹80 Lakhs", val: 8000000 },
                  { label: "₹1 Cr", val: 10000000 },
                ].map((tier) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setPropertyPrice(tier.val)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      propertyPrice === tier.val
                        ? "bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-bold shadow-gold-glow"
                        : "bg-obsidian-900/80 text-slate-300 hover:text-white border border-white/10 hover:border-gold-400/30"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Down Payment % Slider */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">
                  {t("calcDownPayment")} ({downPaymentPct}%)
                </span>
                <span className="text-base font-serif font-bold text-white">
                  {formatINR(calculations.downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>10% (RBI Min)</span>
                <span>20% (Standard)</span>
                <span>50% (HNW Conservative)</span>
              </div>
            </div>

            {/* Interest Rate & Loan Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Interest Rate */}
              <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/5">
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">
                  {t("calcInterest")}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="6"
                    max="14"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white font-bold text-base focus:outline-none focus:border-gold-400"
                  />
                  <Percent className="w-4 h-4 text-gold-400" />
                </div>
              </div>

              {/* Loan Term (Starting from 1 year) */}
              <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-white/5">
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">
                  {t("calcTenure")}
                </label>
                <select
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full py-2 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white font-bold text-base focus:outline-none focus:border-gold-400"
                >
                  {[1, 2, 3, 5, 7, 10, 15, 20, 25, 30].map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}{" "}
                      {yr === 1
                        ? language === "hi"
                          ? "वर्ष"
                          : language === "mr"
                          ? "वर्ष"
                          : "Year"
                        : language === "hi"
                        ? "वर्ष"
                        : language === "mr"
                        ? "वर्षे"
                        : "Years"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Output Summary Card */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-gold-400/30 flex flex-col justify-between h-full bg-gradient-to-b from-obsidian-900 to-obsidian-950 shadow-gold-glow">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("calcForecastBadge")}</span>
              </div>

              {/* Monthly EMI Big Highlight */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-gold-950/40 via-obsidian-900 to-obsidian-900 border border-gold-400/25 mb-6">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t("calcMonthlyEmi")}
                </p>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-400 mt-1">
                  {formatMonthlyEmi(calculations.monthlyEmi)}
                  <span className="text-xs font-sans text-slate-400 ml-1.5 font-normal">
                    / {language === "hi" ? "माह" : language === "mr" ? "महिना" : "month"}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400 mt-2">
                  {interestRate}% {language === "hi" ? "वार्षिक दर पर" : language === "mr" ? "वार्षिक दरावर" : "interest rate over"}{" "}
                  {loanTermYears}{" "}
                  {language === "hi"
                    ? loanTermYears === 1
                      ? "वर्ष के लिए ईएमआई।"
                      : "वर्षों के लिए ईएमआई।"
                    : language === "mr"
                    ? loanTermYears === 1
                      ? "वर्षासाठी ईएमआय."
                      : "वर्षांसाठी ईएमआय."
                    : loanTermYears === 1
                    ? "year tenure."
                    : "years tenure."}
                </p>
              </div>

              {/* Metric Breakdown Table */}
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">{t("calcBorrowedLoan")}</span>
                  <span className="font-semibold text-white">{formatINR(calculations.principal)}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">{t("calcEquityDown")}</span>
                  <span className="font-semibold text-white">{formatINR(calculations.downPaymentAmount)}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    {t("calcRentalYield")}
                  </span>
                  <span className="font-semibold text-emerald-400">
                    {formatINR(calculations.annualRentalIncome)} / {language === "hi" ? "वर्ष" : language === "mr" ? "वर्ष" : "yr"}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">{t("calcAppreciation")}</span>
                  <span className="font-semibold text-gold-300">+{formatINR(calculations.projected5YearAppreciation)}</span>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-[0.18em] shadow-gold-glow flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <span>{t("calcBtnFinance")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center mt-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>{t("calcDiscreetNote")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
