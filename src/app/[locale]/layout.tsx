import type { ReactNode } from "react";
import { Montserrat, Noto_Kufi_Arabic, Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import { LanguageProvider } from "@/components/site/LanguageProvider";
import { LOCALE_DIRECTIONS, LOCALES, isLocale } from "@/lib/seo/i18n";

import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-noto-kufi-arabic",
});

export const dynamicParams = false;

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={LOCALE_DIRECTIONS[locale]}
      data-lang={locale}
      className={`${montserrat.variable} ${openSans.variable} ${notoKufiArabic.variable}`}
    >
      <body>
        <LanguageProvider initialLanguage={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
