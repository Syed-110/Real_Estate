"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useProperties, formatPriceINR } from "@/context/PropertyContext";
import { Property, LocalizedText } from "@/data/properties";
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  EyeOff,
  Tag,
  Building2,
  Home,
  Store,
  Layers,
  MapPin,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  IndianRupee,
  Sparkles,
  Bed,
  Bath,
  Maximize2,
  X,
  AlertTriangle,
  RotateCcw,
  Check,
} from "lucide-react";

// Curated high-res luxury property image presets for quick selection
const IMAGE_PRESETS = [
  { label: "Waterfront Estate", url: "/images/waterfront.jpg" },
  { label: "Palatial Villa", url: "/images/hero-villa.jpg" },
  { label: "Sky Penthouse", url: "/images/penthouse.jpg" },
  {
    label: "Prime Commercial / Shop",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Modern Luxury Home",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Heritage Portuguese Villa",
    url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Corporate Boutique Salon",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
];

const AMENITY_SUGGESTIONS = [
  "Sea Facing",
  "Private Pool",
  "High Footfall Corridor",
  "Italian Marble Flooring",
  "Private Elevator",
  "24/7 Concierge & Security",
  "Valet Parking",
  "Vastu Compliant",
  "100% Power Backup",
  "Sky Deck & Barbecue",
  "Helipad Access",
  "Private Garden",
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout, isLoading } = useAdminAuth();
  const { properties, addProperty, updateProperty, deleteProperty, setStatus, resetProperties } =
    useProperties();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    price: 3500000, // ₹35 Lakhs default (range ₹10 Lakh - ₹1 Cr)
    type: "Home",
    category: "Buy" as "Buy" | "Rent",
    city: "Mumbai",
    location: "Worli, South Mumbai",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 1850,
    parkingSpaces: 2,
    yearBuilt: 2024,
    image: "/images/hero-villa.jpg",
    customImageUrl: "",
    status: "active" as "active" | "inactive" | "sold",
    featured: false,
    exclusive: true,
    isNew: true,
    reraNumber: "MahaRERA P51900028941",
    description: "",
    amenities: ["Vastu Compliant", "24/7 Concierge & Security", "Italian Marble Flooring"],
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Portfolio KPI metrics
  const stats = useMemo(() => {
    const total = properties.length;
    const active = properties.filter((p) => p.status !== "inactive" && p.status !== "sold").length;
    const inactive = properties.filter((p) => p.status === "inactive").length;
    const sold = properties.filter((p) => p.status === "sold").length;
    const totalValuation = properties.reduce((acc, p) => acc + (p.price || 0), 0);

    return { total, active, inactive, sold, totalValuation };
  }, [properties]);

  // Filtered properties
  const filteredList = useMemo(() => {
    return properties.filter((p) => {
      // Status filter
      if (statusFilter !== "all") {
        const itemStatus = p.status || "active";
        if (itemStatus !== statusFilter) return false;
      }

      // Category filter
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;

      // Type filter
      if (typeFilter !== "all") {
        if (p.type?.toLowerCase() !== typeFilter.toLowerCase()) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = p.title?.en?.toLowerCase().includes(q) || false;
        const locMatch = p.location?.en?.toLowerCase().includes(q) || false;
        const cityMatch = p.city?.toLowerCase().includes(q) || false;
        const typeMatch = p.type?.toLowerCase().includes(q) || false;
        if (!titleMatch && !locMatch && !cityMatch && !typeMatch) return false;
      }

      return true;
    });
  }, [properties, statusFilter, categoryFilter, typeFilter, searchQuery]);

  // Open modal for Adding
  const handleOpenAdd = () => {
    setEditingPropertyId(null);
    setFormData({
      title: "",
      tagline: "",
      price: 3500000, // ₹35 Lakhs default
      type: "Home",
      category: "Buy",
      city: "Mumbai",
      location: "Worli, South Mumbai",
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 1850,
      parkingSpaces: 2,
      yearBuilt: 2024,
      image: "/images/hero-villa.jpg",
      customImageUrl: "",
      status: "active",
      featured: false,
      exclusive: true,
      isNew: true,
      reraNumber: "MahaRERA P51900028941",
      description: "Ultra-luxury residence with exquisite finishes, panoramic natural light, and premium fixtures.",
      amenities: ["Vastu Compliant", "24/7 Concierge & Security", "Italian Marble Flooring"],
    });
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEdit = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setFormData({
      title: prop.title?.en || "",
      tagline: prop.tagline?.en || "",
      price: prop.price || 5000000,
      type: prop.type || "Home",
      category: prop.category || "Buy",
      city: prop.city || "Mumbai",
      location: prop.location?.en || "",
      bedrooms: prop.bedrooms || 1,
      bathrooms: prop.bathrooms || 1,
      areaSqFt: prop.areaSqFt || 1000,
      parkingSpaces: prop.parkingSpaces || 1,
      yearBuilt: prop.yearBuilt || 2024,
      image: prop.image || "/images/hero-villa.jpg",
      customImageUrl: "",
      status: prop.status || "active",
      featured: !!prop.featured,
      exclusive: !!prop.exclusive,
      isNew: !!prop.isNew,
      reraNumber: prop.reraNumber || "",
      description: prop.description?.en || "",
      amenities: prop.amenities?.map((a) => (typeof a === "string" ? a : a.en)) || [],
    });
    setIsModalOpen(true);
  };

  // Save Add/Edit
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedImage = formData.customImageUrl.trim()
      ? formData.customImageUrl.trim()
      : formData.image;

    const localizedTitle: LocalizedText = {
      en: formData.title.trim() || "Untitled Estate",
      hi: formData.title.trim() || "Untitled Estate",
      mr: formData.title.trim() || "Untitled Estate",
    };

    const localizedTagline: LocalizedText = {
      en: formData.tagline.trim() || "Exclusive verified luxury residence",
      hi: formData.tagline.trim() || "Exclusive verified luxury residence",
      mr: formData.tagline.trim() || "Exclusive verified luxury residence",
    };

    const localizedLocation: LocalizedText = {
      en: formData.location.trim() || "Prime Corridor",
      hi: formData.location.trim() || "Prime Corridor",
      mr: formData.location.trim() || "Prime Corridor",
    };

    const localizedDescription: LocalizedText = {
      en: formData.description.trim() || "Peerless architectural estate offering absolute privacy.",
      hi: formData.description.trim() || "Peerless architectural estate offering absolute privacy.",
      mr: formData.description.trim() || "Peerless architectural estate offering absolute privacy.",
    };

    const localizedAmenities: LocalizedText[] = formData.amenities.map((item) => ({
      en: item,
      hi: item,
      mr: item,
    }));

    const propertyPayload: Omit<Property, "id"> & { id?: string } = {
      title: localizedTitle,
      tagline: localizedTagline,
      price: Number(formData.price),
      formattedPrice: formatPriceINR(Number(formData.price)),
      type: formData.type,
      category: formData.category,
      location: localizedLocation,
      city: formData.city,
      country: "India",
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      areaSqFt: Number(formData.areaSqFt),
      image: selectedImage,
      featured: formData.featured,
      exclusive: formData.exclusive,
      isNew: formData.isNew,
      description: localizedDescription,
      amenities: localizedAmenities,
      yearBuilt: Number(formData.yearBuilt),
      parkingSpaces: Number(formData.parkingSpaces),
      roiEstimate: { en: "4.8% - 6.2% Net", hi: "4.8% - 6.2% Net", mr: "4.8% - 6.2% Net" },
      reraNumber: formData.reraNumber || "MahaRERA P51900028941",
      status: formData.status,
    };

    if (editingPropertyId) {
      updateProperty(editingPropertyId, propertyPayload);
      showToast("Estate details updated successfully!");
    } else {
      addProperty(propertyPayload);
      showToast("New estate successfully added and synchronized with the live website!");
    }

    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string, newStatus: "active" | "inactive" | "sold") => {
    setStatus(id, newStatus);
    const label =
      newStatus === "active"
        ? "Active (Visible on Landing Page)"
        : newStatus === "inactive"
        ? "Inactive (Hidden from Landing Page)"
        : "Marked as Sold (Shown as SOLD)";
    showToast(`Estate status updated to: ${label}`);
  };

  const handleDelete = (id: string) => {
    deleteProperty(id);
    setDeleteConfirmId(null);
    showToast("Estate removed from the system.");
  };

  const toggleAmenity = (name: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(name);
      return {
        ...prev,
        amenities: exists ? prev.amenities.filter((a) => a !== name) : [...prev.amenities, name],
      };
    });
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-gold-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-slate-400">
            Authorizing Secure Portal...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-gold-400 selection:text-obsidian-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-obsidian-900 border border-gold-400/40 text-gold-300 shadow-gold-glow animate-fade-in text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-gold-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-obsidian-950/90 backdrop-blur-xl border-b border-gold-400/20 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="focus:outline-none rounded-lg">
              <BrandLogo size="md" />
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold-400/10 text-gold-400 border border-gold-400/30">
                Asset Ops
              </span>
              <span className="text-xs text-slate-400 font-medium">Internal Real Estate Console</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-gold-300 text-xs font-medium border border-white/10 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
            </Link>

            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Title & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight flex items-center gap-3">
              <span>Estate Portfolio Manager</span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Upload new residences, shops, or rental estates, mark listings as sold, or set properties inactive to hide them.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={resetProperties}
              className="px-3.5 py-2.5 rounded-xl bg-obsidian-900 hover:bg-obsidian-850 border border-white/10 text-slate-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Reset to default curated portfolio"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-[0.14em] shadow-gold-glow flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Estate</span>
            </button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Total Estates
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
              {stats.total}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-emerald-500/25 bg-emerald-950/15 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-medium">
                Active Listings
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300">
                {stats.active}
              </span>
              <span className="text-[11px] text-slate-400">Live on Site</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-500/25 bg-slate-900/40 flex flex-col justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Inactive (Hidden)
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-300">
                {stats.inactive}
              </span>
              <span className="text-[11px] text-slate-500">Off-Market</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-rose-500/25 bg-rose-950/15 flex flex-col justify-between">
            <span className="text-[11px] uppercase tracking-wider text-rose-400 font-medium">
              Sold Estates
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-rose-300">
                {stats.sold}
              </span>
              <span className="text-[11px] text-slate-400">Acquired</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl glass-panel-gold border border-gold-400/30 flex flex-col justify-between">
            <span className="text-[11px] uppercase tracking-wider text-gold-300 font-medium">
              Total Valuation
            </span>
            <span className="text-xl sm:text-2xl font-serif font-bold text-gold-400 mt-2 truncate">
              {formatPriceINR(stats.totalValuation)}
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search estates by title, location, city, type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:outline-none focus:border-gold-400 cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Buy">Acquire (Buy)</option>
              <option value="Rent">Lease (Rent)</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:outline-none focus:border-gold-400 cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Home">Home / Flat</option>
              <option value="Shop">Shop / Retail</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Waterfront">Waterfront</option>
              <option value="Mansion">Mansion</option>
              <option value="Commercial">Commercial</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-white focus:outline-none focus:border-gold-400 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive (Hidden)</option>
              <option value="sold">Sold Only</option>
            </select>
          </div>
        </div>

        {/* Estates Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
            <span>
              Showing <strong className="text-white">{filteredList.length}</strong> of {properties.length} Estates
            </span>
            <span className="text-gold-400/90 text-[11px]">
              Tip: Toggling status to &quot;Inactive&quot; instantly hides the estate from public visitors.
            </span>
          </div>

          {filteredList.length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center border border-white/10">
              <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white">No estates match your filters</h3>
              <p className="text-xs text-slate-400 mt-1">
                Try adjusting your search criteria or add a new luxury estate.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredList.map((item) => {
                const currentStatus = item.status || "active";
                return (
                  <div
                    key={item.id}
                    className={`glass-panel rounded-2xl overflow-hidden border transition-all flex flex-col ${
                      currentStatus === "inactive"
                        ? "border-slate-800 opacity-65 bg-obsidian-950/60"
                        : currentStatus === "sold"
                        ? "border-rose-500/30 bg-rose-950/10"
                        : "border-white/10 hover:border-gold-400/40"
                    }`}
                  >
                    {/* Top Image Preview & Badges */}
                    <div className="relative w-full h-48 overflow-hidden bg-obsidian-900">
                      <Image
                        src={item.image || "/images/hero-villa.jpg"}
                        alt={item.title?.en || "Estate"}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/40" />

                      {/* Top status & category pills */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-slate-200 border border-white/20 backdrop-blur-md">
                            {item.category === "Rent" ? "For Rent" : "For Sale"}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-400/20 text-gold-300 border border-gold-400/40 backdrop-blur-md">
                            {item.type}
                          </span>
                        </div>

                        {/* Status badge */}
                        <div>
                          {currentStatus === "active" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/90 text-obsidian-950 flex items-center gap-1 shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-obsidian-950" />
                              Active
                            </span>
                          )}
                          {currentStatus === "inactive" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-800 text-slate-300 border border-white/20 flex items-center gap-1">
                              <EyeOff className="w-3 h-3" />
                              Inactive
                            </span>
                          )}
                          {currentStatus === "sold" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-rose-600 text-white border border-rose-400 shadow-md">
                              SOLD
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price Banner */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <span className="text-xl font-serif font-bold text-white drop-shadow-md">
                          {formatPriceINR(item.price)}
                        </span>
                        <span className="text-[11px] text-slate-300 drop-shadow flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gold-400" />
                          <span>{item.city}</span>
                        </span>
                      </div>
                    </div>

                    {/* Estate Details Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif font-bold text-base text-white line-clamp-1">
                          {item.title?.en}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {item.location?.en}
                        </p>

                        {/* Quick Spec Pills */}
                        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center text-xs text-slate-300">
                          <div className="flex items-center justify-center gap-1">
                            <Bed className="w-3 h-3 text-gold-400" />
                            <span>{item.bedrooms} Beds</span>
                          </div>
                          <div className="flex items-center justify-center gap-1 border-x border-white/10">
                            <Bath className="w-3 h-3 text-gold-400" />
                            <span>{item.bathrooms} Baths</span>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <Maximize2 className="w-3 h-3 text-gold-400" />
                            <span>{item.areaSqFt?.toLocaleString()} sqft</span>
                          </div>
                        </div>
                      </div>

                      {/* Estate Controls Row */}
                      <div className="pt-3 border-t border-white/10 space-y-3">
                        {/* Status Toggle Buttons */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                            Display Status on Live Site:
                          </label>
                          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-obsidian-900 border border-white/10">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(item.id, "active")}
                              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                                currentStatus === "active"
                                  ? "bg-emerald-500 text-obsidian-950 shadow-sm"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Active</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleStatus(item.id, "inactive")}
                              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                                currentStatus === "inactive"
                                  ? "bg-slate-700 text-white shadow-sm"
                                  : "text-slate-400 hover:text-white"
                              }`}
                              title="Hide from public landing page"
                            >
                              <EyeOff className="w-3 h-3" />
                              <span>Inactive</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleStatus(item.id, "sold")}
                              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                                currentStatus === "sold"
                                  ? "bg-rose-600 text-white shadow-sm"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              <Tag className="w-3 h-3" />
                              <span>Sold</span>
                            </button>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-gold-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Details</span>
                          </button>

                          {deleteConfirmId === item.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(null)}
                                className="py-2 px-2.5 rounded-xl bg-obsidian-800 text-slate-300 hover:text-white text-xs"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="p-2 rounded-xl bg-white/5 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-colors"
                              title="Delete Estate"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Estate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Dialog */}
          <div className="relative w-full max-w-3xl my-8 glass-panel-gold rounded-3xl border border-gold-400/40 shadow-gold-glow-lg overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-950/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-white">
                    {editingPropertyId ? "Edit Estate Details" : "Upload New Estate Listing"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Enter residential, commercial shop, or lease details. Changes will update immediately on the landing page.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveProperty} className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Category & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                    Acquisition Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as "Buy" | "Rent" })}
                    className="w-full py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400"
                  >
                    <option value="Buy">Acquire (For Sale)</option>
                    <option value="Rent">Lease (For Rent)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                    Property Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400"
                  >
                    <option value="Home">Home / Flat / Apartment</option>
                    <option value="Shop">Shop / Retail Store</option>
                    <option value="Commercial">Commercial Office / Space</option>
                    <option value="Villa">Private Villa / Bungalow</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Waterfront">Sea-Facing Sanctuary</option>
                    <option value="Mansion">Palatial Estate</option>
                  </select>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                    Estate Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Imperial Worli Sea Face Sky Villa"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                    Subtitle / Architectural Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unobstructed Arabian Sea & Bandra-Worli Sea Link Vistas"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Valuation & Display Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-obsidian-950/60 border border-gold-400/20">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-300 mb-1 font-medium">
                    Valuation / Price in ₹ INR (₹10 Lakh to ₹1 Cr) *
                  </label>
                  <div className="relative flex items-center">
                    <IndianRupee className="absolute left-3 w-4 h-4 text-gold-400" />
                    <input
                      type="number"
                      required
                      min={1000000}
                      max={10000000}
                      step={50000}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-white text-base font-bold focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs font-medium">
                    <p className="text-gold-400">
                      Display: <strong>{formatPriceINR(formData.price)}</strong>
                    </p>
                    <span className="text-[11px] text-slate-400">Range: ₹10 Lakh – ₹1 Cr</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    Initial Display Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as "active" | "inactive" | "sold" })
                    }
                    className="w-full py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400"
                  >
                    <option value="active">Active (Show on Public Landing Page)</option>
                    <option value="inactive">Inactive (Hide from Landing Page)</option>
                    <option value="sold">Marked as SOLD (Show SOLD Badge)</option>
                  </select>
                  <p className="mt-1 text-[11px] text-slate-400">
                    You can toggle this status anytime with one click on the dashboard.
                  </p>
                </div>
              </div>

              {/* Location & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                    City / Destination *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi-NCR</option>
                    <option value="Goa">Goa</option>
                    <option value="Bangalore">Bengaluru</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                    Address / Neighborhood Corridor *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Worli Sea Face, South Mumbai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Numerical Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full py-2 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full py-2 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    Area (Sq Ft) *
                  </label>
                  <input
                    type="number"
                    min={100}
                    value={formData.areaSqFt}
                    onChange={(e) => setFormData({ ...formData, areaSqFt: Number(e.target.value) })}
                    className="w-full py-2 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    Parking Slots
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.parkingSpaces}
                    onChange={(e) => setFormData({ ...formData, parkingSpaces: Number(e.target.value) })}
                    className="w-full py-2 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              {/* Image Preset Picker */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium">
                  Select Estate Image Preset:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, image: preset.url, customImageUrl: "" })
                      }
                      className={`relative h-20 rounded-xl overflow-hidden border transition-all text-left group ${
                        formData.image === preset.url && !formData.customImageUrl
                          ? "border-gold-400 ring-2 ring-gold-400/50"
                          : "border-white/10 hover:border-gold-400/40"
                      }`}
                    >
                      <Image
                        src={preset.url}
                        alt={preset.label}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                      <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-bold text-white line-clamp-1">
                        {preset.label}
                      </span>
                      {formData.image === preset.url && !formData.customImageUrl && (
                        <div className="absolute top-1.5 right-1.5 p-0.5 rounded-full bg-gold-400 text-obsidian-950">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-2">
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Or Enter Custom Image URL:
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.customImageUrl}
                    onChange={(e) => setFormData({ ...formData, customImageUrl: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Amenities Chips */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                  Signature Amenities & Attributes:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AMENITY_SUGGESTIONS.map((amenity) => {
                    const isSelected = formData.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1 ${
                          isSelected
                            ? "bg-gold-400 text-obsidian-950 font-bold"
                            : "bg-obsidian-900 border border-white/10 text-slate-300 hover:border-gold-400/40"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                  Description / Private Dossier Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Architectural pedigree, ceiling height, Italian marble specifications, RERA status..."
                  className="w-full py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Badges / Highlights */}
              <div className="flex items-center gap-6 pt-2 border-t border-white/10 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.exclusive}
                    onChange={(e) => setFormData({ ...formData, exclusive: e.target.checked })}
                    className="rounded accent-gold-400"
                  />
                  <span>Exclusive Off-Market Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="rounded accent-gold-400"
                  />
                  <span>New Launch Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded accent-gold-400"
                  />
                  <span>Featured First</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-95 active:scale-95 transition-all"
                >
                  {editingPropertyId ? "Save Changes" : "Publish Estate to Site"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
