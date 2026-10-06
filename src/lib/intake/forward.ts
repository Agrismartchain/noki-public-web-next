import { resolveApiBaseUrl } from "@/lib/api/config";

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_BODY_BYTES = 64 * 1024;
const IDEMPOTENCY_KEY = /^[a-zA-Z0-9._:-]{8,160}$/;

export type IntakeTarget = "leads" | "merchant-applications";

/**
 * Same-origin forwarder for the public intake forms. Only the two allow-listed
 * API paths are reachable; the browser never learns NOKI_API_BASE_URL, and
 * upstream error bodies are reduced to stable codes (validation detail from the
 * API is passed through only for 400s, which carry field messages by design).
 */
export async function forwardIntake(request: Request, target: IntakeTarget): Promise<Response> {
  const idempotencyKey = request.headers.get("idempotency-key")?.trim() ?? "";
  if (!IDEMPOTENCY_KEY.test(idempotencyKey)) {
    return Response.json({ error: "invalid_idempotency_key" }, { status: 400 });
  }

  const raw = await request.text();
  if (raw.length === 0 || Buffer.byteLength(raw) > MAX_BODY_BYTES) {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  let baseUrl: string;
  try {
    baseUrl = resolveApiBaseUrl();
  } catch {
    console.error("[intake] NOKI_API_BASE_URL is not configured");
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  const headers: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json",
    "idempotency-key": idempotencyKey,
  };
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) headers["x-forwarded-for"] = forwardedFor;
  const userAgent = request.headers.get("user-agent");
  if (userAgent) headers["user-agent"] = userAgent;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const upstream = await fetch(`${baseUrl}/v1/public/${target}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });

    if (upstream.status === 201) {
      const data: unknown = await upstream.json().catch(() => ({}));
      return Response.json(data, { status: 201 });
    }
    if (upstream.status === 400) {
      return Response.json({ error: "validation_failed" }, { status: 400 });
    }
    if (upstream.status === 409) {
      return Response.json({ error: "conflict" }, { status: 409 });
    }
    if (upstream.status === 429) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }
    console.error(`[intake] upstream responded ${upstream.status} for ${target}`);
    return Response.json({ error: "unavailable" }, { status: 502 });
  } catch (error) {
    console.error("[intake] upstream request failed", error instanceof Error ? error.name : "unknown");
    return Response.json({ error: "unavailable" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
