import type { LocationWithDistance, OriginKind } from "@/domain/location";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type LocationDetailsProps = {
  isOpen: boolean;
  location: LocationWithDistance | null;
  formatDistance: (distanceKm: number) => string;
  originKind: OriginKind;
  onClose: () => void;
};

export function LocationDetails({
  isOpen,
  location,
  formatDistance,
  originKind,
  onClose,
}: LocationDetailsProps) {
  const distancePrefix = originKind === "city-center" ? "From city center" : "Distance";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="location-dialog-content" showCloseButton>
        {!location ? (
          <div className="location-dialog-empty">
            <DialogTitle>Location details</DialogTitle>
            <DialogDescription>
              Select a location from the list or map to view details.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader className="location-dialog-header">
              <p className="location-dialog-eyebrow">Location details</p>
              <div className="details-header-row">
                <DialogTitle>{location.name}</DialogTitle>
                <span>{formatDistance(location.distanceKm)}</span>
              </div>
              <DialogDescription>{location.address}</DialogDescription>
            </DialogHeader>

            <div className="location-dialog-body">
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
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
