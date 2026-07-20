import Image from "next/image";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type HeroProps = {
  language: Language;
};

export function Hero({ language }: HeroProps) {
  const labels = SITE_COPY[language];

  return (
    <section className="noki-hero" aria-labelledby="noki-hero-title">
      <div className="noki-hero-glow-left" aria-hidden="true" />

      <div className="noki-hero-copy">
        <h1 className="noki-hero-title" id="noki-hero-title">
          {labels.hero.title1}
          <br />
          {labels.hero.title2} <span>{labels.hero.titleAccent}</span>.
        </h1>

        <p className="noki-hero-subtitle">{labels.hero.subtitle}</p>

        <div className="noki-hero-actions">
          <a className="noki-hero-cta-primary" href="#contact">
            {labels.nav.cta}
          </a>
          <a className="noki-hero-cta-secondary" href="#modules">
            {labels.hero.cta2}
          </a>
        </div>

        <div className="noki-hero-pills">
          {labels.hero.pills.map((pill) => (
            <div className="noki-hero-pill" key={pill}>
              <span aria-hidden="true" />
              {pill}
            </div>
          ))}
        </div>
      </div>

      <div className="noki-hero-visual">
        <div className="noki-hero-visual-glow-cyan" aria-hidden="true" />
        <div className="noki-hero-visual-glow-yellow" aria-hidden="true" />
        <Image
          className="noki-hero-dashboard"
          src="/assets/hero/hero-dashboard.png"
          alt="NOKI Service"
          width={1448}
          height={1086}
          priority
          unoptimized
        />
      </div>
    </section>
  );
}
