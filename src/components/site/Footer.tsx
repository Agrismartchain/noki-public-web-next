"use client";

import Image from "next/image";

import { localizedPath } from "@/lib/seo/i18n";

import { AUDIENCE_COPY } from "./audienceContent";
import type { Language } from "./content";
import { SITE_COPY } from "./content";

type FooterProps = {
  language: Language;
};

// Shared across every page (consumer home, professional space, driver
// candidacy, conversion forms), so the links here must stay valid from any
// of those contexts rather than assuming the current page is home or /professionnel/cod.
export function Footer({ language }: FooterProps) {
  const labels = AUDIENCE_COPY[language].footer;
  const siteLabels = SITE_COPY[language].footer;
  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <footer className="noki-footer" dir={direction}>
      <div className="noki-footer-main">
        <div className="noki-footer-brand">
          <div className="noki-footer-brand-head">
            <div className="noki-footer-logo">
              <Image src="/assets/brand/noki-logo-yellow.png" alt="NOKI" width={36} height={36} />
            </div>
            <div className="noki-footer-wordmark">
              <span>NOKI</span> <span>SERVICE</span>
            </div>
          </div>
          <p>{labels.tagline}</p>
        </div>

        <div className="noki-footer-columns">
          <div>
            <div className="noki-footer-column-title">{labels.colApp}</div>
            <div className="noki-footer-links">
              <a href={localizedPath(language)}>{labels.linkHome}</a>
              <a href={localizedPath(language, "/app")}>{labels.linkOpenApp}</a>
            </div>
          </div>

          <div>
            <div className="noki-footer-column-title">{labels.colPro}</div>
            <div className="noki-footer-links">
              <a href={localizedPath(language, "/professionnel")}>{labels.linkProfessional}</a>
              <a href={localizedPath(language, "/professionnel/cod")}>{labels.linkCod}</a>
              <a href={localizedPath(language, "/professionnel/restaurants")}>{labels.linkRestaurants}</a>
              <a href={localizedPath(language, "/professionnel/vendeurs")}>{labels.linkVendors}</a>
            </div>
          </div>

          <div>
            <div className="noki-footer-column-title">{labels.colDrivers}</div>
            <div className="noki-footer-links">
              <a href={localizedPath(language, "/chauffeurs")}>{labels.linkDrivers}</a>
            </div>
          </div>

          <div>
            <div className="noki-footer-column-title">{labels.colContact}</div>
            <div className="noki-footer-links">
              <a href={localizedPath(language, "/contact")}>{labels.linkContact}</a>
              <a href={localizedPath(language, "/login")}>{labels.linkLogin}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="noki-footer-bottom">
        <span>{siteLabels.copyright}</span>
        <span>{labels.designed}</span>
      </div>
    </footer>
  );
}
