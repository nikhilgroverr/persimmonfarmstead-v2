"use client";

import { motion } from "framer-motion";

const features = [
  {
    num: "01",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b5703f" strokeWidth="1.6">
        <path d="M12 2C8 6 6 10 6 13a6 6 0 0 0 12 0c0-3-2-7-6-11z" />
      </svg>
    ),
    title: "Orchard wanderings",
    desc: "Wander the rows at your own pace; in autumn, pick your own persimmons and apples.",
  },
  {
    num: "02",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b5703f" strokeWidth="1.6">
        <path d="M4 21h16M6 21V9a6 6 0 0 1 12 0v12M9 9h6" />
      </svg>
    ),
    title: "A farm-to-table table",
    desc: "Meals drawn from the kitchen garden and the day's market, plated the way a family would.",
  },
  {
    num: "03",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b5703f" strokeWidth="1.6">
        <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
      </svg>
    ),
    title: "Snow, and the trail beyond",
    desc: "White winters at the doorstep, and an easy base for the climb toward Hampta Pass.",
  },
  {
    num: "04",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b5703f" strokeWidth="1.6">
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
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Left — framed photo */}
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
                padding: "12px 12px 44px 12px",
                boxShadow: "0 40px 80px -30px rgba(43,27,17,0.35)",
                transform: "rotate(-1.5deg)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1596397249129-c7a8f8e05a4e?w=1200&q=80"
                alt="Apple harvest at Shanag"
                className="w-full rounded-lg"
                style={{ aspectRatio: "4/5", objectFit: "cover" }}
              />
              <p
                className="font-body text-[11px] tracking-[0.1em] uppercase absolute"
                style={{ bottom: 14, left: 24, color: "#4a3624" }}
              >
                Apple Harvest · Shanag
              </p>
            </div>
            <span
              className="absolute font-body text-[10px] tracking-[0.15em] uppercase rounded-full px-4 py-2"
              style={{ top: -14, right: -10, background: "#f7f2e8", color: "#8a5328", border: "1px solid rgba(181,112,63,0.3)", boxShadow: "0 8px 20px -8px rgba(43,27,17,0.3)" }}
            >
              Since 2021
            </span>
          </motion.div>

          {/* Right — content */}
          <div>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
              variants={fadeUp}
              className="font-body text-[10px] tracking-[0.4em] uppercase mb-5"
              style={{ color: "#b5703f" }}
            >
              III — A Base for the Valley
            </motion.p>

            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeUp}
              className="font-display italic mb-10"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "#2b1b11", letterSpacing: "-0.03em" }}
            >
              Not just a bed — a way in.
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  custom={i + 2}
                  variants={fadeUp}
                  className="pb-7"
                  style={{ borderBottom: "1px solid rgba(43,27,17,0.1)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    {f.icon}
                    <span className="font-body text-[11px] tracking-[0.1em]" style={{ color: "#c99a5f" }}>{f.num}</span>
                  </div>
                  <h3 className="font-display text-[17px] mb-2" style={{ color: "#2b1b11", fontWeight: 600 }}>
                    {f.title}
                  </h3>
                  <p className="font-body text-[13.5px] leading-[1.7]" style={{ color: "#6b5744" }}>
                    {f.desc}
                  </p>
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
              className="inline-flex items-center gap-2.5 font-body text-[13px] font-semibold tracking-wide rounded-full px-7 py-3.5 mt-10 transition-transform duration-300 hover:scale-[1.02]"
              style={{ border: "1.5px solid #2b1b11", color: "#2b1b11" }}
            >
              All the things to do
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}