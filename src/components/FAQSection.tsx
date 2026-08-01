"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Where is Persimmon Farmstead situated?",
    a: "Our original homestead sits in the Hallan Valley, a quiet fold of Manali Tehsil in the Kullu District, roughly 20 minutes from the highway and a world away from it. Our second address, Persimmon Suites, is closer in — tucked into Shanag, above Old Manali.",
  },
  {
    q: "Do you welcome travelling companions of the four-legged kind?",
    a: "Always. Both properties sit on open orchard lawns built for exactly that kind of wandering — bring your dog along.",
  },
  {
    q: "What is Persimmon best known for?",
    a: "Guests arrive for the mountains and leave talking about the kitchen. Everything is made in-house, from the morning juice to a slow-cooked dinner — a family table, not a hotel menu.",
  },
  {
    q: "How does one secure a stay?",
    a: "Send a request through the form on this site or drop us a line on WhatsApp. A real host — not a booking engine — confirms your dates, usually within a few hours.",
  },
  {
    q: "How far a drive from Manali Mall Road?",
    a: "About 25–30 minutes by car, depending on which of our two homes you're headed to — far enough for real quiet, close enough for a spontaneous evening in town.",
  },
  {
    q: "Which airport should I fly into?",
    a: "Bhuntar Airport (Kullu-Manali), roughly 50 kilometres out. We're happy to help arrange the transfer once your stay is confirmed.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ background: "linear-gradient(160deg, #f5ebdd 0%, #ece0cd 100%)" }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          variants={fadeUp}
          className="flex items-center gap-3 mb-6"
        >
          <span style={{ width: 26, height: 1, background: "#b5703f" }} />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase" style={{ color: "#b5703f" }}>
            Correspondence
          </span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={1}
          variants={fadeUp}
          className="font-display italic mb-14 md:mb-16"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", color: "#2b1b11", letterSpacing: "-0.03em" }}
        >
          Before you arrive.
        </motion.h2>

        <div>
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                custom={i * 0.4 + 2}
                variants={fadeUp}
                style={{ borderBottom: "1px solid rgba(43,27,17,0.1)" }}
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span
                    className="font-display text-[17px] md:text-[19px]"
                    style={{ color: "#2b1b11", fontWeight: 600 }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      width: 32,
                      height: 32,
                      border: "1px solid rgba(181,112,63,0.4)",
                      background: open ? "#b5703f" : "transparent",
                      transform: open ? "rotate(135deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={open ? "#f7f2e8" : "#b5703f"} strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="font-body text-[14.5px] leading-[1.85] pb-7 pr-10"
                        style={{ color: "#5a4534", maxWidth: "60ch" }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}