import type { IntakeOutcome } from "@/lib/intake/client";

import type { SUBMIT_COPY } from "./conversionContent";

type SubmitCopy = (typeof SUBMIT_COPY)[keyof typeof SUBMIT_COPY];
export type SubmitStatus = "idle" | "invalid" | "sending" | IntakeOutcome;

export function noticeTitle(status: SubmitStatus, copy: SubmitCopy, invalid: string): string {
  switch (status) {
    case "invalid":
      return invalid;
    case "sending":
      return copy.sending;
    case "sent":
      return copy.sentTitle;
    default:
      return copy.failedTitle;
  }
}

export function noticeBody(status: SubmitStatus, copy: SubmitCopy, invalid: string): string {
  switch (status) {
    case "invalid":
      return invalid;
    case "sending":
      return copy.sending;
    case "sent":
      return copy.sentBody;
    case "validation":
      return copy.validationBody;
    case "rate_limited":
      return copy.rateLimitedBody;
    default:
      return copy.failedBody;
  }
}
