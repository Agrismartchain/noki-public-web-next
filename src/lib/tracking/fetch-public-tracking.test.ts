import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchPublicTracking } from "./fetch-public-tracking";

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("fetchPublicTracking", () => {
  beforeEach(() => {
    vi.stubEnv("NOKI_API_BASE_URL", "https://api.noki.test");
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("rejects an obviously malformed token before making a network call", async () => {
    const result = await fetchPublicTracking("has spaces/not-base64url!");

    expect(result).toEqual({ kind: "not_found" });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("calls the API's public tracking endpoint with the token", async () => {
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(200, {
        serviceType: "TAXI",
        status: "IN_PROGRESS",
        active: true,
        driverFirstName: "Jean",
        vehicleLabel: "Toyota Corolla",
        latitude: -4.26,
        longitude: 15.24,
        destinationLabel: "Bacongo",
        lastUpdatedAt: new Date().toISOString(),
      }),
    );

    const result = await fetchPublicTracking("abc123_-XYZ");

    expect(result.kind).toBe("ok");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.noki.test/v1/public/mobility/tracking/abc123_-XYZ",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("maps a 404 to not_found", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse(404, { message: "not found" }));

    const result = await fetchPublicTracking("abc123");

    expect(result).toEqual({ kind: "not_found" });
  });

  it("maps a network failure to error", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("network down"));

    const result = await fetchPublicTracking("abc123");

    expect(result).toEqual({ kind: "error" });
  });

  it("maps a malformed upstream body to error", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse(200, { unexpected: true }));

    const result = await fetchPublicTracking("abc123");

    expect(result).toEqual({ kind: "error" });
  });
});
