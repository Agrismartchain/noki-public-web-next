"use client";

import { useEffect, useRef } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type BenefitsGridProps = {
  language: Language;
};

const BENEFIT_ICONS = ["eye", "layers", "lock", "link", "shield", "trend"] as const;

type BenefitIconName = (typeof BENEFIT_ICONS)[number];

function BenefitIcon({ icon }: { icon: BenefitIconName }) {
  if (icon === "eye") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (icon === "layers") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    );
  }

  if (icon === "lock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }

  if (icon === "link") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M9 15l6-6" />
        <path d="M8 8l-2 2a4 4 0 0 0 6 6l2-2" />
        <path d="M16 16l2-2a4 4 0 0 0-6-6l-2 2" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function BenefitsGrid({ language }: BenefitsGridProps) {
  const labels = SITE_COPY[language].benefits;
  const direction = language === "ar" ? "rtl" : "ltr";
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
    <section className="noki-benefits" ref={sectionRef} aria-labelledby="noki-benefits-title" dir={direction}>
      <div className="noki-benefits-intro" data-reveal="">
        <h6>{labels.kicker}</h6>
        <h2 id="noki-benefits-title">{labels.title}</h2>
      </div>

      <div className="noki-benefits-grid" role="list" aria-label={labels.kicker}>
        {labels.items.map((benefit, index) => (
          <article className="noki-benefit-card" role="listitem" data-reveal="" key={benefit.title}>
            <div className="noki-benefit-icon" aria-hidden="true">
              <BenefitIcon icon={BENEFIT_ICONS[index]} />
            </div>
            <h3>{benefit.title}</h3>
            <p>{benefit.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
