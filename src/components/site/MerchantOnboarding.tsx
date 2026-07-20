"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import {
  CheckboxField,
  CheckboxGroup,
  SelectInput,
  SegmentedGroup,
  TextareaInput,
  TextInput,
  focusFirstInvalid,
  isValidEmail,
  isValidUrl,
} from "@/components/forms/NokiFormControls";

import type { Language } from "./content";
import { CONVERSION_COPY, FORM_LABELS, labelFor } from "./conversionContent";
import {
  API_CAPABILITY_CHOICES,
  COD_SHARE_CHOICES,
  COMPANY_TYPE_CHOICES,
  COURIER_RANGE_CHOICES,
  CURRENCY_CHOICES,
  DELIVERY_MODEL_CHOICES,
  DELIVERY_TIME_CHOICES,
  INTEGRATION_NEED_CHOICES,
  LANGUAGE_CHOICES,
  MODULE_CHOICES,
  MONTHLY_ORDER_CHOICES,
  PAIN_POINT_CHOICES,
  PLATFORM_CHOICES,
  RATE_RANGE_CHOICES,
  RECONCILIATION_CHOICES,
  REMITTANCE_CHOICES,
  SALES_CHANNEL_CHOICES,
  SECTOR_CHOICES,
  SKU_RANGE_CHOICES,
  SMALL_RANGE_CHOICES,
  TEAM_SIZE_CHOICES,
  TIMELINE_CHOICES,
  YEARS_ACTIVE_CHOICES,
  choicesToOptions,
  countryOptions,
} from "./conversionOptions";
import { ConversionShell } from "./ConversionShell";
import { useSiteLanguage } from "./LanguageProvider";

