export type Coordinate = {
  lat: number;
  lng: number;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinate;
  hours: string;
  amenities: string[];
};

export type OriginKind = "city-center" | "user-location" | "search-result";

export type Origin = {
  coordinates: Coordinate;
  label: string;
  kind: OriginKind;
};

export type LocationWithDistance = Location & {
  distanceKm: number;
};
