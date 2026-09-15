"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { rooms as allRooms } from "@/lib/rooms";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

const properties = [
  {
    slug: "farmstead" as const,
    num: "01",
    name: "Persimmon Farmstead",
    tag: "Flagship",
    location: "Badgran (14 Mile) · Manali",
    blurb: "Our flagship boutique hotel, a minute off the highway with mountain views from every room.",
    img: "/images/farmstead/badagran/gallery-1.png",
    href: "/stays/farmstead",
  },
  {
    slug: "shanag" as const,
    num: "02",
    name: "Persimmon Farmstead Shanag",
    tag: "Orchard Retreat",
    location: "Shanag (Bahang) · Manali",
    blurb: "Wooden chalets and stone cottages across wide orchard lawns, close to Old Manali.",
    img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1200&q=85",
    href: "/stays/shanag",
  },
];

function Reveal({ children, delay = 0, y = 22 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const reduce = useReducedMotion();
  return (
    <motion.div ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Small gold flourish — fading rule either side of a rotated diamond,
   used throughout the room/property pages under headings. */
function Flourish({ align = "left" }: { align?: "left" | "center" }) {
  return (
    <div className={`flex items-center gap-2.5 ${align === "center" ? "justify-center" : ""}`} aria-hidden="true">
      <span className="h-px w-9" style={{ background: `linear-gradient(to right, ${ACCENT}80, transparent)` }} />
      <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: ACCENT, opacity: 0.75 }} />
      <span className="h-px w-9" style={{ background: `linear-gradient(to left, ${ACCENT}80, transparent)` }} />
    </div>
  );
}

function RoomCard({ room, i }: { room: (typeof allRooms)[number]; i: number }) {
  return (
    <Reveal delay={i * 0.07}>
      <Link
        href={`/rooms/${room.slug}`}
        className="group flex flex-col h-full rounded-[22px] overflow-hidden transition-transform duration-500 hover:-translate-y-2"
        style={{ background: "#fffdf8", border: "1px solid rgba(36,48,40,0.08)", boxShadow: "0 30px 60px -36px rgba(43,27,17,0.45)" }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img src={room.img} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,19,15,0.5), transparent 55%)" }} />
          <div className="absolute top-4 left-4">
            <span className="font-body text-[9px] tracking-[0.22em] uppercase px-3.5 py-1.5 rounded-full" style={{ background: "rgba(247,242,232,0.94)", color: "#8a5328", border: "1px solid rgba(181,112,63,0.28)" }}>
              {room.tag}
            </span>
          </div>
          <span
            aria-hidden
            className="absolute bottom-2.5 right-4 italic select-none pointer-events-none"
            style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "42px", color: "transparent", WebkitTextStroke: "1px rgba(247,242,232,0.5)", lineHeight: 1 }}
          >
            {room.num}
          </span>
        </div>
        <div className="flex flex-col flex-1 p-6">
          <h3 className="italic leading-tight mb-1" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "1.45rem", color: "var(--color-ink)" }}>{room.name}</h3>
          <div className="flex items-center gap-2 mb-3.5" aria-hidden="true">
            <span className="h-px w-5" style={{ background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD }} />
          </div>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 mb-4">
            {[room.guests, room.bed, room.view].map((s) => (
              <span key={s} className="font-body text-[11px]" style={{ color: "rgba(26,34,24,0.5)" }}>{s}</span>
            ))}
          </div>
          <p className="font-body text-[13px] leading-[1.75] mb-6 line-clamp-2" style={{ color: "rgba(26,34,24,0.58)" }}>{room.short}</p>
          <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-body text-[10.5px] tracking-[0.14em] uppercase transition-colors duration-300 group-hover:bg-[#c2691c] group-hover:text-white group-hover:border-[#c2691c] w-fit"
            style={{ border: "1px solid rgba(181,112,63,0.45)", color: "#b5703f" }}>
            Explore
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function PropertyCategory({ property }: { property: (typeof properties)[number] }) {
  const rooms = allRooms.filter((r) => r.property === property.slug);
  return (
    <section id={property.slug} className="w-full py-20 md:py-28 px-5 md:px-12 relative" style={{ borderTop: "1px solid rgba(36,48,40,0.07)", scrollMarginTop: "88px" }}>
      <span
        aria-hidden
        className="hidden md:block absolute select-none pointer-events-none italic"
        style={{ fontFamily: "var(--font-accent)", top: "0.5rem", right: "2rem", fontSize: "9rem", lineHeight: 1, color: "rgba(36,48,40,0.035)" }}
      >
        {property.num}
      </span>

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="relative rounded-[26px] overflow-hidden mb-4" style={{ aspectRatio: "20/9", boxShadow: "0 50px 100px -45px rgba(13,19,15,0.5)", border: "1px solid rgba(212,168,83,0.25)" }}>
            <img src={property.img} alt={property.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,19,15,0.9) 0%, rgba(13,19,15,0.15) 55%, transparent 82%)" }} />

            <span aria-hidden className="absolute top-6 left-6 w-7 h-7 pointer-events-none" style={{ borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}`, opacity: 0.8 }} />
            <span aria-hidden className="absolute bottom-6 right-6 w-7 h-7 pointer-events-none" style={{ borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}`, opacity: 0.8 }} />

            <div className="absolute top-6 right-6">
              <span className="font-body text-[9px] tracking-[0.24em] uppercase px-3.5 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(247,242,232,0.85)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(8px)" }}>
                {property.tag}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-body text-[9px] tracking-[0.28em] uppercase mb-3" style={{ color: "rgba(212,168,83,0.85)" }}>{property.location}</p>
                <h2 className="italic leading-tight mb-3" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.1rem,4vw,3.2rem)", color: "rgba(247,242,232,0.98)", textShadow: "0 6px 30px rgba(0,0,0,0.4)" }}>
                  {property.name}
                </h2>
                <p className="font-body text-[14px] max-w-md leading-relaxed" style={{ color: "rgba(247,242,232,0.65)" }}>{property.blurb}</p>
              </div>
              <Link href={property.href}
                className="group/btn inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-body text-[12px] tracking-wide uppercase flex-shrink-0 transition-transform duration-300 hover:scale-[1.04]"
                style={{ background: GOLD, color: "#1a2218", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(212,168,83,0.55)" }}>
                View Property
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover/btn:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex items-center gap-4 mb-12 md:mb-14 mt-8">
            <Flourish />
            <p className="font-body text-[10.5px] tracking-[0.2em] uppercase flex-shrink-0" style={{ color: "rgba(26,34,24,0.42)" }}>
              {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"} At This Property
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {rooms.map((room, ri) => <RoomCard key={room.slug} room={room} i={ri} />)}
        </div>
      </div>
    </section>
  );
}

export default function AllStaysPage() {
  return (
    <main style={{ background: "var(--color-cream-soft)" }}>
      <Navbar />

      {/* HERO — split hero: each property's photo on its own half, title
          centered across both, each half links straight to that property */}
      <section className="relative w-full overflow-hidden" style={{ height: "88vh", minHeight: "620px" }}>
        <div className="absolute inset-0 flex flex-col md:flex-row">
          {properties.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group relative flex-1 overflow-hidden"
            >
              <img
                src={p.img}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                style={{ filter: "brightness(0.5) saturate(0.92)" }}
              />
              <div className="absolute inset-0 transition-colors duration-500" style={{ background: "rgba(8,14,10,0.15)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(8,14,10,0.15) 60%, rgba(8,14,10,0.85) 100%)" }} />

              {/* per-property label, bottom of its own half — doubles as the link's call to action */}
              <div className="absolute bottom-8 md:bottom-12 left-6 md:left-10 right-6 md:right-10 flex items-end justify-between">
                <div>
                  <p className="font-body text-[9px] tracking-[0.26em] uppercase mb-1.5" style={{ color: "rgba(212,168,83,0.85)" }}>{p.location}</p>
                  <p className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.3rem,2.4vw,1.8rem)", color: "rgba(247,242,232,0.95)" }}>
                    {p.name}
                  </p>
                </div>
                <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[rgba(212,168,83,0.15)]"
                  style={{ border: "1px solid rgba(212,168,83,0.5)", color: GOLD }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* vertical gold divider between the two halves (desktop only) */}
        <div aria-hidden className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,168,83,0.5) 20%, rgba(212,168,83,0.5) 80%, transparent)" }} />

        {/* dark band across the vertical middle so the centered title reads clearly over either photo */}
        <div aria-hidden className="absolute inset-x-0 top-[30%] h-[40%] z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(8,14,10,0.55) 35%, rgba(8,14,10,0.55) 65%, transparent)" }} />

        {/* centered title, overlaid on top of both halves */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <Reveal>
            <div className="flex items-center gap-3 mb-6 justify-center">
              <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
              <span className="font-body text-[10px] md:text-[11px] tracking-[0.34em] uppercase" style={{ color: "rgba(212,168,83,0.85)" }}>
                Two Homes · One Family
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="italic leading-[0.98] mb-5" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.6rem,7vw,5.6rem)", letterSpacing: "-0.02em", color: "rgba(247,242,232,0.98)", textShadow: "0 10px 50px rgba(0,0,0,0.6)" }}>
              All our stays.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="font-body text-[14px] md:text-[16px] leading-[1.8] max-w-md mx-auto" style={{ color: "rgba(247,242,232,0.8)", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
              Seven rooms, two corners of the same valley — pick a photo to begin.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROPERTY CATEGORIES */}
      {properties.map((property) => (
        <PropertyCategory key={property.slug} property={property} />
      ))}

      <Footer />
    </main>
  );
}