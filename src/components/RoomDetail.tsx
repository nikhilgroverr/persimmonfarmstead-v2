"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion, useMotionValue } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rooms, type Room } from "@/lib/rooms";

const ACCENT = "#c2691c";

/* Short, warm one-line copy for each amenity/detail phrase used across rooms.
   Falls back to a generic line if a new phrase is added to rooms.ts later. */
const FEATURE_COPY: Record<string, string> = {
  "King bed": "Plush, layered linens built for deep sleep.",
  "Vaulted pine ceiling": "Warm timber lines that open the room up.",
  "Attached bathroom, 24×7 hot water": "Private ensuite, hot water any hour you like.",
  "Free Wi-Fi": "Fast enough for calls, streaming, and quiet work.",
  "Morning sun": "First light lands right on the bed.",
  "Room service": "A knock at the door, not a walk downstairs.",
  "Pitched wooden ceiling": "Handsome timber pitch that lifts the whole room.",
  "Extra floor space": "Room to unpack, stretch, and settle in properly.",
  "Double bed": "Snug and comfortable, made up fresh daily.",
  "Private sit-out / balcony": "Your own perch for morning chai and the view.",
  "French windows": "Wide glass doors that frame the mountains.",
  "Lounge corner": "A quiet spot to read as the light changes.",
  "Breakfast on request": "Ask the night before, wake up to it hot.",
  "24×7 hot water": "Round-the-clock hot showers, whatever the hour.",
  "Winter heating": "Warmed rooms through the coldest Manali nights.",
  "Bonfire evenings": "Gather by the fire once the sun goes down.",
  "Free parking": "Pull in and leave the car right there.",
  "Breakfast included": "A proper breakfast, on the house, every morning.",
};
function featureCopy(text: string, kind: "detail" | "included") {
  return FEATURE_COPY[text] ?? (kind === "included"
    ? "One more thing we take care of for you."
    : "A thoughtful detail built into every stay here.");
}

