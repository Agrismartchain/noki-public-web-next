"use client";

import { AiAssistantPreview } from "@/components/site/AiAssistantPreview";
import { AfricaMarketsMap } from "@/components/site/AfricaMarketsMap";
import { BenefitsGrid } from "@/components/site/BenefitsGrid";
import { CourierAppPreview } from "@/components/site/CourierAppPreview";
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
import { WhyNoki } from "@/components/site/WhyNoki";

export function HomePage() {
  const { language, setLanguage } = useSiteLanguage();

  return (
    <div className="site-shell" id="top">
      <Header language={language} onLanguageChange={setLanguage} />
      <main className="site-main">
        <Hero language={language} />
        <WhyNoki language={language} />
        <ModulesShowcase language={language} />
        <IntegrationsSection language={language} />
        <CycleTimeline language={language} />
        <AiAssistantPreview language={language} />
        <CourierAppPreview language={language} />
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
