"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";

import { CheckboxField, TextInput, focusFirstInvalid, isValidEmail } from "@/components/forms/NokiFormControls";

import { LANGUAGES } from "./content";
import { CONVERSION_COPY } from "./conversionContent";
import { useSiteLanguage } from "./LanguageProvider";

const LOGIN_LOCAL_COPY = {
  fr: {
    invalid: "Renseignez les champs requis avant de continuer.",
    eyebrow: "Espace marchand",
  },
  en: {
    invalid: "Fill the required fields before continuing.",
    eyebrow: "Merchant space",
  },
  ar: {
    invalid: "أكمل الحقول المطلوبة قبل المتابعة.",
    eyebrow: "مساحة التاجر",
  },
};

export function LoginForm() {
  const { language, direction, setLanguage } = useSiteLanguage();
  const copy = CONVERSION_COPY[language];
  const local = LOGIN_LOCAL_COPY[language];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [websiteConfirm, setWebsiteConfirm] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<"idle" | "invalid" | "blocked">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (websiteConfirm.trim()) {
      setStatus("blocked");
      return;
    }

    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = copy.common.required;
    } else if (!isValidEmail(email)) {
      nextErrors.email = copy.common.invalidEmail;
    }

    if (!password.trim()) {
      nextErrors.password = copy.common.required;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus("invalid");
      focusFirstInvalid();
      return;
    }

    setStatus("blocked");
  }

  return (
    <main className="noki-login-page" dir={direction}>
      <section className="noki-login-visual" aria-label={local.eyebrow}>
        <div className="noki-login-visual-glow" aria-hidden="true" />
        <div className="noki-login-brand-block">
          <Image src="/assets/brand/noki-logo-yellow.png" alt="NOKI Service" width={86} height={86} priority unoptimized />
          <span>{local.eyebrow}</span>
          <h1>{copy.login.title}</h1>
          <p>{copy.login.body}</p>
        </div>
      </section>

      <section className="noki-login-panel" aria-labelledby="noki-login-title">
        <header className="noki-login-topbar">
          <Link href="/">{copy.common.backHome}</Link>
          <div className="noki-lang-switch" data-lang-switch="" aria-label={copy.common.language}>
            {LANGUAGES.map((lang) => (
              <button
                className="noki-lang-btn"
                data-active={language === lang}
                type="button"
                key={lang}
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <form className="noki-login-card" onSubmit={onSubmit} noValidate>
          <div className="noki-login-card-logo">
            <Image src="/assets/brand/noki-logo-yellow.png" alt="NOKI Service" width={46} height={46} unoptimized />
          </div>
          <h2 id="noki-login-title">{copy.login.cardTitle}</h2>
          <p>{copy.login.cardBody}</p>

          {status !== "idle" ? (
            <div className="noki-form-notice" data-tone={status} role="alert">
              <strong>{status === "invalid" ? local.invalid : copy.login.unavailable}</strong>
              <span>{status === "invalid" ? local.invalid : copy.login.unavailable}</span>
            </div>
          ) : null}

          <div className="noki-honeypot" aria-hidden="true">
            <TextInput
              name="loginWebsiteConfirm"
              label={copy.common.honeypot}
              value={websiteConfirm}
              onChange={setWebsiteConfirm}
              autoComplete="off"
            />
          </div>

          <TextInput
            name="loginEmail"
            label={copy.login.email}
            value={email}
            onChange={(value) => {
              setEmail(value);
              setErrors((current) => ({ ...current, email: undefined }));
              setStatus("idle");
            }}
            required
            error={errors.email}
            type="email"
            inputMode="email"
            autoComplete="email"
          />
          <TextInput
            name="loginPassword"
            label={copy.login.password}
            value={password}
            onChange={(value) => {
              setPassword(value);
              setErrors((current) => ({ ...current, password: undefined }));
              setStatus("idle");
            }}
            required
            error={errors.password}
            type="password"
            autoComplete="current-password"
          />
          <CheckboxField name="loginRemember" label={copy.login.remember} checked={remember} onChange={setRemember} />

          <button className="noki-form-submit" type="submit">
            {copy.login.submit}
          </button>

          <div className="noki-login-links">
            <Link href="/register">{copy.login.register}</Link>
            <Link href="/contact">{copy.login.contact}</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
