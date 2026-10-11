"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { PROPERTIES, Property } from "@/data/properties";

interface PropertyContextType {
  properties: Property[];
  publicProperties: Property[];
  isLoading: boolean;
  addProperty: (newProp: Omit<Property, "id"> & { id?: string }) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  setStatus: (id: string, status: "active" | "inactive" | "sold") => void;
  resetProperties: () => void;
  refreshProperties: () => Promise<void>;
  formatPriceINR: (amount: number) => string;
}

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch properties from server DB API on mount
  const fetchFromDb = useCallback(async () => {
    try {
      const res = await fetch("/api/properties", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProperties(json.data);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch properties from server DB API, using defaults:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFromDb();
  }, [fetchFromDb]);

  // Add new property: Optimistic UI update + server DB API POST
  const addProperty = useCallback(
    (newProp: Omit<Property, "id"> & { id?: string }): Property => {
      const generatedId = newProp.id || `prop-${Date.now()}`;
      const propertyToAdd: Property = {
        ...newProp,
        id: generatedId,
        status: newProp.status || "active",
        formattedPrice: newProp.formattedPrice || formatPriceINR(newProp.price),
      };

      // Optimistic state update
      setProperties((prev) => [propertyToAdd, ...prev.filter((p) => p.id !== generatedId)]);

      // Save to server Database via API
      fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyToAdd),
      }).catch((err) => {
        console.error("Failed to persist property in database API:", err);
      });

      return propertyToAdd;
    },
    []
  );

  // Update property: Optimistic UI update + server DB API PATCH
  const updateProperty = useCallback(
    (id: string, updates: Partial<Property>) => {
      setProperties((prev) =>
        prev.map((p) => {
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
        })
      );

      // Save to server Database via API
      fetch("/api/properties", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      }).catch((err) => {
        console.error("Failed to update property in database API:", err);
      });
    },
    []
  );

  // Delete property: Optimistic UI update + server DB API DELETE
  const deleteProperty = useCallback((id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));

    fetch(`/api/properties?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }).catch((err) => {
      console.error("Failed to delete property in database API:", err);
    });
  }, []);

  // Set status: Optimistic UI update + server DB API PATCH
  const setStatus = useCallback((id: string, status: "active" | "inactive" | "sold") => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));

    fetch("/api/properties", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).catch((err) => {
      console.error("Failed to update status in database API:", err);
    });
  }, []);

  // Reset properties back to curated defaults in DB
  const resetProperties = useCallback(async () => {
    setProperties(PROPERTIES);
    try {
      await fetch("/api/properties/reset", { method: "POST" });
    } catch (err) {
      console.error("Failed to reset properties in database API:", err);
    }
  }, []);

  // Filter out inactive properties for public visitors
  const publicProperties = properties.filter((p) => p.status !== "inactive");

  return (
    <PropertyContext.Provider
      value={{
        properties,
        publicProperties,
        isLoading,
        addProperty,
        updateProperty,
        deleteProperty,
        setStatus,
        resetProperties,
        refreshProperties: fetchFromDb,
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
