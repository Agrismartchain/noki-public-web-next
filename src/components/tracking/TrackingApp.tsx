"use client";

import nextDynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import type { PublicMobilityTracking } from "@/lib/tracking/types";

import { RIDE_STATUS_LABELS, SERVICE_TYPE_LABELS } from "./tracking-labels";

const TrackingMap = nextDynamic(() => import("./TrackingMap").then((m) => m.TrackingMap), {
  ssr: false,
  loading: () => (
    <div className="track-map-wrap">
      <div className="track-map-empty">Chargement de la carte…</div>
    </div>
  ),
});

// ~7s, per the C2C-R1 spec's preferred cadence within the 5-10s window.
const POLL_INTERVAL_MS = 7000;

type Phase = "loading" | "first_error" | "invalid" | "active" | "ended";

export function TrackingApp({ token }: { token: string }) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [data, setData] = useState<PublicMobilityTracking | null>(null);
  const [reconnecting, setReconnecting] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const cancelledRef = useRef(false);
  const hasEverSucceededRef = useRef(false);
  const terminalRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    terminalRef.current = false;
    hasEverSucceededRef.current = false;

    function scheduleNext() {
      if (cancelledRef.current || terminalRef.current) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(poll, POLL_INTERVAL_MS);
    }

    async function poll() {
      if (cancelledRef.current || terminalRef.current) return;

      // Live trips only poll while the tab is actually visible. When the tab
      // comes back to the foreground the visibilitychange listener below
      // fires an immediate poll, so this just idles quietly meanwhile.
      if (typeof document !== "undefined" && document.hidden && hasEverSucceededRef.current) {
        scheduleNext();
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(`/api/track/${encodeURIComponent(token)}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (cancelledRef.current) return;

        if (response.status === 404) {
          terminalRef.current = true;
          setPhase("invalid");
          return;
        }

        if (!response.ok) {
          throw new Error(`upstream responded ${response.status}`);
        }

        const body = (await response.json()) as PublicMobilityTracking;
        if (cancelledRef.current) return;

        hasEverSucceededRef.current = true;
        setReconnecting(false);
        setData(body);

        if (!body.active) {
          terminalRef.current = true;
          setPhase("ended");
          return;
        }

        setPhase("active");
        scheduleNext();
      } catch (error) {
        if (cancelledRef.current) return;
        if (error instanceof DOMException && error.name === "AbortError") return;

        if (!hasEverSucceededRef.current) {
          setPhase("first_error");
          return;
        }

        // Temporary hiccup after we already had a live trip on screen: keep
        // the last known state visible, show a subtle reconnect indicator,
        // and keep trying rather than bouncing the user to an error page.
        setReconnecting(true);
        scheduleNext();
      }
    }

    function handleVisibilityChange() {
      if (!document.hidden && !terminalRef.current && !cancelledRef.current && hasEverSucceededRef.current) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        poll();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    poll();

    return () => {
      cancelledRef.current = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      abortRef.current?.abort();
    };
  }, [token, retryNonce]);

  if (phase === "loading") {
    return <LoadingState />;
  }

  if (phase === "first_error") {
    return <FirstErrorState onRetry={() => setRetryNonce((n) => n + 1)} />;
  }

  if (phase === "invalid") {
    return <InvalidState />;
  }

  if (!data) {
    // Defensive: active/ended are only ever set alongside data.
    return <LoadingState />;
  }

  if (phase === "ended") {
    return <EndedState data={data} />;
  }

  return <ActiveState data={data} reconnecting={reconnecting} />;
}

function TrackHeader() {
  return (
    <header className="track-header">
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static brand asset, not worth next/image on a page optimized for minimal JS */}
      <img src="/assets/brand/noki-logo-yellow.png" alt="" className="track-logo" />
      <h1>Suivi du trajet</h1>
    </header>
  );
}

function TrackFooter() {
  return (
    <footer className="track-footer">
      NOKI Service &middot; Ce lien de suivi est temporaire et ne partage que la position du
      trajet, jamais vos coordonnées personnelles.
    </footer>
  );
}

function LoadingState() {
  return (
    <div className="track">
      <TrackHeader />
      <main className="track-main" aria-busy="true" aria-live="polite">
        <div className="track-card" style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <div className="track-skeleton-line" style={{ width: "40%" }} />
          <div className="track-skeleton-line" style={{ width: "70%" }} />
        </div>
        <div className="track-map-wrap">
          <div className="track-spinner" role="status" aria-label="Chargement du trajet" />
        </div>
      </main>
      <TrackFooter />
    </div>
  );
}

function FirstErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="track">
      <TrackHeader />
      <div className="track-centered" role="alert">
        <h2>Connexion impossible</h2>
        <p>Nous n&apos;arrivons pas à récupérer les informations de ce trajet pour le moment.</p>
        <button type="button" className="track-retry-btn" onClick={onRetry}>
          Réessayer
        </button>
      </div>
      <TrackFooter />
    </div>
  );
}

function InvalidState() {
  return (
    <div className="track">
      <TrackHeader />
      <div className="track-centered" role="alert">
        <h2>Lien de suivi invalide ou expiré.</h2>
        <p>Ce lien de suivi n&apos;existe pas ou n&apos;est plus disponible.</p>
      </div>
      <TrackFooter />
    </div>
  );
}

function EndedState({ data }: { data: PublicMobilityTracking }) {
  return (
    <div className="track">
      <TrackHeader />
      <main className="track-main">
        <div className="track-card">
          <div className="track-status-row">
            <div className="track-status-main">
              <span className="track-service-type">{SERVICE_TYPE_LABELS[data.serviceType]}</span>
              <span className="track-status-label">Ce trajet est terminé.</span>
            </div>
          </div>
          <p className="track-meta" style={{ marginTop: "0.75rem" }}>
            Le lien de suivi en direct n&apos;est plus actif.
          </p>
        </div>
      </main>
      <TrackFooter />
    </div>
  );
}

function ActiveState({ data, reconnecting }: { data: PublicMobilityTracking; reconnecting: boolean }) {
  const hasPosition = data.latitude !== null && data.longitude !== null;
  const updatedAt = formatTime(data.lastUpdatedAt);

  return (
    <div className="track">
      <TrackHeader />
      <main className="track-main">
        <div className="track-card">
          <div className="track-status-row">
            <div className="track-status-main">
              <span className="track-service-type">{SERVICE_TYPE_LABELS[data.serviceType]}</span>
              <span className="track-status-label">{RIDE_STATUS_LABELS[data.status]}</span>
            </div>
            <span className="track-badge" data-live="true">
              <span className="track-badge-dot" aria-hidden="true" />
              En direct
            </span>
          </div>
          {data.destinationLabel ? (
            <p className="track-meta">Destination : {data.destinationLabel}</p>
          ) : null}
          {updatedAt ? <p className="track-meta">Dernière mise à jour : {updatedAt}</p> : null}
          {reconnecting ? (
            <p className="track-reconnect" role="status">
              Reconnexion en cours…
            </p>
          ) : null}
        </div>

        {(data.driverFirstName || data.vehicleLabel) && (
          <div className="track-card track-driver-row">
            <div className="track-driver-avatar" aria-hidden="true">
              {data.driverFirstName ? data.driverFirstName.charAt(0).toUpperCase() : "N"}
            </div>
            <div>
              {data.driverFirstName ? <div className="track-driver-name">{data.driverFirstName}</div> : null}
              {data.vehicleLabel ? <div className="track-driver-vehicle">{data.vehicleLabel}</div> : null}
            </div>
          </div>
        )}

        <div
          className="track-map-wrap"
          role="img"
          aria-label={
            hasPosition
              ? "Carte affichant la position actuelle du trajet"
              : "Position en attente de signal"
          }
        >
          {hasPosition ? (
            <TrackingMap latitude={data.latitude as number} longitude={data.longitude as number} />
          ) : (
            <div className="track-map-empty">En attente du signal de position…</div>
          )}
        </div>
      </main>
      <TrackFooter />
    </div>
  );
}

function formatTime(iso: string): string | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
