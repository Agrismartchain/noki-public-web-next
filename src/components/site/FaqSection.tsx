"use client";

import { useEffect, useId, useRef, useState } from "react";

import { localizedPath } from "@/lib/seo/i18n";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type FaqSectionProps = {
  language: Language;
};

export function FaqSection({ language }: FaqSectionProps) {
  const labels = SITE_COPY[language].faq;
  const direction = language === "ar" ? "rtl" : "ltr";
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const baseId = useId();

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
    <section className="noki-faq" id="faq" ref={sectionRef} aria-labelledby="noki-faq-title" dir={direction}>
      <div className="noki-faq-intro" data-reveal="">
        <span>{labels.kicker}</span>
        <h2 id="noki-faq-title">
          {labels.title}
          <br />
          <span>{labels.titleAccent}</span>
        </h2>
        <p>{labels.body}</p>
      </div>

      <div className="noki-faq-list" data-reveal="">
        {labels.items.map((item, index) => {
          const open = openIndex === index;
          const panelId = `${baseId}-faq-panel-${index}`;
          const buttonId = `${baseId}-faq-button-${index}`;

          return (
            <article className="noki-faq-item" data-open={open} key={item.q}>
              <button
                className="noki-faq-trigger"
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
              >
                <span className="noki-faq-number">Q{index + 1}</span>
                <span className="noki-faq-question">{item.q}</span>
                <span className="noki-faq-chevron" aria-hidden="true">
                  ▾
                </span>
              </button>

              <div
                className="noki-faq-panel"
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
              >
                {item.a}
              </div>
            </article>
          );
        })}

        <div className="noki-faq-more">
          <span>{labels.more}</span>
          <a href={localizedPath(language, "/contact")}>{labels.talk}</a>
        </div>
      </div>
    </section>
  );
}
