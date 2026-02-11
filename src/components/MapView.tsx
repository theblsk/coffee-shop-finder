"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import type { LocationWithDistance, Origin } from "@/domain/location";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

type MapViewProps = {
  locations: LocationWithDistance[];
  selectedLocationId: string | null;
  origin: Origin;
  onSelect: (locationId: string) => void;
};

function MapCenterUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), {
      animate: true,
    });
  }, [lat, lng, map]);

  return null;
}

export function MapView({
  locations,
  selectedLocationId,
  origin,
  onSelect,
}: MapViewProps) {
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  const selectedLocation = useMemo(() => {
    return locations.find((location) => location.id === selectedLocationId) ?? null;
  }, [locations, selectedLocationId]);

  useEffect(() => {
    if (!selectedLocationId) {
      return;
    }

    const marker = markerRefs.current[selectedLocationId];
    marker?.openPopup();
  }, [selectedLocationId]);

  const mapCenter = selectedLocation?.coordinates ?? origin.coordinates;

  return (
    <section className="map-section" aria-label="Map of locations">
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={13}
        scrollWheelZoom
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterUpdater lat={mapCenter.lat} lng={mapCenter.lng} />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates.lat, location.coordinates.lng]}
            ref={(ref) => {
              markerRefs.current[location.id] = ref;
            }}
            eventHandlers={{
              click: () => onSelect(location.id),
            }}
          >
            <Popup>
              <div>
                <strong>{location.name}</strong>
                <p>{location.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
