"use client";

import { useEffect, useRef } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type CycleTimelineProps = {
  language: Language;
};

const CYCLE_ICONS = ["orders", "check", "box", "layers", "route", "truck", "cash", "wallet"] as const;

type CycleIconName = (typeof CYCLE_ICONS)[number];

function CycleIcon({ icon }: { icon: CycleIconName }) {
  if (icon === "orders") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M4 7h16M4 12h16M4 17h10" />
      </svg>
    );
  }

  if (icon === "check") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }

  if (icon === "box") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M21 8l-9-5-9 5 9 5 9-5z" />
        <path d="M3 8v8l9 5 9-5V8" />
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

  if (icon === "route") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="5" r="2" />
        <path d="M8 19h7a4 4 0 0 0 4-4V9" />
      </svg>
    );
  }

  if (icon === "truck") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M3 16V6h11v10" />
        <path d="M14 10h4l3 3v3h-7" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="18" cy="18" r="1.8" />
      </svg>
    );
  }

  if (icon === "cash") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <path d="M3 7h15a3 3 0 0 1 3 3v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      <path d="M16 13h3" />
    </svg>
  );
}

export function CycleTimeline({ language }: CycleTimelineProps) {
  const labels = SITE_COPY[language].cycle;
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
    <section className="noki-cycle" id="cycle" ref={sectionRef} aria-labelledby="noki-cycle-title">
      <div className="noki-cycle-inner">
        <div className="noki-cycle-intro" data-reveal="">
          <h6>{labels.kicker}</h6>
          <h2 id="noki-cycle-title">{labels.title}</h2>
          <p>{labels.body}</p>
        </div>

        <div className="noki-cycle-timeline" data-reveal="">
          <svg
            className="noki-cycle-line"
            width="100%"
            height="6"
            preserveAspectRatio="none"
            viewBox="0 0 1200 6"
            aria-hidden="true"
          >
            <line x1="20" y1="3" x2="1180" y2="3" stroke="var(--color-divider)" strokeWidth="2" />
            <line
              className="noki-cycle-line-progress"
              x1="20"
              y1="3"
              x2="1180"
              y2="3"
              stroke="url(#cycleGrad)"
              strokeWidth="2"
              strokeDasharray="1200"
              strokeDashoffset="1200"
            />
            <defs>
              <linearGradient id="cycleGrad">
                <stop offset="0%" stopColor="var(--color-cyan)" />
                <stop offset="100%" stopColor="var(--color-accent)" />
              </linearGradient>
            </defs>
          </svg>

          <ol className="noki-cycle-steps">
            {labels.steps.map((step, index) => (
              <li className="noki-cycle-step" key={step}>
                <div className="noki-cycle-orb">
                  <span className="noki-cycle-pulse" style={{ animationDelay: `${index * 0.2}s` }} aria-hidden="true" />
                  <span className="noki-cycle-icon" aria-hidden="true">
                    <CycleIcon icon={CYCLE_ICONS[index]} />
                  </span>
                </div>
                <div className="noki-cycle-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="noki-cycle-label">{step}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
