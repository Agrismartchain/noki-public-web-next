import type { MetadataRoute } from "next";

import { LOCALES, localizedPath } from "@/lib/seo/i18n";
import { SITE_URL } from "@/lib/seo/metadata";

const INDEXABLE_ROUTES = ["/", "/contact", "/register"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    INDEXABLE_ROUTES.map((route) => ({
      url: `${SITE_URL}${localizedPath(locale, route)}`,
    })),
  );
}
