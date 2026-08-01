import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";

const categories = [
  {
    title: "Services",
    blurb: null,
    items: [
      "Restaurant",
      "Reception",
      "Travel Desk",
      "Free Parking",
      "Car Rental",
      "Volvo Booking",
      "Bonfire",
      "Garden Space",
    ],
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1100&q=80",
  },
  {
    title: "Facilities",
    blurb: null,
    items: ["Pet Friendly", "Room Balcony", "Two Wheeler Rental", "Doctor On Call"],
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1100&q=80",
  },
  {
    title: "Room Services",
    blurb:
      "Executive rooms well furnished with king size bed, wardrobe, and a coffee table with chairs.",
    items: [
      "WiFi",
      "Room Service",
      "Housekeeping",
      "Hygiene",
      "Wakeup Call",
      "Kitchenette",
      "Laundry",
      "Intercom",
    ],
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1100&q=80",
  },
  {
    title: "Explore",
    blurb:
      "Plenty of adventure activities around to make your trip a memorable one.",
    items: [
      "Paragliding",
      "Water Rafting",
      "Trekking",
      "Hot Air Balloon",
      "Mountain View",
      "Hot Water Spring",
      "Bird Watching",
      "Nature Park",
    ],
    img: "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=1100&q=80",
  },
];

export default function AmenitiesPage() {
  return (
    <main>
      <Navbar />

      <section className="relative w-full bg-terracotta py-32 md:py-40 px-6 text-center overflow-hidden">
        <p className="text-cream/80 font-body text-xs tracking-[0.3em] uppercase mb-6">
          Persimmon Farmstead
        </p>
        <h1 className="font-display text-cream text-4xl md:text-6xl leading-tight max-w-2xl mx-auto mb-5">
          Everything that makes your stay
        </h1>
        <p className="text-cream/75 font-body text-base max-w-md mx-auto">
          From everyday comforts to once-in-a-while adventures &mdash; here is
          what&apos;s waiting for you.
        </p>
      </section>

      {categories.map((cat, i) => (
        <section
          key={cat.title}
          className={`relative w-full py-20 md:py-28 px-6 ${
            i % 2 === 0 ? "bg-cream-soft" : "bg-cream"
          }`}
        >
          <div
            className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal>
              <div className="relative aspect-[4/5] w-full max-w-md rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(43,27,17,0.3)]">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-terracotta-dark font-body text-xs tracking-[0.3em] uppercase mb-4">
                0{i + 1}
              </p>
              <h2 className="font-display italic text-ink text-3xl md:text-4xl mb-5">
                {cat.title}
              </h2>

              {cat.blurb && (
                <p className="text-ink/60 font-body text-base leading-relaxed max-w-md mb-7">
                  {cat.blurb}
                </p>
              )}

              <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 max-w-md">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-ink/70 font-body text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="relative w-full bg-cream-soft py-20 px-6 text-center border-t border-ink/10">
        <p className="text-ink/60 font-body text-base mb-6">
          Ready to experience it for yourself?
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-3 rounded-full bg-terracotta text-cream font-body text-sm tracking-wide uppercase px-7 py-3 hover:bg-terracotta-dark transition-colors"
        >
          Book your stay
        </a>
      </section>
    </main>
  );
}