"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rooms, type Room } from "@/lib/rooms";

const ACCENT = "#c2691c";

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

/* ── Editorial horizontal filmstrip gallery (scroll / drag, hover to straighten) ── */
function FilmstripGallery({ images, alt, caption }: { images: string[]; alt: string; caption: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const step = (d: number) => trackRef.current?.scrollBy({ left: d * 340, behavior: "smooth" });
  return (
    <div className="relative">
      <div
        className="relative rounded-2xl md:rounded-[28px] overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 42%, #f4ecdc 0%, #ece0cd 60%, #e4d7c0 100%)" }}
      >
        <div
          ref={trackRef}
          className="flex items-center overflow-x-auto snap-x snap-mandatory px-[16%] md:px-[22%] py-14 md:py-16 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((src, i) => {
            const rot = [-4, 3, -3, 4, -2, 3][i % 6];
            const shift = i % 2 === 0 ? -16 : 22;
            return (
              <motion.div
                key={i}
                className="snap-center flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer"
                style={{
                  width: "clamp(200px, 21vw, 292px)",
                  aspectRatio: "3/4",
                  marginLeft: i === 0 ? 0 : -28,
                  marginTop: reduce ? 0 : shift,
                  rotate: reduce ? 0 : rot,
                  zIndex: 1,
                  border: "1px solid rgba(26,34,24,0.18)",
                  boxShadow: "0 36px 62px -34px rgba(43,27,17,0.6)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { rotate: 0, scale: 1.06, y: -10, zIndex: 40, transition: { type: "spring", stiffness: 220, damping: 20 } }}
              >
                <img src={src} alt={`${alt} — photo ${i + 1}`} className="w-full h-full object-cover select-none" draggable={false} />
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* controls + caption */}
      <div className="flex items-center justify-between gap-4 mt-5 px-1">
        <button onClick={() => step(-1)} aria-label="Previous photo"
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110"
          style={{ border: "1px solid rgba(36,48,40,0.2)", color: "var(--color-ink)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="text-center min-w-0">
          <p className="font-display italic text-base md:text-lg leading-tight truncate" style={{ color: "rgba(26,34,24,0.72)" }}>{alt}</p>
          <p className="font-body text-[10px] tracking-[0.22em] uppercase mt-1" style={{ color: "rgba(26,34,24,0.4)" }}>{caption}</p>
        </div>
        <button onClick={() => step(1)} aria-label="Next photo"
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110"
          style={{ border: "1px solid rgba(36,48,40,0.2)", color: "var(--color-ink)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ── Feature card (engaging card-view for details / included) ── */
function FeatureCard({ text, kind }: { text: string; kind: "detail" | "included" }) {
  return (
    <motion.div
      className="flex items-center gap-3.5 rounded-2xl px-5 py-4 transition-all duration-300"
      style={{ background: "#faf6ee", border: "1px solid rgba(36,48,40,0.09)" }}
      whileHover={{ y: -3, boxShadow: "0 18px 40px -24px rgba(43,27,17,0.4)" }}
    >
      <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: kind === "included" ? "rgba(194,105,28,0.1)" : "rgba(107,142,90,0.12)", border: `1px solid ${kind === "included" ? "rgba(194,105,28,0.28)" : "rgba(107,142,90,0.3)"}` }}>
        {kind === "included" ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b8e5a" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg>
        )}
      </span>
      <span className="font-body text-[14px] leading-snug" style={{ color: "rgba(26,34,24,0.75)" }}>{text}</span>
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

export default function RoomDetail({ room }: { room: Room }) {
  const others = rooms.filter((r) => r.slug !== room.slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);

  return (
    <main style={{ background: "var(--color-cream-soft)" }}>
      <Navbar />
      <div className="fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(26,34,24,0.18), transparent)" }} aria-hidden />

      {/* ══ HERO ══ */}
      <section className="relative w-full px-5 md:px-12 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-2 mb-6" style={{ color: ACCENT }}>
              <PinIcon />
              <span className="font-body text-[11px] tracking-[0.22em] uppercase">Persimmon Farmstead · {room.location}</span>
            </div>
          </Reveal>

          <div ref={heroRef} className="relative rounded-2xl md:rounded-[32px] overflow-hidden" style={{ aspectRatio: "16/9", boxShadow: "0 55px 110px -55px rgba(43,27,17,0.55)" }}>
            <motion.img src={room.img} alt={room.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: imgY, scale: 1.16 }}
              initial={{ scale: reduce ? 1.16 : 1.24 }} animate={{ scale: 1.16 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,8,6,0.55) 0%, transparent 42%)" }} />
            <div className="absolute top-5 left-5">
              <span className="font-body text-[9px] tracking-[0.24em] uppercase px-3.5 py-2 rounded-full"
                style={{ background: "rgba(247,242,232,0.92)", color: "#8a5328", border: "1px solid rgba(181,112,63,0.25)", backdropFilter: "blur(6px)" }}>{room.tag}</span>
            </div>
          </div>

          <Reveal delay={0.05}>
            <div className="relative -mt-16 md:-mt-24 mx-auto md:mx-6 rounded-2xl md:rounded-[26px] p-6 md:p-9"
              style={{ background: "#faf6ee", border: "1px solid rgba(36,48,40,0.08)", boxShadow: "0 40px 80px -40px rgba(43,27,17,0.4)" }}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center gap-1.5"><Stars /><span className="font-body text-[12px] ml-1" style={{ color: "rgba(26,34,24,0.55)" }}>4.9 · 141+ reviews</span></div>
              </div>
              <h1 className="font-display leading-[1.02] mb-4" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "var(--color-ink)", letterSpacing: "-0.02em" }}>{room.name}</h1>
              <p className="font-body text-base leading-[1.7] mb-7 max-w-2xl" style={{ color: "rgba(26,34,24,0.6)" }}>{room.short}</p>

              <div className="grid grid-cols-3 gap-3 mb-7 max-w-xl">
                {[{ k: "Sleeps", v: room.guests }, { k: "Bed", v: room.bed }, { k: "View", v: room.view }].map((s) => (
                  <div key={s.k} className="rounded-2xl px-3 py-4 text-center" style={{ background: "var(--color-cream-soft)", border: "1px solid rgba(36,48,40,0.08)" }}>
                    <p className="font-body text-[9px] tracking-[0.2em] uppercase mb-1.5" style={{ color: ACCENT }}>{s.k}</p>
                    <p className="font-body text-[13px] leading-tight" style={{ color: "var(--color-ink)" }}>{s.v}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact#form"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 font-body text-[13px] tracking-wide transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: ACCENT, color: "#fff", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(194,105,28,0.6)" }}>
                  Request these dates <Arrow size={14} />
                </Link>
                <a href="https://wa.me/916230645166" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-body text-[13px] tracking-wide transition-colors duration-200"
                  style={{ border: "1px solid rgba(36,48,40,0.2)", color: "rgba(26,34,24,0.7)" }}>
                  WhatsApp us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ ARTICLE ══ */}
      <section className="relative w-full px-5 md:px-12 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <Reveal><SectionHead eyebrow="The room" title="About this stay" /></Reveal>
          {room.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <p className="font-body text-[15.5px] md:text-[16.5px] leading-[1.95] mb-6" style={{ color: "rgba(26,34,24,0.7)" }}>{para}</p>
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl p-6 md:p-8 mt-4" style={{ background: "#faf6ee", borderLeft: `3px solid ${ACCENT}` }}>
              <span className="font-display italic absolute -top-3 left-5 select-none" style={{ fontSize: "3rem", lineHeight: 1, color: "rgba(194,105,28,0.28)" }}>&ldquo;</span>
              <p className="font-display italic text-base md:text-lg leading-[1.7] pt-1" style={{ color: "rgba(26,34,24,0.58)" }}>{room.quote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ GALLERY (scattered collage) ══ */}
      <section className="relative w-full px-5 md:px-12 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <Reveal><SectionHead eyebrow="A closer look" title="Room gallery" sub="Scroll or drag sideways through the frames — hover to bring one forward." /></Reveal>
          <Reveal delay={0.06}>
            <FilmstripGallery images={room.gallery} alt={room.name} caption={`Persimmon Farmstead · ${room.location}`} />
          </Reveal>
        </div>
      </section>

      {/* ══ FEATURES — card view ══ */}
      <section className="relative w-full px-5 md:px-12 pb-16 md:pb-24 pt-16" style={{ borderTop: "1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <Reveal><SectionHead eyebrow="In this room" title="The details" /></Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.details.map((d, i) => (
                <Reveal key={d} delay={i * 0.04}><FeatureCard text={d} kind="detail" /></Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal><SectionHead eyebrow="What's included" title="Included" /></Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.included.map((d, i) => (
                <Reveal key={d} delay={i * 0.04}><FeatureCard text={d} kind="included" /></Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-14 md:mt-16 pt-10" style={{ borderTop: "1px solid rgba(36,48,40,0.07)" }}>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="h-px w-8" style={{ background: "var(--color-terracotta)" }} />
                <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>Who it suits</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {room.bestFor.map((b) => (
                  <span key={b} className="font-body text-[13px] px-5 py-2.5 rounded-full" style={{ background: "#faf6ee", border: "1px solid rgba(36,48,40,0.12)", color: "rgba(26,34,24,0.68)" }}>{b}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA band ══ */}
      <section className="relative w-full px-5 md:px-12 py-16 md:py-20" style={{ background: "#f5ebdd", borderTop: "1px solid rgba(36,48,40,0.08)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display italic mb-4" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--color-ink)", letterSpacing: "-0.02em" }}>Like the look of it?</h2>
            <p className="font-body text-sm md:text-base mb-8 max-w-md mx-auto" style={{ color: "rgba(26,34,24,0.55)", lineHeight: 1.9 }}>
              Send a request and a real host confirms your dates — usually within a few hours.
            </p>
            <Link href="/contact#form"
              className="inline-flex items-center gap-2.5 rounded-full px-9 py-4 font-body text-[13px] tracking-wide transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: ACCENT, color: "#fff", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(194,105,28,0.6)" }}>
              Request these dates <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ OTHER ROOMS ══ */}
      <section className="relative w-full px-5 md:px-12 py-16 md:py-24" style={{ borderTop: "1px solid rgba(36,48,40,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal><p className="font-body text-[9px] tracking-[0.42em] uppercase mb-8" style={{ color: "var(--color-terracotta-dark)" }}>Other rooms</p></Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {others.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08}>
                <Link href={`/rooms/${r.slug}`} className="group flex items-center gap-5 rounded-2xl p-3 transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ background: "#faf6ee", border: "1px solid rgba(36,48,40,0.08)" }}>
                  <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 132, height: 100 }}>
                    <img src={r.img} alt={r.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: ACCENT }}>{r.tag}</p>
                    <h3 className="font-display text-lg md:text-xl mb-0.5 leading-tight" style={{ color: "var(--color-ink)" }}>{r.name}</h3>
                    <p className="font-body text-[12px]" style={{ color: "rgba(26,34,24,0.5)" }}>{r.guests} · {r.bed}</p>
                  </div>
                  <span className="flex-shrink-0 pr-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: ACCENT }}><Arrow size={16} /></span>
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
