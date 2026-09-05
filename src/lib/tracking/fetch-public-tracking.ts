import { resolveApiBaseUrl } from "@/lib/api/config";

import { isPublicMobilityTracking, type PublicMobilityTracking } from "./types";

const REQUEST_TIMEOUT_MS = 8000;

// The API mints tokens as 32 random bytes, base64url-encoded (see
// MobilityService.createShareLink) -- i.e. 43 base64url characters, no
// padding. A loose length/charset check here is just cheap validation
// before spending a network round trip, never authorization: the API's own
// hash lookup remains the sole source of truth for whether a token is real.
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

export type PublicTrackingResult =
  | { kind: "ok"; data: PublicMobilityTracking }
  | { kind: "not_found" }
  | { kind: "error" };

export async function fetchPublicTracking(token: string): Promise<PublicTrackingResult> {
  if (!TOKEN_PATTERN.test(token)) {
    return { kind: "not_found" };
  }

  let baseUrl: string;
  try {
    baseUrl = resolveApiBaseUrl();
  } catch {
    return { kind: "error" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${baseUrl}/v1/public/mobility/tracking/${encodeURIComponent(token)}`, {
      method: "GET",
      headers: { accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });

    if (response.status === 404) {
      return { kind: "not_found" };
    }

    if (!response.ok) {
      return { kind: "error" };
    }

    const body: unknown = await response.json();
    if (!isPublicMobilityTracking(body)) {
      return { kind: "error" };
    }

    return { kind: "ok", data: body };
  } catch {
    return { kind: "error" };
  } finally {
    clearTimeout(timeout);
  }
}
