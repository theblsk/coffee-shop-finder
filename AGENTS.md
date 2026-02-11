# AGENTS Instructions

You are working inside an existing Next.js 16 (App Router) + Bun repo.

## Goal
Build a small web app that helps users find their nearest "Blank Street" coffee shop location, browse a list, search by address/zip/current location, and see locations on an interactive map. Prioritize clean architecture, modularity, and maintainability over visual polish.

## Deployment
- Live app URL: `https://blank-street.netlify.app/`

## Tech constraints
- Use TypeScript.
- Use Next.js App Router.
- Use Bun as package manager.
- No backend required. Use mock data (5-10 fictional locations) for a single city.
- Map integration MUST be interactive.
- App must be responsive (desktop + mobile).

## Mapping approach
- Use Leaflet with react-leaflet + OpenStreetMap tiles (no API keys).
- Implement map markers for each location and a popup or highlight on selection.

## Search requirements
User can:
1. Use current location (browser Geolocation API).
2. Search by address OR zip code (geocode to lat/lng).

For geocoding, use OpenStreetMap Nominatim (public):
- Query: `https://nominatim.openstreetmap.org/search?q=<QUERY>&format=json&limit=1`
- Add a simple debounce (300-500ms) for the input.
- Handle "no results" gracefully.
- If the API fails, show a non-blocking error and keep the existing center.

## Distance requirements
- Show distance from user/search point to each store in the list and details.
- Use haversine formula. Distances should be in miles or km (pick one, be consistent).
- Sort list by distance ascending when a user/search coordinate is available.
- If user location is unavailable, use a default city center coordinate and label distances as "from city center".

## Data model
Each location must include:
- `id` (string)
- `name`
- `address` (full string)
- `coordinates` `{ lat, lng }`
- `hours` (human-readable string or structured; keep it simple)
- `amenities` 2-3 strings (e.g., "wifi", "outdoor seating", "mobile ordering")

## UI behavior
- Layout: two-pane on desktop (list + map); stacked on mobile.
- Location list shows: name, address, hours, distance.
- Clicking a location:
  - highlights it in the list
  - centers map on it
  - opens a map popup and/or shows a details panel/drawer
- Details view shows: full address, hours, amenities, distance.

## Required code structure
- `src/`
  - `app/`
    - `page.tsx` (composes the app)
    - `layout.tsx` (already exists)
  - `data/`
    - `locations.ts` (mock locations)
  - `domain/`
    - `distance.ts` (haversine + formatting)
    - `geocoding.ts` (nominatim client + typing)
    - `nominatim.ts` (provider response parsing)
  - `types/`
    - `coordinate.ts`
    - `location.ts`
    - `origin.ts`
    - `geocode-api-response.ts`
  - `config/`
    - `geocoding.ts`
  - `state/`
    - `useLocationsController.ts` (single hook controlling app state/data flow)
  - `components/`
    - `SearchBar.tsx`
    - `LocationList.tsx`
    - `LocationCard.tsx`
    - `MapView.tsx`
    - `LocationDetails.tsx` (panel/drawer)
    - `LoadingInline.tsx` (tiny)
    - `ErrorInline.tsx` (tiny)
  - `styles/` (only if needed)

## State management
No heavy libraries required. Use a single controller hook + React state.

Controller responsibilities:
- store `selectedLocationId`
- store user/search `origin` coordinate + label (e.g., "Your location" / "Search result" / "City center")
- compute distances and sorted locations (memoized)
- handle geolocation request
- handle geocode search submit
- provide derived UI state (loading/error for geocoding and geolocation)

## Implementation details
- Add dependencies via bun:
  - `react-leaflet`, `leaflet`
- Fix Leaflet marker icon issue in Next.js (import marker icon assets or set default icon path in MapView).
- Ensure map renders only on client (Leaflet depends on window):
  - MapView should be a client component and/or dynamically imported with `ssr: false`.
- Ensure no SSR crashes.

## Quality bar
- Strong typing across modules.
- No giant components. Keep components focused.
- Avoid prop drilling chaos: `page.tsx` uses controller hook once and passes only necessary props.
- Provide clear empty/loading/error states.
- Provide basic accessibility: buttons, labels, focusable items, reasonable semantic HTML.

## Deliverables
1. Working app with list + search + details + map.
2. Mock data for 5-10 fictional Blank Street locations in one city.
3. A short README section:
   - how to install/run with Bun
   - any tradeoffs (e.g., Nominatim rate limits)
   - project structure overview
