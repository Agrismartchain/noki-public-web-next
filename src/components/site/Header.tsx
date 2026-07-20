"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { homeSectionHref, localizedPath } from "@/lib/seo/i18n";

import type { Language } from "./content";
import { LANGUAGES, SITE_COPY } from "./content";

const NAV_ITEMS = [
  ["home", "top"],
  ["services", "modules"],
  ["how", "cycle"],
  ["tools", "ia"],
  ["about", "securite"],
] as const;

const ARIA_COPY = {
  fr: {
    desktop: "Navigation principale",
    mobile: "Navigation mobile",
    menu: "Ouvrir le menu",
  },
  en: {
    desktop: "Primary navigation",
    mobile: "Mobile navigation",
    menu: "Open menu",
  },
  ar: {
    desktop: "التنقل الرئيسي",
    mobile: "تنقل الهاتف",
    menu: "فتح القائمة",
  },
} as const satisfies Record<Language, Record<string, string>>;

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname() || localizedPath(language);
  const labels = SITE_COPY[language].nav;
  const aria = ARIA_COPY[language];
  const direction = language === "ar" ? "rtl" : "ltr";
  const contactHref = localizedPath(language, "/contact");
  const loginHref = localizedPath(language, "/login");
  const registerHref = localizedPath(language, "/register");

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

      <nav className="noki-desktop-nav" aria-label={aria.desktop}>
        {NAV_ITEMS.map(([key, id]) => (
          <a className="noki-navlink" href={homeSectionHref(language, id, pathname)} key={key}>
            {labels[key]}
          </a>
        ))}
        <a className="noki-navlink" href={contactHref}>
          {labels.contact}
        </a>
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

        <a className="noki-header-login" href={loginHref}>
          {labels.login}
        </a>

        <a className="noki-header-cta" href={registerHref}>
          {labels.cta}
        </a>

        <button
          className="noki-menu-btn"
          type="button"
          aria-label={aria.menu}
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
        <nav className="noki-mobile-menu" id="noki-mobile-menu" aria-label={aria.mobile}>
          {NAV_ITEMS.map(([key, id]) => (
            <a className="noki-navlink" href={homeSectionHref(language, id, pathname)} key={key} onClick={() => setNavOpen(false)}>
              {labels[key]}
            </a>
          ))}
          <a className="noki-navlink" href={contactHref} onClick={() => setNavOpen(false)}>
            {labels.contact}
          </a>
          <a className="noki-navlink" href={loginHref} onClick={() => setNavOpen(false)}>
            {labels.login}
          </a>
          <a className="noki-navlink noki-mobile-register-link" href={registerHref} onClick={() => setNavOpen(false)}>
            {labels.cta}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
