// The Super App distribution link (app store page or smart link) is owned by
// marketing/release, not by this web app. Mirrors the
// NOKI_MERCHANT_PORTAL_URL pattern used by the login page: resolved
// server-side only, never guessed or hard-coded, so the public site never
// links to a store page that was not actually confirmed.
export function resolveSuperAppUrl(): string | null {
  const raw = process.env.NOKI_SUPER_APP_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}
