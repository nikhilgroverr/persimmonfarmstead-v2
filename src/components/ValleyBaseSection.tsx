"use client";

import { motion } from "framer-motion";

const ACCENT = "#b5703f";
const GOLD = "#c99a5f";
const INK = "#2b1b11";

const features = [
  {
    num: "01",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2C8 6 6 10 6 13a6 6 0 0 0 12 0c0-3-2-7-6-11z" />
      </svg>
    ),
    title: "Orchard wanderings",
    desc: "Wander the rows at your own pace; in autumn, pick your own persimmons and apples.",
  },
  {
    num: "02",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 21h16M6 21V9a6 6 0 0 1 12 0v12M9 9h6" />
      </svg>
    ),
    title: "A farm-to-table table",
    desc: "Meals drawn from the kitchen garden and the day's market, plated the way a family would.",
  },
  {
    num: "03",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
      </svg>
    ),
    title: "Snow, and the trail beyond",
    desc: "White winters at the doorstep, and an easy base for the climb toward Hampta Pass.",
  },
  {
    num: "04",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
      </svg>
    ),
    title: "Every companion welcome",
    desc: "Bring the dog — both homes sit on open orchard lawns built for exactly that kind of roaming.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function ValleyBaseSection() {
  return (
    <section style={{ background: "#f5ebdd" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
          {/* Left — framed photo + short story beneath it */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "#fff",
                padding: "12px",
                boxShadow: "0 45px 90px -32px rgba(43,27,17,0.4)",
                transform: "rotate(-1.5deg)",
              }}
            >
              <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img
                  src="https://images.unsplash.com/photo-1596397249129-c7a8f8e05a4e?w=1200&q=80"
                  alt="Apple harvest at Shanag"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div aria-hidden className="absolute inset-1.5 rounded pointer-events-none" style={{ border: `1px solid ${GOLD}88` }} />
                <span aria-hidden className="absolute top-3.5 left-3.5 w-5 h-5 pointer-events-none" style={{ borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}`, opacity: 0.85 }} />
                <span aria-hidden className="absolute bottom-3.5 right-3.5 w-5 h-5 pointer-events-none" style={{ borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}`, opacity: 0.85 }} />
              </div>
            </div>
            <span
              className="absolute font-body text-[10px] tracking-[0.15em] uppercase rounded-full px-4 py-2"
              style={{ top: -14, right: -10, background: "#f7f2e8", color: "#8a5328", border: "1px solid rgba(181,112,63,0.3)", boxShadow: "0 8px 20px -8px rgba(43,27,17,0.3)" }}
            >
              Since 2021
            </span>

            {/* Short story beneath the photo — a real read, not a one-line caption */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-md"
            >
              <div className="flex items-center gap-3 mb-3.5">
                <span className="h-px w-7" style={{ background: ACCENT, opacity: 0.7 }} />
                <p className="font-body text-[9px] tracking-[0.32em] uppercase" style={{ color: ACCENT }}>
                  A Story From The Orchard
                </p>
              </div>
              <p className="font-body leading-[1.85]" style={{ fontSize: "14px", color: "#6b5744" }}>
                <span
                  className="italic float-left mr-2.5 mt-0.5"
                  style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "2.6rem", lineHeight: "0.75", color: ACCENT }}
                >
                  E
                </span>
                very October the orchard turns from green to red almost overnight, or so it feels. Guests who happen to be here that week get handed a basket and pointed toward whichever tree looks heaviest —
                the harvest doesn&apos;t wait for anyone&apos;s itinerary, and neither should you.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
              variants={fadeUp}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
              <p className="font-body text-[10px] tracking-[0.4em] uppercase" style={{ color: ACCENT }}>
                III — A Base for the Valley
              </p>
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeUp}
              className="italic mb-4"
              style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.9rem, 4vw, 3rem)", color: INK, letterSpacing: "-0.02em" }}
            >
              Not just a bed — a way in.
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={1.4}
              variants={fadeUp}
              className="flex items-center gap-2.5 mb-10"
              aria-hidden
            >
              <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: GOLD, opacity: 0.85 }} />
              <span className="h-px w-14" style={{ background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  custom={i + 2}
                  variants={fadeUp}
                  className="group relative pt-6 pb-7 transition-colors duration-500"
                  style={{ borderBottom: "1px solid rgba(43,27,17,0.1)" }}
                >
                  <div className="flex items-center justify-between mb-4 transition-transform duration-500 group-hover:translate-x-1.5">
                    <span
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      style={{ background: "rgba(181,112,63,0.12)", color: ACCENT }}
                    >
                      {f.icon}
                    </span>
                    <span className="italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "13px", color: GOLD }}>{f.num}</span>
                  </div>
                  <h3
                    className="italic leading-tight mb-2 transition-transform duration-500 group-hover:translate-x-1.5"
                    style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.05rem, 2.2vw, 1.2rem)", color: INK }}
                  >
                    {f.title}
                  </h3>
                  <p className="font-body leading-[1.7] transition-transform duration-500 group-hover:translate-x-1.5" style={{ fontSize: "13.5px", color: "#6b5744" }}>
                    {f.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 h-px overflow-hidden" style={{ width: "100%" }}>
                    <div className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: ACCENT }} />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={6}
              variants={fadeUp}
              href="/amenities"
              className="group inline-flex items-center gap-2.5 font-body text-[13px] font-semibold tracking-wide rounded-full px-7 py-3.5 mt-10 transition-all duration-300 hover:scale-[1.02]"
              style={{ background: INK, color: "#f7f2e8" }}
            >
              All the things to do
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}