"use client";

import { localizedPath } from "@/lib/seo/i18n";

import { AUDIENCE_COPY } from "./audienceContent";
import { QuickLeadForm } from "./QuickLeadForm";
import { useSiteLanguage } from "./LanguageProvider";

// Maps each campaign audience onto:
// - the existing merchant-onboarding sector enum (SECTOR_CHOICES in
//   conversionOptions.ts), so "Démarrer l'onboarding" pre-fills a real,
//   editable field in /register rather than inventing a new category there;
// - the dedicated leads.requestType and merchant-applications.audienceCategory
//   values noki-api now accepts (phase20f), so the quick-request path and the
//   full-onboarding path are both categorized reliably, never via free text.
const AUDIENCE_SECTOR = {
  restaurants: { sector: "food", page: "/professionnel/restaurants", category: "restaurant" },
  supermarkets: { sector: "generalist", page: "/professionnel/supermarches", category: "supermarket" },
  pharmacies: { sector: "health", page: "/professionnel/pharmacies", category: "pharmacy" },
} as const;

type MerchantAudience = keyof typeof AUDIENCE_SECTOR;

type MerchantAudiencePageProps = {
  audience: MerchantAudience;
};

export function MerchantAudiencePage({ audience }: MerchantAudiencePageProps) {
  const { language } = useSiteLanguage();
  const copy = AUDIENCE_COPY[language][audience];
  const common = AUDIENCE_COPY[language].common;
  const { sector, page, category } = AUDIENCE_SECTOR[audience];
  const onboardingHref = `${localizedPath(language, "/register")}?sector=${sector}&audience=${category}`;

  return (
    <QuickLeadForm
      requestType={category}
      page={page}
      roleLabel={copy.roleLabel}
      roleDefault={copy.roleDefault}
      showCompany
      companyLabel={copy.companyLabel}
      messageLabel={copy.messageLabel}
      messagePlaceholder={copy.messagePlaceholder}
      submitLabel={copy.submitLabel}
      title={copy.title}
      body={copy.body}
      defaultCity="Brazzaville"
      formTitle={copy.quickFormTitle}
      formBody={copy.quickFormBody}
      aside={
        <div className="noki-conversion-note noki-onboarding-callout">
          <p>{common.onboardingNote}</p>
          <a href={onboardingHref}>{copy.ctaOnboarding} →</a>
        </div>
      }
    />
  );
}
