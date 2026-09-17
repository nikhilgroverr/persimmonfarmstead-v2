"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

const categories = [
  {
    key: "services",
    title: "Services",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 2v6a2 2 0 0 1-4 0V2" /><path d="M5 8v14" /><path d="M17 2c-2 0-3 2-3 6 0 2 1 3 3 3v11" />
      </svg>
    ),
    blurb: null,
    items: ["Restaurant", "Reception", "Travel Desk", "Free Parking", "Car Rental", "Volvo Booking", "Bonfire", "Garden Space"],
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=85",
  },
  {
    key: "facilities",
    title: "Facilities",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="16" r="3" /><circle cx="6" cy="10" r="1.6" /><circle cx="10" cy="6" r="1.6" /><circle cx="14" cy="6" r="1.6" /><circle cx="18" cy="10" r="1.6" />
      </svg>
    ),
    blurb: null,
    items: ["Pet Friendly", "Room Balcony", "Two Wheeler Rental", "Doctor On Call"],
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1400&q=85",
  },
  {
    key: "room-services",
    title: "Room Services",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 17V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" /><path d="M2 12h20" /><path d="M22 17v-3a2 2 0 0 0-2-2h-4" /><path d="M2 17h20" />
      </svg>
    ),
    blurb: "Executive rooms well furnished with king size bed, wardrobe, and a coffee table with chairs.",
    items: ["WiFi", "Room Service", "Housekeeping", "Hygiene", "Wakeup Call", "Kitchenette", "Laundry", "Intercom"],
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=85",
  },
  {
    key: "explore",
    title: "Explore",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 19l6-10 4 6 3-4 7 8H2z" />
      </svg>
    ),
    blurb: "Plenty of adventure activities around to make your trip a memorable one.",
    items: ["Paragliding", "Water Rafting", "Trekking", "Hot Air Balloon", "Mountain View", "Hot Water Spring", "Bird Watching", "Nature Park"],
    img: "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=1400&q=85",
  },
];

