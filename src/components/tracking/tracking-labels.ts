import type { MobilityRideStatus, MobilityServiceType } from "@/lib/tracking/types";

export const SERVICE_TYPE_LABELS: Record<MobilityServiceType, string> = {
  TAXI: "Taxi",
  TAXI_MOTO: "Taxi Moto",
  COURIER: "Course",
  CARGO: "Cargo",
};

// Public-safe wording only -- no internal/operational vocabulary.
export const RIDE_STATUS_LABELS: Record<MobilityRideStatus, string> = {
  DRIVER_ASSIGNED: "Chauffeur assigné",
  DRIVER_EN_ROUTE: "Chauffeur en route",
  DRIVER_ARRIVED: "Chauffeur arrivé",
  IN_PROGRESS: "Trajet en cours",
  COMPLETED: "Trajet terminé",
  CANCELLED: "Trajet annulé",
};
