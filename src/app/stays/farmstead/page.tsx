"use client";

import { useRef, useState } from "react";
import {
  motion, useScroll, useTransform, useInView, AnimatePresence,
  useMotionValue, useSpring, useReducedMotion, useMotionTemplate, useMotionValueEvent,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rooms } from "@/lib/rooms";

/* ── Data ── */
const amenities = [
  "In-house restaurant & farm kitchen","Bonfire & garden","Free parking",
  "Travel desk & Volvo booking","Car & two-wheeler rental","Pet friendly",
  "Doctor on call","Free Wi-Fi","Room service & housekeeping","24×7 hot water",
];
const distances = [
  { place: "Kullu–Manali highway turn", note: "one-minute detour", dist: "0.1 km" },
  { place: "Manali Mall Road", note: "", dist: "14 km" },
  { place: "Kullu (Bhuntar) Airport", note: "", dist: "35 km" },
  { place: "Naggar Castle", note: "day trip", dist: "8 km" },
  { place: "Solang Valley", note: "", dist: "22 km" },
];
type Chapter = { n: string; kicker: string; title: string; body: string; meta: string; img: string; label: string };
const chapters: Chapter[] = [
  { n: "01", kicker: "The Beginning", title: "Two friends,\none lockdown.",
    body: "Persimmon began with two friends from very different corporate worlds — the kind of jobs measured in flights and slide decks. The lockdowns handed them an unfamiliar stillness, and when the roads reopened they drove up to Manali and simply never left.",
    meta: "2021 · Where it started",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85", label: "The Farmhouse" },
  { n: "02", kicker: "The Valley", title: "People who\nwalked away.",
    body: "All through the Kullu valley they kept meeting people who had quietly left the city — baristas who used to be bankers, orchard owners who used to be engineers. Over a couple of pegs of Himalayan-brewed whisky one cold night, the two decided to become settlers too.",
    meta: "Kullu Valley · A decision",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85", label: "The Valley" },
  { n: "03", kicker: "The Kitchen", title: "The kitchen,\nfirst of all.",
    body: "What they knew, more than hospitality, was food — so the first thing they got right wasn't the rooms, it was the kitchen. Everything is cooked in-house the way a family cooks for its own table. Guests still message weeks later asking for a recipe.",
    meta: "In-house · Every meal",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85", label: "The Kitchen Table" },
  { n: "04", kicker: "The Land", title: "Angled to\nthe first light.",
    body: "The land does the heavy lifting. Rooms are angled to catch the first sun, so in winter you wake up warm and lit with the ranges filling your window. Outside: apple and persimmon trees, and a kitchen garden the cooks raid every morning.",
    meta: "Orchard · Kitchen garden",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=85", label: "Where You Sleep" },
  { n: "05", kicker: "Today", title: "One home\nbecame two.",
    body: "When the Farmstead filled up, the family opened a second home at Shanag near Old Manali — the same kitchen, the same welcome. That is the whole story, really: a family that left one life for a quieter one, and now spends its days making sure yours is worth the drive up.",
    meta: "Two homes · One family",
    img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1200&q=85", label: "Shanag" },
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

/* ── Shared cursor-driven 3D tilt (with glare) ── */
function useTilt(max = 9, softness = { stiffness: 150, damping: 18 }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, softness);
  const sy = useSpring(my, softness);
  const rotateX = useTransform(sy, [-0.5, 0.5], [`${max}deg`, `${-max}deg`]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [`${-max}deg`, `${max}deg`]);
  const gx = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const gy = useTransform(sy, [-0.5, 0.5], ["18%", "82%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(247,242,232,0.22), transparent 60%)`;
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  return { reduce, rotateX, rotateY, glare, onMove, onLeave };
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

function FAQ({ faq }: { faq:typeof faqs[0] }) {
  const [open,setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid rgba(36,48,40,0.08)" }}>
      <button onClick={()=>setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-display italic text-base md:text-lg" style={{ color:"var(--color-ink)", letterSpacing:"-0.01em" }}>{faq.q}</span>
        <motion.span animate={{ rotate:open?45:0 }} transition={{ duration:0.2 }}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background:"rgba(36,48,40,0.05)", border:"1px solid rgba(36,48,40,0.1)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:0.28 }} className="overflow-hidden">
            <p className="font-body text-sm md:text-base leading-[1.85] pb-5" style={{ color:"rgba(26,34,24,0.55)" }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Luxury room card → links to the room's dedicated page ── */
function RoomCard({ room, i }: { room:typeof rooms[0]; i:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount:0.2, once:true });
  const reduce = useReducedMotion();

  const gold = "#b5703f";
  const specs: { icon: React.ReactNode; label: string }[] = [
    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.6"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6"/></svg>, label: room.guests },
    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.6"><path d="M3 18v-8h13a4 4 0 014 4v4M3 14h18M7 10V8a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>, label: room.bed },
    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.6"><path d="M3 19l6-8 4 5 2-3 6 6z"/><circle cx="8" cy="7" r="1.5"/></svg>, label: room.view },
  ];

  return (
    <motion.div ref={ref} className="h-full"
      initial={reduce ? { opacity:0 } : { opacity:0, y:46 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay:0.1+i*0.12, duration:0.85, ease:[0.22,1,0.36,1] }}
    >
      <motion.div className="relative h-full"
        initial="rest" animate="rest" whileHover={reduce ? undefined : "hover"}
        variants={{ rest:{ y:0 }, hover:{ y:-8 } }}
        transition={{ type:"spring", stiffness:260, damping:22 }}
      >
        <Link href={`/rooms/${room.slug}`}
          className="flex flex-col h-full rounded-[22px] overflow-hidden"
          style={{ background:"#faf6ee", border:"1px solid rgba(36,48,40,0.09)", boxShadow:"0 26px 60px -38px rgba(43,27,17,0.55)" }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio:"4/3" }}>
            <motion.img src={room.img} alt={room.name} className="w-full h-full object-cover"
              variants={{ rest:{ scale:1 }, hover:{ scale:1.07 } }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }} />
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(26,34,24,0.38), transparent 46%)" }} />

            {/* tag */}
            <div className="absolute top-4 left-4">
              <span className="font-body text-[9px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full"
                style={{ background:"rgba(247,242,232,0.92)", color:"#8a5328", border:"1px solid rgba(181,112,63,0.28)", backdropFilter:"blur(4px)" }}>
                {room.tag}
              </span>
            </div>
            {/* rating */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1.5 rounded-full"
              style={{ background:"rgba(26,34,24,0.5)", backdropFilter:"blur(6px)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#d4a853"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
              <span className="font-body text-[11px]" style={{ color:"rgba(247,242,232,0.95)" }}>4.9</span>
            </div>
            {/* number */}
            <span className="absolute bottom-3 left-4 font-display italic pointer-events-none" style={{ fontSize:"34px", color:"transparent", WebkitTextStroke:"1px rgba(247,242,232,0.55)", lineHeight:1 }}>{room.num}</span>
            {/* hover arrow */}
            <motion.div className="absolute bottom-3 right-4 w-10 h-10 rounded-full flex items-center justify-center"
              variants={{ rest:{ opacity:0, scale:0.8 }, hover:{ opacity:1, scale:1 } }} transition={{ duration:0.3 }}
              style={{ background:"#d4a853", color:"#1a2218" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </motion.div>
          </div>

          {/* gold ring on hover */}
          <motion.div className="absolute inset-0 rounded-[22px] pointer-events-none"
            variants={{ rest:{ opacity:0 }, hover:{ opacity:1 } }} transition={{ duration:0.4 }}
            style={{ boxShadow:"inset 0 0 0 1.5px rgba(212,168,83,0.6)" }} />

          {/* Content */}
          <div className="flex flex-col flex-1 p-6">
            <h3 className="font-display mb-3 leading-tight" style={{ fontSize:"clamp(1.35rem, 2.2vw, 1.75rem)", color:"var(--color-ink)", letterSpacing:"-0.01em" }}>
              {room.name}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
              {specs.map((s) => (
                <span key={s.label} className="flex items-center gap-1.5">
                  {s.icon}
                  <span className="font-body text-[11.5px]" style={{ color:"rgba(26,34,24,0.55)" }}>{s.label}</span>
                </span>
              ))}
            </div>
            <p className="font-body text-[13.5px] leading-[1.75] mb-6 line-clamp-2" style={{ color:"rgba(26,34,24,0.6)" }}>
              {room.short}
            </p>
            <motion.div className="mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-[11px] tracking-[0.14em] uppercase"
              variants={{ rest:{ backgroundColor:"rgba(194,105,28,0)", color:"#b5703f" }, hover:{ backgroundColor:"rgba(194,105,28,1)", color:"#ffffff" } }}
              transition={{ duration:0.3 }}
              style={{ border:"1px solid rgba(181,112,63,0.5)" }}>
              Explore this room
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
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

/* ── Other-property banner with subtle tilt + glare ── */
function OtherPropertyCard() {
  const { reduce, rotateX, rotateY, glare, onMove, onLeave } = useTilt(4, { stiffness:80, damping:18 });
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: reduce ? undefined : "1200px" }}>
      <motion.div className="relative overflow-hidden rounded-2xl md:rounded-3xl"
        style={{ rotateX, rotateY, transformStyle:"preserve-3d" }}
        whileHover={reduce ? undefined : { scale:1.01 }} transition={{ duration:0.4 }}>
        <img src="https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1400&q=80" alt=""
          className="absolute inset-0 w-full h-full object-cover" style={{ filter:"brightness(0.4) saturate(0.8)" }} />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(6,8,6,0.7) 0%,rgba(6,8,6,0.2) 100%)" }} />
        {!reduce && (
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: glare, mixBlendMode:"soft-light" }} />
        )}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 md:p-12"
          style={{ transform: reduce ? undefined : "translateZ(40px)" }}>
          <div>
            <p className="font-body text-[9px] tracking-[0.28em] uppercase mb-2" style={{ color:"rgba(212,168,83,0.7)" }}>Shanag (Bahang) · Manali</p>
            <h3 className="font-display italic mb-2" style={{ fontSize:"clamp(1.4rem,3vw,2.4rem)", color:"rgba(247,242,232,0.96)", letterSpacing:"-0.02em" }}>
              Persimmon Farmstead Shanag
            </h3>
            <p className="font-body text-sm" style={{ color:"rgba(247,242,232,0.4)" }}>
              Wooden chalets and stone cottages on open orchard lawns near Old Manali.
            </p>
          </div>
          <motion.div whileHover={reduce ? undefined : { x:4 }} transition={{ duration:0.2 }}>
            <Link href="/stays/shanag"
              className="flex-shrink-0 inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3"
              style={{ background:"#d4a853", color:"#1a2218", fontWeight:500 }}>
              View Property
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
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
          <motion.img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=90"
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
        <motion.div className="absolute top-28 md:top-32 left-6 md:left-14 flex items-center gap-2 z-10"
          initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.6 }}>
          {["Home","/","Our Stays","/","Persimmon Farmstead"].map((s,i)=>(
            <span key={i} className="font-body text-[10px]"
              style={{ color: s==="Persimmon Farmstead" ? "rgba(212,168,83,0.7)" : "rgba(247,242,232,0.3)" }}>
              {s==="/" ? <span style={{ color:"rgba(247,242,232,0.15)" }}>/</span> : s}
            </span>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-14 lg:px-20 pb-12 md:pb-20"
          style={{ y:heroY, opacity:heroOp }}>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 items-stretch">
            {rooms.map((room,i)=><RoomCard key={room.slug} room={room} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══ AMENITIES + DISTANCES side by side ══ */}
      <section style={{ background:"var(--color-cream-soft)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Amenities */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
                  <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>At this home</p>
                </div>
              </Reveal>
              <Reveal delay={0.06}><h2 className="font-display italic mb-8" style={{ fontSize:"clamp(1.6rem,3.5vw,2.6rem)", color:"var(--color-ink)", letterSpacing:"-0.02em" }}>What's here.</h2></Reveal>
              <div className="flex flex-col gap-0">
                {amenities.map((a,i)=>(
                  <Reveal key={i} delay={0.04*i}>
                    <div className="flex items-center gap-3 py-3" style={{ borderBottom:"1px solid rgba(36,48,40,0.07)" }}>
                      <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ background:"rgba(212,168,83,0.14)", border:"1px solid rgba(212,168,83,0.28)" }}>
                        <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#d4a853" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="font-body text-sm" style={{ color:"rgba(26,34,24,0.68)" }}>{a}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Distances */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
                  <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>Getting your bearings</p>
                </div>
              </Reveal>
              <Reveal delay={0.06}><h2 className="font-display italic mb-8" style={{ fontSize:"clamp(1.6rem,3.5vw,2.6rem)", color:"var(--color-ink)", letterSpacing:"-0.02em" }}>How far is everything.</h2></Reveal>
              <div className="overflow-hidden rounded-2xl" style={{ border:"1px solid rgba(36,48,40,0.08)" }}>
                <div className="px-5 py-3" style={{ background:"rgba(36,48,40,0.04)", borderBottom:"1px solid rgba(36,48,40,0.07)" }}>
                  <div className="flex justify-between">
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color:"rgba(26,34,24,0.4)" }}>Landmark</span>
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color:"rgba(26,34,24,0.4)" }}>Distance</span>
                  </div>
                </div>
                {distances.map((d,i)=>(
                  <Reveal key={i} delay={0.05*i}>
                    <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom:i<distances.length-1?"1px solid rgba(36,48,40,0.06)":"none" }}>
                      <div>
                        <p className="font-body text-sm" style={{ color:"rgba(26,34,24,0.72)" }}>{d.place}</p>
                        {d.note&&<p className="font-body text-[10px] mt-0.5" style={{ color:"rgba(26,34,24,0.35)" }}>{d.note}</p>}
                      </div>
                      <span className="font-display italic text-base flex-shrink-0 ml-4" style={{ color:"var(--color-terracotta-dark)" }}>{d.dist}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2}>
                <div className="mt-5 overflow-hidden rounded-2xl" style={{ height:"220px" }}>
                  <iframe src="https://maps.google.com/maps?q=Persimmon%20Farmstead%2C%2014%20Mile%20Bypass%2C%20Badgran%2C%20Manali%20175129&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%" height="100%" style={{ border:0 }} allowFullScreen loading="lazy" />
                </div>
              </Reveal>
            </div>
          </div>
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
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              {[{l:"+91 62306 45166",r:"916230645166"},{l:"+91 99999 75545",r:"919999975545"},{l:"+91 88005 00292",r:"918800500292"}].map(p=>(
                <Link key={p.r} href={`https://wa.me/${p.r}`} target="_blank"
                  className="inline-flex items-center justify-center gap-2 font-body text-[11px] tracking-wide rounded-full px-5 py-2.5 transition-all duration-200"
                  style={{ border:"1px solid rgba(247,242,232,0.1)", color:"rgba(247,242,232,0.45)" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(212,168,83,0.4)";(e.currentTarget as HTMLElement).style.color="rgba(212,168,83,0.8)"}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(247,242,232,0.1)";(e.currentTarget as HTMLElement).style.color="rgba(247,242,232,0.45)"}}>
                  {p.l}
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
          {faqs.map((faq,i)=><FAQ key={i} faq={faq} />)}
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
