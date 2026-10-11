"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, MapPin, Home, IndianRupee, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HeroProps {
  onSearch: (filters: { category: string; location: string; type: string; price: string }) => void;
  onExploreProperties: () => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const { t } = useLanguage();
  const [category, setCategory] = useState<"Buy" | "Rent">("Buy");
  const [location, setLocation] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      category,
      location,
      type: propertyType,
      price: priceRange,
    });
    const el = document.getElementById("properties");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-10 md:pb-14 overflow-hidden">
      {/* Background Hero Image with Layered Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-villa.jpg"
          alt="Aayat Real Estate Luxury Sea Facing Villa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/65 to-obsidian-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/85 via-transparent to-obsidian-950/85" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-900/85 border border-gold-400/35 text-gold-300 text-xs tracking-[0.18em] uppercase mb-6 shadow-gold-glow backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>{t("heroBadge")}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight max-w-4xl leading-[1.18] drop-shadow-xl">
          {t("heroTitlePart1")}{" "}
          <span className="text-gold-gradient italic">{t("heroTitlePart2")}</span>{" "}
          {t("heroTitlePart3")}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* Search & Filter Card */}
        <div className="mt-10 w-full max-w-4xl">
          <div className="glass-panel-gold rounded-2xl md:rounded-3xl p-3 sm:p-5 backdrop-blur-xl">
            {/* Category Toggle Tabs (Buy / Rent) */}
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() => setCategory("Buy")}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
                  category === "Buy"
                    ? "bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 shadow-gold-glow"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {t("tabBuy")}
              </button>
              <button
                type="button"
                onClick={() => setCategory("Rent")}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
                  category === "Rent"
                    ? "bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 shadow-gold-glow"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {t("tabRent")}
              </button>
              <span className="hidden sm:inline-block ml-auto text-xs text-gold-300/80 tracking-widest uppercase">
                {t("verifiedBadge")}
              </span>
            </div>

            {/* Filter Inputs Grid */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Location Selector */}
              <div className="relative text-left">
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                  {t("labelCity")}
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 w-4 h-4 text-gold-400 pointer-events-none" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-8 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-xs sm:text-sm appearance-none focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                  >
                    <option value="all">{t("allCities")}</option>
                    <option value="Mumbai">{t("cityMumbai")}</option>
                    <option value="Delhi">{t("cityDelhi")}</option>
                    <option value="Goa">{t("cityGoa")}</option>
                    <option value="Bangalore">{t("cityBangalore")}</option>
                    <option value="Pune">{t("cityPune")}</option>
                  </select>
                  <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">▼</div>
                </div>
              </div>

              {/* Property Type */}
              <div className="relative text-left">
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                  {t("labelStyle")}
                </label>
                <div className="relative flex items-center">
                  <Home className="absolute left-3 w-4 h-4 text-gold-400 pointer-events-none" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-9 pr-8 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-xs sm:text-sm appearance-none focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                  >
                    <option value="all">{t("allStyles")}</option>
                    <option value="Waterfront">{t("styleWaterfront")}</option>
                    <option value="Penthouse">{t("stylePenthouse")}</option>
                    <option value="Villa">{t("styleVilla")}</option>
                    <option value="Mansion">{t("styleMansion")}</option>
                  </select>
                  <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">▼</div>
                </div>
              </div>

              {/* Price Range (INR: 10 Lakh to 1 Cr) */}
              <div className="relative text-left">
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                  {t("labelValuation")}
                </label>
                <div className="relative flex items-center">
                  <IndianRupee className="absolute left-3 w-4 h-4 text-gold-400 pointer-events-none" />
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full pl-9 pr-8 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-xs sm:text-sm appearance-none focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                  >
                    <option value="all">{t("allValuations")}</option>
                    <option value="tier1">{t("valTier1")}</option>
                    <option value="tier2">{t("valTier2")}</option>
                    <option value="tier3">{t("valTier3")}</option>
                  </select>
                  <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">▼</div>
                </div>
              </div>

              {/* Search Submit Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 hover:from-gold-300 hover:to-amber-400 text-obsidian-950 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold-glow transition-all duration-300 active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  <span>{t("searchCTA")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Indian HNW Trust Badges & Metrics */}
        <div className="mt-8 sm:mt-12 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-6 sm:pt-8">
          <div className="text-center sm:text-left">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">{t("stat1Val")}</p>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">{t("stat1Label")}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-white">{t("stat2Val")}</p>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">{t("stat2Label")}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">{t("stat3Val")}</p>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">{t("stat3Label")}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-white">{t("stat4Val")}</p>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">{t("stat4Label")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
