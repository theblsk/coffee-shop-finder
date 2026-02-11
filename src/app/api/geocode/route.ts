import { NextResponse } from "next/server";
import type { GeocodeApiResponse } from "@/types/geocode-api-response";

type NominatimResponseItem = {
  lat: string;
  lon: string;
};

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() ?? "";

  if (query.length < 3) {
    const payload: GeocodeApiResponse = { coordinate: null, reason: "query_too_short" };
    return NextResponse.json(payload, { status: 200 });
  }

  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: "1",
    countrycodes: "us",
  });

  try {
    const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "blank-street-location-finder/1.0 (nextjs-app)",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const payload: GeocodeApiResponse = { coordinate: null, reason: "provider_error" };
      return NextResponse.json(
        payload,
        { status: response.status },
      );
    }

    const data = (await response.json()) as NominatimResponseItem[];

    if (!data.length) {
      const payload: GeocodeApiResponse = { coordinate: null };
      return NextResponse.json(payload, { status: 200 });
    }

    const lat = Number(data[0].lat);
    const lng = Number(data[0].lon);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      const payload: GeocodeApiResponse = { coordinate: null, reason: "invalid_coordinates" };
      return NextResponse.json(payload, { status: 502 });
    }

    const payload: GeocodeApiResponse = { coordinate: { lat, lng } };
    return NextResponse.json(payload, { status: 200 });
  } catch {
    const payload: GeocodeApiResponse = { coordinate: null, reason: "network_error" };
    return NextResponse.json(payload, { status: 502 });
  }
}
