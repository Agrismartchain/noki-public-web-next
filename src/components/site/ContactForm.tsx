"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import {
  CheckboxField,
  CheckboxGroup,
  SelectInput,
  TextareaInput,
  TextInput,
  focusFirstInvalid,
  isValidEmail,
  isValidUrl,
} from "@/components/forms/NokiFormControls";
import { localizedPath } from "@/lib/seo/i18n";

import type { Language } from "./content";
import { CONVERSION_COPY, FORM_LABELS, PRIORITY_COUNTRIES, REQUEST_TYPES, labelFor } from "./conversionContent";
import {
  API_CAPABILITY_CHOICES,
  CHANNEL_CHOICES,
  COD_SHARE_CHOICES,
  CURRENCY_CHOICES,
  DELIVERY_MODEL_CHOICES,
  ENVIRONMENT_CHOICES,
  INTEGRATION_NEED_CHOICES,
  LANGUAGE_CHOICES,
  MONTHLY_ORDER_CHOICES,
  PAIN_POINT_CHOICES,
  PARTNERSHIP_CHOICES,
  PLATFORM_CHOICES,
  TIMELINE_CHOICES,
  choicesToOptions,
  countryOptions,
} from "./conversionOptions";
import { ConversionShell } from "./ConversionShell";
import { useSiteLanguage } from "./LanguageProvider";

