/**
 * Single source of truth for Persimmon Farmstead's contact & brand details.
 *
 * Everything user-facing (Footer, CTA, contact page, our-story, navbar) should
 * pull from here so a number/email is only ever changed in one place.
 */

export type Phone = {
  /** Human-readable, e.g. "+91 62306 45166" */
  label: string;
  /** Digits only with country code, e.g. "916230645166" */
  raw: string;
  /** What this line is for */
  role: string;
};

export const site = {
  name: "Persimmon Farmstead",
  established: 2021,
  tagline: "Elegant holiday stays in Hallan Valley, Himachal Pradesh.",

  email: "reservations@persimmonfarmstead.com",

  phones: [
    { label: "+91 62306 45166", raw: "916230645166", role: "Reservations" },
    { label: "+91 99999 75545", raw: "919999975545", role: "Reservations" },
    { label: "+91 88005 00292", raw: "918800500292", role: "Shanag Property" },
  ] satisfies Phone[],

  social: {
    instagram: {
      handle: "@persimmon_farmstead_resort",
      url: "https://www.instagram.com/persimmon_farmstead_resort/",
    },
    facebook: {
      handle: "Persimmon Farmstead",
      url: "https://www.facebook.com/",
    },
  },

  address: {
    lines: [
      "Hallan Valley, Manali Tehsil",
      "Kullu District, Himachal Pradesh, India",
    ],
    region: "Hallan Valley, Himachal",
    coordinates: { lat: 32.130316, lng: 77.155124, label: "32.1303° N · 77.1551° E" },
    mapEmbed: "https://www.google.com/maps?q=32.130316,77.155124&z=11&output=embed",
    mapLink:
      "https://www.google.com/maps?ll=32.130316,77.155124&z=10&t=m&hl=en-US&gl=US&mapclient=embed&cid=12947353045947150512",
  },

  /** Second property near Old Manali */
  suites: {
    name: "Persimmon Suites",
    location: "Shanag, Old Manali, Himachal Pradesh",
    coordinates: { lat: 32.306541, lng: 77.17561 },
    mapEmbed: "https://www.google.com/maps?q=32.306541,77.17561&z=11&output=embed",
    mapLink:
      "https://www.google.com/maps?ll=32.306541,77.17561&z=10&t=m&hl=en-US&gl=US&mapclient=embed&cid=3627561132221631321",
  },
} as const;

export type Property = {
  slug: string;
  name: string;
  /** true for the flagship building */
  flagship: boolean;
  /** short location line for eyebrows, e.g. "Badgran (14 Mile) · Manali" */
  locationShort: string;
  /** one-line positioning under the name */
  tagline: string;
  /** full descriptive paragraph */
  description: string;
  rating: number;
  reviews: string;
  amenities: string[];
  coordinates: { lat: number; lng: number };
  mapEmbed: string;
  mapLink: string;
  /** hero / card image — swap these for real property photos */
  image: string;
  gallery: string[];
};

/**
 * The two Persimmon properties. NOTE: `image`/`gallery` use tasteful
 * placeholders — replace with real building photos when available.
 */
export const properties: Property[] = [
    {
    slug: "shanag",
    name: "Persimmon Farmstead Shanag",
    flagship: false,
    locationShort: "Shanag (Bahang) · Manali",
    tagline: "Chalets & cottages on orchard lawns",
    description:
      "Our boutique hotel in Shanag village near Bahang, about 4–5 km north of Manali. It blends wooden chalets and stone cottages across wide orchard lawns — close enough to Old Manali and Mall Road to wander in, far enough to wake up to apple trees and snow-kissed peaks.",
    rating: 4.9,
    reviews: "141+",
    amenities: [
      "Wooden chalets",
      "Stone cottages",
      "Orchard lawns",
      "Near Old Manali",
    ],
    coordinates: { lat: 32.306541, lng: 77.17561 },
    mapEmbed: "https://www.google.com/maps?q=32.306541,77.17561&z=13&output=embed",
    mapLink:
      "https://www.google.com/maps?ll=32.306541,77.17561&z=10&t=m&hl=en-US&gl=US&mapclient=embed&cid=3627561132221631321",
    image: "/images/HOMESHOWCASESHANAG2.webp",
    gallery: [
      "/images/HOMESHOWCASESHANAG4.webp",
      "/images/HOMESHOWCASESHANAG3.webp",
      "/images/HOMESHOWCASESHANAG2.webp",
    ],
  },
  {
    slug: "farmstead",
    name: "Persimmon Farmstead",
    flagship: true,
    locationShort: "Badgran (14 Mile) · Manali",
    tagline: "Our flagship boutique hotel",
    description:
      "Our flagship boutique hotel at 14 Mile in Badgran on the Kullu–Manali highway, about 14 km before Manali town. Every room catches the morning sun and looks onto the mountains, and the in-house restaurant is the reason guests come back.",
    rating: 4.9,
    reviews: "141+",
    amenities: [
      "Mountain-facing rooms",
      "In-house restaurant",
      "Morning sun",
      "Easy highway access",
    ],
    coordinates: { lat: 32.130316, lng: 77.155124 },
    mapEmbed: "https://www.google.com/maps?q=32.130316,77.155124&z=13&output=embed",
    mapLink:
      "https://www.google.com/maps?ll=32.130316,77.155124&z=10&t=m&hl=en-US&gl=US&mapclient=embed&cid=12947353045947150512",
    image: "/images/HOMESHOWCASEFARMSTEAD2.webp",
    gallery: [
      "/images/HOMESHOWCASEFARMSTEAD2.webp",
      "/images/HOMESHOWCASEFARMSTEAD3.webp",
      "/images/HOMESHOWCASEFARMSTEAD4.webp",
    ],
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

/** Primary phone used for one-off "call us" CTAs. */
export const primaryPhone = site.phones[0];

/** mailto: link with an optional pre-filled subject. */
export function mailtoHref(subject?: string) {
  const base = `mailto:${site.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

/** tel: link for a phone (accepts the raw digits). */
export function telHref(raw: string) {
  return `tel:+${raw}`;
}

/** wa.me link for a phone (accepts the raw digits). */
export function waHref(raw: string) {
  return `https://wa.me/${raw}`;
}
