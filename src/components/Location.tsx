"use client";

import Reveal from "./Reveal";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

const properties = [
  {
    name: "Persimmon Farmstead Shanag",
    tag: "Shanag (Bahang)",
    address: "Shanag Village, near Bahang",
    addressLine2: "Manali, Kullu District, Himachal Pradesh",
    directions:
      "Fly into Bhuntar Airport (Kullu), roughly 50km away, then we'll help arrange your transfer. By road it's about 4–5km north of Manali, above Old Manali.",
    coords: "32.2856° N, 77.1741° E",
    mapSrc: "https://www.google.com/maps?q=32.2855603,77.1741389&z=15&output=embed",
    mapLink: "https://www.google.com/maps/place/Persimmon+farmstead+shanag/@32.2855603,77.1741389,17z/data=!4m9!3m8!1s0x390487d8ca344499:0xfa94767797d92743!5m2!4m1!1i2!8m2!3d32.2855603!4d77.1741389!16s%2Fg%2F11mllkrp9w",
  },
  {
    name: "Persimmon Farmstead",
    tag: "Badgran (14 Mile)",
    address: "Badgran, 14 Mile Bypass",
    addressLine2: "Manali, Kullu District, Himachal Pradesh",
    directions:
      "Fly into Bhuntar Airport (Kullu), roughly 35km away, then a scenic drive up. By road it's about 14km before Manali town, a minute off the main highway.",
    coords: "32.1303° N, 77.1551° E",
    mapSrc: "https://www.google.com/maps?q=32.1303243,77.1551243&z=15&output=embed",
    mapLink: "https://www.google.com/maps/place/Persimmon+Farmstead/@32.1303243,77.1551243,17z/data=!3m1!4b1!4m9!3m8!1s0x39048be9ad5a4fc5:0xb3ae3cff4d4070b0!5m2!4m1!1i2!8m2!3d32.1303243!4d77.1551243!16s%2Fg%2F11qgk86jvw",
  },
];

function PropertyLocation({ property, i }: { property: (typeof properties)[0]; i: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-14 items-center">
      <Reveal delay={0.1 + i * 0.1} y={40}>
        <div className="space-y-7">
          <div className="border-l-2 border-terracotta-dark/30 pl-5">
            <p className="text-terracotta-dark font-body text-[11px] tracking-[0.25em] uppercase mb-1.5">
              {property.tag}
            </p>
            <h3 className="font-display italic text-ink text-2xl md:text-[1.8rem] leading-tight">
              {property.name}
            </h3>
          </div>

          <div className="border-l-2 border-terracotta-dark/30 pl-5">
            <p className="text-terracotta-dark font-body text-[11px] tracking-[0.25em] uppercase mb-1.5">
              Address
            </p>
            <p className="font-display text-ink text-lg">
              {property.address}
            </p>
            <p className="text-ink/55 font-body text-sm">
              {property.addressLine2}
            </p>
          </div>

          <div className="border-l-2 border-terracotta-dark/30 pl-5">
            <p className="text-terracotta-dark font-body text-[11px] tracking-[0.25em] uppercase mb-1.5">
              Getting here
            </p>
            <p className="text-ink/65 font-body text-sm leading-relaxed">
              {property.directions}
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── Matted map card — same treatment used across the site: padded
           frame, gold corner brackets, coordinates + Open in Maps built
           into the card itself, rather than a bare oversized iframe. ── */}
      <Reveal delay={0.15 + i * 0.1} y={40}>
        <div
          className="relative rounded-[22px] overflow-hidden"
          style={{ background: "#fffdf8", boxShadow: "0 40px 80px -32px rgba(43,27,17,0.4)", border: "1px solid rgba(36,48,40,0.08)" }}
        >
          <div className="relative p-2.5 md:p-3 pb-0">
            <div className="relative overflow-hidden rounded-2xl" style={{ height: "260px" }}>
              <iframe
                title={`${property.name} location map`}
                src={property.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.3) sepia(0.15) saturate(0.85) contrast(1.05) brightness(1.02)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div aria-hidden className="absolute inset-2 rounded-xl pointer-events-none" style={{ border: `1px solid ${GOLD}88` }} />
              <span aria-hidden className="absolute top-4 left-4 w-6 h-6 pointer-events-none" style={{ borderTop: `1px solid ${ACCENT}`, borderLeft: `1px solid ${ACCENT}`, opacity: 0.8 }} />
              <span aria-hidden className="absolute bottom-4 right-4 w-6 h-6 pointer-events-none" style={{ borderBottom: `1px solid ${ACCENT}`, borderRight: `1px solid ${ACCENT}`, opacity: 0.8 }} />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full pointer-events-none" style={{ background: "rgba(26,34,24,0.85)", backdropFilter: "blur(6px)" }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                <span className="italic whitespace-nowrap font-display" style={{ fontSize: "13px", color: "rgba(247,242,232,0.95)" }}>
                  {property.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 px-6 py-5">
            <div>
              <p className="font-body text-[9px] tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(26,34,24,0.4)" }}>
                Coordinates
              </p>
              <p className="font-display italic text-ink text-[15px]">
                {property.coords}
              </p>
            </div>
            <a
              href={property.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 flex-shrink-0 rounded-full px-5 py-2.5 font-body text-[11px] tracking-[0.1em] uppercase transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: ACCENT, color: "#fff", fontWeight: 500 }}
            >
              Open in Maps
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

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
        Manali
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
            Two homes in Manali
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-ink/55 font-body text-base text-center max-w-md mx-auto mb-16 md:mb-20">
            One a minute off the highway before Manali town, the other tucked
            among the orchards above Old Manali — the same kitchen and the
            same welcome, on two different corners of the valley.
          </p>
        </Reveal>

        <div className="space-y-16 md:space-y-24">
          {properties.map((property, i) => (
            <div key={property.name}>
              {i > 0 && (
                <div className="flex items-center gap-3 mb-12 md:mb-16" aria-hidden="true">
                  <span className="h-px flex-1 bg-terracotta-dark/15" />
                  <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0 bg-terracotta-dark/40" />
                  <span className="h-px flex-1 bg-terracotta-dark/15" />
                </div>
              )}
              <PropertyLocation property={property} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}