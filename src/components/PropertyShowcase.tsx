"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { properties } from "@/lib/site";

const DARK = "#0d130f";
const GOLD = "#d4a853";

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
      style={{ background: DARK }}
    >
      {/* faint ghost word */}
      <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="font-display italic"
          style={{
            fontSize: "clamp(120px, 20vw, 280px)",
            fontWeight: 300,
            color: "transparent",
            WebkitTextStroke: "1px rgba(247,242,232,0.045)",
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
            <span className="h-px w-10" style={{ background: GOLD, opacity: 0.7 }} />
            <span className="font-body text-[10px] tracking-[0.42em] uppercase" style={{ color: GOLD }}>
              Two Homes · One Family
            </span>
            <span className="h-px w-10" style={{ background: GOLD, opacity: 0.7 }} />
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            custom={1}
            variants={fadeUp}
            className="font-display italic leading-[1.08] mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", letterSpacing: "-0.03em", color: "rgba(247,242,232,0.98)" }}
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
            style={{ color: "rgba(247,242,232,0.6)", maxWidth: "48ch" }}
          >
            Two boutique stays, the same kitchen and the same welcome — one on
            the highway before Manali, one tucked among the orchards above it.
          </motion.p>
        </div>

        {/* Property cards — full-bleed photo cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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
                className="group relative block rounded-[24px] md:rounded-[28px] overflow-hidden"
                style={{ aspectRatio: "4/5", boxShadow: "0 45px 90px -40px rgba(0,0,0,0.6)" }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(6,8,6,0.88) 0%, rgba(6,8,6,0.2) 52%, rgba(6,8,6,0.05) 72%)" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "rgba(6,8,6,0.12)" }}
                />

                {/* Flagship badge */}
                {p.flagship && (
                  <div className="absolute top-5 left-5 md:top-6 md:left-6">
                    <span
                      className="font-body text-[9px] tracking-[0.22em] uppercase px-3.5 py-2 rounded-full"
                      style={{ background: "rgba(255,255,255,0.1)", color: "rgba(247,242,232,0.85)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(8px)" }}
                    >
                      ✦ Flagship
                    </span>
                  </div>
                )}

                {/* Rating pill */}
                <div
                  className="absolute top-5 right-5 md:top-6 md:right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(8px)" }}
                >
                  <Stars />
                  <span className="font-body text-[11px] font-medium" style={{ color: "rgba(247,242,232,0.95)" }}>
                    {p.rating.toFixed(1)}
                  </span>
                  <span className="font-body text-[10px]" style={{ color: "rgba(247,242,232,0.6)" }}>
                    · {p.reviews}
                  </span>
                </div>

                {/* Name, tagline, meta over image bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-1.5 mb-2" style={{ color: "rgba(247,242,232,0.55)" }}>
                    <PinIcon />
                    <span className="font-body text-[10px] tracking-[0.18em] uppercase">{p.locationShort}</span>
                  </div>
                  <h3
                    className="font-display italic leading-tight mb-2"
                    style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.4rem)", color: "rgba(247,242,232,0.98)", textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="font-body text-[13px] leading-[1.6] mb-5 max-w-sm" style={{ color: "rgba(247,242,232,0.68)" }}>
                    {p.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-[12px]" style={{ color: "rgba(247,242,232,0.55)" }}>
                      {p.amenities.slice(0, 2).join(" · ")}
                    </p>
                    <span
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                      style={{ border: "1px solid rgba(247,242,232,0.4)", color: "#f7f2e8" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
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