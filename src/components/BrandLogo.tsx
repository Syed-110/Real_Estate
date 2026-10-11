"use client";

import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function BrandLogo({
  size = "md",
  showText = true,
  className = "",
}: BrandLogoProps) {
  const iconSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10 md:w-11 md:h-11",
    lg: "w-14 h-14 md:w-16 md:h-16",
  };

  const textClasses = {
    sm: {
      title: "text-base tracking-[0.2em]",
      subtitle: "text-[9px] tracking-[0.3em]",
    },
    md: {
      title: "text-lg md:text-xl tracking-[0.22em]",
      subtitle: "text-[10px] md:text-[11px] tracking-[0.35em]",
    },
    lg: {
      title: "text-2xl md:text-3xl tracking-[0.25em]",
      subtitle: "text-xs md:text-sm tracking-[0.4em]",
    },
  };

  return (
    <div className={`flex items-center gap-3 select-none shrink-0 whitespace-nowrap ${className}`}>
      {/* Brand Emblem */}
      <div
        className={`relative ${iconSizeClasses[size]} rounded-xl overflow-hidden ring-1 ring-gold-400/40 shadow-gold-glow flex items-center justify-center bg-obsidian-900 group-hover:ring-gold-400 transition-all duration-300 shrink-0`}
      >
        <Image
          src="/images/logo.jpg"
          alt="Aayat Real Estate Emblem"
          fill
          sizes="64px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center shrink-0 whitespace-nowrap">
          <span
            className={`font-serif font-bold text-white leading-tight uppercase ${textClasses[size].title}`}
          >
            Aayat
          </span>
          <span
            className={`font-sans font-medium text-gold-400 leading-none uppercase ${textClasses[size].subtitle}`}
          >
            Real Estate
          </span>
        </div>
      )}
    </div>
  );
}
