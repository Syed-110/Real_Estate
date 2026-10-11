"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { PROPERTIES, Property } from "@/data/properties";

interface PropertyContextType {
  properties: Property[];
  publicProperties: Property[];
  addProperty: (newProp: Omit<Property, "id"> & { id?: string }) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  setStatus: (id: string, status: "active" | "inactive" | "sold") => void;
  resetProperties: () => void;
  formatPriceINR: (amount: number) => string;
}

const STORAGE_KEY = "aayat_estate_properties_v2";

export function formatPriceINR(val: number): string {
  if (val >= 10000000) {
    const cr = val / 10000000;
    const formatted = cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2);
    return `₹${formatted} Cr`;
  } else if (val >= 100000) {
    const lk = val / 100000;
    const formatted = lk % 1 === 0 ? lk.toFixed(0) : lk.toFixed(2);
    return `₹${formatted} Lakh`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProperties(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load saved properties:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever properties change (after initial load)
  const saveProperties = useCallback((newList: Property[]) => {
    setProperties(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      // Dispatch custom event to sync other tabs or components
      window.dispatchEvent(new Event("aayat_properties_updated"));
    } catch (e) {
      console.error("Failed to save properties to localStorage:", e);
    }
  }, []);

  // Listen to custom updates across tabs
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setProperties(parsed);
          }
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener("aayat_properties_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("aayat_properties_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const addProperty = useCallback(
    (newProp: Omit<Property, "id"> & { id?: string }): Property => {
      const generatedId = newProp.id || `prop-${Date.now()}`;
      const propertyToAdd: Property = {
        ...newProp,
        id: generatedId,
        status: newProp.status || "active",
        formattedPrice: newProp.formattedPrice || formatPriceINR(newProp.price),
      };

      const updated = [propertyToAdd, ...properties];
      saveProperties(updated);
      return propertyToAdd;
    },
    [properties, saveProperties]
  );

  const updateProperty = useCallback(
    (id: string, updates: Partial<Property>) => {
      const updated = properties.map((p) => {
        if (p.id === id) {
          const newPrice = updates.price !== undefined ? updates.price : p.price;
          return {
            ...p,
            ...updates,
            formattedPrice:
              updates.formattedPrice ||
              (updates.price !== undefined ? formatPriceINR(newPrice) : p.formattedPrice),
          };
        }
        return p;
      });
      saveProperties(updated);
    },
    [properties, saveProperties]
  );

  const deleteProperty = useCallback(
    (id: string) => {
      const updated = properties.filter((p) => p.id !== id);
      saveProperties(updated);
    },
    [properties, saveProperties]
  );

  const setStatus = useCallback(
    (id: string, status: "active" | "inactive" | "sold") => {
      const updated = properties.map((p) => (p.id === id ? { ...p, status } : p));
      saveProperties(updated);
    },
    [properties, saveProperties]
  );

  const resetProperties = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProperties(PROPERTIES);
    window.dispatchEvent(new Event("aayat_properties_updated"));
  }, []);

  // Filter out inactive properties for the public landing page
  const publicProperties = properties.filter((p) => p.status !== "inactive");

  return (
    <PropertyContext.Provider
      value={{
        properties,
        publicProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        setStatus,
        resetProperties,
        formatPriceINR,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
}
