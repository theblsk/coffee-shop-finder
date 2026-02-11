import type { Location } from "@/types/location";

export const NYC_CITY_CENTER = {
  lat: 40.758,
  lng: -73.9855,
};

export const MOCK_LOCATIONS: Location[] = [
  {
    id: "soho-spring",
    name: "Blank Street SoHo Spring",
    address: "201 Spring St, New York, NY 10012",
    coordinates: { lat: 40.72531, lng: -74.00396 },
    hours: "Mon-Sun 6:30 AM - 8:00 PM",
    amenities: ["wifi", "mobile ordering", "outdoor seating"],
  },
  {
    id: "williamsburg-bedford",
    name: "Blank Street Williamsburg Bedford",
    address: "184 Bedford Ave, Brooklyn, NY 11249",
    coordinates: { lat: 40.71787, lng: -73.95785 },
    hours: "Mon-Sun 7:00 AM - 8:30 PM",
    amenities: ["wifi", "dog friendly", "mobile ordering"],
  },
  {
    id: "chelsea-8th",
    name: "Blank Street Chelsea 8th",
    address: "222 8th Ave, New York, NY 10011",
    coordinates: { lat: 40.74669, lng: -74.00048 },
    hours: "Mon-Fri 6:30 AM - 7:30 PM, Sat-Sun 7:00 AM - 7:00 PM",
    amenities: ["wifi", "outdoor seating", "mobile ordering"],
  },
  {
    id: "midtown-bryant",
    name: "Blank Street Midtown Bryant",
    address: "2 W 40th St, New York, NY 10018",
    coordinates: { lat: 40.75273, lng: -73.98295 },
    hours: "Mon-Sun 6:00 AM - 9:00 PM",
    amenities: ["wifi", "mobile ordering", "restrooms"],
  },
  {
    id: "flatiron-broadway",
    name: "Blank Street Flatiron Broadway",
    address: "1205 Broadway, New York, NY 10001",
    coordinates: { lat: 40.74446, lng: -73.98952 },
    hours: "Mon-Sun 6:30 AM - 8:00 PM",
    amenities: ["wifi", "outdoor seating", "restrooms"],
  },
  {
    id: "upperwest-columbus",
    name: "Blank Street Upper West Columbus",
    address: "808 Columbus Ave, New York, NY 10025",
    coordinates: { lat: 40.79444, lng: -73.96672 },
    hours: "Mon-Sun 7:00 AM - 7:30 PM",
    amenities: ["wifi", "mobile ordering", "quiet seating"],
  },
  {
    id: "eastvillage-astor",
    name: "Blank Street East Village Astor",
    address: "20 Astor Pl, New York, NY 10003",
    coordinates: { lat: 40.72995, lng: -73.99161 },
    hours: "Mon-Sun 6:30 AM - 8:30 PM",
    amenities: ["wifi", "outdoor seating", "mobile ordering"],
  },
  {
    id: "dumbo-water",
    name: "Blank Street DUMBO Water",
    address: "57 Water St, Brooklyn, NY 11201",
    coordinates: { lat: 40.70338, lng: -73.98917 },
    hours: "Mon-Sun 7:00 AM - 7:00 PM",
    amenities: ["wifi", "mobile ordering", "grab-and-go"],
  },
];