type ContactFormState = {
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

type ContactErrors = Partial<Record<keyof ContactFormState, string>>;

const EMPTY_FORM: Omit<ContactFormState, "preferredLanguage"> = {
  requestType: "",
  firstName: "",
  lastName: "",
  role: "",
  email: "",
  phone: "",
  countryCode: "",
  country: "",
  city: "",
  company: "",
  website: "",
  preferredChannel: "",
  message: "",
  monthlyOrders: "",
  codShare: "",
  averageBasket: "",
  currency: "",
  platforms: [],
  servedCountries: [],
  deliveryModel: "",
  painPoints: [],
  timeline: "",
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
  contactConsent: false,
  marketingConsent: false,
  websiteConfirm: "",
};

const CONTACT_LOCAL_COPY = {
  fr: {
    invalid: "Vérifiez les champs signalés avant de préparer la demande.",
    merchantNudge: "Pour une inscription complète, le parcours e-commerçant dédié est disponible.",
    merchantLink: "Ouvrir l’onboarding",
    demoGroup: "Qualification e-commerce",
    partnerGroup: "Qualification partenariat",
    apiGroup: "Qualification API",
    technicalComment: "Commentaire technique",
    sandboxYes: "Oui, documentation ou sandbox souhaitée",
    sandboxNo: "Pas nécessaire à ce stade",
    submitBlocked: "Collecte non connectée",
  },
  en: {
    invalid: "Check the highlighted fields before preparing the request.",
    merchantNudge: "For a complete registration, the dedicated merchant onboarding is available.",
    merchantLink: "Open onboarding",
    demoGroup: "E-commerce qualification",
    partnerGroup: "Partnership qualification",
    apiGroup: "API qualification",
    technicalComment: "Technical comment",
    sandboxYes: "Yes, documentation or sandbox needed",
    sandboxNo: "Not needed at this stage",
    submitBlocked: "Collection not connected",
  },
  ar: {
    invalid: "راجع الحقول المحددة قبل تحضير الطلب.",
    merchantNudge: "للتسجيل الكامل، يتوفر مسار تأهيل التاجر الإلكتروني.",
    merchantLink: "فتح مسار التأهيل",
    demoGroup: "تأهيل التجارة الإلكترونية",
    partnerGroup: "تأهيل الشراكة",
    apiGroup: "تأهيل API",
    technicalComment: "تعليق تقني",
    sandboxYes: "نعم، نحتاج إلى توثيق أو بيئة اختبار",
    sandboxNo: "غير ضروري في هذه المرحلة",
    submitBlocked: "جمع البيانات غير متصل",
  },
} satisfies Record<Language, Record<string, string>>;

function createEmptyForm(language: Language): ContactFormState {
  return {
    ...EMPTY_FORM,
    preferredLanguage: language,
  };
}

function requestTypeOptions(language: Language) {
  return Object.entries(REQUEST_TYPES).map(([value, labels]) => ({
    value,
    label: labelFor(labels, language),
  }));
}

function countryCodeOptions(language: Language) {
  return PRIORITY_COUNTRIES.filter((country) => country.code).map((country) => ({
    value: country.code,
    label: `${country.code} · ${labelFor(country.labels, language)}`,
  }));
}

function needsDemoQualification(requestType: string) {
  return requestType === "demo" || requestType === "commercial" || requestType === "merchant";
}

function needsPartnerQualification(requestType: string) {
  return requestType === "logistics" || requestType === "technology";
}

function isPhone(value: string) {
  return /^[+\d\s().-]{7,24}$/.test(value.trim());
}

export function ContactForm() {
  const { language } = useSiteLanguage();
  const copy = CONVERSION_COPY[language];
  const local = CONTACT_LOCAL_COPY[language];
  const [form, setForm] = useState<ContactFormState>(() => createEmptyForm(language));
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "invalid" | "blocked">("idle");

  const selectOptions = useMemo(
    () => ({
      requestTypes: requestTypeOptions(language),
      countries: countryOptions(language),
      countryCodes: countryCodeOptions(language),
      languages: choicesToOptions(LANGUAGE_CHOICES, language),
      channels: choicesToOptions(CHANNEL_CHOICES, language),
      monthlyOrders: choicesToOptions(MONTHLY_ORDER_CHOICES, language),
      codShare: choicesToOptions(COD_SHARE_CHOICES, language),
      currency: choicesToOptions(CURRENCY_CHOICES, language),
      platforms: choicesToOptions(PLATFORM_CHOICES, language),
      deliveryModels: choicesToOptions(DELIVERY_MODEL_CHOICES, language),
      painPoints: choicesToOptions(PAIN_POINT_CHOICES, language),
      timelines: choicesToOptions(TIMELINE_CHOICES, language),
      apiCapability: choicesToOptions(API_CAPABILITY_CHOICES, language),
      partnershipTypes: choicesToOptions(PARTNERSHIP_CHOICES, language),
      integrationNeeds: choicesToOptions(INTEGRATION_NEED_CHOICES, language),
      environments: choicesToOptions(ENVIRONMENT_CHOICES, language),
    }),
    [language],
  );

  function update<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  }

  function updateCountry(value: string) {
    const country = PRIORITY_COUNTRIES.find((item) => item.value === value);
    setForm((current) => ({
      ...current,
      country: value,
      countryCode: country?.code || current.countryCode,
    }));
    setErrors((current) => ({ ...current, country: undefined, countryCode: undefined }));
    setStatus("idle");
  }

  function validate() {
    const nextErrors: ContactErrors = {};
    const required = copy.common.required;

    (
      [
        "requestType",
        "firstName",
        "lastName",
        "role",
        "email",
        "phone",
        "countryCode",
        "country",
        "city",
        "company",
        "preferredChannel",
        "preferredLanguage",
        "message",
      ] as const
    ).forEach((key) => {
      if (!form[key].trim()) {
        nextErrors[key] = required;
      }
    });

    if (form.email.trim() && !isValidEmail(form.email)) {
      nextErrors.email = copy.common.invalidEmail;
    }

    if (form.phone.trim() && !isPhone(form.phone)) {
      nextErrors.phone = copy.common.invalidPhone;
    }

    if (!isValidUrl(form.website)) {
      nextErrors.website = copy.common.invalidUrl;
    }

    if (needsDemoQualification(form.requestType)) {
      (["monthlyOrders", "codShare", "currency", "deliveryModel", "timeline"] as const).forEach((key) => {
        if (!form[key].trim()) {
          nextErrors[key] = required;
        }
      });
      if (!form.platforms.length) {
        nextErrors.platforms = required;
      }
      if (!form.servedCountries.length) {
        nextErrors.servedCountries = required;
      }
      if (!form.painPoints.length) {
        nextErrors.painPoints = required;
      }
    }

    if (needsPartnerQualification(form.requestType)) {
      (["organizationType", "services", "zones", "apiCapability", "partnershipType", "proposal"] as const).forEach(
        (key) => {
          if (!form[key].trim()) {
            nextErrors[key] = required;
          }
        },
      );
      if (!form.coveredCountries.length) {
        nextErrors.coveredCountries = required;
      }
    }

    if (form.requestType === "api") {
      (["organizationType", "technicalContact", "environment", "sandbox"] as const).forEach((key) => {
        if (!form[key].trim()) {
          nextErrors[key] = required;
        }
      });
      if (!form.integrationNeeds.length) {
        nextErrors.integrationNeeds = required;
      }
    }

    if (!form.contactConsent) {
      nextErrors.contactConsent = required;
    }

    return nextErrors;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.websiteConfirm.trim()) {
      setStatus("blocked");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus("invalid");
      focusFirstInvalid();
      return;
    }

    setStatus("blocked");
  }

  const showDemo = needsDemoQualification(form.requestType);
  const showPartner = needsPartnerQualification(form.requestType);
  const showApi = form.requestType === "api";

  return (
    <ConversionShell
      mode="contact"
      kicker={copy.contact.kicker}
      title={copy.contact.title}
      body={copy.contact.body}
      benefits={copy.contact.benefits}
    >
      <form className="noki-conversion-card noki-contact-form" onSubmit={onSubmit} noValidate>
        <div className="noki-form-head">
          <p>{copy.contact.formTitle}</p>
          <span>{copy.contact.formBody}</span>
        </div>

        {status !== "idle" ? (
          <div className="noki-form-notice" data-tone={status} role="alert">
            <strong>{status === "invalid" ? local.invalid : local.submitBlocked}</strong>
            <span>{status === "invalid" ? local.invalid : copy.common.unavailable}</span>
          </div>
        ) : null}

        <div className="noki-honeypot" aria-hidden="true">
          <TextInput
            name="websiteConfirm"
            label={copy.common.honeypot}
            value={form.websiteConfirm}
            onChange={(value) => update("websiteConfirm", value)}
            autoComplete="off"
          />
        </div>

        <div className="noki-form-grid">
          <SelectInput
            name="requestType"
            label={copy.contact.requestType}
            value={form.requestType}
            onChange={(value) => update("requestType", value)}
            options={selectOptions.requestTypes}
            required
            error={errors.requestType}
            placeholder={copy.common.select}
          />
          <SelectInput
            name="preferredChannel"
            label={copy.contact.preferredChannel}
            value={form.preferredChannel}
            onChange={(value) => update("preferredChannel", value)}
            options={selectOptions.channels}
            required
            error={errors.preferredChannel}
            placeholder={copy.common.select}
          />
          <TextInput
            name="firstName"
            label={labelFor(FORM_LABELS.firstName, language)}
            value={form.firstName}
            onChange={(value) => update("firstName", value)}
            required
            error={errors.firstName}
            autoComplete="given-name"
          />
          <TextInput
            name="lastName"
            label={labelFor(FORM_LABELS.lastName, language)}
            value={form.lastName}
            onChange={(value) => update("lastName", value)}
            required
            error={errors.lastName}
            autoComplete="family-name"
          />
          <TextInput
            name="role"
            label={labelFor(FORM_LABELS.role, language)}
            value={form.role}
            onChange={(value) => update("role", value)}
            required
            error={errors.role}
            autoComplete="organization-title"
          />
          <TextInput
            name="email"
            label={labelFor(FORM_LABELS.email, language)}
            value={form.email}
            onChange={(value) => update("email", value)}
            required
            error={errors.email}
            type="email"
            inputMode="email"
            autoComplete="email"
          />
          <SelectInput
            name="countryCode"
            label={labelFor(FORM_LABELS.countryCode, language)}
            value={form.countryCode}
            onChange={(value) => update("countryCode", value)}
            options={selectOptions.countryCodes}
            required
            error={errors.countryCode}
            placeholder={copy.common.select}
          />
          <TextInput
            name="phone"
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
            name="country"
            label={labelFor(FORM_LABELS.country, language)}
            value={form.country}
            onChange={updateCountry}
            options={selectOptions.countries}
            required
            error={errors.country}
            placeholder={copy.common.select}
          />
          <TextInput
            name="city"
            label={labelFor(FORM_LABELS.city, language)}
            value={form.city}
            onChange={(value) => update("city", value)}
            required
            error={errors.city}
            autoComplete="address-level2"
          />
          <TextInput
            name="company"
            label={labelFor(FORM_LABELS.company, language)}
            value={form.company}
            onChange={(value) => update("company", value)}
            required
            error={errors.company}
            autoComplete="organization"
          />
          <TextInput
            name="website"
            label={labelFor(FORM_LABELS.website, language)}
            value={form.website}
            onChange={(value) => update("website", value)}
            error={errors.website}
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
          />
          <SelectInput
            name="preferredLanguage"
            label={copy.contact.preferredLanguage}
            value={form.preferredLanguage}
            onChange={(value) => update("preferredLanguage", value)}
            options={selectOptions.languages}
            required
            error={errors.preferredLanguage}
            placeholder={copy.common.select}
          />
        </div>

        <TextareaInput
          name="message"
          label={labelFor(FORM_LABELS.message, language)}
          value={form.message}
          onChange={(value) => update("message", value)}
          required
          error={errors.message}
        />

        {form.requestType === "merchant" ? (
          <div className="noki-form-inline-callout">
            <span>{local.merchantNudge}</span>
            <a href={localizedPath(language, "/register")}>{local.merchantLink}</a>
          </div>
        ) : null}

        {showDemo ? (
          <section className="noki-form-section" aria-label={local.demoGroup}>
            <h2>{local.demoGroup}</h2>
            <div className="noki-form-grid">
              <SelectInput
                name="monthlyOrders"
                label={labelFor(FORM_LABELS.monthlyOrders, language)}
                value={form.monthlyOrders}
                onChange={(value) => update("monthlyOrders", value)}
                options={selectOptions.monthlyOrders}
                required
                error={errors.monthlyOrders}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="codShare"
                label={labelFor(FORM_LABELS.codShare, language)}
                value={form.codShare}
                onChange={(value) => update("codShare", value)}
                options={selectOptions.codShare}
                required
                error={errors.codShare}
                placeholder={copy.common.select}
              />
              <TextInput
                name="averageBasket"
                label={labelFor(FORM_LABELS.averageBasket, language)}
                value={form.averageBasket}
                onChange={(value) => update("averageBasket", value)}
                inputMode="decimal"
              />
              <SelectInput
                name="currency"
                label={labelFor(FORM_LABELS.currency, language)}
                value={form.currency}
                onChange={(value) => update("currency", value)}
                options={selectOptions.currency}
                required
                error={errors.currency}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="deliveryModel"
                label={labelFor(FORM_LABELS.deliveryModel, language)}
                value={form.deliveryModel}
                onChange={(value) => update("deliveryModel", value)}
                options={selectOptions.deliveryModels}
                required
                error={errors.deliveryModel}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="timeline"
                label={labelFor(FORM_LABELS.timeline, language)}
                value={form.timeline}
                onChange={(value) => update("timeline", value)}
                options={selectOptions.timelines}
                required
                error={errors.timeline}
                placeholder={copy.common.select}
              />
            </div>
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.platforms, language)}
              name="platforms"
              options={selectOptions.platforms}
              values={form.platforms}
              onChange={(values) => update("platforms", values)}
              error={errors.platforms}
            />
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.servedCountries, language)}
              name="servedCountries"
              options={selectOptions.countries}
              values={form.servedCountries}
              onChange={(values) => update("servedCountries", values)}
              error={errors.servedCountries}
            />
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.painPoints, language)}
              name="painPoints"
              options={selectOptions.painPoints}
              values={form.painPoints}
              onChange={(values) => update("painPoints", values)}
              error={errors.painPoints}
            />
          </section>
        ) : null}

        {showPartner ? (
          <section className="noki-form-section" aria-label={local.partnerGroup}>
            <h2>{local.partnerGroup}</h2>
            <div className="noki-form-grid">
              <TextInput
                name="organizationType"
                label={labelFor(FORM_LABELS.organizationType, language)}
                value={form.organizationType}
                onChange={(value) => update("organizationType", value)}
                required
                error={errors.organizationType}
              />
              <TextInput
                name="zones"
                label={labelFor(FORM_LABELS.zones, language)}
                value={form.zones}
                onChange={(value) => update("zones", value)}
                required
                error={errors.zones}
                inputMode="numeric"
              />
              <SelectInput
                name="apiCapability"
                label={labelFor(FORM_LABELS.apiCapability, language)}
                value={form.apiCapability}
                onChange={(value) => update("apiCapability", value)}
                options={selectOptions.apiCapability}
                required
                error={errors.apiCapability}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="partnershipType"
                label={labelFor(FORM_LABELS.partnershipType, language)}
                value={form.partnershipType}
                onChange={(value) => update("partnershipType", value)}
                options={selectOptions.partnershipTypes}
                required
                error={errors.partnershipType}
                placeholder={copy.common.select}
              />
            </div>
            <TextareaInput
              name="services"
              label={labelFor(FORM_LABELS.services, language)}
              value={form.services}
              onChange={(value) => update("services", value)}
              required
              error={errors.services}
            />
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.coveredCountries, language)}
              name="coveredCountries"
              options={selectOptions.countries}
              values={form.coveredCountries}
              onChange={(values) => update("coveredCountries", values)}
              error={errors.coveredCountries}
            />
            <TextareaInput
              name="proposal"
              label={labelFor(FORM_LABELS.proposal, language)}
              value={form.proposal}
              onChange={(value) => update("proposal", value)}
              required
              error={errors.proposal}
            />
            <TextInput
              name="technicalContact"
              label={labelFor(FORM_LABELS.technicalContact, language)}
              value={form.technicalContact}
              onChange={(value) => update("technicalContact", value)}
              error={errors.technicalContact}
            />
          </section>
        ) : null}

        {showApi ? (
          <section className="noki-form-section" aria-label={local.apiGroup}>
            <h2>{local.apiGroup}</h2>
            <div className="noki-form-grid">
              <TextInput
                name="organizationType"
                label={labelFor(FORM_LABELS.platforms, language)}
                value={form.organizationType}
                onChange={(value) => update("organizationType", value)}
                required
                error={errors.organizationType}
              />
              <TextInput
                name="stack"
                label={labelFor(FORM_LABELS.stack, language)}
                value={form.stack}
                onChange={(value) => update("stack", value)}
              />
              <SelectInput
                name="environment"
                label={labelFor(FORM_LABELS.environment, language)}
                value={form.environment}
                onChange={(value) => update("environment", value)}
                options={selectOptions.environments}
                required
                error={errors.environment}
                placeholder={copy.common.select}
              />
              <SelectInput
                name="sandbox"
                label={labelFor(FORM_LABELS.sandbox, language)}
                value={form.sandbox}
                onChange={(value) => update("sandbox", value)}
                options={[
                  { value: "yes", label: local.sandboxYes },
                  { value: "no", label: local.sandboxNo },
                ]}
                required
                error={errors.sandbox}
                placeholder={copy.common.select}
              />
              <TextInput
                name="technicalContact"
                label={labelFor(FORM_LABELS.technicalContact, language)}
                value={form.technicalContact}
                onChange={(value) => update("technicalContact", value)}
                required
                error={errors.technicalContact}
              />
            </div>
            <CheckboxGroup
              legend={labelFor(FORM_LABELS.integrationNeeds, language)}
              name="integrationNeeds"
              options={selectOptions.integrationNeeds}
              values={form.integrationNeeds}
              onChange={(values) => update("integrationNeeds", values)}
              error={errors.integrationNeeds}
            />
            <TextareaInput
              name="technicalComment"
              label={local.technicalComment}
              value={form.technicalComment}
              onChange={(value) => update("technicalComment", value)}
            />
          </section>
        ) : null}

        <div className="noki-form-consent">
          <CheckboxField
            name="contactConsent"
            label={copy.common.consent}
            checked={form.contactConsent}
            onChange={(checked) => update("contactConsent", checked)}
            required
            error={errors.contactConsent}
          />
          <CheckboxField
            name="marketingConsent"
            label={copy.common.marketing}
            checked={form.marketingConsent}
            onChange={(checked) => update("marketingConsent", checked)}
          />
        </div>

        <div className="noki-form-actions">
          <button className="noki-form-submit" type="submit">
            {copy.contact.submit}
          </button>
        </div>
      </form>
    </ConversionShell>
  );
}
