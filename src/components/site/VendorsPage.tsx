"use client";

import { AUDIENCE_COPY } from "@/components/site/audienceContent";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useSiteLanguage } from "@/components/site/LanguageProvider";
import { SITE_COPY } from "@/components/site/content";
import { localizedPath } from "@/lib/seo/i18n";

export function VendorsPage() {
  const { language, setLanguage, direction } = useSiteLanguage();
  const labels = AUDIENCE_COPY[language].vendors;
  const nav = SITE_COPY[language].nav;

  const links = [
    { key: "professional", label: AUDIENCE_COPY[language].common.backToProfessional, href: localizedPath(language, "/professionnel") },
    { key: "contact", label: nav.contact, href: localizedPath(language, "/contact") },
  ];

  const registerBase = localizedPath(language, "/register");

  return (
    <div className="site-shell" id="top">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        brandHref={localizedPath(language)}
        links={links}
        primaryCta={{ label: nav.login, href: localizedPath(language, "/login") }}
      />
      <main className="site-main">
        <section className="noki-hub" aria-labelledby="noki-vendors-title" dir={direction}>
          <h6>{labels.kicker}</h6>
          <h1 id="noki-vendors-title">{labels.title}</h1>
          <p>{labels.body}</p>

          <div className="noki-hub-grid noki-hub-grid-2">
            <a className="noki-hub-card" href={`${registerBase}?goal=marketplace&audience=vendor_marketplace`}>
              <h3>{labels.marketplace.title}</h3>
              <p>{labels.marketplace.desc}</p>
              <span>{labels.marketplace.cta} →</span>
            </a>
            <a className="noki-hub-card" href={`${registerBase}?goal=logistics&audience=vendor_cod`}>
              <h3>{labels.logistics.title}</h3>
              <p>{labels.logistics.desc}</p>
              <span>{labels.logistics.cta} →</span>
            </a>
          </div>
        </section>
      </main>
      <Footer language={language} />
    </div>
  );
}
