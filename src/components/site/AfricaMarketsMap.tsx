"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";

// @ts-expect-error d3 7.9.0 has no bundled TypeScript declarations in this package.
import * as d3 from "d3";
// @ts-expect-error topojson-client 3.1.0 has no bundled TypeScript declarations in this package.
import { feature as topojsonFeature } from "topojson-client";

import topology from "../../data/world-atlas/countries-110m.json";
import type { Language } from "./content";
import { SITE_COPY } from "./content";

type AfricaMarketsMapProps = {
  language: Language;
};

type CountryFeature = {
  id?: number | string;
  type: "Feature";
  geometry: unknown;
  properties?: Record<string, unknown>;
};

type CountryCollection = {
  type: "FeatureCollection";
  features: CountryFeature[];
};

type MarketId = 466 | 384 | 178 | 266 | 686 | 120;

const MARKET_TIMER_MS = 3200;
const MAP_HEIGHT = 760;
const FLAG_WIDTH = 22;
const FLAG_HEIGHT = 15;

const MARKETS: {
  id: MarketId;
  names: Record<Language, string>;
  flag: string;
}[] = [
  { id: 466, names: { fr: "Mali", en: "Mali", ar: "مالي" }, flag: "/assets/flags/mali.svg" },
  {
    id: 384,
    names: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire", ar: "ساحل العاج" },
    flag: "/assets/flags/cote-divoire.webp",
  },
  { id: 178, names: { fr: "Congo", en: "Congo", ar: "الكونغو" }, flag: "/assets/flags/congo.webp" },
  { id: 266, names: { fr: "Gabon", en: "Gabon", ar: "الغابون" }, flag: "/assets/flags/gabon.svg" },
  { id: 686, names: { fr: "Sénégal", en: "Senegal", ar: "السنغال" }, flag: "/assets/flags/senegal.webp" },
  { id: 120, names: { fr: "Cameroun", en: "Cameroon", ar: "الكاميرون" }, flag: "/assets/flags/cameroun.webp" },
];

const AFRICA_NAMES: Record<MarketId, Record<Language, string>> = {
  384: { fr: "Côte d'Ivoire", en: "Côte d'Ivoire", ar: "ساحل العاج" },
  686: { fr: "Sénégal", en: "Senegal", ar: "السنغال" },
  466: { fr: "Mali", en: "Mali", ar: "مالي" },
  120: { fr: "Cameroun", en: "Cameroon", ar: "الكاميرون" },
  266: { fr: "Gabon", en: "Gabon", ar: "الغابون" },
  178: { fr: "Congo", en: "Congo", ar: "الكونغو" },
};

const LEFT_CALLOUT_IDS: MarketId[] = [686, 384, 266];
const RIGHT_CALLOUT_IDS: MarketId[] = [466, 120, 178];

const flagById = MARKETS.reduce<Record<MarketId, string>>(
  (acc, market) => {
    acc[market.id] = market.flag;
    return acc;
  },
  {} as Record<MarketId, string>,
);

function isMarketId(id: number): id is MarketId {
  return id === 466 || id === 384 || id === 178 || id === 266 || id === 686 || id === 120;
}

function getMarketCardStyle(index: number, activeIndex: number): CSSProperties {
  const rel = (index - activeIndex + MARKETS.length) % MARKETS.length;
  const isActive = rel === 0;
  const isNext = rel === 1;

  return {
    opacity: isActive ? 1 : isNext ? 0.35 : 0,
    transform: isActive ? "scale(1)" : isNext ? "scale(.95)" : "scale(.9)",
    zIndex: isActive ? 3 : isNext ? 2 : 1,
    border: isActive ? "1.5px solid var(--color-accent)" : "1px solid var(--color-divider)",
    boxShadow: isActive ? "0 20px 50px rgba(255,213,0,.16),0 8px 30px rgba(0,0,0,.4)" : "none",
    marginBottom: isActive ? "14px" : isNext ? "-70px" : "-96px",
  };
}

function getFlagStyle(index: number, activeIndex: number): CSSProperties {
  const rel = (index - activeIndex + MARKETS.length) % MARKETS.length;
  const isActive = rel === 0;

  return {
    width: isActive ? "34px" : "22px",
    height: isActive ? "24px" : "16px",
  };
}

