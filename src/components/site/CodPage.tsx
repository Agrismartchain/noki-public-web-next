"use client";

import { AiAssistantPreview } from "@/components/site/AiAssistantPreview";
import { AfricaMarketsMap } from "@/components/site/AfricaMarketsMap";
import { AUDIENCE_COPY } from "@/components/site/audienceContent";
import { BenefitsGrid } from "@/components/site/BenefitsGrid";
import { CycleTimeline } from "@/components/site/CycleTimeline";
import { FaqSection } from "@/components/site/FaqSection";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { IntegrationsSection } from "@/components/site/IntegrationsSection";
import { useSiteLanguage } from "@/components/site/LanguageProvider";
import { MobileFriendlySection } from "@/components/site/MobileFriendlySection";
import { ModulesShowcase } from "@/components/site/ModulesShowcase";
import { SecurityGovernance } from "@/components/site/SecurityGovernance";
import { SITE_COPY } from "@/components/site/content";
import { WhyNoki } from "@/components/site/WhyNoki";
import { codSectionHref, localizedPath } from "@/lib/seo/i18n";

// The COD/merchant operations platform pitch, formerly the public home page.
// Reuses the same section components and copy (SITE_COPY), now reached from
// the professional space rather than from the consumer Super App home.
export function CodPage() {
  const { language, setLanguage } = useSiteLanguage();
  const nav = SITE_COPY[language].nav;
  const common = AUDIENCE_COPY[language].common;

  const links = [
    { key: "home", label: nav.home, href: codSectionHref(language, "top") },
    { key: "services", label: nav.services, href: codSectionHref(language, "modules") },
    { key: "how", label: nav.how, href: codSectionHref(language, "cycle") },
    { key: "tools", label: nav.tools, href: codSectionHref(language, "ia") },
    { key: "about", label: nav.about, href: codSectionHref(language, "securite") },
    { key: "contact", label: nav.contact, href: localizedPath(language, "/contact") },
  ];

  return (
    <div className="site-shell" id="top">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        brandHref={localizedPath(language, "/professionnel/cod")}
        links={links}
        primaryCta={{ label: nav.cta, href: localizedPath(language, "/register") }}
        secondaryCta={{ label: nav.login, href: localizedPath(language, "/login") }}
      />
      <main className="site-main">
        <div className="noki-cod-back">
          <a href={localizedPath(language, "/professionnel")}>← {common.backToProfessional}</a>
        </div>
        <Hero language={language} />
        <WhyNoki language={language} />
        <ModulesShowcase language={language} />
        <IntegrationsSection language={language} />
        <CycleTimeline language={language} />
        <AiAssistantPreview language={language} />
        <SecurityGovernance language={language} />
        <AfricaMarketsMap language={language} />
        <BenefitsGrid language={language} />
        <FaqSection language={language} />
        <MobileFriendlySection language={language} />
        <FinalCta language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}
