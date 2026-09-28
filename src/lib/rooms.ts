/**
 * Rooms across both properties — Persimmon Farmstead (Badgran / 14 Mile)
 * and Persimmon Farmstead Shanag. Shared by each property's room-cards
 * section and every room's dedicated detail page (/rooms/<slug>).
 * NOTE: images are placeholders — swap for real room photos.
 */

export type Room = {
  slug: string;
  property: "farmstead" | "shanag";
  propertyName: string;
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
  faqs: { q: string; a: string }[];
};

export const rooms: Room[] = [
  {
    slug: "deluxe",
    property: "farmstead",
    propertyName: "Persimmon Farmstead",
    name: "Deluxe Room",
    tag: "Most Popular",
    num: "01",
    guests: "2–3 guests",
    bed: "King bed",
    view: "Orchard & mountains",
    short:
      "Our most-booked room — a cosy king-bedded room with a vaulted pine ceiling, persimmon artwork, and the orchard a few steps away.",
    img: "/images/farmstead/rooms/deluxe-room/deluxe1.webp",
    gallery: [
      "/images/farmstead/rooms/deluxe-room/deluxe1.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe2.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe3.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe4.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe5.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe6.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe7.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe8.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe9.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe10.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe11.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe12.webp",
      "/images/farmstead/rooms/deluxe-room/deluxe13.webp",
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
    faqs: [
      { q: "Is breakfast included in the Deluxe Room?", a: "It's available on request rather than included by default — just mention it when you book, or ask the kitchen the evening before." },
      { q: "How many people can the Deluxe Room sleep?", a: "It's built for 2–3 guests around one king bed. If you'd like a little more floor space for the same price bracket, the Premium Room next door is worth a look." },
      { q: "What's the view like from this room?", a: "You're on the sunny side of the Badgran house, so mornings open onto the orchard with the mountains rising behind it." },
      { q: "Is the bathroom private?", a: "Yes — an attached bathroom with hot water running 24×7, whatever the hour." },
      { q: "Can I check in early or leave late?", a: "Ask us directly and we'll do what we can. As a small, family-run house we're usually able to flex around your travel plans." },
    ],
  },
  {
    slug: "premium",
    property: "farmstead",
    propertyName: "Persimmon Farmstead",
    name: "Premium Room",
    tag: "Breakfast Included",
    num: "02",
    guests: "2 guests",
    bed: "King bed",
    view: "Mountain",
    short:
      "A little more room and a cleaner mountain line — a king-bedded double under the pitched wooden ceiling, with breakfast included.",
    img: "/images/farmstead/rooms/premium-room/pr1.webp",
    gallery: [
      "/images/farmstead/rooms/premium-room/pr1.webp",
      "/images/farmstead/rooms/premium-room/pr2.webp",
      "/images/farmstead/rooms/premium-room/pr3.webp",
      "/images/farmstead/rooms/premium-room/pr4.webp",
      "/images/farmstead/rooms/premium-room/pr5.webp",
      "/images/farmstead/rooms/premium-room/pr6.webp",
      "/images/farmstead/rooms/premium-room/pr7.webp",
      "/images/farmstead/rooms/premium-room/pr8.webp",
      "/images/farmstead/rooms/premium-room/pr9.webp",
      "/images/farmstead/rooms/premium-room/pr10.webp",
      "/images/farmstead/rooms/premium-room/pr11.webp",
      "/images/farmstead/rooms/premium-room/pr12.webp",
      "/images/farmstead/rooms/premium-room/pr13.webp",
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
    faqs: [
      { q: "Is breakfast really included, or on request like the Deluxe?", a: "Included — a proper breakfast is part of every night's stay here, no need to ask ahead." },
      { q: "How much bigger is this than the Deluxe Room?", a: "It's the same warm house and king bed, but with noticeably more floor space — room to leave a suitcase open and pull a chair to the window." },
      { q: "What does the mountain view actually look like?", a: "A cleaner, more direct line onto the peaks than the Deluxe gets, especially in the morning light." },
      { q: "How many guests does it comfortably sleep?", a: "It's set up for 2 guests around one king bed — a couple's room rather than a family one." },
      { q: "Is this room good for a longer stay?", a: "It's the one we'd recommend for that — the extra space makes a real difference once you're past a few nights." },
    ],
  },
  {
    slug: "balcony",
    property: "farmstead",
    propertyName: "Persimmon Farmstead",
    name: "Balcony & Mountain-View Room",
    tag: "Best Views",
    num: "03",
    guests: "1–2 guests",
    bed: "Double bed",
    view: "Mountain, with sit-out",
    short:
      "A snug room with a lounge corner and French windows opening to the pine-clad slopes — pull a chair out for the morning sun.",
    img: "/images/farmstead/rooms/premium-room/pr3.webp",
    gallery: [
      "/images/farmstead/rooms/premium-room/pr1.webp",
      "/images/farmstead/rooms/premium-room/pr2.webp",
      "/images/farmstead/rooms/premium-room/pr3.webp",
      "/images/farmstead/rooms/premium-room/pr4.webp",
      "/images/farmstead/rooms/premium-room/pr5.webp",
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
    faqs: [
      { q: "Does the room really have a private balcony?", a: "Yes — a proper sit-out through French windows, facing straight onto the pine-clad slopes. It's the main reason people book this room." },
      { q: "Is a double bed enough, or is it cramped?", a: "It's a snug room by design — a double bed and a reading corner, with the view doing most of the work. If square footage matters more to you than the outlook, the Premium Room has more floor space." },
      { q: "How many guests can stay here?", a: "It suits 1–2 guests comfortably." },
      { q: "Is breakfast included?", a: "It's available on request — just let us know the evening before and it'll be ready." },
      { q: "What's the best time of day to be in this room?", a: "Morning, without question. The sun comes up over the ranges and pours straight through the French windows." },
    ],
  },

  /* ── Persimmon Farmstead Shanag — four cottages on the orchard lawns ── */
  {
    slug: "wooden-hut-cottage",
    property: "shanag",
    propertyName: "Persimmon Farmstead Shanag",
    name: "Wooden Hut Cottage",
    tag: "Cosy & Rustic",
    num: "01",
    guests: "2 guests",
    bed: "Double bed",
    view: "Orchard views",
    short:
      "A standalone timber hut set at the edge of the orchard — small, warm, and properly private, with its own little sit-out under the apple trees.",
    img: "/images/shanag/rooms/wooden-hut-cottage/WHC1.webp",
    gallery: [
      "/images/shanag/rooms/wooden-hut-cottage/WHC1.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC2.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC3.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC4.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC5.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC6.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC7.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC8.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC9.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC10.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC11.webp",
      "/images/shanag/rooms/wooden-hut-cottage/WHC12.webp",
    ],
    location: "Shanag (Bahang)",
    body: [
      "The Wooden Hut is the smallest thing we build, and on purpose. It sits a little apart from the main cottages, timber-clad on all sides, with just enough room for a proper double bed and a chair by the window — the kind of place you retreat to rather than move around in.",
      "Step outside and you're straight into the orchard: apple trees a few feet from the door, grass underfoot, snow peaks somewhere past the ridge on a clear morning. It's the quietest corner of the property, and guests who want a couple of nights to switch off tend to ask for this one by name.",
      "It's compact and we say so upfront — this isn't a suite, it's a hut. The bathroom is attached and the hot water is reliable, but if you need more floor space, the 2BHK or Deluxe Cottage next door will suit you better.",
    ],
    quote:
      "It's the smallest room we have, and the one people miss most once they've left. Sometimes small is the whole point.",
    details: ["Double bed", "Timber-clad interior", "Private sit-out", "Attached bathroom, 24×7 hot water", "Free Wi-Fi", "Orchard-facing window"],
    included: ["Breakfast on request", "24×7 hot water", "Free Wi-Fi", "Winter heating", "Bonfire evenings", "Free parking"],
    bestFor: ["Couples", "Solo travellers", "A quiet weekend"],
    faqs: [
      { q: "How big is the Wooden Hut Cottage really?", a: "Small, by design — a double bed and a window seat, built as a standalone timber hut rather than a room inside a larger building. If you want more space, the 2BHK or Deluxe Cottage are better fits." },
      { q: "Is it separate from the other cottages?", a: "Yes — it's a freestanding hut a short walk from the main buildings, which is exactly why it's the quietest option on the property." },
      { q: "Does it have its own bathroom?", a: "Yes, a private attached bathroom with hot water running 24×7." },
      { q: "Is breakfast included?", a: "It's available on request — just mention it when you book or ask the evening before." },
      { q: "Is this a good fit for two people travelling together?", a: "It's exactly what it's built for — a couple or a solo traveller wanting a private, quiet stay rather than a large room." },
    ],
  },
  {
    slug: "2bhk-cottage",
    property: "shanag",
    propertyName: "Persimmon Farmstead Shanag",
    name: "2BHK Cottage",
    tag: "Family Favourite",
    num: "02",
    guests: "4–5 guests",
    bed: "2 bedrooms · Double + Twin",
    view: "Garden & mountain views",
    short:
      "A full two-bedroom cottage with its own living space and kitchenette — room to spread out, with garden and mountain views from both bedrooms.",
    img: "/images/shanag/rooms/2bhk-cottage/2BHKC1.webp",
    gallery: [
      "/images/shanag/rooms/2bhk-cottage/2BHKC1.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC2.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC3.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC4.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC5.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC6.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC7.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC8.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC9.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC10.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC11.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC12.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC13.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC14.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC15.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC16.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC17.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC18.webp",
      "/images/shanag/rooms/2bhk-cottage/2BHKC19.webp",
    ],
    location: "Shanag (Bahang)",
    body: [
      "The 2BHK is the cottage most families end up in — two proper bedrooms (one with a double bed, one with twins), a shared living area, and a kitchenette if you'd rather cook a meal yourself than always eat out. It's a stone cottage, so it stays cool through summer afternoons and warms up fast once the heater's on at night.",
      "Both bedrooms look out over the garden, with the mountains sitting behind the tree line — the kind of view that's easy to take for granted by day three. The living room is small but genuinely usable, not just a hallway between the bedrooms.",
      "It works well for two couples travelling together or a family of four to five, and it's close enough to the main house that breakfast and help are never far off, without feeling like you're sharing a wall with anyone.",
    ],
    quote:
      "Two bedrooms, a living room that actually gets used, and the mountains sitting right behind the garden. It's the one we point families toward.",
    details: ["2 bedrooms", "Double + twin beds", "Private living room", "Kitchenette", "Attached bathrooms, 24×7 hot water", "Free Wi-Fi"],
    included: ["Breakfast included", "24×7 hot water", "Free Wi-Fi", "Winter heating", "Bonfire evenings", "Free parking"],
    bestFor: ["Families", "Two couples travelling together", "Longer stays"],
    faqs: [
      { q: "How many people does the 2BHK Cottage sleep?", a: "Comfortably 4–5 guests, across a double bedroom and a twin bedroom." },
      { q: "Is there a kitchen?", a: "A kitchenette, yes — enough to make tea, breakfast, or a simple meal. For anything more, the in-house restaurant is close by." },
      { q: "Is breakfast included?", a: "Yes, breakfast is included with this cottage." },
      { q: "Do both bedrooms have their own bathroom?", a: "Yes, each bedroom has an attached bathroom with hot water running 24×7." },
      { q: "Is it good for two families travelling together?", a: "It's one of the more popular setups for exactly that — two bedrooms, a shared living space, and enough separation that nobody's tripping over each other." },
    ],
  },
  {
    slug: "3bhk-cottage",
    property: "shanag",
    propertyName: "Persimmon Farmstead Shanag",
    name: "3BHK Cottage",
    tag: "Best for Groups",
    num: "03",
    guests: "6–7 guests",
    bed: "3 bedrooms",
    view: "Orchard & valley views",
    short:
      "The largest cottage on the property — three bedrooms, a proper living area, and orchard-to-valley views, built for groups who want to stay together.",
    img: "/images/shanag/rooms/3bhk-cottage/3BHKC1.webp",
    gallery: [
      "/images/shanag/rooms/3bhk-cottage/3BHKC1.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC2.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC3.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC4.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC5.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC6.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC7.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC8.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC9.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC10.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC11.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC12.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC13.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC14.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC15.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC16.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC17.webp",
      "/images/shanag/rooms/3bhk-cottage/3BHKC18.webp",
    ],
    location: "Shanag (Bahang)",
    body: [
      "The 3BHK is the whole-cottage option — three bedrooms, a shared living room big enough to actually gather in, and enough space that a group of six or seven can stay together without feeling stacked on top of each other. It's built from stone in the same style as the 2BHK, just larger.",
      "The view runs from the orchard right out to the valley beyond it, and the living room's windows are positioned to catch most of it. It's the cottage we suggest for family reunions, groups of friends splitting a trip, or anyone who'd rather book one place than three separate rooms.",
      "Because it's the largest unit on the property, it tends to book out first during peak season — worth requesting early if a specific week matters to you.",
    ],
    quote:
      "One cottage, three bedrooms, and a living room that fits the whole group. It's the option people book when they don't want to split up.",
    details: ["3 bedrooms", "Shared living room", "Orchard-to-valley views", "Kitchenette", "Attached bathrooms, 24×7 hot water", "Free Wi-Fi"],
    included: ["Breakfast included", "24×7 hot water", "Free Wi-Fi", "Winter heating", "Bonfire evenings", "Free parking"],
    bestFor: ["Groups", "Family reunions", "Friends travelling together"],
    faqs: [
      { q: "How many guests can the 3BHK Cottage sleep?", a: "Comfortably 6–7 guests across three bedrooms." },
      { q: "Is it one cottage or three separate rooms?", a: "One cottage — three bedrooms under the same roof, sharing a living room, rather than three separate bookings." },
      { q: "Does it book out quickly?", a: "It's the largest unit on the property, so yes, especially in peak season. Worth requesting early if specific dates matter." },
      { q: "Is breakfast included?", a: "Yes, breakfast is included with this cottage." },
      { q: "Is it suitable for a family reunion or group trip?", a: "It's exactly what we built it for — enough bedrooms and shared space that a larger group can stay together comfortably." },
    ],
  },
  {
    slug: "deluxe-cottage",
    property: "shanag",
    propertyName: "Persimmon Farmstead Shanag",
    name: "Deluxe Cottage",
    tag: "Most Popular",
    num: "04",
    guests: "2–3 guests",
    bed: "King bed",
    view: "Snow peak views",
    short:
      "Our most-requested cottage at Shanag — a king-bedded stone cottage with the clearest snow-peak views on the property.",
    img: "/images/shanag/rooms/deluxe-cottage/cottage1.webp",
    gallery: [
      "/images/shanag/rooms/deluxe-cottage/cottage1.webp",
      "/images/shanag/rooms/deluxe-cottage/cottage2.webp",
      "/images/shanag/rooms/deluxe-cottage/cottage3.webp",
      "/images/shanag/rooms/deluxe-cottage/cottage4.webp",
      "/images/shanag/rooms/deluxe-cottage/cottage5.webp",
      "/images/shanag/rooms/deluxe-cottage/cottage6.webp",
      "/images/shanag/rooms/deluxe-cottage/cottage7.webp",
    ],
    location: "Shanag (Bahang)",
    body: [
      "The Deluxe Cottage is the one most guests ask for by name once they've seen a photo of the view. It's a stone cottage — cool in summer, warm once the heater's running — with a proper king bed and windows positioned squarely at the snow peaks on the far side of the valley.",
      "It's finished a notch above the other cottages: a little more attention to the furnishing, a little more floor space, and a sit-out that catches the last light in the evening. Guests who've stayed in the Wooden Hut on an earlier trip tend to upgrade here the next time.",
      "It suits two guests comfortably, or a couple with a child on request. The bathroom is attached and the hot water runs all day, every day, whatever the season.",
    ],
    quote:
      "Ask any returning guest which cottage to book and most of them will say this one — the view alone does most of the convincing.",
    details: ["King bed", "Stone-built interior", "Private sit-out", "Snow-peak-facing windows", "Attached bathroom, 24×7 hot water", "Free Wi-Fi"],
    included: ["Breakfast included", "24×7 hot water", "Free Wi-Fi", "Winter heating", "Bonfire evenings", "Free parking"],
    bestFor: ["Couples", "Returning guests", "Anyone who wants the best view"],
    faqs: [
      { q: "What makes the Deluxe Cottage different from the others?", a: "Mainly the view — it's positioned to face the snow peaks directly — plus a little more finish and floor space than the Wooden Hut." },
      { q: "How many guests does it sleep?", a: "It's built for 2–3 guests around one king bed." },
      { q: "Is breakfast included?", a: "Yes, breakfast is included with this cottage." },
      { q: "Is it the same price as the other cottages?", a: "It's our most-requested cottage, so please check current availability and rates when you send a request — we'll confirm everything over WhatsApp." },
      { q: "Can I request this cottage specifically?", a: "Yes — just mention it when you reach out, and we'll confirm whether your dates are available." },
    ],
  },
];

export function getRoom(slug: string) {
  return rooms.find((r) => r.slug === slug);
}