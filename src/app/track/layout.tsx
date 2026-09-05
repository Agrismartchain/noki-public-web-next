import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./track.css";

// This route (/track/:token) is intentionally NOT under src/app/[locale] --
// it is a single, unauthenticated, no-account page opened from a share link
// (WhatsApp/SMS/etc), never part of the marketing site's navigation or
// locale switcher. There is no shared src/app/layout.tsx in this project
// (see src/app/[locale]/layout.tsx, which is the effective root layout for
// the marketing site), so this layout supplies its own <html>/<body> --
// Next.js's "multiple root layouts" pattern.
export const metadata: Metadata = {
  // Tracking links are single-use-ish and carry an opaque token: never index
  // them, and never let a search engine follow whatever pages they link to.
  robots: { index: false, follow: false, nocache: true },
};

export default function TrackLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
