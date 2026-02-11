import { getObjectProperty } from "@/lib/object";

export type NominatimResponseItem = {
  lat: string;
  lon: string;
};

const isNominatimResponseItem = (value: unknown): value is NominatimResponseItem => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const lat = getObjectProperty(value, "lat");
  const lon = getObjectProperty(value, "lon");
  return typeof lat === "string" && typeof lon === "string";
};

export const parseNominatimResponse = (value: unknown): NominatimResponseItem[] => {
  if (!Array.isArray(value)) {
    throw new Error("Invalid nominatim payload");
  }

  if (!value.every(isNominatimResponseItem)) {
    throw new Error("Invalid nominatim item payload");
  }

  return value;
};
