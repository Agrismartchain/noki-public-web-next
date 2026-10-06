import { describe, expect, it } from "vitest";

import { buildLeadPayload, buildMerchantPayload, type LeadFormInput, type MerchantFormInput } from "./payloads";

const lead: LeadFormInput = {
  requestType: "demo",
  firstName: " Amina ",
  lastName: "Diallo",
  role: "Ops",
  email: "amina@example.test",
  phone: "+242 06 000 0000",
  countryCode: "+242",
  country: "cg",
  city: "Brazzaville",
  company: "Boutique",
  website: "",
  preferredChannel: "email",
  preferredLanguage: "fr",
  message: "Je veux une démo.",
  monthlyOrders: "500-2000",
  codShare: "50-75",
  averageBasket: "15000",
  currency: "xaf",
  platforms: ["shopify"],
  servedCountries: ["cg"],
  deliveryModel: "mixed",
  painPoints: ["cod"],
  timeline: "1-3-months",
  organizationType: "",
  services: "",
  coveredCountries: [],
  zones: "",
  apiCapability: "",
  partnershipType: "",
  proposal: "",
  technicalContact: "",
  stack: "",
  integrationNeeds: [],
  environment: "",
  sandbox: "",
  technicalComment: "",
  contactConsent: true,
  marketingConsent: false,
  websiteConfirm: "",
};

// Loosely-typed view of the nested DTO sections, enough for assertions.
type Payload = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

describe("buildLeadPayload", () => {
  it("maps a demo request onto the public-intake lead DTO and trims input", () => {
    const payload = buildLeadPayload(lead, "fr") as Payload;
    expect(payload.requestType).toBe("demo");
    expect(payload.locale).toBe("fr");
    expect(payload.contact).toMatchObject({ firstName: "Amina", countryCode: "+242", country: "cg" });
    expect(payload.company).toEqual({ name: "Boutique" });
    expect(payload.qualification.monthlyOrdersRange).toBe("500-2000");
    expect(payload.qualification.partnership).toBeUndefined();
    expect(payload.consent).toEqual({ contactConsent: true, marketingConsent: false });
    expect(payload.metadata).toEqual({ source: "public-web", page: "/contact" });
    expect(payload.websiteConfirm).toBeUndefined();
  });

  it("builds partnership and api qualification only for those request types", () => {
    const partner = buildLeadPayload(
      { ...lead, requestType: "logistics", organizationType: "Last-mile", services: "Delivery", coveredCountries: ["cg"], zones: "Brazzaville", apiCapability: "yes", partnershipType: "coverage", proposal: "We cover COD." },
      "en",
    ) as Payload;
    expect(partner.qualification.partnership).toMatchObject({ organizationType: "Last-mile", coveredCountries: ["cg"] });
    expect(partner.qualification.monthlyOrdersRange).toBeUndefined();

    const api = buildLeadPayload(
      { ...lead, requestType: "api", organizationType: "ERP", technicalContact: "tech@example.test", integrationNeeds: ["orders"], environment: "saas", sandbox: "yes" },
      "en",
    ) as Payload;
    expect(api.qualification.api).toMatchObject({ technicalContact: "tech@example.test", integrationNeeds: ["orders"] });
  });

  it("forwards a filled honeypot so the API can reject it", () => {
    expect((buildLeadPayload({ ...lead, websiteConfirm: "bot" }, "fr") as Record<string, unknown>).websiteConfirm).toBe("bot");
  });
});

describe("buildMerchantPayload", () => {
  it("nests the onboarding form into the merchant-application DTO sections", () => {
    const merchant = {
      firstName: "Amina", lastName: "Diallo", role: "CEO", email: "a@example.test", phone: "+242060000000", country: "cg", city: "Brazzaville",
      preferredLanguage: "fr", legalName: "Boutique SARL", brandName: "Boutique", website: "", registrationCountry: "cg", mainCity: "Brazzaville",
      companyType: "pure-player", sector: "fashion", teamSize: "6-20", yearsActive: "1-3", legalId: "",
      platforms: ["shopify"], salesChannels: ["website"], monthlyOrders: "500-2000", averageBasket: "15000", currency: "xaf", codShare: "50-75",
      servedCountries: ["cg"], shops: "1", sku: "lt-100", warehouses: "1", deliveryModel: "mixed", carriers: "X", couriers: "1-5", zonesServed: "Brazzaville",
      deliveryTime: "same-day", remittanceFrequency: "weekly", reconciliationDelay: "1-3-days", failureRate: "lt-10", returnRate: "lt-10", painPoints: ["cod"],
      modules: ["cod"], integrations: ["orders"], apiAvailable: "yes", techTeam: "yes", projectTimeline: "1-3-months", mainGoal: "Reduce failures", comments: "",
      contactConsent: true, marketingConsent: false, websiteConfirm: "",
    } as MerchantFormInput;
    const payload = buildMerchantPayload(merchant, "fr") as Payload;
    expect(Object.keys(payload).sort()).toEqual(
      ["cod", "commerce", "company", "consent", "contact", "integrations", "locale", "logistics", "needs", "source"].sort(),
    );
    expect(payload.commerce).toMatchObject({ monthlyOrdersRange: "500-2000", codShareRange: "50-75", shopsRange: "1", skuRange: "lt-100", warehousesRange: "1" });
    expect(payload.cod).toMatchObject({ failureRateRange: "lt-10", returnRateRange: "lt-10" });
    expect(payload.needs).toEqual({ projectTimeline: "1-3-months", mainGoal: "Reduce failures" });
    expect(payload.company.website).toBeUndefined();
  });
});
