"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Language = "fr" | "en" | "ar";

const NAV_LABELS: Record<
  Language,
  {
    home: string;
    services: string;
    how: string;
    tools: string;
    about: string;
    contact: string;
    cta: string;
  }
> = {
  fr: {
    home: "Accueil",
    services: "Services",
    how: "Comment ça marche",
    tools: "Outils",
    about: "À propos",
    contact: "Contact",
    cta: "S'inscrire maintenant",
  },
  en: {
    home: "Home",
    services: "Services",
    how: "How it works",
    tools: "Tools",
    about: "About",
    contact: "Contact",
    cta: "Sign up now",
  },
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    how: "كيف يعمل",
    tools: "الأدوات",
    about: "من نحن",
    contact: "اتصل بنا",
    cta: "سجّل الآن",
  },
};

const NAV_ITEMS = [
  ["home", "#top"],
  ["services", "#modules"],
  ["how", "#cycle"],
  ["tools", "#ia"],
  ["about", "#securite"],
  ["contact", "#contact"],
] as const;

const LANGUAGES = ["fr", "en", "ar"] as const;

export function Header() {
  const [language, setLanguage] = useState<Language>("fr");
  const [navOpen, setNavOpen] = useState(false);
  const labels = NAV_LABELS[language];
  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.documentElement.dataset.lang = language;

    return () => {
      document.documentElement.lang = "fr";
      document.documentElement.dir = "ltr";
      document.documentElement.dataset.lang = "fr";
    };
  }, [direction, language]);

  useEffect(() => {
    if (!navOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNavOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [navOpen]);

  return (
    <header className="noki-site-header" dir={direction}>
      <div className="noki-header-brand">
        <div className="noki-header-logo">
          <Image
            src="/assets/brand/noki-logo-yellow.png"
            alt="NOKI Service"
            width={42}
            height={42}
            priority
            unoptimized
          />
        </div>
      </div>

      <nav className="noki-desktop-nav" aria-label="Navigation principale">
        {NAV_ITEMS.map(([key, href]) => (
          <a className="noki-navlink" href={href} key={key}>
            {labels[key]}
          </a>
        ))}
      </nav>

      <div className="noki-header-actions">
        <div className="noki-lang-switch" data-lang-switch="">
          {LANGUAGES.map((lang) => (
            <button
              className="noki-lang-btn"
              data-active={language === lang}
              type="button"
              key={lang}
              onClick={() => setLanguage(lang)}
              aria-pressed={language === lang}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <a className="noki-header-cta" href="#contact">
          {labels.cta}
        </a>

        <button
          className="noki-menu-btn"
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={navOpen}
          aria-controls="noki-mobile-menu"
          onClick={() => setNavOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {navOpen ? (
        <nav className="noki-mobile-menu" id="noki-mobile-menu" aria-label="Navigation mobile">
          {NAV_ITEMS.map(([key, href]) => (
            <a className="noki-navlink" href={href} key={key} onClick={() => setNavOpen(false)}>
              {labels[key]}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
