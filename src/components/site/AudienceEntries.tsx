import { localizedPath } from "@/lib/seo/i18n";

import { AUDIENCE_COPY } from "./audienceContent";
import type { Language } from "./content";

type AudienceEntriesProps = {
  language: Language;
};

export function AudienceEntries({ language }: AudienceEntriesProps) {
  const labels = AUDIENCE_COPY[language].superApp;
  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <section className="noki-entries" id="espaces" aria-labelledby="noki-entries-title" dir={direction}>
      <h6>{labels.entriesKicker}</h6>
      <h2 id="noki-entries-title">{labels.entriesTitle}</h2>

      <div className="noki-entries-grid">
        <a className="noki-entry-card" href={localizedPath(language, "/professionnel")}>
          <h3>{labels.entryPro.title}</h3>
          <p>{labels.entryPro.desc}</p>
          <span>{labels.entryPro.cta} →</span>
        </a>
        <a className="noki-entry-card" href={localizedPath(language, "/chauffeurs")}>
          <h3>{labels.entryDriver.title}</h3>
          <p>{labels.entryDriver.desc}</p>
          <span>{labels.entryDriver.cta} →</span>
        </a>
      </div>
    </section>
  );
}
