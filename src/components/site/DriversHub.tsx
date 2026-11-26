"use client";

import { AUDIENCE_COPY } from "@/components/site/audienceContent";
import { CourierAppPreview } from "@/components/site/CourierAppPreview";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useSiteLanguage } from "@/components/site/LanguageProvider";
import { SITE_COPY } from "@/components/site/content";
import { localizedPath } from "@/lib/seo/i18n";

export function DriversHub() {
  const { language, setLanguage, direction } = useSiteLanguage();
  const labels = AUDIENCE_COPY[language].driversHub;
  const nav = SITE_COPY[language].nav;

  const links = [
    { key: "home", label: nav.home, href: localizedPath(language) },
    { key: "contact", label: nav.contact, href: localizedPath(language, "/contact") },
  ];

  return (
    <div className="site-shell" id="top">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        brandHref={localizedPath(language)}
        links={links}
        primaryCta={{ label: labels.taxiCard.cta, href: localizedPath(language, "/chauffeurs/taxi") }}
      />
      <main className="site-main">
        <section className="noki-hub" aria-labelledby="noki-drivers-title" dir={direction}>
          <h6>{labels.kicker}</h6>
          <h1 id="noki-drivers-title">{labels.title}</h1>
          <p>{labels.body}</p>

          <div className="noki-hub-grid noki-hub-grid-2">
            <a className="noki-hub-card" href={localizedPath(language, "/chauffeurs/taxi")}>
              <h3>{labels.taxiCard.title}</h3>
              <p>{labels.taxiCard.desc}</p>
              <span>{labels.taxiCard.cta} →</span>
            </a>
            <a className="noki-hub-card" href={localizedPath(language, "/chauffeurs/livreur")}>
              <h3>{labels.courierCard.title}</h3>
              <p>{labels.courierCard.desc}</p>
              <span>{labels.courierCard.cta} →</span>
            </a>
          </div>
        </section>

        <CourierAppPreview language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}
