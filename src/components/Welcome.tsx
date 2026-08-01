"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: "12+", label: "Years", sub: "of hospitality" },
  { value: "3.2K", label: "Guests", sub: "welcomed" },
  { value: "14", label: "Rooms", sub: "handcrafted" },
  { value: "4.9", label: "Rating", sub: "average score" },
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

        {/* ── STATS — full width strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10 md:mb-14 overflow-hidden rounded-2xl"
          style={{ background: "rgba(36,48,40,0.07)", border: "1px solid rgba(36,48,40,0.07)" }}
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center py-6 md:py-8 px-4" style={{ background: "var(--color-cream-soft)" }}>
              <motion.p
                className="font-display italic leading-none mb-1.5"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "var(--color-terracotta-dark)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 + i * 0.08, duration: 0.5 }}
              >
                {s.value}
              </motion.p>
              <p className="font-body text-[9px] md:text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(26,34,24,0.45)" }}>{s.label}</p>
              <p className="font-body text-[9px] md:text-[10px]" style={{ color: "rgba(26,34,24,0.28)" }}>{s.sub}</p>
            </div>
          ))}
        </motion.div>

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
          <Link href="/stay"
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







// "use client";

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import Reveal from "./Reveal";
// import Link from "next/link";

// const stats = [
//   { value: "12+", label: "Years of\nHospitality" },
//   { value: "3,200+", label: "Guests\nWelcomed" },
//   { value: "14", label: "Handcrafted\nRooms" },
//   { value: "4.9★", label: "Average\nRating" },
// ];

// export default function Welcome() {
//   const svgRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(svgRef, { amount: 0.3, once: false });

//   return (
//     <section className="relative w-full bg-cream-soft overflow-hidden">

//       {/* Top decorative line */}
//       <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(36,48,40,0.1), transparent)" }} />

