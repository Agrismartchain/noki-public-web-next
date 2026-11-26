"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import {
  CheckboxField,
  SelectInput,
  TextareaInput,
  TextInput,
  focusFirstInvalid,
  isValidEmail,
} from "@/components/forms/NokiFormControls";
import { newIdempotencyKey, submitIntake } from "@/lib/intake/client";
import { buildLeadPayload } from "@/lib/intake/payloads";

import type { Language } from "./content";
import { CONVERSION_COPY, FORM_LABELS, PRIORITY_COUNTRIES, SUBMIT_COPY, labelFor } from "./conversionContent";
import { CHANNEL_CHOICES, choicesToOptions, countryOptions } from "./conversionOptions";
import { noticeBody, noticeTitle, type SubmitStatus } from "./submitNotice";
import { ConversionShell } from "./ConversionShell";
import { useSiteLanguage } from "./LanguageProvider";

type QuickLeadFormState = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  countryCode: string;
  country: string;
  city: string;
  company: string;
  preferredChannel: string;
  message: string;
  contactConsent: boolean;
  marketingConsent: boolean;
  websiteConfirm: string;
};

const INVALID_COPY = {
  fr: "Vérifiez les champs signalés avant d’envoyer la demande.",
  en: "Check the highlighted fields before sending the request.",
  ar: "راجع الحقول المحددة قبل إرسال الطلب.",
} satisfies Record<Language, string>;

function isPhone(value: string) {
  return /^[+\d\s().-]{7,24}$/.test(value.trim());
}

export type QuickLeadFormProps = {
  /** Kept within the real contract's requestType enum (noki-api
   * public-intake.constants.ts); none of these trigger the contract's
   * conditional qualification blocks (demo/commercial/merchant/logistics/
   * technology/api), so this short form never risks an upstream validation
   * mismatch. Each value is its own reliable category server-side -- never
   * inferred from `role` or any other free-text field. */
  requestType: "general" | "other" | "restaurant" | "supermarket" | "pharmacy" | "taxi_driver" | "courier" | "app_alert";
  /** metadata.page sent to the API, for routing/reporting on the backend. */
  page: string;
  roleLabel: string;
  roleDefault?: string;
  showCompany?: boolean;
  companyLabel?: string;
  messageLabel: string;
  messagePlaceholder?: string;
  messageDefault?: string;
  defaultCountry?: string;
  defaultCity?: string;
  submitLabel: string;
  title: string;
  body: string;
  formTitle?: string;
  formBody?: string;
  benefits?: string[];
  aside?: ReactNode;
  successExtra?: ReactNode;
};

