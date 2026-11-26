"use client";

import { localizedPath } from "@/lib/seo/i18n";

import { AUDIENCE_COPY } from "./audienceContent";
import { ConversionShell } from "./ConversionShell";
import { useSiteLanguage } from "./LanguageProvider";
import { QuickLeadForm } from "./QuickLeadForm";

type AppPageProps = {
  superAppUrl: string | null;
  // Whether /api/intake/* actually reaches the real NOKI API. When it
  // doesn't, no form is shown at all -- a visitor should never be invited to
  // fill in a signup that is guaranteed to fail.
  leadCollectionConfigured: boolean;
};

export function AppPage({ superAppUrl, leadCollectionConfigured }: AppPageProps) {
  const { language } = useSiteLanguage();
  const copy = AUDIENCE_COPY[language].app;
  const common = AUDIENCE_COPY[language].common;

  if (superAppUrl) {
    return (
      <ConversionShell mode="app" kicker={copy.kicker} title={copy.title} body={copy.body}>
        <div className="noki-conversion-card noki-app-open-card">
          <a className="noki-form-submit noki-app-open-cta" href={superAppUrl} target="_blank" rel="noopener noreferrer">
            {copy.ctaOpen}
          </a>
        </div>
      </ConversionShell>
    );
  }

  if (!leadCollectionConfigured) {
    return (
      <ConversionShell mode="app" kicker={copy.kicker} title={copy.noChannelTitle} body={copy.noChannelBody}>
        {null}
      </ConversionShell>
    );
  }

  return (
    <QuickLeadForm
      requestType="app_alert"
      page="/app"
      roleLabel={copy.roleLabel}
      roleDefault={copy.roleDefault}
      messageLabel={copy.messageLabel}
      messagePlaceholder={copy.messagePlaceholder}
      submitLabel={copy.submitLabel}
      title={copy.unavailableTitle}
      body={copy.unavailableBody}
      formTitle={copy.formTitle}
      formBody={copy.formBody}
      defaultCity="Brazzaville"
      successExtra={
        <p>
          {copy.successExtra}{" "}
          <a href={localizedPath(language, "/professionnel")}>{common.discoverProfessional}</a>
          {" · "}
          <a href={localizedPath(language, "/chauffeurs")}>{common.discoverDrivers}</a>
        </p>
      }
    />
  );
}