//       {/* SVG Welcome drawing — full width, behind content */}
//       <div
//         ref={svgRef}
//         className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none"
//         aria-hidden="true"
//         style={{ paddingTop: "2%" }}
//       >
//         <svg viewBox="0 0 3969 750" className="w-[95%] max-w-[900px] h-auto" style={{ transform: "scale(1,-1)" }}>
//           {[
//             { d: "M555.6 488.8 258.4 -5.0H218.8L139.8 624.0Q135.2 661.8 118.2 674.4Q101.2 687.0 86.0 688.0L90.4 708.0Q114.0 707.0 147.9 706.0Q181.8 705.0 217.0 705.0Q254.8 705.0 286.7 706.0Q318.6 707.0 339.4 708.0L335.0 688.0Q302.6 686.0 289.6 670.4Q276.6 654.8 281.4 604.0L334.0 142.4L311.0 120.8L548.2 514.0ZM906.2 558.4Q933.2 610.0 934.1 637.2Q935.0 664.4 914.2 675.3Q893.4 686.2 852.6 688.0L857.6 708.0Q873.0 707.0 895.3 706.5Q917.6 706.0 941.5 705.5Q965.4 705.0 982.8 705.0Q1006.8 705.0 1024.6 706.0Q1042.4 707.0 1058.4 708.0L1053.4 688.0Q1035.4 683.4 1017.6 674.2Q999.8 665.0 981.5 645.0Q963.2 625.0 943.6 588.2L633.4 -5.0H593.8L502.8 624.0Q497.6 661.2 484.7 674.1Q471.8 687.0 459.0 688.0L463.4 708.0Q485.0 707.0 516.4 706.0Q547.8 705.0 580.0 705.0Q625.0 705.0 663.6 706.0Q702.2 707.0 726.4 708.0L722.0 688.0Q671.6 686.0 654.6 671.0Q637.6 656.0 644.4 604.0L706.6 155.6L684.0 136.4Z", tx: 0, delay: 0 },
//             { d: "M115.2 220.2Q161.6 237.6 201.3 257.1Q241.0 276.6 267.6 299.2Q305.2 332.2 328.0 376.8Q350.8 421.4 350.8 474.0Q350.8 497.0 346.8 504.0Q342.8 511.0 334.8 511.0Q311.8 511.0 285.0 488.8Q258.2 466.6 232.2 428.5Q206.2 390.4 184.7 342.2Q163.2 294.0 150.2 240.9Q137.2 187.8 137.2 136.4Q137.2 82.6 157.8 61.3Q178.4 40.0 211.8 40.0Q241.4 40.0 281.4 59.2Q321.4 78.4 360.2 128.0L376.2 120.0Q356.0 87.0 323.0 56.0Q290.0 25.0 247.3 5.5Q204.6 -14.0 154.4 -14.0Q111.6 -14.0 77.8 2.0Q44.0 18.0 25.0 49.5Q6.0 81.0 6.0 127.0Q6.0 176.4 23.0 231.7Q40.0 287.0 71.3 339.9Q102.6 392.8 146.2 436.0Q189.8 479.2 243.0 504.6Q296.2 530.0 356.8 530.0Q396.6 530.0 423.7 511.5Q450.8 493.0 450.8 455.2Q450.8 416.0 428.7 381.9Q406.6 347.8 369.5 319.7Q332.4 291.6 287.8 269.6Q243.2 247.6 198.0 231.6Q152.8 215.6 114.2 206.0Z", tx: 955, delay: 0.45 },
//             { d: "M128.8 85.0Q121.2 58.0 125.8 44.5Q130.4 31.0 145.4 31.0Q159.4 31.0 175.9 48.3Q192.4 65.6 210.8 117.4L227.0 162.0H246.0L221.0 89.0Q207.2 49.0 186.3 26.7Q165.4 4.4 141.4 -4.8Q117.4 -14.0 92.2 -14.0Q59.6 -14.0 40.9 -2.1Q22.2 9.8 14.9 31.0Q7.6 52.2 9.9 79.7Q12.2 107.2 21.6 138.8L180.6 667.0Q190.6 701.0 178.6 717.0Q166.6 733.0 117.6 733.0L124.6 754.0Q190.4 755.0 241.0 765.5Q291.6 776.0 338.6 795.0Z", tx: 1411, delay: 0.9 },
//             { d: "M346.6 510.0Q309.0 510.0 272.5 478.8Q236.0 447.6 206.6 394.2Q177.2 340.8 159.7 273.6Q142.2 206.4 142.2 134.4Q142.2 82.2 162.7 59.1Q183.2 36.0 216.2 36.0Q249.4 36.0 284.2 56.0Q319.0 76.0 354.2 128.0L374.2 120.0Q354.4 87.0 323.2 56.0Q292.0 25.0 251.5 5.5Q211.0 -14.0 162.0 -14.0Q95.6 -14.0 53.6 23.4Q11.6 60.8 11.6 137.4Q11.6 185.8 26.3 239.7Q41.0 293.6 68.9 345.3Q96.8 397.0 137.0 438.5Q177.2 480.0 228.2 505.0Q279.2 530.0 339.6 530.0Q390.8 530.0 423.6 504.1Q456.4 478.2 456.4 437.4Q456.4 413.2 444.9 390.1Q433.4 367.0 413.2 352.0Q393.0 337.0 367.0 337.0Q344.0 337.0 329.6 351.1Q315.2 365.2 315.2 388.4Q315.2 425.4 341.4 452.1Q367.6 478.8 401.0 486.6Q392.2 497.4 379.4 503.7Q366.6 510.0 346.6 510.0Z", tx: 1704, delay: 1.35 },
//             { d: "M322.0 510.0Q296.0 510.0 269.1 483.3Q242.2 456.6 217.9 411.3Q193.6 366.0 174.3 310.0Q155.0 254.0 144.0 194.4Q133.0 134.8 133.0 80.6Q133.0 41.2 143.5 23.6Q154.0 6.0 174.8 6.0Q200.4 6.0 227.1 32.1Q253.8 58.2 278.2 102.7Q302.6 147.2 321.6 202.8Q340.6 258.4 351.8 318.3Q363.0 378.2 363.0 434.6Q363.0 477.4 352.6 493.7Q342.2 510.0 322.0 510.0ZM15.0 148.2Q15.0 193.4 27.4 245.4Q39.8 297.4 65.0 347.8Q90.2 398.2 127.5 439.4Q164.8 480.6 215.0 505.3Q265.2 530.0 327.6 530.0Q399.6 530.0 440.3 489.3Q481.0 448.6 481.0 367.8Q481.0 322.6 468.6 270.6Q456.2 218.6 431.0 168.2Q405.8 117.8 368.5 76.6Q331.2 35.4 281.0 10.7Q230.8 -14.0 168.4 -14.0Q96.4 -14.0 55.7 27.0Q15.0 68.0 15.0 148.2Z", tx: 2157, delay: 1.8 },
//             { d: "M144.6 0.0H21.6L142.4 431.0Q146.2 442.8 147.5 455.1Q148.8 467.4 145.6 476.2Q142.4 485.0 129.6 485.0Q110.8 485.0 94.8 465.4Q78.8 445.8 61.6 398.6L44.6 352.0H25.6L51.8 427.0Q66.4 467.4 87.5 489.6Q108.6 511.8 133.3 520.9Q158.0 530.0 182.0 530.0Q214.8 530.0 231.0 517.1Q247.2 504.2 251.9 483.1Q256.6 462.0 253.4 437.6Q250.2 413.2 244.2 390.0ZM400.0 414.0Q405.8 432.2 408.3 447.6Q410.8 463.0 406.9 472.5Q403.0 482.0 388.4 482.0Q364.0 482.0 335.5 452.1Q307.0 422.2 277.1 368.3Q247.2 314.4 218.6 241.5Q190.0 168.6 165.4 82.8L180.0 182.0Q223.6 310.4 263.4 386.8Q303.2 463.2 347.3 496.6Q391.4 530.0 445.8 530.0Q478.2 530.0 494.7 517.1Q511.2 504.2 516.4 482.6Q521.6 461.0 518.3 434.2Q515.0 407.4 507.4 379.0L402.2 0.0H277.0ZM661.2 414.0Q670.4 441.8 670.2 461.9Q670.0 482.0 653.6 482.0Q630.4 482.0 603.2 454.8Q576.0 427.6 545.6 374.3Q515.2 321.0 483.9 243.9Q452.6 166.8 421.4 66.4L430.8 145.2Q467.4 256.0 500.2 330.1Q533.0 404.2 566.0 448.2Q599.0 492.2 634.4 511.1Q669.8 530.0 710.2 530.0Q753.0 530.0 770.8 508.2Q788.6 486.4 787.9 452.3Q787.2 418.2 774.2 379.0L676.4 85.0Q666.4 55.2 671.2 43.1Q676.0 31.0 690.8 31.0Q705.8 31.0 722.5 47.8Q739.2 64.6 758.2 117.4L774.4 162.0H793.4L768.4 89.0Q754.4 47.0 732.7 25.0Q711.0 3.0 686.5 -5.5Q662.0 -14.0 638.6 -14.0Q610.4 -14.0 592.3 -5.3Q574.2 3.4 564.2 19.0Q551.8 38.8 554.2 68.9Q556.6 99.0 569.8 138.8Z", tx: 2673, delay: 2.25 },
//             { d: "M115.2 220.2Q161.6 237.6 201.3 257.1Q241.0 276.6 267.6 299.2Q305.2 332.2 328.0 376.8Q350.8 421.4 350.8 474.0Q350.8 497.0 346.8 504.0Q342.8 511.0 334.8 511.0Q311.8 511.0 285.0 488.8Q258.2 466.6 232.2 428.5Q206.2 390.4 184.7 342.2Q163.2 294.0 150.2 240.9Q137.2 187.8 137.2 136.4Q137.2 82.6 157.8 61.3Q178.4 40.0 211.8 40.0Q241.4 40.0 281.4 59.2Q321.4 78.4 360.2 128.0L376.2 120.0Q356.0 87.0 323.0 56.0Q290.0 25.0 247.3 5.5Q204.6 -14.0 154.4 -14.0Q111.6 -14.0 77.8 2.0Q44.0 18.0 25.0 49.5Q6.0 81.0 6.0 127.0Q6.0 176.4 23.0 231.7Q40.0 287.0 71.3 339.9Q102.6 392.8 146.2 436.0Q189.8 479.2 243.0 504.6Q296.2 530.0 356.8 530.0Q396.6 530.0 423.7 511.5Q450.8 493.0 450.8 455.2Q450.8 416.0 428.7 381.9Q406.6 347.8 369.5 319.7Q332.4 291.6 287.8 269.6Q243.2 247.6 198.0 231.6Q152.8 215.6 114.2 206.0Z", tx: 3513, delay: 2.7 },
//           ].map((letter, i) => (
//             <motion.path
//               key={i}
//               d={letter.d}
//               transform={`translate(${letter.tx}, 0)`}
//               fill="none"
//               stroke="var(--color-terracotta)"
//               strokeWidth="6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={isInView ? { pathLength: 1, opacity: 0.45 } : { pathLength: 0, opacity: 0 }}
//               transition={{
//                 pathLength: { duration: 0.55, delay: isInView ? letter.delay : 0, ease: "easeInOut" },
//                 opacity: { duration: 0.15, delay: isInView ? letter.delay : 0 },
//               }}
//             />
//           ))}
//         </svg>
//       </div>

