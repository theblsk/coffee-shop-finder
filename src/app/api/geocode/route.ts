import { NextResponse } from "next/server";

type NominatimResponseItem = {
  lat: string;
  lon: string;
};

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() ?? "";

  if (query.length < 3) {
    return NextResponse.json({ coordinate: null, reason: "query_too_short" }, { status: 200 });
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
      return NextResponse.json(
        { coordinate: null, reason: "provider_error" },
        { status: response.status },
      );
    }

    const data = (await response.json()) as NominatimResponseItem[];

    if (!data.length) {
      return NextResponse.json({ coordinate: null }, { status: 200 });
    }

    const lat = Number(data[0].lat);
    const lng = Number(data[0].lon);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return NextResponse.json({ coordinate: null, reason: "invalid_coordinates" }, { status: 502 });
    }

    return NextResponse.json({ coordinate: { lat, lng } }, { status: 200 });
  } catch {
    return NextResponse.json({ coordinate: null, reason: "network_error" }, { status: 502 });
  }
}
