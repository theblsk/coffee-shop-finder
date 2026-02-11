"use client";

import dynamic from "next/dynamic";

import { LocationDetails } from "@/components/LocationDetails";
import { LocationList } from "@/components/LocationList";
import { SearchBar } from "@/components/SearchBar";
import { useLocationsController } from "@/state/useLocationsController";

const MapView = dynamic(() => import("@/components/MapView").then((mod) => mod.MapView), {
  ssr: false,
  loading: () => <p className="status-text">Loading map...</p>,
});

export default function HomePage() {
  const controller = useLocationsController();

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Blank Street Location Finder</h1>
        <p>Search by address, zip code, or your current location to find the nearest shop.</p>
      </header>

      <div className="layout-grid">
        <section className="left-pane">
          <SearchBar
            searchInput={controller.searchInput}
            onSearchInputChange={controller.setSearchInput}
            onSubmitSearch={controller.submitSearch}
            onUseCurrentLocation={controller.useCurrentLocation}
            isGeocoding={controller.isGeocoding}
            geocodingError={controller.geocodingError}
            geocodingNoResults={controller.geocodingNoResults}
            isGeolocating={controller.isGeolocating}
            geolocationError={controller.geolocationError}
            originLabel={controller.origin.label}
          />

          <LocationList
            locations={controller.sortedLocations}
            selectedLocationId={controller.selectedLocationId}
            onSelect={controller.selectLocation}
            formatDistance={controller.formatDistance}
            originKind={controller.origin.kind}
          />

          <LocationDetails
            location={controller.selectedLocation}
            formatDistance={controller.formatDistance}
            originKind={controller.origin.kind}
          />
        </section>

        <MapView
          locations={controller.sortedLocations}
          selectedLocationId={controller.selectedLocationId}
          origin={controller.origin}
          onSelect={controller.selectLocation}
        />
      </div>
    </main>
  );
}
