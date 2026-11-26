// Maps the public-site form state onto the NOKI API public-intake DTOs
// (POST /v1/public/leads, POST /v1/public/merchant-applications). Pure
// functions, no I/O: the API remains the sole validator and source of truth.

type Dict = Record<string, unknown>;

const opt = (value: string): string | undefined => {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

const prune = (value: Dict): Dict =>
  Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined));

export type LeadFormInput = {
  requestType: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  countryCode: string;
  country: string;
  city: string;
  company: string;
  website: string;
  preferredChannel: string;
  preferredLanguage: string;
  message: string;
  monthlyOrders: string;
  codShare: string;
  averageBasket: string;
  currency: string;
  platforms: string[];
  servedCountries: string[];
  deliveryModel: string;
  painPoints: string[];
  timeline: string;
  organizationType: string;
  services: string;
  coveredCountries: string[];
  zones: string;
  apiCapability: string;
  partnershipType: string;
  proposal: string;
  technicalContact: string;
  stack: string;
  integrationNeeds: string[];
  environment: string;
  sandbox: string;
  technicalComment: string;
  contactConsent: boolean;
  marketingConsent: boolean;
  websiteConfirm: string;
};

export function buildLeadPayload(form: LeadFormInput, locale: string, page = "/contact"): Dict {
  const demo = ["demo", "commercial", "merchant"].includes(form.requestType);
  const partner = ["logistics", "technology"].includes(form.requestType);
  const api = form.requestType === "api";

  const qualification: Dict = {};
  if (demo) {
    Object.assign(
      qualification,
      prune({
        monthlyOrdersRange: opt(form.monthlyOrders),
        codShareRange: opt(form.codShare),
        averageBasket: opt(form.averageBasket),
        currency: opt(form.currency),
        platforms: form.platforms,
        servedCountries: form.servedCountries,
        deliveryModel: opt(form.deliveryModel),
        painPoints: form.painPoints,
        timeline: opt(form.timeline),
      }),
    );
  }
  if (partner) {
    qualification.partnership = prune({
      organizationType: form.organizationType.trim(),
      services: form.services.trim(),
      coveredCountries: form.coveredCountries,
      zones: form.zones.trim(),
      apiCapability: form.apiCapability,
      partnershipType: form.partnershipType,
      proposal: form.proposal.trim(),
      technicalContact: opt(form.technicalContact),
    });
  }
  if (api) {
    qualification.api = prune({
      organizationType: form.organizationType.trim(),
      stack: opt(form.stack),
      integrationNeeds: form.integrationNeeds,
      environment: form.environment,
      technicalContact: form.technicalContact.trim(),
      sandbox: form.sandbox,
      comment: opt(form.technicalComment),
    });
  }

  return prune({
    requestType: form.requestType,
    locale,
    contact: prune({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      role: opt(form.role),
      email: form.email.trim(),
      phone: form.phone.trim(),
      countryCode: form.countryCode.trim(),
      country: form.country,
      city: opt(form.city),
    }),
    company: prune({ name: opt(form.company), website: opt(form.website) }),
    qualification: Object.keys(qualification).length ? qualification : undefined,
    request: prune({
      preferredChannel: form.preferredChannel,
      preferredLocale: opt(form.preferredLanguage),
      message: form.message.trim(),
    }),
    consent: { contactConsent: form.contactConsent, marketingConsent: form.marketingConsent },
    metadata: { source: "public-web", page },
    websiteConfirm: opt(form.websiteConfirm),
  });
}

export type MerchantFormInput = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  preferredLanguage: string;
  legalName: string;
  brandName: string;
  website: string;
  registrationCountry: string;
  mainCity: string;
  companyType: string;
  sector: string;
  teamSize: string;
  yearsActive: string;
  legalId: string;
  platforms: string[];
  salesChannels: string[];
  monthlyOrders: string;
  averageBasket: string;
  currency: string;
  codShare: string;
  servedCountries: string[];
  shops: string;
  sku: string;
  warehouses: string;
  deliveryModel: string;
  carriers: string;
  couriers: string;
  zonesServed: string;
  deliveryTime: string;
  remittanceFrequency: string;
  reconciliationDelay: string;
  failureRate: string;
  returnRate: string;
  painPoints: string[];
  modules: string[];
  integrations: string[];
  apiAvailable: string;
  techTeam: string;
  projectTimeline: string;
  mainGoal: string;
  comments: string;
  contactConsent: boolean;
  marketingConsent: boolean;
  websiteConfirm: string;
};

export function buildMerchantPayload(form: MerchantFormInput, locale: string, audienceCategory?: string): Dict {
  return prune({
    locale,
    source: "public-web",
    audienceCategory,
    contact: prune({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      role: form.role.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      country: form.country,
      city: form.city.trim(),
      preferredLanguage: form.preferredLanguage,
    }),
    company: prune({
      legalName: form.legalName.trim(),
      brandName: form.brandName.trim(),
      website: opt(form.website),
      registrationCountry: form.registrationCountry,
      mainCity: form.mainCity.trim(),
      companyType: form.companyType,
      sector: form.sector,
      teamSize: form.teamSize,
      yearsActive: form.yearsActive,
      legalId: opt(form.legalId),
    }),
    commerce: {
      platforms: form.platforms,
      salesChannels: form.salesChannels,
      monthlyOrdersRange: form.monthlyOrders,
      averageBasket: form.averageBasket.trim(),
      currency: form.currency,
      codShareRange: form.codShare,
      servedCountries: form.servedCountries,
      shopsRange: form.shops,
      skuRange: form.sku,
      warehousesRange: form.warehouses,
    },
    logistics: {
      deliveryModel: form.deliveryModel,
      carriers: form.carriers.trim(),
      couriersRange: form.couriers,
      zonesServed: form.zonesServed.trim(),
      deliveryTime: form.deliveryTime,
    },
    cod: {
      remittanceFrequency: form.remittanceFrequency,
      reconciliationDelay: form.reconciliationDelay,
      failureRateRange: form.failureRate,
      returnRateRange: form.returnRate,
      painPoints: form.painPoints,
    },
    integrations: {
      modules: form.modules,
      integrations: form.integrations,
      apiAvailable: form.apiAvailable,
      techTeam: form.techTeam,
    },
    needs: prune({
      projectTimeline: form.projectTimeline,
      mainGoal: form.mainGoal.trim(),
      comments: opt(form.comments),
    }),
    consent: { contactConsent: form.contactConsent, marketingConsent: form.marketingConsent },
    websiteConfirm: opt(form.websiteConfirm),
  });
}
