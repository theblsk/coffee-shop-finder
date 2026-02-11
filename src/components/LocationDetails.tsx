import type { LocationWithDistance, OriginKind } from "@/domain/location";

type LocationDetailsProps = {
  location: LocationWithDistance | null;
  formatDistance: (distanceKm: number) => string;
  originKind: OriginKind;
};

export function LocationDetails({
  location,
  formatDistance,
  originKind,
}: LocationDetailsProps) {
  if (!location) {
    return (
      <aside className="details-panel" aria-live="polite">
        <h2>Location details</h2>
        <p>Select a location from the list or map to view details.</p>
      </aside>
    );
  }

  const distancePrefix = originKind === "city-center" ? "From city center" : "Distance";

  return (
    <aside className="details-panel" aria-live="polite">
      <div className="details-header-row">
        <h2>{location.name}</h2>
        <span>{formatDistance(location.distanceKm)}</span>
      </div>
      <p>{location.address}</p>
      <p>{location.hours}</p>
      <p>
        {distancePrefix}: <strong>{formatDistance(location.distanceKm)}</strong>
      </p>
      <div>
        <h3>Amenities</h3>
        <ul className="amenities-list">
          {location.amenities.map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
