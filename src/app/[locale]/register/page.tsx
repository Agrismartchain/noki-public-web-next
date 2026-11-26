import type { Metadata } from "next";

import { MerchantOnboarding } from "@/components/site/MerchantOnboarding";
import type { MerchantAudienceCategory } from "@/components/site/MerchantOnboarding";
import { SECTOR_CHOICES } from "@/components/site/conversionOptions";
import { buildPageMetadata, renderJsonLd, webPageJsonLd } from "@/lib/seo/metadata";
import { assertLocale } from "@/lib/seo/i18n";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const GOAL_TAGS = ["marketplace", "logistics"] as const;

// Mirrors MERCHANT_APPLICATION_AUDIENCE_CATEGORIES in noki-api's
// public-intake.constants.ts -- kept in sync manually until these contracts
// move to noki-shared-contracts.
const AUDIENCE_CATEGORIES = [
  "restaurant",
  "supermarket",
  "pharmacy",
  "vendor_marketplace",
  "vendor_cod",
] as const satisfies readonly MerchantAudienceCategory[];

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(assertLocale(locale), "register");
}

export default async function LocalizedRegisterPage({ params, searchParams }: LocalizedPageProps) {
  const { locale } = await params;
  const currentLocale = assertLocale(locale);
  const query = await searchParams;

  const sectorParam = firstValue(query.sector);
  const initialSector = SECTOR_CHOICES.some((choice) => choice.value === sectorParam) ? sectorParam : undefined;

  const goalParam = firstValue(query.goal);
  const initialGoalTag = GOAL_TAGS.find((tag) => tag === goalParam);

  const audienceParam = firstValue(query.audience);
  const initialAudienceCategory = AUDIENCE_CATEGORIES.find((category) => category === audienceParam);

  return (
    <>
      <MerchantOnboarding
        initialSector={initialSector}
        initialGoalTag={initialGoalTag}
        initialAudienceCategory={initialAudienceCategory}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(webPageJsonLd(currentLocale, "register")) }}
      />
    </>
  );
}
