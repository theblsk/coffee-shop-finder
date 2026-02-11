import type { Coordinate } from "@/types/coordinate";
import type { GeocodeApiResponse } from "@/types/geocode-api-response";
import { getObjectProperty } from "@/lib/object";

const isCoordinate = (value: unknown): value is Coordinate => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const lat = getObjectProperty(value, "lat");
  const lng = getObjectProperty(value, "lng");
  return typeof lat === "number" && typeof lng === "number";
};

const parseGeocodeApiResponse = (value: unknown): GeocodeApiResponse => {
  if (typeof value !== "object" || value === null) {
    throw new Error("Invalid geocode payload");
  }

  const coordinate = getObjectProperty(value, "coordinate");
  if (coordinate !== null && !isCoordinate(coordinate)) {
    throw new Error("Invalid geocode coordinate payload");
  }

  const reason = getObjectProperty(value, "reason");
  if (reason !== undefined && typeof reason !== "string") {
    throw new Error("Invalid geocode reason payload");
  }

  return {
    coordinate,
    reason,
  };
};

export const geocodeQuery = async (query: string): Promise<Coordinate | null> => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 3) {
    return null;
  }

  // Route through our API endpoint so UI code does not depend on provider details.
  const params = new URLSearchParams({ query: trimmedQuery });
  const response = await fetch(`/api/geocode?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Geocoding request failed with status ${response.status}`);
  }

  const data = parseGeocodeApiResponse(await response.json());
  return data.coordinate;
};
