import { parseApiBaseUrl } from "./api-base-url";

/**
 * Reads and validates NOKI_API_BASE_URL from the server environment.
 *
 * Server-only: this must never be read from a "use client" component or
 * inlined into the browser bundle -- the public tracking page reaches the
 * NOKI API through this server's own /api/track/[token] route handler, not
 * directly from the browser, so this value never needs a NEXT_PUBLIC_
 * prefix. Only checked at the moment a request is actually made, not at
 * import/build time, so `next build` never fails on a missing local env.
 */
export function resolveApiBaseUrl(): string {
  return parseApiBaseUrl(process.env.NOKI_API_BASE_URL ?? "");
}
