"use client";

import { useRef, useState } from "react";
import {
  motion, useScroll, useTransform, useInView, AnimatePresence,
  useMotionValue, useSpring, useReducedMotion, useMotionValueEvent,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rooms as allRooms } from "@/lib/rooms";
const rooms = allRooms.filter((r) => r.property === "farmstead");

/* ── Data ── */
const amenities = [
  "In-house restaurant & farm kitchen","Bonfire & garden","Free parking",
  "Travel desk & Volvo booking","Car & two-wheeler rental","Pet friendly",
  "Doctor on call","Free Wi-Fi","Room service & housekeeping","24×7 hot water",
];
const AMENITY_COPY: Record<string, string> = {
  "In-house restaurant & farm kitchen": "Everything cooked in-house, the way a family cooks for its own table.",
  "Bonfire & garden": "Evenings by the fire, right there on the lawn.",
  "Free parking": "Pull in and leave the car right there.",
  "Travel desk & Volvo booking": "We'll help book your Volvo tickets and plan the route up.",
  "Car & two-wheeler rental": "Rent a car or scooter straight from the property.",
  "Pet friendly": "Dogs welcome, with plenty of lawn to run on.",
  "Doctor on call": "A doctor is a phone call away if you ever need one.",
  "Free Wi-Fi": "Fast enough for calls, streaming, and quiet work.",
  "Room service & housekeeping": "A knock at the door, not a walk downstairs.",
  "24×7 hot water": "Round-the-clock hot showers, whatever the hour.",
};
function AmenityIconFarmstead({ name }: { name: string }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "In-house restaurant & farm kitchen":
      return <svg {...p}><path d="M7 2v6a2 2 0 0 1-4 0V2" /><path d="M5 8v14" /><path d="M17 2c-2 0-3 2-3 6 0 2 1 3 3 3v11" /></svg>;
    case "Bonfire & garden":
      return <svg {...p}><path d="M12 21a6 6 0 0 0 6-6c0-3-2-4-3-7 0 2-1 3-2 3-1-2 0-4-1-6-2 3-4 5-4 10a6 6 0 0 0 4 6z" /></svg>;
    case "Free parking":
      return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 8h3.5a2.5 2.5 0 0 1 0 5H9V8z" /><path d="M9 13v3" /></svg>;
    case "Travel desk & Volvo booking":
      return <svg {...p}><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M10 6v12" strokeDasharray="2 3" /></svg>;
    case "Car & two-wheeler rental":
      return <svg {...p}><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" /><rect x="3" y="11" width="18" height="6" rx="2" /><circle cx="7.5" cy="17" r="1.5" /><circle cx="16.5" cy="17" r="1.5" /></svg>;
    case "Pet friendly":
      return <svg {...p}><circle cx="12" cy="16" r="3" /><circle cx="6" cy="10" r="1.6" /><circle cx="10" cy="6" r="1.6" /><circle cx="14" cy="6" r="1.6" /><circle cx="18" cy="10" r="1.6" /></svg>;
    case "Doctor on call":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>;
    case "Free Wi-Fi":
      return <svg {...p}><path d="M2 8.5a16 16 0 0 1 20 0" /><path d="M5 12a11 11 0 0 1 14 0" /><path d="M8.5 15.5a6 6 0 0 1 7 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></svg>;
    case "Room service & housekeeping":
      return <svg {...p}><path d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M2 20h20" /><path d="M10 4a2 2 0 0 1 4 0" /></svg>;
    case "24×7 hot water":
      return <svg {...p}><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" /></svg>;
    default:
      return <span className="block w-3 h-3 rotate-45" style={{ background: "currentColor", opacity: 0.9 }} />;
  }
}
const distances = [
  { place: "Kullu–Manali highway turn", note: "one-minute detour", dist: "0.1 km" },
  { place: "Manali Mall Road", note: "", dist: "14 km" },
  { place: "Kullu (Bhuntar) Airport", note: "", dist: "35 km" },
  { place: "Naggar Castle", note: "day trip", dist: "8 km" },
  { place: "Solang Valley", note: "", dist: "22 km" },
];

/* ── Split-screen editorial row list — sticky title left, full-width rows
     right, giant watermark numeral per row, hover slide-in from right.
     Same mechanic as "The details" on the room pages. ── */
