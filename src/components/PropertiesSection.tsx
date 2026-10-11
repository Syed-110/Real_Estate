"use client";

import React, { useState, useMemo } from "react";
import { Property } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import { SlidersHorizontal, Sparkles, Search, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PropertiesSectionProps {
  properties: Property[];
  searchFilters: { category: string; location: string; type: string; price: string };
  onSelectProperty: (property: Property) => void;
  onBookViewing: (property: Property) => void;
}

export default function PropertiesSection({
  properties,
  searchFilters,
  onSelectProperty,
  onBookViewing,
}: PropertiesSectionProps) {
  const { language, t } = useLanguage();
  const [activeTypeTab, setActiveTypeTab] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-desc" | "price-asc" | "area">("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // Type tab
      if (activeTypeTab !== "All" && item.type !== activeTypeTab) {
        return false;
      }

      // City filter from Hero
      if (searchFilters.location !== "all") {
        if (item.city !== searchFilters.location) {
          return false;
        }
      }

      // Style filter from Hero
      if (searchFilters.type !== "all" && item.type !== searchFilters.type) {
        return false;
      }

      // Price filter from Hero (in INR Rupees)
      if (searchFilters.price === "tier1" && item.price > 150000000) return false;
      if (searchFilters.price === "tier2" && (item.price < 150000000 || item.price > 300000000)) return false;
      if (searchFilters.price === "tier3" && item.price < 300000000) return false;

      // Text query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const titleEn = item.title.en.toLowerCase();
        const titleHi = item.title.hi.toLowerCase();
        const titleMr = item.title.mr.toLowerCase();
        const locEn = item.location.en.toLowerCase();
        const city = item.city.toLowerCase();

        const matches =
          titleEn.includes(query) ||
          titleHi.includes(query) ||
          titleMr.includes(query) ||
          locEn.includes(query) ||
          city.includes(query);

        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "area") return b.areaSqFt - a.areaSqFt;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, activeTypeTab, searchFilters, searchQuery, sortBy]);

  const tabs = [
    { label: t("tabAll"), value: "All" },
    { label: t("tabWaterfront"), value: "Waterfront" },
    { label: t("tabPenthouses"), value: "Penthouse" },
    { label: t("tabVillas"), value: "Villa" },
    { label: t("tabMansions"), value: "Mansion" },
  ];

  return (
    <section id="properties" className="py-20 md:py-32 relative bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("portfolioBadge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              {t("portfolioTitle1")}{" "}
              <span className="text-gold-gradient">{t("portfolioTitle2")}</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl font-light">
              {t("portfolioSubtitle")}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-slate-400">
              {t("showingCount")} <span className="text-white font-bold">{filteredProperties.length}</span> {t("ofTotal")} {properties.length} {t("estates")}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3 rounded-2xl bg-obsidian-900/90 border border-white/10 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 touch-pan no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTypeTab(tab.value)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTypeTab === tab.value
                    ? "bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-bold shadow-gold-glow"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-gold-400 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-3 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-gold-400"
              >
                <option value="featured">{t("sortFeatured")}</option>
                <option value="price-desc">{t("sortPriceHigh")}</option>
                <option value="price-asc">{t("sortPriceLow")}</option>
                <option value="area">{t("sortArea")}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onBookViewing={onBookViewing}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-3xl bg-obsidian-900/40 border border-dashed border-white/15">
            <p className="text-xl font-serif text-white font-medium mb-2">{t("noResultsTitle")}</p>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              {t("noResultsText")}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTypeTab("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t("btnResetFilters")}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
