"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform, useInView,
  useMotionValue, useReducedMotion,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rooms as allRooms } from "@/lib/rooms";
const cottages = allRooms.filter((r) => r.property === "shanag");

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

/* ── Data ── */
const property = {
  name: "Persimmon Farmstead Shanag",
  tag: "Orchard Retreat",
  location: "Shanag (Bahang) · Manali",
  tagline: "Apple trees, snow-kissed peaks.",
  description:
    "Persimmon Farmstead Shanag is our boutique hotel in Shanag village near Bahang, about 4–5 km north of Manali. It blends wooden chalets and stone cottages across wide orchard lawns — close enough to Old Manali and Mall Road to wander in, far enough to wake up to apple trees and snow-kissed peaks.",
  body: [
    "Persimmon Farmstead Shanag is our boutique hotel in Shanag village near Bahang, about 4–5 km north of Manali. It blends wooden chalets and stone cottages across wide orchard lawns — close enough to Old Manali and Mall Road to wander in, far enough to wake up to apple trees and snow-kissed peaks.",
    "It grew out of the same idea as our flagship in Badgran: good rooms, honest food, and people who actually live here running the place, not a rotating staff who clock out at six. Four types of cottage sit across the grounds, from a small standalone wooden hut for two to a full three-bedroom stone cottage built for groups, so who you'll find here changes with the season — couples on their first trip to Manali, families back for a third or fourth year running, groups splitting a week between here and town.",
    "Mornings tend to start slow. Chai on the lawn, the grass still wet from the night before, the peaks visible if the cloud hasn't rolled in yet. By afternoon most guests are down in Old Manali for the cafes and the walk along the river, back before dark for a bonfire if the weather holds. Mall Road is close enough to reach on foot when you want it, and the property sits quiet enough at night that you forget how near it actually is.",
  ],
  rating: "4.9",
  reviews: "141+",
  img: "/images/shanag/KIN01880.webp",
  gallery: [
    "/images/shanag/KIN01880.webp",
    "/images/shanag/KIN01882.webp",
    "/images/shanag/KIN01883.webp",
    "/images/shanag/KIN01884.webp",
    "/images/shanag/KIN01887.webp",
    "/images/shanag/KIN01889.webp",
    "/images/shanag/KIN01892.webp",
    "/images/shanag/KIN01893.webp",
    "/images/shanag/KIN01895.webp",
    "/images/shanag/KIN01900.webp",
    "/images/shanag/KIN01901.webp",
    "/images/shanag/KIN01902.webp",
    "/images/shanag/KIN01905.webp",
    "/images/shanag/KIN01906.webp",
    "/images/shanag/KIN01910.webp",
    "/images/shanag/KIN01915.webp",
  ],
  amenities: ["Wooden chalets", "Stone cottages", "Orchard lawns", "Near Old Manali", "Apple trees", "Snow peak views"],
  mapEmbed: "https://www.google.com/maps?q=32.306541,77.17561&z=13&output=embed",
};
const AMENITY_COPY: Record<string, string> = {
  "Wooden chalets": "Timber-built rooms with a warm, cabin feel.",
  "Stone cottages": "Solid stone walls — cool in summer, warm in winter.",
  "Orchard lawns": "Wide green lawns threaded between the apple trees.",
  "Near Old Manali": "A short walk from Old Manali's cafes and Mall Road.",
  "Apple trees": "A working orchard right outside your window.",
  "Snow peak views": "Snow-capped ranges visible from the property year-round.",
};
const propertyFaqs = [
  { q: "How far is Farmstead Shanag from Manali?", a: "About 4–5 km north of Manali, in Shanag village near Bahang — close enough to walk into Old Manali, far enough to wake up to orchards and quiet." },
  { q: "Is breakfast included?", a: "Yes, breakfast is part of your stay across both the wooden chalets and stone cottages." },
  { q: "How do I get there from the airport?", a: "Fly into Bhuntar (Kullu), about 50 km away, and we'll help arrange your transfer once your dates are confirmed." },
  { q: "Can I book both Shanag and the Badgran flagship?", a: "Absolutely — many guests split their trip between the two homes. Mention it when you reach out and we'll help plan the dates." },
  { q: "Is the property good for families?", a: "Yes — the orchard lawns give kids room to run, and cottages comfortably fit families. Ask about connecting rooms when you book." },
];
const whatsapp = [
  { l: "+91 62306 45166", r: "916230645166" },
  { l: "+91 91388 81116", r: "919138881116" },
  { l: "+91 99999 75545", r: "919999975545" },
];

/* ── Reveal (reduced-motion aware) ── */
function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
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

/* ── Sibling-property spotlight — light editorial split layout, replaces
     the old dark tilt-card. Image on one side, refined content on the
     other, matching the new accent-font decoration used elsewhere. ── */
