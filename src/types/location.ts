import type { Coordinate } from "@/types/coordinate";

export type Location = {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinate;
  hours: string;
  amenities: string[];
};

export type LocationWithDistance = Location & {
  distanceKm: number;
};
