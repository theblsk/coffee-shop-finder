import { ErrorInline } from "@/components/ErrorInline";
import { LoadingInline } from "@/components/LoadingInline";

type SearchBarProps = {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSubmitSearch: () => void;
  onUseCurrentLocation: () => void;
  isGeocoding: boolean;
  geocodingError: string | null;
  geocodingNoResults: boolean;
  isGeolocating: boolean;
  geolocationError: string | null;
  originLabel: string;
};

export function SearchBar({
  searchInput,
  onSearchInputChange,
  onSubmitSearch,
  onUseCurrentLocation,
  isGeocoding,
  geocodingError,
  geocodingNoResults,
  isGeolocating,
  geolocationError,
  originLabel,
}: SearchBarProps) {
  return (
    <section className="search-panel" aria-label="Search locations">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitSearch();
        }}
        className="search-form"
      >
        <label htmlFor="search-query">Search by address or zip code</label>
        <div className="search-actions-row">
          <input
            id="search-query"
            type="text"
            value={searchInput}
            placeholder="Try: 10001 or Union Square NYC"
            onChange={(event) => onSearchInputChange(event.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>

      <button type="button" onClick={onUseCurrentLocation} className="secondary-button">
        Use current location
      </button>

      <p className="origin-label">Distance origin: {originLabel}</p>

      {isGeocoding ? <LoadingInline label="Looking up that search..." /> : null}
      {isGeolocating ? <LoadingInline label="Getting your current location..." /> : null}
      {geocodingNoResults ? (
        <ErrorInline message="No results found for that search. Try a broader query." />
      ) : null}
      {geocodingError ? <ErrorInline message={geocodingError} /> : null}
      {geolocationError ? <ErrorInline message={geolocationError} /> : null}
    </section>
  );
}
