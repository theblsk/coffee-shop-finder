import type { Coordinate } from "@/types/coordinate";
import type { GeocodeApiResponse } from "@/types/geocode-api-response";

export const geocodeQuery = async (query: string): Promise<Coordinate | null> => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 3) {
    return null;
  }

  const params = new URLSearchParams({ query: trimmedQuery });
  const response = await fetch(`/api/geocode?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Geocoding request failed with status ${response.status}`);
  }

  const data = (await response.json()) as GeocodeApiResponse;
  return data.coordinate;
};
