import type { LocationWithDistance } from "@/types/location";
import type { OriginKind } from "@/types/origin";

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
      <div className="list-header-row">
        <h2>Nearby stores</h2>
        <p>{locations.length} available</p>
      </div>

      <ul className="location-list">
        {locations.map((location, index) => (
          <LocationCard
            key={location.id}
            location={location}
            isSelected={selectedLocationId === location.id}
            isNearest={index === 0}
            onSelect={onSelect}
            formatDistance={formatDistance}
            originKind={originKind}
          />
        ))}
      </ul>
    </section>
  );
}
