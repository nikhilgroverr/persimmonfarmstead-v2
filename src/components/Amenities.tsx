"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const highlights = [
  {
    name: "Paragliding",
    tag: "Adventure",
    img: "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=1000&q=80",
    rotate: "-rotate-2",
    width: "w-[200px] md:w-[270px]",
    aspect: "aspect-[4/5]",
    drop: "mt-4",
  },
  {
    name: "The Pool",
    tag: "Leisure",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
    rotate: "rotate-3",
    width: "w-[110px] md:w-[150px]",
    aspect: "aspect-square",
    drop: "mt-14",
  },
  {
    name: "Bonfire Nights",
    tag: "Evenings",
    img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=800&q=80",
    rotate: "-rotate-1",
    width: "w-[140px] md:w-[190px]",
    aspect: "aspect-[3/4]",
    drop: "mt-6",
  },
  {
    name: "Housekeeping",
    tag: "Comfort",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    rotate: "rotate-2",
    width: "w-[100px] md:w-[130px]",
    aspect: "aspect-square",
    drop: "mt-18",
  },
  {
    name: "Trekking",
    tag: "Adventure",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    rotate: "-rotate-2",
    width: "w-[110px] md:w-[140px]",
    aspect: "aspect-[4/5]",
    drop: "mt-8",
  },
  {
    name: "Farm Dining",
    tag: "Cuisine",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    rotate: "rotate-1",
    width: "w-[150px] md:w-[200px]",
    aspect: "aspect-[3/4]",
    drop: "mt-3",
  },
  {
    name: "The Garden",
    tag: "Grounds",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    rotate: "-rotate-3",
    width: "w-[130px] md:w-[170px]",
    aspect: "aspect-[5/4]",
    drop: "mt-10",
  },
];

function Peg() {
  return (
    <svg
      width="22"
      height="28"
      viewBox="0 0 22 28"
      className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 drop-shadow-sm"
      aria-hidden="true"
    >
      <rect x="2" y="0" width="18" height="20" rx="3" fill="var(--color-terracotta-dark)" />
      <rect x="9.5" y="0" width="3" height="20" fill="var(--color-cream-soft)" opacity="0.3" />
      <circle cx="11" cy="22" r="3" fill="var(--color-terracotta-dark)" />
    </svg>
  );
}

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="relative w-full bg-cream-soft py-24 md:py-32 px-6 border-t border-ink/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-10 bg-terracotta" aria-hidden="true" />
            <p className="text-terracotta-dark font-body text-xs tracking-[0.3em] uppercase">
              Amenities &amp; Experiences
            </p>
            <span className="h-px w-10 bg-terracotta" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-ink text-center text-3xl md:text-4xl leading-tight mb-4 max-w-lg mx-auto">
            More than a place to stay
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-ink/55 font-body text-base text-center max-w-md mx-auto mb-24 md:mb-32">
            From quiet mornings by the pool to adventure in the hills beyond
            &mdash; there&apos;s a reason to stay a little longer.
          </p>
        </Reveal>

        <div className="relative mb-20 md:mb-28">
          <svg
            viewBox="0 0 1200 70"
            preserveAspectRatio="none"
            className="absolute top-0 left-0 w-full h-16 md:h-20"
            aria-hidden="true"
          >
            <path
              d="M 0 6 Q 600 85 1200 6"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="3.5"
              opacity="0.4"
            />
            <path
              d="M 0 6 Q 600 85 1200 6"
              fill="none"
              stroke="var(--color-terracotta-dark)"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>

          <div className="relative flex flex-wrap justify-center items-start gap-x-5 md:gap-x-8 gap-y-10 pt-10 md:pt-14">
            {highlights.map((item, i) => (
              <Reveal key={item.name} delay={0.2 + i * 0.07} y={28}>
                <Link
                  href="/amenities"
                  className={`group relative block ${item.width} ${item.rotate} ${item.drop} transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-20`}
                >
                  <Peg />
                  <div
                    className={`relative ${item.aspect} rounded-lg overflow-hidden shadow-[0_20px_40px_-15px_rgba(43,27,17,0.35)] border-[5px] border-cream-soft`}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-cream/70 font-body text-[9px] tracking-[0.2em] uppercase mb-0.5">
                        {item.tag}
                      </p>
                      <p className="font-display italic text-cream text-sm md:text-base leading-tight">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.7}>
          <div className="flex justify-center">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-3 rounded-full bg-terracotta-dark px-8 py-3.5 text-cream font-body text-sm tracking-wide uppercase transition-all duration-300 hover:bg-ink hover:scale-[1.03]"
            >
              Explore all amenities
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}