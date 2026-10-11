"use client";

import React from "react";
import { Star, Quote, CheckCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TestimonialsSection() {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      name: "Rajiv S. Mehta",
      title:
        language === "hi"
          ? "चेयरमैन, मेहता फैमिली ऑफिस (मुंबई)"
          : language === "mr"
          ? "अध्यक्ष, मेहता फॅमिली ऑफिस (मुंबई)"
          : "Chairman, Mehta Family Office, Mumbai",
      quote:
        language === "hi"
          ? "आयात रियल एस्टेट ने वर्ली सी फेस पर हमारे पेंटहाउस का सौदा पूरी तरह गोपनीय रखा। उनकी महारेरा कानूनी जांच और निष्पादन बेजोड़ है।"
          : language === "mr"
          ? "आयात रिअल इस्टेटने वरळी सी फेसवरील आमच्या पेंटहाऊसचा व्यवहार अत्यंत गोपनीय पद्धतीने पूर्ण केला. त्यांची कायदेशीर व महारेरा तपासणी अप्रतिम आहे."
          : "Aayat Real Estate negotiated our Worli Sea Face sky villa completely off-market with total discretion. Their MahaRERA due diligence and escrow precision are unmatched in India.",
      estate:
        language === "hi"
          ? "सफल सौदा: वर्ली सी फेस विला (₹85 Lakh)"
          : language === "mr"
          ? "खरेदी: वरळी सी फेस व्हिला (₹85 Lakh)"
          : "Acquired: Worli Sea Face Villa (₹85 Lakh)",
    },
    {
      name: "Ananya Deshmukh",
      title:
        language === "hi"
          ? "सह-संस्थापक, फिनटेक यूनिकॉर्न (बेंगलुरु)"
          : language === "mr"
          ? "सह-संस्थापक, फिनटेक युनिकॉर्न (बंगळूरु)"
          : "Co-Founder, Fintech Unicorn, Bengaluru",
      quote:
        language === "hi"
          ? "गोवा के अस्सगाओ में एक प्रामाणिक हेरिटेज पुर्तगाली विला ढूंढना कठिन था। आयात की टीम ने वास्तु अनुपालन, टाइटल डीड और रजिस्ट्री केवल 10 दिनों में संपन्न कराई।"
          : language === "mr"
          ? "गोव्यात अस्सगाव येथे अस्सल वारसा पोर्तुगीज व्हिला शोधणे कठीण होते. आयातच्या चमूने वास्तुशास्त्र, टायटल डीड आणि नोंदणी अवघ्या १० दिवसांत पूर्ण केली."
          : "Securing an authentic Indo-Portuguese estate in Assagao with clean title was seamless. Aayat's team verified 70-year revenue records, Vastu harmony, and closed in 10 days.",
      estate:
        language === "hi"
          ? "सफल सौदा: अस्सगाओ हेरिटेज विला (₹45 Lakh)"
          : language === "mr"
          ? "खरेदी: अस्सगाव हेरिटेज व्हिला (₹45 Lakh)"
          : "Acquired: Assagao Heritage Villa (₹45 Lakh)",
    },
    {
      name: "Col. Vikramjit Kapoor",
      title:
        language === "hi"
          ? "प्राइवेट इक्विटी पार्टनर, नई दिल्ली"
          : language === "mr"
          ? "प्रायव्हेट इक्विटी पार्टनर, नवी दिल्ली"
          : "Private Equity Partner, New Delhi",
      quote:
        language === "hi"
          ? "उनका ईएमआई और आरओआई वित्तीय मॉडल बहुत सटीक था। आयात रियल एस्टेट एक प्रतिष्ठित मर्चेंट बैंक की तरह काम करता है।"
          : language === "mr"
          ? "त्यांचे ईएमआय आणि परतावा मॉडेल अत्यंत अचूक होते. आयात रिअल इस्टेट सर्वोच्च वित्तीय संस्थेप्रमाणे व्यवहार हाताळते."
          : "Their EMI structuring and rental yield forecasts were exceptionally thorough. Aayat Real Estate manages generational assets with institutional-grade sophistication.",
      estate:
        language === "hi"
          ? "सफल सौदा: लुटियंस इम्पीरियल एस्टेट (₹1 Cr)"
          : language === "mr"
          ? "खरेदी: लुटियन्स इम्पेरियल एस्टेट (₹1 Cr)"
          : "Acquired: Lutyens' Imperial Enclave (₹1 Cr)",
    },
  ];

  return (
    <section id="testimonials" className="py-12 md:py-20 relative bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("testBadge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            {t("testTitle1")}{" "}
            <span className="text-gold-gradient">{t("testTitle2")}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-light">
            {t("testSubtitle")}
          </p>
        </div>

        {/* Testimonials 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((tItem, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-8 glass-panel border border-white/10 hover:border-gold-400/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-gold-400/20" />
                </div>

                <p className="text-sm sm:text-base text-slate-300 italic font-light leading-relaxed mb-6">
                  &ldquo;{tItem.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-serif font-bold text-white">{tItem.name}</h4>
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                </div>
                <p className="text-xs text-gold-400/90 font-medium mt-0.5">{tItem.title}</p>
                <p className="text-[11px] text-slate-400 mt-2 bg-obsidian-900 py-1 px-2.5 rounded-lg inline-block border border-white/5">
                  {tItem.estate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
