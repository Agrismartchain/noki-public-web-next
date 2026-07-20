"use client";

import { useEffect, useRef } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type SecurityGovernanceProps = {
  language: Language;
};

const GOVERNANCE_ICONS = ["users", "lock", "scroll", "shield"] as const;

type GovernanceIconName = (typeof GOVERNANCE_ICONS)[number];

function GovernanceIcon({ icon }: { icon: GovernanceIconName }) {
  if (icon === "users") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
        <circle cx="18" cy="8" r="2.6" />
        <path d="M22 20c0-2.6-1.8-4.6-4-5.4" />
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

  if (icon === "scroll") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
    </svg>
  );
}

export function SecurityGovernance({ language }: SecurityGovernanceProps) {
  const labels = SITE_COPY[language].security;
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
    <section className="noki-security" id="securite" ref={sectionRef} aria-labelledby="noki-security-title">
      <div className="noki-security-inner">
        <div className="noki-security-copy" data-reveal="">
          <h6>{labels.kicker}</h6>
          <h2 id="noki-security-title">{labels.title}</h2>
          <p>{labels.body}</p>

          <div className="noki-security-items">
            {labels.items.map((item, index) => (
              <div className="noki-security-item" key={item}>
                <div className="noki-security-item-icon" aria-hidden="true">
                  <GovernanceIcon icon={GOVERNANCE_ICONS[index]} />
                </div>
                <div className="noki-security-item-title">{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="noki-security-log" data-reveal="">
          <div className="noki-security-log-head">
            <div className="noki-security-log-title">{labels.logTitle}</div>
            <span>{labels.preview}</span>
          </div>

          <div className="noki-security-log-list">
            {labels.log.map((entry) => (
              <div className="noki-security-log-row" key={`${entry.action}-${entry.role}`}>
                <div className="noki-security-log-dot" aria-hidden="true" />
                <div className="noki-security-log-action">{entry.action}</div>
                <div className="noki-security-log-role">{entry.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
