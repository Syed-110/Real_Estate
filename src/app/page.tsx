"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertiesSection from "@/components/PropertiesSection";
import MortgageCalculator from "@/components/MortgageCalculator";
import ServicesSection from "@/components/ServicesSection";
import NeighborhoodsSection from "@/components/NeighborhoodsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import PropertyModal from "@/components/PropertyModal";
import ContactModal from "@/components/ContactModal";
import MobileActionBar from "@/components/MobileActionBar";
import { PROPERTIES, Property } from "@/data/properties";
import { useLanguage } from "@/context/LanguageContext";
import { useProperties } from "@/context/PropertyContext";

export default function Home() {
  const { language } = useLanguage();
  const { publicProperties } = useProperties();
  const [searchFilters, setSearchFilters] = useState({
    category: "Buy",
    location: "all",
    type: "all",
    price: "all",
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationPropertyTitle, setConsultationPropertyTitle] = useState("");

  const handleSearch = (filters: {
    category: string;
    location: string;
    type: string;
    price: string;
  }) => {
    setSearchFilters(filters);
  };

  const handleOpenConsultation = (propertyTitle?: string) => {
    setConsultationPropertyTitle(propertyTitle || "");
    setIsConsultationOpen(true);
  };

  const handleSelectLocation = (loc: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      location: loc,
    }));
  };

  return (
    <main className="min-h-screen bg-obsidian-950 text-slate-100 relative selection:bg-gold-400 selection:text-obsidian-950">
      {/* Top Header Navigation */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      {/* Hero Section */}
      <Hero
        onSearch={handleSearch}
        onExploreProperties={() => {
          const el = document.getElementById("properties");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Featured Properties Portfolio */}
      <PropertiesSection
        properties={publicProperties}
        searchFilters={searchFilters}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onBookViewing={(prop) => {
          const title = prop.title[language] || prop.title.en;
          handleOpenConsultation(title);
        }}
      />

      {/* Prime Indian Markets */}
      <NeighborhoodsSection onSelectLocation={handleSelectLocation} />

      {/* Interactive Indian Mortgage & EMI Modeler */}
      <MortgageCalculator onOpenConsultation={() => handleOpenConsultation()} />

      {/* VIP Client Services */}
      <ServicesSection onOpenConsultation={() => handleOpenConsultation()} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Luxury Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <MobileActionBar onOpenConsultation={() => handleOpenConsultation()} />

      {/* Modals */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onBookViewing={(prop) => {
          setSelectedProperty(null);
          const title = prop.title[language] || prop.title.en;
          handleOpenConsultation(title);
        }}
      />

      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialPropertyTitle={consultationPropertyTitle}
      />
    </main>
  );
}
