"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { Language } from "./content";
import { LANGUAGES } from "./content";

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

export type HeaderLink = { key: string; label: string; href: string };
export type HeaderCta = { label: string; href: string };

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  brandHref: string;
  links: HeaderLink[];
  primaryCta: HeaderCta;
  secondaryCta?: HeaderCta;
};

// Generic site header: each page supplies its own nav links and CTAs, since
// "home" (consumer Super App) and "/professionnel/cod" (COD platform) point
// to different destinations for the same visual chrome.
export function Header({ language, onLanguageChange, brandHref, links, primaryCta, secondaryCta }: HeaderProps) {
  const [navOpen, setNavOpen] = useState(false);
  const aria = ARIA_COPY[language];
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
        <a className="noki-header-brand-link" href={brandHref} aria-label="NOKI">
          <div className="noki-header-logo">
            <Image
              src="/assets/brand/noki-logo-yellow.png"
              alt="NOKI"
              width={42}
              height={42}
              priority
              unoptimized
            />
          </div>
        </a>
      </div>

      <nav className="noki-desktop-nav" aria-label={aria.desktop}>
        {links.map((link) => (
          <a className="noki-navlink" href={link.href} key={link.key}>
            {link.label}
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

        {secondaryCta ? (
          <a className="noki-header-login" href={secondaryCta.href}>
            {secondaryCta.label}
          </a>
        ) : null}

        <a className="noki-header-cta" href={primaryCta.href}>
          {primaryCta.label}
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
          {links.map((link) => (
            <a className="noki-navlink" href={link.href} key={link.key} onClick={() => setNavOpen(false)}>
              {link.label}
            </a>
          ))}
          {secondaryCta ? (
            <a className="noki-navlink" href={secondaryCta.href} onClick={() => setNavOpen(false)}>
              {secondaryCta.label}
            </a>
          ) : null}
          <a className="noki-navlink noki-mobile-register-link" href={primaryCta.href} onClick={() => setNavOpen(false)}>
            {primaryCta.label}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
