"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    bg: "/images/hero1.png",
    word: "Stillness",
    heading: "Where Luxury\nMeets the Wild",
    desc: "Wake up to mist-covered mountains, handcrafted stays, and mornings that begin with nature.",
    quote: "Luxury is not what surrounds you. It's what allows you to slow down.",
    clipY: "52%",
  },
  {
    bg: "/images/hero2.png",
    word: "Retreat",
    heading: "Leave the Noise.\nFind Yourself.",
    desc: "Hidden among forests and valleys, every stay is designed to restore your body and mind.",
    quote: "Sometimes the best destination is the one that brings you back to yourself.",
    clipY: "48%",
  },
  {
    bg: "/images/hero3.png",
    word: "Breathe",
    heading: "Every Sunrise\nDeserves a Better View",
    desc: "Experience handcrafted stays where every window frames the beauty of the Himalayas.",
    quote: "Collect moments, not miles.",
    clipY: "50%",
  },
  {
    bg: "/images/hero4.png",
    word: "Belong",
    heading: "More Than a Stay.\nA Place to Belong.",
    desc: "From peaceful mornings to starlit evenings, discover memories that stay long after you leave.",
    quote: "The best journeys don't change your location. They change your perspective.",
    clipY: "54%",
  },
];

const properties = [
  {
    id: "farmstead",
    name: "Persimmon Farmstead",
    location: "Badgran · Manali",
    href: "/stays/farmstead",
  },
  {
    id: "shanag",
    name: "Farmstead Shanag",
    location: "Shanag · Old Manali",
    href: "/stays/shanag",
  },
];

