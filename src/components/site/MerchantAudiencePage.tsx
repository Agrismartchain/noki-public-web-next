"use client";

import { localizedPath } from "@/lib/seo/i18n";

import { AUDIENCE_COPY } from "./audienceContent";
import { QuickLeadForm } from "./QuickLeadForm";
import { useSiteLanguage } from "./LanguageProvider";

// Maps each campaign audience onto the existing merchant-onboarding sector
// enum (SECTOR_CHOICES in conversionOptions.ts) so "Démarrer l'onboarding"
// pre-fills a real, editable field in /register rather than inventing a new
// unverified category.
const AUDIENCE_SECTOR = {
  restaurants: { sector: "food", page: "/professionnel/restaurants" },
  supermarkets: { sector: "generalist", page: "/professionnel/supermarches" },
  pharmacies: { sector: "health", page: "/professionnel/pharmacies" },
} as const;

type MerchantAudience = keyof typeof AUDIENCE_SECTOR;

type MerchantAudiencePageProps = {
  audience: MerchantAudience;
};

export function MerchantAudiencePage({ audience }: MerchantAudiencePageProps) {
  const { language } = useSiteLanguage();
  const copy = AUDIENCE_COPY[language][audience];
  const common = AUDIENCE_COPY[language].common;
  const { sector, page } = AUDIENCE_SECTOR[audience];
  const onboardingHref = `${localizedPath(language, "/register")}?sector=${sector}`;

  return (
    <QuickLeadForm
      requestType="other"
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