function getNameStyle(index: number, activeIndex: number): CSSProperties {
  const rel = (index - activeIndex + MARKETS.length) % MARKETS.length;
  const isActive = rel === 0;
  const isNext = rel === 1;

  return {
    color: isActive ? "var(--color-text)" : isNext ? "rgba(238,241,250,.55)" : "rgba(238,241,250,.4)",
    fontSize: isActive ? "19px" : "14px",
  };
}

export function AfricaMarketsMap({ language }: AfricaMarketsMapProps) {
  const labels = SITE_COPY[language].markets;
  const direction = language === "ar" ? "rtl" : "ltr";
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [marketIndex, setMarketIndex] = useState(0);
  const [mapWidth, setMapWidth] = useState(900);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMarketIndex((current) => (current + 1) % MARKETS.length);
    }, MARKET_TIMER_MS);

    return () => window.clearInterval(timer);
  }, []);

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

  useEffect(() => {
    const node = mapRef.current;
    if (!node) {
      return;
    }

    const syncWidth = () => {
      setMapWidth(node.clientWidth || 900);
    };

    syncWidth();

    const ResizeObserverCtor = (window as Window & { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    if (!ResizeObserverCtor) {
      window.addEventListener("resize", syncWidth);
      return () => window.removeEventListener("resize", syncWidth);
    }

    const observer = new ResizeObserverCtor(syncWidth);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const mapGeometry = useMemo(() => {
    const world = topojsonFeature(topology, topology.objects.countries) as CountryCollection;
    const africa = world.features.filter((country) => {
      const centroid = d3.geoCentroid(country);
      return centroid[0] > -20 && centroid[0] < 55 && centroid[1] > -36 && centroid[1] < 38;
    });
    const highlighted = world.features.filter((country) => isMarketId(Number(country.id)));
    const projection = d3.geoMercator().fitSize([mapWidth, MAP_HEIGHT], {
      type: "FeatureCollection",
      features: africa,
    });
    const path = d3.geoPath(projection);

    return {
      africa,
      highlighted,
      path,
      projection,
    };
  }, [mapWidth]);

  useEffect(() => {
    const readyFrame = window.requestAnimationFrame(() => setMapReady(true));
    return () => window.cancelAnimationFrame(readyFrame);
  }, [mapGeometry]);

  const callouts = useMemo(() => {
    const leftYs = [MAP_HEIGHT * 0.22, MAP_HEIGHT * 0.5, MAP_HEIGHT * 0.78];
    const rightYs = [MAP_HEIGHT * 0.22, MAP_HEIGHT * 0.5, MAP_HEIGHT * 0.78];

    return [...LEFT_CALLOUT_IDS, ...RIGHT_CALLOUT_IDS].map((id) => {
      const country = mapGeometry.highlighted.find((feature) => Number(feature.id) === id);
      if (!country) {
        return null;
      }

      const center = mapGeometry.projection(d3.geoCentroid(country));
      if (!center) {
        return null;
      }

      const side = LEFT_CALLOUT_IDS.includes(id) ? "left" : "right";
      const sideIndex = (side === "left" ? LEFT_CALLOUT_IDS : RIGHT_CALLOUT_IDS).indexOf(id);
      const labelY = side === "left" ? leftYs[sideIndex] : rightYs[sideIndex];
      const midX = side === "left" ? Math.max(120, center[0] - 46) : Math.min(mapWidth - 120, center[0] + 46);
      const labelX = side === "left" ? midX - 14 : midX + 14;
      const textAnchorX = side === "left" ? midX - 22 : midX + 22;
      const line = `M${center[0]},${center[1]} L${midX},${center[1]} L${midX},${labelY} L${labelX},${labelY}`;

      return {
        id,
        center,
        flagX: side === "left" ? textAnchorX + 8 : textAnchorX - FLAG_WIDTH - 8,
        labelX,
        labelY,
        line,
        name: AFRICA_NAMES[id][language],
        side,
        textAnchorX,
      };
    });
  }, [language, mapGeometry, mapWidth]);

  return (
    <section className="noki-markets" id="marches" ref={sectionRef} aria-labelledby="noki-markets-title" dir={direction}>
      <div className="noki-markets-intro" data-reveal="">
        <h6>{labels.kicker}</h6>
        <h2 id="noki-markets-title">{labels.title}</h2>
        <p>{labels.body}</p>
      </div>

      <div className="noki-markets-grid">
        <div className="noki-market-carousel" dir="ltr" data-reveal="" aria-live="polite">
          <div className="noki-market-card-stack" role="list" aria-label={labels.kicker}>
            {MARKETS.map((market, index) => {
              const isActive = index === marketIndex;

              return (
                <div
                  className="noki-market-card"
                  role="listitem"
                  style={getMarketCardStyle(index, marketIndex)}
                  key={market.id}
                  aria-current={isActive ? "true" : undefined}
                  aria-hidden={!isActive && (index - marketIndex + MARKETS.length) % MARKETS.length !== 1}
                >
                    <div className="noki-market-card-content" dir={direction}>
                      <div className="noki-market-card-flag-wrap" style={getFlagStyle(index, marketIndex)}>
                        <Image
                          className="noki-market-card-flag"
                          src={market.flag}
                          alt={market.names[language]}
                          width={34}
                          height={24}
                          unoptimized
                        />
                      </div>
                    <div>
                      <div className="noki-market-card-name" style={getNameStyle(index, marketIndex)}>
                        {market.names[language]}
                      </div>
                      {isActive ? <p>{labels.cardDesc}</p> : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="noki-market-dots" aria-hidden="true">
            {MARKETS.map((market, index) => (
              <span
                key={market.id}
                style={{ background: index === marketIndex ? "var(--color-accent)" : "rgba(255,255,255,.15)" }}
              />
            ))}
          </div>
        </div>

        <div className="noki-market-map-panel" dir="ltr" data-reveal="">
          <div className="noki-market-map-grid-bg" aria-hidden="true" />
          <div className="noki-market-map-canvas" ref={mapRef}>
            {!mapReady ? <div className="noki-market-loading">{labels.loading}</div> : null}
            <svg
              className="noki-market-map-svg"
              width="100%"
              height={MAP_HEIGHT}
              viewBox={`0 0 ${mapWidth} ${MAP_HEIGHT}`}
              role="img"
              aria-label={labels.title}
            >
              <title>{labels.title}</title>

              <g>
                {mapGeometry.africa.map((country) => (
                  <path
                    d={mapGeometry.path(country) || ""}
                    fill="rgba(63,212,255,0.05)"
                    stroke="rgba(63,212,255,0.28)"
                    strokeWidth="0.6"
                    key={`africa-${country.id}`}
                  />
                ))}
              </g>

              <g>
                {mapGeometry.highlighted.map((country) => (
                  <path
                    d={mapGeometry.path(country) || ""}
                    fill="rgba(255,213,0,0.14)"
                    stroke="#FFD500"
                    strokeWidth="1.2"
                    key={`highlight-${country.id}`}
                  />
                ))}
              </g>

              <g>
                {mapGeometry.highlighted.map((country) => {
                  const center = mapGeometry.projection(d3.geoCentroid(country));
                  if (!center) {
                    return null;
                  }

                  return (
                    <g key={`marker-${country.id}`}>
                      <circle cx={center[0]} cy={center[1]} r="16" fill="none" stroke="#3fd4ff" strokeWidth="1.2" opacity="0.7" />
                      <circle
                        cx={center[0]}
                        cy={center[1]}
                        r="4.5"
                        fill="#FFD500"
                        style={{ filter: "drop-shadow(0 0 6px #FFD500)" }}
                      />
                    </g>
                  );
                })}
              </g>

              <g>
                {callouts.map((callout) => {
                  if (!callout) {
                    return null;
                  }

                  return (
                    <g key={`callout-${callout.id}`}>
                      <path
                        d={callout.line}
                        fill="none"
                        stroke="rgba(63,212,255,.55)"
                        strokeWidth="1.1"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx={callout.center[0]}
                        cy={callout.center[1]}
                        r="3"
                        fill="#FFD500"
                        style={{ filter: "drop-shadow(0 0 4px #FFD500)" }}
                      />
                      <circle cx={callout.labelX} cy={callout.labelY} r="2.2" fill="#3fd4ff" />
                      <image
                        href={flagById[callout.id]}
                        x={callout.flagX}
                        y={callout.labelY - FLAG_HEIGHT + 4}
                        width={FLAG_WIDTH}
                        height={FLAG_HEIGHT}
                        preserveAspectRatio="xMidYMid slice"
                        style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,.5))" }}
                        aria-hidden="true"
                      />
                      <text
                        x={callout.textAnchorX}
                        y={callout.labelY + 5}
                        textAnchor={callout.side === "left" ? "end" : "start"}
                        fontWeight="700"
                        fontSize="15"
                        fill="#ffe873"
                        style={{
                          filter: "drop-shadow(0 0 6px rgba(255,213,0,.4))",
                          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                        }}
                      >
                        {callout.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
