import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { forwardIntake } from "./forward";

const KEY = "web-123e4567-e89b-12d3-a456-426614174000";

function post(body: unknown, headers: Record<string, string> = { "idempotency-key": KEY }) {
  return new Request("https://site.example.test/api/intake/lead", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("forwardIntake", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("NOKI_API_BASE_URL", "https://api.example.test");
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("relays a 201 from the NOKI API and only calls the allow-listed path", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: "lead-1" }), { status: 201 }));
    const response = await forwardIntake(post({ a: 1 }, { "idempotency-key": KEY, "x-forwarded-for": "203.0.113.9" }), "leads");
    expect(response.status).toBe(201);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.example.test/v1/public/leads");
    expect((init.headers as Record<string, string>)["idempotency-key"]).toBe(KEY);
    expect((init.headers as Record<string, string>)["x-forwarded-for"]).toBe("203.0.113.9");
  });

  it("rejects a missing or malformed idempotency key without calling upstream", async () => {
    expect((await forwardIntake(post({}, {}), "leads")).status).toBe(400);
    expect((await forwardIntake(post({}, { "idempotency-key": "short" }), "leads")).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects non-object, invalid or oversize bodies", async () => {
    expect((await forwardIntake(post("not json"), "leads")).status).toBe(400);
    expect((await forwardIntake(post("[1,2]"), "leads")).status).toBe(400);
    expect((await forwardIntake(post({ pad: "x".repeat(70_000) }), "leads")).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("maps upstream failures to stable codes and never relays upstream bodies", async () => {
    fetchMock.mockResolvedValue(new Response("stack trace at /srv/api/secret.ts", { status: 500 }));
    const failed = await forwardIntake(post({ a: 1 }), "leads");
    expect(failed.status).toBe(502);
    expect(await failed.json()).toEqual({ error: "unavailable" });

    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: ["email must be an email"] }), { status: 400 }));
    const invalid = await forwardIntake(post({ a: 1 }), "merchant-applications");
    expect(invalid.status).toBe(400);
    expect(await invalid.json()).toEqual({ error: "validation_failed" });

    fetchMock.mockResolvedValue(new Response("{}", { status: 429 }));
    expect((await forwardIntake(post({ a: 1 }), "leads")).status).toBe(429);

    fetchMock.mockRejectedValue(new Error("connect ECONNREFUSED 10.0.0.5:3000"));
    const down = await forwardIntake(post({ a: 1 }), "leads");
    expect(down.status).toBe(502);
    expect(JSON.stringify(await down.json())).not.toContain("10.0.0.5");
  });

  it("answers 503 when the API base URL is not configured", async () => {
    vi.stubEnv("NOKI_API_BASE_URL", "");
    const response = await forwardIntake(post({ a: 1 }), "leads");
    expect(response.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
