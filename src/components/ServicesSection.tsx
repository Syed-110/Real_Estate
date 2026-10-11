"use client";

import React from "react";
import { KeyRound, Compass, Scale, Crown, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

export default function ServicesSection({ onOpenConsultation }: ServicesSectionProps) {
  const { t } = useLanguage();

  const services = [
    {
      icon: KeyRound,
      title: t("service1Title"),
      badge: "Confidentiality",
      description: t("service1Desc"),
    },
    {
      icon: Compass,
      title: t("service2Title"),
      badge: "Vastu & Design",
      description: t("service2Desc"),
    },
    {
      icon: Scale,
      title: t("service3Title"),
      badge: "RERA & Legal",
      description: t("service3Desc"),
    },
    {
      icon: Crown,
      title: t("service4Title"),
      badge: "Lifestyle Concierge",
      description: t("service4Desc"),
    },
  ];

  return (
    <section id="vip-services" className="py-20 md:py-32 relative bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("servicesBadge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            {t("servicesTitle1")}{" "}
            <span className="text-gold-gradient">{t("servicesTitle2")}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-light">
            {t("servicesSubtitle")}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-7 glass-panel glass-card-hover border border-white/10 hover:border-gold-400/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-obsidian-900 border border-gold-400/30 text-gold-400 group-hover:bg-gold-400 group-hover:text-obsidian-950 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="text-xs text-gold-400 group-hover:text-gold-300 font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t("btnInquirePrivately")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Guarantee Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-400/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-400 hidden sm:block">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                {t("ndaNotice")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t("ndaSubNotice")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="w-full md:w-auto whitespace-nowrap px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-glow transition-all"
          >
            {t("btnRequestBriefing")}
          </button>
        </div>
      </div>
    </section>
  );
}
