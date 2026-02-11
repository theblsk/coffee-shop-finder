import type { Coordinate } from "@/types/coordinate";

export type OriginKind = "city-center" | "user-location" | "search-result";

export type Origin = {
  coordinates: Coordinate;
  label: string;
  kind: OriginKind;
};
