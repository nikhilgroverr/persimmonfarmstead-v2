"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function KitchenArticleSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.32]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ minHeight: "100vh", background: "#0c1a12" }}>
      <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=2000&q=80"
          alt="Himalayan valley at golden hour"
          className="w-full h-full object-cover"
          style={{ filter: "saturate(1.15) contrast(1.08) brightness(0.62)" }}
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(10,20,14,0.92) 0%, rgba(15,28,18,0.65) 42%, rgba(74,45,20,0.35) 78%, rgba(15,28,18,0.55) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(8,14,10,0.5) 0%, transparent 30%, transparent 70%, rgba(8,14,10,0.75) 100%)" }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.05,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-28 md:py-36">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 md:gap-20 items-center">
          <div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
              variants={fadeUp}
              className="flex items-center gap-3 mb-7"
            >
              <span style={{ width: 30, height: "1px", background: "#d98e4c" }} />
              <span className="font-body text-[10px] tracking-[0.4em] uppercase" style={{ color: "#d98e4c" }}>
                From Our Kitchen
              </span>
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeUp}
              className="font-display leading-[1.05] mb-8"
              style={{ fontSize: "clamp(2.3rem, 5vw, 4.2rem)", letterSpacing: "-0.025em" }}
            >
              <span style={{ color: "#f7f2e8" }}>Nothing here</span>
              <br />
              <span
                className="italic"
                style={{
                  background: "linear-gradient(90deg, #f0c987, #d98e4c 60%, #b5703f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                comes from a packet
              </span>
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={2}
              variants={fadeUp}
              className="font-body text-[15.5px] leading-[1.9] mb-9"
              style={{ color: "rgba(247,242,232,0.68)", maxWidth: "46ch" }}
            >
              <span
                className="font-display italic float-left mr-3 leading-none"
                style={{ fontSize: "3.6rem", color: "#d98e4c", marginTop: "0.05em" }}
              >
                E
              </span>
              very meal begins the same way it always has here — with
              whatever the garden and the day's market gave us. No fixed
              menu, no walk-in freezer, no shortcuts. Just a family cooking
              the way they would for their own table, and setting one more
              place for you.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={3}
              variants={fadeUp}
              className="flex items-start gap-4 mb-10 pl-1"
            >
              <svg width="22" height="16" viewBox="0 0 32 24" fill="#d98e4c" style={{ flexShrink: 0, marginTop: "2px", opacity: 0.7 }}>
                <path d="M0 24V13.8C0 6.2 4.8 1 12.6 0l1.2 4.4C8.4 5.6 6 8.6 6 13h6v11H0zm18 0V13.8C18 6.2 22.8 1 30.6 0l1.2 4.4c-5.4 1.2-7.8 4.2-7.8 8.6h6v11H18z"/>
              </svg>
              <div>
                <p className="font-display italic text-[18px] mb-1.5" style={{ color: "#f7f2e8" }}>
                  Tasted like someone's grandmother had cooked it herself.
                </p>
                <p className="font-body text-[10.5px] tracking-[0.15em] uppercase" style={{ color: "rgba(247,242,232,0.4)" }}>
                  — A Guest, on TripAdvisor
                </p>
              </div>
            </motion.div>

            <motion.a
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              custom={4}
              variants={fadeUp}
              href="/our-story"
              className="group inline-flex items-center gap-3 font-body text-[12px] font-semibold tracking-[0.18em] uppercase rounded-full pl-1 pr-1.5 py-1.5"
              style={{ border: "1px solid rgba(217,142,76,0.35)", color: "#f0c987" }}
            >
              <span className="pl-5">Taste the story</span>
              <span
                className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ width: 30, height: 30, background: "linear-gradient(135deg, #d98e4c, #b5703f)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a2218" strokeWidth="2.8">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: cardY }}
            className="relative hidden md:block"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 50px 100px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(217,142,76,0.15)",
                transform: "rotate(2deg)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1000&q=80"
                alt="Farm kitchen table, Persimmon Farmstead"
                className="w-full"
                style={{ aspectRatio: "4/5", objectFit: "cover" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.65) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-body text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(247,242,232,0.7)" }}>
                  Made In-House · Daily
                </p>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 pointer-events-none" style={{ width: 36, height: 36, borderTop: "1.5px solid #d98e4c", borderLeft: "1.5px solid #d98e4c" }} />
            <div className="absolute -bottom-4 -right-4 pointer-events-none" style={{ width: 36, height: 36, borderBottom: "1.5px solid #d98e4c", borderRight: "1.5px solid #d98e4c" }} />

            <div
              className="absolute font-display italic text-center rounded-full flex flex-col items-center justify-center"
              style={{
                top: "-24px",
                right: "-24px",
                width: 84,
                height: 84,
                background: "linear-gradient(135deg, #f0c987, #b5703f)",
                boxShadow: "0 20px 40px -12px rgba(181,112,63,0.55)",
                transform: "rotate(-6deg)",
              }}
            >
              <span className="text-[10px] not-italic tracking-[0.1em] uppercase" style={{ color: "#1a2218" }}>Est.</span>
              <span className="text-[20px]" style={{ color: "#1a2218" }}>2021</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}