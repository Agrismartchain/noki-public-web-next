"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { Language } from "./content";

type LanguageContextValue = {
  language: Language;
  direction: "ltr" | "rtl";
  setLanguage: (language: Language) => void;
};

const STORAGE_KEY = "noki-site-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "fr" || value === "en" || value === "ar";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");
  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
      if (isLanguage(storedLanguage)) {
        setLanguageState(storedLanguage);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.documentElement.dataset.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [direction, language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      direction,
      setLanguage: setLanguageState,
    }),
    [direction, language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useSiteLanguage must be used inside LanguageProvider");
  }

  return context;
}
