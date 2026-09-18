"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

const properties = [
  {
    name: "Persimmon Farmstead",
    tag: "Badgran (14 Mile) · Manali",
    blurb: "Our flagship boutique hotel, a minute off the highway with mountain views from every room.",
    img: "/images/farmstead/badagran/gallery-1.webp",
    mapSrc: "https://www.google.com/maps?q=32.1303243,77.1551243&z=16&output=embed",
    mapLink: "https://www.google.com/maps/place/Persimmon+Farmstead/@32.1303243,77.1551243,17z/data=!3m1!4b1!4m9!3m8!1s0x39048be9ad5a4fc5:0xb3ae3cff4d4070b0!5m2!4m1!1i2!8m2!3d32.1303243!4d77.1551243!16s%2Fg%2F11qgk86jvw",
    coords: "32.1303° N, 77.1551° E",
    href: "/stays/farmstead",
    num: "01",
  },
  {
    name: "Persimmon Farmstead Shanag",
    tag: "Shanag (Bahang) · Manali",
    blurb: "Wooden chalets and stone cottages across wide orchard lawns, close to Old Manali.",
    img: "/images/shanag/KIN01880.webp",
    mapSrc: "https://www.google.com/maps?q=32.2855603,77.1741389&z=16&output=embed",
    mapLink: "https://www.google.com/maps/place/Persimmon+farmstead+shanag/@32.2855603,77.1741389,17z/data=!4m9!3m8!1s0x390487d8ca344499:0xfa94767797d92743!5m2!4m1!1i2!8m2!3d32.2855603!4d77.1741389!16s%2Fg%2F11mllkrp9w",
    coords: "32.2856° N, 77.1741° E",
    href: "/stays/shanag",
    num: "02",
  },
];

const whatsappIcon = "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.44 1.32 4.94L2 22l5.29-1.39c1.44.79 3.08 1.21 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.5 14.1c-.23.65-1.36 1.24-1.88 1.31-.48.07-1.08.1-1.75-.11-.4-.13-.92-.3-1.58-.59-2.78-1.2-4.6-4-4.74-4.19-.14-.19-1.13-1.5-1.13-2.86s.71-2.03.97-2.31c.25-.28.54-.35.72-.35.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.55.78 1.9.84 2.04.07.14.11.3.02.48-.09.18-.14.29-.28.45-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.2 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.45.2.51.32.07.11.07.66-.16 1.31z";

function Arrow({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
function PhoneIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
}
function MailIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>;
}

/* ── Location — two genuinely separate cards, not one merged block:
     an info card (photo/name/blurb) and its own map card below it, each
     with independent shadow, radius, and hover lift. Each carries a
     small chapter numeral, echoing the numbered-story motif used
     elsewhere on the site. ── */
function LocationCard({ property, i }: { property: (typeof properties)[0]; i: number }) {
  return (
    <div className="relative flex flex-col gap-6">
      <span
        aria-hidden
        className="hidden md:block absolute select-none pointer-events-none italic"
        style={{
          fontFamily: "var(--font-accent)", fontWeight: 600,
          top: "-2rem", right: "0.5rem", fontSize: "6rem", lineHeight: 1,
          color: "transparent", WebkitTextStroke: "1px rgba(36,48,40,0.06)",
        }}
      >
        {property.num}
      </span>

      {/* Info card */}
      <Reveal delay={0.1 + i * 0.12} y={40}>
        <motion.div
          className="group relative overflow-hidden rounded-[26px]"
          style={{ background: "#fffdf8", border: "1px solid rgba(36,48,40,0.08)", boxShadow: "0 35px 70px -35px rgba(43,27,17,0.4)" }}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
            <img src={property.img} alt={property.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,19,15,0.88) 0%, rgba(13,19,15,0.12) 55%, transparent 75%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
              <p className="font-body text-[9px] tracking-[0.3em] uppercase mb-2.5" style={{ color: "rgba(212,168,83,0.9)" }}>{property.tag}</p>
              <h3 className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.9rem,3.4vw,2.5rem)", color: "rgba(247,242,232,0.98)", textShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
                {property.name}
              </h3>
            </div>
          </div>
          <div className="p-7 md:p-8">
            <p className="font-body text-[14px] leading-relaxed" style={{ color: "rgba(26,34,24,0.6)" }}>{property.blurb}</p>
          </div>
        </motion.div>
      </Reveal>

      {/* Map card — a fully separate card, own shadow and lift */}
      <Reveal delay={0.18 + i * 0.12} y={40}>
        <motion.div
          className="relative overflow-hidden rounded-[26px] p-6 md:p-7"
          style={{ background: "#fffdf8", border: "1px solid rgba(36,48,40,0.08)", boxShadow: "0 35px 70px -35px rgba(43,27,17,0.4)" }}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
            <p className="font-body text-[9px] tracking-[0.28em] uppercase" style={{ color: ACCENT }}>Find this property</p>
          </div>
          <div className="relative p-2 rounded-2xl" style={{ background: "#f2ecdc" }}>
            <div className="relative overflow-hidden rounded-xl" style={{ height: "210px" }}>
              <iframe
                title={`${property.name} location map`}
                src={property.mapSrc}
                className="w-full h-full border-0"
                style={{ filter: "grayscale(0.3) sepia(0.15) saturate(0.85) contrast(1.05) brightness(1.02)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div aria-hidden className="absolute inset-1.5 rounded-lg pointer-events-none" style={{ border: "1px solid rgba(212,168,83,0.5)" }} />
            </div>
            <span aria-hidden className="absolute top-3 left-3 w-5 h-5 pointer-events-none" style={{ borderTop: `1px solid ${ACCENT}`, borderLeft: `1px solid ${ACCENT}`, opacity: 0.8 }} />
            <span aria-hidden className="absolute bottom-3 right-3 w-5 h-5 pointer-events-none" style={{ borderBottom: `1px solid ${ACCENT}`, borderRight: `1px solid ${ACCENT}`, opacity: 0.8 }} />
          </div>
          <div className="flex items-center justify-between gap-3 mt-4">
            <p className="font-body text-[11px] italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, color: "rgba(26,34,24,0.5)" }}>{property.coords}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <a href={property.mapLink} target="_blank" rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-body text-[11px] tracking-[0.14em] uppercase rounded-full px-5 py-2.5 transition-all duration-300"
              style={{ border: `1px solid rgba(194,105,28,0.4)`, color: ACCENT }}>
              Open in Maps
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform duration-300 group-hover/link:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href={property.href}
              className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.14em] uppercase rounded-full px-5 py-2.5 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: ACCENT, color: "#fff" }}>
              View Property <Arrow size={11} />
            </a>
          </div>
        </motion.div>
      </Reveal>
    </div>
  );
}

