"use client";

import { useState } from "react";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
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
      </main>
    </div>
  );
}
