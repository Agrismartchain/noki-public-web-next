"use client";

import { AUDIENCE_COPY } from "@/components/site/audienceContent";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useSiteLanguage } from "@/components/site/LanguageProvider";
import { SITE_COPY } from "@/components/site/content";
import { localizedPath } from "@/lib/seo/i18n";

export function ProfessionalHub() {
  const { language, setLanguage, direction } = useSiteLanguage();
  const labels = AUDIENCE_COPY[language].professionalHub;
  const nav = SITE_COPY[language].nav;

  const links = [
    { key: "home", label: nav.home, href: localizedPath(language) },
    { key: "contact", label: nav.contact, href: localizedPath(language, "/contact") },
  ];

  const cards = [
    { key: "cod", ...labels.cards.cod, href: localizedPath(language, "/professionnel/cod") },
    { key: "restaurants", ...labels.cards.restaurants, href: localizedPath(language, "/professionnel/restaurants") },
    { key: "supermarkets", ...labels.cards.supermarkets, href: localizedPath(language, "/professionnel/supermarches") },
    { key: "pharmacies", ...labels.cards.pharmacies, href: localizedPath(language, "/professionnel/pharmacies") },
    { key: "vendors", ...labels.cards.vendors, href: localizedPath(language, "/professionnel/vendeurs") },
  ];

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
        <section className="noki-hub" aria-labelledby="noki-hub-title" dir={direction}>
          <h6>{labels.kicker}</h6>
          <h1 id="noki-hub-title">{labels.title}</h1>
          <p>{labels.body}</p>

          <div className="noki-hub-grid">
            {cards.map((card) => (
              <a className="noki-hub-card" href={card.href} key={card.key}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span>{card.cta} →</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer language={language} />
    </div>
  );
}
