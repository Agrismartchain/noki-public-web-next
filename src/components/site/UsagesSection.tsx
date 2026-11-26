import { AUDIENCE_COPY } from "./audienceContent";
import type { Language } from "./content";

type UsagesSectionProps = {
  language: Language;
};

export function UsagesSection({ language }: UsagesSectionProps) {
  const labels = AUDIENCE_COPY[language].superApp;
  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <section className="noki-usages" id="usages" aria-labelledby="noki-usages-title" dir={direction}>
      <h6>{labels.usagesKicker}</h6>
      <h2 id="noki-usages-title">{labels.usagesTitle}</h2>

      <div className="noki-usages-grid">
        {labels.usages.map((usage) => (
          <div className="noki-usage-card" key={usage.title}>
            <h3>{usage.title}</h3>
            <p>{usage.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
