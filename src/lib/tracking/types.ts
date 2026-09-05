// Mirrors PublicMobilityTrackingDto from noki-api
// (src/modules/mobility/dto/mobility.dto.ts). Kept as a small hand-written
// type here rather than pulling in the full generated shared-contracts
// client, since this page consumes exactly one public, unauthenticated GET
// endpoint and nothing else.

export const MOBILITY_SERVICE_TYPES = ["TAXI", "TAXI_MOTO", "COURIER", "CARGO"] as const;
export type MobilityServiceType = (typeof MOBILITY_SERVICE_TYPES)[number];

export const MOBILITY_RIDE_STATUSES = [
  "DRIVER_ASSIGNED",
  "DRIVER_EN_ROUTE",
  "DRIVER_ARRIVED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;
export type MobilityRideStatus = (typeof MOBILITY_RIDE_STATUSES)[number];

export interface PublicMobilityTracking {
  serviceType: MobilityServiceType;
  status: MobilityRideStatus;
  active: boolean;
  driverFirstName: string | null;
  vehicleLabel: string | null;
  latitude: number | null;
  longitude: number | null;
  destinationLabel: string | null;
  lastUpdatedAt: string;
}

export function isPublicMobilityTracking(value: unknown): value is PublicMobilityTracking {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.serviceType === "string" &&
    typeof v.status === "string" &&
    typeof v.active === "boolean" &&
    (v.driverFirstName === null || typeof v.driverFirstName === "string") &&
    (v.vehicleLabel === null || typeof v.vehicleLabel === "string") &&
    (v.latitude === null || typeof v.latitude === "number") &&
    (v.longitude === null || typeof v.longitude === "number") &&
    (v.destinationLabel === null || typeof v.destinationLabel === "string") &&
    typeof v.lastUpdatedAt === "string"
  );
}
