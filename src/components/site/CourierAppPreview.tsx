"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type CourierAppPreviewProps = {
  language: Language;
};

const BENEFIT_ICONS = ["route", "wallet", "eye", "check"] as const;

type BenefitIconName = (typeof BENEFIT_ICONS)[number];

function CourierIcon({ icon }: { icon: BenefitIconName }) {
  if (icon === "route") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="5" r="2" />
        <path d="M8 19h7a4 4 0 0 0 4-4V9" />
      </svg>
    );
  }

  if (icon === "wallet") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M3 7h15a3 3 0 0 1 3 3v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        <path d="M16 13h3" />
      </svg>
    );
  }

  if (icon === "eye") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function CourierAppPreview({ language }: CourierAppPreviewProps) {
  const labels = SITE_COPY[language].courier;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const revealTargets = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
          }
        });
      },
      { threshold: 0.15 },
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="noki-courier" ref={sectionRef} aria-labelledby="noki-courier-title">
      <div className="noki-courier-phone-stage" data-reveal="">
        <div className="noki-courier-phone-glow" aria-hidden="true" />
        <div className="noki-courier-phone">
          <div className="noki-courier-notch" aria-hidden="true" />
          <div className="noki-courier-screen">
            <div className="noki-courier-logo-wrap">
              <div className="noki-courier-logo">
                <Image src="/assets/brand/noki-logo-yellow.png" alt="NOKI" width={56} height={56} priority={false} />
              </div>
            </div>

            <div className="noki-courier-app-head">
              <div className="noki-courier-app-name">{labels.appName}</div>
              <span className="noki-courier-prep">{labels.prep}</span>
            </div>

            <div className="noki-courier-card">
              <div className="noki-courier-label">{labels.missionLabel}</div>
              <div className="noki-courier-value noki-courier-value-spaced">{labels.missionText}</div>
              <div className="noki-courier-progress-track">
                <div className="noki-courier-progress-fill" />
              </div>
            </div>

            <div className="noki-courier-card noki-courier-cod-card">
              <div>
                <div className="noki-courier-label">{labels.codLabel}</div>
                <div className="noki-courier-value">{labels.codText}</div>
              </div>
              <div className="noki-courier-wallet" aria-hidden="true">
                <CourierIcon icon="wallet" />
              </div>
            </div>

            <div className="noki-courier-card">
              <div className="noki-courier-label noki-courier-incident-label">{labels.incidentLabel}</div>
              <div className="noki-courier-tags">
                <span>{labels.incidentTag1}</span>
                <span>{labels.incidentTag2}</span>
              </div>
            </div>

            <div className="noki-courier-confirm">{labels.confirmSent}</div>
          </div>
        </div>
      </div>

      <div className="noki-courier-copy" data-reveal="">
        <h6>{labels.kicker}</h6>
        <h2 id="noki-courier-title">{labels.title}</h2>
        <p>{labels.body}</p>

        <div className="noki-courier-benefits">
          {labels.benefits.map((benefit, index) => (
            <div className="noki-courier-benefit" key={benefit}>
              <div className="noki-courier-benefit-icon" aria-hidden="true">
                <CourierIcon icon={BENEFIT_ICONS[index]} />
              </div>
              <div>{benefit}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
