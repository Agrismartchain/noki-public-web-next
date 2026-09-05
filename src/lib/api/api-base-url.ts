const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

export class InvalidApiBaseUrlError extends Error {
  constructor(reason: string) {
    super(`NOKI_API_BASE_URL is invalid: ${reason}`);
    this.name = "InvalidApiBaseUrlError";
  }
}

/**
 * Parses and validates a NOKI_API_BASE_URL value. Trailing slashes are
 * stripped so downstream code can safely concatenate paths.
 *
 * Mirrors the same validation used by the other NOKI Next.js apps
 * (see e.g. noki-seller-portal/src/lib/config/api-base-url.ts) so the
 * convention stays consistent across the monorepo.
 */
export function parseApiBaseUrl(rawValue: string): string {
  const trimmed = rawValue.trim();

  if (trimmed.length === 0) {
    throw new InvalidApiBaseUrlError("value is empty");
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new InvalidApiBaseUrlError("value is not a valid URL");
  }

  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
    throw new InvalidApiBaseUrlError(`protocol "${parsed.protocol}" is not allowed, use http or https`);
  }

  if (parsed.username.length > 0 || parsed.password.length > 0) {
    throw new InvalidApiBaseUrlError("credentials embedded in the URL are not allowed");
  }

  return parsed.href.replace(/\/+$/, "");
}
