"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { Mail, Phone, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-obsidian-950 border-t border-white/10 pt-16 pb-24 md:pb-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" />
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-sm leading-relaxed mt-4">
              {t("footerDesc")}
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400 pt-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>{t("footerRera")}</span>
            </div>

            {/* Newsletter Dispatch */}
            <div className="pt-4 max-w-sm">
              <p className="text-xs uppercase tracking-wider text-slate-300 font-medium mb-2">
                {t("footerDispatch")}
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed to private unlisted releases.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder={t("footerDispatchPlaceholder")}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gold-400 hover:bg-gold-300 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-gold-glow"
                  >
                    <span>{t("footerJoin")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Portfolio Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-4">
              {t("navPortfolio")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#properties" className="hover:text-gold-300 transition-colors">
                  Sea-Facing Penthouses
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-gold-300 transition-colors">
                  Heritage Bungalows
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-gold-300 transition-colors">
                  Goa Portuguese Villas
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-gold-300 transition-colors">
                  Lutyens' Delhi Mansions
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-gold-300 transition-colors">
                  Off-Market Pocket Listings
                </a>
              </li>
            </ul>
          </div>

          {/* Client Advisory */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-4">
              {t("navAdvisory")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#calculator" className="hover:text-gold-300 transition-colors">
                  {t("navCalculator")}
                </a>
              </li>
              <li>
                <a href="#vip-services" className="hover:text-gold-300 transition-colors">
                  MahaRERA & Legal Title Check
                </a>
              </li>
              <li>
                <a href="#vip-services" className="hover:text-gold-300 transition-colors">
                  Vastu Shastra Alignment
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-gold-300 transition-colors">
                  {t("navLocations")}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-gold-300 transition-colors">
                  {t("navTestimonials")}
                </a>
              </li>
            </ul>
          </div>

          {/* Indian Corporate Salons */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-4">
              {t("footerOffices")}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <p className="font-semibold text-slate-200">{t("footerMumbaiOffice")}</p>
                <p className="text-[11px] text-slate-500">Bandra Kurla Complex, Mumbai 400051</p>
              </div>
              <div>
                <p className="font-semibold text-slate-200">{t("footerDelhiOffice")}</p>
                <p className="text-[11px] text-slate-500">Connaught Place, New Delhi 110001</p>
              </div>
              <div>
                <p className="font-semibold text-slate-200">{t("footerBangaloreOffice")}</p>
                <p className="text-[11px] text-slate-500">Vittal Mallya Road, Bengaluru 560001</p>
              </div>
              <div className="pt-2 flex flex-col gap-1 text-slate-300">
                <a href="tel:+919820012345" className="flex items-center gap-1.5 hover:text-gold-300">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>+91 98200 12345</span>
                </a>
                <a href="mailto:private@aayatrealestate.in" className="flex items-center gap-1.5 hover:text-gold-300">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                  <span>concierge@aayatrealestate.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {t("footerCopyright")}</p>
          <div className="flex items-center gap-6 flex-wrap">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">MahaRERA Disclosures</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Representation</span>
            <Link href="/admin" className="hover:text-gold-400 text-slate-500 font-medium transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
