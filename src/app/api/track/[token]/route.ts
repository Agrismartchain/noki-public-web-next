import { fetchPublicTracking } from "@/lib/tracking/fetch-public-tracking";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ token: string }> };

// Same-origin proxy in front of GET /v1/public/mobility/tracking/:token on
// the NOKI API. The browser never talks to the API directly: this keeps
// NOKI_API_BASE_URL server-only, avoids needing any CORS change on the API
// for a public marketing-site origin, and gives the public tracking page a
// same-origin endpoint to poll. It never calls a database itself and never
// reproduces the API's tracking/authorization logic -- the API's opaque
// token lookup remains the sole source of truth.
export async function GET(_request: Request, context: RouteContext): Promise<Response> {
  const { token } = await context.params;
  const result = await fetchPublicTracking(token);

  if (result.kind === "not_found") {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  if (result.kind === "error") {
    return Response.json({ error: "upstream_unavailable" }, { status: 502 });
  }

  return Response.json(result.data, {
    status: 200,
    headers: { "cache-control": "no-store" },
  });
}
