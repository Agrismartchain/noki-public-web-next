"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type MobileFriendlySectionProps = {
  language: Language;
};

const FEATURE_ICONS = ["bolt", "trend", "stock", "check"] as const;
const CHART_BARS = [40, 60, 50, 75, 65, 85] as const;

type FeatureIconName = (typeof FEATURE_ICONS)[number];

function MobileFeatureIcon({ icon }: { icon: FeatureIconName }) {
  if (icon === "bolt") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
      </svg>
    );
  }

  if (icon === "trend") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    );
  }

  if (icon === "stock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 12l9 4 9-4" />
        <path d="M3 17l9 4 9-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function MobileFriendlySection({ language }: MobileFriendlySectionProps) {
  const labels = SITE_COPY[language].mobile;
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
    <section className="noki-mobile-friendly" ref={sectionRef} aria-labelledby="noki-mobile-title" dir={direction}>
      <div className="noki-mobile-copy" data-reveal="">
        <span>{labels.kicker}</span>
        <h2 id="noki-mobile-title">
          {labels.title}
          <br />
          <span>{labels.titleAccent}</span>
        </h2>
        <p>{labels.body}</p>

        <div className="noki-mobile-features">
          {labels.features.map((feature, index) => (
            <div className="noki-mobile-feature" key={feature}>
              <div aria-hidden="true">
                <MobileFeatureIcon icon={FEATURE_ICONS[index]} />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="noki-mobile-stage" data-reveal="">
        <div className="noki-mobile-stage-glow" aria-hidden="true" />
        <div className="noki-mobile-phone">
          <div className="noki-mobile-notch" aria-hidden="true" />
          <div className="noki-mobile-screen">
            <div className="noki-mobile-logo-wrap">
              <div className="noki-mobile-logo">
                <Image src="/assets/brand/noki-logo-yellow.png" alt="NOKI" width={44} height={44} />
              </div>
            </div>

            <div className="noki-mobile-stat-card">
              <div className="noki-mobile-label">{labels.dailyFigure}</div>
              <div className="noki-mobile-amount">
                $2,840 <span>+47</span>
              </div>
              <div className="noki-mobile-chart" aria-hidden="true">
                {CHART_BARS.map((height) => (
                  <span style={{ height: `${height}%` }} key={height} />
                ))}
              </div>
            </div>

            <div className="noki-mobile-row-card">
              <div>
                <div className="noki-mobile-label">{labels.shipped}</div>
                <div className="noki-mobile-row-value">{labels.shippedSub}</div>
              </div>
              <span aria-hidden="true">✓</span>
            </div>

            <div className="noki-mobile-order-card">
              <div>
                <div className="noki-mobile-order-label">{labels.newOrder}</div>
                <div className="noki-mobile-row-value">{labels.newOrderSub}</div>
              </div>
            </div>

            <div className="noki-mobile-preview">{labels.preview}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
