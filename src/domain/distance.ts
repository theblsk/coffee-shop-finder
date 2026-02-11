import type { Coordinate } from "@/types/coordinate";

const EARTH_RADIUS_KM = 6371;

const toRadians = (value: number) => (value * Math.PI) / 180;

export const haversineKm = (from: Coordinate, to: Coordinate): number => {
  // Haversine computes great-circle distance between two lat/lng points.
  const latDelta = toRadians(to.lat - from.lat);
  const lngDelta = toRadians(to.lng - from.lng);
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);

  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDelta / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
};

export const formatDistanceKm = (distanceKm: number): string => {
  return `${distanceKm.toFixed(1)} km`;
};