//       {/* Main content */}
//       <div className="relative max-w-5xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-24">

//         {/* Eyebrow */}
//         <Reveal>
//           <div className="flex items-center justify-center gap-4 mb-8">
//             <span className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, var(--color-terracotta))" }} />
//             <p className="font-body text-[10px] tracking-[0.38em] uppercase" style={{ color: "var(--color-terracotta-dark)" }}>
//               Persimmon Farmstead · Hallan Valley
//             </p>
//             <span className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, var(--color-terracotta))" }} />
//           </div>
//         </Reveal>

//         {/* Main headline */}
//         <Reveal delay={0.1}>
//           <h2 className="font-display italic text-ink text-center leading-[1.2] mb-6 tracking-tight"
//             style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", maxWidth: "680px", margin: "0 auto 1.5rem" }}>
//             A place to slow down, breathe deep,<br />
//             and feel completely at home.
//           </h2>
//         </Reveal>

//         {/* Divider */}
//         <Reveal delay={0.2}>
//           <div className="flex items-center justify-center gap-3 mb-8">
//             <span className="h-px w-8" style={{ background: "rgba(36,48,40,0.15)" }} />
//             <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-terracotta)", opacity: 0.5 }} />
//             <span className="h-px w-8" style={{ background: "rgba(36,48,40,0.15)" }} />
//           </div>
//         </Reveal>