function OtherPropertyCard() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="grid md:grid-cols-2 rounded-[26px] overflow-hidden"
      style={{ background: "#fffdf8", boxShadow: "0 40px 80px -35px rgba(43,27,17,0.4)", border: "1px solid rgba(36,48,40,0.08)" }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="group relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80" alt="Persimmon Farmstead"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,34,24,0.15) 0%, transparent 40%)" }} />
      </div>

      <div className="flex flex-col justify-center p-8 md:p-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
          <p className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Badgran (14 Mile) · Manali</p>
        </div>
        <h3 className="italic leading-tight mb-1" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2rem,3.4vw,2.6rem)", color: "var(--color-ink)" }}>
          Persimmon Farmstead
        </h3>
        <div className="flex items-center gap-2.5 mb-5" aria-hidden>
          <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: ACCENT, opacity: 0.7 }} />
          <span className="h-px w-14" style={{ background: "linear-gradient(to right, rgba(194,105,28,0.6), transparent)" }} />
        </div>
        <p className="font-body text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(26,34,24,0.6)" }}>
          Our flagship boutique hotel, a minute off the highway with mountain views from every room.
        </p>
        <Link href="/stays/farmstead"
          className="group inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3.5 w-fit transition-transform duration-300 hover:scale-[1.03]"
          style={{ background: ACCENT, color: "#fff", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(194,105,28,0.6)" }}>
          View Property
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </motion.div>
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
    <motion.div className="group" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      <div className={`relative overflow-hidden transition-[border-radius] duration-[3000ms] ease-in-out ${PHOTO_SHAPES[index % PHOTO_SHAPES.length]}`}
        style={{ aspectRatio: "4/5", boxShadow: "0 50px 100px -48px rgba(43,27,17,0.48)" }}>
        <AnimatePresence mode="sync">
          {images.map((src, i) => i === index && (
            <motion.img key={src} src={src} alt={`${alt} — photo ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }} />
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

/* ── Icon per amenity ── */
function AmenityIcon({ name }: { name: string }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "Wooden chalets":
      return <svg {...p}><path d="M3 12 12 4l9 8" /><path d="M5 12v8h14v-8" /><path d="M10 20v-5h4v5" /></svg>;
    case "Stone cottages":
      return <svg {...p}><path d="M4 21V10l8-6 8 6v11" /><path d="M4 21h16" /><path d="M9 21v-6h6v6" /></svg>;
    case "Orchard lawns":
      return <svg {...p}><path d="M12 2c3 2 4 5 4 7a4 4 0 0 1-8 0c0-2 1-5 4-7z" /><path d="M12 13v9" /></svg>;
    case "Near Old Manali":
      return <svg {...p}><path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "Apple trees":
      return <svg {...p}><circle cx="12" cy="10" r="6" /><path d="M12 16v6" /><path d="M12 4c0-1 1-2 2-2" /></svg>;
    case "Snow peak views":
      return <svg {...p}><path d="M2 19l6-10 4 6 3-4 7 8H2z" /><path d="M8 9l1.5 2.4L11 9" /></svg>;
    default:
      return <span className="block w-3 h-3 rotate-45" style={{ background: "currentColor", opacity: 0.9 }} />;
  }
}

/* ── Split-screen feature list — sticky title left, editorial rows right ── */
function AmenityRowList({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
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
          <AmenityRow key={text} text={text} index={i} first={i === 0} />
        ))}
      </div>
    </div>
  );
}

function AmenityRow({ text, index, first }: { text: string; index: number; first: boolean }) {
  const reduce = useReducedMotion();
  const tint = "#6b8e5a";
  const tintSoft = "rgba(107,142,90,0.11)";
  const desc = AMENITY_COPY[text] ?? "One of the details guests notice on arrival.";
  const baseDelay = Math.min(index * 0.07, 0.35);
  return (
    <motion.div
      className="group relative overflow-hidden px-2 md:px-6 py-8 md:py-11 transition-colors duration-700"
      style={{ borderTop: first ? "1px solid rgba(36,48,40,0.1)" : "none", borderBottom: "1px solid rgba(36,48,40,0.1)" }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4, margin: "-60px" }}
      transition={{ duration: 0.75, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "#faf6ee" }} />

      {/* watermark numeral — scales/fades in behind the row, brightens slightly on hover */}
      <motion.span
        aria-hidden
        className="absolute select-none pointer-events-none font-display transition-colors duration-700 group-hover:text-[rgba(107,142,90,0.1)]"
        style={{ right: "0.25rem", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(4rem,9vw,7rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "rgba(36,48,40,0.04)" }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4, margin: "-60px" }}
        transition={{ duration: 0.8, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <div className="relative z-10 flex items-start gap-5 md:gap-7 transition-transform duration-700 ease-out group-hover:translate-x-3">
        <motion.span aria-hidden
          className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
          style={{ background: tintSoft, color: tint }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4, margin: "-60px" }}
          transition={{ duration: 0.6, delay: baseDelay + 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <AmenityIcon name={text} />
        </motion.span>
        <div className="flex flex-col gap-1.5 md:gap-2 pt-1.5 md:pt-2">
          <motion.h3
            className="font-display leading-tight" style={{ fontSize: "clamp(1.35rem,2.6vw,1.85rem)", color: "var(--color-ink)" }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4, margin: "-60px" }}
            transition={{ duration: 0.6, delay: baseDelay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.h3>
          <motion.p
            className="font-body leading-relaxed max-w-lg" style={{ fontSize: "14.5px", color: "rgba(26,34,24,0.55)" }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4, margin: "-60px" }}
            transition={{ duration: 0.6, delay: baseDelay + 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {desc}
          </motion.p>
        </div>
      </div>

      {/* bottom accent line, grows on hover */}
      <div className="absolute bottom-0 left-2 right-2 md:left-6 md:right-6 h-px overflow-hidden">
        <div className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: tint }} />
      </div>
    </motion.div>
  );
}

/* ── Editorial dark gallery — clip-path wipe, 3D tilt, queued thumbnails ── */
function EditorialGallery({ images, name, location }: { images: string[]; name: string; location: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const TRANSITION_MS = 1400;
  const captions = property.amenities;

  const goTo = (nextI: number) => {
    if (nextI === index || images.length <= 1) return;
    setPrevIndex(index);
    setIndex(nextI);
    window.setTimeout(() => setPrevIndex((p) => (p === index ? null : p)), TRANSITION_MS);
  };
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
  const desc = AMENITY_COPY[title] ?? "";

  const canvas = (
    <div ref={canvasRef} onPointerMove={handleMove} onPointerLeave={resetTilt}
      className="relative flex-shrink-0 mx-auto"
      style={{ width: "clamp(220px, 100%, 680px)", height: "clamp(280px, 60vh, 560px)", perspective: 1400 }}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", width: "100%", height: "100%" }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }} className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: "inset 0 0 0 1px rgba(36,48,40,0.08), 0 45px 90px -35px rgba(43,27,17,0.45)" }} />
        {images.map((src, i) => {
          const isActive = i === index;
          const isExiting = i === prevIndex;
          const clip = isActive ? "polygon(0 0,100% 0,100% 100%,0 100%)" : isExiting ? "polygon(50% 0,50% 0,50% 100%,50% 100%)" : "polygon(0 50%,100% 50%,100% 50%,0 50%)";
          const scale = isActive ? 1 : isExiting ? 0.92 : 1.18;
          return (
            <img key={src} src={src} alt={`${name} — photo ${i + 1}`} className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: clip, transform: `scale(${scale})`, opacity: isActive || isExiting ? 1 : 0, zIndex: isActive ? 2 : isExiting ? 1 : 0,
                transition: reduce ? "opacity 0.6s ease" : `clip-path ${TRANSITION_MS}ms cubic-bezier(0.83,0,0.17,1), transform ${TRANSITION_MS}ms cubic-bezier(0.22,1,0.36,1), opacity 0.3s`,
              }} />
          );
        })}
      </motion.div>
    </div>
  );

  const MAX_QUEUE = 5;
  const queueOrder = images.length > 1 ? Array.from({ length: Math.min(images.length - 1, MAX_QUEUE) }, (_, i) => (index + 1 + i) % images.length) : [];
  const progressTicks = queueOrder.length > 0 && (
    <div className="flex md:flex-col items-center gap-3 md:gap-3.5">
      <AnimatePresence initial={false}>
        {queueOrder.map((imgIdx, pos) => {
          const size = pos === 0 ? 42 : 30;
          const dim = Math.max(1 - pos * 0.18, 0.35);
          return (
            <motion.button key={images[imgIdx]} layout onClick={() => goTo(imgIdx)} aria-label={`Go to photo ${imgIdx + 1}`}
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: dim, scale: 1, width: size, height: size }} exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative flex-shrink-0 overflow-hidden rounded-full transition-shadow duration-500 ease-out"
              style={{ boxShadow: pos === 0 ? `0 0 0 2px ${GOLD}` : "0 0 0 1px rgba(36,48,40,0.16)" }}>
              <img src={images[imgIdx]} alt="" className="w-full h-full object-cover" />
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden">
      <span key={index} aria-hidden className="absolute select-none pointer-events-none font-display"
        style={{ fontSize: "clamp(9rem, 40vw, 30rem)", lineHeight: 1, color: "rgba(36,48,40,0.04)", top: "50%", left: "50%", transform: "translate(-50%,-52%)" }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="hidden md:grid relative z-10 items-center gap-10 lg:gap-16 px-8 lg:px-16"
        style={{ minHeight: "68vh", gridTemplateColumns: "minmax(0,1fr) minmax(200px,280px)" }}>
        {canvas}
        <motion.div key={`meta-${index}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative pl-8">
          <span aria-hidden className="absolute left-0 top-1 bottom-1 w-px" style={{ background: "linear-gradient(to bottom, rgba(212,168,83,0.6), rgba(212,168,83,0))" }} />
          <p className="font-body text-[9px] tracking-[0.34em] uppercase mb-3" style={{ color: ACCENT }}>{name} · {location}</p>
          <p className="font-display italic leading-[1.5]" style={{ fontSize: "clamp(0.95rem,1.1vw,1.15rem)", color: "rgba(26,34,24,0.72)" }}>{desc}</p>
          <div className="mt-9">{progressTicks}</div>
        </motion.div>
      </div>

      <div className="flex md:hidden relative z-10 flex-col items-center px-6 pt-6 pb-8">
        {canvas}
        <motion.div key={`meta-m-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-8 text-center max-w-[300px]">
          <p className="font-body text-[9px] tracking-[0.32em] uppercase mb-3" style={{ color: ACCENT }}>{name} · {location}</p>
          <p className="font-display italic leading-[1.6]" style={{ fontSize: "1rem", color: "rgba(26,34,24,0.68)" }}>{desc}</p>
        </motion.div>
        <div className="mt-8 flex items-center gap-6">{progressTicks}</div>
      </div>
    </div>
  );
}

/* ── FAQ accordion (property-level) ── */
function PropertyFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className="relative" style={{ borderBottom: i === faqs.length - 1 ? "none" : "1px solid rgba(36,48,40,0.1)" }}>
            <span aria-hidden className="absolute -left-5 md:-left-7 top-0 bottom-0 w-px transition-opacity duration-500" style={{ background: ACCENT, opacity: open ? 0.7 : 0 }} />
            <button onClick={() => setOpenIndex(open ? null : i)} className="w-full flex items-start gap-4 md:gap-5 py-6 md:py-7 text-left">
              <span className="font-display italic flex-shrink-0 pt-1" style={{ fontSize: "13px", color: ACCENT, opacity: 0.75, width: "24px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display leading-snug transition-colors duration-300" style={{ fontSize: "clamp(1.05rem,1.6vw,1.3rem)", color: open ? "var(--color-ink)" : "rgba(26,34,24,0.82)" }}>
                {item.q}
              </span>
              <span className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 transition-all duration-300"
                style={{ width: 30, height: 30, border: `1px solid ${ACCENT}66`, background: open ? ACCENT : "transparent", transform: open ? "rotate(135deg)" : "rotate(0deg)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? "#fff" : ACCENT} strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
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

/* ── Cottage card → links to the cottage's dedicated page ── */
/* ── Cover Flow carousel — larger cards, sits directly on the page's own
     light background (no dark stage), and wraps infinitely: past the last
     cottage it loops back to the first, and vice versa, so there's always
     a card filling both sides. ── */
/* ── Small icon for each spec slot (guests / bed / view), matched by
     position rather than exact text since it varies per cottage. ── */
function SpecIcon({ index }: { index: number }) {
  const p = { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (index === 0) return <svg {...p}><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></svg>; // guests
  if (index === 1) return <svg {...p}><path d="M2 17V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" /><path d="M2 12h20" /><path d="M22 17v-3a2 2 0 0 0-2-2h-4" /><path d="M2 17h20" /></svg>; // bed
  return <svg {...p}><path d="M2 19l6-10 4 6 3-4 7 8H2z" /></svg>; // view
}

function CottageCoverFlow({ items }: { items: typeof cottages }) {
  const reduce = useReducedMotion();
  const n = items.length;
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + n) % n);
  const next = () => setActive((a) => (a + 1) % n);

  const CARD_W = "min(78vw, 460px)";
  const CARD_H = "min(104vw, 613px)"; // same 3:4 aspect ratio, scaled up further

  return (
    <div>
      <div className="relative mx-auto" style={{ height: "min(72vh, 640px)", perspective: 1300, WebkitPerspective: 1300 }}>
        {items.map((room, i) => {
          // Shortest cyclic distance so cards approach from whichever side is nearer,
          // which is what makes the wrap-around feel seamless instead of snapping.
          let offset = i - active;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;
          const abs = Math.abs(offset);
          const isActive = offset === 0;

          const baseX = 180 + abs * 60;
          const x = reduce ? offset * 130 : isActive ? 0 : offset < 0 ? -baseX : baseX;
          const rotateY = reduce || isActive ? 0 : offset < 0 ? 50 : -50;
          const scale = Math.max(1 - abs * 0.1, 0.5);
          const z = n - abs;

          return (
            <motion.div
              key={room.slug}
              className="absolute top-1/2 left-1/2"
              style={{
                width: CARD_W, height: CARD_H, marginLeft: `calc(${CARD_W} / -2)`, marginTop: `calc(${CARD_H} / -2)`,
                zIndex: z, transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d",
              }}
              animate={{ x, rotateY, scale, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <div
                onClick={() => !isActive && setActive(i)}
                className="relative w-full h-full rounded-xl overflow-hidden"
                style={{
                  boxShadow: isActive ? "0 30px 60px -20px rgba(43,27,17,0.45)" : "0 20px 40px -20px rgba(43,27,17,0.35)",
                  cursor: isActive ? "default" : "pointer",
                  willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                }}
              >
                {isActive ? (
                  <Link href={`/rooms/${room.slug}`} className="group block relative w-full h-full">
                    <img src={room.img} alt={room.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,19,15,0.9) 0%, rgba(13,19,15,0.1) 55%, transparent 75%)" }} />
                    <div className="absolute top-5 left-5">
                      <span className="font-body text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full"
                        style={{ background: "rgba(247,242,232,0.92)", color: "#8a5328", border: "1px solid rgba(181,112,63,0.28)" }}>
                        {room.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                      <h3 className="italic leading-tight mb-1" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2rem,4.8vw,2.5rem)", letterSpacing: "0.01em", color: "rgba(247,242,232,0.98)", textShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
                        {room.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3.5" aria-hidden>
                        <span className="h-px w-6" style={{ background: "linear-gradient(to right, transparent, rgba(212,168,83,0.8))" }} />
                        <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD }} />
                        <span className="h-px w-6" style={{ background: "linear-gradient(to left, transparent, rgba(212,168,83,0.8))" }} />
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 mb-3">
                        {[room.guests, room.bed, room.view].map((s, sIdx) => (
                          <span key={s} className="flex items-center gap-1.5" style={{ color: "rgba(212,168,83,0.85)" }}>
                            <SpecIcon index={sIdx} />
                            <span className="font-body text-[11.5px] tracking-wide" style={{ color: "rgba(247,242,232,0.68)" }}>{s}</span>
                          </span>
                        ))}
                      </div>
                      <p className="font-body text-[12.5px] leading-[1.65] mb-5 max-w-[85%]" style={{ color: "rgba(247,242,232,0.55)" }}>
                        {room.short}
                      </p>
                      <span className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-[10.5px] tracking-[0.12em] uppercase transition-transform duration-300 group-hover:translate-x-1"
                        style={{ background: ACCENT, color: "#fff" }}>
                        Explore this cottage
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </span>
                    </div>
                  </Link>
                ) : (
                  <img src={room.img} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prev / Next — thin gold-ring arrow buttons, matching the site's other carousel controls */}
      <div className="flex items-center justify-center gap-6 mt-9">
        <button onClick={prev} aria-label="Previous cottage"
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
          style={{ border: `1px solid rgba(194,105,28,0.35)`, color: ACCENT }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <div className="text-center min-w-[160px]">
          <p className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "19px", color: "var(--color-ink)" }}>{items[active].name}</p>
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {items.map((_, i) => (
              <span key={i} className="rounded-full transition-all duration-300"
                style={{ width: i === active ? 16 : 5, height: 5, background: i === active ? ACCENT : "rgba(36,48,40,0.18)" }} />
            ))}
          </div>
        </div>

        <button onClick={next} aria-label="Next cottage"
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
          style={{ border: `1px solid rgba(194,105,28,0.35)`, color: ACCENT }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function ShanagPage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);

  const heroImages = property.gallery;
  const HERO_INTERVAL = 6200;
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (reduce || heroImages.length <= 1) return;
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), HERO_INTERVAL);
    return () => clearInterval(id);
  }, [reduce, heroImages.length]);

  return (
    <>
      <Navbar />

      {/* ══ HERO — cinematic full-bleed carousel, content overlaid ══ */}
      <section ref={heroRef} className="relative w-full overflow-hidden" style={{ minHeight: "94vh", display: "flex", alignItems: "flex-end" }}>
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            {heroImages.map((src, i) => i === heroIndex && (
              <motion.img key={src} src={src} alt={`${property.name} — photo ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover" style={{ y: imgY }}
                initial={{ opacity: 0, scale: reduce ? 1.04 : 1.02 }}
                animate={{ opacity: 1, scale: reduce ? 1.04 : 1.16 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.8, ease: [0.22, 1, 0.36, 1] }, scale: { duration: (HERO_INTERVAL / 1000) + 1.8, ease: "linear" } }} />
            ))}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,14,10,0.22) 0%, rgba(8,14,10,0.06) 30%, rgba(8,14,10,0.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,14,10,0.4) 0%, transparent 55%)" }} />

        {heroImages.length > 1 && (
          <div className="absolute z-20 bottom-0 left-0 right-0 flex h-[2.5px]">
            {heroImages.map((_, i) => (
              <button key={i} aria-label={`Go to photo ${i + 1}`} onClick={() => setHeroIndex(i)}
                className="flex-1 mx-px transition-colors duration-500"
                style={{ background: i === heroIndex ? "#d4a853" : "rgba(247,242,232,0.28)" }} />
            ))}
          </div>
        )}

        {/* Breadcrumb */}
        {/* <div className="absolute top-28 md:top-32 left-5 md:left-12 flex items-center gap-2 z-10">
          {["Home", "/", "Our Stays", "/", "Farmstead Shanag"].map((s, i) => (
            <span key={i} className="font-body text-[10px]" style={{ color: s === "Farmstead Shanag" ? "rgba(212,168,83,0.7)" : "rgba(247,242,232,0.3)" }}>
              {s === "/" ? <span style={{ color: "rgba(247,242,232,0.15)" }}>/</span> : s}
            </span>
          ))}
        </div> */}

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-12 pb-16 md:pb-24 pt-40">
          <div className="max-w-4xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6">
                <PinIcon />
                <span className="font-body text-[10px] md:text-[11px] tracking-[0.28em] uppercase" style={{ color: "rgba(247,242,232,0.65)" }}>
                  {property.location}
                </span>
                <span className="w-1 h-1 rounded-full" style={{ background: "rgba(212,168,83,0.7)" }} />
                <span className="font-body text-[10px] md:text-[11px] tracking-[0.28em] uppercase" style={{ color: "#f5d98a" }}>
                  {property.tag}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="font-display italic leading-[1.02] mb-6" style={{ fontSize: "clamp(2.8rem,7.5vw,5.6rem)", letterSpacing: "-0.03em", color: "rgba(247,242,232,0.98)", textShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
                {property.name}
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="font-body text-[15px] md:text-[17px] leading-[1.75] mb-8 max-w-xl" style={{ color: "rgba(247,242,232,0.78)" }}>
                {property.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-10 pb-10" style={{ borderBottom: "1px solid rgba(247,242,232,0.16)" }}>
                <div className="flex items-center gap-1.5">
                  <Stars />
                  <span className="font-body text-[12px] ml-1" style={{ color: "rgba(247,242,232,0.62)" }}>{property.rating} · {property.reviews} reviews</span>
                </div>
                <span className="hidden sm:block w-px h-3.5" style={{ background: "rgba(247,242,232,0.22)" }} />
                {["Wooden chalets", "Orchard lawns", "Near Old Manali"].map((a, i) => (
                  <span key={a} className="flex items-center gap-2.5">
                    {i > 0 && <span className="w-px h-3.5" style={{ background: "rgba(247,242,232,0.22)" }} />}
                    <span className="font-body text-[13px]" style={{ color: "rgba(247,242,232,0.85)" }}>{a}</span>
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact#form"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 font-body text-[13px] tracking-wide transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: ACCENT, color: "#fff", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(194,105,28,0.6)" }}>
                  Check Dates <Arrow size={14} />
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

      {/* ══ ABOUT — quiet editorial chapter: tinted panel, asymmetric grid, framed print, pull-quote ══ */}
      <section className="relative w-full overflow-hidden py-20 md:py-32 px-5 md:px-12" style={{ background: "#f2ecdc", borderTop: "1px solid rgba(36,48,40,0.07)", borderBottom: "1px solid rgba(36,48,40,0.07)" }}>
        <span aria-hidden className="hidden md:block absolute select-none pointer-events-none font-display italic"
          style={{ top: "-2.5rem", right: "2rem", fontSize: "16rem", lineHeight: 1, color: "rgba(36,48,40,0.045)" }}>01</span>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <div className="flex items-center gap-3.5 mb-6">
                    <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
                    <p className="font-body text-[10px] md:text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>About this property</p>
                  </div>
                  <h2 className="font-display italic leading-[1.08] mb-4" style={{ fontSize: "clamp(2.3rem,8vw,2.9rem)", color: "var(--color-ink)", letterSpacing: "-0.015em" }}>
                    Chalets and cottages on orchard lawns.
                  </h2>
                  <span className="block h-px mb-10 md:mb-9" style={{ width: "56px", background: "linear-gradient(to right, rgba(212,168,83,0.8), rgba(212,168,83,0))" }} />
                </Reveal>
                <Reveal delay={0.08}>
                  <FramedPhoto images={property.gallery} alt={property.name} caption={`${property.name} · ${property.location}`} />
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 pt-1 lg:pt-3 relative pl-6 md:pl-8">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-px" style={{ background: "linear-gradient(to bottom, rgba(212,168,83,0.6), rgba(212,168,83,0.04))" }} />
              {property.body.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="font-body mb-6 max-w-[60ch]" style={{ fontSize: i === 0 ? "clamp(1rem,0.55vw + 0.85rem,1.1rem)" : "clamp(0.94rem,0.4vw + 0.85rem,1.03rem)", lineHeight: 1.95, letterSpacing: "0.005em", color: i === 0 ? "rgba(26,34,24,0.78)" : "rgba(26,34,24,0.68)" }}>
                    {i === 0 && (
                      <span className="font-display italic float-left mr-3 mt-1" style={{ fontSize: "3.6rem", lineHeight: "0.75", color: ACCENT }}>
                        {para.charAt(0)}
                      </span>
                    )}
                    {i === 0 ? para.slice(1) : para}
                  </p>
                  {i < property.body.length - 1 && (
                    <div aria-hidden className="flex items-center gap-3 mb-6" style={{ maxWidth: "60ch" }}>
                      <span className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(212,168,83,0.5), transparent)" }} />
                      <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: ACCENT, opacity: 0.6 }} />
                      <span className="h-px flex-1" style={{ background: "linear-gradient(to left, rgba(212,168,83,0.5), transparent)" }} />
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.12}>
            <div className="max-w-2xl mx-auto text-center mt-16 md:mt-24">
              <span className="block w-9 h-px mx-auto mb-8" style={{ background: ACCENT, opacity: 0.6 }} />
              <p className="font-display italic leading-[1.5]" style={{ fontSize: "clamp(1.4rem,2.6vw,2rem)", color: "var(--color-ink)", opacity: 0.82 }}>
                {property.tagline}
              </p>
              <span className="block w-9 h-px mx-auto mt-8" style={{ background: ACCENT, opacity: 0.6 }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ COTTAGES — four room types, each with its own dedicated page ══ */}
      <section className="relative w-full overflow-hidden" style={{ background: "var(--color-cream-soft)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <Reveal>
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
                <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>The cottages</p>
              </div>
              <h2 className="font-display italic leading-tight mb-3" style={{ fontSize: "clamp(1.9rem,4.2vw,3.4rem)", color: "var(--color-ink)", letterSpacing: "-0.025em" }}>
                Where you&apos;ll stay.
              </h2>
              <p className="font-body text-sm md:text-base max-w-md" style={{ color: "rgba(26,34,24,0.5)", lineHeight: 1.8 }}>
                Four cottages on the orchard lawns, each a little different. Tap any one for the full picture.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mb-10 md:mb-14 mt-2" style={{ height: "1.5px", background: "rgba(36,48,40,0.07)" }}>
              <motion.div className="h-full" style={{ background: `linear-gradient(to right, ${ACCENT}, transparent)` }}
                initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: true }} />
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <CottageCoverFlow items={cottages} />
          </Reveal>
        </div>
      </section>

      {/* ══ AMENITIES — split-screen editorial row list ══ */}
      <section className="relative w-full px-5 md:px-12 pb-14 md:pb-20 pt-16" style={{ borderTop: "1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <AmenityRowList eyebrow="What's included" title="What's here" items={property.amenities} />
          </Reveal>
        </div>
      </section>

      {/* ══ GALLERY — immersive editorial showcase ══ */}
      <section className="relative w-full px-3 md:px-8 pb-16 md:pb-24">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6 px-2 md:px-4 ">
              <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
              <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>The grounds</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <EditorialGallery images={property.gallery} name={property.name} location={property.location} />
          </Reveal>
        </div>
      </section>

      {/* ══ MAP ══ */}
      <section style={{ background: "var(--color-cream)", borderTop: "1px solid rgba(36,48,40,0.08)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
                <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>Find us</p>
              </div>
              <h2 className="italic leading-tight mb-2" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.1rem,4.2vw,3.1rem)", color: "var(--color-ink)" }}>
                {property.location}
              </h2>
              <div className="flex items-center gap-2.5 mb-5" aria-hidden>
                <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: ACCENT, opacity: 0.7 }} />
                <span className="h-px w-14" style={{ background: "linear-gradient(to right, rgba(194,105,28,0.6), transparent)" }} />
              </div>
              <p className="font-body text-sm leading-relaxed max-w-sm mb-8" style={{ color: "rgba(26,34,24,0.6)" }}>
                4–5 km north of Manali, above Old Manali near Bahang. Fly into Bhuntar (Kullu) and we&apos;ll help arrange your transfer once your dates are confirmed.
              </p>

              <div className="rounded-2xl overflow-hidden mb-7" style={{ background: "#fffdf8", border: "1px solid rgba(36,48,40,0.08)", boxShadow: "0 24px 50px -32px rgba(43,27,17,0.35)" }}>
                {[
                  { place: "Old Manali cafes & Mall Road", dist: "2 km" },
                  { place: "Manali Bus Stand", dist: "5 km" },
                  { place: "Bhuntar (Kullu) Airport", dist: "50 km" },
                ].map((d, i, arr) => (
                  <div key={d.place} className="group relative flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-500" style={{ borderBottom: i === arr.length - 1 ? "none" : "1px solid rgba(36,48,40,0.06)" }}>
                    <span aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(194,105,28,0.06)" }} />
                    <span className="relative font-body text-sm" style={{ color: "rgba(26,34,24,0.72)" }}>{d.place}</span>
                    <span className="relative italic flex-shrink-0" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "15px", color: ACCENT }}>{d.dist}</span>
                  </div>
                ))}
              </div>

              
              <a href="https://www.google.com/maps/place/Persimmon+farmstead+shanag/@32.2855603,77.1741389,17z/data=!4m9!3m8!1s0x390487d8ca344499:0xfa94767797d92743!5m2!4m1!1i2!8m2!3d32.2855603!4d77.1741389!16s%2Fg%2F11mllkrp9w"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3.5 transition-transform duration-300 hover:scale-[1.03]"
                style={{ border: `1px solid rgba(194,105,28,0.4)`, color: ACCENT }}
              >
                Get Directions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12} y={40}>
            <div className="relative rounded-[22px] overflow-hidden" style={{ background: "#fffdf8", boxShadow: "0 40px 80px -30px rgba(43,27,17,0.4)" }}>
              <div className="relative p-2.5 md:p-3 pb-0">
                <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden">
                  <iframe
                    title={`${property.name} location map`}
                    src={property.mapEmbed}
                    className="w-full h-full border-0"
                    style={{ filter: "grayscale(0.3) sepia(0.15) saturate(0.85) contrast(1.05) brightness(1.02)" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div aria-hidden className="absolute inset-2 rounded-xl pointer-events-none" style={{ border: "1px solid rgba(212,168,83,0.55)" }} />
                  <div className="absolute top-6 left-6">
                    <span className="font-body text-[9px] tracking-[0.2em] uppercase px-3.5 py-2 rounded-full"
                      style={{ background: "rgba(247,242,232,0.94)", color: "#8a5328", border: "1px solid rgba(181,112,63,0.28)", boxShadow: "0 8px 20px -8px rgba(43,27,17,0.3)" }}>
                      {property.location}
                    </span>
                  </div>
                  <span aria-hidden className="absolute top-4 right-4 w-6 h-6 pointer-events-none" style={{ borderTop: `1px solid ${ACCENT}`, borderRight: `1px solid ${ACCENT}`, opacity: 0.75 }} />
                  <span aria-hidden className="absolute bottom-4 left-4 w-6 h-6 pointer-events-none" style={{ borderBottom: `1px solid ${ACCENT}`, borderLeft: `1px solid ${ACCENT}`, opacity: 0.75 }} />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-6 md:px-7 py-5 mt-2.5">
                <div>
                  <p className="font-body text-[9px] tracking-[0.24em] uppercase mb-1" style={{ color: "rgba(26,34,24,0.4)" }}>Coordinates</p>
                  <p className="italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "15px", color: "var(--color-ink)" }}>32.2856° N, 77.1741° E</p>
                </div>
                
                  <a href="https://www.google.com/maps/place/Persimmon+farmstead+shanag/@32.2855603,77.1741389,17z/data=!4m9!3m8!1s0x390487d8ca344499:0xfa94767797d92743!5m2!4m1!1i2!8m2!3d32.2855603!4d77.1741389!16s%2Fg%2F11mllkrp9w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 flex-shrink-0 rounded-full px-5 py-2.5 font-body text-[11px] tracking-[0.1em] uppercase transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: ACCENT, color: "#fff", fontWeight: 500 }}
                >
                  Open in Maps
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M7 17 17 7M7 7h10v10" /></svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="relative w-full overflow-hidden px-5 md:px-12 py-16 md:py-24" style={{ background: "#f5ebdd", borderTop: "1px solid rgba(36,48,40,0.08)" }}>
        <span aria-hidden className="hidden md:block absolute select-none pointer-events-none font-display italic"
          style={{ top: "-3.5rem", left: "1rem", fontSize: "18rem", lineHeight: 1, color: "rgba(36,48,40,0.04)" }}>?</span>
        <div className="relative max-w-3xl mx-auto mb-10 md:mb-14">
          <Reveal>
            <div className="mb-9">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
                <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>Before you book</p>
              </div>
              <h2 className="font-display leading-tight" style={{ fontSize: "clamp(1.8rem,3.6vw,2.8rem)", color: "var(--color-ink)", letterSpacing: "-0.015em" }}>
                Questions about Shanag
              </h2>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.06}>
          <PropertyFAQ faqs={propertyFaqs} />
        </Reveal>
      </section>

      {/* ══ CTA band — cinematic close, framed like an engraved invitation ══ */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={property.gallery[1] ?? property.gallery[0]} alt="" aria-hidden="true"
            className="w-full h-full object-cover" style={{ filter: "brightness(0.48) saturate(1.05)" }} />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(8,14,10,0.8) 0%, rgba(8,14,10,0.66) 55%, rgba(8,14,10,0.84) 100%)" }} />
        <span aria-hidden className="hidden md:block absolute select-none pointer-events-none font-display italic"
          style={{ top: "-4rem", left: "50%", transform: "translateX(-50%)", fontSize: "20rem", lineHeight: 1, color: "rgba(247,242,232,0.035)" }}>&rdquo;</span>

        <div className="relative max-w-2xl mx-auto px-6 py-24 md:py-36">
          <Reveal>
            <div className="relative text-center px-8 py-14 md:px-16 md:py-20" style={{ border: "1px solid rgba(247,242,232,0.16)" }}>
              <span aria-hidden className="absolute top-4 left-4 w-6 h-6" style={{ borderTop: "1px solid rgba(212,168,83,0.7)", borderLeft: "1px solid rgba(212,168,83,0.7)" }} />
              <span aria-hidden className="absolute bottom-4 right-4 w-6 h-6" style={{ borderBottom: "1px solid rgba(212,168,83,0.7)", borderRight: "1px solid rgba(212,168,83,0.7)" }} />

              <div className="flex items-center justify-center gap-3 mb-7">
                <span className="h-px w-8" style={{ background: "rgba(212,168,83,0.6)" }} />
                <p className="font-body text-[9px] tracking-[0.44em] uppercase" style={{ color: "#f5d98a" }}>Plan your stay</p>
                <span className="h-px w-8" style={{ background: "rgba(212,168,83,0.6)" }} />
              </div>
              <h2 className="font-display italic mb-6 leading-[1.05]" style={{ fontSize: "clamp(2.3rem,5.2vw,3.8rem)", color: "rgba(247,242,232,0.98)", letterSpacing: "-0.02em", textShadow: "0 6px 30px rgba(0,0,0,0.4)" }}>
                Come stay at Shanag.
              </h2>
              <p className="font-body text-[14.5px] md:text-base mb-10 max-w-md mx-auto" style={{ color: "rgba(247,242,232,0.68)", lineHeight: 1.9 }}>
                You send a request, a real host confirms it by WhatsApp — usually within a few hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <Link href="/contact#form"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 font-body text-[13px] tracking-wide transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: ACCENT, color: "#fff", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(194,105,28,0.6)" }}>
                  Check Availability <Arrow size={14} />
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                {whatsapp.map((p) => (
                  <Link key={p.r} href={`https://wa.me/${p.r}`} target="_blank"
                    className="inline-flex items-center justify-center gap-2 font-body text-[11px] tracking-wide rounded-full px-5 py-2.5 transition-all duration-300"
                    style={{ border: "1px solid rgba(247,242,232,0.25)", color: "rgba(247,242,232,0.6)" }}>
                    {p.l}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ OTHER PROPERTY ══ */}
      <section style={{ background: "rgba(36,48,40,0.03)", borderTop: "1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-12 md:py-20">
          <Reveal>
            <p className="font-body text-[9px] tracking-[0.38em] uppercase mb-6" style={{ color: ACCENT }}>The other home</p>
            <OtherPropertyCard />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}