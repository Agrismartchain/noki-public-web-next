"use client";

import { AUDIENCE_COPY } from "./audienceContent";
import { QuickLeadForm } from "./QuickLeadForm";
import { useSiteLanguage } from "./LanguageProvider";

const AUDIENCE_PAGE = {
  taxi: { copyKey: "driversTaxi", page: "/chauffeurs/taxi" },
  courier: { copyKey: "driversCourier", page: "/chauffeurs/livreur" },
} as const;

type DriverCandidacyPageProps = {
  activity: keyof typeof AUDIENCE_PAGE;
};

export function DriverCandidacyPage({ activity }: DriverCandidacyPageProps) {
  const { language } = useSiteLanguage();
  const { copyKey, page } = AUDIENCE_PAGE[activity];
  const copy = AUDIENCE_COPY[language][copyKey];

  return (
    <QuickLeadForm
      requestType="other"
      page={page}
      roleLabel={copy.roleLabel}
      roleDefault={copy.roleDefault}
      messageLabel={copy.messageLabel}
      messagePlaceholder={copy.messagePlaceholder}
      submitLabel={copy.submitLabel}
      title={copy.title}
      body={copy.body}
      defaultCity="Brazzaville"
    />
  );
}
