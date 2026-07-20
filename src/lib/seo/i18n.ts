import type { Language } from "@/components/site/content";

export const LOCALES = ["fr", "en", "ar"] as const satisfies readonly Language[];
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export const LOCALE_DIRECTIONS = {
  fr: "ltr",
  en: "ltr",
  ar: "rtl",
} as const satisfies Record<Locale, "ltr" | "rtl">;

export type LocalizedRoute = "/" | "/contact" | "/register" | "/login";

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

export function assertLocale(value: string): Locale {
  if (isLocale(value)) {
    return value;
  }

  return DEFAULT_LOCALE;
}

export function localizedPath(locale: Locale, route: LocalizedRoute = "/") {
  return route === "/" ? `/${locale}` : `/${locale}${route}`;
}

export function switchLocaleInPathname(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (isLocale(segments[0])) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  if (pathname === "/" || pathname === "") {
    return `/${locale}`;
  }

  return `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function homeSectionHref(locale: Locale, id: string, currentPathname?: string) {
  return currentPathname === localizedPath(locale) ? `#${id}` : `${localizedPath(locale)}#${id}`;
}
