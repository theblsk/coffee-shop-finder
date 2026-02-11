"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MOCK_LOCATIONS, NYC_CITY_CENTER } from "@/data/locations";
import { formatDistanceKm, haversineKm } from "@/domain/distance";
import { geocodeQuery } from "@/domain/geocoding";
import type { Coordinate } from "@/types/coordinate";
import type { Location, LocationWithDistance } from "@/types/location";
import type { Origin } from "@/types/origin";

const DEBOUNCE_MS = 400;
const MIN_GEOCODE_QUERY_LENGTH = 3;

const CITY_CENTER_ORIGIN: Origin = {
  coordinates: NYC_CITY_CENTER,
  label: "City center",
  kind: "city-center",
};

type UseLocationsControllerReturn = {
  searchInput: string;
  setSearchInput: (value: string) => void;
  selectedLocationId: string | null;
  selectedLocation: LocationWithDistance | null;
  origin: Origin;
  sortedLocations: LocationWithDistance[];
  isGeocoding: boolean;
  geocodingError: string | null;
  geocodingNoResults: boolean;
  isGeolocating: boolean;
  geolocationError: string | null;
  selectLocation: (locationId: string) => void;
  useCurrentLocation: () => void;
  submitSearch: () => void;
  formatDistance: (distanceKm: number) => string;
};

export const useLocationsController = (): UseLocationsControllerReturn => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    MOCK_LOCATIONS[0]?.id ?? null,
  );
  const [origin, setOrigin] = useState<Origin>(CITY_CENTER_ORIGIN);

  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const [geocodingNoResults, setGeocodingNoResults] = useState(false);

  const [isGeolocating, setIsGeolocating] = useState(false);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  // Monotonic request id to ignore stale geocode responses.
  const latestGeocodeRequestId = useRef(0);

  const locationsWithDistance = useMemo<LocationWithDistance[]>(() => {
    // Distances are always derived from the current origin.
    return MOCK_LOCATIONS.map((location: Location) => ({
      ...location,
      distanceKm: haversineKm(origin.coordinates, location.coordinates),
    }));
  }, [origin.coordinates]);

  const sortedLocations = useMemo(() => {
    return [...locationsWithDistance].sort((a, b) => a.distanceKm - b.distanceKm);
  }, [locationsWithDistance]);

  const selectedLocation = useMemo(() => {
    if (!selectedLocationId) {
      return null;
    }

    return sortedLocations.find((location) => location.id === selectedLocationId) ?? null;
  }, [selectedLocationId, sortedLocations]);

  const selectLocation = useCallback((locationId: string) => {
    setSelectedLocationId(locationId);
  }, []);

  const runGeocode = useCallback(async (rawQuery: string) => {
    const query = rawQuery.trim();

    if (query.length < MIN_GEOCODE_QUERY_LENGTH) {
      setGeocodingNoResults(false);
      setGeocodingError(null);
      return;
    }

    setIsGeocoding(true);
    setGeocodingError(null);
    setGeocodingNoResults(false);

    // Only the latest request is allowed to update geocoding state.
    const requestId = latestGeocodeRequestId.current + 1;
    latestGeocodeRequestId.current = requestId;

    try {
      const coordinate = await geocodeQuery(query);
      if (requestId !== latestGeocodeRequestId.current) {
        return;
      }

      if (!coordinate) {
        setGeocodingNoResults(true);
        return;
      }

      setOrigin({
        coordinates: coordinate,
        label: "Search result",
        kind: "search-result",
      });
    } catch {
      if (requestId !== latestGeocodeRequestId.current) {
        return;
      }
      setGeocodingError("We could not geocode that query. Keeping the current map center.");
    } finally {
      if (requestId === latestGeocodeRequestId.current) {
        setIsGeocoding(false);
      }
    }
  }, []);

  useEffect(() => {
    const trimmed = searchInput.trim();

    if (trimmed.length < MIN_GEOCODE_QUERY_LENGTH) {
      setGeocodingNoResults(false);
      setGeocodingError(null);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void runGeocode(trimmed);
    }, DEBOUNCE_MS);

    return () => {
      // Cancel pending debounce when the user keeps typing.
      window.clearTimeout(timeoutId);
    };
  }, [runGeocode, searchInput]);

  const submitSearch = useCallback(() => {
    void runGeocode(searchInput);
  }, [runGeocode, searchInput]);

  const useCurrentLocation = useCallback(() => {
    // Invalidate in-flight geocode requests before switching origin source.
    latestGeocodeRequestId.current += 1;
    setIsGeocoding(false);

    if (!navigator.geolocation) {
      setGeolocationError("Geolocation is not supported by this browser.");
      return;
    }

    setIsGeolocating(true);
    setGeolocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates: Coordinate = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setOrigin({
          coordinates,
          label: "Your location",
          kind: "user-location",
        });
        setIsGeolocating(false);
      },
      () => {
        setGeolocationError(
          "Unable to access your location. Check browser permissions and try again.",
        );
        setIsGeolocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  return {
    searchInput,
    setSearchInput,
    selectedLocationId,
    selectedLocation,
    origin,
    sortedLocations,
    isGeocoding,
    geocodingError,
    geocodingNoResults,
    isGeolocating,
    geolocationError,
    selectLocation,
    useCurrentLocation,
    submitSearch,
    formatDistance: formatDistanceKm,
  };
};
