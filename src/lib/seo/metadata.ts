import type { Metadata } from "next";

import { SITE_COPY } from "@/components/site/content";

import { DEFAULT_LOCALE, LOCALES, type Locale, type LocalizedRoute, localizedPath } from "./i18n";

export const SITE_URL = "https://noki-services.com";
export const SITE_NAME = "NOKI Service";
export const OG_IMAGE_PATH = "/og/noki-service-og-1200x630.png";
export const LOGO_PATH = "/assets/brand/noki-logo-yellow.png";

export type SeoPage = "home" | "contact" | "register" | "login";

const pageRoutes = {
  home: "/",
  contact: "/contact",
  register: "/register",
  login: "/login",
} as const satisfies Record<SeoPage, LocalizedRoute>;

const ogLocales = {
  fr: "fr_FR",
  en: "en_US",
  ar: "ar_AR",
} as const satisfies Record<Locale, string>;

const ogImageAlt = {
  fr: "NOKI Service, plateforme de gestion des opérations e-commerce et COD",
  en: "NOKI Service, e-commerce and COD operations platform",
  ar: "NOKI Service، منصة إدارة عمليات التجارة الإلكترونية والدفع عند الاستلام",
} as const satisfies Record<Locale, string>;

const seoCopy = {
  home: {
    fr: {
      title: "NOKI Service | Gestion COD & opérations e-commerce en Afrique",
      description:
        "Centralisez commandes, confirmation, stock, livraison, encaissement COD, reversements et gouvernance sur une plateforme pensée pour les opérations e-commerce en Afrique.",
    },
    en: {
      title: "NOKI Service | COD & E-commerce Operations in Africa",
      description:
        "Centralize orders, confirmation, inventory, delivery, COD collection, settlements and governance on one platform built for e-commerce operations in Africa.",
    },
    ar: {
      title: "NOKI Service | إدارة الدفع عند الاستلام وعمليات التجارة الإلكترونية في أفريقيا",
      description:
        "منصة موحدة لإدارة الطلبات والتأكيد والمخزون والتوصيل وتحصيل الدفع عند الاستلام والتسويات والحوكمة لعمليات التجارة الإلكترونية في أفريقيا.",
    },
  },
  contact: {
    fr: {
      title: "Contact & demande de démo | NOKI Service",
      description:
        "Contactez NOKI Service pour une démonstration, une demande commerciale, une intégration API ou un partenariat autour de vos opérations e-commerce et COD.",
    },
    en: {
      title: "Contact & Demo Request | NOKI Service",
      description:
        "Contact NOKI Service for a demo, commercial request, API integration or partnership around your e-commerce and COD operations.",
    },
    ar: {
      title: "التواصل وطلب عرض توضيحي | NOKI Service",
      description:
        "تواصل مع NOKI Service لطلب عرض توضيحي أو استفسار تجاري أو تكامل API أو شراكة مرتبطة بعمليات التجارة الإلكترونية والدفع عند الاستلام.",
    },
  },
  register: {
    fr: {
      title: "Inscription e-commerçant | NOKI Service",
      description:
        "Déposez votre demande d’inscription e-commerçant et présentez vos opérations, volumes, besoins logistiques, COD et intégrations à NOKI Service.",
    },
    en: {
      title: "Merchant Registration | NOKI Service",
      description:
        "Submit your merchant registration request and provide details about your operations, volumes, delivery, COD and integration needs.",
    },
    ar: {
      title: "تسجيل التاجر الإلكتروني | NOKI Service",
      description:
        "أرسل طلب تسجيل التاجر الإلكتروني وقدم معلومات عن عملياتك وحجم الطلبات والتوصيل والدفع عند الاستلام واحتياجات التكامل.",
    },
  },
  login: {
    fr: {
      title: "Connexion | NOKI Service",
      description: "Interface de connexion marchand NOKI Service.",
    },
    en: {
      title: "Sign in | NOKI Service",
      description: "NOKI Service merchant sign-in interface.",
    },
    ar: {
      title: "تسجيل الدخول | NOKI Service",
      description: "واجهة تسجيل دخول التاجر إلى NOKI Service.",
    },
  },
} as const satisfies Record<SeoPage, Record<Locale, { title: string; description: string }>>;

export function canonicalUrl(locale: Locale, page: SeoPage) {
  return `${SITE_URL}${localizedPath(locale, pageRoutes[page])}`;
}

export function pageAlternates(page: SeoPage) {
  const route = pageRoutes[page];

  return {
    fr: `${SITE_URL}${localizedPath("fr", route)}`,
    en: `${SITE_URL}${localizedPath("en", route)}`,
    ar: `${SITE_URL}${localizedPath("ar", route)}`,
    "x-default": `${SITE_URL}${localizedPath(DEFAULT_LOCALE, route)}`,
  };
}

export function buildPageMetadata(locale: Locale, page: SeoPage): Metadata {
  const copy = seoCopy[page][locale];
  const canonical = canonicalUrl(locale, page);
  const alternatives = pageAlternates(page);
  const alternateLocales = LOCALES.filter((candidate) => candidate !== locale).map((candidate) => ogLocales[candidate]);

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: alternatives,
    },
    robots: page === "login" ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: canonical,
      title: copy.title,
      description: copy.description,
      locale: ogLocales[locale],
      alternateLocale: alternateLocales,
      images: [
        {
          url: `${SITE_URL}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          alt: ogImageAlt[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [`${SITE_URL}${OG_IMAGE_PATH}`],
    },
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${LOGO_PATH}`,
    description: seoCopy.home[locale].description,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: [...LOCALES],
  };
}

export function faqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: SITE_COPY[locale].faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function webPageJsonLd(locale: Locale, page: Exclude<SeoPage, "home">) {
  const copy = seoCopy[page][locale];

  return {
    "@context": "https://schema.org",
    "@type": page === "contact" ? "ContactPage" : "WebPage",
    name: copy.title,
    description: copy.description,
    url: canonicalUrl(locale, page),
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function renderJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
