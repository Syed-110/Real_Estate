"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Property } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import {
  SlidersHorizontal,
  Sparkles,
  Search,
  RotateCcw,
  X,
  Check,
  MapPin,
  Building2,
  Tag,
  IndianRupee,
  Bed,
  ArrowUpDown,
} from "lucide-react";
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

  // Active top category tab (without any slider, all wrapped cleanly)
  const [activeTypeTab, setActiveTypeTab] = useState<string>("All");

  // Modal State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Applied Filter States
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [appliedCity, setAppliedCity] = useState("all");
  const [appliedCategory, setAppliedCategory] = useState("all");
  const [appliedPriceTier, setAppliedPriceTier] = useState("all");
  const [appliedSortBy, setAppliedSortBy] = useState<"featured" | "price-desc" | "price-asc" | "area">("featured");
  const [appliedBedrooms, setAppliedBedrooms] = useState("all");

  // Draft filter states inside modal
  const [draftSearchQuery, setDraftSearchQuery] = useState("");
  const [draftCity, setDraftCity] = useState("all");
  const [draftCategory, setDraftCategory] = useState("all");
  const [draftPriceTier, setDraftPriceTier] = useState("all");
  const [draftSortBy, setDraftSortBy] = useState<"featured" | "price-desc" | "price-asc" | "area">("featured");
  const [draftBedrooms, setDraftBedrooms] = useState("all");

  // Sync when Hero searchFilters change
  useEffect(() => {
    if (searchFilters.location && searchFilters.location !== "all") {
      setAppliedCity(searchFilters.location);
    }
    if (searchFilters.category && searchFilters.category !== "all") {
      setAppliedCategory(searchFilters.category);
    }
    if (searchFilters.type && searchFilters.type !== "all") {
      setActiveTypeTab(searchFilters.type);
    }
    if (searchFilters.price && searchFilters.price !== "all") {
      setAppliedPriceTier(searchFilters.price);
    }
  }, [searchFilters]);

  // Open modal and copy applied filters to draft
  const handleOpenFilterModal = () => {
    setDraftSearchQuery(appliedSearchQuery);
    setDraftCity(appliedCity);
    setDraftCategory(appliedCategory);
    setDraftPriceTier(appliedPriceTier);
    setDraftSortBy(appliedSortBy);
    setDraftBedrooms(appliedBedrooms);
    setIsFilterModalOpen(true);
  };

  // Lock scroll when modal is open
  useEffect(() => {
    if (isFilterModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterModalOpen]);

  // Apply filters from modal
  const handleApplyFilters = () => {
    setAppliedSearchQuery(draftSearchQuery);
    setAppliedCity(draftCity);
    setAppliedCategory(draftCategory);
    setAppliedPriceTier(draftPriceTier);
    setAppliedSortBy(draftSortBy);
    setAppliedBedrooms(draftBedrooms);
    setIsFilterModalOpen(false);
  };

  // Reset all filters
  const handleResetAllFilters = () => {
    setActiveTypeTab("All");
    setAppliedSearchQuery("");
    setAppliedCity("all");
    setAppliedCategory("all");
    setAppliedPriceTier("all");
    setAppliedSortBy("featured");
    setAppliedBedrooms("all");
    setDraftSearchQuery("");
    setDraftCity("all");
    setDraftCategory("all");
    setDraftPriceTier("all");
    setDraftSortBy("featured");
    setDraftBedrooms("all");
  };

  // Reset modal draft only
  const handleResetDraft = () => {
    setDraftSearchQuery("");
    setDraftCity("all");
    setDraftCategory("all");
    setDraftPriceTier("all");
    setDraftSortBy("featured");
    setDraftBedrooms("all");
  };

  // Calculate active filters count for badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (appliedSearchQuery.trim() !== "") count++;
    if (appliedCity !== "all") count++;
    if (appliedCategory !== "all") count++;
    if (appliedPriceTier !== "all") count++;
    if (appliedSortBy !== "featured") count++;
    if (appliedBedrooms !== "all") count++;
    return count;
  }, [
    appliedSearchQuery,
    appliedCity,
    appliedCategory,
    appliedPriceTier,
    appliedSortBy,
    appliedBedrooms,
  ]);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        // Hide inactive properties from public landing page
        if (item.status === "inactive") return false;

        // Top category tab
        if (activeTypeTab !== "All") {
          if (activeTypeTab === "Villa" && (item.type === "Villa" || item.type === "Mansion")) {
            // match
          } else if (activeTypeTab === "Home" && (item.type === "Home" || item.type === "Apartment")) {
            // match
          } else if (item.type !== activeTypeTab) {
            return false;
          }
        }

        // City filter
        if (appliedCity !== "all" && item.city !== appliedCity) {
          return false;
        }

        // Category filter (Buy / Rent)
        if (appliedCategory !== "all" && item.category !== appliedCategory) {
          return false;
        }

        // Price Tier (₹10 Lakh to ₹1 Cr)
        if (appliedPriceTier === "tier1" && item.price > 3500000) return false;
        if (
          appliedPriceTier === "tier2" &&
          (item.price < 3500000 || item.price > 7000000)
        )
          return false;
        if (appliedPriceTier === "tier3" && item.price < 7000000) return false;

        // Bedrooms filter
        if (appliedBedrooms !== "all") {
          const beds = item.bedrooms || 0;
          if (appliedBedrooms === "1" && beds !== 1) return false;
          if (appliedBedrooms === "2" && beds !== 2) return false;
          if (appliedBedrooms === "3" && beds !== 3) return false;
          if (appliedBedrooms === "4+" && beds < 4) return false;
        }

        // Text query
        if (appliedSearchQuery.trim() !== "") {
          const query = appliedSearchQuery.toLowerCase();
          const titleEn = item.title?.en?.toLowerCase() || "";
          const titleHi = item.title?.hi?.toLowerCase() || "";
          const titleMr = item.title?.mr?.toLowerCase() || "";
          const locEn = item.location?.en?.toLowerCase() || "";
          const city = item.city?.toLowerCase() || "";
          const rera = item.reraNumber?.toLowerCase() || "";

          const matches =
            titleEn.includes(query) ||
            titleHi.includes(query) ||
            titleMr.includes(query) ||
            locEn.includes(query) ||
            city.includes(query) ||
            rera.includes(query);

          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (appliedSortBy === "price-desc") return b.price - a.price;
        if (appliedSortBy === "price-asc") return a.price - b.price;
        if (appliedSortBy === "area") return b.areaSqFt - a.areaSqFt;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    properties,
    activeTypeTab,
    appliedCity,
    appliedCategory,
    appliedPriceTier,
    appliedBedrooms,
    appliedSearchQuery,
    appliedSortBy,
  ]);

  // Draft preview count for Modal
  const draftPreviewCount = useMemo(() => {
    return properties.filter((item) => {
      if (item.status === "inactive") return false;

      if (activeTypeTab !== "All") {
        if (activeTypeTab === "Villa" && (item.type === "Villa" || item.type === "Mansion")) {
        } else if (activeTypeTab === "Home" && (item.type === "Home" || item.type === "Apartment")) {
        } else if (item.type !== activeTypeTab) {
          return false;
        }
      }

      if (draftCity !== "all" && item.city !== draftCity) return false;
      if (draftCategory !== "all" && item.category !== draftCategory) return false;

      if (draftPriceTier === "tier1" && item.price > 3500000) return false;
      if (draftPriceTier === "tier2" && (item.price < 3500000 || item.price > 7000000)) return false;
      if (draftPriceTier === "tier3" && item.price < 7000000) return false;

      if (draftBedrooms !== "all") {
        const beds = item.bedrooms || 0;
        if (draftBedrooms === "1" && beds !== 1) return false;
        if (draftBedrooms === "2" && beds !== 2) return false;
        if (draftBedrooms === "3" && beds !== 3) return false;
        if (draftBedrooms === "4+" && beds < 4) return false;
      }

      if (draftSearchQuery.trim() !== "") {
        const query = draftSearchQuery.toLowerCase();
        const titleEn = item.title?.en?.toLowerCase() || "";
        const titleHi = item.title?.hi?.toLowerCase() || "";
        const titleMr = item.title?.mr?.toLowerCase() || "";
        const locEn = item.location?.en?.toLowerCase() || "";
        const city = item.city?.toLowerCase() || "";
        const matches =
          titleEn.includes(query) ||
          titleHi.includes(query) ||
          titleMr.includes(query) ||
          locEn.includes(query) ||
          city.includes(query);
        if (!matches) return false;
      }

      return true;
    }).length;
  }, [
    properties,
    activeTypeTab,
    draftCity,
    draftCategory,
    draftPriceTier,
    draftBedrooms,
    draftSearchQuery,
  ]);

  // All tabs dynamically populated without any slider
  const tabs = useMemo(() => {
    const list = [
      { label: t("tabAll") || "All Estates", value: "All" },
      { label: t("tabWaterfront") || "Sea-Facing", value: "Waterfront" },
      { label: t("tabPenthouses") || "Sky Penthouses", value: "Penthouse" },
      { label: t("tabVillas") || "Luxury Bungalows", value: "Villa" },
    ];

    const hasHomes = properties.some(
      (p) => p.status !== "inactive" && (p.type === "Home" || p.type === "Apartment")
    );
    const hasShops = properties.some((p) => p.status !== "inactive" && p.type === "Shop");
    const hasCommercial = properties.some(
      (p) => p.status !== "inactive" && p.type === "Commercial"
    );

    if (hasHomes) list.push({ label: "Homes & Flats", value: "Home" });
    if (hasShops) list.push({ label: "Shops & Retail", value: "Shop" });
    if (hasCommercial) list.push({ label: "Commercial", value: "Commercial" });

    return list;
  }, [properties, t]);

  return (
    <section id="properties" className="py-12 md:py-20 relative bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10">
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
              {t("showingCount")}{" "}
              <strong className="text-white font-bold">{filteredProperties.length}</strong>{" "}
              {t("ofTotal")} {properties.length} {t("estates")}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar: All Tabs Visible without Slider + One Filter Icon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl bg-obsidian-900/90 border border-white/10 mb-6 shadow-xl">
          {/* All Category Tabs wrapped cleanly - NO horizontal slider / scrollbar */}
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const isActive = activeTypeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTypeTab(tab.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-bold shadow-gold-glow scale-[1.02]"
                      : "bg-obsidian-950/80 text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 hover:border-gold-400/30"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Consolidated Filter Icon Button */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleResetAllFilters}
                className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 px-2.5 py-2 rounded-xl border border-white/10 hover:border-rose-400/30 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenFilterModal}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all duration-200 shadow-md ${
                activeFiltersCount > 0
                  ? "bg-gold-400/15 border-gold-400 text-gold-300 font-semibold shadow-gold-glow"
                  : "bg-obsidian-950 hover:bg-obsidian-850 border-white/15 text-slate-200 hover:text-white hover:border-gold-400/40"
              }`}
              title="Open Filter Dialog"
            >
              <SlidersHorizontal className="w-4 h-4 text-gold-400" />
              <span className="text-xs sm:text-sm font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold-400 text-obsidian-950 font-bold text-[11px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filter Chips Row (if any active filters) */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 px-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mr-1">
              Active Filters:
            </span>

            {appliedSearchQuery.trim() !== "" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900 border border-gold-400/30 text-gold-300 text-xs">
                <span>&quot;{appliedSearchQuery}&quot;</span>
                <button
                  type="button"
                  onClick={() => setAppliedSearchQuery("")}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {appliedCity !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900 border border-gold-400/30 text-gold-300 text-xs">
                <span>City: {appliedCity}</span>
                <button
                  type="button"
                  onClick={() => setAppliedCity("all")}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {appliedCategory !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900 border border-gold-400/30 text-gold-300 text-xs">
                <span>Type: {appliedCategory === "Buy" ? "Acquire (Buy)" : "Lease (Rent)"}</span>
                <button
                  type="button"
                  onClick={() => setAppliedCategory("all")}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {appliedPriceTier !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900 border border-gold-400/30 text-gold-300 text-xs">
                <span>
                  Price:{" "}
                  {appliedPriceTier === "tier1"
                    ? "₹10L – ₹35L"
                    : appliedPriceTier === "tier2"
                    ? "₹35L – ₹70L"
                    : "₹70L – ₹1 Cr"}
                </span>
                <button
                  type="button"
                  onClick={() => setAppliedPriceTier("all")}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {appliedBedrooms !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900 border border-gold-400/30 text-gold-300 text-xs">
                <span>{appliedBedrooms} Beds</span>
                <button
                  type="button"
                  onClick={() => setAppliedBedrooms("all")}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {appliedSortBy !== "featured" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900 border border-gold-400/30 text-gold-300 text-xs">
                <span>
                  Sort:{" "}
                  {appliedSortBy === "price-asc"
                    ? "Price Low to High"
                    : appliedSortBy === "price-desc"
                    ? "Price High to Low"
                    : "Largest Area"}
                </span>
                <button
                  type="button"
                  onClick={() => setAppliedSortBy("featured")}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetAllFilters}
              className="text-xs text-gold-400 hover:text-gold-300 underline font-medium ml-1"
            >
              Clear All
            </button>
          </div>
        )}

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
              onClick={handleResetAllFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t("btnResetFilters")}</span>
            </button>
          </div>
        )}
      </div>

      {/* FILTER MODAL */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsFilterModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-xl bg-obsidian-950 border border-gold-400/30 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-900/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">Filter & Refine Estates</h3>
                  <p className="text-xs text-slate-400">Customize search parameters across Indian markets</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-2 rounded-full bg-obsidian-900 border border-white/10 text-slate-300 hover:text-white"
                aria-label="Close Filter Dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-left">
              {/* Keyword Search */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                  Search Keyword / Location / Landmark
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Worli Sea Face, Assagao, Penthouse, Hinjawadi..."
                    value={draftSearchQuery}
                    onChange={(e) => setDraftSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* City Corridor Filter */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>City / Prime Destination</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { label: "All Cities", val: "all" },
                    { label: "Mumbai", val: "Mumbai" },
                    { label: "Delhi-NCR", val: "Delhi" },
                    { label: "Goa", val: "Goa" },
                    { label: "Bengaluru", val: "Bangalore" },
                    { label: "Pune", val: "Pune" },
                  ].map((city) => (
                    <button
                      key={city.val}
                      type="button"
                      onClick={() => setDraftCity(city.val)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-center border transition-all ${
                        draftCity === city.val
                          ? "bg-gold-400/20 border-gold-400 text-gold-300 font-bold"
                          : "bg-obsidian-900/80 border-white/5 text-slate-300 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {city.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Acquisition Category */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gold-400" />
                  <span>Acquisition Category</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "All Categories", val: "all" },
                    { label: "Acquire (Buy)", val: "Buy" },
                    { label: "Lease (Rent)", val: "Rent" },
                  ].map((cat) => (
                    <button
                      key={cat.val}
                      type="button"
                      onClick={() => setDraftCategory(cat.val)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-center border transition-all ${
                        draftCategory === cat.val
                          ? "bg-gold-400/20 border-gold-400 text-gold-300 font-bold"
                          : "bg-obsidian-900/80 border-white/5 text-slate-300 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Valuation Range (₹10 Lakh to ₹1 Cr) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-gold-400" />
                  <span>Valuation Range (₹10 Lakh – ₹1 Cr)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Any Valuation", val: "all" },
                    { label: "₹10 Lakh – ₹35 Lakh", val: "tier1" },
                    { label: "₹35 Lakh – ₹70 Lakh", val: "tier2" },
                    { label: "₹70 Lakh – ₹1 Cr", val: "tier3" },
                  ].map((tier) => (
                    <button
                      key={tier.val}
                      type="button"
                      onClick={() => setDraftPriceTier(tier.val)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-center border transition-all ${
                        draftPriceTier === tier.val
                          ? "bg-gold-400/20 border-gold-400 text-gold-300 font-bold"
                          : "bg-obsidian-900/80 border-white/5 text-slate-300 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms / Suite Capacity */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-gold-400" />
                  <span>Bedrooms / Suites</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: "Any", val: "all" },
                    { label: "1 Bed", val: "1" },
                    { label: "2 Beds", val: "2" },
                    { label: "3 Beds", val: "3" },
                    { label: "4+ Beds", val: "4+" },
                  ].map((bed) => (
                    <button
                      key={bed.val}
                      type="button"
                      onClick={() => setDraftBedrooms(bed.val)}
                      className={`py-2 px-1 rounded-xl text-xs font-medium text-center border transition-all ${
                        draftBedrooms === bed.val
                          ? "bg-gold-400/20 border-gold-400 text-gold-300 font-bold"
                          : "bg-obsidian-900/80 border-white/5 text-slate-300 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {bed.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gold-400" />
                  <span>Sort Order</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Featured First", val: "featured" },
                    { label: "Price: Low to High", val: "price-asc" },
                    { label: "Price: High to Low", val: "price-desc" },
                    { label: "Area: Largest First", val: "area" },
                  ].map((sort) => (
                    <button
                      key={sort.val}
                      type="button"
                      onClick={() => setDraftSortBy(sort.val as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-center border transition-all ${
                        draftSortBy === sort.val
                          ? "bg-gold-400/20 border-gold-400 text-gold-300 font-bold"
                          : "bg-obsidian-900/80 border-white/5 text-slate-300 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-between gap-3 bg-obsidian-900/80">
              <button
                type="button"
                onClick={handleResetDraft}
                className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-rose-400/30 text-xs font-medium text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleApplyFilters}
                className="flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 hover:from-gold-300 hover:to-amber-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Apply Filters ({draftPreviewCount} Matching)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
