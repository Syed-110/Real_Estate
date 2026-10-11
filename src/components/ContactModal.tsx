"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Lock, Sparkles, Send } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useLanguage } from "@/context/LanguageContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyTitle?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  initialPropertyTitle,
}: ContactModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "₹15 Cr – ₹30 Cr",
    destination: "Mumbai",
    purpose: "Primary Residence",
    notes: "",
    ndaAgreement: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-obsidian-950 border border-gold-400/30 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-900/80">
          <BrandLogo size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-obsidian-900 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/40 text-gold-400 flex items-center justify-center mx-auto shadow-gold-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {t("contactSuccessTitle")}
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {t("contactSuccessMsg")}
              </p>
              <div className="p-4 rounded-2xl bg-obsidian-900/80 border border-white/10 max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-300">
                <p>
                  <span className="text-slate-500">Client / Contact:</span> {formData.name} ({formData.phone})
                </p>
                <p>
                  <span className="text-slate-500">Allocation:</span> {formData.budget}
                </p>
                {initialPropertyTitle && (
                  <p>
                    <span className="text-slate-500">Selected Estate:</span> {initialPropertyTitle}
                  </p>
                )}
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-300 shadow-gold-glow"
                >
                  OK
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MahaRERA & RERA Protected</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {t("contactModalTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {initialPropertyTitle ? (
                    <>
                      Inquiring regarding:{" "}
                      <span className="text-gold-400 font-medium">{initialPropertyTitle}</span>
                    </>
                  ) : (
                    "Direct confidential access to senior partners for unlisted luxury estates."
                  )}
                </p>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    {t("contactName")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    {t("contactPhone")}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1 font-medium">
                  {t("contactEmail")}
                </label>
                <input
                  type="email"
                  required
                  placeholder="principal@familyoffice.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    {t("contactBudget")}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="₹5 Cr – ₹15 Cr">₹5,00,00,000 – ₹15,00,00,000 (₹5–15 Cr)</option>
                    <option value="₹15 Cr – ₹30 Cr">₹15,00,00,000 – ₹30,00,00,000 (₹15–30 Cr)</option>
                    <option value="₹30 Cr – ₹60 Cr">₹30,00,00,000 – ₹60,00,00,000 (₹30–60 Cr)</option>
                    <option value="₹60 Cr+">₹60,00,00,000+ (Trophy Estate Tier)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    {t("contactDestination")}
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Mumbai">Mumbai (Worli, Bandra, Juhu)</option>
                    <option value="Delhi">Delhi-NCR (Lutyens', Gurgaon)</option>
                    <option value="Goa">North Goa (Assagao, Anjuna)</option>
                    <option value="Bangalore">Bengaluru (Sadashivnagar)</option>
                    <option value="Pune">Pune (Koregaon Park)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1 font-medium">
                  {t("contactNotes")}
                </label>
                <textarea
                  rows={3}
                  placeholder="Vastu-compliant East-facing, sea view, minimum 5 suites, private parking..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* NDA Protection Checkbox */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-obsidian-900/60 border border-white/5">
                <input
                  type="checkbox"
                  id="nda"
                  checked={formData.ndaAgreement}
                  onChange={(e) => setFormData({ ...formData, ndaAgreement: e.target.checked })}
                  className="mt-0.5 rounded text-gold-400 focus:ring-gold-400 accent-gold-400"
                />
                <label htmlFor="nda" className="text-xs text-slate-400 cursor-pointer">
                  {t("contactNda")}
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-[0.2em] shadow-gold-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Encrypting & Sending Brief...</span>
                  ) : (
                    <>
                      <span>{t("contactSubmit")}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <Lock className="w-3.5 h-3.5 text-gold-400" />
                <span>MahaRERA & RERA Registered Confidential Protocol</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
