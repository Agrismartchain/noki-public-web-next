"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { homeSectionHref, localizedPath } from "@/lib/seo/i18n";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type FooterProps = {
  language: Language;
};

export function Footer({ language }: FooterProps) {
  const pathname = usePathname() || localizedPath(language);
  const labels = SITE_COPY[language].footer;
  const direction = language === "ar" ? "rtl" : "ltr";
  const sectionHref = (id: string) => homeSectionHref(language, id, pathname);

  return (
    <footer className="noki-footer" dir={direction}>
      <div className="noki-footer-main">
        <div className="noki-footer-brand">
          <div className="noki-footer-brand-head">
            <div className="noki-footer-logo">
              <Image src="/assets/brand/noki-logo-yellow.png" alt="NOKI Service" width={36} height={36} />
            </div>
            <div className="noki-footer-wordmark">
              <span>NOKI</span> <span>SERVICE</span>
            </div>
          </div>
          <p>{labels.tagline}</p>
        </div>

        <div className="noki-footer-columns">
          <div>
            <div className="noki-footer-column-title">{labels.colPlatform}</div>
            <div className="noki-footer-links">
              <a href={sectionHref("modules")}>{labels.linkModules}</a>
              <a href={sectionHref("cycle")}>{labels.linkCycle}</a>
              <a href={sectionHref("ia")}>{labels.linkIA}</a>
            </div>
          </div>

          <div>
            <div className="noki-footer-column-title">{labels.colTrust}</div>
            <div className="noki-footer-links">
              <a href={sectionHref("securite")}>{labels.linkSecurity}</a>
              <a href={sectionHref("marches")}>{labels.linkMarkets}</a>
            </div>
          </div>

          <div>
            <div className="noki-footer-column-title">{labels.colContact}</div>
            <div className="noki-footer-links">
              <a href={localizedPath(language, "/contact")}>{labels.linkContact}</a>
              <a href={localizedPath(language, "/register")}>{labels.linkSignup}</a>
              <a href={localizedPath(language, "/login")}>{labels.linkLogin}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="noki-footer-bottom">
        <span>{labels.copyright}</span>
        <span>{labels.designed}</span>
      </div>
    </footer>
  );
}
