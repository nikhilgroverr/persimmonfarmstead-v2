"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion, AnimatePresence, useReducedMotion,
  useMotionValue, useSpring, useTransform,
} from "framer-motion";
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
    id: "shanag",
    name: "Farmstead Shanag",
    location: "Shanag · Old Manali",
    href: "/stays/shanag",
  },
  {
    id: "farmstead",
    name: "Persimmon Farmstead",
    location: "Badgran · Manali",
    href: "/stays/farmstead",
  }
];

/* ── Word-by-word heading reveal (reduced-motion aware) ── */
function AnimatedHeading({ text, reduce }: { text: string; reduce: boolean }) {
  if (reduce) return <>{text}</>;
  return (
    <>
      {text.split("\n").map((line, li) => (
        <span key={li} className="block" style={{ overflow: "hidden" }}>
          <motion.span
            className="inline-block"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 + li * 0.06 } } }}
          >
            {line.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block" style={{ overflow: "hidden", marginRight: "0.22em" }}>
                <motion.span
                  className="inline-block"
                  variants={{ hidden: { y: "116%" }, show: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </>
  );
}

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
        className="relative block overflow-hidden rounded-xl md:rounded-2xl p-3 md:p-[18px]"
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
            <p className="font-display italic text-[13px] sm:text-sm md:text-base leading-tight" style={{ color: "rgba(247,242,232,0.94)" }}>
              {prop.name}
            </p>
            <p className="font-body text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.25em] uppercase mb-1 truncate" style={{ color: "rgba(212,168,83,0.75)" }}>
              {prop.location}
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
          <span className="hidden sm:inline font-body text-[10px] tracking-wide" style={{ color: "rgba(247,242,232,0.42)" }}>
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

  // mouse parallax (depth)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 20 });
  const sy = useSpring(my, { stiffness: 45, damping: 20 });
  const bgX = useTransform(sx, [-0.5, 0.5], ["-18px", "18px"]);
  const bgY = useTransform(sy, [-0.5, 0.5], ["-11px", "11px"]);
  const ghostX = useTransform(sx, [-0.5, 0.5], ["34px", "-34px"]);
  const ghostY = useTransform(sy, [-0.5, 0.5], ["22px", "-22px"]);
  const contentX = useTransform(sx, [-0.5, 0.5], ["7px", "-7px"]);
  const contentY = useTransform(sy, [-0.5, 0.5], ["5px", "-5px"]);

  const next = useCallback(() => {
    setIndex(i => (i + 1) % slides.length);
    setTick(t => t + 1);
  }, []);

  const prev = useCallback(() => {
    setIndex(i => (i - 1 + slides.length) % slides.length);
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const slide = slides[index];

  return (
    <section
      id="home"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "700px", maxHeight: "1100px", background: "#080604" }}
    >
      {/* ── LAYER 1: Background — Ken Burns zoom + mouse parallax ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={"bg-" + index}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <motion.img
            src={slide.bg}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.72) saturate(0.9)", x: bgX, y: bgY }}
            initial={{ scale: reduce ? 1.08 : 1.06 }}
            animate={{ scale: reduce ? 1.08 : 1.16 }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── LAYER 2: Gradients + vignette ── */}
      <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(to bottom, rgba(8,6,4,0.2) 0%, rgba(8,6,4,0.05) 30%, rgba(8,6,4,0.75) 100%)" }} />
      <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(to right, rgba(8,6,4,0.5) 0%, transparent 55%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: "radial-gradient(ellipse at 50% 42%, transparent 52%, rgba(6,6,4,0.55) 100%)" }} />

      {/* ── LAYER 3: Ghost word — mouse parallax ── */}
      <div
        className="absolute inset-0 flex items-start justify-start overflow-hidden pointer-events-none"
        style={{ zIndex: 3, paddingLeft: "2%", paddingTop: "12%" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={"ghost-" + index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              style={{
                x: ghostX,
                y: ghostY,
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
              }}
            >
              {slide.word}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── LAYER 4: Foreground clipped image — mouse parallax ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={"fg-" + index}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <motion.img
            src={slide.bg}
            alt=""
            className="w-full h-full object-cover"
            style={{
              x: bgX,
              y: bgY,
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

      {/* ── LAYER 5: UI content ── */}
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
              Persimmon Farmstead · Manali, Himachal
            </span>
          </div>
          <div className="hidden md:block font-body text-[10px] tracking-wide" style={{ color: "rgba(247,242,232,0.25)" }}>
            32.1303° N · 77.1551° E
          </div>
        </motion.div>

        {/* Main content — subtle mouse parallax */}
        <motion.div className="flex flex-col max-w-xl" style={{ x: contentX, y: contentY }}>
          {/* Per-slide text (re-animates on slide change; fixed height keeps cards steady) */}
          <div className="relative h-[260px] sm:h-[310px] md:h-[400px] lg:h-[440px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={"main-" + index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="font-body text-[10px] tracking-[0.38em] uppercase mb-3 md:mb-5"
                  style={{ color: "#d4a853" }}
                >
                  ✦ &nbsp; Est. 2021 · A Mountain Retreat &nbsp; ✦
                </motion.span>

                <h1
                  className="font-display italic leading-[1.04] mb-4"
                  style={{
                    fontSize: "clamp(1.6rem, 5.5vw, 4.5rem)",
                    letterSpacing: "-0.025em",
                    color: "rgba(247,242,232,0.97)",
                    textShadow: "0 6px 32px rgba(0,0,0,0.5)",
                    whiteSpace: "pre-line",
                  }}
                >
                  <AnimatedHeading text={slide.heading} reduce={!!reduce} />
                </h1>

                <motion.div
                  className="mb-3 md:mb-5"
                  style={{ height: "1.5px", background: "linear-gradient(to right, #d4a853, rgba(212,168,83,0.2))", borderRadius: "2px" }}
                  initial={{ width: 0 }}
                  animate={{ width: "48px" }}
                  transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="font-body text-[12px] md:text-sm mb-4 md:mb-5"
                  style={{ color: "rgba(247,242,232,0.5)", lineHeight: 1.85, maxWidth: "380px" }}
                >
                  {slide.desc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="hidden md:block pl-4"
                  style={{ borderLeft: "1.5px solid rgba(212,168,83,0.45)" }}
                >
                  <p className="font-display italic text-sm md:text-[15px]" style={{ color: "rgba(247,242,232,0.32)", lineHeight: 1.8 }}>
                    &ldquo;{slide.quote}&rdquo;
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PERMANENT — property cards + reserve link */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 md:mt-6"
          >
            <div className="flex flex-row gap-2 mb-3.5">
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
        </motion.div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          {/* Thumbnails */}
          <div className="hidden sm:flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); setTick(t => t + 1); }}
                aria-label={`Go to slide ${i + 1}`}
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

          {/* Slide counter + arrows */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5" style={{ color: "rgba(247,242,232,0.3)" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="font-display italic text-xl"
                  style={{ color: "rgba(247,242,232,0.65)" }}
                >
                  0{index + 1}
                </motion.span>
              </AnimatePresence>
              <span className="font-body text-xs">/</span>
              <span className="font-body text-xs">0{slides.length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[{ fn: prev, icon: "M19 12H5M12 19l-7-7 7-7" }, { fn: next, icon: "M5 12h14M12 5l7 7-7 7" }].map((btn, bi) => (
                <motion.button
                  key={bi}
                  onClick={btn.fn}
                  whileHover={reduce ? undefined : { scale: 1.1, backgroundColor: "rgba(247,242,232,0.14)" }}
                  whileTap={{ scale: 0.94 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(247,242,232,0.07)", border: "1px solid rgba(247,242,232,0.14)", color: "rgba(247,242,232,0.7)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d={btn.icon} />
                  </svg>
                </motion.button>
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