"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: 12, suffix: "+", label: "Years", sub: "of hospitality" },
  { value: 3.2, suffix: "K", label: "Guests", sub: "welcomed", decimals: 1 },
  { value: 14, suffix: "", label: "Rooms", sub: "handcrafted" },
  { value: 4.9, suffix: "", label: "Rating", sub: "average score", decimals: 1 },
];

const marqueeItems = "Hallan Valley · Manali · Himachal Pradesh · Est. 2021 · Persimmon Farmstead · Mountain Hospitality · Handcrafted Stays · ";

function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="overflow-hidden w-full" style={{ borderTop: "1px solid rgba(36,48,40,0.07)" }}>
      <motion.div
        className="flex whitespace-nowrap py-3"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="font-body text-[10px] tracking-[0.32em] uppercase" style={{ color: "rgba(36,48,40,0.28)" }}>
            {marqueeItems}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const words = [
  { text: "A", outlined: false },
  { text: "place", outlined: true },
  { text: "to", outlined: false },
  { text: "slow", outlined: false },
  { text: "down,", outlined: true },
  { text: "breathe", outlined: false },
  { text: "deep,", outlined: true },
  { text: "and", outlined: false },
  { text: "feel", outlined: false },
  { text: "completely", outlined: true },
  { text: "at", outlined: false },
  { text: "home.", outlined: false },
];

function StatIcon({ label }: { label: string }) {
  const p = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (label) {
    case "Years":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>;
    case "Guests":
      return <svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14a5 5 0 0 1 6 5.5" /></svg>;
    case "Rooms":
      return <svg {...p}><path d="M2 17V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" /><path d="M2 12h20" /><path d="M22 17v-3a2 2 0 0 0-2-2h-4" /><path d="M2 17h20" /></svg>;
    case "Rating":
      return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
    default:
      return <span className="block w-2 h-2 rotate-45" style={{ background: "currentColor" }} />;
  }
}

function CountUp({ value, suffix = "", decimals = 0, active, delay = 0 }: { value: number; suffix?: string; decimals?: number; active: boolean; delay?: number }) {
  const [display, setDisplay] = useState("0");
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 1400;
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay((value * eased).toFixed(decimals));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [active, value, decimals, delay]);
  return <>{display}{suffix}</>;
}

