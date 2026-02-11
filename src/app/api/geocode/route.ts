import { NextResponse } from "next/server";
import { MIN_GEOCODE_QUERY_LENGTH, NOMINATIM_SEARCH_URL } from "@/config/geocoding";
import { parseNominatimResponse } from "@/domain/nominatim";
import type { GeocodeApiResponse } from "@/types/geocode-api-response";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() ?? "";

  if (query.length < MIN_GEOCODE_QUERY_LENGTH) {
    const payload: GeocodeApiResponse = { coordinate: null, reason: "query_too_short" };
    return NextResponse.json(payload, { status: 200 });
  }

  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: "1",
    // Scope to US results for this NYC-focused demo.
    countrycodes: "us",
  });

  let response: Response;
  try {
    // Server-side proxy request keeps provider headers/config out of the client.
    response = await fetch(`${NOMINATIM_SEARCH_URL}?${params.toString()}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "blank-street-location-finder/1.0 (nextjs-app)",
      },
      next: { revalidate: 0 },
    });
  } catch {
    const payload: GeocodeApiResponse = { coordinate: null, reason: "network_error" };
    return NextResponse.json(payload, { status: 502 });
  }

  if (!response.ok) {
    const payload: GeocodeApiResponse = { coordinate: null, reason: "provider_error" };
    return NextResponse.json(
      payload,
      { status: response.status },
    );
  }

  let data: ReturnType<typeof parseNominatimResponse>;
  try {
    data = parseNominatimResponse(await response.json());
  } catch {
    const payload: GeocodeApiResponse = { coordinate: null, reason: "parse_error" };
    return NextResponse.json(payload, { status: 502 });
  }

  if (!data.length) {
    const payload: GeocodeApiResponse = { coordinate: null };
    return NextResponse.json(payload, { status: 200 });
  }

  // Nominatim returns coordinates as strings; normalize once at the boundary.
  const lat = Number(data[0].lat);
  const lng = Number(data[0].lon);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    const payload: GeocodeApiResponse = { coordinate: null, reason: "invalid_coordinates" };
    return NextResponse.json(payload, { status: 502 });
  }

  const payload: GeocodeApiResponse = { coordinate: { lat, lng } };
  return NextResponse.json(payload, { status: 200 });
}
