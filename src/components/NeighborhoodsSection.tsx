"use client";

import React from "react";
import Image from "next/image";
import { MapPin, TrendingUp, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NeighborhoodsSectionProps {
  onSelectLocation: (loc: string) => void;
}

export default function NeighborhoodsSection({ onSelectLocation }: NeighborhoodsSectionProps) {
  const { t, language } = useLanguage();

  const hubs = [
    {
      name: language === "hi" ? "दक्षिण मुंबई" : language === "mr" ? "दक्षिण मुंबई" : "South Mumbai",
      subtitle: language === "hi" ? "वर्ली, मालाबार हिल, अल्टामाउंट" : language === "mr" ? "वरळी, मलबार हिल, अल्टामाऊंट" : "Worli Sea Face & Altamount Rd",
      growth: "+14.8% YoY",
      avgSqFt: "₹1,25,000 / sq ft",
      image: "/images/hero-villa.jpg",
      estatesCount: language === "hi" ? "38 विशेष आवास" : language === "mr" ? "38 निवडक वास्तू" : "38 Verified Estates",
      slug: "Mumbai",
    },
    {
      name: language === "hi" ? "लुटियंस दिल्ली एवं गुरुग्राम" : language === "mr" ? "लुटियन्स दिल्ली व गुरुग्राम" : "Delhi-NCR & Lutyens'",
      subtitle: language === "hi" ? "अमृता शेरगिल एवं गोल्फ कोर्स रोड" : language === "mr" ? "अमृता शेरगिल व गोल्फ कोर्स रोड" : "LBZ & Golf Course Road",
      growth: "+12.2% YoY",
      avgSqFt: "₹88,000 / sq ft",
      image: "/images/penthouse.jpg",
      estatesCount: language === "hi" ? "24 हेरिटेज संपत्तियां" : language === "mr" ? "24 वारसा संपत्ती" : "24 Heritage Enclaves",
      slug: "Delhi",
    },
    {
      name: language === "hi" ? "उत्तर गोवा" : language === "mr" ? "उत्तर गोवा" : "North Goa",
      subtitle: language === "hi" ? "अस्सगाओ, अंजुना एवं बागा" : language === "mr" ? "अस्सगाव, अंजुना व बागा" : "Assagao & Anjuna Coastal",
      growth: "+18.6% YoY",
      avgSqFt: "₹42,000 / sq ft",
      image: "/images/waterfront.jpg",
      estatesCount: language === "hi" ? "19 पुर्तगाली विला" : language === "mr" ? "19 पोर्तुगीज व्हिला" : "19 Luxury Villas",
      slug: "Goa",
    },
    {
      name: language === "hi" ? "बेंगलुरु" : language === "mr" ? "बंगळूरु" : "Bengaluru",
      subtitle: language === "hi" ? "सदाशिवनगर एवं इंदिरानगर" : language === "mr" ? "सदाशिवनगर व इंदिरानगर" : "Sadashivnagar & Indiranagar",
      growth: "+11.4% YoY",
      avgSqFt: "₹32,000 / sq ft",
      image: "/images/penthouse.jpg",
      estatesCount: language === "hi" ? "29 आधुनिक विला" : language === "mr" ? "29 आधुनिक व्हिला" : "29 Modern Manors",
      slug: "Bangalore",
    },
  ];

  return (
    <section id="locations" className="py-12 md:py-20 relative bg-obsidian-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t("locationsBadge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {t("locationsTitle1")}{" "}
              <span className="text-gold-gradient">{t("locationsTitle2")}</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-light max-w-xl">
              {t("locationsSubtitle")}
            </p>
          </div>
        </div>

        {/* 4 Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectLocation(hub.slug);
                const el = document.getElementById("properties");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative h-96 rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-gold-400/50 cursor-pointer shadow-lg transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Image */}
              <Image
                src={hub.image}
                alt={hub.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-obsidian-900/90 text-[11px] font-bold text-emerald-400 border border-emerald-400/30 backdrop-blur-md">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {hub.growth}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-medium px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md">
                  {hub.estatesCount}
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="flex items-center gap-1.5 text-xs text-gold-400 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{hub.subtitle}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors">
                  {hub.name}
                </h3>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="text-[11px] text-slate-400">{t("primeIndex")}:</span>
                  <span className="font-semibold text-white">{hub.avgSqFt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
