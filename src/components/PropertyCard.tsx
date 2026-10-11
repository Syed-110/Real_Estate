"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Property } from "@/data/properties";
import { useLanguage } from "@/context/LanguageContext";
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowUpRight, TrendingUp, ShieldCheck } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onBookViewing: (property: Property) => void;
}

export default function PropertyCard({
  property,
  onSelect,
  onBookViewing,
}: PropertyCardProps) {
  const { language, t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  const title = property.title[language] || property.title.en;
  const tagline = property.tagline[language] || property.tagline.en;
  const location = property.location[language] || property.location.en;
  const roi = property.roiEstimate[language] || property.roiEstimate.en;

  return (
    <article
      id={property.id}
      className="group relative rounded-2xl md:rounded-3xl overflow-hidden glass-panel glass-card-hover flex flex-col h-full border border-white/10 hover:border-gold-400/50"
    >
      {/* Property Image Container */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden cursor-pointer" onClick={() => onSelect(property)}>
        <Image
          src={property.image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex flex-wrap gap-2">
            {property.status === "sold" && (
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-rose-600 text-white border border-rose-400 shadow-md">
                SOLD
              </span>
            )}
            {property.category === "Rent" && (
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-400/40 backdrop-blur-md">
                FOR LEASE
              </span>
            )}
            {property.exclusive && (
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold-400 text-obsidian-950 shadow-md">
                {t("badgeExclusive")}
              </span>
            )}
            {property.isNew && (
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-900/90 text-white border border-white/20 backdrop-blur-md">
                {t("badgeNew")}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/60 text-slate-200 border border-white/10 backdrop-blur-md">
              {property.type}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="pointer-events-auto p-2.5 rounded-full bg-obsidian-950/70 border border-white/20 text-white hover:text-gold-400 backdrop-blur-md transition-transform active:scale-90"
            aria-label={isFavorite ? "Remove from saved properties" : "Save property to favorites"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Bottom Price Overlay (INR: 10 Lakh to 1 Cr) */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-300 block">
              {t("specValuation")}
            </span>
            <span className="text-2xl font-serif font-bold text-white drop-shadow-md">
              {property.formattedPrice}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-obsidian-900/90 border border-gold-400/30 text-gold-300 text-[11px] font-medium backdrop-blur-md">
            <TrendingUp className="w-3.5 h-3.5 text-gold-400" />
            <span>{roi}</span>
          </div>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & RERA */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-md flex-shrink-0">
              <ShieldCheck className="w-3 h-3" />
              <span className="truncate max-w-[120px]">{property.reraNumber.split(":")[0]}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(property)}
            className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors cursor-pointer line-clamp-1"
          >
            {title}
          </h3>

          {/* Tagline */}
          <p className="mt-1 text-xs text-slate-300 line-clamp-2 font-light">
            {tagline}
          </p>
        </div>

        <div className="mt-6">
          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-obsidian-900/80 border border-white/5 text-center text-xs text-slate-300">
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Bed className="w-3.5 h-3.5 text-gold-400" /> {t("specBeds")}
              </span>
              <span className="font-semibold text-white mt-0.5">{property.bedrooms}</span>
            </div>
            <div className="flex flex-col items-center justify-center border-x border-white/10">
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Bath className="w-3.5 h-3.5 text-gold-400" /> {t("specBaths")}
              </span>
              <span className="font-semibold text-white mt-0.5">{property.bathrooms}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Maximize2 className="w-3.5 h-3.5 text-gold-400" /> {t("specSqFt")}
              </span>
              <span className="font-semibold text-white mt-0.5">{property.areaSqFt.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSelect(property)}
              className="py-2.5 px-3 rounded-xl bg-obsidian-900 hover:bg-obsidian-800 border border-white/10 hover:border-gold-400/40 text-slate-200 hover:text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1 transition-all"
            >
              <span>{t("btnDossier")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gold-400" />
            </button>
            <button
              type="button"
              onClick={() => onBookViewing(property)}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-400/20 to-gold-500/30 hover:from-gold-400 hover:to-amber-500 text-gold-300 hover:text-obsidian-950 border border-gold-400/40 text-xs font-bold tracking-wider uppercase flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <span>{t("btnTour")}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