/* ── Permanent, motion-driven property card (variant propagation) ── */
function PropertyCard({ prop, reduce }: { prop: typeof properties[number]; reduce: boolean }) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={reduce ? undefined : "hover"}
      variants={{ rest: { y: 0 }, hover: { y: reduce ? 0 : -6 } }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex-1"
    >
      <Link
        href={prop.href}
        className="relative block overflow-hidden rounded-2xl p-4 md:p-[18px]"
        style={{
          border: "1px solid rgba(247,242,232,0.14)",
          background: "rgba(247,242,232,0.06)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* gold hover tint + inner border */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.35 }}
          style={{
            background: "linear-gradient(135deg, rgba(212,168,83,0.20), rgba(212,168,83,0.03))",
            boxShadow: "inset 0 0 0 1px rgba(212,168,83,0.55)",
          }}
        />
        {/* sheen sweep */}
        {!reduce && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            variants={{ rest: { x: "-130%" }, hover: { x: "130%" } }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ background: "linear-gradient(105deg, transparent 42%, rgba(247,242,232,0.12) 50%, transparent 58%)" }}
          />
        )}

        <div className="relative flex items-start justify-between gap-2">
          <div>
            <p className="font-body text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(212,168,83,0.75)" }}>
              {prop.location}
            </p>
            <p className="font-display italic text-sm md:text-base leading-tight" style={{ color: "rgba(247,242,232,0.94)" }}>
              {prop.name}
            </p>
          </div>
          <motion.div
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
            variants={{
              rest: { scale: 1, backgroundColor: "rgba(212,168,83,0.18)" },
              hover: { scale: 1.12, backgroundColor: "rgba(212,168,83,0.95)" },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            style={{ border: "1px solid rgba(212,168,83,0.4)" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
              <motion.path
                d="M5 12h14M13 6l6 6-6 6"
                variants={{ rest: { stroke: "#d4a853" }, hover: { stroke: "#1a2218" } }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </motion.div>
        </div>

        <div className="relative mt-3 flex items-center gap-2">
          <motion.span
            className="block h-px"
            style={{ background: "rgba(212,168,83,0.85)" }}
            variants={{ rest: { width: 10 }, hover: { width: 26 } }}
            transition={{ duration: 0.3 }}
          />
          <span className="font-body text-[10px] tracking-wide" style={{ color: "rgba(247,242,232,0.42)" }}>
            View property
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const reduce = useReducedMotion();

  const next = useCallback(() => {
    setIndex(i => (i + 1) % slides.length);
    setTick(t => t + 1);
  }, []);

  const prev = useCallback(() => {
    setIndex(i => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[index];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "700px", maxHeight: "1100px", background: "#080604" }}
    >
      {/* LAYER 1: Background image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={"bg-" + index}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        >
          <img
            src={slide.bg}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.72) saturate(0.9)" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* LAYER 2: Gradient overlays */}
      <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(to bottom, rgba(8,6,4,0.2) 0%, rgba(8,6,4,0.05) 30%, rgba(8,6,4,0.75) 100%)" }} />
      <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(to right, rgba(8,6,4,0.5) 0%, transparent 55%)" }} />

      {/* LAYER 3: Ghost word */}
      <div
        className="absolute inset-0 flex items-start justify-start overflow-hidden pointer-events-none"
        style={{ zIndex: 3, paddingLeft: "2%", paddingTop: "12%" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={"ghost-" + index}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(72px, 20vw, 320px)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "rgba(247,242,232,0.11)",
              display: "block",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}>
              {slide.word}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LAYER 4: Foreground clipped image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={"fg-" + index}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        >
          <img
            src={slide.bg}
            alt=""
            className="w-full h-full object-cover"
            style={{
              clipPath: `polygon(0 ${slide.clipY}, 100% ${parseInt(slide.clipY) - 6}%, 100% 100%, 0% 100%)`,
              filter: "brightness(0.82) saturate(0.88)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent ${parseInt(slide.clipY) - 12}%, rgba(8,6,4,0.18) ${slide.clipY}, transparent ${parseInt(slide.clipY) + 8}%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* LAYER 5: UI content */}
      <div
        className="absolute inset-0 flex flex-col justify-end md:justify-between px-5 md:px-14 lg:px-20 pt-16 md:pt-32 pb-5 md:pb-12"
        style={{ zIndex: 5 }}
      >
        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="hidden md:flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#d4a853", flexShrink: 0 }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="font-body text-[10px] md:text-[11px] tracking-[0.32em] uppercase" style={{ color: "rgba(247,242,232,0.45)" }}>
              Persimmon Farmstead · Hallan Valley, Himachal
            </span>
          </div>
          <div className="hidden md:block font-body text-[10px] tracking-wide" style={{ color: "rgba(247,242,232,0.25)" }}>
            32.1303° N · 77.1551° E
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col max-w-xl">
          {/* Per-slide text — re-animates on slide change (fixed height so cards below stay put) */}
          <div className="relative md:min-h-[290px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={"main-" + index}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <span className="font-body text-[10px] tracking-[0.38em] uppercase mb-3 md:mb-5" style={{ color: "#d4a853" }}>
                  ✦ &nbsp; Est. 2021 · A Mountain Retreat &nbsp; ✦
                </span>

                <h1
                  className="font-display italic leading-[1.02] mb-4"
                  style={{
                    fontSize: "clamp(1.6rem, 5.5vw, 4.5rem)",
                    letterSpacing: "-0.025em",
                    color: "rgba(247,242,232,0.97)",
                    textShadow: "0 6px 32px rgba(0,0,0,0.5)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {slide.heading}
                </h1>

                <div className="mb-3 md:mb-5" style={{ width: "48px", height: "1.5px", background: "linear-gradient(to right, #d4a853, rgba(212,168,83,0.2))", borderRadius: "2px" }} />

                <p className="font-body text-[12px] md:text-sm mb-4 md:mb-5" style={{ color: "rgba(247,242,232,0.5)", lineHeight: 1.85, maxWidth: "380px" }}>
                  {slide.desc}
                </p>

                <div className="hidden md:block pl-4" style={{ borderLeft: "1.5px solid rgba(212,168,83,0.45)" }}>
                  <p className="font-display italic text-sm md:text-[15px]" style={{ color: "rgba(247,242,232,0.32)", lineHeight: 1.8 }}>
                    "{slide.quote}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PERMANENT — property cards + reserve link (rendered once, never re-animate per slide) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 md:mt-6"
          >
            <div className="flex flex-col sm:flex-row gap-2.5 mb-3.5">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} prop={prop} reduce={!!reduce} />
              ))}
            </div>

            <Link
              href="/contact#form"
              className="self-start inline-flex items-center gap-2 font-body text-[12px] tracking-wide transition-all duration-200"
              style={{ color: "rgba(247,242,232,0.4)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(247,242,232,0.75)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(247,242,232,0.4)"}
            >
              or Reserve a Room directly →
            </Link>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); setTick(t => t + 1); }}
                className="rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300"
                style={{
                  width: i === index ? "52px" : "32px",
                  height: "34px",
                  opacity: i === index ? 1 : 0.38,
                  border: i === index ? "1.5px solid #d4a853" : "1.5px solid rgba(247,242,232,0.15)",
                }}
              >
                <img src={s.bg} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5" style={{ color: "rgba(247,242,232,0.3)" }}>
              <span className="font-display italic text-xl" style={{ color: "rgba(247,242,232,0.65)" }}>0{index + 1}</span>
              <span className="font-body text-xs">/</span>
              <span className="font-body text-xs">0{slides.length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[{ fn: prev, icon: "M19 12H5M12 19l-7-7 7-7" }, { fn: next, icon: "M5 12h14M12 5l7 7-7 7" }].map((btn, bi) => (
                <button
                  key={bi}
                  onClick={btn.fn}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(247,242,232,0.07)", border: "1px solid rgba(247,242,232,0.14)", color: "rgba(247,242,232,0.7)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(247,242,232,0.14)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(247,242,232,0.07)"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d={btn.icon} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "2px", zIndex: 6, background: "rgba(247,242,232,0.06)" }}>
        <motion.div
          key={tick}
          className="h-full"
          style={{ background: "#d4a853" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
        />
      </div>
    </section>
  );
}