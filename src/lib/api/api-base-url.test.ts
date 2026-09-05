import { describe, expect, it } from "vitest";

import { InvalidApiBaseUrlError, parseApiBaseUrl } from "./api-base-url";

describe("parseApiBaseUrl", () => {
  it("strips a trailing slash", () => {
    expect(parseApiBaseUrl("https://api.noki.test/")).toBe("https://api.noki.test");
  });

  it("rejects an empty value", () => {
    expect(() => parseApiBaseUrl("  ")).toThrow(InvalidApiBaseUrlError);
  });

  it("rejects a non-URL value", () => {
    expect(() => parseApiBaseUrl("not a url")).toThrow(InvalidApiBaseUrlError);
  });

  it("rejects a non-http(s) protocol", () => {
    expect(() => parseApiBaseUrl("ftp://api.noki.test")).toThrow(InvalidApiBaseUrlError);
  });

  it("rejects embedded credentials", () => {
    expect(() => parseApiBaseUrl("https://user:pass@api.noki.test")).toThrow(InvalidApiBaseUrlError);
  });
});