export default function AmenitiesPage() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const cat = categories[active];

  // ── Hero: mouse parallax + scroll fade, same mechanic as About/Farmstead ──
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOp = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

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
    <main style={{ background: "var(--color-cream-soft)" }}>
      <Navbar />

      {/* ══ HERO — parallax + ghost watermark ══ */}
      <section
        ref={heroRef}
        onMouseMove={heroMove}
        onMouseLeave={heroLeave}
        className="relative w-full overflow-hidden"
        style={{ height: "58vh", minHeight: "440px", maxHeight: "720px", background: "#060806" }}
      >
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <motion.img
            src="/images/farmstead/badagran/gallery-3.webp"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5) saturate(0.88)", x: bgX, y: bgY, scale: 1.06 }}
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,6,0.3) 0%, rgba(6,8,6,0.1) 40%, rgba(6,8,6,0.92) 100%)" }} />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden>
          <motion.span
            className="italic select-none whitespace-nowrap"
            style={{
              fontFamily: "var(--font-accent)", fontWeight: 600,
              fontSize: "clamp(70px,16vw,220px)", letterSpacing: "-0.03em",
              color: "transparent", WebkitTextStroke: "1px rgba(247,242,232,0.06)", lineHeight: 1,
              x: ghostX, y: ghostY,
            }}
          >
            Amenities
          </motion.span>
        </div>

        <motion.div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6" style={{ opacity: heroOp }}>
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
              <span className="font-body text-[10px] tracking-[0.32em] uppercase" style={{ color: "rgba(212,168,83,0.85)" }}>
                Persimmon Farmstead
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="italic leading-[1.05] mb-5 max-w-2xl"
              style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.3rem,6vw,4rem)", letterSpacing: "-0.02em", color: "rgba(247,242,232,0.98)", textShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
            >
              Everything that makes your stay.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mb-6 mx-auto" style={{ height: "1.5px", width: "56px", background: "linear-gradient(to right, transparent, rgba(212,168,83,0.9), transparent)", borderRadius: "2px" }} />
          </Reveal>
          <Reveal delay={0.18}>
            <p className="font-body text-[15px] md:text-base max-w-md mx-auto" style={{ color: "rgba(247,242,232,0.65)", lineHeight: 1.85 }}>
              From everyday comforts to once-in-a-while adventures — here&apos;s
              what&apos;s waiting for you.
            </p>
          </Reveal>
        </motion.div>
      </section>

      {/* ══ TABS ══ */}
      <section className="relative w-full px-5 md:px-12 pt-14 md:pt-16 mb-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2.5">
          {categories.map((c, i) => (
            <button
              key={c.key}
              onClick={() => setActive(i)}
              className="relative inline-flex items-center gap-2 font-body text-[12px] tracking-[0.08em] uppercase px-5 py-3 rounded-full transition-all duration-300"
              style={{
                background: active === i ? ACCENT : "#fffdf8",
                color: active === i ? "#fff" : "rgba(26,34,24,0.6)",
                border: `1px solid ${active === i ? ACCENT : "rgba(36,48,40,0.12)"}`,
                boxShadow: active === i ? "0 10px 24px -10px rgba(194,105,28,0.5)" : "none",
              }}
            >
              <span style={{ opacity: active === i ? 1 : 0.55 }}>{c.icon}</span>
              {c.title}
            </button>
          ))}
        </div>
      </section>

      {/* ══ ACTIVE CATEGORY PANEL ══ */}
      <section className="relative w-full px-5 md:px-12 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 rounded-[28px] overflow-hidden"
              style={{ background: "#fffdf8", boxShadow: "0 45px 90px -38px rgba(43,27,17,0.4)", border: "1px solid rgba(36,48,40,0.08)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,19,15,0.3) 0%, transparent 45%)" }} />
                <div aria-hidden className="absolute inset-2 rounded-xl pointer-events-none" style={{ border: `1px solid ${GOLD}88` }} />
                <span aria-hidden className="absolute top-4 left-4 w-6 h-6 pointer-events-none" style={{ borderTop: `1px solid ${ACCENT}`, borderLeft: `1px solid ${ACCENT}`, opacity: 0.85 }} />
                <span aria-hidden className="absolute bottom-4 right-4 w-6 h-6 pointer-events-none" style={{ borderBottom: `1px solid ${ACCENT}`, borderRight: `1px solid ${ACCENT}`, opacity: 0.85 }} />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(194,105,28,0.12)", color: ACCENT }}>
                    {cat.icon}
                  </span>
                  <h2 className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.8rem,3.4vw,2.4rem)", color: "var(--color-ink)" }}>
                    {cat.title}
                  </h2>
                </div>

                {cat.blurb && (
                  <p className="font-body leading-relaxed mb-6" style={{ fontSize: "14px", color: "rgba(26,34,24,0.6)" }}>
                    {cat.blurb}
                  </p>
                )}

                <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: GOLD }} />
                      <span className="font-body text-sm" style={{ color: "rgba(26,34,24,0.72)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* progress dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View ${categories[i].title}`}
                className="rounded-full transition-all duration-300"
                style={{ width: i === active ? 22 : 6, height: 6, background: i === active ? ACCENT : "rgba(36,48,40,0.18)" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA — cinematic engraved invitation ══ */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="/images/farmstead/badagran/gallery-5.webp"
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

        <div className="relative max-w-2xl mx-auto px-6 py-24 md:py-36">
          <Reveal>
            <div className="relative text-center px-8 py-14 md:px-16 md:py-20" style={{ border: "1px solid rgba(247,242,232,0.16)" }}>
              <span aria-hidden className="absolute top-4 left-4 w-6 h-6" style={{ borderTop: "1px solid rgba(212,168,83,0.7)", borderLeft: "1px solid rgba(212,168,83,0.7)" }} />
              <span aria-hidden className="absolute bottom-4 right-4 w-6 h-6" style={{ borderBottom: "1px solid rgba(212,168,83,0.7)", borderRight: "1px solid rgba(212,168,83,0.7)" }} />

              <div className="flex items-center justify-center gap-3 mb-7">
                <span className="h-px w-8" style={{ background: "rgba(212,168,83,0.6)" }} />
                <p className="font-body text-[9px] tracking-[0.44em] uppercase" style={{ color: "#f5d98a" }}>Come see for yourself</p>
                <span className="h-px w-8" style={{ background: "rgba(212,168,83,0.6)" }} />
              </div>

              <h2 className="italic mb-6 leading-[1.05]" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2rem,4.6vw,3.2rem)", color: "rgba(247,242,232,0.98)", letterSpacing: "-0.02em", textShadow: "0 6px 30px rgba(0,0,0,0.4)" }}>
                Ready to experience it yourself?
              </h2>

              <p className="font-body text-[14.5px] md:text-base mb-10 max-w-md mx-auto" style={{ color: "rgba(247,242,232,0.68)", lineHeight: 1.9 }}>
                You send a request, a real host confirms it by WhatsApp — usually
                within a few hours.
              </p>

              <Link
                href="/contact#form"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 font-body text-[13px] tracking-wide transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: ACCENT, color: "#fff", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(194,105,28,0.6)" }}
              >
                Book your stay
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}