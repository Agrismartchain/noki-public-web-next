"use client";

import { useEffect, useRef } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type FinalCtaProps = {
  language: Language;
};

export function FinalCta({ language }: FinalCtaProps) {
  const labels = SITE_COPY[language].ctaFinal;
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
    <section className="noki-final-cta" id="contact" ref={sectionRef} aria-labelledby="noki-final-cta-title" dir={direction}>
      <div className="noki-final-cta-card" data-reveal="">
        <div className="noki-final-cta-glow-a" aria-hidden="true" />
        <div className="noki-final-cta-glow-b" aria-hidden="true" />
        <h2 id="noki-final-cta-title">{labels.title}</h2>
        <p>{labels.body}</p>
        <div className="noki-final-cta-actions">
          <a className="noki-final-cta-primary" href="/register">
            {labels.cta1}
          </a>
          <a className="noki-final-cta-secondary" href="/contact">
            {labels.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}
