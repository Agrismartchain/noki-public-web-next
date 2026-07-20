import type { Metadata } from "next";

import { ContactForm } from "@/components/site/ContactForm";
import { buildPageMetadata, renderJsonLd, webPageJsonLd } from "@/lib/seo/metadata";
import { assertLocale } from "@/lib/seo/i18n";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(assertLocale(locale), "contact");
}

export default async function LocalizedContactPage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const currentLocale = assertLocale(locale);

  return (
    <>
      <ContactForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(webPageJsonLd(currentLocale, "contact")) }}
      />
    </>
  );
}
