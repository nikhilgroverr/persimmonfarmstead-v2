"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { quote: "Amazing host — it honestly felt like staying at my own place. We came for the mountains and left talking about the food.", name: "Ragghav M.", source: "Google", initials: "RM" },
  { quote: "Some of the best food we ate in Manali. Fresh juice at breakfast, everything made in-house. The owners genuinely look after you.", name: "A Verified Guest", source: "Google", initials: "VG" },
  { quote: "Gracious, attentive, genuinely welcoming hosts. They personally called to check our plans before we even arrived.", name: "A Verified Guest", source: "TripAdvisor", initials: "VG" },
  { quote: "Just a one-minute detour from the highway and you are in complete peace. Every room gets the morning sun — perfect in winter.", name: "Luv Sharma", source: "Google", initials: "LS" },
  { quote: "Woke up to snow-capped peaks right from the bed. Spotlessly clean, warm rooms, and a bonfire in the evening. Would return in a heartbeat.", name: "A Verified Guest", source: "TripAdvisor", initials: "VG" },
  { quote: "Cosy cottages, apple orchards, and a kitchen that punches well above its size. Pet-friendly too, which made the trip for us.", name: "A Verified Guest", source: "GoIbibo", initials: "VG" },
];

function pickThree(exclude: number[]): number[] {
  const pool = testimonials.map((_, i) => i);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, 3);
  if (exclude.length === 3 && picked.every((v) => exclude.includes(v))) {
    return pickThree(exclude);
  }
  return picked;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -30,
    scale: 0.96,
    filter: "blur(4px)",
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.4, 0, 1, 1] },
  }),
};

function Stars() {
  return (
    <div className="flex gap-1 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="url(#goldStar)">
          <defs>
            <linearGradient id="goldStar" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f0c987" />
              <stop offset="100%" stopColor="#b5703f" />
            </linearGradient>
          </defs>
          <path d="M12 2l2.95 6.9L22 9.6l-5.5 5 1.6 7.3L12 18.3 5.9 21.9l1.6-7.3L2 9.6l7.05-.7L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState<number[]>(() => pickThree([]));
  const [cycle, setCycle] = useState(0);

  const rotate = useCallback(() => {
    setActive((prev) => pickThree(prev));
    setCycle((c) => c + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(rotate, 5500);
    return () => clearInterval(timer);
  }, [rotate]);

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#0a1510" }}>
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span style={{ width: 26, height: 1, background: "#d4a853" }} />
            <span className="font-body text-[10px] tracking-[0.42em] uppercase" style={{ color: "#d4a853" }}>
              The Valley, In Their Words
            </span>
            <span style={{ width: 26, height: 1, background: "#d4a853" }} />
          </div>
          <h2
            className="font-display italic"
            style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.8rem)", color: "rgba(247,242,232,0.96)", letterSpacing: "-0.02em" }}
          >
            Three words come up again and again —<br className="hidden md:block" /> the food, the hosts, the view.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-7" style={{ minHeight: "380px" }}>
          <AnimatePresence mode="popLayout">
            {active.map((idx, slot) => {
              const t = testimonials[idx];
              return (
                <motion.div
                  key={`${cycle}-${idx}`}
                  custom={slot}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  className="relative group"
                  style={{
                    background: "linear-gradient(155deg, rgba(247,242,232,0.06), rgba(247,242,232,0.02))",
                    border: "1px solid rgba(212,168,83,0.22)",
                    borderRadius: "20px",
                    padding: "2.2rem 2rem",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    boxShadow: "0 30px 60px -24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(247,242,232,0.08)",
                  }}
                >
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "radial-gradient(circle, rgba(212,168,83,0.14) 0%, transparent 70%)",
                      borderRadius: "20px",
                    }}
                  />

                  <span
                    className="absolute font-display italic select-none pointer-events-none"
                    style={{ top: "-6px", right: "18px", fontSize: "72px", color: "rgba(212,168,83,0.1)", lineHeight: 1 }}
                  >
                    &rdquo;
                  </span>

                  <Stars />

                  <p
                    className="font-display text-[15.5px] leading-[1.75] mb-8 relative z-10"
                    style={{ color: "rgba(247,242,232,0.92)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(247,242,232,0.1)" }}>
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0 font-display italic text-[12px]"
                      style={{
                        width: 34,
                        height: 34,
                        background: "linear-gradient(135deg, #d4a853, #b5703f)",
                        color: "#1a2218",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-body text-[12.5px] font-semibold" style={{ color: "rgba(247,242,232,0.9)" }}>
                        {t.name}
                      </p>
                      <p className="font-body text-[10px] tracking-[0.1em] uppercase" style={{ color: "rgba(212,168,83,0.6)" }}>
                        {t.source}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-14">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                width: cycle % 4 === i ? 22 : 6,
                height: 6,
                background: cycle % 4 === i ? "#d4a853" : "rgba(247,242,232,0.2)",
                transition: "all 0.5s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}