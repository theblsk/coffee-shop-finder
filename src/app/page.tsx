"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { LocationDetails } from "@/components/LocationDetails";
import { LocationList } from "@/components/LocationList";
import { SearchBar } from "@/components/SearchBar";
import { useLocationsController } from "@/state/useLocationsController";

// Leaflet depends on browser APIs, so load the map only on the client.
const MapView = dynamic(() => import("@/components/MapView").then((mod) => mod.MapView), {
  ssr: false,
  loading: () => <p className="status-text">Loading map...</p>,
});

type MobileViewMode = "list" | "map";

export default function HomePage() {
  const controller = useLocationsController();
  const [mobileView, setMobileView] = useState<MobileViewMode>("list");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleLocationSelect = (locationId: string) => {
    controller.selectLocation(locationId);
    setIsDetailsOpen(true);
  };

  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="page-header-copy">
          <p className="eyebrow">Blank Street Finder</p>
          <h1>Find your next coffee stop fast</h1>
          <p>
            Search by address, zip code, or your current location. Browse nearest stores,
            compare distances, and pick directly from the map.
          </p>
        </div>

        <div className="header-metrics" aria-label="Summary">
          <article>
            <p>Total locations</p>
            <strong>{controller.sortedLocations.length}</strong>
          </article>
          <article>
            <p>Distance mode</p>
            <strong>km</strong>
          </article>
          <article>
            <p>Current origin</p>
            <strong>{controller.origin.label}</strong>
          </article>
        </div>
      </header>

      <div className="mobile-view-toggle" role="tablist" aria-label="Mobile view switcher">
        <button
          type="button"
          className={mobileView === "list" ? "active" : ""}
          onClick={() => setMobileView("list")}
          role="tab"
          aria-selected={mobileView === "list"}
        >
          List & details
        </button>
        <button
          type="button"
          className={mobileView === "map" ? "active" : ""}
          onClick={() => setMobileView("map")}
          role="tab"
          aria-selected={mobileView === "map"}
        >
          Map
        </button>
      </div>

      <div className="layout-grid">
        <section className={`left-pane ${mobileView === "map" ? "mobile-hidden" : ""}`}>
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
            onSelect={handleLocationSelect}
            formatDistance={controller.formatDistance}
            originKind={controller.origin.kind}
          />
        </section>

        <section className={`right-pane ${mobileView === "list" ? "mobile-hidden" : ""}`}>
          <MapView
            locations={controller.sortedLocations}
            selectedLocationId={controller.selectedLocationId}
            origin={controller.origin}
            onSelect={controller.selectLocation}
            onRequestDetailsView={() => setIsDetailsOpen(true)}
          />
        </section>
      </div>

      <LocationDetails
        isOpen={isDetailsOpen}
        location={controller.selectedLocation}
        formatDistance={controller.formatDistance}
        originKind={controller.origin.kind}
        onClose={() => setIsDetailsOpen(false)}
      />
    </main>
  );
}
