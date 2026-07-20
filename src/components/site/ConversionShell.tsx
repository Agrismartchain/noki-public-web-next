"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { LANGUAGES, SITE_COPY } from "./content";
import { CONVERSION_COPY } from "./conversionContent";
import { Footer } from "./Footer";
import { useSiteLanguage } from "./LanguageProvider";

type ConversionShellProps = {
  mode: "contact" | "register";
  kicker?: string;
  title: string;
  body: string;
  benefits?: string[];
  aside?: ReactNode;
  children: ReactNode;
};

export function ConversionShell({ mode, kicker, title, body, benefits, aside, children }: ConversionShellProps) {
  const { language, direction, setLanguage } = useSiteLanguage();
  const common = CONVERSION_COPY[language].common;
  const nav = SITE_COPY[language].nav;

  return (
    <div className="noki-conversion-page" data-mode={mode} dir={direction}>
      <header className="noki-conversion-topbar">
        <Link className="noki-conversion-brand" href="/" aria-label="NOKI Service">
          <Image src="/assets/brand/noki-logo-yellow.png" alt="" width={38} height={38} priority unoptimized />
          <span>
            <strong>NOKI</strong> SERVICE
          </span>
        </Link>

        <div className="noki-conversion-topbar-actions">
          <Link href="/#modules">{nav.services}</Link>
          <Link href="/">{common.backHome}</Link>
          <div className="noki-lang-switch" data-lang-switch="" aria-label={common.language}>
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
        </div>
      </header>

      <main className="noki-conversion-main">
        <section className="noki-conversion-shell" aria-labelledby={`noki-${mode}-title`}>
          <aside className="noki-conversion-side">
            <div className="noki-conversion-side-glow" aria-hidden="true" />
            <div className="noki-conversion-side-logo">
              <Image src="/assets/brand/noki-logo-yellow.png" alt="NOKI Service" width={82} height={82} priority unoptimized />
            </div>
            {kicker ? <p className="noki-conversion-kicker">{kicker}</p> : null}
            <h1 id={`noki-${mode}-title`}>{title}</h1>
            <p>{body}</p>
            {benefits?.length ? (
              <ul className="noki-conversion-benefits">
                {benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            ) : null}
            <div className="noki-conversion-note">
              <span>{common.countries}</span>
              <span>{common.response}</span>
            </div>
            {aside}
          </aside>

          <div className="noki-conversion-content">{children}</div>
        </section>
      </main>

      <Footer language={language} homeHrefPrefix="/" />
    </div>
  );
}
