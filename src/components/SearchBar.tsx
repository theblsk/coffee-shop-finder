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
      <div className="search-heading-row">
        <h2>Search locations</h2>
        <span className="origin-badge">Origin: {originLabel}</span>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitSearch();
        }}
        className="search-form"
      >
        <label htmlFor="search-query">Address or ZIP code</label>
        <div className="search-actions-row">
          <input
            id="search-query"
            type="text"
            value={searchInput}
            placeholder="Try: 10001 or Grand Central Terminal"
            onChange={(event) => onSearchInputChange(event.target.value)}
          />
          <button type="submit">Search</button>
        </div>
        <p className="field-hint">
          Search auto-runs while typing with a short debounce (minimum 3 characters).
        </p>
      </form>

      <button type="button" onClick={onUseCurrentLocation} className="secondary-button">
        Use current location
      </button>

      <div className="status-stack" aria-live="polite">
        {isGeocoding ? <LoadingInline label="Looking up that search..." /> : null}
        {isGeolocating ? <LoadingInline label="Getting your current location..." /> : null}
        {geocodingNoResults ? (
          <ErrorInline message="No results found for that search. Try a broader query." />
        ) : null}
        {geocodingError ? <ErrorInline message={geocodingError} /> : null}
        {geolocationError ? <ErrorInline message={geolocationError} /> : null}
      </div>
    </section>
  );
}
