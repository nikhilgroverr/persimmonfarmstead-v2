"use client";

import Reveal from "./Reveal";

export default function Services() {
  return (
    <section
      id="amenities"
      className="relative w-full bg-cream-soft py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center mb-24 md:mb-32">
          <p
            className="absolute -top-16 md:-top-24 left-0 md:-left-4 font-display text-[3.2rem] md:text-[5.5rem] leading-none tracking-tight select-none pointer-events-none whitespace-nowrap z-0"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px var(--color-terracotta-dark)",
              opacity: 0.16,
            }}
            aria-hidden="true"
          >
            first class
            <br />
            services
          </p>

          <div className="relative z-10">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-10 bg-terracotta" aria-hidden="true" />
                <p className="text-terracotta-dark font-body text-xs tracking-[0.3em] uppercase">
                  Services
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-ink text-3xl md:text-[2.6rem] leading-[1.15] mb-6">
                Everything you need,
                <br />
                nothing you don&apos;t
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-ink/60 font-body text-base leading-relaxed max-w-md mb-4">
                From sunrise swims to candlelit evenings, every corner of the
                farmstead is shaped around comfort. Four spaces, each cared
                for the same way you would care for your own home.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-ink/60 font-body text-base leading-relaxed max-w-md mb-10">
                Whether it&apos;s a quiet swim before breakfast, a long meal
                under the orchard lights, or an hour at the spa with nothing
                on your mind &mdash; the farmstead moves at your pace, not a
                schedule&apos;s.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-terracotta-dark font-body text-sm tracking-wide uppercase group"
              >
                <span className="w-9 h-9 rotate-45 border border-terracotta-dark/50 flex items-center justify-center transition-all duration-300 group-hover:bg-terracotta-dark group-hover:border-terracotta-dark group-hover:scale-110">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="-rotate-45 text-terracotta-dark transition-colors duration-300 group-hover:text-cream"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <span className="transition-colors duration-300 group-hover:text-ink">
                  Read more
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={48}>
            <div className="relative h-[460px] md:h-[560px] flex items-center justify-center">
              <div
                className="hidden md:block absolute w-[600px] h-[600px] rounded-full border border-terracotta/15"
                aria-hidden="true"
              />
              <div
                className="hidden md:block absolute w-[480px] h-[480px] rounded-full border border-terracotta/20"
                aria-hidden="true"
              />
              <div
                className="hidden md:block absolute w-[380px] h-[380px] rounded-full border border-terracotta/25"
                aria-hidden="true"
              />

              <div className="relative w-[88%] md:w-[420px] h-[86%] md:h-[480px] rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(43,27,17,0.35)] z-10">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1100&q=80"
                  alt="Farmstead lounge"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute left-0 md:left-[-10%] bottom-6 w-[44%] md:w-[220px] h-[36%] md:h-[200px] rounded-xl overflow-hidden border-8 border-cream-soft shadow-[0_30px_60px_-15px_rgba(43,27,17,0.35)] z-20">
                <img
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=700&q=80"
                  alt="Farmstead detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}