export function QuickLeadForm({
  requestType,
  page,
  roleLabel,
  roleDefault = "",
  showCompany = false,
  companyLabel,
  messageLabel,
  messagePlaceholder,
  messageDefault = "",
  defaultCountry = "cg",
  defaultCity = "",
  submitLabel,
  title,
  body,
  formTitle,
  formBody,
  benefits,
  aside,
  successExtra,
}: QuickLeadFormProps) {
  const { language } = useSiteLanguage();
  const copy = CONVERSION_COPY[language];
  const submitCopy = SUBMIT_COPY[language];
  const invalid = INVALID_COPY[language];

  const countries = countryOptions(language);

  function createEmptyForm(): QuickLeadFormState {
    const country = PRIORITY_COUNTRIES.find((item) => item.value === defaultCountry);
    return {
      firstName: "",
      lastName: "",
      role: roleDefault,
      email: "",
      phone: "",
      countryCode: country?.code ?? "",
      country: defaultCountry,
      city: defaultCity,
      company: "",
      preferredChannel: "",
      message: messageDefault,
      contactConsent: false,
      marketingConsent: false,
      websiteConfirm: "",
    };
  }

  const [form, setForm] = useState<QuickLeadFormState>(createEmptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof QuickLeadFormState, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [idempotencyKey, setIdempotencyKey] = useState(newIdempotencyKey);

  function update<K extends keyof QuickLeadFormState>(key: K, value: QuickLeadFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  }

  function updateCountry(value: string) {
    const country = PRIORITY_COUNTRIES.find((item) => item.value === value);
    setForm((current) => ({ ...current, country: value, countryCode: country?.code || current.countryCode }));
    setErrors((current) => ({ ...current, country: undefined }));
    setStatus("idle");
  }

  function validate() {
    const required = copy.common.required;
    const next: Partial<Record<keyof QuickLeadFormState, string>> = {};

    (
      ["firstName", "lastName", "role", "email", "phone", "country", "city", "preferredChannel", "message"] as const
    ).forEach(
      (key) => {
        if (!form[key].trim()) {
          next[key] = required;
        }
      },
    );

    if (showCompany && !form.company.trim()) {
      next.company = required;
    }

    if (form.email.trim() && !isValidEmail(form.email)) {
      next.email = copy.common.invalidEmail;
    }

    if (form.phone.trim() && !isPhone(form.phone)) {
      next.phone = copy.common.invalidPhone;
    }

    if (!form.contactConsent) {
      next.contactConsent = required;
    }

    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") return;

    if (form.websiteConfirm.trim()) {
      setStatus("unavailable");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus("invalid");
      focusFirstInvalid();
      return;
    }

    setStatus("sending");
    const payload = buildLeadPayload(
      {
        requestType,
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
        email: form.email,
        phone: form.phone,
        countryCode: form.countryCode,
        country: form.country,
        city: form.city,
        company: form.company,
        website: "",
        preferredChannel: form.preferredChannel,
        preferredLanguage: language,
        message: form.message,
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
        contactConsent: form.contactConsent,
        marketingConsent: form.marketingConsent,
        websiteConfirm: form.websiteConfirm,
      },
      language,
      page,
    );

    const outcome = await submitIntake("lead", payload, idempotencyKey);
    setStatus(outcome);
    if (outcome === "sent") {
      setForm(createEmptyForm());
      setIdempotencyKey(newIdempotencyKey());
    }
  }

  return (
    <ConversionShell mode="quick-lead" title={title} body={body} benefits={benefits} aside={aside}>
      <form className="noki-conversion-card noki-quick-lead-form" onSubmit={onSubmit} noValidate>
        {formTitle ? (
          <div className="noki-form-head">
            <p>{formTitle}</p>
            {formBody ? <span>{formBody}</span> : null}
          </div>
        ) : null}

        {status !== "idle" ? (
          <div
            className="noki-form-notice"
            data-tone={status === "sent" ? "success" : status}
            role={status === "sent" ? "status" : "alert"}
          >
            <strong>{noticeTitle(status, submitCopy, invalid)}</strong>
            <span>{noticeBody(status, submitCopy, invalid)}</span>
            {status === "sent" && successExtra ? <div className="noki-form-notice-extra">{successExtra}</div> : null}
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
            label={roleLabel}
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
            options={countries}
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
          {showCompany ? (
            <TextInput
              name="company"
              label={companyLabel ?? labelFor(FORM_LABELS.company, language)}
              value={form.company}
              onChange={(value) => update("company", value)}
              required
              error={errors.company}
              autoComplete="organization"
            />
          ) : null}
          <SelectInput
            name="preferredChannel"
            label={copy.contact.preferredChannel}
            value={form.preferredChannel}
            onChange={(value) => update("preferredChannel", value)}
            options={choicesToOptions(CHANNEL_CHOICES, language)}
            required
            error={errors.preferredChannel}
            placeholder={copy.common.select}
          />
        </div>

        <TextareaInput
          name="message"
          label={messageLabel}
          value={form.message}
          onChange={(value) => update("message", value)}
          required
          error={errors.message}
          placeholder={messagePlaceholder}
        />

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
            {submitLabel}
          </button>
        </div>
      </form>
    </ConversionShell>
  );
}