export default function Welcome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headlineRef, { amount: 0.2, once: true });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const circleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.08]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 35, damping: 18 });
  const sy = useSpring(my, { stiffness: 35, damping: 18 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 30);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 20);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ background: "var(--color-cream-soft)" }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {/* ── DECORATIVE GEOMETRY LAYER ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

        {/* Large ghost circle — center */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "min(700px, 120vw)",
            height: "min(700px, 120vw)",
            top: "50%", left: "50%",
            x: "-50%", y: "-50%",
            scale: circleScale,
            opacity: circleOpacity,
            border: "1px solid rgba(36,48,40,0.06)",
          }}
        />

        {/* Smaller circle */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "min(420px, 80vw)",
            height: "min(420px, 80vw)",
            top: "50%", left: "50%",
            x: useTransform(sx, v => `calc(-50% + ${v * 0.4}px)`),
            y: useTransform(sy, v => `calc(-50% + ${v * 0.4}px)`),
            border: "1px solid rgba(212,168,83,0.12)",
            borderRadius: "50%",
          }}
        />

        {/* Top-right accent circle */}
        <motion.div
          className="absolute rounded-full hidden md:block"
          style={{
            width: 180, height: 180,
            top: "8%", right: "6%",
            x: useTransform(sx, v => v * 0.6),
            y: useTransform(sy, v => v * 0.6),
            border: "1px solid rgba(36,48,40,0.07)",
          }}
        />

        {/* Bottom-left accent */}
        <motion.div
          className="absolute rounded-full hidden md:block"
          style={{
            width: 100, height: 100,
            bottom: "12%", left: "5%",
            x: useTransform(sx, v => -v * 0.5),
            y: useTransform(sy, v => -v * 0.5),
            border: "1px solid rgba(212,168,83,0.15)",
          }}
        />

        {/* Horizontal scroll line */}
        <div className="absolute left-0 right-0 hidden md:block" style={{ top: "50%", height: "1px", background: "rgba(36,48,40,0.04)" }}>
          <motion.div className="h-full" style={{ width: lineWidth, background: "linear-gradient(to right,transparent,rgba(212,168,83,0.3),transparent)" }} />
        </div>

        {/* Floating dot grid — top right */}
        <div className="absolute top-8 right-8 hidden lg:grid grid-cols-5 gap-2.5 opacity-30">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-0.5 h-0.5 rounded-full" style={{ background: "var(--color-terracotta)" }} />
          ))}
        </div>

        {/* Floating dot grid — bottom left */}
        <div className="absolute bottom-8 left-8 hidden lg:grid grid-cols-5 gap-2.5 opacity-20">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-0.5 h-0.5 rounded-full" style={{ background: "var(--color-terracotta)" }} />
          ))}
        </div>

        {/* Vertical text left */}
        <motion.p
          className="absolute left-4 top-1/2 font-body text-[9px] tracking-[0.4em] uppercase hidden lg:block"
          style={{
            color: "rgba(36,48,40,0.2)",
            writingMode: "vertical-rl",
            y: useTransform(sy, v => `calc(-50% + ${v * 0.3}px)`),
            x: useTransform(sx, v => v * 0.3),
          }}
        >
          Persimmon Farmstead · Hallan Valley
        </motion.p>

        {/* Vertical text right */}
        <motion.p
          className="absolute right-4 top-1/2 font-body text-[9px] tracking-[0.4em] uppercase hidden lg:block"
          style={{
            color: "rgba(36,48,40,0.2)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            y: useTransform(sy, v => `calc(-50% + ${-v * 0.3}px)`),
            x: useTransform(sx, v => -v * 0.3),
          }}
        >
          Est. 2021 · Mountain Hospitality
        </motion.p>
      </div>

      {/* ── TOP MARQUEE ── */}
      <Marquee />

      {/* ── MAIN CONTENT ── */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-24 lg:py-32">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10 md:mb-14"
        >
          <motion.span
            className="h-px"
            style={{ background: "var(--color-terracotta)" }}
            initial={{ width: 0 }}
            animate={isInView ? { width: 40 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <span className="font-body text-[9px] md:text-[10px] tracking-[0.42em] uppercase" style={{ color: "var(--color-terracotta-dark)" }}>
            Welcome to Persimmon Farmstead
          </span>
          <motion.span
            className="h-px"
            style={{ background: "var(--color-terracotta)" }}
            initial={{ width: 0 }}
            animate={isInView ? { width: 40 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>

        {/* ── SPLIT HEADLINE ── */}
        <div ref={headlineRef} className="mb-10 md:mb-14 overflow-hidden">
          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-1" style={{ lineHeight: 1.0 }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="font-display italic inline-block"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  letterSpacing: "-0.03em",
                  color: word.outlined ? "transparent" : "var(--color-ink)",
                  WebkitTextStroke: word.outlined ? "1px rgba(36,48,40,0.4)" : "0px",
                }}
                initial={{ y: "120%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.75, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {word.text}
              </motion.span>
            ))}
          </div>
        </div>

        {/* ── GOLD ANIMATED RULE ── */}
        <div className="flex justify-center mb-8 md:mb-12">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            className="origin-center"
            style={{ height: "1.5px", width: "80px", background: "linear-gradient(to right,transparent,var(--color-terracotta),transparent)", borderRadius: "2px" }}
          />
        </div>

        {/* ── DESCRIPTION + QUOTE — two column on md ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10 md:mb-16 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="font-body text-sm md:text-base leading-[1.95]"
            style={{ color: "rgba(26,34,24,0.52)" }}
          >
            Set among open fields and quiet orchards, every detail here is shaped around one promise — comfort that feels personal, never staged.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="pl-4 md:pl-6"
            style={{ borderLeft: "1.5px solid rgba(212,168,83,0.45)" }}
          >
            <p className="font-display italic text-sm md:text-base leading-[1.85]" style={{ color: "rgba(26,34,24,0.35)" }}>
              "From slow mornings on the porch to long evenings under open sky — built for people who want to feel at home, not just hosted."
            </p>
          </motion.div>
        </div>

        {/* ── STATS — full width strip, icons + count-up, real dividers ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 mb-10 md:mb-14 rounded-2xl overflow-hidden"
          style={{ background: "var(--color-cream-soft)", border: "1px solid rgba(36,48,40,0.08)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`group flex flex-col items-center text-center py-7 md:py-9 px-4 transition-colors duration-500 hover:bg-[rgba(212,168,83,0.05)] ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < 2 ? "border-b md:border-b-0" : ""} ${i < 3 ? "md:border-r" : ""}`}
              style={{ borderColor: "rgba(212,168,83,0.22)" }}
            >
              <span
                className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110"
                style={{ background: "rgba(212,168,83,0.12)", color: "var(--color-terracotta-dark)" }}
                aria-hidden
              >
                <StatIcon label={s.label} />
              </span>
              <p
                className="font-display italic leading-none mb-1.5"
                style={{ fontSize: "clamp(1.7rem, 4vw, 2.5rem)", color: "var(--color-terracotta-dark)" }}
              >
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} active={isInView} delay={1.2 + i * 0.1} />
              </p>
              <p className="font-body text-[9px] md:text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(26,34,24,0.5)" }}>
                {s.label}
              </p>
              <p className="font-body text-[9px] md:text-[10px]" style={{ color: "rgba(26,34,24,0.3)" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── FEATURE CHIPS ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 md:mb-12"
        >
          {["Handcrafted Rooms", "Orchard Views", "Mountain Hospitality", "Bonfire Evenings", "Farm-to-Table", "Valley Experiences"].map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.3 + i * 0.05, duration: 0.3 }}
              className="font-body text-[10px] md:text-[11px] tracking-wide px-3 md:px-4 py-1.5 md:py-2 rounded-full"
              style={{ background: "rgba(36,48,40,0.04)", border: "1px solid rgba(36,48,40,0.08)", color: "rgba(26,34,24,0.52)" }}
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/all-stay"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-8 py-3.5 transition-all duration-200"
            style={{ background: "var(--color-terracotta-dark)", color: "var(--color-cream-soft)", boxShadow: "0 4px 20px rgba(36,48,40,0.18)" }}>
            Explore Our Stays
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
          <Link href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-body text-[13px] tracking-wide rounded-full px-8 py-3.5 transition-all duration-200"
            style={{ border: "1px solid rgba(36,48,40,0.18)", color: "rgba(26,34,24,0.62)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,48,40,0.4)"; (e.currentTarget as HTMLElement).style.color = "rgba(26,34,24,0.9)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,48,40,0.18)"; (e.currentTarget as HTMLElement).style.color = "rgba(36,48,40,0.62)"; }}>
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* ── BOTTOM MARQUEE ── */}
      <Marquee reverse />
    </section>
  );
}