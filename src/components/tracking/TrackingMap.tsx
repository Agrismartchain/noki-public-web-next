"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useRef } from "react";

// A plain colored dot rendered as a DivIcon -- avoids Leaflet's classic
// "default marker icon 404s under a bundler" problem entirely, and lets the
// marker match the NOKI brand accent instead of the generic Leaflet pin.
const vehicleIcon = L.divIcon({
  className: "track-marker",
  iconSize: [18, 18],
});

export function TrackingMap({ latitude, longitude }: { latitude: number; longitude: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Mount the map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([latitude, longitude], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    markerRef.current = L.marker([latitude, longitude], { icon: vehicleIcon }).addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // Intentionally only on mount: subsequent position updates are applied
    // below without re-creating the map (which would flash/reset zoom).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Move the marker (and gently re-center) on every real position update --
  // no interpolation/animation, just snap to the latest known point.
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;

    marker.setLatLng([latitude, longitude]);
    map.panTo([latitude, longitude], { animate: true, duration: 0.5 });
  }, [latitude, longitude]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
