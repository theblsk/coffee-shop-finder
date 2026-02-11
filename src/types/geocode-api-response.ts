import type { Coordinate } from "@/types/coordinate";

export type GeocodeApiResponse = {
  coordinate: Coordinate | null;
  reason?: string;
};