function AmenityRowListFarmstead({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return (
    <div className="grid md:grid-cols-12 gap-10 lg:gap-16">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-28">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10" style={{ background: "var(--color-terracotta)", opacity: 0.7 }} />
            <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: "var(--color-terracotta-dark)" }}>{eyebrow}</p>
          </div>
          <h2 className="font-display leading-[0.95]" style={{ fontSize: "clamp(2.6rem,6vw,4.4rem)", color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
            {title}
          </h2>
        </div>
      </div>
      <div className="md:col-span-8">
        {items.map((text, i) => (
          <AmenityRowFarmstead key={text} text={text} index={i} first={i === 0} />
        ))}
      </div>
    </div>
  );
}

function AmenityRowFarmstead({ text, index, first }: { text: string; index: number; first: boolean }) {
  const reduce = useReducedMotion();
  const tint = "#b5703f";
  const tintSoft = "rgba(212,168,83,0.12)";
  const desc = AMENITY_COPY[text] ?? "One of the details guests notice on arrival.";
  const baseDelay = Math.min(index * 0.06, 0.35);
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
      <span aria-hidden className="absolute select-none pointer-events-none font-display transition-colors duration-700"
        style={{ right: "0.25rem", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(4rem,9vw,7rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "rgba(36,48,40,0.04)" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative z-10 flex items-start gap-5 md:gap-7 transition-transform duration-700 ease-out group-hover:translate-x-3">
        <motion.span aria-hidden
          className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
          style={{ background: tintSoft, color: tint }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4, margin: "-60px" }}
          transition={{ duration: 0.6, delay: baseDelay + 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <AmenityIconFarmstead name={text} />
        </motion.span>
        <div className="flex flex-col gap-1.5 md:gap-2 pt-1.5 md:pt-2">
          <h3 className="font-display leading-tight" style={{ fontSize: "clamp(1.35rem,2.6vw,1.85rem)", color: "var(--color-ink)" }}>{text}</h3>
          <p className="font-body leading-relaxed max-w-lg" style={{ fontSize: "14.5px", color: "rgba(26,34,24,0.55)" }}>{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

type Chapter = { n: string; kicker: string; title: string; body: string; meta: string; img: string; label: string };
const chapters: Chapter[] = [
  { n: "01", kicker: "The Beginning", title: "Two friends.",
    body: "Persimmon began with two friends from very different corporate worlds — the kind of jobs measured in flights and slide decks. The lockdowns handed them an unfamiliar stillness, and when the roads reopened they drove up to Manali and simply never left.",
    meta: "2021 · Where it started",
    img: "/images/farmstead/badagran/gallery-1.webp", label: "The Farmhouse" },
  { n: "02", kicker: "The Valley", title: "People who\nwalked away.",
    body: "All through the Kullu valley they kept meeting people who had quietly left the city — baristas who used to be bankers, orchard owners who used to be engineers. Over a couple of pegs of Himalayan-brewed whisky one cold night, the two decided to become settlers too.",
    meta: "Kullu Valley · A decision",
    img: "/images/farmstead/badagran/gallery-2.webp", label: "The Valley" },
  { n: "03", kicker: "The Kitchen", title: "The kitchen,\nfirst of all.",
    body: "What they knew, more than hospitality, was food — so the first thing they got right wasn't the rooms, it was the kitchen. Everything is cooked in-house the way a family cooks for its own table. Guests still message weeks later asking for a recipe.",
    meta: "In-house · Every meal",
    img: "/images/farmstead/badagran/gallery-3.webp", label: "The Kitchen Table" },
  { n: "04", kicker: "The Land", title: "Angled to\nthe first light.",
    body: "The land does the heavy lifting. Rooms are angled to catch the first sun, so in winter you wake up warm and lit with the ranges filling your window. Outside: apple and persimmon trees, and a kitchen garden the cooks raid every morning.",
    meta: "Orchard · Kitchen garden",
    img: "/images/farmstead/badagran/gallery-4.webp", label: "Where You Sleep" },
  { n: "05", kicker: "Today", title: "One home\nbecame two.",
    body: "When the Farmstead filled up, the family opened a second home at Shanag near Old Manali — the same kitchen, the same welcome. That is the whole story, really: a family that left one life for a quieter one, and now spends its days making sure yours is worth the drive up.",
    meta: "Two homes · One family",
    img: "/images/farmstead/badagran/gallery-5.webp", label: "Shanag" },
];
const faqs = [
  { q:"Where is Persimmon Farmstead located?", a:"The original Farmstead is at 14 Mile in Badgran, about 14 km before Manali town — a quiet setting just a minute off the main highway." },
  { q:"Is it pet friendly?", a:"Yes. Both Persimmon homes welcome pets. The orchard lawns are especially good for dogs, with space to roam. Let us know when requesting dates." },
  { q:"What is Persimmon known for?", a:"The food and the hosts. Guests consistently rate Persimmon among the best places to eat in the Manali area — everything is cooked in-house in a small farm kitchen." },
  { q:"How do I book?", a:"You send a request, a real host confirms it by WhatsApp — usually within a few hours." },
  { q:"How far from Mall Road?", a:"The Farmstead at Badgran is about 14 km south of Mall Road — a quiet, offbeat setting just a minute off the main highway." },
  { q:"Nearest airport?", a:"Kullu–Manali Airport at Bhuntar, roughly 35 km away. Our travel desk can arrange pickup." },
];

/* ── Reveal (reduced-motion aware) ── */
function Reveal({ children, delay=0, y=24 }: { children:React.ReactNode; delay?:number; y?:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount:0.15, once:true });
  const reduce = useReducedMotion();
  return (
    <motion.div ref={ref}
      initial={reduce ? { opacity:0 } : { opacity:0, y }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay, duration:0.7, ease:[0.22,1,0.36,1] }}>
      {children}
    </motion.div>
  );
}

/* ── Top scroll-progress bar ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
      style={{ scaleX, background: "linear-gradient(to right, #d4a853, #b5703f)" }}
      aria-hidden
    />
  );
}

/* ── Big outlined word that drifts on scroll (section depth) ── */
function ParallaxGhost({ text, align = "right", tone = "dark" }: { text: string; align?: "left" | "right"; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduce = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -90]);
  const stroke = tone === "light" ? "rgba(247,242,232,0.06)" : "rgba(36,48,40,0.05)";
  return (
    <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.span
        className="font-display italic select-none absolute whitespace-nowrap"
        style={{
          y,
          top: "4%",
          right: align === "right" ? "-2%" : undefined,
          left: align === "left" ? "-2%" : undefined,
          fontSize: "clamp(90px, 16vw, 260px)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: `1px ${stroke}`,
          lineHeight: 1,
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

function FAQ({ faq, index, isLast }: { faq:typeof faqs[0]; index: number; isLast: boolean }) {
  const [open,setOpen] = useState(false);
  const gold = "#d4a853";
  return (
    <div className="relative" style={{ borderBottom: isLast ? "none" : "1px solid rgba(36,48,40,0.08)" }}>
      <span aria-hidden className="absolute -left-5 md:-left-7 top-0 bottom-0 w-px transition-opacity duration-500" style={{ background: gold, opacity: open ? 0.8 : 0 }} />
      <button onClick={()=>setOpen(!open)} className="w-full flex items-start gap-4 md:gap-5 py-6 md:py-7 text-left">
        <span className="font-display italic flex-shrink-0 pt-1" style={{ fontSize: "13px", color: "#b5703f", opacity: 0.8, width: "24px" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display italic leading-snug transition-colors duration-300" style={{ fontSize: "clamp(1.05rem,1.6vw,1.3rem)", color: open ? "var(--color-ink)" : "rgba(26,34,24,0.82)", letterSpacing: "-0.01em" }}>
          {faq.q}
        </span>
        <span className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 transition-all duration-300"
          style={{ width: 30, height: 30, border: `1px solid rgba(212,168,83,0.4)`, background: open ? gold : "transparent", transform: open ? "rotate(135deg)" : "rotate(0deg)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? "#1a2218" : "#b5703f"} strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:0.4, ease:[0.22,1,0.36,1] }} style={{ overflow:"hidden" }}>
            <p className="font-body text-sm md:text-base leading-[1.85] pl-[40px] md:pl-[44px] pr-8 pb-7" style={{ color:"rgba(26,34,24,0.55)", maxWidth:"56ch" }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Small icon for each spec slot (guests / bed / view), matched by
     position rather than exact text since it varies per room. ── */
function SpecIcon({ index }: { index: number }) {
  const p = { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (index === 0) return <svg {...p}><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></svg>; // guests
  if (index === 1) return <svg {...p}><path d="M2 17V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" /><path d="M2 12h20" /><path d="M22 17v-3a2 2 0 0 0-2-2h-4" /><path d="M2 17h20" /></svg>; // bed
  return <svg {...p}><path d="M2 19l6-10 4 6 3-4 7 8H2z" /></svg>; // view
}

function LandmarkIcon({ place }: { place: string }) {
  const p = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const s = place.toLowerCase();
  if (s.includes("highway")) return <svg {...p}><path d="M4 20 9 4h6l5 16" /><path d="M12 4v16" strokeDasharray="2 3" /></svg>;
  if (s.includes("mall") || s.includes("road")) return <svg {...p}><path d="M4 9l1-5h14l1 5" /><path d="M4 9h16v11H4z" /><path d="M9 20v-6h6v6" /></svg>;
  if (s.includes("airport")) return <svg {...p}><path d="M2 16l20-6-6 6 6 6-20-6z" transform="rotate(45 12 12)" /><path d="M12 2v6M12 16v6" /></svg>;
  if (s.includes("castle")) return <svg {...p}><path d="M4 21V9l3-3v3l2-3v3l3-3v3l2-3v3l3-3v3l3-3v12z" /></svg>;
  return <svg {...p}><path d="M2 19l6-10 4 6 3-4 7 8H2z" /></svg>;
}

function DistanceRow({ d, isLast }: { d: (typeof distances)[number]; isLast: boolean }) {
  return (
    <div className="group relative flex items-center justify-between gap-4 px-6 py-[18px] transition-colors duration-500" style={{ borderBottom: isLast ? "none" : "1px solid rgba(36,48,40,0.06)" }}>
      <span aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(212,168,83,0.06)" }} />
      <div className="relative flex items-center gap-3.5 transition-transform duration-500 group-hover:translate-x-1.5">
        <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(212,168,83,0.12)", color: "#b5703f" }}>
          <LandmarkIcon place={d.place} />
        </span>
        <div>
          <p className="font-body text-sm" style={{ color:"rgba(26,34,24,0.75)" }}>{d.place}</p>
          {d.note && <p className="font-body text-[10px] mt-0.5" style={{ color:"rgba(26,34,24,0.4)" }}>{d.note}</p>}
        </div>
      </div>
      <span className="relative italic text-base flex-shrink-0" style={{ fontFamily:"var(--font-accent)", fontWeight:600, color:"#b5703f" }}>{d.dist}</span>
    </div>
  );
}

/* ── Cover Flow room carousel — flat center room, the rest fanned back at a
     fixed angle into the perspective, wraps infinitely, click a side photo
     to bring it forward. Same mechanic as the Shanag cottage carousel,
     re-themed to Farmstead's own gold accent instead of orange. ── */
function RoomCoverFlow({ items }: { items: typeof rooms }) {
  const reduce = useReducedMotion();
  const n = items.length;
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + n) % n);
  const next = () => setActive((a) => (a + 1) % n);

  const CARD_W = "min(78vw, 460px)";
  const CARD_H = "min(104vw, 613px)";

  return (
    <div>
      <div className="relative mx-auto" style={{ height: "min(72vh, 640px)", perspective: 1300, WebkitPerspective: 1300 }}>
        {items.map((room, i) => {
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
                        <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: "#d4a853" }} />
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
                        style={{ background: "#d4a853", color: "#1a2218", fontWeight: 500 }}>
                        Explore this room
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

      <div className="flex items-center justify-center gap-6 mt-9">
        <button onClick={prev} aria-label="Previous room"
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
          style={{ border: "1px solid rgba(212,168,83,0.4)", color: "#b5703f" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="text-center min-w-[160px]">
          <p className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "17px", color: "var(--color-ink)" }}>{items[active].name}</p>
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {items.map((_, i) => (
              <span key={i} className="rounded-full transition-all duration-300"
                style={{ width: i === active ? 16 : 5, height: 5, background: i === active ? "#d4a853" : "rgba(36,48,40,0.18)" }} />
            ))}
          </div>
        </div>
        <button onClick={next} aria-label="Next room"
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
          style={{ border: "1px solid rgba(212,168,83,0.4)", color: "#b5703f" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ── Reduced-motion fallback: simple stacked chapters ── */
function StoryStatic() {
  return (
    <section className="relative w-full" style={{ background: "var(--color-cream-soft)" }}>
      <div className="max-w-5xl mx-auto px-5 md:px-12 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-10" style={{ background: "var(--color-terracotta)" }} />
          <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: "var(--color-terracotta-dark)" }}>The story</p>
        </div>
        <div className="flex flex-col gap-14">
          {chapters.map((ch, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-8 items-center">
              <div className={i % 2 ? "md:order-2" : ""}>
                <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#b5703f" }}>{ch.n} — {ch.kicker}</p>
                <h3 className="font-display italic leading-tight mb-4" style={{ fontSize: "clamp(1.6rem,3.4vw,2.6rem)", color: "var(--color-ink)", whiteSpace: "pre-line" }}>{ch.title}</h3>
                <p className="font-body text-sm md:text-base leading-[1.9]" style={{ color: "rgba(26,34,24,0.6)" }}>{ch.body}</p>
                <p className="font-body text-[10px] tracking-[0.22em] uppercase mt-4" style={{ color: "rgba(26,34,24,0.4)" }}>{ch.meta}</p>
              </div>
              <div className={`rounded-2xl overflow-hidden ${i % 2 ? "md:order-1" : ""}`} style={{ aspectRatio: "4/5" }}>
                <img src={ch.img} alt={ch.label} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Scrollytelling: pinned, scroll-scrubbed story chapters ── */
function StoryScrolly() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0px", "-140px"]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(chapters.length - 1, Math.max(0, Math.floor(v * chapters.length)));
    setActive(idx);
  });

  if (reduce) return <StoryStatic />;

  const ch = chapters[active];

  return (
    <section ref={containerRef} className="relative" style={{ height: `${chapters.length * 82}vh`, background: "var(--color-cream-soft)" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center">
        {/* drifting ghost word */}
        <motion.span
          aria-hidden
          className="absolute font-display italic select-none pointer-events-none"
          style={{ right: "-3%", top: "6%", y: ghostY, fontSize: "clamp(120px, 22vw, 340px)", fontWeight: 300, color: "transparent", WebkitTextStroke: "1px rgba(36,48,40,0.05)", lineHeight: 1, whiteSpace: "nowrap" }}
        >
          Story
        </motion.span>

        <div className="relative w-full max-w-6xl mx-auto px-5 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT — text */}
          <div className="relative order-2 md:order-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10" style={{ background: "var(--color-terracotta)" }} />
              <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: "var(--color-terracotta-dark)" }}>The story</p>
            </div>

            {/* big faint numeral */}
            <div className="absolute -top-4 right-0 pointer-events-none select-none" aria-hidden>
              <AnimatePresence mode="wait">
                <motion.span key={active}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display italic block"
                  style={{ fontSize: "clamp(90px, 12vw, 170px)", lineHeight: 0.8, color: "transparent", WebkitTextStroke: "1.5px rgba(212,168,83,0.28)" }}>
                  {ch.n}
                </motion.span>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="relative">
                <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "#b5703f" }}>{ch.kicker}</p>
                <h3 className="font-display italic leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", color: "var(--color-ink)", letterSpacing: "-0.028em" }}>
                  {ch.title.split("\n").map((line, li) => (
                    <span key={li} className="block" style={{ overflow: "hidden" }}>
                      <motion.span className="inline-block"
                        initial={{ y: "115%" }} animate={{ y: "0%" }}
                        transition={{ delay: 0.08 + li * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h3>
                <p className="font-body text-sm md:text-base leading-[1.95] max-w-md" style={{ color: "rgba(26,34,24,0.6)" }}>{ch.body}</p>
                <div className="flex items-center gap-2.5 mt-6">
                  <span className="h-px w-6" style={{ background: "rgba(212,168,83,0.75)" }} />
                  <span className="font-body text-[10px] tracking-[0.22em] uppercase" style={{ color: "rgba(26,34,24,0.42)" }}>{ch.meta}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* chapter dots */}
            <div className="flex items-center gap-2.5 mt-9">
              {chapters.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-500" style={{ width: i === active ? 26 : 7, height: 7, background: i === active ? "#d4a853" : "rgba(36,48,40,0.16)" }} />
              ))}
              <span className="font-body text-[10px] ml-3" style={{ color: "rgba(26,34,24,0.4)" }}>0{active + 1} <span style={{ opacity: 0.5 }}>/ 0{chapters.length}</span></span>
            </div>
          </div>

          {/* RIGHT — crossfading image */}
          <div className="relative order-1 md:order-2">
            <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden" style={{ aspectRatio: "4/5", boxShadow: "0 40px 90px -40px rgba(26,34,24,0.55)" }}>
              <AnimatePresence>
                <motion.div key={active} className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                  <img src={ch.img} alt={ch.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,6,4,0.6) 0%, transparent 55%)" }} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} className="flex items-center gap-2.5">
                    <span className="h-px w-5" style={{ background: "#d4a853" }} />
                    <span className="font-display italic text-base" style={{ color: "rgba(247,242,232,0.97)" }}>{ch.label}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {/* vertical progress rail */}
            <div className="absolute -left-5 md:-left-8 top-2 bottom-2 w-px hidden md:block" style={{ background: "rgba(36,48,40,0.12)" }}>
              <motion.div className="w-full origin-top" style={{ height: "100%", background: "linear-gradient(to bottom,#d4a853,#b5703f)", scaleY: scrollYProgress }} />
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-px h-8 pointer-events-none"
          style={{ background: "linear-gradient(to bottom,var(--color-terracotta),transparent)" }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      </div>
    </section>
  );
}

/* ── Sibling-property spotlight — light editorial split layout ── */
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
        <img src="/images/shanag/KIN01880.webp" alt="Persimmon Farmstead Shanag"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,34,24,0.15) 0%, transparent 40%)" }} />
      </div>

      <div className="flex flex-col justify-center p-8 md:p-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8" style={{ background: "var(--color-terracotta)" }} />
          <p className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: "#b5703f" }}>Shanag (Bahang) · Manali</p>
        </div>
        <h3 className="italic leading-tight mb-1" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2rem,3.4vw,2.6rem)", color: "var(--color-ink)" }}>
          Persimmon Farmstead Shanag
        </h3>
        <div className="flex items-center gap-2.5 mb-5" aria-hidden>
          <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: "#d4a853", opacity: 0.8 }} />
          <span className="h-px w-14" style={{ background: "linear-gradient(to right, rgba(212,168,83,0.7), transparent)" }} />
        </div>
        <p className="font-body text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(26,34,24,0.6)" }}>
          Wooden chalets and stone cottages on open orchard lawns near Old Manali.
        </p>
        <Link href="/stays/shanag"
          className="group inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3.5 w-fit transition-transform duration-300 hover:scale-[1.03]"
          style={{ background: "#d4a853", color: "#1a2218", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(212,168,83,0.6)" }}>
          View Property
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Page ── */
export default function FarmsteadPage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["0%","22%"]);
  const imgScale = useTransform(scrollYProgress, [0,1], [1,1.1]);
  const heroY = useTransform(scrollYProgress, [0,1], ["0%","35%"]);
  const heroOp = useTransform(scrollYProgress, [0,0.55], [1,0]);

  // hero mouse parallax (depth)
  const hmx = useMotionValue(0);
  const hmy = useMotionValue(0);
  const hsx = useSpring(hmx, { stiffness:55, damping:18 });
  const hsy = useSpring(hmy, { stiffness:55, damping:18 });
  const bgX = useTransform(hsx, [-0.5,0.5], ["-14px","14px"]);
  const bgXY = useTransform(hsy, [-0.5,0.5], ["-9px","9px"]);
  const ghostX = useTransform(hsx, [-0.5,0.5], ["28px","-28px"]);
  const ghostY = useTransform(hsy, [-0.5,0.5], ["18px","-18px"]);
  const heroMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    hmx.set((e.clientX - r.left) / r.width - 0.5);
    hmy.set((e.clientY - r.top) / r.height - 0.5);
  };
  const heroLeave = () => { hmx.set(0); hmy.set(0); };

  return (
    <>
      <ScrollProgress />
      <Navbar />

      {/* ══ HERO ══ */}
      <section ref={heroRef} onMouseMove={heroMove} onMouseLeave={heroLeave}
        className="relative w-full overflow-hidden"
        style={{ height:"100svh", minHeight:"640px", background:"#060806" }}>

        {/* Parallax BG (scroll) + mouse depth */}
        <motion.div className="absolute inset-0" style={{ y:imgY, scale:imgScale }}>
          <motion.img src="/images/farmstead/badagran/hero.png"
            alt="" className="w-full h-full object-cover"
            style={{ filter:"brightness(0.55) saturate(0.85)", x:bgX, y:bgXY, scale:1.08 }} />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom,rgba(6,8,6,0.2) 0%,rgba(6,8,6,0.08) 40%,rgba(6,8,6,0.88) 100%)" }} />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(6,8,6,0.5) 0%,transparent 65%)" }} />

        {/* Ghost word — mouse depth */}
        <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-12 pointer-events-none overflow-hidden" aria-hidden>
          <motion.span className="font-display italic select-none" style={{
            fontSize:"clamp(70px,16vw,240px)", fontWeight:300, letterSpacing:"-0.045em",
            color:"transparent", WebkitTextStroke:"1px rgba(247,242,232,0.06)", lineHeight:1, whiteSpace:"nowrap",
            x:ghostX, y:ghostY,
          }}>Farmstead</motion.span>
        </div>

        {/* Breadcrumb */}
        {/* <motion.div className="absolute top-28 md:top-32 left-5 md:left-12 flex items-center gap-2 z-10"
          initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.6 }}>
          {["Home","/","Our Stays","/","Persimmon Farmstead"].map((s,i)=>(
            <span key={i} className="font-body text-[10px]"
              style={{ color: s==="Persimmon Farmstead" ? "rgba(212,168,83,0.7)" : "rgba(247,242,232,0.3)" }}>
              {s==="/" ? <span style={{ color:"rgba(247,242,232,0.15)" }}>/</span> : s}
            </span>
          ))}
        </motion.div> */}

        {/* Content */}
        <motion.div className="absolute bottom-0 left-0 right-0 z-10 pb-12 md:pb-20"
          style={{ y:heroY, opacity:heroOp }}>
          <div className="max-w-6xl mx-auto px-5 md:px-12">
          <motion.div initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.25, duration:0.9, ease:[0.22,1,0.36,1] }}>

            <div className="flex items-center gap-3 mb-4">
              <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:"#d4a853" }}
                animate={{ opacity:[1,0.35,1] }} transition={{ duration:2.5, repeat:Infinity }} />
              <span className="font-body text-[10px] tracking-[0.32em] uppercase" style={{ color:"rgba(212,168,83,0.8)" }}>
                Badgran (14 Mile) · Manali
              </span>
            </div>

            <h1 className="font-display italic leading-[1.0] mb-5" style={{
              fontSize:"clamp(2.6rem,7.5vw,6.5rem)", letterSpacing:"-0.035em",
              color:"rgba(247,242,232,0.97)", textShadow:"0 4px 48px rgba(0,0,0,0.55)",
            }}>
              Persimmon<br />Farmstead
            </h1>

            <div className="mb-5" style={{ height:"1.5px", width:"60px", background:"linear-gradient(to right,rgba(212,168,83,0.9),transparent)", borderRadius:"2px" }} />

            <p className="font-body text-sm md:text-base max-w-lg mb-8" style={{ color:"rgba(247,242,232,0.45)", lineHeight:1.9 }}>
              A quiet boutique hotel in Manali, a minute off the highway — mountain views from every room and a restaurant the town talks about.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={reduce ? undefined : { scale:1.03 }} whileTap={{ scale:0.97 }}>
                <Link href="/contact#form"
                  className="inline-flex items-center justify-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-8 py-3.5"
                  style={{ background:"#d4a853", color:"#1a2218", fontWeight:500, boxShadow:"0 4px 20px rgba(212,168,83,0.35)" }}>
                  Check Dates
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </motion.div>
              <Link href="https://wa.me/916230645166" target="_blank"
                className="inline-flex items-center justify-center gap-2 font-body text-[13px] tracking-wide rounded-full px-7 py-3.5 transition-all duration-200"
                style={{ border:"1px solid rgba(247,242,232,0.2)", color:"rgba(247,242,232,0.72)" }}>
                WhatsApp Us
              </Link>
              <div className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full"
                style={{ border:"1px solid rgba(247,242,232,0.1)" }}>
                {[1,2,3,4,5].map(s=><svg key={s} width="10" height="10" viewBox="0 0 24 24" fill="#d4a853"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                <span className="font-body text-[11px] ml-1" style={{ color:"rgba(247,242,232,0.45)" }}>4.9 · 141+</span>
              </div>
            </div>
          </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══ STORY (pinned scrollytelling) ══ */}
      <StoryScrolly />

      {/* ══ ROOMS ══ */}
      <section className="relative overflow-hidden" style={{ background:"var(--color-cream-soft)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <ParallaxGhost text="Rooms" align="right" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-12 py-20 md:py-28">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
              <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>The rooms</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-3">
              <h2 className="font-display italic leading-tight" style={{
                fontSize:"clamp(1.9rem,4.2vw,3.4rem)", color:"var(--color-ink)", letterSpacing:"-0.025em" }}>
                Where you&apos;ll sleep.
              </h2>
              <p className="font-body text-sm md:text-base max-w-md" style={{ color:"rgba(26,34,24,0.5)", lineHeight:1.8 }}>
                Three rooms in the Badgran house, each a little different. Tap any room for the full picture.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mb-10 md:mb-14 mt-2" style={{ height:"1.5px", background:"rgba(36,48,40,0.07)" }}>
              <motion.div className="h-full" style={{ background:"linear-gradient(to right,var(--color-terracotta),transparent)" }}
                initial={{ width:"0%" }} whileInView={{ width:"100%" }}
                transition={{ duration:1.2, ease:"easeOut" }} viewport={{ once:true }} />
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <RoomCoverFlow items={rooms} />
          </Reveal>
        </div>
      </section>

      {/* ══ AMENITIES — split-screen editorial row list ══ */}
      <section style={{ background:"var(--color-cream-soft)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <Reveal>
            <AmenityRowListFarmstead eyebrow="At this home" title="What's here" items={amenities} />
          </Reveal>
        </div>
      </section>

      {/* ══ DISTANCES + MAP ══ */}
      <section style={{ background:"var(--color-cream)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
                <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>Getting your bearings</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display italic mb-4" style={{ fontSize:"clamp(1.6rem,3.5vw,2.6rem)", color:"var(--color-ink)", letterSpacing:"-0.02em" }}>How far is everything.</h2>
              <div className="flex items-center gap-2.5 mb-8" aria-hidden>
                <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: "#d4a853", opacity: 0.8 }} />
                <span className="h-px w-14" style={{ background: "linear-gradient(to right, rgba(212,168,83,0.7), transparent)" }} />
              </div>
            </Reveal>
            <div className="overflow-hidden rounded-2xl" style={{ background: "#fffdf8", border:"1px solid rgba(36,48,40,0.08)", boxShadow: "0 30px 60px -36px rgba(43,27,17,0.35)" }}>
              <div className="px-6 py-4" style={{ background:"rgba(36,48,40,0.04)", borderBottom:"1px solid rgba(36,48,40,0.07)" }}>
                <div className="flex justify-between">
                  <span className="font-body text-[10px] tracking-[0.24em] uppercase" style={{ color:"rgba(26,34,24,0.42)" }}>Landmark</span>
                  <span className="font-body text-[10px] tracking-[0.24em] uppercase" style={{ color:"rgba(26,34,24,0.42)" }}>Distance</span>
                </div>
              </div>
              {distances.map((d,i)=>(
                <Reveal key={i} delay={0.05*i}>
                  <DistanceRow d={d} isLast={i === distances.length - 1} />
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.12} y={40}>
            <div className="relative rounded-[22px] overflow-hidden" style={{ background: "#fffdf8", boxShadow: "0 40px 80px -30px rgba(43,27,17,0.4)" }}>
              <div className="relative p-2.5 md:p-3 pb-0">
                <div className="relative overflow-hidden rounded-2xl" style={{ height:"400px" }}>
                  <iframe
                      src="https://www.google.com/maps?q=32.1303243,77.1551243&z=16&output=embed"
                      width="100%" height="100%"
                      style={{ border: 0, filter: "grayscale(0.3) sepia(0.15) saturate(0.85) contrast(1.05) brightness(1.02)" }}
                      allowFullScreen loading="lazy"
                      title="Persimmon Farmstead location map"
                    />
                  <div aria-hidden className="absolute inset-2 rounded-xl pointer-events-none" style={{ border:"1px solid rgba(212,168,83,0.55)" }} />
                  <span aria-hidden className="absolute top-4 left-4 w-6 h-6 pointer-events-none" style={{ borderTop:"1px solid #b5703f", borderLeft:"1px solid #b5703f", opacity:0.8 }} />
                  <span aria-hidden className="absolute bottom-4 right-4 w-6 h-6 pointer-events-none" style={{ borderBottom:"1px solid #b5703f", borderRight:"1px solid #b5703f", opacity:0.8 }} />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full pointer-events-none" style={{ background: "rgba(26,34,24,0.85)", backdropFilter: "blur(6px)" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#d4a853" }} />
                    <span className="italic whitespace-nowrap" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "13px", color: "rgba(247,242,232,0.95)" }}>Persimmon Farmstead</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-6 md:px-7 py-5 mt-2.5">
                <div>
                  <p className="font-body text-[9px] tracking-[0.24em] uppercase mb-1" style={{ color: "rgba(26,34,24,0.4)" }}>Coordinates</p>
                  <p className="italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "15px", color: "var(--color-ink)" }}>32.1303° N, 77.1551° E</p>
                </div>
                <a href="https://www.google.com/maps/place/Persimmon+Farmstead/@32.1303243,77.1551243,17z/data=!3m1!4b1!4m9!3m8!1s0x39048be9ad5a4fc5:0xb3ae3cff4d4070b0!5m2!4m1!1i2!8m2!3d32.1303243!4d77.1551243!16s%2Fg%2F11qgk86jvw" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 flex-shrink-0 rounded-full px-5 py-2.5 font-body text-[11px] tracking-[0.1em] uppercase transition-transform duration-300 hover:scale-[1.03]" style={{ background: "#d4a853", color: "#1a2218", fontWeight: 500 }}>
                  Open in Maps
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M7 17 17 7M7 7h10v10" /></svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ BOOK ══ */}
      <section style={{ background:"var(--color-ink)" }}>
        <div className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24 text-center">
          <Reveal>
            <p className="font-body text-[9px] tracking-[0.38em] uppercase mb-5" style={{ color:"rgba(212,168,83,0.55)" }}>Plan your stay</p>
            <h2 className="font-display italic mb-4" style={{ fontSize:"clamp(1.8rem,4vw,3.2rem)", color:"rgba(247,242,232,0.95)", letterSpacing:"-0.025em" }}>
              Come stay at The Farmstead.
            </h2>
            <div className="mb-5 mx-auto" style={{ height:"1.5px", width:"48px", background:"linear-gradient(to right,transparent,rgba(212,168,83,0.6),transparent)" }} />
            <p className="font-body text-sm md:text-base mb-10 max-w-md mx-auto" style={{ color:"rgba(247,242,232,0.38)", lineHeight:1.9 }}>
              You send a request, a real host confirms it by WhatsApp — usually within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <motion.div whileHover={reduce ? undefined : { scale:1.03 }} whileTap={{ scale:0.97 }}>
                <Link href="/contact#form"
                  className="inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-8 py-3.5"
                  style={{ background:"#d4a853", color:"#1a2218", fontWeight:500 }}>
                  Check Availability
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </motion.div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              {[{l:"+91 62306 45166",r:"916230645166"}, {l:"+91 91388 81116",r:"919138881116"}, {l:"+91 99999 75545",r:"919999975545"}].map(p=>(
                <Link key={p.r} href={`https://wa.me/${p.r}`} target="_blank" aria-label={`WhatsApp ${p.l}`} title={p.l}
                  className="inline-flex items-center justify-center rounded-full transition-all duration-300"
                  style={{ width:44, height:44, border:"1px solid rgba(212,168,83,0.35)", color:"rgba(212,168,83,0.85)" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="#d4a853";(e.currentTarget as HTMLElement).style.background="rgba(212,168,83,0.12)";(e.currentTarget as HTMLElement).style.transform="scale(1.08)"}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(212,168,83,0.35)";(e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.transform="scale(1)"}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.44 1.32 4.94L2 22l5.29-1.39c1.44.79 3.08 1.21 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.5 14.1c-.23.65-1.36 1.24-1.88 1.31-.48.07-1.08.1-1.75-.11-.4-.13-.92-.3-1.58-.59-2.78-1.2-4.6-4-4.74-4.19-.14-.19-1.13-1.5-1.13-2.86s.71-2.03.97-2.31c.25-.28.54-.35.72-.35.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.55.78 1.9.84 2.04.07.14.11.3.02.48-.09.18-.14.29-.28.45-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.2 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.45.2.51.32.07.11.07.66-.16 1.31z"/></svg>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FAQs ══ */}
      <section style={{ background:"var(--color-cream-soft)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-3xl mx-auto px-5 md:px-12 py-14 md:py-24">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
              <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>Questions</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display italic mb-10" style={{ fontSize:"clamp(1.8rem,4vw,3rem)", color:"var(--color-ink)", letterSpacing:"-0.025em" }}>
              Questions about staying with us.
            </h2>
          </Reveal>
          {faqs.map((faq,i)=><FAQ key={i} faq={faq} index={i} isLast={i === faqs.length - 1} />)}
        </div>
      </section>

      {/* ══ OTHER PROPERTY ══ */}
      <section style={{ background:"rgba(36,48,40,0.03)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-12 md:py-20">
          <Reveal>
            <p className="font-body text-[9px] tracking-[0.38em] uppercase mb-6" style={{ color:"var(--color-terracotta-dark)" }}>The other homes</p>
            <OtherPropertyCard />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}