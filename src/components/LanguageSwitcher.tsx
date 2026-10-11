"use client";

import React from "react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export default function LanguageSwitcher({
  className = "",
  variant = "desktop",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const options: { code: Language; label: string; full: string }[] = [
    { code: "en", label: "EN", full: "English" },
    { code: "hi", label: "हिन्दी", full: "Hindi" },
    { code: "mr", label: "मराठी", full: "Marathi" },
  ];

  if (variant === "mobile") {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs text-gold-400 font-semibold uppercase tracking-wider">
          <Globe className="w-3.5 h-3.5" />
          <span>भाषा / Select Language</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {options.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => setLanguage(opt.code)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 border ${
                language === opt.code
                  ? "bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 border-gold-400 shadow-gold-glow"
                  : "bg-obsidian-900 text-slate-300 border-white/10 hover:border-gold-400/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-0.5 p-1 rounded-full bg-obsidian-900/90 border border-gold-400/25 backdrop-blur-md shadow-inner shrink-0 whitespace-nowrap ${className}`}
    >
      <div className="pl-1.5 pr-1 text-gold-400/90 shrink-0">
        <Globe className="w-3.5 h-3.5" />
      </div>
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLanguage(opt.code)}
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200 whitespace-nowrap shrink-0 ${
            language === opt.code
              ? "bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 shadow-gold-glow"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
          title={opt.full}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