/* ── helpers ── */
function Reveal({ children, delay = 0, y = 22 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const reduce = useReducedMotion();
  return (
    <motion.div ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
function Arrow({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
function PinIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
function Stars() {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#d4a853"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      ))}
    </span>
  );
}

const GALLERY_DARK = "#0d130f";
const GALLERY_GOLD = "#d4a853";

/* ── Editorial full-bleed gallery — 3D tilt canvas, clip-path wipe, giant watermark,
     line-reveal titles, difference-blend type. Desktop: absolute avant-garde overlay.
     Mobile: same panel, elements stack in normal flow instead of floating absolute. ── */
function EditorialGallery({ room, images }: { room: Room; images: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const TRANSITION_MS = 1400;
  const captions = room.details.length > 0 ? room.details : [room.name];

  const goTo = (nextI: number) => {
    if (nextI === index || images.length <= 1) return;
    setPrevIndex(index);
    setIndex(nextI);
    window.setTimeout(() => setPrevIndex((p) => (p === index ? null : p)), TRANSITION_MS);
  };
  const next = () => goTo((index + 1) % images.length);
  const prev = () => goTo((index - 1 + images.length) % images.length);

  useEffect(() => {
    if (reduce || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((cur) => {
        const n = (cur + 1) % images.length;
        setPrevIndex(cur);
        window.setTimeout(() => setPrevIndex((p) => (p === cur ? null : p)), TRANSITION_MS);
        return n;
      });
    }, 5500);
    return () => clearInterval(id);
  }, [reduce, images.length]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 12);
    rx.set((0.5 - py) * 12);
  };
  const resetTilt = () => { rx.set(0); ry.set(0); };

  const title = captions[index % captions.length];
  const desc = featureCopy(title, "detail");

  const canvas = (
    <div
      ref={canvasRef}
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
      className="relative flex-shrink-0 mx-auto"
      style={{ width: "clamp(220px, 100%, 680px)", height: "clamp(280px, 60vh, 560px)", perspective: 1400 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", width: "100%", height: "100%" }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="relative w-full h-full overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), 0 40px 90px rgba(0,0,0,0.55)" }} />
        {images.map((src, i) => {
          const isActive = i === index;
          const isExiting = i === prevIndex;
          const clip = isActive
            ? "polygon(0 0,100% 0,100% 100%,0 100%)"
            : isExiting
              ? "polygon(50% 0,50% 0,50% 100%,50% 100%)"
              : "polygon(0 50%,100% 50%,100% 50%,0 50%)";
          const scale = isActive ? 1 : isExiting ? 0.92 : 1.18;
          return (
            <img
              key={src}
              src={src}
              alt={`${room.name} — photo ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: clip,
                transform: `scale(${scale})`,
                opacity: isActive || isExiting ? 1 : 0,
                zIndex: isActive ? 2 : isExiting ? 1 : 0,
                transition: reduce
                  ? "opacity 0.6s ease"
                  : `clip-path ${TRANSITION_MS}ms cubic-bezier(0.83,0,0.17,1), transform ${TRANSITION_MS}ms cubic-bezier(0.22,1,0.36,1), opacity 0.3s`,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );

  const navControls = (
    <div className="flex items-center gap-3">
      <button onClick={prev} className="group relative rounded-full px-5 py-2.5 transition-transform duration-300">
        <span aria-hidden className="absolute inset-0 rounded-full opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" style={{ border: "1px solid rgba(244,239,228,0.4)" }} />
        <span className="relative font-body text-[10px] tracking-[0.28em] uppercase transition-colors duration-300 text-[rgba(244,239,228,0.45)] group-hover:text-[#f4efe4]">
          Previous
        </span>
      </button>
      <button onClick={next} className="group relative rounded-full px-5 py-2.5 transition-transform duration-300">
        <span aria-hidden className="absolute inset-0 rounded-full opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" style={{ border: "1px solid rgba(244,239,228,0.4)" }} />
        <span className="relative font-body text-[10px] tracking-[0.28em] uppercase transition-colors duration-300 text-[rgba(244,239,228,0.45)] group-hover:text-[#f4efe4]">
          Next
        </span>
      </button>
    </div>
  );

  /* Upcoming photos queued as small circular thumbnails — the one "up next" sits
     largest/brightest at the front of the queue; as the gallery advances the whole
     queue reflows (framer-motion layout animation), and the photo that just became
     the big image drops off, rejoining the queue at the back once its turn comes again.
     Capped to MAX_QUEUE visible thumbnails so it stays clean even with 20–30 photos. */
  const MAX_QUEUE = 5;
  const queueOrder = images.length > 1
    ? Array.from({ length: Math.min(images.length - 1, MAX_QUEUE) }, (_, i) => (index + 1 + i) % images.length)
    : [];

  const progressTicks = queueOrder.length > 0 && (
    <div className="flex md:flex-col items-center gap-3 md:gap-3.5">
      <AnimatePresence initial={false}>
        {queueOrder.map((imgIdx, pos) => {
          const size = pos === 0 ? 42 : 30;
          const dim = Math.max(1 - pos * 0.18, 0.35);
          return (
            <motion.button
              key={images[imgIdx]}
              layout
              onClick={() => goTo(imgIdx)}
              aria-label={`Go to photo ${imgIdx + 1}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: dim, scale: 1, width: size, height: size }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative flex-shrink-0 overflow-hidden rounded-full transition-shadow duration-500 ease-out"
              style={{ boxShadow: pos === 0 ? `0 0 0 2px ${GALLERY_GOLD}` : "0 0 0 1px rgba(255,255,255,0.16)" }}
            >
              <img src={images[imgIdx]} alt="" className="w-full h-full object-cover" />
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden rounded-[24px] md:rounded-[40px]" style={{ background: GALLERY_DARK }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />
      <span
        key={index}
        aria-hidden
        className="absolute select-none pointer-events-none font-display"
        style={{
          fontSize: "clamp(9rem, 40vw, 30rem)",
          lineHeight: 1,
          color: "rgba(255,255,255,0.025)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-52%)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* ── Desktop: canvas | meta — title column removed, canvas gets the freed space ── */}
      <div
        className="hidden md:grid relative z-10 items-center gap-10 lg:gap-16 px-8 lg:px-16"
        style={{ minHeight: "74vh", gridTemplateColumns: "minmax(0,1fr) minmax(200px,280px)" }}
      >
        {canvas}

        <motion.div key={`meta-${index}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative pl-8">
          <span aria-hidden className="absolute left-0 top-1 bottom-1 w-px" style={{ background: "linear-gradient(to bottom, rgba(212,168,83,0.6), rgba(212,168,83,0))" }} />
          <p className="font-body text-[9px] tracking-[0.34em] uppercase mb-3" style={{ color: GALLERY_GOLD }}>
            {room.propertyName} · {room.location}
          </p>
          <p className="font-display italic leading-[1.5]" style={{ fontSize: "clamp(0.95rem,1.1vw,1.15rem)", color: "rgba(244,239,228,0.82)" }}>
            {desc}
          </p>
          <div className="mt-9">{progressTicks}</div>
        </motion.div>
      </div>

      <div className="hidden md:block absolute z-30 left-8 lg:left-16 bottom-[6%]">{navControls}</div>

      {/* ── Mobile: same content, stacked in normal flow ── */}
      <div className="flex md:hidden relative z-10 flex-col items-center px-6 pt-14 pb-8">
        {canvas}

        <motion.div
          key={`meta-m-${index}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-center max-w-[300px]"
        >
          <p className="font-body text-[9px] tracking-[0.32em] uppercase mb-3" style={{ color: GALLERY_GOLD }}>
            {room.propertyName} · {room.location}
          </p>
          <p className="font-display italic leading-[1.6]" style={{ fontSize: "1rem", color: "rgba(244,239,228,0.78)" }}>
            {desc}
          </p>
        </motion.div>

        <div className="mt-8 flex items-center gap-6">{progressTicks}</div>
        <div className="mt-6">{navControls}</div>
      </div>
    </div>
  );
}

/* ── Split-screen feature list — sticky title left, full-width editorial rows right,
     giant watermark numeral per row, diamond icon, content shifts right on hover.
     Adapted to the site's light editorial palette. ── */
function FeatureRowList({ eyebrow, title, items, kind }: { eyebrow: string; title: string; items: string[]; kind: "detail" | "included" }) {
  return (
    <div className="grid md:grid-cols-12 gap-10 lg:gap-16">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-28">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
            <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>{eyebrow}</p>
          </div>
          <h2 className="font-display leading-[0.95]" style={{ fontSize: "clamp(2.6rem,6vw,4.4rem)", color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
            {title}
          </h2>
        </div>
      </div>

      <div className="md:col-span-8">
        {items.map((text, i) => (
          <FeatureRow key={text} text={text} index={i} kind={kind} first={i === 0} />
        ))}
      </div>
    </div>
  );
}

/* ── Icon per amenity — matched to the specific text, falls back to a diamond mark
     for any phrase not in the map (e.g. a new item added to rooms.ts later). ── */
function FeatureIcon({ name }: { name: string }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "King bed":
    case "Double bed":
      return <svg {...p}><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>;
    case "Vaulted pine ceiling":
    case "Pitched wooden ceiling":
      return <svg {...p}><path d="M3 12 12 4l9 8" /><path d="M5 12v8h14v-8" /></svg>;
    case "Attached bathroom, 24×7 hot water":
    case "24×7 hot water":
      return <svg {...p}><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" /></svg>;
    case "Free Wi-Fi":
      return <svg {...p}><path d="M2 8.5a16 16 0 0 1 20 0" /><path d="M5 12a11 11 0 0 1 14 0" /><path d="M8.5 15.5a6 6 0 0 1 7 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></svg>;
    case "Morning sun":
      return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
    case "Room service":
      return <svg {...p}><path d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M2 20h20" /><path d="M10 4a2 2 0 0 1 4 0" /></svg>;
    case "Extra floor space":
      return <svg {...p}><path d="M8 3H3v5" /><path d="M21 8V3h-5" /><path d="M3 16v5h5" /><path d="M16 21h5v-5" /></svg>;
    case "Private sit-out / balcony":
      return <svg {...p}><path d="M3 10h18" /><path d="M5 10v11" /><path d="M19 10v11" /><path d="M9 21v-6" /><path d="M15 21v-6" /></svg>;
    case "French windows":
      return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M12 3v18" /><path d="M4 12h16" /></svg>;
    case "Lounge corner":
      return <svg {...p}><path d="M5 12V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" /><path d="M3 12h18v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" /><path d="M5 19v2M19 19v2" /></svg>;
    case "Breakfast on request":
    case "Breakfast included":
      return <svg {...p}><path d="M4 8h13a3 3 0 0 1 0 6h-1" /><path d="M4 8v7a4 4 0 0 0 4 4h5a4 4 0 0 0 4-4v-1" /><path d="M8 2v2M12 2v2M16 2v2" /></svg>;
    case "Winter heating":
    case "Bonfire evenings":
      return <svg {...p}><path d="M12 21a6 6 0 0 0 6-6c0-3-2-4-3-7 0 2-1 3-2 3-1-2 0-4-1-6-2 3-4 5-4 10a6 6 0 0 0 4 6z" /></svg>;
    case "Free parking":
      return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 8h3.5a2.5 2.5 0 0 1 0 5H9V8z" /><path d="M9 13v3" /></svg>;
    default:
      return <span className="block w-3 h-3 rotate-45" style={{ background: "currentColor", opacity: 0.9 }} />;
  }
}

function FeatureRow({ text, index, kind, first }: { text: string; index: number; kind: "detail" | "included"; first: boolean }) {
  const reduce = useReducedMotion();
  const tint = kind === "included" ? ACCENT : "#6b8e5a";
  const tintSoft = kind === "included" ? "rgba(194,105,28,0.09)" : "rgba(107,142,90,0.11)";
  const desc = featureCopy(text, kind);
  return (
    <motion.div
      className="group relative overflow-hidden px-2 md:px-6 py-8 md:py-11 transition-colors duration-700"
      style={{
        borderTop: first ? "1px solid rgba(36,48,40,0.1)" : "none",
        borderBottom: "1px solid rgba(36,48,40,0.1)",
      }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4, margin: "-60px" }}
      transition={{ duration: 0.75, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] }}
    >
      <span aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "#faf6ee" }} />
      <span
        aria-hidden
        className="absolute select-none pointer-events-none font-display transition-colors duration-700"
        style={{
          right: "0.25rem", top: "50%", transform: "translateY(-50%)",
          fontSize: "clamp(4rem,9vw,7rem)", lineHeight: 1, letterSpacing: "-0.04em",
          color: "rgba(36,48,40,0.04)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex items-start gap-5 md:gap-7 transition-transform duration-700 ease-out group-hover:translate-x-3">
        <motion.span
          aria-hidden
          className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
          style={{ background: tintSoft, color: tint }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4, margin: "-60px" }}
          transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.35) + 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <FeatureIcon name={text} />
        </motion.span>
        <div className="flex flex-col gap-1.5 md:gap-2 pt-1.5 md:pt-2">
          <h3 className="font-display leading-tight" style={{ fontSize: "clamp(1.35rem,2.6vw,1.85rem)", color: "var(--color-ink)" }}>
            {text}
          </h3>
          <p className="font-body leading-relaxed max-w-lg" style={{ fontSize: "14.5px", color: "rgba(26,34,24,0.55)" }}>
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-9">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-8" style={{ background: "var(--color-terracotta)" }} />
        <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>{eyebrow}</p>
      </div>
      <h2 className="font-display leading-tight" style={{ fontSize: "clamp(1.8rem,3.6vw,2.8rem)", color: "var(--color-ink)", letterSpacing: "-0.015em" }}>{title}</h2>
      {sub && <p className="font-body text-sm md:text-base mt-3 max-w-xl" style={{ color: "rgba(26,34,24,0.5)" }}>{sub}</p>}
    </div>
  );
}

/* ── FAQ accordion (room-specific) ── */
function RoomFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className="relative" style={{ borderBottom: i === faqs.length - 1 ? "none" : "1px solid rgba(36,48,40,0.1)" }}>
            <span aria-hidden className="absolute -left-5 md:-left-7 top-0 bottom-0 w-px transition-opacity duration-500" style={{ background: ACCENT, opacity: open ? 0.7 : 0 }} />
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="w-full flex items-start gap-4 md:gap-5 py-6 md:py-7 text-left"
            >
              <span className="font-display italic flex-shrink-0 pt-1" style={{ fontSize: "13px", color: ACCENT, opacity: 0.75, width: "24px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="flex-1 font-display leading-snug transition-colors duration-300"
                style={{ fontSize: "clamp(1.05rem,1.6vw,1.3rem)", color: open ? "var(--color-ink)" : "rgba(26,34,24,0.82)" }}
              >
                {item.q}
              </span>
              <span
                className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 transition-all duration-300"
                style={{
                  width: 30, height: 30,
                  border: `1px solid ${ACCENT}66`,
                  background: open ? ACCENT : "transparent",
                  transform: open ? "rotate(135deg)" : "rotate(0deg)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? "#fff" : ACCENT} strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="font-display italic pl-[40px] md:pl-[44px] pb-7 pr-8 leading-[1.75]" style={{ color: "rgba(26,34,24,0.6)", fontSize: "clamp(0.95rem,1.1vw,1.05rem)", maxWidth: "56ch" }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ── Framed photo — auto-changing carousel, each image its own elegant silhouette ── */
const PHOTO_SHAPES = [
  "rounded-tl-[8px] rounded-tr-[130px] rounded-br-[8px] rounded-bl-[130px]",
  "rounded-tl-[130px] rounded-tr-[8px] rounded-br-[130px] rounded-bl-[8px]",
  "rounded-t-[999px] rounded-b-2xl",
  "rounded-b-[999px] rounded-t-2xl",
  "rounded-2xl",
];

function FramedPhoto({ images, alt, caption }: { images: string[]; alt: string; caption: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduce || images.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 6000);
    return () => clearInterval(id);
  }, [reduce, images.length]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative overflow-hidden transition-[border-radius] duration-[3000ms] ease-in-out ${PHOTO_SHAPES[index % PHOTO_SHAPES.length]}`}
        style={{ aspectRatio: "4/5", boxShadow: "0 50px 100px -48px rgba(43,27,17,0.48)" }}>
        <AnimatePresence mode="sync">
          {images.map((src, i) => i === index && (
            <motion.img
              key={src}
              src={src}
              alt={`${alt} — photo ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </AnimatePresence>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(160deg, rgba(6,8,6,0.1) 0%, transparent 30%, rgba(6,8,6,0.14) 100%)" }} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        {images.length > 1 && (
          <button aria-label="Previous photo" onClick={prev}
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 hover:bg-[rgba(194,105,28,0.08)]"
            style={{ border: "1px solid rgba(194,105,28,0.35)", color: ACCENT }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        )}
        <p className="font-body text-[10px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{caption}</p>
        {images.length > 1 && (
          <button aria-label="Next photo" onClick={next}
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 hover:bg-[rgba(194,105,28,0.08)]"
            style={{ border: "1px solid rgba(194,105,28,0.35)", color: ACCENT }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function RoomDetail({ room }: { room: Room }) {
  const others = rooms.filter((r) => r.property === room.property && r.slug !== room.slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);

  const heroImages = room.gallery && room.gallery.length > 0 ? room.gallery : [room.img];
  const HERO_INTERVAL = 6200;
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (reduce || heroImages.length <= 1) return;
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), HERO_INTERVAL);
    return () => clearInterval(id);
  }, [reduce, heroImages.length]);

  return (
    <main style={{ background: "var(--color-cream-soft)" }}>
      <Navbar />

      {/* ══ HERO — cinematic full-bleed carousel, all content overlaid, no card blocks ══ */}
      <section ref={heroRef} className="relative w-full overflow-hidden" style={{ minHeight: "94vh", display: "flex", alignItems: "flex-end" }}>
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            {heroImages.map((src, i) => i === heroIndex && (
              <motion.img
                key={src}
                src={src}
                alt={`${room.name} — photo ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ y: imgY }}
                initial={{ opacity: 0, scale: reduce ? 1.04 : 1.02 }}
                animate={{ opacity: 1, scale: reduce ? 1.04 : 1.16 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: (HERO_INTERVAL / 1000) + 1.8, ease: "linear" },
                }}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,14,10,0.22) 0%, rgba(8,14,10,0.06) 30%, rgba(8,14,10,0.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,14,10,0.4) 0%, transparent 55%)" }} />

        {heroImages.length > 1 && (
          <>
            {/* slim segmented progress bar */}
            <div className="absolute z-20 bottom-0 left-0 right-0 flex h-[2.5px]">
              {heroImages.map((_, i) => (
                <button key={i} aria-label={`Go to photo ${i + 1}`} onClick={() => setHeroIndex(i)}
                  className="flex-1 mx-px transition-colors duration-500"
                  style={{ background: i === heroIndex ? "#d4a853" : "rgba(247,242,232,0.28)" }} />
              ))}
            </div>
          </>
        )}

        <div className="relative z-10 w-full px-6 md:px-14 lg:px-20 pb-16 md:pb-24 pt-40">
          <div className="max-w-4xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6">
                <PinIcon />
                <span className="font-body text-[10px] md:text-[11px] tracking-[0.28em] uppercase" style={{ color: "rgba(247,242,232,0.65)" }}>
                  {room.propertyName} · {room.location}
                </span>
                <span className="w-1 h-1 rounded-full" style={{ background: "rgba(212,168,83,0.7)" }} />
                <span className="font-body text-[10px] md:text-[11px] tracking-[0.28em] uppercase" style={{ color: "#f5d98a" }}>
                  {room.tag}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="font-display italic leading-[1.02] mb-6" style={{ fontSize: "clamp(2.8rem,7.5vw,5.6rem)", letterSpacing: "-0.03em", color: "rgba(247,242,232,0.98)", textShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
                {room.name}
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="font-body text-[15px] md:text-[17px] leading-[1.75] mb-8 max-w-xl" style={{ color: "rgba(247,242,232,0.78)" }}>
                {room.short}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-10 pb-10" style={{ borderBottom: "1px solid rgba(247,242,232,0.16)" }}>
                <div className="flex items-center gap-1.5">
                  <Stars />
                  <span className="font-body text-[12px] ml-1" style={{ color: "rgba(247,242,232,0.62)" }}>4.9 · 141+ reviews</span>
                </div>
                <span className="hidden sm:block w-px h-3.5" style={{ background: "rgba(247,242,232,0.22)" }} />
                {[{ k: "Sleeps", v: room.guests }, { k: "Bed", v: room.bed }, { k: "View", v: room.view }].map((s, i) => (
                  <span key={s.k} className="flex items-center gap-2.5">
                    {i > 0 && <span className="w-px h-3.5" style={{ background: "rgba(247,242,232,0.22)" }} />}
                    <span className="font-body text-[13px]" style={{ color: "rgba(247,242,232,0.85)" }}>
                      <span className="uppercase mr-1.5" style={{ fontSize: "9px", letterSpacing: "0.16em", color: "rgba(247,242,232,0.5)" }}>{s.k}</span>
                      {s.v}
                    </span>
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact#form"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 font-body text-[13px] tracking-wide transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: ACCENT, color: "#fff", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(194,105,28,0.6)" }}>
                  Request these dates <Arrow size={14} />
                </Link>
                <a href="https://wa.me/916230645166" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-body text-[13px] tracking-wide transition-colors duration-200"
                  style={{ border: "1px solid rgba(247,242,232,0.35)", color: "rgba(247,242,232,0.92)", background: "rgba(247,242,232,0.06)", backdropFilter: "blur(6px)" }}>
                  WhatsApp us
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ ARTICLE — quiet editorial chapter: tinted panel, asymmetric grid, framed print, closing pull-quote ══ */}
      <section className="relative w-full overflow-hidden py-20 md:py-32 px-5 md:px-12" style={{ background: "#f2ecdc", borderTop: "1px solid rgba(36,48,40,0.07)", borderBottom: "1px solid rgba(36,48,40,0.07)" }}>
        <span aria-hidden className="hidden md:block absolute select-none pointer-events-none font-display italic"
          style={{ top: "-2.5rem", right: "2rem", fontSize: "16rem", lineHeight: 1, color: "rgba(36,48,40,0.045)" }}>
          02
        </span>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <div className="flex items-center gap-3.5 mb-6">
                    <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
                    <p className="font-body text-[10px] md:text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>The room</p>
                  </div>
                  <h2 className="font-display italic leading-[1.08] mb-4" style={{ fontSize: "clamp(2.3rem,8vw,2.9rem)", color: "var(--color-ink)", letterSpacing: "-0.015em" }}>
                    About this stay
                  </h2>
                  <span className="block h-px mb-10 md:mb-9" style={{ width: "56px", background: "linear-gradient(to right, rgba(212,168,83,0.8), rgba(212,168,83,0))" }} />
                </Reveal>
                <Reveal delay={0.08}>
                  <FramedPhoto images={heroImages} alt={room.name} caption={`${room.name} · ${room.location}`} />
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 pt-1 lg:pt-3 relative pl-6 md:pl-8">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-px"
                style={{ background: "linear-gradient(to bottom, rgba(212,168,83,0.6), rgba(212,168,83,0.04))" }} />

              {room.body.map((para, i) => {
                const rest = i === 0 ? para.slice(1) : para;
                const ledeEnd = i === 0 ? rest.indexOf(". ") : -1;
                const lede = ledeEnd !== -1 ? rest.slice(0, ledeEnd + 1) : null;
                const remainder = ledeEnd !== -1 ? rest.slice(ledeEnd + 2) : rest;

                return (
                  <Reveal key={i} delay={i * 0.05}>
                    <p
                      className="font-body mb-6 max-w-[60ch]"
                      style={{
                        fontSize: i === 0 ? "clamp(1rem,0.55vw + 0.85rem,1.1rem)" : "clamp(0.94rem,0.4vw + 0.85rem,1.03rem)",
                        lineHeight: 1.95,
                        letterSpacing: "0.005em",
                        color: i === 0 ? "rgba(26,34,24,0.78)" : "rgba(26,34,24,0.68)",
                      }}
                    >
                      {i === 0 && (
                        <span className="font-display italic float-left mr-3 mt-1" style={{ fontSize: "3.6rem", lineHeight: "0.75", color: ACCENT }}>
                          {para.charAt(0)}
                        </span>
                      )}
                      {lede && <em style={{ fontStyle: "italic", color: "rgba(26,34,24,0.9)" }}>{lede}</em>}
                      {lede ? " " : ""}
                      {remainder}
                    </p>
                    {i < room.body.length - 1 && (
                      <div aria-hidden className="flex items-center gap-3 mb-6" style={{ maxWidth: "60ch" }}>
                        <span className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(212,168,83,0.5), transparent)" }} />
                        <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: ACCENT, opacity: 0.6 }} />
                        <span className="h-px flex-1" style={{ background: "linear-gradient(to left, rgba(212,168,83,0.5), transparent)" }} />
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* closing pull-quote — quiet, centered, full width */}
          <Reveal delay={0.12}>
            <div className="max-w-2xl mx-auto text-center mt-16 md:mt-24">
              <span className="block w-9 h-px mx-auto mb-8" style={{ background: ACCENT, opacity: 0.6 }} />
              <p className="font-display italic leading-[1.5]" style={{ fontSize: "clamp(1.4rem,2.6vw,2rem)", color: "var(--color-ink)", opacity: 0.82 }}>
                {room.quote}
              </p>
              <span className="block w-9 h-px mx-auto mt-8" style={{ background: ACCENT, opacity: 0.6 }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ GALLERY — immersive editorial showcase ══ */}
      <section className="relative w-full px-3 md:px-8 pb-16 md:pb-24">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6 px-2 md:px-4">
              <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
              <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>A closer look</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <EditorialGallery room={room} images={room.gallery} />
          </Reveal>
        </div>
      </section>

      {/* ══ THE DETAILS — split-screen editorial row list ══ */}
      <section className="relative w-full px-5 md:px-12 pb-14 md:pb-20 pt-16" style={{ borderTop: "1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <FeatureRowList eyebrow="In this room" title="The details" items={room.details} kind="detail" />
          </Reveal>
        </div>
      </section>

      {/* ══ INCLUDED — split-screen editorial row list ══ */}
      <section className="relative w-full px-5 md:px-12 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <FeatureRowList eyebrow="What's included" title="Included" items={room.included} kind="included" />
          </Reveal>
        </div>

        <div className="max-w-6xl mx-auto mt-14 md:mt-16 pt-10" style={{ borderTop: "1px solid rgba(36,48,40,0.07)" }}>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="h-px w-8" style={{ background: "var(--color-terracotta)" }} />
                <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>Who it suits</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {room.bestFor.map((b, i) => (
                  <span key={b} className="flex items-center gap-5">
                    {i > 0 && <span aria-hidden className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: ACCENT, opacity: 0.5 }} />}
                    <span className="font-display italic" style={{ fontSize: "16px", color: "var(--color-ink)", opacity: 0.85 }}>{b}</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="relative w-full overflow-hidden px-5 md:px-12 py-16 md:py-24" style={{ background: "#f5ebdd", borderTop: "1px solid rgba(36,48,40,0.08)" }}>
        <span aria-hidden className="hidden md:block absolute select-none pointer-events-none font-display italic"
          style={{ top: "-3.5rem", left: "1rem", fontSize: "18rem", lineHeight: 1, color: "rgba(36,48,40,0.04)" }}>
          ?
        </span>
        <div className="relative max-w-3xl mx-auto mb-10 md:mb-14">
          <Reveal><SectionHead eyebrow="Before you book" title="Questions about this room" /></Reveal>
        </div>
        <Reveal delay={0.06}>
          <RoomFAQ faqs={room.faqs} />
        </Reveal>
      </section>

      {/* ══ CTA band — cinematic close, framed like an engraved invitation ══ */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImages[1] ?? heroImages[0]}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.48) saturate(1.05)" }}
          />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(8,14,10,0.8) 0%, rgba(8,14,10,0.66) 55%, rgba(8,14,10,0.84) 100%)" }} />
        <span aria-hidden className="hidden md:block absolute select-none pointer-events-none font-display italic"
          style={{ top: "-4rem", left: "50%", transform: "translateX(-50%)", fontSize: "20rem", lineHeight: 1, color: "rgba(247,242,232,0.035)" }}>
          &rdquo;
        </span>

        <div className="relative max-w-2xl mx-auto px-6 py-24 md:py-36">
          <Reveal>
            <div className="relative text-center px-8 py-14 md:px-16 md:py-20" style={{ border: "1px solid rgba(247,242,232,0.16)" }}>
              <span aria-hidden className="absolute top-4 left-4 w-6 h-6" style={{ borderTop: "1px solid rgba(212,168,83,0.7)", borderLeft: "1px solid rgba(212,168,83,0.7)" }} />
              <span aria-hidden className="absolute bottom-4 right-4 w-6 h-6" style={{ borderBottom: "1px solid rgba(212,168,83,0.7)", borderRight: "1px solid rgba(212,168,83,0.7)" }} />

              <div className="flex items-center justify-center gap-3 mb-7">
                <span className="h-px w-8" style={{ background: "rgba(212,168,83,0.6)" }} />
                <p className="font-body text-[9px] tracking-[0.44em] uppercase" style={{ color: "#f5d98a" }}>Ready when you are</p>
                <span className="h-px w-8" style={{ background: "rgba(212,168,83,0.6)" }} />
              </div>
              <h2 className="font-display italic mb-6 leading-[1.05]" style={{ fontSize: "clamp(2.3rem,5.2vw,3.8rem)", color: "rgba(247,242,232,0.98)", letterSpacing: "-0.02em", textShadow: "0 6px 30px rgba(0,0,0,0.4)" }}>
                Like the look of it?
              </h2>
              <p className="font-body text-[14.5px] md:text-base mb-10 max-w-md mx-auto" style={{ color: "rgba(247,242,232,0.68)", lineHeight: 1.9 }}>
                Send a request and a real host confirms your dates — usually within a few hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/contact#form"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 font-body text-[13px] tracking-wide transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: ACCENT, color: "#fff", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(194,105,28,0.6)" }}>
                  Request these dates <Arrow size={14} />
                </Link>
                <a href="https://wa.me/916230645166" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-body text-[13px] tracking-wide transition-all duration-300 hover:border-[rgba(247,242,232,0.6)]"
                  style={{ border: "1px solid rgba(247,242,232,0.3)", color: "rgba(247,242,232,0.92)", background: "rgba(247,242,232,0.05)", backdropFilter: "blur(6px)" }}>
                  WhatsApp us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ OTHER ROOMS — editorial showcase, light background matching the rest of the page ══ */}
      <section className="relative w-full overflow-hidden" style={{ borderTop: "1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col items-start mb-12 md:mb-14">
              <div className="flex items-center gap-4 mb-5">
                <span className="w-9 h-px" style={{ background: ACCENT, opacity: 0.7 }} />
                <span className="font-body text-[9px] md:text-[10px] font-medium tracking-[0.4em] uppercase" style={{ color: ACCENT }}>
                  Keep Exploring
                </span>
              </div>
              <h2 className="font-display leading-none tracking-tight" style={{ fontSize: "clamp(2.1rem,4.6vw,3.4rem)", color: "var(--color-ink)" }}>
                Other rooms
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {others.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08}>
                <Link
                  href={`/rooms/${r.slug}`}
                  className={`group block w-full max-w-[420px] mx-auto md:mx-0 ${i === 1 ? "md:mt-10" : ""}`}
                >
                  {/* Image — clean, no dark overlay */}
                  <div className="relative overflow-hidden aspect-[4/5] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                      style={{ boxShadow: "0 50px 90px -35px rgba(43,27,17,0.45)" }}
                    />
                    <img
                      src={r.img}
                      alt={r.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08]"
                    />

                    {/* Sharp-edged badge, no pill */}
                    <div
                      className="absolute top-4 left-4 md:top-5 md:left-5 px-4 py-1.5 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ border: "1px solid rgba(181,112,63,0.3)", background: "rgba(247,242,232,0.92)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                    >
                      <span className="font-body text-[8.5px] md:text-[9px] tracking-[0.28em] uppercase transition-colors duration-700" style={{ color: "#8a5328" }}>{r.tag}</span>
                    </div>
                  </div>

                  {/* Name, meta, arrow — light ink on the page's own cream background */}
                  <div className="flex items-end justify-between w-full gap-3 pt-5">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display italic font-light leading-none" style={{ fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--color-ink)" }}>
                        {r.name}
                      </h3>
                      <div className="flex items-center gap-2.5 font-body text-[10.5px] md:text-[11.5px] tracking-[0.18em] uppercase" style={{ color: "rgba(26,34,24,0.5)" }}>
                        <span>{r.guests}</span>
                        <span style={{ color: ACCENT, opacity: 0.5 }}>•</span>
                        <span>{r.bed}</span>
                      </div>
                    </div>

                    <span className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#c2691c] group-hover:bg-[rgba(194,105,28,0.1)] group-hover:scale-105"
                      style={{ borderColor: "rgba(194,105,28,0.3)" }}>
                      <svg
                        width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5"
                        className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}