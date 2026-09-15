"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#d4a853";

const testimonials = [
  { quote: "Amazing host — it honestly felt like staying at my own place. We came for the mountains and left talking about the food.", name: "Ragghav M.", source: "Google", initials: "RM" },
  { quote: "Some of the best food we ate in Manali. Fresh juice at breakfast, everything made in-house. The owners genuinely look after you.", name: "A Verified Guest", source: "Google", initials: "VG" },
  { quote: "Gracious, attentive, genuinely welcoming hosts. They personally called to check our plans before we even arrived.", name: "A Verified Guest", source: "TripAdvisor", initials: "VG" },
  { quote: "Just a one-minute detour from the highway and you are in complete peace. Every room gets the morning sun — perfect in winter.", name: "Luv Sharma", source: "Google", initials: "LS" },
  { quote: "Woke up to snow-capped peaks right from the bed. Spotlessly clean, warm rooms, and a bonfire in the evening. Would return in a heartbeat.", name: "A Verified Guest", source: "TripAdvisor", initials: "VG" },
  { quote: "Cosy cottages, apple orchards, and a kitchen that punches well above its size. Pet-friendly too, which made the trip for us.", name: "A Verified Guest", source: "GoIbibo", initials: "VG" },
];

function Stars() {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={GOLD}>
          <path d="M12 2l2.95 6.9L22 9.6l-5.5 5 1.6 7.3L12 18.3 5.9 21.9l1.6-7.3L2 9.6l7.05-.7L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const n = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);
  const prev = () => setActive((a) => (a - 1 + n) % n);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const t = testimonials[active];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#0a1510" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(212,168,83,0.08) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(181,112,63,0.1) 0%, transparent 50%)",
        }}
      />
      {/* faint grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,242,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(247,242,232,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span style={{ width: 26, height: 1, background: GOLD }} />
            <span className="font-body text-[10px] tracking-[0.42em] uppercase" style={{ color: GOLD }}>
              The Valley, In Their Words
            </span>
            <span style={{ width: 26, height: 1, background: GOLD }} />
          </div>
          <h2
            className="italic"
            style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.9rem, 4.2vw, 3.1rem)", color: "rgba(247,242,232,0.97)", letterSpacing: "-0.01em" }}
          >
            Three words come up again and again —<br className="hidden md:block" /> the food, the hosts, the view.
          </h2>
        </motion.div>

        {/* ── Spotlight panel — engraved-invitation style, same framing as the CTA bands ── */}
        <div className="relative px-8 py-16 md:px-20 md:py-20" style={{ border: "1px solid rgba(247,242,232,0.14)" }}>
          <span aria-hidden className="absolute top-5 left-5 w-7 h-7" style={{ borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}`, opacity: 0.75 }} />
          <span aria-hidden className="absolute bottom-5 right-5 w-7 h-7" style={{ borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}`, opacity: 0.75 }} />

          {/* giant faint quote mark */}
          <span
            aria-hidden
            className="absolute select-none pointer-events-none italic"
            style={{ fontFamily: "var(--font-accent)", top: "-1.5rem", left: "50%", transform: "translateX(-50%)", fontSize: "12rem", lineHeight: 1, color: "rgba(212,168,83,0.06)" }}
          >
            &rdquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center"
            >
              <Stars />
              <p
                className="italic mb-10 mx-auto"
                style={{ fontFamily: "var(--font-accent)", fontWeight: 500, fontSize: "clamp(1.4rem, 2.6vw, 2rem)", lineHeight: 1.6, color: "rgba(247,242,232,0.96)", maxWidth: "42ch" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0 italic text-[13px]"
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontWeight: 600,
                    width: 42,
                    height: 42,
                    background: "linear-gradient(135deg, #d4a853, #b5703f)",
                    color: "#1a2218",
                    boxShadow: "0 0 0 2px rgba(212,168,83,0.25)",
                  }}
                >
                  {t.initials}
                </div>
                <div className="text-left">
                  <p className="font-body text-[13px] font-semibold" style={{ color: "rgba(247,242,232,0.92)" }}>
                    {t.name}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.14em] uppercase" style={{ color: "rgba(212,168,83,0.65)" }}>
                    {t.source}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows + dots */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
            style={{ border: `1px solid rgba(212,168,83,0.4)`, color: GOLD }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="rounded-full transition-all duration-500"
                style={{ width: i === active ? 22 : 6, height: 6, background: i === active ? GOLD : "rgba(247,242,232,0.2)" }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
            style={{ border: `1px solid rgba(212,168,83,0.4)`, color: GOLD }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}