"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, useMotionValueEvent, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

const stats = [
  { value: 12, suffix: "+", label: "Years", sub: "of hospitality" },
  { value: 3.2, suffix: "K", label: "Guests", sub: "hosted", decimals: 1 },
  { value: 2, suffix: "", label: "Homes", sub: "one family" },
  { value: 4.9, suffix: "", label: "Rating", sub: "average score", decimals: 1 },
];

const values = [
  {
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12 12 4l9 8" /><path d="M5 12v8h14v-8" /><path d="M10 20v-5h4v5" /></svg>,
    title: "Family run, not staffed",
    desc: "The people who greet you live on the land — not a rotating crew clocking in from town.",
  },
  {
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 2v6a2 2 0 0 1-4 0V2" /><path d="M5 8v14" /><path d="M17 2c-2 0-3 2-3 6 0 2 1 3 3 3v11" /></svg>,
    title: "Nothing from a packet",
    desc: "Meals drawn from the kitchen garden and the day's market, cooked the way a family cooks for its own table.",
  },
  {
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
    title: "Unhurried, on purpose",
    desc: "No fixed schedule — the pool, the spa, the kitchen all move at your pace, not a printed timetable's.",
  },
  {
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
    title: "Two homes, one welcome",
    desc: "Badgran on the highway before Manali, Shanag tucked above Old Manali — the same kitchen, the same family, either way.",
  },
];

const chapters = [
  {
    n: "01", kicker: "The Beginning", title: "Two friends,\none lockdown.",
    body: "Persimmon began with two friends from very different corporate worlds — the kind of jobs measured in flights and slide decks. The lockdowns handed them an unfamiliar stillness, and when the roads reopened they drove up to Manali and simply never left.",
    meta: "2021 · Where it started",
    img: "/images/farmstead/badagran/gallery-1.webp",
  },
  {
    n: "02", kicker: "The Kitchen", title: "The kitchen,\nfirst of all.",
    body: "What they knew, more than hospitality, was food — so the first thing they got right wasn't the rooms, it was the kitchen. Everything is cooked in-house the way a family cooks for its own table. Guests still message weeks later asking for a recipe.",
    meta: "In-house · Every meal",
    img: "/images/farmstead/badagran/gallery-3.webp",
  },
  {
    n: "03", kicker: "Today", title: "One home\nbecame two.",
    body: "When the Farmstead filled up, the family opened a second home at Shanag near Old Manali — the same kitchen, the same welcome. A family that left one life for a quieter one, and now spends its days making sure yours is worth the drive up.",
    meta: "Two homes · One family",
    img: "/images/farmstead/badagran/gallery-5.webp",
  },
];

const homes = [
  {
    key: "farmstead",
    name: "Persimmon Farmstead",
    location: "Badgran (14 Mile) · Manali",
    desc: "A minute off the highway, mountain views from every room, and a restaurant the whole town talks about.",
    img: "/images/farmstead/badagran/gallery-2.webp",
    href: "/stays/farmstead",
    facts: ["Mountain-facing rooms", "In-house restaurant", "14 km before Manali"],
  },
  {
    key: "shanag",
    name: "Persimmon Farmstead Shanag",
    location: "Shanag (Bahang) · Manali",
    desc: "Wooden chalets and stone cottages on open orchard lawns, close enough to walk into Old Manali.",
    img: "/images/shanag/KIN01880.webp",
    href: "/stays/shanag",
    facts: ["Wooden chalets & cottages", "Snow-peak views", "4–5 km above Manali"],
  },
];

