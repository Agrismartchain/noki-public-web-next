import type { Metadata } from "next";

import { HomePage } from "@/components/site/HomePage";
import { resolveSuperAppUrl } from "@/lib/links/super-app-url";
import { buildPageMetadata, organizationJsonLd, renderJsonLd, websiteJsonLd } from "@/lib/seo/metadata";
import { assertLocale } from "@/lib/seo/i18n";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(assertLocale(locale), "home");
}

// Must stay in sync with /app: both read NOKI_SUPER_APP_URL to decide whether
// to link straight to the store or fall back to the launch-alert form. If
// this page were statically prerendered, that choice would be frozen at
// build time and could silently disagree with /app whenever the variable is
// only set at deploy/start time rather than at build time.
export const dynamic = "force-dynamic";

export default async function LocalizedHomePage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const currentLocale = assertLocale(locale);

  return (
    <>
      <HomePage superAppUrl={resolveSuperAppUrl()} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(organizationJsonLd(currentLocale)) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: renderJsonLd(websiteJsonLd()) }} />
    </>
  );
}
