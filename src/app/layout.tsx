import type { Metadata } from "next";
import { Montserrat, Noto_Kufi_Arabic, Open_Sans } from "next/font/google";

import { LanguageProvider } from "@/components/site/LanguageProvider";

import "./globals.css";

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

export const metadata: Metadata = {
  title: "NOKI Service",
  description: "Plateforme opérationnelle pensée pour le cycle du paiement à la livraison en Afrique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      dir="ltr"
      data-lang="fr"
      className={`${montserrat.variable} ${openSans.variable} ${notoKufiArabic.variable}`}
    >
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