type MerchantFormState = {
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

type MerchantErrors = Partial<Record<keyof MerchantFormState, string>>;

const EMPTY_MERCHANT_FORM: Omit<MerchantFormState, "preferredLanguage"> = {
  firstName: "",
  lastName: "",
  role: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  legalName: "",
  brandName: "",
  website: "",
  registrationCountry: "",
  mainCity: "",
  companyType: "",
  sector: "",
  teamSize: "",
  yearsActive: "",
  legalId: "",
  platforms: [],
  salesChannels: [],
  monthlyOrders: "",
  averageBasket: "",
  currency: "",
  codShare: "",
  servedCountries: [],
  shops: "",
  sku: "",
  warehouses: "",
  deliveryModel: "",
  carriers: "",
  couriers: "",
  zonesServed: "",
  deliveryTime: "",
  remittanceFrequency: "",
  reconciliationDelay: "",
  failureRate: "",
  returnRate: "",
  painPoints: [],
  modules: [],
  integrations: [],
  apiAvailable: "",
  techTeam: "",
  projectTimeline: "",
  mainGoal: "",
  comments: "",
  contactConsent: false,
  marketingConsent: false,
  websiteConfirm: "",
};

const REGISTER_LOCAL_COPY = {
  fr: {
    invalid: "Vérifiez les champs signalés pour continuer.",
    blockedTitle: "Collecte non connectée",
    stepCount: "6 étapes",
    stepNames: [
      "Contact",
      "Entreprise",
      "Activité e-commerce",
      "Livraison & COD",
      "Besoins NOKI",
      "Validation",
    ],
    stepBodies: [
      "Identifiez la personne qui pilotera les échanges avec NOKI.",
      "Situez l’entreprise sans demander de document sensible.",
      "Qualifiez les volumes, canaux et pays servis avec des plages.",
      "Comprenez l’organisation livraison, COD et reversements.",
      "Priorisez les modules et intégrations utiles.",
      "Relisez les informations avant de préparer la demande.",
    ],
    summary: "Résumé structuré",
    contact: "Contact principal",
    company: "Entreprise",
    commerce: "Commerce",
    logistics: "Livraison & COD",
    needs: "Besoins & intégrations",
    none: "Non renseigné",
  },
  en: {
    invalid: "Check the highlighted fields to continue.",
    blockedTitle: "Collection not connected",
    stepCount: "6 steps",
    stepNames: ["Contact", "Company", "E-commerce activity", "Delivery & COD", "NOKI needs", "Validation"],
    stepBodies: [
      "Identify the person who will lead the exchange with NOKI.",
      "Place the company context without asking for sensitive documents.",
      "Qualify volumes, channels and served countries with ranges.",
      "Understand delivery, COD and remittance operations.",
      "Prioritize useful modules and integrations.",
      "Check the information before preparing the request.",
    ],
    summary: "Structured summary",
    contact: "Primary contact",
    company: "Company",
    commerce: "Commerce",
    logistics: "Delivery & COD",
    needs: "Needs & integrations",
    none: "Not provided",
  },
  ar: {
    invalid: "راجع الحقول المحددة للمتابعة.",
    blockedTitle: "جمع البيانات غير متصل",
    stepCount: "6 خطوات",
    stepNames: ["التواصل", "الشركة", "نشاط التجارة الإلكترونية", "التوصيل وCOD", "احتياجات NOKI", "التحقق"],
    stepBodies: [
      "حدد الشخص الذي سيقود التواصل مع NOKI.",
      "ضع سياق الشركة دون طلب وثائق حساسة.",
      "أهل الأحجام والقنوات والبلدان باستخدام نطاقات.",
      "افهم تنظيم التوصيل والدفع عند الاستلام والتسويات.",
      "حدد الوحدات والتكاملات المفيدة.",
      "راجع المعلومات قبل تحضير الطلب.",
    ],
    summary: "ملخص منظم",
    contact: "جهة الاتصال الرئيسية",
    company: "الشركة",
    commerce: "التجارة",
    logistics: "التوصيل وCOD",
    needs: "الاحتياجات والتكاملات",
    none: "غير مذكور",
  },
} satisfies Record<Language, Record<string, string | string[]>>;

const PROGRESS = [16, 33, 50, 66, 83, 100] as const;

function createEmptyMerchantForm(language: Language): MerchantFormState {
  return {
    ...EMPTY_MERCHANT_FORM,
    preferredLanguage: language,
  };
}

function isPhone(value: string) {
  return /^[+\d\s().-]{7,24}$/.test(value.trim());
}

function selectedLabels(values: string[], options: { value: string; label: string }[], fallback: string) {
  if (!values.length) {
    return fallback;
  }

  return values.map((value) => options.find((option) => option.value === value)?.label ?? value).join(", ");
}

function selectedLabel(value: string, options: { value: string; label: string }[], fallback: string) {
  if (!value) {
    return fallback;
  }

  return options.find((option) => option.value === value)?.label ?? value;
}

export function MerchantOnboarding() {
  const { language } = useSiteLanguage();
  const copy = CONVERSION_COPY[language];
  const local = REGISTER_LOCAL_COPY[language];
  const stepNames = local.stepNames as string[];
  const stepBodies = local.stepBodies as string[];
  const [form, setForm] = useState<MerchantFormState>(() => createEmptyMerchantForm(language));
  const [errors, setErrors] = useState<MerchantErrors>({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "invalid" | "blocked">("idle");

  const options = useMemo(
    () => ({
      countries: countryOptions(language),
      languages: choicesToOptions(LANGUAGE_CHOICES, language),
      companyTypes: choicesToOptions(COMPANY_TYPE_CHOICES, language),
      sectors: choicesToOptions(SECTOR_CHOICES, language),
      teamSizes: choicesToOptions(TEAM_SIZE_CHOICES, language),
      yearsActive: choicesToOptions(YEARS_ACTIVE_CHOICES, language),
      platforms: choicesToOptions(PLATFORM_CHOICES, language),
      salesChannels: choicesToOptions(SALES_CHANNEL_CHOICES, language),
      monthlyOrders: choicesToOptions(MONTHLY_ORDER_CHOICES, language),
      currencies: choicesToOptions(CURRENCY_CHOICES, language),
      codShare: choicesToOptions(COD_SHARE_CHOICES, language),
      smallRanges: choicesToOptions(SMALL_RANGE_CHOICES, language),
      skuRanges: choicesToOptions(SKU_RANGE_CHOICES, language),
      deliveryModels: choicesToOptions(DELIVERY_MODEL_CHOICES, language),
      couriers: choicesToOptions(COURIER_RANGE_CHOICES, language),
      deliveryTimes: choicesToOptions(DELIVERY_TIME_CHOICES, language),
      remittances: choicesToOptions(REMITTANCE_CHOICES, language),
      reconciliations: choicesToOptions(RECONCILIATION_CHOICES, language),
      rates: choicesToOptions(RATE_RANGE_CHOICES, language),
      painPoints: choicesToOptions(PAIN_POINT_CHOICES, language),
      modules: choicesToOptions(MODULE_CHOICES, language),
      integrations: choicesToOptions(INTEGRATION_NEED_CHOICES, language),
      apiCapability: choicesToOptions(API_CAPABILITY_CHOICES, language),
      timelines: choicesToOptions(TIMELINE_CHOICES, language),
    }),
    [language],
  );

  function update<K extends keyof MerchantFormState>(key: K, value: MerchantFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  }

  function validateStep(stepIndex: number, currentForm = form) {
    const nextErrors: MerchantErrors = {};
    const required = copy.common.required;
    const requireFields = (keys: readonly (keyof MerchantFormState)[]) => {
      keys.forEach((key) => {
        const value = currentForm[key];
        if (Array.isArray(value) ? !value.length : !String(value).trim()) {
          nextErrors[key] = required;
        }
      });
    };

    if (stepIndex === 0) {
      requireFields(["firstName", "lastName", "role", "email", "phone", "country", "city", "preferredLanguage"]);
      if (currentForm.email.trim() && !isValidEmail(currentForm.email)) {
        nextErrors.email = copy.common.invalidEmail;
      }
      if (currentForm.phone.trim() && !isPhone(currentForm.phone)) {
        nextErrors.phone = copy.common.invalidPhone;
      }
    }

    if (stepIndex === 1) {
      requireFields([
        "legalName",
        "brandName",
        "registrationCountry",
        "mainCity",
        "companyType",
        "sector",
        "teamSize",
        "yearsActive",
      ]);
      if (!isValidUrl(currentForm.website)) {
        nextErrors.website = copy.common.invalidUrl;
      }
    }

    if (stepIndex === 2) {
      requireFields([
        "platforms",
        "salesChannels",
        "monthlyOrders",
        "averageBasket",
        "currency",
        "codShare",
        "servedCountries",
        "shops",
        "sku",
        "warehouses",
      ]);
    }

    if (stepIndex === 3) {
      requireFields([
        "deliveryModel",
        "carriers",
        "couriers",
        "zonesServed",
        "deliveryTime",
        "remittanceFrequency",
        "reconciliationDelay",
        "failureRate",
        "returnRate",
        "painPoints",
      ]);
    }

    if (stepIndex === 4) {
      requireFields(["modules", "integrations", "apiAvailable", "techTeam", "projectTimeline", "mainGoal"]);
    }

    if (stepIndex === 5 && !currentForm.contactConsent) {
      nextErrors.contactConsent = required;
    }

    return nextErrors;
  }

  function goNext() {
    const nextErrors = validateStep(step);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus("invalid");
      focusFirstInvalid();
      return;
    }

    setStatus("idle");
    setStep((current) => Math.min(current + 1, stepNames.length - 1));
  }

  function goPrevious() {
    setStatus("idle");
    setStep((current) => Math.max(current - 1, 0));
  }

  function editStep(index: number) {
    setStatus("idle");
    setStep(index);
  }

  function validateAll() {
    return stepNames.reduce<MerchantErrors>((allErrors, _, index) => ({ ...allErrors, ...validateStep(index) }), {});
  }

  function firstStepWithError(nextErrors: MerchantErrors) {
    return stepNames.findIndex((_, index) => {
      const stepErrors = validateStep(index);
      return Object.keys(stepErrors).some((key) => key in nextErrors);
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.websiteConfirm.trim()) {
      setStatus("blocked");
      return;
    }

    const nextErrors = validateAll();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      const targetStep = firstStepWithError(nextErrors);
      setStep(targetStep >= 0 ? targetStep : step);
      setStatus("invalid");
      setTimeout(focusFirstInvalid, 0);
      return;
    }

    setStatus("blocked");
  }

  const stepper = (
    <ol className="noki-register-stepper" aria-label={copy.register.progress}>
      {stepNames.map((name, index) => (
        <li key={name} data-active={index === step} data-complete={index < step} aria-current={index === step ? "step" : undefined}>
          <span>{index + 1}</span>
          <div>
            <strong>{name}</strong>
            <small>{PROGRESS[index]}%</small>
          </div>
        </li>
      ))}
    </ol>
  );

  const summarySections = [
    {
      title: local.contact as string,
      stepIndex: 0,
      rows: [
        `${form.firstName} ${form.lastName}`.trim(),
        form.role,
        form.email,
        form.phone,
        `${selectedLabel(form.country, options.countries, local.none as string)} · ${form.city}`,
      ],
    },
    {
      title: local.company as string,
      stepIndex: 1,
      rows: [
        form.legalName,
        form.brandName,
        selectedLabel(form.companyType, options.companyTypes, local.none as string),
        selectedLabel(form.sector, options.sectors, local.none as string),
        form.website,
      ],
    },
    {
      title: local.commerce as string,
      stepIndex: 2,
      rows: [
        selectedLabels(form.platforms, options.platforms, local.none as string),
        selectedLabel(form.monthlyOrders, options.monthlyOrders, local.none as string),
        selectedLabel(form.codShare, options.codShare, local.none as string),
        selectedLabels(form.servedCountries, options.countries, local.none as string),
      ],
    },
    {
      title: local.logistics as string,
      stepIndex: 3,
      rows: [
        selectedLabel(form.deliveryModel, options.deliveryModels, local.none as string),
        form.carriers,
        form.zonesServed,
        selectedLabel(form.remittanceFrequency, options.remittances, local.none as string),
      ],
    },
    {
      title: local.needs as string,
      stepIndex: 4,
      rows: [
        selectedLabels(form.modules, options.modules, local.none as string),
        selectedLabels(form.integrations, options.integrations, local.none as string),
        selectedLabel(form.projectTimeline, options.timelines, local.none as string),
        form.mainGoal,
      ],
    },
  ];

  return (
    <ConversionShell mode="register" title={copy.register.title} body={copy.register.body} aside={stepper}>
      <form className="noki-conversion-card noki-register-form" onSubmit={onSubmit} noValidate>
        <div className="noki-register-progress" aria-label={`${copy.register.progress} ${PROGRESS[step]}%`}>
          <div>
            <span>
              {copy.register.step} {step + 1} {copy.register.of} {stepNames.length}
            </span>
            <strong>{PROGRESS[step]}%</strong>
          </div>
          <progress value={PROGRESS[step]} max={100}>
            {PROGRESS[step]}%
          </progress>
        </div>

        <div className="noki-form-head">
          <p>{stepNames[step]}</p>
          <span>{stepBodies[step]}</span>
        </div>

        {status !== "idle" ? (
          <div className="noki-form-notice" data-tone={status} role="alert">
            <strong>{status === "invalid" ? (local.invalid as string) : (local.blockedTitle as string)}</strong>
            <span>{status === "invalid" ? (local.invalid as string) : copy.common.unavailable}</span>
          </div>
        ) : null}

        <div className="noki-honeypot" aria-hidden="true">
          <TextInput
            name="merchantWebsiteConfirm"
            label={copy.common.honeypot}
            value={form.websiteConfirm}
            onChange={(value) => update("websiteConfirm", value)}
            autoComplete="off"
          />
        </div>

        {step === 0 ? (
          <div className="noki-form-grid">
            <TextInput
              name="merchantFirstName"
              label={labelFor(FORM_LABELS.firstName, language)}
              value={form.firstName}
              onChange={(value) => update("firstName", value)}
              required
              error={errors.firstName}
              autoComplete="given-name"
            />
            <TextInput
              name="merchantLastName"
              label={labelFor(FORM_LABELS.lastName, language)}
              value={form.lastName}
              onChange={(value) => update("lastName", value)}
              required
              error={errors.lastName}
              autoComplete="family-name"
            />
            <TextInput
              name="merchantRole"
              label={labelFor(FORM_LABELS.role, language)}
              value={form.role}
              onChange={(value) => update("role", value)}
              required
              error={errors.role}
              autoComplete="organization-title"
            />
            <TextInput
              name="merchantEmail"
              label={labelFor(FORM_LABELS.email, language)}
              value={form.email}
              onChange={(value) => update("email", value)}
              required
              error={errors.email}
              type="email"
              inputMode="email"
              autoComplete="email"
            />
            <TextInput
              name="merchantPhone"
              label={labelFor(FORM_LABELS.phone, language)}
              value={form.phone}
              onChange={(value) => update("phone", value)}
              required
              error={errors.phone}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
            />
            <SelectInput
              name="merchantCountry"
              label={labelFor(FORM_LABELS.country, language)}
              value={form.country}
              onChange={(value) => update("country", value)}
              options={options.countries}
              required
              error={errors.country}
              placeholder={copy.common.select}
            />
            <TextInput
              name="merchantCity"
              label={labelFor(FORM_LABELS.city, language)}
              value={form.city}
              onChange={(value) => update("city", value)}
              required
              error={errors.city}
              autoComplete="address-level2"
            />
            <SelectInput
              name="merchantPreferredLanguage"
              label={copy.contact.preferredLanguage}
              value={form.preferredLanguage}
              onChange={(value) => update("preferredLanguage", value)}
              options={options.languages}
              required
              error={errors.preferredLanguage}
              placeholder={copy.common.select}
            />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="noki-form-grid">
            <TextInput
              name="legalName"
              label={labelFor(FORM_LABELS.legalName, language)}
              value={form.legalName}
              onChange={(value) => update("legalName", value)}
              required
              error={errors.legalName}
              autoComplete="organization"
            />
            <TextInput
              name="brandName"
              label={labelFor(FORM_LABELS.brandName, language)}
              value={form.brandName}
              onChange={(value) => update("brandName", value)}
              required
              error={errors.brandName}
            />
            <TextInput
              name="merchantWebsite"
              label={labelFor(FORM_LABELS.website, language)}
              value={form.website}
              onChange={(value) => update("website", value)}
              error={errors.website}
              type="url"
              inputMode="url"
              placeholder="https://"
            />
            <SelectInput
              name="registrationCountry"
              label={labelFor(FORM_LABELS.registrationCountry, language)}
              value={form.registrationCountry}
              onChange={(value) => update("registrationCountry", value)}
              options={options.countries}
              required
              error={errors.registrationCountry}
              placeholder={copy.common.select}
            />
            <TextInput
              name="mainCity"
              label={labelFor(FORM_LABELS.city, language)}
              value={form.mainCity}
              onChange={(value) => update("mainCity", value)}
              required
              error={errors.mainCity}
            />
            <SelectInput
              name="companyType"
              label={labelFor(FORM_LABELS.companyType, language)}
              value={form.companyType}
              onChange={(value) => update("companyType", value)}
              options={options.companyTypes}
              required
              error={errors.companyType}
              placeholder={copy.common.select}
            />
            <SelectInput
              name="sector"
              label={labelFor(FORM_LABELS.sector, language)}
              value={form.sector}
              onChange={(value) => update("sector", value)}
              options={options.sectors}
              required
              error={errors.sector}
              placeholder={copy.common.select}
            />
            <SelectInput
              name="teamSize"
              label={labelFor(FORM_LABELS.teamSize, language)}
              value={form.teamSize}
              onChange={(value) => update("teamSize", value)}
              options={options.teamSizes}
              required
              error={errors.teamSize}
              placeholder={copy.common.select}
            />
            <SelectInput
              name="yearsActive"
              label={labelFor(FORM_LABELS.yearsActive, language)}
              value={form.yearsActive}
              onChange={(value) => update("yearsActive", value)}
              options={options.yearsActive}
              required
              error={errors.yearsActive}
              placeholder={copy.common.select}
            />
            <TextInput
              name="legalId"
              label={labelFor(FORM_LABELS.legalId, language)}
              value={form.legalId}
              onChange={(value) => update("legalId", value)}
              hint={copy.common.optional}
            />
          </div>
        ) : null}

        {step === 2 ? (
          <>
            <div className="noki-form-grid">
              <SelectInput
                name="commerceMonthlyOrders"
                label={labelFor(FORM_LABELS.monthlyOrders, language)}
                value={form.monthlyOrders}
                onChange={(value) => update("monthlyOrders", value)}
                options={options.monthlyOrders}
                required
                error={errors.monthlyOrders}
                placeholder={copy.common.select}
              />
              <TextInput
                name="commerceAverageBasket"
                label={labelFor(FORM_LABELS.averageBasket, language)}
                value={form.averageBasket}
                onChange={(value) => update("averageBasket", value)}
                required
                error={errors.averageBasket}
                inputMode="decimal"
              />
              <SelectInput
                name="commerceCurrency"
                label={labelFor(FORM_LABELS.currency, language)}
                value={form.currency}
                onChange={(value) => update("currency", value)}
                options={options.currencies}
                required
                error={errors.currency}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="commerceCodShare"
                label={labelFor(FORM_LABELS.codShare, language)}
                value={form.codShare}
                onChange={(value) => update("codShare", value)}
                options={options.codShare}
                required
                error={errors.codShare}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="shops"
                label={labelFor(FORM_LABELS.shops, language)}
                value={form.shops}
                onChange={(value) => update("shops", value)}
                options={options.smallRanges}
                required
                error={errors.shops}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="sku"
                label={labelFor(FORM_LABELS.sku, language)}
                value={form.sku}
                onChange={(value) => update("sku", value)}
                options={options.skuRanges}
                required
                error={errors.sku}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="warehouses"
                label={labelFor(FORM_LABELS.warehouses, language)}
                value={form.warehouses}
                onChange={(value) => update("warehouses", value)}
                options={options.smallRanges}
                required
                error={errors.warehouses}
                placeholder={copy.common.select}
              />
            </div>
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.platforms, language)}
              name="commercePlatforms"
              options={options.platforms}
              values={form.platforms}
              onChange={(values) => update("platforms", values)}
              error={errors.platforms}
            />
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.salesChannels, language)}
              name="salesChannels"
              options={options.salesChannels}
              values={form.salesChannels}
              onChange={(values) => update("salesChannels", values)}
              error={errors.salesChannels}
            />
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.servedCountries, language)}
              name="commerceServedCountries"
              options={options.countries}
              values={form.servedCountries}
              onChange={(values) => update("servedCountries", values)}
              error={errors.servedCountries}
            />
          </>
        ) : null}

        {step === 3 ? (
          <>
            <div className="noki-form-grid">
              <SelectInput
                name="logisticsDeliveryModel"
                label={labelFor(FORM_LABELS.deliveryModel, language)}
                value={form.deliveryModel}
                onChange={(value) => update("deliveryModel", value)}
                options={options.deliveryModels}
                required
                error={errors.deliveryModel}
                placeholder={copy.common.select}
              />
              <TextInput
                name="carriers"
                label={labelFor(FORM_LABELS.carriers, language)}
                value={form.carriers}
                onChange={(value) => update("carriers", value)}
                required
                error={errors.carriers}
              />
              <SelectInput
                name="couriers"
                label={labelFor(FORM_LABELS.couriers, language)}
                value={form.couriers}
                onChange={(value) => update("couriers", value)}
                options={options.couriers}
                required
                error={errors.couriers}
                placeholder={copy.common.select}
              />
              <TextInput
                name="zonesServed"
                label={labelFor(FORM_LABELS.zonesServed, language)}
                value={form.zonesServed}
                onChange={(value) => update("zonesServed", value)}
                required
                error={errors.zonesServed}
              />
              <SelectInput
                name="deliveryTime"
                label={labelFor(FORM_LABELS.deliveryTime, language)}
                value={form.deliveryTime}
                onChange={(value) => update("deliveryTime", value)}
                options={options.deliveryTimes}
                required
                error={errors.deliveryTime}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="remittanceFrequency"
                label={labelFor(FORM_LABELS.remittanceFrequency, language)}
                value={form.remittanceFrequency}
                onChange={(value) => update("remittanceFrequency", value)}
                options={options.remittances}
                required
                error={errors.remittanceFrequency}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="reconciliationDelay"
                label={labelFor(FORM_LABELS.reconciliationDelay, language)}
                value={form.reconciliationDelay}
                onChange={(value) => update("reconciliationDelay", value)}
                options={options.reconciliations}
                required
                error={errors.reconciliationDelay}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="failureRate"
                label={labelFor(FORM_LABELS.failureRate, language)}
                value={form.failureRate}
                onChange={(value) => update("failureRate", value)}
                options={options.rates}
                required
                error={errors.failureRate}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="returnRate"
                label={labelFor(FORM_LABELS.returnRate, language)}
                value={form.returnRate}
                onChange={(value) => update("returnRate", value)}
                options={options.rates}
                required
                error={errors.returnRate}
                placeholder={copy.common.select}
              />
            </div>
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.painPoints, language)}
              name="logisticsPainPoints"
              options={options.painPoints}
              values={form.painPoints}
              onChange={(values) => update("painPoints", values)}
              error={errors.painPoints}
            />
          </>
        ) : null}

        {step === 4 ? (
          <>
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.modules, language)}
              name="modules"
              options={options.modules}
              values={form.modules}
              onChange={(values) => update("modules", values)}
              error={errors.modules}
            />
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.integrationNeeds, language)}
              name="merchantIntegrations"
              options={options.integrations}
              values={form.integrations}
              onChange={(values) => update("integrations", values)}
              error={errors.integrations}
            />
            <div className="noki-form-grid">
              <SegmentedGroup
                legend={labelFor(FORM_LABELS.apiAvailable, language)}
                name="apiAvailable"
                options={options.apiCapability}
                value={form.apiAvailable}
                onChange={(value) => update("apiAvailable", value)}
                error={errors.apiAvailable}
              />
              <SegmentedGroup
                legend={labelFor(FORM_LABELS.techTeam, language)}
                name="techTeam"
                options={options.apiCapability}
                value={form.techTeam}
                onChange={(value) => update("techTeam", value)}
                error={errors.techTeam}
              />
              <SelectInput
                name="projectTimeline"
                label={labelFor(FORM_LABELS.projectTimeline, language)}
                value={form.projectTimeline}
                onChange={(value) => update("projectTimeline", value)}
                options={options.timelines}
                required
                error={errors.projectTimeline}
                placeholder={copy.common.select}
              />
            </div>
            <TextareaInput
              name="mainGoal"
              label={labelFor(FORM_LABELS.mainGoal, language)}
              value={form.mainGoal}
              onChange={(value) => update("mainGoal", value)}
              required
              error={errors.mainGoal}
            />
            <TextareaInput
              name="comments"
              label={labelFor(FORM_LABELS.comments, language)}
              value={form.comments}
              onChange={(value) => update("comments", value)}
            />
          </>
        ) : null}

        {step === 5 ? (
          <section className="noki-register-summary" aria-label={local.summary as string}>
            <h2>{copy.register.finalTitle}</h2>
            {summarySections.map((section) => (
              <article key={section.title}>
                <div>
                  <h3>{section.title}</h3>
                  <button type="button" onClick={() => editStep(section.stepIndex)}>
                    {copy.register.edit}
                  </button>
                </div>
                <ul>
                  {section.rows.map((row, index) => (
                    <li key={`${section.title}-${index}`}>{row || (local.none as string)}</li>
                  ))}
                </ul>
              </article>
            ))}
            <div className="noki-form-consent">
              <CheckboxField
                name="merchantContactConsent"
                label={copy.common.consent}
                checked={form.contactConsent}
                onChange={(checked) => update("contactConsent", checked)}
                required
                error={errors.contactConsent}
              />
              <CheckboxField
                name="merchantMarketingConsent"
                label={copy.common.marketing}
                checked={form.marketingConsent}
                onChange={(checked) => update("marketingConsent", checked)}
              />
            </div>
          </section>
        ) : null}

        <div className="noki-register-actions">
          <button className="noki-form-secondary" type="button" onClick={goPrevious} disabled={step === 0}>
            {copy.register.previous}
          </button>
          {step < stepNames.length - 1 ? (
            <button className="noki-form-submit" type="button" onClick={goNext}>
              {copy.register.next}
            </button>
          ) : (
            <button className="noki-form-submit" type="submit">
              {copy.register.submit}
            </button>
          )}
        </div>
      </form>
    </ConversionShell>
  );
}
