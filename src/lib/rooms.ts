/**
 * The three rooms at Persimmon Farmstead (Badgran / 14 Mile).
 * Shared by the rooms section on the property page and each room's
 * dedicated detail page (/rooms/<slug>).
 * NOTE: images are placeholders — swap for real room photos.
 */

export type Room = {
  slug: string;
  name: string;
  tag: string;
  num: string;
  guests: string;
  bed: string;
  view: string;
  short: string;
  img: string;
  gallery: string[];
  location: string;
  body: string[];
  quote: string;
  details: string[];
  included: string[];
  bestFor: string[];
};

export const rooms: Room[] = [
  {
    slug: "deluxe",
    name: "Deluxe Room",
    tag: "Most Popular",
    num: "01",
    guests: "2–3 guests",
    bed: "King bed",
    view: "Orchard & mountains",
    short:
      "Our most-booked room — a cosy king-bedded room with a vaulted pine ceiling, persimmon artwork, and the orchard a few steps away.",
    img: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1400&q=85",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=85",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400&q=85",
    ],
    location: "Badgran (14 Mile)",
    body: [
      "The Deluxe is the room we put most first-time guests in, and the one they ask for by name when they come back. It sits on the sunny side of the Badgran house, so the first light comes in over the orchard and lands on the bed — in winter that early warmth is the whole point of the room.",
      "Inside it's warm timber and a vaulted pine ceiling, a proper king bed made up with layered quilts, and a couple of persimmon-toned pieces on the wall that the room is named for. Step out and the apple rows start a few metres from the door; the mountains hold the skyline beyond them.",
      "We'll be honest about size, because we'd rather you arrive happy: this is a cosy, well-made room built for sleeping deep and waking to the view, not a sprawling suite. The bathroom is compact but the hot water runs 24×7, and the room heats up fast on a cold night.",
    ],
    quote:
      "Cosy is the honest word — a warm, characterful room rather than a suite. If you want a little more floor space, the Premium room next door has it.",
    details: ["King bed", "Vaulted pine ceiling", "Attached bathroom, 24×7 hot water", "Free Wi-Fi", "Morning sun", "Room service"],
    included: ["Breakfast on request", "24×7 hot water", "Free Wi-Fi", "Winter heating", "Bonfire evenings", "Free parking"],
    bestFor: ["Couples", "Short mountain breaks", "First-time guests"],
  },
  {
    slug: "premium",
    name: "Premium Room",
    tag: "Breakfast Included",
    num: "02",
    guests: "2 guests",
    bed: "King bed",
    view: "Mountain",
    short:
      "A little more room and a cleaner mountain line — a king-bedded double under the pitched wooden ceiling, with breakfast included.",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=85",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1400&q=85",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400&q=85",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1400&q=85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=85",
    ],
    location: "Badgran (14 Mile)",
    body: [
      "The Premium is the Deluxe with room to stretch. It's a step up in floor space and gets a cleaner line onto the mountains — the kind of room where you can leave a suitcase open, pull a chair to the window, and not feel you're climbing over anything.",
      "It keeps everything guests love about the house: the pitched wooden ceiling, the layered king bed, and the quiet that comes from being a minute off the highway but a world away from its noise. Breakfast is included, and the kitchen is happy to send it up when you'd rather not move.",
      "If the Deluxe is our cosy classic, the Premium is the easy upgrade — a touch more space and light for not very much more.",
    ],
    quote:
      "The room we recommend for a slightly longer stay — a little more space, the same warm house.",
    details: ["King bed", "Pitched wooden ceiling", "Extra floor space", "Attached bathroom, 24×7 hot water", "Free Wi-Fi", "Room service"],
    included: ["Breakfast included", "24×7 hot water", "Free Wi-Fi", "Winter heating", "Bonfire evenings", "Free parking"],
    bestFor: ["Couples", "Longer stays", "A little more space"],
  },
  {
    slug: "balcony",
    name: "Balcony & Mountain-View Room",
    tag: "Best Views",
    num: "03",
    guests: "1–2 guests",
    bed: "Double bed",
    view: "Mountain, with sit-out",
    short:
      "A snug room with a lounge corner and French windows opening to the pine-clad slopes — pull a chair out for the morning sun.",
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400&q=85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=85",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=85",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1400&q=85",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85",
    ],
    location: "Badgran (14 Mile)",
    body: [
      "This is the room for people who come to Manali for the view and mean it. A lounge corner and French windows open straight onto the pine-clad slopes, and there's a sit-out to take your chai to while the valley wakes up.",
      "It's snug by design — a double bed, a reading corner, and the mountains doing the decorating. Mornings are the best of it: the sun comes up over the ranges and straight through the windows, and the whole room turns gold for an hour.",
      "Pick this one if the balcony and the outlook matter more to you than square footage. For pure view-per-rupee, it's the one we'd choose.",
    ],
    quote:
      "The best outlook in the house — a snug room that trades a little space for a lot of view.",
    details: ["Double bed", "Private sit-out / balcony", "French windows", "Lounge corner", "Attached bathroom, 24×7 hot water", "Free Wi-Fi"],
    included: ["Breakfast on request", "24×7 hot water", "Free Wi-Fi", "Winter heating", "Bonfire evenings", "Free parking"],
    bestFor: ["View lovers", "Couples", "Morning people"],
  },
];

export function getRoom(slug: string) {
  return rooms.find((r) => r.slug === slug);
}
