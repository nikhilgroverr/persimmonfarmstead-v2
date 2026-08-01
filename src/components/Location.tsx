"use client";

import Reveal from "./Reveal";

export default function Location() {
  return (
    <section
      id="location"
      className="relative w-full bg-cream-soft py-24 md:py-36 px-6 border-t border-ink/10 overflow-hidden"
    >
      <p
        className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-full text-center font-display text-[3rem] md:text-[6.5rem] leading-none tracking-tight select-none pointer-events-none whitespace-nowrap"
        style={{
          color: "transparent",
          WebkitTextStroke: "1.2px var(--color-terracotta-dark)",
          opacity: 0.8,
        }}
        aria-hidden="true"
      >
        Hallan Valley
      </p>

      <div className="relative max-w-6xl mx-auto pt-16 md:pt-20">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-10 bg-terracotta" aria-hidden="true" />
            <p className="text-terracotta-dark font-body text-xs tracking-[0.3em] uppercase">
              Find Us
            </p>
            <span className="h-px w-10 bg-terracotta" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display italic text-ink text-center text-3xl md:text-5xl leading-tight mb-4 max-w-xl mx-auto">
            Tucked into Hallan Valley
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-ink/55 font-body text-base text-center max-w-md mx-auto mb-16 md:mb-20">
            A quiet pocket of the Kullu hills, roughly 28km from Manali and
            far from the trail most travelers take &mdash; Persimmon
            Farmstead sits where the valley grows its apples and red rice.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-14 items-stretch">
          <Reveal delay={0.2} y={40}>
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-8">
                <div className="border-l-2 border-terracotta-dark/30 pl-5">
                  <p className="text-terracotta-dark font-body text-[11px] tracking-[0.25em] uppercase mb-1.5">
                    Address
                  </p>
                  <p className="font-display text-ink text-lg">
                    Hallan Valley, Manali Tehsil
                  </p>
                  <p className="text-ink/55 font-body text-sm">
                    Kullu District, Himachal Pradesh, India
                  </p>
                </div>

                <div className="border-l-2 border-terracotta-dark/30 pl-5">
                  <p className="text-terracotta-dark font-body text-[11px] tracking-[0.25em] uppercase mb-1.5">
                    Getting here
                  </p>
                  <p className="text-ink/65 font-body text-sm leading-relaxed">
                    Fly into Bhuntar Airport (Kullu), then a scenic 1-hour
                    drive through Naggar. By road, it&apos;s roughly 28km
                    from Manali or a half-day&apos;s drive from Chandigarh.
                  </p>
                </div>

                <div className="border-l-2 border-terracotta-dark/30 pl-5">
                  <p className="text-terracotta-dark font-body text-[11px] tracking-[0.25em] uppercase mb-1.5">
                    Coordinates
                  </p>
                  <p className="text-ink/65 font-body text-sm">
                    32.1303&deg; N, 77.1551&deg; E
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps?ll=32.130316,77.155124&z=10&t=m&hl=en-US&gl=US&mapclient=embed&cid=12947353045947150512"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-2.5 self-start font-body text-xs tracking-[0.2em] uppercase text-terracotta-dark border border-terracotta-dark/40 px-6 py-3 transition-all duration-300 hover:bg-terracotta-dark hover:text-cream hover:border-terracotta-dark"
              >
                Open in Google Maps
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
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25} y={40}>
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[360px] w-full rounded-2xl overflow-hidden shadow-[0_35px_70px_-20px_rgba(43,27,17,0.35)]">
              <iframe
                title="Persimmon Farmstead location map"
                src="https://www.google.com/maps?q=32.130316,77.155124&z=11&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-cream/30 pointer-events-none rounded-2xl" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}