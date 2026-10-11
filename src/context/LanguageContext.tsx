"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type Language = "en" | "hi" | "mr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isTranslating: boolean;
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            autoDisplay?: boolean;
            layout?: number;
          },
          elementId: string
        ) => void;
      };
    };
  }
}

// Base English dictionary as the single source of truth
// Google Translate dynamic translation engine automatically translates DOM text into Hindi, Marathi, etc.
export const englishTranslations: Record<string, string> = {
  // Brand & Header
  brandName: "Aayat",
  brandSubtitle: "Real Estate",
  navPortfolio: "Portfolio",
  navAdvisory: "VIP Advisory",
  navCalculator: "EMI & ROI Modeler",
  navLocations: "Prime Locations",
  navTestimonials: "Testimonials",
  navConsultation: "VIP Consultation",
  callConcierge: "Call Concierge",
  licensedBroker: "MahaRERA & RERA Registered Luxury Brokerage",

  // Hero Section
  heroBadge: "Epitome of Ultra-Luxury Indian Real Estate",
  heroTitlePart1: "Where",
  heroTitlePart2: "Architectural Grandeur",
  heroTitlePart3: "Meets Extraordinary Living",
  heroSubtitle:
    "Curating India's most prestigious sea-facing penthouses, private heritage bungalows, and palatial estates across Mumbai, Delhi-NCR, Goa, and Bengaluru.",
  tabBuy: "Acquire (Buy)",
  tabRent: "Lease (Rent)",
  verifiedBadge: "RERA Verified Off-Market Estates",
  labelCity: "Prime Destination",
  allCities: "All Major Indian Cities",
  labelStyle: "Property Style",
  allStyles: "All Architectural Styles",
  labelValuation: "Valuation Range",
  allValuations: "Any Valuation (₹)",
  searchCTA: "Discover",
  stat1Val: "500+",
  stat1Label: "Curated Estates Transacted",
  stat2Val: "100%",
  stat2Label: "Clear Title & RERA Verified",
  stat3Val: "18+",
  stat3Label: "Prime Indian & Global Hubs",
  stat4Val: "#1",
  stat4Label: "HNW Private Wealth Brokerage",

  // Filter Options
  cityMumbai: "Mumbai (Worli, Bandra, Juhu)",
  cityDelhi: "Delhi-NCR (Lutyens, Golf Course Rd)",
  cityGoa: "Goa (Assagao, Anjuna, Candolim)",
  cityBangalore: "Bengaluru (Indiranagar, Sadashivnagar)",
  cityPune: "Pune (Koregaon Park, Boat Club)",

  styleVilla: "Private Villa / Bungalow",
  stylePenthouse: "Sky Penthouse",
  styleWaterfront: "Sea-Facing Sanctuary",
  styleMansion: "Palatial Trophy Estate",

  valTier1: "₹10 Lakh – ₹35 Lakh",
  valTier2: "₹35 Lakh – ₹70 Lakh",
  valTier3: "₹70 Lakh – ₹1 Cr",

  // Properties Section
  portfolioBadge: "Curated Indian Portfolio",
  portfolioTitle1: "Signature Indian",
  portfolioTitle2: "Masterpieces",
  portfolioSubtitle:
    "Every residence in our collection is rigorously verified for RERA compliance, clear title deeds, architectural pedigree, and elite pin codes.",
  showingCount: "Showing",
  ofTotal: "of",
  estates: "Estates",

  tabAll: "All Estates",
  tabVillas: "Luxury Bungalows",
  tabPenthouses: "Sky Penthouses",
  tabWaterfront: "Sea-Facing Sanctuaries",
  tabMansions: "Palatial Estates",

  searchPlaceholder: "Search city, landmark...",
  sortFeatured: "Featured First",
  sortPriceHigh: "Price: High to Low (₹)",
  sortPriceLow: "Price: Low to High (₹)",
  sortArea: "Area: Largest Sq Ft",

  badgeExclusive: "Exclusive",
  badgeNew: "New Launch",
  btnDossier: "Dossier",
  btnTour: "Tour Estate",
  noResultsTitle: "No matching residences found",
  noResultsText: "Try adjusting your price range or destination to explore other verified off-market estates.",
  btnResetFilters: "Reset All Filters",

  // Property Specs
  specBeds: "Beds",
  specBaths: "Baths",
  specSqFt: "Sq Ft",
  specBuiltYear: "Built Year",
  specGarage: "Garage Parking",
  specValuation: "Acquisition Valuation",
  specRoi: "Projected Annual Yield",

  // Modal
  modalOverview: "Architectural Profile & Overview",
  modalAmenities: "Signature Estate Amenities & Features",
  modalPerformance: "Projected Financial Performance",
  modalProtected: "100% Clear Title & Escrow Protected",
  modalPdf: "Dossier PDF",
  modalScheduleTour: "Schedule Private Tour",

  // EMI Calculator
  calcBadge: "Wealth & Home Loan Modeler",
  calcTitle1: "Interactive Investment &",
  calcTitle2: "EMI Modeler (₹ INR)",
  calcSubtitle:
    "Model debt financing, down-payment equity, monthly EMI outlays, and forecast rental yields across prime Indian residential real estate.",
  calcParameters: "Investment Parameters",
  calcPrice: "Target Acquisition Value",
  calcDownPayment: "Down Payment Equity",
  calcInterest: "Home Loan Interest Rate (% p.a.)",
  calcTenure: "Loan Tenure (Years)",
  calcForecastBadge: "Financial Forecast",
  calcMonthlyEmi: "Estimated Monthly EMI",
  calcBorrowedLoan: "Total Bank Loan Borrowed:",
  calcEquityDown: "Equity Down Payment:",
  calcRentalYield: "Est. Annual Rental Yield:",
  calcAppreciation: "Est. 5-Yr Asset Appreciation:",
  calcBtnFinance: "Structure Private Banking Loan",
  calcDiscreetNote: "Introductions arranged with premier private wealth banks (HDFC Private, ICICI Wealth, Kotak Private).",

  // Services
  servicesBadge: "VIP Client Privileges",
  servicesTitle1: "Comprehensive",
  servicesTitle2: "Private Client Advisory",
  servicesSubtitle: "Transcending conventional real estate with end-to-end wealth protection and estate stewardship.",
  service1Title: "Off-Market Trophy Acquisitions",
  service1Desc: "Access unlisted sea-facing bungalows and ancestral estates through our private, NDA-governed HNW network.",
  service2Title: "Vastu & Architectural Advisory",
  service2Desc: "Complete guidance on Vastu Shastra harmonization, spatial planning, Italian marble selections, and home automation.",
  service3Title: "RERA & Legal Due Diligence",
  service3Desc: "Strict 100% title deed investigation, encumbrance verifications, stamp duty optimization, and escrow structuring.",
  service4Title: "White-Glove Estate Management",
  service4Desc: "Turnkey luxury property management: butler staffing, security protocols, maintenance, and rental portfolio yield optimization.",
  btnInquirePrivately: "Inquire Privately",
  ndaNotice: "Guaranteed Institutional Discretion & Non-Disclosure",
  ndaSubNotice: "All inquiries are protected by attorney-client privileged NDAs.",
  btnRequestBriefing: "Request Private Briefing",

  // Prime Locations
  locationsBadge: "Indian Prime Hubs",
  locationsTitle1: "Preeminent",
  locationsTitle2: "Prime Markets",
  locationsSubtitle: "Concentrated wealth corridors yielding exceptional capital safety and lifestyle prestige.",
  primeIndex: "Prime Index",

  // Testimonials
  testBadge: "Private Client Endorsements",
  testTitle1: "Trusted by India's",
  testTitle2: "Foremost Families & Leaders",
  testSubtitle: "Over 500+ successful transactions executed for prominent industrial houses, tech founders, and family offices.",

  // Contact Modal
  contactModalTitle: "Schedule Private VIP Consultation",
  contactName: "Full Legal / Representative Name *",
  contactPhone: "Direct Phone / WhatsApp *",
  contactEmail: "Confidential Email Address *",
  contactBudget: "Capital Allocation Target",
  contactDestination: "Primary Destination",
  contactNotes: "Specific Architectural Or Acquisition Brief",
  contactNda: "Enforce Mutual Non-Disclosure: All details provided are encrypted and shared exclusively with senior partners.",
  contactSubmit: "Transmit Private Briefing",
  contactSuccessTitle: "Briefing Request Received",
  contactSuccessMsg: "Your private client advisor at Aayat Real Estate has been notified and will contact you confidentially within 2 hours.",

  // Footer
  footerDesc: "Aayat Real Estate is India's premier advisory for ultra-luxury sea-facing residences, heritage bungalows, and off-market architectural trophies.",
  footerRera: "MahaRERA Reg. No: A51900028941 | RERA Karnataka: PRM/KA/RERA/1251",
  footerDispatch: "The Private Investor Dispatch",
  footerDispatchPlaceholder: "Enter confidential email...",
  footerJoin: "Join",
  footerOffices: "Corporate Salons",
  footerMumbaiOffice: "Mumbai Headquarters: BKC & Worli Sea Face",
  footerDelhiOffice: "Delhi Salon: Barakhamba Road, Connaught Place",
  footerBangaloreOffice: "Bengaluru Advisory: UB City, Vittal Mallya Road",
  footerCopyright: "Aayat Real Estate Group Pvt. Ltd. All rights reserved.",

  // Mobile Bar
  mobCall: "Call",
  mobWhatsApp: "WhatsApp",
  mobBookTour: "Book Tour",
};

