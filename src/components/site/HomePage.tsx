"use client";

import { AUDIENCE_COPY } from "@/components/site/audienceContent";
import { AudienceEntries } from "@/components/site/AudienceEntries";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { useSiteLanguage } from "@/components/site/LanguageProvider";
import { SuperAppHero } from "@/components/site/SuperAppHero";
import { UsagesSection } from "@/components/site/UsagesSection";
import { localizedPath } from "@/lib/seo/i18n";

type HomePageProps = {
  superAppUrl: string | null;
};

export function HomePage({ superAppUrl }: HomePageProps) {
  const { language, setLanguage } = useSiteLanguage();
  const labels = AUDIENCE_COPY[language].superApp;

  const links = [
    { key: "usages", label: labels.usagesKicker, href: "#usages" },
    { key: "professional", label: labels.entryPro.title, href: localizedPath(language, "/professionnel") },
    { key: "drivers", label: labels.entryDriver.title, href: localizedPath(language, "/chauffeurs") },
    { key: "contact", label: AUDIENCE_COPY[language].app.kicker, href: localizedPath(language, "/contact") },
  ];

  const primaryCta = superAppUrl
    ? { label: labels.ctaOpen, href: superAppUrl }
    : { label: labels.ctaNotify, href: localizedPath(language, "/app") };

  return (
    <div className="site-shell" id="top">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        brandHref={localizedPath(language)}
        links={links}
        primaryCta={primaryCta}
      />
      <main className="site-main">
        <SuperAppHero language={language} superAppUrl={superAppUrl} />
        <UsagesSection language={language} />
        <AudienceEntries language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}
