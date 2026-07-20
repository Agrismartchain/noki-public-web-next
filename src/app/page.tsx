"use client";

import { useState } from "react";

import { AiAssistantPreview } from "@/components/site/AiAssistantPreview";
import { AfricaMarketsMap } from "@/components/site/AfricaMarketsMap";
import { CourierAppPreview } from "@/components/site/CourierAppPreview";
import { CycleTimeline } from "@/components/site/CycleTimeline";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ModulesShowcase } from "@/components/site/ModulesShowcase";
import { SecurityGovernance } from "@/components/site/SecurityGovernance";
import { WhyNoki } from "@/components/site/WhyNoki";
import type { Language } from "@/components/site/content";

export default function Home() {
  const [language, setLanguage] = useState<Language>("fr");

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
      </main>
    </div>
  );
}
