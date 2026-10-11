"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminUser {
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = "aayat_admin_auth_session";

// Default admin credentials
export const DEFAULT_ADMIN_EMAIL = "admin@aayatrealestate.in";
export const DEFAULT_ADMIN_PASS = "admin";

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed.authenticated && parsed.user) {
          setIsAuthenticated(true);
          setUser(parsed.user);
        }
      }
    } catch (e) {
      console.warn("Auth parse failed:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Check against default credentials or simple admin pass
    const isValid =
      (cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() && cleanPass === DEFAULT_ADMIN_PASS) ||
      (cleanEmail === "admin" && cleanPass === "admin") ||
      (cleanPass === "admin" || cleanPass === "aayat2026");

    if (isValid) {
      const adminData: AdminUser = {
        email: cleanEmail.includes("@") ? cleanEmail : DEFAULT_ADMIN_EMAIL,
        name: "Aayat Executive Admin",
        role: "Managing Director",
      };
      setIsAuthenticated(true);
      setUser(adminData);
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ authenticated: true, user: adminData, timestamp: Date.now() })
      );
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
