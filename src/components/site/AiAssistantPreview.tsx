"use client";

import { useEffect, useRef } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type AiAssistantPreviewProps = {
  language: Language;
};

const QUEUE_ICONS = ["gauge", "check", "eye", "bolt"] as const;

const STATUS_META = [
  { background: "rgba(255,213,0,.12)", color: "var(--color-accent-300)" },
  { background: "rgba(63,212,255,.12)", color: "var(--color-cyan)" },
  { background: "rgba(255,120,120,.12)", color: "#ff9a9a" },
  { background: "rgba(255,255,255,.06)", color: "rgba(238,241,250,.6)" },
] as const;

type QueueIconName = (typeof QUEUE_ICONS)[number];

function QueueIcon({ icon }: { icon: QueueIconName }) {
  if (icon === "gauge") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M4 15a8 8 0 1 1 16 0" />
        <path d="M12 15l4-5" />
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
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

export function AiAssistantPreview({ language }: AiAssistantPreviewProps) {
  const labels = SITE_COPY[language].ia;
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
    <section className="noki-ai" id="ia" ref={sectionRef} aria-labelledby="noki-ai-title">
      <div className="noki-ai-intro" data-reveal="">
        <h6>{labels.kicker}</h6>
        <h2 id="noki-ai-title">{labels.title}</h2>
        <p>{labels.body}</p>
      </div>

      <div className="noki-ai-panel" data-reveal="">
        <div className="noki-ai-glow" aria-hidden="true" />
        <div className="noki-ai-grid">
          <div className="noki-ai-queue">
            <div className="noki-ai-queue-head">
              <div className="noki-ai-panel-title">{labels.queueTitle}</div>
              <span className="noki-ai-supervised">{labels.supervised}</span>
            </div>

            <ul className="noki-ai-queue-list">
              {labels.queue.map((item, index) => (
                <li className="noki-ai-queue-item" key={item.title}>
                  <span className="noki-ai-icon" aria-hidden="true">
                    <QueueIcon icon={QUEUE_ICONS[index]} />
                  </span>
                  <span className="noki-ai-copy">
                    <span className="noki-ai-queue-title">{item.title}</span>
                    <span className="noki-ai-queue-detail">{item.detail}</span>
                  </span>
                  <span
                    className="noki-ai-status"
                    style={{
                      background: STATUS_META[index].background,
                      color: STATUS_META[index].color,
                    }}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="noki-ai-supervision">
            <div className="noki-ai-panel-title noki-ai-supervision-title">{labels.supervisionTitle}</div>
            <ul className="noki-ai-supervision-list">
              {labels.supervision.map((item) => (
                <li className="noki-ai-supervision-item" key={item.title}>
                  <span className="noki-ai-supervision-dot" aria-hidden="true" />
                  <span className="noki-ai-supervision-text">
                    <strong>{item.title}</strong>
                    {" — "}
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
            <div className="noki-ai-disclaimer">{labels.disclaimer}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