//         {/* Description */}
//         <Reveal delay={0.25}>
//           <p className="text-center font-body text-sm md:text-base leading-[1.95] max-w-xl mx-auto mb-14"
//             style={{ color: "rgba(26,34,24,0.5)" }}>
//             Set among open fields and quiet orchards, every detail here is shaped around one promise — comfort that feels personal, never staged. From slow mornings on the porch to long evenings under open sky, Persimmon Farmstead was built for people who want to feel at home, not just hosted.
//           </p>
//         </Reveal>

//         {/* Stats row */}
//         <Reveal delay={0.35}>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-14"
//             style={{ border: "1px solid rgba(36,48,40,0.08)", borderRadius: "16px", overflow: "hidden", background: "rgba(36,48,40,0.08)" }}>
//             {stats.map((stat, i) => (
//               <div key={i} className="flex flex-col items-center justify-center py-7 px-4 text-center"
//                 style={{ background: "var(--color-cream-soft)" }}>
//                 <motion.p
//                   className="font-display italic leading-none mb-2"
//                   style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--color-terracotta-dark)" }}
//                   initial={{ opacity: 0, y: 10 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * i, duration: 0.5 }}
//                   viewport={{ once: true }}
//                 >
//                   {stat.value}
//                 </motion.p>
//                 <p className="font-body text-[10px] tracking-[0.2em] uppercase whitespace-pre-line"
//                   style={{ color: "rgba(26,34,24,0.38)", lineHeight: 1.6 }}>
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </Reveal>

//         {/* Feature chips */}
//         <Reveal delay={0.4}>
//           <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
//             {["Handcrafted Rooms", "Orchard Views", "Mountain Hospitality", "Bonfire Evenings", "Farm-to-Table Dining", "Valley Experiences"].map((chip) => (
//               <span key={chip} className="font-body text-[11px] tracking-wide px-4 py-2 rounded-full"
//                 style={{ background: "rgba(36,48,40,0.05)", border: "1px solid rgba(36,48,40,0.09)", color: "rgba(26,34,24,0.58)" }}>
//                 {chip}
//               </span>
//             ))}
//           </div>
//         </Reveal>

//         {/* CTAs */}
//         <Reveal delay={0.45}>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
//             <Link href="/stay"
//               className="inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3 transition-colors duration-200"
//               style={{ background: "var(--color-terracotta-dark)", color: "var(--color-cream-soft)" }}>
//               Explore Our Stays
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                 <path d="M5 12h14M13 6l6 6-6 6" />
//               </svg>
//             </Link>
//             <Link href="/about"
//               className="inline-flex items-center gap-2 font-body text-[13px] tracking-wide rounded-full px-7 py-3 transition-all duration-200"
//               style={{ border: "1px solid rgba(36,48,40,0.18)", color: "rgba(26,34,24,0.65)" }}
//               onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,48,40,0.35)"; (e.currentTarget as HTMLElement).style.color = "rgba(26,34,24,0.9)"; }}
//               onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,48,40,0.18)"; (e.currentTarget as HTMLElement).style.color = "rgba(26,34,24,0.65)"; }}>
//               Our Story
//             </Link>
//           </div>
//         </Reveal>

//         {/* Scroll cue */}
//         <Reveal delay={0.5}>
//           <div className="flex flex-col items-center gap-2.5">
//             <motion.div
//               animate={{ y: [0, 8, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//               className="w-px h-10"
//               style={{ background: "linear-gradient(to bottom, var(--color-terracotta), transparent)" }}
//             />
//             <p className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(26,34,24,0.3)" }}>
//               Scroll to Explore
//             </p>
//           </div>
//         </Reveal>
//       </div>

//       {/* Bottom decorative line */}
//       <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(36,48,40,0.08), transparent)" }} />
//     </section>
//   );
// }