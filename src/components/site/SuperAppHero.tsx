import { localizedPath } from "@/lib/seo/i18n";

import { AUDIENCE_COPY } from "./audienceContent";
import type { Language } from "./content";

type SuperAppHeroProps = {
  language: Language;
  superAppUrl: string | null;
};

export function SuperAppHero({ language, superAppUrl }: SuperAppHeroProps) {
  const labels = AUDIENCE_COPY[language].superApp;
  const common = AUDIENCE_COPY[language].common;

  return (
    <section className="noki-superhero" aria-labelledby="noki-superhero-title">
      <div className="noki-hero-glow-left" aria-hidden="true" />

      <div className="noki-superhero-copy">
        <span className="noki-superhero-badge">{common.locationBadge}</span>

        <h1 className="noki-superhero-title" id="noki-superhero-title">
          {labels.title1}
          <br />
          <span>{labels.titleAccent}</span>
        </h1>

        <p className="noki-superhero-subtitle">{labels.subtitle}</p>

        <div className="noki-superhero-actions">
          {superAppUrl ? (
            <a className="noki-hero-cta-primary" href={superAppUrl} target="_blank" rel="noopener noreferrer">
              {labels.ctaOpen}
            </a>
          ) : (
            <a className="noki-hero-cta-primary" href={localizedPath(language, "/app")}>
              {labels.ctaNotify}
            </a>
          )}
          <a className="noki-hero-cta-secondary" href="#usages">
            {labels.usagesKicker}
          </a>
        </div>
      </div>
    </section>
  );
}
