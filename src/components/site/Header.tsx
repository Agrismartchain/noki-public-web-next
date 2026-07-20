"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { Language } from "./content";
import { LANGUAGES, SITE_COPY } from "./content";

const NAV_ITEMS = [
  ["home", "#top"],
  ["services", "#modules"],
  ["how", "#cycle"],
  ["tools", "#ia"],
  ["about", "#securite"],
  ["contact", "/contact"],
] as const;

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [navOpen, setNavOpen] = useState(false);
  const labels = SITE_COPY[language].nav;
  const direction = language === "ar" ? "rtl" : "ltr";

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
              onClick={() => onLanguageChange(lang)}
              aria-pressed={language === lang}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <a className="noki-header-login" href="/login">
          {labels.login}
        </a>

        <a className="noki-header-cta" href="/register">
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
          <a className="noki-navlink" href="/login" onClick={() => setNavOpen(false)}>
            {labels.login}
          </a>
          <a className="noki-navlink noki-mobile-register-link" href="/register" onClick={() => setNavOpen(false)}>
            {labels.cta}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
