"use client";

import Reveal from "./Reveal";

const services = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 12c1.5 2 3 2 4.5 0s3-2 4.5 0 3 2 4.5 0 3-2 4.5 0" />
        <path d="M2 17c1.5 2 3 2 4.5 0s3-2 4.5 0 3 2 4.5 0 3-2 4.5 0" />
        <path d="M6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
      </svg>
    ),
    name: "The Pool",
    desc: "Open early for a quiet lap before breakfast, or a slow afternoon float once the sun's fully up.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 2v6a2 2 0 0 1-4 0V2" /><path d="M5 8v14" /><path d="M17 2c-2 0-3 2-3 6 0 2 1 3 3 3v11" />
      </svg>
    ),
    name: "The Restaurant",
    desc: "Everything comes out of our own kitchen garden and the day's market run — not a printed menu made in advance.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21a6 6 0 0 0 6-6c0-3-2-4-3-7 0 2-1 3-2 3-1-2 0-4-1-6-2 3-4 5-4 10a6 6 0 0 0 4 6z" />
      </svg>
    ),
    name: "The Spa",
    desc: "One room, no appointments rushed — book an hour and we'll actually give you the hour.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 21h16" /><path d="M12 3v9" /><path d="M8 21c0-4 1.8-6 4-6s4 2 4 6" /><circle cx="12" cy="6" r="3" />
      </svg>
    ),
    name: "Bonfire & Garden",
    desc: "Lit most evenings the weather allows — no set time, just whoever's around when the first log catches.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-cream-soft py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center mb-20 md:mb-28">
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
                  Amenities & Services
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="italic text-ink leading-[1.15] mb-3"
                style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2rem, 4.2vw, 2.8rem)", letterSpacing: "-0.01em" }}
              >
                Run by people who live here, too.
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex items-center gap-2.5 mb-8" aria-hidden="true">
                <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: "var(--color-accent)", opacity: 0.85 }} />
                <span className="h-px w-14" style={{ background: "linear-gradient(to right, var(--color-accent), transparent)" }} />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-ink/60 font-body text-base leading-relaxed max-w-md mb-4">
                Our boutique hotel in Manali runs on a small staff who genuinely
                live on the property, not a rotating crew clocking in from town —
                which is why the pool gets skimmed at 6am without being asked,
                and the kitchen never seems to run out of the thing you actually
                wanted.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-ink/60 font-body text-base leading-relaxed max-w-md mb-10">
                None of it runs on a fixed schedule. The pool's open whenever
                there's light in the sky, the restaurant serves what came in
                that morning, and if you want the spa at 7pm instead of 2pm,
                just ask — someone's usually around.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7 mb-10 max-w-lg">
                {services.map((s) => (
                  <div key={s.name} className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                        style={{ background: "rgba(212,168,83,0.14)", color: "var(--color-terracotta-dark)" }}
                      >
                        {s.icon}
                      </span>
                      <h3 className="font-body text-[13.5px] font-semibold tracking-wide text-ink">{s.name}</h3>
                    </div>
                    <p className="text-ink/55 font-body text-[13px] leading-relaxed pl-12">{s.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <a href="#contact"
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
                  Ask us anything
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
                  alt="Farmstead pool and lounge area at our boutique hotel in Manali"
                  className="w-full h-full object-cover"
                />
                <span
                  aria-hidden
                  className="absolute top-4 left-4 w-6 h-6 pointer-events-none"
                  style={{ borderTop: "1px solid var(--color-accent)", borderLeft: "1px solid var(--color-accent)", opacity: 0.8 }}
                />
                <span
                  aria-hidden
                  className="absolute bottom-4 right-4 w-6 h-6 pointer-events-none"
                  style={{ borderBottom: "1px solid var(--color-accent)", borderRight: "1px solid var(--color-accent)", opacity: 0.8 }}
                />
              </div>

              <div className="absolute left-0 md:left-[-10%] bottom-6 w-[44%] md:w-[220px] h-[36%] md:h-[200px] rounded-xl overflow-hidden border-8 border-cream-soft shadow-[0_30px_60px_-15px_rgba(43,27,17,0.35)] z-20">
                <img
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=700&q=80"
                  alt="Farm-to-table dining detail at the property restaurant"
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