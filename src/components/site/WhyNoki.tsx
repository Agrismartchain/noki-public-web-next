"use client";

import { useEffect, useId, useRef } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type WhyNokiProps = {
  language: Language;
};

const FEATURE_META = [
  {
    icon: "layers",
    bg: "rgba(63, 212, 255, 0.12)",
    color: "var(--color-cyan)",
  },
  {
    icon: "stock",
    bg: "rgba(126, 227, 168, 0.12)",
    color: "#7ee3a8",
  },
  {
    icon: "shield",
    bg: "rgba(255, 213, 0, 0.12)",
    color: "var(--color-accent-300)",
  },
] as const;

const LEGEND_COLORS = ["var(--color-cyan)", "#7ee3a8", "var(--color-accent)", "#ffb800"] as const;

function FeatureIcon({ icon }: { icon: (typeof FEATURE_META)[number]["icon"] }) {
  if (icon === "layers") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    );
  }

  if (icon === "stock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 7v10l9 4 9-4V7" />
        <path d="M12 11v10" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
    </svg>
  );
}

export function WhyNoki({ language }: WhyNokiProps) {
  const labels = SITE_COPY[language].why;
  const sectionRef = useRef<HTMLElement>(null);
  const gradientId = useId();

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
    <section className="noki-why" ref={sectionRef} aria-labelledby="noki-why-title">
      <div className="noki-why-intro" data-reveal="">
        <span className="noki-why-kicker">{labels.kicker}</span>
        <h2 className="noki-why-title" id="noki-why-title">
          {labels.title}
          <br />
          <span>{labels.titleAccent}</span>
        </h2>
        <p className="noki-why-body">{labels.body}</p>
      </div>

      <div className="noki-why-grid">
        <div className="noki-why-features" data-reveal="">
          {labels.features.map((feature, index) => {
            const meta = FEATURE_META[index];

            return (
              <div className="noki-why-feature" key={feature.title}>
                <div className="noki-why-feature-icon" style={{ background: meta.bg, color: meta.color }}>
                  <FeatureIcon icon={meta.icon} />
                </div>
                <div>
                  <h3 className="noki-why-feature-title">{feature.title}</h3>
                  <p className="noki-why-feature-desc">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="noki-why-card" data-reveal="">
          <div className="noki-why-badge">{labels.badge}</div>

          <div className="noki-why-ring-row">
            <svg className="noki-why-ring" width="128" height="128" viewBox="0 0 128 128" aria-hidden="true">
              <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="10" />
              <circle
                className="noki-ring-fill"
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="339.3"
                strokeDashoffset="339.3"
              />
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-cyan)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="noki-why-ring-center">
              <div>
                4<span>/4</span>
              </div>
              <p>{labels.ringCenter}</p>
            </div>

            <div className="noki-why-legend">
              {labels.ringLegend.map((legend, index) => (
                <div className="noki-why-legend-item" key={legend}>
                  <span style={{ background: LEGEND_COLORS[index] }} />
                  {legend}
                </div>
              ))}
            </div>
          </div>

          <div className="noki-why-bars">
            <div className="noki-why-bar-title">{labels.barTitle}</div>
            <div className="noki-why-bar-stack">
              <div>
                <div className="noki-why-bar-label">
                  <span>{labels.without}</span>
                  <span>{labels.withoutStat}</span>
                </div>
                <div className="noki-why-bar-track">
                  <div className="noki-bar-fill-a" />
                </div>
              </div>
              <div>
                <div className="noki-why-bar-label">
                  <span>{labels.withLabel}</span>
                  <span>{labels.withStat}</span>
                </div>
                <div className="noki-why-bar-track">
                  <div className="noki-bar-fill-b" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
