import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TrackingApp } from "./TrackingApp";

vi.mock("./TrackingMap", () => ({
  TrackingMap: ({ latitude, longitude }: { latitude: number; longitude: number }) => (
    <div data-testid="tracking-map" data-lat={latitude} data-lng={longitude} />
  ),
}));

const TOKEN = "test-token-abc123";

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

const ACTIVE_PAYLOAD = {
  serviceType: "TAXI",
  status: "IN_PROGRESS",
  active: true,
  driverFirstName: "Jean",
  vehicleLabel: "Toyota Corolla",
  latitude: -4.2634,
  longitude: 15.2429,
  destinationLabel: "Bacongo",
  lastUpdatedAt: new Date().toISOString(),
};

const ENDED_PAYLOAD = {
  serviceType: "TAXI",
  status: "COMPLETED",
  active: false,
  driverFirstName: null,
  vehicleLabel: null,
  latitude: null,
  longitude: null,
  destinationLabel: null,
  lastUpdatedAt: new Date().toISOString(),
};

describe("TrackingApp", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("renders the active status for an active trip", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse(200, ACTIVE_PAYLOAD));

    render(<TrackingApp token={TOKEN} />);

    expect(await screen.findByText("Trajet en cours")).toBeInTheDocument();
    expect(screen.getByText("Taxi")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(`/api/track/${TOKEN}`, expect.anything());
  });

  it("renders the map when the active trip has a location", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse(200, ACTIVE_PAYLOAD));

    render(<TrackingApp token={TOKEN} />);

    const map = await screen.findByTestId("tracking-map");
    expect(map).toHaveAttribute("data-lat", String(ACTIVE_PAYLOAD.latitude));
    expect(map).toHaveAttribute("data-lng", String(ACTIVE_PAYLOAD.longitude));
  });

  it("renders a neutral invalid state for an unknown token", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse(404, { error: "not_found" }));

    render(<TrackingApp token={TOKEN} />);

    expect(await screen.findByText("Lien de suivi invalide ou expiré.")).toBeInTheDocument();
    expect(screen.queryByTestId("tracking-map")).not.toBeInTheDocument();
  });

  it("renders the ended state for a terminal trip and hides the live map", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse(200, ENDED_PAYLOAD));

    render(<TrackingApp token={TOKEN} />);

    expect(await screen.findByText("Ce trajet est terminé.")).toBeInTheDocument();
    expect(screen.getByText(/n.est plus actif/)).toBeInTheDocument();
    expect(screen.queryByTestId("tracking-map")).not.toBeInTheDocument();
  });

  it("polls again after the interval while the trip is active", async () => {
    vi.useFakeTimers();
    vi.mocked(fetch).mockResolvedValue(jsonResponse(200, ACTIVE_PAYLOAD));

    render(<TrackingApp token={TOKEN} />);

    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    await vi.advanceTimersByTimeAsync(7000);
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    await vi.advanceTimersByTimeAsync(7000);
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
  });

  it("stops polling once the trip reaches a terminal state", async () => {
    vi.useFakeTimers();
    vi.mocked(fetch)
      .mockResolvedValueOnce(jsonResponse(200, ACTIVE_PAYLOAD))
      .mockResolvedValue(jsonResponse(200, ENDED_PAYLOAD));

    render(<TrackingApp token={TOKEN} />);

    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    await vi.advanceTimersByTimeAsync(7000);
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    await vi.waitFor(() => expect(screen.getByText("Ce trajet est terminé.")).toBeInTheDocument());

    await vi.advanceTimersByTimeAsync(30000);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("never renders fields outside the public-safe contract, even if the API response includes extra ones", async () => {
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(200, {
        ...ACTIVE_PAYLOAD,
        customerPhone: "+242060000000",
        passengerPhone: "+242061111111",
        rideId: "11111111-2222-3333-4444-555555555555",
        driverId: "99999999-8888-7777-6666-555555555555",
      }),
    );

    render(<TrackingApp token={TOKEN} />);

    await screen.findByText("Trajet en cours");

    const rendered = document.body.textContent ?? "";
    expect(rendered).not.toContain("+242060000000");
    expect(rendered).not.toContain("+242061111111");
    expect(rendered).not.toContain("11111111-2222-3333-4444-555555555555");
    expect(rendered).not.toContain("99999999-8888-7777-6666-555555555555");
  });

  it("shows a retry affordance when the first request fails", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("network down"));

    render(<TrackingApp token={TOKEN} />);

    expect(await screen.findByRole("button", { name: "Réessayer" })).toBeInTheDocument();
  });
});
