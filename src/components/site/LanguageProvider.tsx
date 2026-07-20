"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import { LOCALE_DIRECTIONS, switchLocaleInPathname } from "@/lib/seo/i18n";

import type { Language } from "./content";

type LanguageContextValue = {
  language: Language;
  direction: "ltr" | "rtl";
  setLanguage: (language: Language) => void;
};

const STORAGE_KEY = "noki-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage: Language }) {
  const router = useRouter();
  const pathname = usePathname();
  const language = initialLanguage;
  const direction = LOCALE_DIRECTIONS[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.documentElement.dataset.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [direction, language]);

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      const nextPathname = switchLocaleInPathname(pathname || `/${language}`, nextLanguage);
      const search = window.location.search;
      const hash = window.location.hash;

      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
      router.push(`${nextPathname}${search}${hash}`);
    },
    [language, pathname, router],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      direction,
      setLanguage,
    }),
    [direction, language, setLanguage],
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
