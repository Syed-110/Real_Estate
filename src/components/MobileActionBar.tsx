"use client";

import React from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MobileActionBarProps {
  onOpenConsultation: () => void;
}

export default function MobileActionBar({ onOpenConsultation }: MobileActionBarProps) {
  const { t } = useLanguage();

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-obsidian-950/95 backdrop-blur-xl border-t border-gold-400/25 px-4 pt-2.5 pb-safe shadow-[0_-10px_25px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href="tel:+919820012345"
          className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-slate-200 active:bg-obsidian-800 flex flex-col items-center justify-center text-center transition-transform active:scale-95"
          aria-label="Call Concierge"
        >
          <Phone className="w-4 h-4 text-gold-400" />
          <span className="text-[10px] uppercase font-semibold tracking-wider mt-0.5">
            {t("mobCall")}
          </span>
        </a>

        {/* WhatsApp Direct Inquiry */}
        <a
          href="https://wa.me/919820012345?text=Hello%20Aayat%20Real%20Estate,%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20properties."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-emerald-400 active:bg-obsidian-800 flex flex-col items-center justify-center text-center transition-transform active:scale-95"
          aria-label="WhatsApp Concierge"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] uppercase font-semibold tracking-wider mt-0.5">
            {t("mobWhatsApp")}
          </span>
        </a>

        {/* Schedule Tour CTA Button */}
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex-[2] min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-bold flex items-center justify-center gap-1.5 shadow-gold-glow active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider">{t("mobBookTour")}</span>
        </button>
      </div>
    </aside>
  );
}
