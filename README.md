# Blank Street Location Finder

A small Next.js 16 + Bun app to find nearby fictional Blank Street coffee shops in New York City.

## Run with Bun

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
bun run lint
bun run build
bun run start
```

## Project structure

- `src/app` - App Router layout, page, global styles
- `src/components` - UI building blocks (search, list, card, map, details, inline status)
- `src/data` - mock Blank Street location dataset
- `src/domain` - types, distance utilities, geocoding client
- `src/state` - `useLocationsController` orchestration hook

## Tradeoffs and notes

- Geocoding uses public OpenStreetMap Nominatim from the client. Public endpoints can be rate-limited, so this app debounces input and handles failures without breaking map/list state.
- Browser geolocation depends on user permission. If unavailable or denied, the app falls back to a default NYC city-center origin.
- The map uses Leaflet + OpenStreetMap tiles and is rendered client-side to avoid SSR/window issues.
