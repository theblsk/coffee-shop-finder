import type { LocationWithDistance, OriginKind } from "@/domain/location";

type LocationCardProps = {
  location: LocationWithDistance;
  isSelected: boolean;
  onSelect: (locationId: string) => void;
  formatDistance: (distanceKm: number) => string;
  originKind: OriginKind;
};

export function LocationCard({
  location,
  isSelected,
  onSelect,
  formatDistance,
  originKind,
}: LocationCardProps) {
  const distancePrefix = originKind === "city-center" ? "From city center" : "Distance";

  return (
    <li>
      <button
        type="button"
        className={`location-card ${isSelected ? "selected" : ""}`}
        onClick={() => onSelect(location.id)}
        aria-pressed={isSelected}
      >
        <h3>{location.name}</h3>
        <p>{location.address}</p>
        <p>{location.hours}</p>
        <p>
          {distancePrefix}: <strong>{formatDistance(location.distanceKm)}</strong>
        </p>
      </button>
    </li>
  );
}
