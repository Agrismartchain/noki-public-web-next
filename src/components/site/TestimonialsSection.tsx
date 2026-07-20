"use client";

import { useEffect, useRef } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type TestimonialsSectionProps = {
  language: Language;
};

const FEATURED_STARS = [1, 2, 3, 4, 5] as const;
const SECONDARY_STAR_COUNTS = [5, 4] as const;
const SECONDARY_AVATAR_BACKGROUNDS = [
  "linear-gradient(135deg,#ffb800,#FFD500)",
  "linear-gradient(135deg,#7ee3a8,#3fd4ff)",
] as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Stars({ count, className }: { count: number; className: string }) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  );
}

export function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const labels = SITE_COPY[language].testimonials;
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
    <section className="noki-testimonials" ref={sectionRef} aria-labelledby="noki-testimonials-title" dir={direction}>
      <div className="noki-testimonials-intro" data-reveal="">
        <span>{labels.kicker}</span>
        <h2 id="noki-testimonials-title">
          {labels.title}
          <br />
          <span>{labels.titleAccent}</span>
        </h2>
        <p>{labels.body}</p>
      </div>

      <div className="noki-testimonials-grid">
        <article className="noki-testimonial-featured" data-reveal="">
          <div className="noki-testimonial-featured-head">
            <span>{labels.exampleTag}</span>
            <Stars count={FEATURED_STARS.length} className="noki-testimonial-stars noki-testimonial-stars-featured" />
          </div>

          <p className="noki-testimonial-featured-quote">{labels.featuredQuote}</p>

          <div className="noki-testimonial-tags">
            <span>{labels.tag1}</span>
            <span>{labels.tag2}</span>
          </div>

          <div className="noki-testimonial-featured-stats">
            <div>
              <div>-40%</div>
              <span>{labels.stat1Label}</span>
            </div>
            <div>
              <div>1</div>
              <span>{labels.stat2Label}</span>
            </div>
          </div>

          <div className="noki-testimonial-author">
            <div className="noki-testimonial-featured-avatar" aria-hidden="true">
              AK
            </div>
            <div>
              <div className="noki-testimonial-author-name">{labels.featuredName}</div>
              <div className="noki-testimonial-author-role">{labels.featuredRole}</div>
            </div>
          </div>
        </article>

        <div className="noki-testimonial-secondary-list">
          {labels.items.map((testimonial, index) => (
            <article className="noki-testimonial-card" data-reveal="" key={`${testimonial.name}-${testimonial.role}`}>
              <div>
                <div className="noki-testimonial-card-head">
                  <Stars count={SECONDARY_STAR_COUNTS[index]} className="noki-testimonial-stars noki-testimonial-stars-small" />
                  <span>{labels.exampleTag}</span>
                </div>
                <p>{testimonial.quote}</p>
              </div>

              <div className="noki-testimonial-card-author">
                <div
                  className="noki-testimonial-card-avatar"
                  style={{ background: SECONDARY_AVATAR_BACKGROUNDS[index] }}
                  aria-hidden="true"
                >
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <div className="noki-testimonial-card-name">{testimonial.name}</div>
                  <div className="noki-testimonial-card-role">{testimonial.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="noki-testimonial-metrics" data-reveal="">
        <div>
          <div>
            4.6<span>/5</span>
          </div>
          <p>{labels.stat3}</p>
        </div>
        <div>
          <div>—</div>
          <p>{labels.stat4}</p>
        </div>
        <div>
          <div>—</div>
          <p>{labels.stat5}</p>
        </div>
      </div>
    </section>
  );
}
