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
import { IdjorWidget } from "@/components/site/IdjorWidget";
import { useSiteLanguage } from "@/components/site/LanguageProvider";
import { MobileFriendlySection } from "@/components/site/MobileFriendlySection";
import { ModulesShowcase } from "@/components/site/ModulesShowcase";
import { SecurityGovernance } from "@/components/site/SecurityGovernance";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { WhyNoki } from "@/components/site/WhyNoki";

export default function Home() {
  const { language, setLanguage } = useSiteLanguage();

  return (
    <div className="site-shell" id="top">
      <Header language={language} onLanguageChange={setLanguage} />
      <main className="site-main">
        <Hero language={language} />
        <WhyNoki language={language} />
        <ModulesShowcase language={language} />
        <CycleTimeline language={language} />
        <AiAssistantPreview language={language} />
        <CourierAppPreview language={language} />
        <SecurityGovernance language={language} />
        <AfricaMarketsMap language={language} />
        <BenefitsGrid language={language} />
        <TestimonialsSection language={language} />
        <FaqSection language={language} />
        <MobileFriendlySection language={language} />
        <FinalCta language={language} />
      </main>
      <Footer language={language} />
      <IdjorWidget language={language} key={language} />
    </div>
  );
}
