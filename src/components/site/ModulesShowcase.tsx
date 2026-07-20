"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type ModulesShowcaseProps = {
  language: Language;
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function ModulesShowcase({ language }: ModulesShowcaseProps) {
  const labels = SITE_COPY[language].modules;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const modulesCount = labels.data.length;

  const leftCards = useMemo(
    () =>
      labels.data
        .map((module, index) => ({ ...module, index }))
        .filter((module) => module.index >= Math.max(0, activeIndex - 2) && module.index <= activeIndex),
    [activeIndex, labels.data],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % modulesCount);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [modulesCount]);

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
    <section className="noki-modules" id="modules" ref={sectionRef} aria-labelledby="noki-modules-title">
      <div className="noki-modules-intro" data-reveal="">
        <h6>{labels.kicker}</h6>
        <h2 id="noki-modules-title">{labels.title}</h2>
        <p>{labels.body}</p>
      </div>

      <div className="noki-modules-grid" data-reveal="">
        <div className="noki-modules-left">
          {leftCards.map((card) => {
            const done = card.index < activeIndex;
            const active = card.index === activeIndex;

            return (
              <button
                className="noki-module-card"
                data-active={active}
                data-done={done}
                type="button"
                key={card.title}
                onClick={() => setActiveIndex(card.index)}
                aria-pressed={active}
              >
                <span className="noki-module-card-head">
                  <span className="noki-module-badge">{done ? <CheckIcon /> : card.index + 1}</span>
                  <span className="noki-module-card-title">{card.title}</span>
                </span>

                {active ? (
                  <>
                    <span className="noki-module-card-desc">{card.desc}</span>
                    <span className="noki-module-bullets">
                      {card.bullets.map((bullet) => (
                        <span className="noki-module-bullet" key={bullet}>
                          <span aria-hidden="true" />
                          {bullet}
                        </span>
                      ))}
                    </span>
                  </>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="noki-modules-panel">
          <div className="noki-modules-progress-track">
            <div className="noki-modules-progress-fill" style={{ width: `${((activeIndex + 1) / modulesCount) * 100}%` }} />
          </div>

          <div className="noki-modules-panel-head">
            <span className="noki-modules-building">
              <span aria-hidden="true" />
              {labels.building}
            </span>
            <span className="noki-modules-fraction">
              {activeIndex + 1}/{modulesCount}
            </span>
          </div>

          <div className="noki-modules-rows">
            {labels.data.map((module, index) => {
              const active = index === activeIndex;
              const ready = index < activeIndex;
              const status = ready ? labels.statusReady : active ? labels.statusProgress : labels.statusQueued;

              return (
                <button
                  className="noki-modules-row"
                  data-active={active}
                  data-ready={ready}
                  type="button"
                  key={module.title}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={active}
                >
                  <span>{module.title}</span>
                  <span>{status}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="noki-modules-cta-wrap" data-reveal="">
        <a className="noki-modules-cta" href="#contact">
          {labels.ctaFinal}
        </a>
      </div>
    </section>
  );
}
