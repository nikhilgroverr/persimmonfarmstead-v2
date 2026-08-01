"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const stays = [
  {
    name: "Garden Rooms",
    desc: "Tucked beside the orchard, with private balconies and views that wake you up slowly.",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80",
    number: "01",
    slug: "garden-rooms",
  },
  {
    name: "Farmhouse Suites",
    desc: "Spacious, sunlit, and styled with handcrafted wood &mdash; built for longer, slower stays.",
    img: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1000&q=80",
    number: "02",
    slug: "farmhouse-suites",
  },
];

export default function Stays() {
  return (
    <section
      id="stay"
      className="relative w-full bg-cream-soft py-24 md:py-32 px-6 border-t border-ink/10"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-10 bg-terracotta" aria-hidden="true" />
            <p className="text-terracotta-dark font-body text-xs tracking-[0.3em] uppercase">
              Where to Stay
            </p>
            <span className="h-px w-10 bg-terracotta" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display italic text-ink text-center text-3xl md:text-5xl leading-tight mb-20 md:mb-24 max-w-lg mx-auto">
            Two ways to make it your own
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16">
          {stays.map((stay, i) => (
            <Reveal key={stay.name} delay={0.15 + i * 0.12} y={40}>
              <div className="group relative">
                <span
                  className="absolute -top-10 left-1/2 -translate-x-1/2 font-display italic text-terracotta/25 text-7xl select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {stay.number}
                </span>

                <div className="relative aspect-[16/11] w-full rounded-sm overflow-hidden shadow-[0_35px_70px_-20px_rgba(43,27,17,0.35)] mb-8">
                  <img
                    src={stay.img}
                    alt={stay.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-cream/40" />
                </div>

                <h3 className="font-display text-ink text-2xl md:text-[2rem] tracking-tight text-center mb-3">
                  {stay.name}
                </h3>

                <span className="block w-10 h-px bg-terracotta/40 mx-auto mb-5" aria-hidden="true" />

                <p
                  className="text-ink/60 font-body text-sm leading-relaxed text-center max-w-sm mx-auto mb-8"
                  dangerouslySetInnerHTML={{ __html: stay.desc }}
                />

                <div className="flex justify-center">
                  <Link
                    href={`/stays/${stay.slug}`}
                    className="group relative inline-flex items-center gap-2.5 font-body text-xs tracking-[0.2em] uppercase text-terracotta-dark border border-terracotta-dark/40 px-7 py-3.5 transition-all duration-300 hover:bg-terracotta-dark hover:text-cream hover:border-terracotta-dark hover:px-8"
                  >
                    View more details
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}