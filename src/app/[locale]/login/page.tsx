import type { Metadata } from "next";

import { LoginForm } from "@/components/site/LoginForm";
import { buildPageMetadata, renderJsonLd, webPageJsonLd } from "@/lib/seo/metadata";
import { assertLocale } from "@/lib/seo/i18n";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(assertLocale(locale), "login");
}

// The merchant portal is a separate NOKI app that owns authentication. The
// public site only links to it; with no URL configured it says so instead of
// offering a credential form that submits nowhere.
function resolveMerchantPortalUrl(): string | null {
  const raw = process.env.NOKI_MERCHANT_PORTAL_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function LocalizedLoginPage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const currentLocale = assertLocale(locale);

  return (
    <>
      <LoginForm portalUrl={resolveMerchantPortalUrl()} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(webPageJsonLd(currentLocale, "login")) }}
      />
    </>
  );
}
