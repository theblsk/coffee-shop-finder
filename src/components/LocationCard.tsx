import type { LocationWithDistance, OriginKind } from "@/domain/location";

type LocationCardProps = {
  location: LocationWithDistance;
  isSelected: boolean;
  isNearest: boolean;
  onSelect: (locationId: string) => void;
  formatDistance: (distanceKm: number) => string;
  originKind: OriginKind;
};

export function LocationCard({
  location,
  isSelected,
  isNearest,
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
        <div className="card-top-row">
          <h3>{location.name}</h3>
          {isNearest ? <span className="nearest-pill">Nearest</span> : null}
        </div>
        <p>{location.address}</p>
        <p>{location.hours}</p>
        <div className="distance-row">
          <p>
            {distancePrefix}: <strong>{formatDistance(location.distanceKm)}</strong>
          </p>
        </div>
        <div className="amenity-chip-row" aria-label="Amenities">
          {location.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity}>{amenity}</span>
          ))}
        </div>
      </button>
    </li>
  );
}
