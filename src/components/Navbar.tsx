"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Menu, X, ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t("navPortfolio"), href: "#properties" },
    { label: t("navAdvisory"), href: "#vip-services" },
    { label: t("navCalculator"), href: "#calculator" },
    { label: t("navLocations"), href: "#locations" },
    { label: t("navTestimonials"), href: "#testimonials" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-obsidian-950/90 backdrop-blur-xl border-b border-gold-400/20 py-2.5 shadow-2xl shadow-black/50"
            : "bg-gradient-to-b from-obsidian-950/95 via-obsidian-950/70 to-transparent backdrop-blur-[2px] py-3.5 md:py-4.5"
        }`}
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link
              href="/"
              className="group flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg"
              aria-label="Aayat Real Estate Home"
            >
              <BrandLogo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 2xl:gap-8 mx-auto shrink">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[11.5px] xl:text-xs 2xl:text-[13px] uppercase tracking-[0.14em] xl:tracking-[0.16em] font-medium text-slate-300 hover:text-gold-300 transition-colors duration-200 relative py-1.5 whitespace-nowrap group shrink-0"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-400 to-amber-200 transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                </a>
              ))}
            </nav>

            {/* Desktop Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5 shrink-0">
              {/* Language Switcher */}
              <LanguageSwitcher variant="desktop" />

              {/* Phone Concierge (Icon-only on lg-xl, full text on 2xl) */}
              <a
                href="tel:+919820012345"
                className="hidden 2xl:flex items-center gap-2 text-xs text-slate-300 hover:text-gold-300 transition-colors py-1.5 px-3 rounded-full hover:bg-white/5 whitespace-nowrap shrink-0 border border-transparent hover:border-gold-400/20"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="tracking-wider font-medium">+91 98200 12345</span>
              </a>

              <a
                href="tel:+919820012345"
                className="flex 2xl:hidden items-center justify-center p-2 rounded-full bg-obsidian-900/80 border border-gold-400/25 text-gold-400 hover:text-gold-300 hover:border-gold-400/60 hover:bg-gold-400/10 transition-all shrink-0 shadow-sm"
                title="Call Concierge: +91 98200 12345"
                aria-label="Call Concierge"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
              </a>

              {/* VIP Consultation CTA */}
              <button
                type="button"
                onClick={onOpenConsultation}
                className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gold-400 shrink-0 shadow-gold-glow"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gold-400 via-amber-200 to-gold-500 rounded-full group-hover:opacity-90 transition-opacity" />
                <span className="relative flex items-center gap-2 px-4 py-2 xl:px-5 xl:py-2.5 rounded-full bg-obsidian-950 text-gold-300 font-semibold text-[11px] xl:text-xs tracking-[0.14em] uppercase transition-all duration-300 group-hover:bg-opacity-80 whitespace-nowrap">
                  <span>{t("navConsultation")}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-gold-400 shrink-0" />
                </span>
              </button>
            </div>

            {/* Mobile / Tablet Header Actions */}
            <div className="flex items-center gap-2 lg:hidden shrink-0">
              <LanguageSwitcher variant="desktop" className="hidden sm:inline-flex scale-90" />

              <a
                href="tel:+919820012345"
                className="p-2 rounded-xl bg-obsidian-900/80 border border-white/10 text-gold-400 hover:text-gold-300 active:scale-95 transition-transform"
                aria-label="Call Concierge"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-obsidian-900/80 border border-white/10 text-slate-200 hover:text-gold-400 focus:outline-none active:scale-95 transition-transform"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (iOS & Touch Optimized) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-obsidian-950 border-l border-gold-400/20 shadow-2xl flex flex-col justify-between pt-safe pb-safe px-6 py-6 transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <BrandLogo size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-obsidian-900 text-slate-300 hover:text-white border border-white/10"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Language Switcher */}
            <div className="mt-6 pb-4 border-b border-white/10">
              <LanguageSwitcher variant="mobile" />
            </div>

            {/* Mobile Links */}
            <nav className="mt-6 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-sm uppercase tracking-[0.16em] font-medium text-slate-200 hover:text-gold-300 border-b border-white/5 active:text-gold-400"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-gold-400/60" />
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Footer & Actions */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-semibold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 shadow-gold-glow"
            >
              <span>{t("navConsultation")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="tel:+919820012345"
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-obsidian-900 border border-white/10 text-xs text-slate-200 hover:text-gold-300"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>{t("callConcierge")}</span>
              </a>
              <a
                href="https://wa.me/919820012345?text=Hello%20Aayat%20Real%20Estate,%20I%20am%20interested%20in%20your%20luxury%20Indian%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-obsidian-900 border border-white/10 text-xs text-emerald-400 hover:text-emerald-300"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <span>{t("licensedBroker")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
