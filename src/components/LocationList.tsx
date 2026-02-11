import type { LocationWithDistance, OriginKind } from "@/domain/location";

import { LocationCard } from "@/components/LocationCard";

type LocationListProps = {
  locations: LocationWithDistance[];
  selectedLocationId: string | null;
  onSelect: (locationId: string) => void;
  formatDistance: (distanceKm: number) => string;
  originKind: OriginKind;
};

export function LocationList({
  locations,
  selectedLocationId,
  onSelect,
  formatDistance,
  originKind,
}: LocationListProps) {
  if (!locations.length) {
    return <p className="status-text">No locations available.</p>;
  }

  return (
    <section aria-label="Blank Street locations" className="list-section">
      <ul className="location-list">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            isSelected={selectedLocationId === location.id}
            onSelect={onSelect}
            formatDistance={formatDistance}
            originKind={originKind}
          />
        ))}
      </ul>
    </section>
  );
}
