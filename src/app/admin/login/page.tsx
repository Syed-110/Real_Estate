"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { useAdminAuth, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASS } from "@/context/AdminAuthContext";
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, Sparkles, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const success = login(email, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Invalid administrative credentials. Use the demo credentials below.");
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail(DEFAULT_ADMIN_EMAIL);
    setPassword(DEFAULT_ADMIN_PASS);
    setError("");
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden selection:bg-gold-400 selection:text-obsidian-950">
      {/* Ambient background gold glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between py-4 z-10">
        <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg">
          <BrandLogo size="md" />
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.16em] text-slate-400 hover:text-gold-300 transition-colors flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-white/5"
        >
          <span>← Back to Website</span>
        </Link>
      </div>

      {/* Center Login Box */}
      <div className="w-full max-w-md my-auto py-8 z-10">
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-400/30 shadow-gold-glow-lg relative overflow-hidden">
          {/* Subtle top shimmer bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Executive Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Estate Management Login
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light">
              Secure private console for uploading, managing, and toggling luxury properties & estates.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                Admin Email / Username
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-gold-400/70 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aayatrealestate.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-medium">
                  Administrative Password
                </label>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-gold-400/70 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-gold-400 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-[0.18em] shadow-gold-glow flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              <span>{isSubmitting ? "Authenticating..." : "Access Control Panel"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-gold-400/10 border border-white/10 hover:border-gold-400/30 text-gold-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Autofill Demo Credentials</span>
            </button>
            <div className="mt-2 text-[11px] text-slate-400 text-center">
              Demo: <span className="text-slate-300 font-mono">admin@aayatrealestate.in</span> /{" "}
              <span className="text-slate-300 font-mono">admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Security Note */}
      <div className="w-full max-w-5xl py-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 z-10 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-gold-400/70 flex-shrink-0" />
        <span>Aayat Real Estate Confidential Internal System • MahaRERA & Encrypted Access</span>
      </div>
    </div>
  );
}
