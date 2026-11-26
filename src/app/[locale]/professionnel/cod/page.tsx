import type { Metadata } from "next";

import { CodPage } from "@/components/site/CodPage";
import { buildPageMetadata, faqJsonLd, organizationJsonLd, renderJsonLd, websiteJsonLd } from "@/lib/seo/metadata";
import { assertLocale } from "@/lib/seo/i18n";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(assertLocale(locale), "cod");
}

export default async function LocalizedCodPage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const currentLocale = assertLocale(locale);

  return (
    <>
      <CodPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(organizationJsonLd(currentLocale)) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: renderJsonLd(websiteJsonLd()) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(faqJsonLd(currentLocale)) }}
      />
    </>
  );
}
