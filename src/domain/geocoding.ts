import type { Coordinate } from "@/domain/location";

export type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
};

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export const geocodeQuery = async (query: string): Promise<Coordinate | null> => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return null;
  }

  const params = new URLSearchParams({
    q: trimmedQuery,
    format: "json",
    limit: "1",
  });

  const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Geocoding request failed with status ${response.status}`);
  }

  const data = (await response.json()) as NominatimResult[];

  if (!data.length) {
    return null;
  }

  const result = data[0];
  const lat = Number(result.lat);
  const lng = Number(result.lon);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    throw new Error("Geocoding response returned invalid coordinates");
  }

  return { lat, lng };
};