function StatIcon({ label }: { label: string }) {
  const p = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (label) {
    case "Years": return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>;
    case "Guests": return <svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14a5 5 0 0 1 6 5.5" /></svg>;
    case "Homes": return <svg {...p}><path d="M3 12 12 4l9 8" /><path d="M5 12v8h14v-8" /><path d="M10 20v-5h4v5" /></svg>;
    case "Rating": return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
    default: return <span className="block w-2 h-2 rotate-45" style={{ background: "currentColor" }} />;
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

/* ── Tilt card — subtle 3D lean toward the cursor, used on stats + values ── */
function TiltCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Pinned scrollytelling — the site's signature mechanic, reused here,
     now with the framed-photo + engraved-badge treatment used elsewhere. ── */
function StoryScrolly() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(chapters.length - 1, Math.max(0, Math.floor(v * chapters.length)));
    setActive(idx);
  });

  if (reduce) {
    return (
      <section className="relative w-full py-20 md:py-28 px-5 md:px-12" style={{ background: "var(--color-cream-soft)" }}>
        <div className="max-w-5xl mx-auto space-y-16">
          {chapters.map((ch, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-8 items-center">
              <div className={i % 2 ? "md:order-2" : ""}>
                <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: ACCENT }}>{ch.n} — {ch.kicker}</p>
                <h3 className="italic leading-tight mb-4" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.6rem,3.4vw,2.4rem)", color: "var(--color-ink)", whiteSpace: "pre-line" }}>{ch.title}</h3>
                <p className="font-body text-sm leading-[1.9]" style={{ color: "rgba(26,34,24,0.6)" }}>{ch.body}</p>
              </div>
              <div className={`rounded-2xl overflow-hidden ${i % 2 ? "md:order-1" : ""}`} style={{ aspectRatio: "4/5" }}>
                <img src={ch.img} alt={ch.meta} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const ch = chapters[active];

  return (
    <section ref={containerRef} className="relative" style={{ height: `${chapters.length * 82}vh`, background: "var(--color-cream-soft)" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 55% at 78% 45%, rgba(194,105,28,0.05) 0%, transparent 70%)" }} />

        <div className="relative w-full max-w-6xl mx-auto px-5 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* LEFT — text, now with an engraved chapter badge instead of a bare watermark numeral */}
          <div className="relative order-2 md:order-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10" style={{ background: ACCENT }} />
              <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>The story</p>
            </div>

            {/* engraved chapter medallion — same construction as the CTA's "Est. 2021" badge */}
            <div className="absolute -top-2 right-0 md:right-4 pointer-events-none select-none" aria-hidden>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -4 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center rounded-full"
                  style={{
                    width: "clamp(64px, 8vw, 88px)", height: "clamp(64px, 8vw, 88px)",
                    background: "linear-gradient(135deg, rgba(240,201,135,0.14), rgba(181,112,63,0.06))",
                    border: "1px solid rgba(212,168,83,0.35)",
                  }}
                >
                  <span className="font-display italic" style={{ fontSize: "clamp(1.6rem,3vw,2.3rem)", lineHeight: 1, color: "rgba(181,112,63,0.55)" }}>{ch.n}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="relative pr-24 md:pr-0">
                <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: ACCENT }}>{ch.kicker}</p>
                <h3 className="italic leading-[1.05] mb-6" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)", color: "var(--color-ink)", letterSpacing: "-0.025em" }}>
                  {ch.title.split("\n").map((line, li) => (
                    <span key={li} className="block" style={{ overflow: "hidden" }}>
                      <motion.span className="inline-block" initial={{ y: "115%" }} animate={{ y: "0%" }} transition={{ delay: 0.08 + li * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h3>
                <p className="font-body text-sm md:text-base leading-[1.95] max-w-md" style={{ color: "rgba(26,34,24,0.62)" }}>
                  <span className="italic float-left mr-2.5 mt-0.5" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "2.4rem", lineHeight: "0.78", color: ACCENT }}>
                    {ch.body.charAt(0)}
                  </span>
                  {ch.body.slice(1)}
                </p>
                <div className="flex items-center gap-2.5 mt-6">
                  <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: GOLD, opacity: 0.85 }} />
                  <span className="h-px w-6" style={{ background: "rgba(212,168,83,0.75)" }} />
                  <span className="font-body text-[10px] tracking-[0.22em] uppercase" style={{ color: "rgba(26,34,24,0.42)" }}>{ch.meta}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2.5 mt-9">
              {chapters.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-500" style={{ width: i === active ? 26 : 7, height: 7, background: i === active ? GOLD : "rgba(36,48,40,0.16)" }} />
              ))}
              <span className="font-body text-[10px] ml-3" style={{ color: "rgba(26,34,24,0.4)" }}>0{active + 1} <span style={{ opacity: 0.5 }}>/ 0{chapters.length}</span></span>
            </div>
          </div>

          {/* RIGHT — framed photo, gold corner brackets, caption plate — matching the site's other framed treatments */}
          <div className="relative order-1 md:order-2">
            <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden" style={{ aspectRatio: "4/5", boxShadow: "0 45px 100px -40px rgba(26,34,24,0.55)" }}>
              <AnimatePresence>
                <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                  <img src={ch.img} alt={ch.meta} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,6,4,0.62) 0%, transparent 50%)" }} />
                </motion.div>
              </AnimatePresence>
              <div aria-hidden className="absolute inset-3 rounded-xl pointer-events-none" style={{ border: `1px solid ${GOLD}66` }} />
              <span aria-hidden className="absolute top-5 left-5 w-6 h-6 pointer-events-none" style={{ borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}`, opacity: 0.85 }} />
              <span aria-hidden className="absolute bottom-5 right-5 w-6 h-6 pointer-events-none" style={{ borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}`, opacity: 0.85 }} />

              {/* caption plate */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 px-3.5 py-2 rounded-full" style={{ background: "rgba(26,34,24,0.75)", backdropFilter: "blur(6px)" }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                <span className="italic whitespace-nowrap" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "12px", color: "rgba(247,242,232,0.95)" }}>{ch.kicker}</span>
              </div>
            </div>
            <div className="absolute -left-5 md:-left-8 top-2 bottom-2 w-px hidden md:block" style={{ background: "rgba(36,48,40,0.12)" }}>
              <motion.div className="w-full origin-top" style={{ height: "100%", background: `linear-gradient(to bottom,${GOLD},${ACCENT})`, scaleY: scrollYProgress }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Interactive Two Homes toggle — click to swap the photo + details live ── */
function TwoHomes() {
  const [active, setActive] = useState(0);
  const home = homes[active];
  return (
    <section className="relative w-full px-5 md:px-12 py-20 md:py-28" style={{ background: "#f2ecdc", borderTop: "1px solid rgba(36,48,40,0.07)" }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-10 md:mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
              <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>Two homes</p>
              <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
            </div>
            <h2 className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2rem,4.2vw,2.9rem)", color: "var(--color-ink)" }}>
              Same welcome, two corners of the valley.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex justify-center gap-3 mb-10">
            {homes.map((h, i) => (
              <button
                key={h.key}
                onClick={() => setActive(i)}
                className="relative font-body text-[11px] tracking-[0.16em] uppercase px-6 py-3 rounded-full transition-all duration-300"
                style={{
                  background: active === i ? ACCENT : "transparent",
                  color: active === i ? "#fff" : "rgba(26,34,24,0.55)",
                  border: `1px solid ${active === i ? ACCENT : "rgba(36,48,40,0.18)"}`,
                }}
              >
                {h.key === "farmstead" ? "Farmstead" : "Shanag"}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="grid md:grid-cols-2 rounded-[28px] overflow-hidden" style={{ background: "#fffdf8", boxShadow: "0 45px 90px -38px rgba(43,27,17,0.4)", border: "1px solid rgba(36,48,40,0.08)" }}>
            <div className="relative overflow-hidden" style={{ aspectRatio: "5/4" }}>
              <AnimatePresence mode="sync">
                <motion.img
                  key={home.key}
                  src={home.img}
                  alt={home.name}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-11">
              <AnimatePresence mode="wait">
                <motion.div key={home.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
                  <p className="font-body text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>{home.location}</p>
                  <h3 className="italic leading-tight mb-4" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.6rem,3vw,2.1rem)", color: "var(--color-ink)" }}>
                    {home.name}
                  </h3>
                  <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(26,34,24,0.6)" }}>{home.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {home.facts.map((f) => (
                      <span key={f} className="font-body text-[11px] px-3 py-1.5 rounded-full" style={{ background: "rgba(194,105,28,0.08)", color: "rgba(26,34,24,0.6)", border: "1px solid rgba(194,105,28,0.18)" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link href={home.href} className="group inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3.5 w-fit transition-transform duration-300 hover:scale-[1.03]" style={{ background: ACCENT, color: "#fff" }}>
                    View Property
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOp = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { amount: 0.3, once: true });

  const hmx = useMotionValue(0);
  const hmy = useMotionValue(0);
  const hsx = useSpring(hmx, { stiffness: 55, damping: 18 });
  const hsy = useSpring(hmy, { stiffness: 55, damping: 18 });
  const bgX = useTransform(hsx, [-0.5, 0.5], ["-14px", "14px"]);
  const bgY = useTransform(hsy, [-0.5, 0.5], ["-9px", "9px"]);
  const ghostX = useTransform(hsx, [-0.5, 0.5], ["26px", "-26px"]);
  const ghostY = useTransform(hsy, [-0.5, 0.5], ["16px", "-16px"]);
  const heroMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    hmx.set((e.clientX - r.left) / r.width - 0.5);
    hmy.set((e.clientY - r.top) / r.height - 0.5);
  };
  const heroLeave = () => { hmx.set(0); hmy.set(0); };

return (
    <main style={{ background: "var(--color-cream-soft)", position: "relative" }}>
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <Navbar />

      {/* ══ HERO ══ */}
      <section ref={heroRef} onMouseMove={heroMove} onMouseLeave={heroLeave} className="relative w-full overflow-hidden" style={{ height: "80vh", minHeight: "560px", maxHeight: "900px", background: "#060806" }}>
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <motion.img src="/images/farmstead/badagran/gallery-2.webp" alt="Persimmon Farmstead" className="w-full h-full object-cover" style={{ filter: "brightness(0.55) saturate(0.88)", x: bgX, y: bgY, scale: 1.06 }} />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,6,0.25) 0%, rgba(6,8,6,0.08) 40%, rgba(6,8,6,0.9) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,8,6,0.45) 0%, transparent 60%)" }} />

        <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-14 pointer-events-none overflow-hidden" aria-hidden>
          <motion.span className="italic select-none whitespace-nowrap" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(60px,13vw,200px)", letterSpacing: "-0.03em", color: "transparent", WebkitTextStroke: "1px rgba(247,242,232,0.06)", lineHeight: 1, x: ghostX, y: ghostY }}>
            Our Story
          </motion.span>
        </div>

        <motion.div className="absolute bottom-0 left-0 right-0 z-10 pb-14 md:pb-20" style={{ opacity: heroOp }}>
          <div className="max-w-6xl mx-auto px-5 md:px-12">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
                <span className="font-body text-[10px] tracking-[0.32em] uppercase" style={{ color: "rgba(212,168,83,0.8)" }}>Two Homes · One Family</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="italic leading-[1.02] mb-5" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.4rem,7vw,5.2rem)", letterSpacing: "-0.02em", color: "rgba(247,242,232,0.98)", textShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
                About Persimmon Farmstead
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <div style={{ height: "1.5px", width: "60px", background: "linear-gradient(to right, rgba(212,168,83,0.9), transparent)", borderRadius: "2px" }} />
            </Reveal>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-px h-8 pointer-events-none" style={{ background: "linear-gradient(to bottom,#d4a853,transparent)" }} animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      </section>

      {/* ══ PINNED SCROLLYTELLING STORY ══ */}
      <StoryScrolly />

      {/* ══ STATS — with tilt ══ */}
      <section ref={statsRef} className="relative w-full px-5 md:px-12 overflow-hidden" style={{ borderTop: "1px solid rgba(36,48,40,0.07)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 60% at 50% 40%, rgba(194,105,28,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden" style={{ background: "#fffdf8", border: "1px solid rgba(36,48,40,0.08)" }}>
            {stats.map((s, i) => (
              <TiltCard
                key={i}
                className={`group flex flex-col items-center text-center py-7 md:py-9 px-4 transition-colors duration-500 hover:bg-[rgba(212,168,83,0.05)] cursor-default ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} ${i < 3 ? "md:border-r" : ""}`}
                style={{ borderColor: "rgba(212,168,83,0.22)" }}
              >
                <span className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110" style={{ background: "rgba(212,168,83,0.12)", color: "var(--color-terracotta-dark)" }} aria-hidden>
                  <StatIcon label={s.label} />
                </span>
                <p className="font-display italic leading-none mb-1.5" style={{ fontSize: "clamp(1.7rem, 4vw, 2.5rem)", color: "var(--color-terracotta-dark)" }}>
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} active={statsInView} delay={1.2 + i * 0.1} />
                </p>
                <p className="font-body text-[9px] md:text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(26,34,24,0.5)" }}>{s.label}</p>
                <p className="font-body text-[9px] md:text-[10px]" style={{ color: "rgba(26,34,24,0.3)" }}>{s.sub}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TWO HOMES — interactive toggle ══ */}
      <TwoHomes />

      {/* ══ GUEST VOICE — a real moment of testimony between the two structured sections ══ */}
      <section className="relative w-full px-5 md:px-12 py-16 md:py-20" style={{ background: "var(--color-ink)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <svg width="28" height="20" viewBox="0 0 32 24" fill={GOLD} className="mx-auto mb-6" style={{ opacity: 0.6 }}>
              <path d="M0 24V13.8C0 6.2 4.8 1 12.6 0l1.2 4.4C8.4 5.6 6 8.6 6 13h6v11H0zm18 0V13.8C18 6.2 22.8 1 30.6 0l1.2 4.4c-5.4 1.2-7.8 4.2-7.8 8.6h6v11H18z" />
            </svg>
            <p className="italic leading-relaxed mb-6" style={{ fontFamily: "var(--font-accent)", fontWeight: 500, fontSize: "clamp(1.3rem,2.6vw,1.8rem)", color: "rgba(247,242,232,0.95)" }}>
              &ldquo;Felt less like a hotel stay, more like visiting family.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-2.5">
              <span className="h-px w-6" style={{ background: "rgba(212,168,83,0.6)" }} />
              <p className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(247,242,232,0.4)" }}>
                A Guest, on TripAdvisor
              </p>
              <span className="h-px w-6" style={{ background: "rgba(212,168,83,0.6)" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ WHAT WE BELIEVE ══ */}
      <section className="relative w-full px-5 md:px-12 py-16 md:py-24" style={{ background: "var(--color-cream-soft)", borderTop: "1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center max-w-xl mx-auto mb-14 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
                <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>What we believe</p>
                <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
              </div>
              <h2 className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2rem,4.2vw,2.9rem)", color: "var(--color-ink)" }}>
                Not just a bed — a way in.
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <TiltCard className="group relative pt-6 pb-7" style={{ borderBottom: "1px solid rgba(43,27,17,0.1)" }}>
                  <div className="flex items-center gap-4 mb-3 transition-transform duration-500 group-hover:translate-x-1.5">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110" style={{ background: "rgba(194,105,28,0.12)", color: ACCENT }}>
                      {v.icon}
                    </span>
                    <h3 className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.05rem,2.2vw,1.2rem)", color: "var(--color-ink)" }}>
                      {v.title}
                    </h3>
                  </div>
                  <p className="font-body leading-[1.7] pl-14" style={{ fontSize: "13.5px", color: "rgba(26,34,24,0.55)" }}>{v.desc}</p>
                  <div className="absolute bottom-0 left-0 h-px w-full overflow-hidden">
                    <div className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: ACCENT }} />
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

{/* ══ CTA — cinematic close, engraved invitation ══ */}
<section className="relative w-full overflow-hidden">
  <div className="absolute inset-0">
    <motion.img
      src="/images/farmstead/badagran/gallery-4.webp"
      alt=""
      aria-hidden="true"
      className="w-full h-full object-cover"
      style={{ filter: "brightness(0.46) saturate(1.05)" }}
      initial={{ scale: 1.02 }}
      whileInView={{ scale: 1.09 }}
      viewport={{ once: true }}
      transition={{ duration: 14, ease: "linear" }}
    />
  </div>
  <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(8,14,10,0.82) 0%, rgba(8,14,10,0.66) 55%, rgba(8,14,10,0.86) 100%)" }} />
  <span aria-hidden className="hidden md:block absolute select-none pointer-events-none italic" style={{ fontFamily: "var(--font-accent)", top: "-4rem", left: "50%", transform: "translateX(-50%)", fontSize: "20rem", lineHeight: 1, color: "rgba(247,242,232,0.035)" }}>
    &rdquo;
  </span>

  <div className="relative max-w-2xl mx-auto px-6 py-24 md:py-40">
    <Reveal>
      <div className="relative text-center px-8 py-14 md:px-16 md:py-24" style={{ border: "1px solid rgba(247,242,232,0.16)" }}>
        <span aria-hidden className="absolute top-4 left-4 w-6 h-6" style={{ borderTop: "1px solid rgba(212,168,83,0.7)", borderLeft: "1px solid rgba(212,168,83,0.7)" }} />
        <span aria-hidden className="absolute bottom-4 right-4 w-6 h-6" style={{ borderBottom: "1px solid rgba(212,168,83,0.7)", borderRight: "1px solid rgba(212,168,83,0.7)" }} />

        {/* small heritage badge — echoes the "Est." mark used on your hero */}
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-full"
          style={{
            width: 68, height: 68,
            background: "linear-gradient(135deg, #f0c987, #b5703f)",
            boxShadow: "0 20px 40px -14px rgba(181,112,63,0.6)",
          }}
        >
          <span className="text-[9px] tracking-[0.1em] uppercase" style={{ color: "#1a2218" }}>Est.</span>
          <span className="italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "17px", color: "#1a2218" }}>2021</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-7 mt-4">
          <span className="h-px w-8" style={{ background: "rgba(212,168,83,0.6)" }} />
          <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: GOLD }} />
          <p className="font-body text-[9px] tracking-[0.44em] uppercase" style={{ color: "#f5d98a" }}>Come see for yourself</p>
          <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: GOLD }} />
          <span className="h-px w-8" style={{ background: "rgba(212,168,83,0.6)" }} />
        </div>

        <h2 className="italic mb-6 leading-[1.05]" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.1rem,4.8vw,3.5rem)", color: "rgba(247,242,232,0.98)", letterSpacing: "-0.02em", textShadow: "0 6px 30px rgba(0,0,0,0.4)" }}>
          Ready to plan your stay?
        </h2>

        <p className="font-body text-[14.5px] md:text-base mb-11 max-w-md mx-auto" style={{ color: "rgba(247,242,232,0.65)", lineHeight: 1.9 }}>
          You send a request, a real host confirms it by WhatsApp — usually
          within a few hours.
        </p>

        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 font-body text-[12px] tracking-[0.16em] uppercase rounded-full pl-1 pr-1.5 py-1.5"
          style={{ border: "1px solid rgba(217,142,76,0.35)", color: "#f0c987" }}
        >
          <span className="pl-6">Get in touch</span>
          <span
            className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ width: 34, height: 34, background: "linear-gradient(135deg, #f0c987, #b5703f)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a2218" strokeWidth="2.6">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </div>
    </Reveal>
  </div>
</section>

      <Footer />
    </main>
  );
}