import type { Metadata } from "next";

import { AppPage } from "@/components/site/AppPage";
import { resolveSuperAppUrl } from "@/lib/links/super-app-url";
import { buildPageMetadata, renderJsonLd, webPageJsonLd } from "@/lib/seo/metadata";
import { assertLocale } from "@/lib/seo/i18n";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(assertLocale(locale), "app");
}

export const dynamic = "force-dynamic";

export default async function LocalizedAppPage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const currentLocale = assertLocale(locale);

  return (
    <>
      <AppPage superAppUrl={resolveSuperAppUrl()} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(webPageJsonLd(currentLocale, "app")) }}
      />
    </>
  );
}