export const translations = {
  en: englishTranslations,
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  isTranslating: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isTranslating, setIsTranslating] = useState(false);

  // Trigger Google Translate engine
  const triggerGoogleTranslate = useCallback((lang: Language) => {
    try {
      const cookieValue = `/en/${lang}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      if (typeof window !== "undefined" && window.location.hostname) {
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname};`;
      }

      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
      } else if (lang !== "en") {
        // If select element isn't ready yet, it will apply on script load or reload
        window.location.reload();
      }
    } catch (e) {
      console.warn("Translation trigger notice:", e);
    }
  }, []);

  // Initialize Google Translate Script
  useEffect(() => {
    // Check saved language
    const saved = localStorage.getItem("aayat_lang") as Language;
    if (saved && (saved === "en" || saved === "hi" || saved === "mr")) {
      setLanguageState(saved);
      document.cookie = `googtrans=/en/${saved}; path=/;`;
    }

    // Define global Google Translate initialization callback
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,mr",
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // Apply saved language if not English
        const currentSaved = (localStorage.getItem("aayat_lang") as Language) || "en";
        if (currentSaved !== "en") {
          setTimeout(() => {
            const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
            if (select) {
              select.value = currentSaved;
              select.dispatchEvent(new Event("change"));
            }
          }, 300);
        }
      }
    };

    // Dynamically inject Google Translate script if not present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Enforce zero top offset on body and suppress any Google Translate banner nudge
    const cleanupGoogleBanners = () => {
      if (document.body.style.top && document.body.style.top !== "0px") {
        document.body.style.top = "0px";
      }
      const bannerElements = document.querySelectorAll<HTMLElement>(
        '.VIpgJd-ZVi9od-OR9Mb-Oxf5c, iframe.skiptranslate, body > .skiptranslate, .goog-te-banner-frame, iframe[id*="container"]'
      );
      bannerElements.forEach((el) => {
        el.style.setProperty("display", "none", "important");
        el.style.setProperty("visibility", "hidden", "important");
        el.style.setProperty("height", "0px", "important");
        el.style.setProperty("width", "0px", "important");
      });
    };

    cleanupGoogleBanners();
    const observer = new MutationObserver(() => {
      cleanupGoogleBanners();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
      childList: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("aayat_lang", lang);
    setIsTranslating(true);
    triggerGoogleTranslate(lang);
    setTimeout(() => setIsTranslating(false), 500);
  };

  const t = (key: string): string => {
    return englishTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTranslating }}>
      <div
        id="google_translate_element"
        className="hidden pointer-events-none opacity-0 h-0 w-0 overflow-hidden"
        style={{ display: "none" }}
        aria-hidden="true"
      />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
