"use client";

import Image from "next/image";
import Link from "next/link";
import { localizedPath } from "@/lib/seo/i18n";

import { LANGUAGES } from "./content";
import { CONVERSION_COPY } from "./conversionContent";
import { useSiteLanguage } from "./LanguageProvider";

const LOGIN_LOCAL_COPY = {
  fr: {
    portalBody: "Vous serez redirigé vers le portail marchand NOKI pour vous authentifier.",
    eyebrow: "Espace marchand",
  },
  en: {
    portalBody: "You will be redirected to the NOKI merchant portal to sign in.",
    eyebrow: "Merchant space",
  },
  ar: {
    portalBody: "ستتم إعادة توجيهك إلى بوابة التاجر في NOKI لتسجيل الدخول.",
    eyebrow: "مساحة التاجر",
  },
};

export function LoginForm({ portalUrl }: { portalUrl: string | null }) {
  const { language, direction, setLanguage } = useSiteLanguage();
  const copy = CONVERSION_COPY[language];
  const local = LOGIN_LOCAL_COPY[language];
  const homeHref = localizedPath(language);
  const registerHref = localizedPath(language, "/register");
  const contactHref = localizedPath(language, "/contact");
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
          <Link href={homeHref}>{copy.common.backHome}</Link>
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

        <div className="noki-login-card">
          <div className="noki-login-card-logo">
            <Image src="/assets/brand/noki-logo-yellow.png" alt="NOKI Service" width={46} height={46} unoptimized />
          </div>
          <h2 id="noki-login-title">{copy.login.cardTitle}</h2>
          {portalUrl ? (
            <>
              <p>{local.portalBody}</p>
              <a className="noki-form-submit" href={portalUrl} rel="noopener">
                {copy.login.submit}
              </a>
            </>
          ) : (
            <>
              <p>{copy.login.cardBody}</p>
              <div className="noki-form-notice" data-tone="invalid" role="status">
                <strong>{copy.login.unavailable}</strong>
              </div>
            </>
          )}

          <div className="noki-login-links">
            <Link href={registerHref}>{copy.login.register}</Link>
            <Link href={contactHref}>{copy.login.contact}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
