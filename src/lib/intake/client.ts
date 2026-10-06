export type IntakeOutcome = "sent" | "validation" | "rate_limited" | "unavailable";

/**
 * Browser-side submit. `sent` is returned only for an actual 201 from the NOKI
 * API (relayed by the same-origin route); every other result is surfaced
 * truthfully so the form never claims success it did not get.
 */
export async function submitIntake(
  kind: "lead" | "merchant",
  payload: Record<string, unknown>,
  idempotencyKey: string,
): Promise<IntakeOutcome> {
  try {
    const response = await fetch(`/api/intake/${kind}`, {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": idempotencyKey },
      body: JSON.stringify(payload),
    });
    if (response.status === 201) return "sent";
    if (response.status === 400 || response.status === 409) return "validation";
    if (response.status === 429) return "rate_limited";
    return "unavailable";
  } catch {
    return "unavailable";
  }
}

export function newIdempotencyKey(): string {
  return `web-${crypto.randomUUID()}`;
}
