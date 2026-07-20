import type { Metadata } from "next";

import { MerchantOnboarding } from "@/components/site/MerchantOnboarding";
import { buildPageMetadata, renderJsonLd, webPageJsonLd } from "@/lib/seo/metadata";
import { assertLocale } from "@/lib/seo/i18n";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(assertLocale(locale), "register");
}

export default async function LocalizedRegisterPage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const currentLocale = assertLocale(locale);

  return (
    <>
      <MerchantOnboarding />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(webPageJsonLd(currentLocale, "register")) }}
      />
    </>
  );
}
