"use client";

import { motion } from "framer-motion";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
    label: "Room With a Valley",
    rotate: -3,
    lift: false,
  },
  {
    src: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=900&q=80",
    label: "After Dark",
    rotate: 2,
    lift: true,
  },
  {
    src: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80",
    label: "In the Orchard",
    rotate: -2,
    lift: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function GallerySection() {
  return (
    <section style={{ background: "#f5ebdd" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          variants={fadeUp}
          className="font-body text-[10px] tracking-[0.42em] uppercase mb-5"
          style={{ color: "#b5703f" }}
        >
          Field Notes
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={1}
          variants={fadeUp}
          className="font-display italic mb-5"
          style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)", color: "#2b1b11", letterSpacing: "-0.03em" }}
        >
          Frames from both homes.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={2}
          variants={fadeUp}
          className="font-body text-[15px] leading-[1.8] mb-16 md:mb-20 mx-auto"
          style={{ color: "#6b5744", maxWidth: "52ch" }}
        >
          Real frames from Hallan Valley and Shanag — the kitchen, the
          orchard, a vintage arrival, and the peaks going dark over the
          chalets. A visual diary that keeps changing.
        </motion.p>

        <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 mb-16">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              variants={fadeUp}
              className={p.lift ? "md:-mt-10" : ""}
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              <div
                className="relative"
                style={{
                  background: "#fff",
                  padding: "10px 10px 40px 10px",
                  borderRadius: "10px",
                  boxShadow: "0 30px 60px -20px rgba(43,27,17,0.3)",
                  width: "240px",
                }}
              >
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full rounded-sm"
                  style={{ aspectRatio: "4/5", objectFit: "cover" }}
                />
                <p
                  className="font-body text-[10px] tracking-[0.15em] uppercase absolute"
                  style={{ bottom: 14, left: 20, color: "#4a3624" }}
                >
                  {p.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          custom={3}
          variants={fadeUp}
          href="/gallery"
          className="inline-flex items-center gap-2.5 font-body text-[13px] font-semibold tracking-wide rounded-full px-8 py-3.5 transition-transform duration-300 hover:scale-[1.02]"
          style={{ border: "1.5px solid #2b1b11", color: "#2b1b11" }}
        >
          See the full gallery
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </motion.a>
      </div>
    </section>
  );
}