export default function ContactPage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  // hero mouse parallax (depth) — same technique used on the Farmstead hero
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

      {/* ══ HERO ══ */}
      <section
        ref={heroRef}
        onMouseMove={heroMove}
        onMouseLeave={heroLeave}
        className="relative w-full overflow-hidden"
        style={{ height: "78vh", minHeight: "560px", display: "flex", alignItems: "flex-end" }}
      >
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <motion.img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90"
            alt="Kullu valley, Manali"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55) saturate(0.9)", x: bgX, y: bgY, scale: 1.06 }}
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,14,10,0.25) 0%, rgba(8,14,10,0.1) 35%, rgba(8,14,10,0.9) 100%)" }} />

        {/* drifting ghost word — depth cue matching the Farmstead hero */}
        <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-14 pointer-events-none overflow-hidden" aria-hidden>
          <motion.span
            className="italic select-none whitespace-nowrap"
            style={{
              fontFamily: "var(--font-accent)", fontWeight: 600,
              fontSize: "clamp(60px,13vw,200px)", letterSpacing: "-0.03em",
              color: "transparent", WebkitTextStroke: "1px rgba(247,242,232,0.06)", lineHeight: 1,
              x: ghostX, y: ghostY,
            }}
          >
            Reach us
          </motion.span>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-12 pb-16 md:pb-24 pt-40">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <motion.span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: GOLD }}
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <span className="font-body text-[10px] md:text-[11px] tracking-[0.32em] uppercase" style={{ color: "rgba(212,168,83,0.8)" }}>
                Two Homes · One Family
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="italic leading-[1.02] mb-5" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.8rem,7.5vw,5.6rem)", letterSpacing: "-0.01em", color: "rgba(247,242,232,0.98)", textShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
              Let&apos;s plan your stay.
            </h1>
          </Reveal>
          <Reveal delay={0.13}>
            <div className="mb-6" style={{ height: "1.5px", width: "60px", background: "linear-gradient(to right, rgba(212,168,83,0.9), transparent)", borderRadius: "2px" }} />
          </Reveal>
          <Reveal delay={0.18}>
            <p className="font-body text-[15px] md:text-[17px] leading-[1.75] max-w-xl" style={{ color: "rgba(247,242,232,0.78)" }}>
              WhatsApp us or call directly — a real host confirms your dates, usually within a few hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ TWO LOCATIONS ══ */}
      <section className="relative w-full py-20 md:py-28 px-5 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <Reveal>
            <div className="text-center mb-14 md:mb-16 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
                <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>Our properties</p>
                <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
              </div>
              <h2 className="italic leading-tight mb-4" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.1rem,4.2vw,3.2rem)", color: "var(--color-ink)" }}>
                Two locations, one promise.
              </h2>
              <p className="font-body text-sm md:text-base" style={{ color: "rgba(26,34,24,0.5)", lineHeight: 1.8 }}>
                The same kitchen and the same welcome, on two different corners of the valley.
              </p>
            </div>
          </Reveal>

          {/* connecting thread between the two properties — unique to this
              page, visually ties the "two homes, one family" idea to the
              two cards sitting side by side */}
          <div aria-hidden className="hidden md:block absolute left-0 right-0 pointer-events-none" style={{ top: "18%" }}>
            <svg viewBox="0 0 100 6" preserveAspectRatio="none" className="w-full" style={{ height: "6px" }}>
              <line x1="0" y1="3" x2="100" y2="3" stroke={GOLD} strokeWidth="0.3" strokeDasharray="1.2 1.6" opacity="0.55" />
            </svg>
            <div className="flex justify-center -mt-3">
              <span
                className="font-body text-[9px] tracking-[0.24em] uppercase px-3.5 py-1.5 rounded-full"
                style={{ background: "var(--color-cream-soft)", color: "rgba(26,34,24,0.4)", border: "1px solid rgba(212,168,83,0.35)" }}
              >
                18 km apart, same valley
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {properties.map((property, i) => (
              <LocationCard key={property.name} property={property} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT DETAILS — engraved-invitation card, no form ══ */}
      <section id="form" className="relative w-full overflow-hidden scroll-mt-24 py-20 md:py-28 px-5 md:px-12" style={{ background: "#f2ecdc" }}>
        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            <motion.div
              className="relative text-center px-8 py-14 md:px-16 md:py-20 rounded-[32px] overflow-hidden"
              style={{ background: "#fffdf8", border: "1px solid rgba(36,48,40,0.08)", boxShadow: "0 45px 90px -35px rgba(43,27,17,0.42)" }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
            >
              {/* giant faint quote mark, the same motif your CTA bands use */}
              <span
                aria-hidden
                className="absolute select-none pointer-events-none italic"
                style={{ fontFamily: "var(--font-accent)", top: "-1rem", left: "50%", transform: "translateX(-50%)", fontSize: "11rem", lineHeight: 1, color: "rgba(194,105,28,0.045)" }}
              >
                &rdquo;
              </span>

              {/* gold corner brackets — the "engraved invitation" frame */}
              <span aria-hidden className="absolute top-5 left-5 w-6 h-6 pointer-events-none" style={{ borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}`, opacity: 0.7 }} />
              <span aria-hidden className="absolute bottom-5 right-5 w-6 h-6 pointer-events-none" style={{ borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}`, opacity: 0.7 }} />

              <div className="relative flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
                <p className="font-body text-[9px] tracking-[0.44em] uppercase" style={{ color: ACCENT }}>For reservations</p>
                <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
              </div>
              <h2 className="relative italic mb-4 leading-[1.05]" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.2rem,4.6vw,3.4rem)", color: "var(--color-ink)", letterSpacing: "-0.01em" }}>
                Speak with us directly.
              </h2>

              <div className="relative flex items-center justify-center gap-2.5 mb-12">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: ACCENT }}
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <p className="font-body text-[11px] italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 500, color: "rgba(26,34,24,0.45)" }}>
                  Usually replies within a few hours
                </p>
              </div>

              <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
                {[
                  {
                    icon: <PhoneIcon />, label: "Call us",
                    content: (
                      <>
                        <a href="tel:+916230645166" className="block font-body text-[15px] mb-1.5 transition-colors" style={{ color: "var(--color-ink)" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ACCENT; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-ink)"; }}>+91 62306 45166</a>
                        <a href="tel:+919999975545" className="block font-body text-[15px] transition-colors" style={{ color: "var(--color-ink)" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ACCENT; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-ink)"; }}>+91 99999 75545</a>
                      </>
                    ),
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d={whatsappIcon} /></svg>, label: "WhatsApp us",
                    content: (
                      <div className="flex items-center justify-center gap-2.5">
                        {[{ l: "+91 62306 45166", r: "916230645166" }, { l: "+91 99999 75545", r: "919999975545" }, { l: "+91 91388 81116", r: "919138881116" }].map((p) => (
                          <a key={p.r} href={`https://wa.me/${p.r}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${p.l}`} title={p.l}
                            className="inline-flex items-center justify-center rounded-full transition-all duration-300"
                            style={{ width: 36, height: 36, border: `1px solid rgba(194,105,28,0.35)`, color: ACCENT }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(194,105,28,0.1)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={whatsappIcon} /></svg>
                          </a>
                        ))}
                      </div>
                    ),
                  },
                  {
                    icon: <MailIcon />, label: "Email us",
                    content: (
                      <a href="mailto:reservations@persimmonfarmstead.com" className="font-body text-[13.5px] leading-relaxed break-all transition-colors" style={{ color: "var(--color-ink)" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ACCENT; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-ink)"; }}>
                        reservations@persimmonfarmstead.com
                      </a>
                    ),
                  },
                ].map((col, ci) => (
                  <motion.div key={col.label} className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.15 + ci * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                    <motion.span
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                      style={{ background: "rgba(194,105,28,0.08)", color: ACCENT }}
                      whileHover={{ scale: 1.1, rotate: 6 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {col.icon}
                    </motion.span>
                    <p className="font-body text-[10px] tracking-[0.28em] uppercase mb-3" style={{ color: "rgba(26,34,24,0.45)" }}>{col.label}</p>
                    {col.content}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}