"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Property } from "@/data/properties";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Car,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Download,
} from "lucide-react";

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onBookViewing: (property: Property) => void;
}

export default function PropertyModal({
  property,
  onClose,
  onBookViewing,
}: PropertyModalProps) {
  const { language, t } = useLanguage();

  useEffect(() => {
    if (property) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [property]);

  if (!property) return null;

  const title = property.title[language] || property.title.en;
  const location = property.location[language] || property.location.en;
  const description = property.description[language] || property.description.en;
  const roi = property.roiEstimate[language] || property.roiEstimate.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl bg-obsidian-950 border border-gold-400/30 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        {/* Header Media Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 flex-shrink-0">
          <Image
            src={property.image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-black/40" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-obsidian-950/80 border border-white/20 text-white hover:text-gold-400 backdrop-blur-md transition-transform active:scale-95"
            aria-label="Close Property Dossier"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Tag Badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold-400 text-obsidian-950 shadow-md">
              {property.type}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 backdrop-blur-md flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              {property.reraNumber}
            </span>
          </div>

          {/* Bottom Title & Price Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gold-300 font-medium mb-1">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{location}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md">
                {title}
              </h2>
            </div>
            <div className="text-left sm:text-right bg-obsidian-900/80 sm:bg-transparent p-2 sm:p-0 rounded-xl border sm:border-0 border-white/10 backdrop-blur-sm sm:backdrop-blur-none">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                {t("specValuation")}
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">
                {property.formattedPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-2xl bg-obsidian-900/90 border border-white/10 text-center">
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-400">
                <Bed className="w-4 h-4 text-gold-400" /> {t("specBeds")}
              </span>
              <span className="text-base sm:text-lg font-bold text-white mt-1">
                {property.bedrooms} Suites
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10">
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-400">
                <Bath className="w-4 h-4 text-gold-400" /> {t("specBaths")}
              </span>
              <span className="text-base sm:text-lg font-bold text-white mt-1">
                {property.bathrooms} Baths
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10">
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-400">
                <Maximize2 className="w-4 h-4 text-gold-400" /> {t("specSqFt")}
              </span>
              <span className="text-base sm:text-lg font-bold text-white mt-1">
                {property.areaSqFt.toLocaleString()} sq ft
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10">
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-400">
                <Calendar className="w-4 h-4 text-gold-400" /> {t("specBuiltYear")}
              </span>
              <span className="text-base sm:text-lg font-bold text-white mt-1">
                {property.yearBuilt}
              </span>
            </div>
            <div className="flex flex-col items-center col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0">
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-400">
                <Car className="w-4 h-4 text-gold-400" /> {t("specGarage")}
              </span>
              <span className="text-base sm:text-lg font-bold text-white mt-1">
                {property.parkingSpaces} Vehicles
              </span>
            </div>
          </div>

          {/* Architectural Description */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400 mb-2">
              {t("modalOverview")}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Curated Amenities */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400 mb-4">
              {t("modalAmenities")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((amenityObj, idx) => {
                const amenityText = amenityObj[language] || amenityObj.en;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-obsidian-900/60 border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-200">{amenityText}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Financial & Yield Performance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gold-950/40 via-obsidian-900 to-obsidian-900 border border-gold-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  {t("modalPerformance")}
                </p>
                <p className="text-base sm:text-lg font-bold text-white">
                  {roi}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>{t("modalProtected")}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 sm:p-6 bg-obsidian-900/95 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 pb-safe">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => alert("Dossier for " + title + " has been transmitted to your device.")}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>{t("modalPdf")}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookViewing(property);
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-[0.18em] shadow-gold-glow hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <span>{t("modalScheduleTour")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
