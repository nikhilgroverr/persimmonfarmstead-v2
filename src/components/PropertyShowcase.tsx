"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { properties } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function Stars() {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill="#d4a853">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function PropertyShowcase() {
  return (
    <section
      id="properties"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--color-cream-soft)" }}
    >
      {/* faint ghost word */}
      <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="font-display italic"
          style={{
            fontSize: "clamp(120px, 20vw, 280px)",
            fontWeight: 300,
            color: "transparent",
            WebkitTextStroke: "1px rgba(36,48,40,0.05)",
            lineHeight: 1,
            display: "block",
            transform: "translateX(12%)",
          }}
        >
          Stays
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-10" style={{ background: "var(--color-terracotta)" }} />
            <span className="font-body text-[10px] tracking-[0.42em] uppercase" style={{ color: "var(--color-terracotta-dark)" }}>
              Two Homes · One Family
            </span>
            <span className="h-px w-10" style={{ background: "var(--color-terracotta)" }} />
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            custom={1}
            variants={fadeUp}
            className="font-display italic leading-[1.08] mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", letterSpacing: "-0.03em", color: "var(--color-ink)" }}
          >
            Choose your corner of the valley
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            custom={2}
            variants={fadeUp}
            className="font-body text-[15px] leading-[1.85] mx-auto"
            style={{ color: "rgba(26,34,24,0.55)", maxWidth: "48ch" }}
          >
            Two boutique stays, the same kitchen and the same welcome — one on
            the highway before Manali, one tucked among the orchards above it.
          </motion.p>
        </div>

        {/* Property cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
          {properties.map((p, i) => (
            <motion.div
              key={p.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={i + 2}
              variants={fadeUp}
            >
              <Link
                href={`/stays/${p.slug}`}
                className="group block h-full rounded-[20px] overflow-hidden transition-all duration-500"
                style={{
                  background: "#faf6ee",
                  border: "1px solid rgba(36,48,40,0.09)",
                  boxShadow: "0 20px 50px -30px rgba(26,34,24,0.35)",
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/11" }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(26,34,24,0.05) 0%, rgba(26,34,24,0.12) 55%, rgba(26,34,24,0.75) 100%)" }}
                  />

                  {/* Flagship / location badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    {p.flagship && (
                      <span
                        className="font-body text-[9px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full"
                        style={{
                          background: "rgba(212,168,83,0.22)",
                          border: "1px solid rgba(212,168,83,0.45)",
                          color: "#f5d98a",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        ✦ Flagship
                      </span>
                    )}
                  </div>

                  {/* Rating pill */}
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(247,242,232,0.14)",
                      border: "1px solid rgba(247,242,232,0.25)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Stars />
                    <span className="font-body text-[11px] font-medium" style={{ color: "rgba(247,242,232,0.95)" }}>
                      {p.rating.toFixed(1)}
                    </span>
                    <span className="font-body text-[10px]" style={{ color: "rgba(247,242,232,0.6)" }}>
                      · {p.reviews}
                    </span>
                  </div>

                  {/* Name over image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="flex items-center gap-1.5 mb-2" style={{ color: "rgba(247,242,232,0.6)" }}>
                      <PinIcon />
                      <span className="font-body text-[10px] tracking-[0.18em] uppercase">{p.locationShort}</span>
                    </div>
                    <h3
                      className="font-display italic leading-tight"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "rgba(247,242,232,0.98)", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
                    >
                      {p.name}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 md:p-7">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-terracotta-dark)" }}>
                    {p.tagline}
                  </p>
                  <p className="font-body text-[13.5px] leading-[1.8] mb-5" style={{ color: "rgba(26,34,24,0.6)" }}>
                    {p.description}
                  </p>

                  {/* Amenity chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.amenities.map((a) => (
                      <span
                        key={a}
                        className="font-body text-[11px] px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(36,48,40,0.05)", border: "1px solid rgba(36,48,40,0.08)", color: "rgba(26,34,24,0.55)" }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.16em] uppercase rounded-full px-5 py-2.5 transition-colors duration-300"
                      style={{ background: "var(--color-terracotta-dark)", color: "var(--color-cream-soft)" }}
                    >
                      Explore this stay
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <span
                      className="font-body text-[12px]"
                      style={{ color: "rgba(26,34,24,0.4)" }}
                    >
                      or check dates
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
