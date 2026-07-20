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

export default async function LocalizedLoginPage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const currentLocale = assertLocale(locale);

  return (
    <>
      <LoginForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(webPageJsonLd(currentLocale, "login")) }}
      />
    </>
  );
}
