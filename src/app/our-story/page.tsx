"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const chapters = [
  {
    year: "2021",
    eyebrow: "The Beginning",
    headline: "Two city jobs,\none mountain,\nno regrets.",
    body: "The lockdowns were a strange gift. Two friends from very different corporate worlds — the kind of jobs measured in flights and slide decks — found themselves with an unfamiliar stillness, and used it to drive up to Manali when the roads reopened.",
    quote: null,
    bgColor: "#0e1a12",
    bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  },
  {
    year: "The Valley",
    eyebrow: "A Decision",
    headline: "People who had\nquietly walked\naway.",
    body: "They weren't the only ones. All through the Kullu valley they met people who had quietly walked away from the city: baristas who used to be bankers, orchard owners who used to be engineers. Over a couple of pegs of Himalayan-brewed whisky one cold night, the two friends made a decision that sounded ridiculous in daylight — they'd become settlers too.",
    quote: null,
    bgColor: "#14231b",
    bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  },
  {
    year: "The Kitchen",
    eyebrow: "First Priority",
    headline: "It wasn't the\nrooms they got\nright first.",
    body: "What they knew, more than hospitality, was food. So the first thing they got right at Persimmon Farmstead wasn't the rooms — it was the kitchen. The plan was simple and a little stubborn: make the food here something people talk about back in town. Judging by how often guests message weeks later asking for a recipe, it worked.",
    quote: null,
    bgColor: "#1a2416",
    bgImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&q=80",
  },
  {
    year: "Shanag",
    eyebrow: "One Became Two",
    headline: "Same family.\nSame kitchen.\nSame phone.",
    body: "One farmstead became two. When the Farmstead filled up, the family opened a second home at Shanag, near Old Manali — wooden chalets and stone cottages on open orchard lawns, with apple trees and snow-kissed peaks all around. Same family, same kitchen, same phone that rings before you arrive to ask when you're reaching.",
    quote: null,
    bgColor: "#111f1a",
    bgImage: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1920&q=80",
  },
  {
    year: "Today",
    eyebrow: "The Whole Story",
    headline: "A family that\nleft one life\nfor a quieter one.",
    body: "That's the whole story, really. Persimmon isn't a chain and doesn't want to be. It's a family that left one life for a quieter one, and now spends its days making sure yours is worth the drive up.",
    quote: null,
    bgColor: "#0c1d14",
    bgImage: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1920&q=80",
  },
];

const whatsappNumbers = [
  { label: "Reservations", display: "+91 62306 45166", href: "https://wa.me/916230645166" },
  { label: "Reservations", display: "+91 99999 75545", href: "https://wa.me/919999975545" },
  { label: "Shanag Property", display: "+91 88005 00292", href: "https://wa.me/918800500292" },
];

function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Message us on WhatsApp"
        className="group inline-flex items-center gap-3 font-body text-[13px] font-semibold tracking-wide rounded-full pl-5 pr-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
        style={{
          border: "1px solid rgba(247,242,232,0.22)",
          color: "rgba(247,242,232,0.85)",
          background: "rgba(247,242,232,0.04)",
        }}
      >
        <span
          className="flex items-center justify-center rounded-full"
          style={{ width: 26, height: 26, background: "#25D366" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01a.9.9 0 0 0-.66.31c-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z" />
          </svg>
        </span>
        Message us
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-20 left-1/2 -translate-x-1/2 mt-3"
            style={{
              width: "260px",
              background: "#f7f2e8",
              borderRadius: "16px",
              boxShadow: "0 20px 50px -12px rgba(0,0,0,0.45)",
              overflow: "hidden",
            }}
          >
            {whatsappNumbers.map((wa, i) => (
              <a
                key={i}
                href={wa.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 transition-colors duration-200 hover:bg-black/[0.03]"
                style={{
                  borderBottom: i < whatsappNumbers.length - 1 ? "1px solid rgba(43,27,17,0.08)" : "none",
                }}
              >
                <div>
                  <p className="font-body text-[10px] tracking-[0.1em] uppercase mb-1" style={{ color: "#8a5328" }}>
                    {wa.label}
                  </p>
                  <p className="font-body text-[13px] font-semibold" style={{ color: "#2b1b11" }}>
                    {wa.display}
                  </p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a5328" strokeWidth="2.5">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OurStoryPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ background: "#0e1a12", minHeight: "72vh", display: "flex", alignItems: "flex-end" }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80" alt="Persimmon Farmstead" className="w-full h-full object-cover" style={{ opacity: 0.32, filter: "saturate(0.9) contrast(1.05)" }} />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,26,18,0.25) 0%, rgba(14,26,18,0.9) 100%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pb-20 md:pb-28 pt-36">
          <p className="font-body text-[10px] tracking-[0.42em] uppercase mb-6" style={{ color: "rgba(212,168,83,0.7)" }}>
            ✦ &nbsp; Since 2021 · Hallan Valley, Manali &nbsp; ✦
          </p>
          <h1 className="font-display italic leading-[1.04] mb-7" style={{
            fontSize: "clamp(2.6rem, 7.2vw, 5.8rem)",
            letterSpacing: "-0.035em",
            color: "rgba(247,242,232,0.98)",
            textShadow: "0 6px 36px rgba(0,0,0,0.4)",
          }}>
            Two friends,<br />one orchard,<br />a lot of chai.
          </h1>
          <div style={{ height: "1px", width: "68px", background: "linear-gradient(to right, rgba(212,168,83,0.9), transparent)" }} />
        </div>
      </section>

      {/* Chapters — each its own section, own background, fades in AND out on scroll */}
      {chapters.map((ch, i) => {
        const reversed = i % 2 === 1;
        return (
          <section
            key={i}
            className="relative w-full overflow-hidden flex items-center"
            style={{ minHeight: "auto", padding: "5.5rem 0", background: ch.bgColor }}
          >
            {ch.bgImage && (
              <>
                <div className="absolute inset-0">
                  <img
                    src={ch.bgImage}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.16, filter: "saturate(0.85)" }}
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom, ${ch.bgColor}cc 0%, ${ch.bgColor}f2 100%)` }}
                />
              </>
            )}

            <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`flex gap-6 md:gap-10 ${reversed ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex flex-col items-center flex-shrink-0 pt-1">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(212,168,83,0.4)", background: "radial-gradient(circle at 30% 30%, rgba(212,168,83,0.12), rgba(212,168,83,0.03))" }}>
                    <span className="font-display italic text-[11px]" style={{ color: "rgba(212,168,83,0.8)" }}>{i + 1}</span>
                  </div>
                </div>

                <div className={`flex-1 pb-2 ${reversed ? "md:text-right" : ""}`}>
                  <div className={`flex items-center gap-2.5 mb-4 ${reversed ? "md:justify-end" : ""}`}>
                    <span className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color: "rgba(212,168,83,0.65)" }}>{ch.year}</span>
                    <span className="h-px w-5" style={{ background: "rgba(212,168,83,0.3)" }} />
                    <span className="font-body text-[9px] tracking-[0.12em] uppercase" style={{ color: "rgba(247,242,232,0.28)" }}>{ch.eyebrow}</span>
                  </div>

                  <h2 className="font-display italic leading-[1.07] mb-5" style={{
                    fontSize: "clamp(1.85rem, 4.6vw, 3.1rem)",
                    letterSpacing: "-0.03em",
                    color: "rgba(247,242,232,0.94)",
                    whiteSpace: "pre-line",
                  }}>
                    {ch.headline}
                  </h2>

                  <div
                    className={`mb-5 ${reversed ? "md:ml-auto" : ""}`}
                    style={{
                      height: "1px",
                      width: "38px",
                      background: reversed
                        ? "linear-gradient(to left, rgba(212,168,83,0.65), transparent)"
                        : "linear-gradient(to right, rgba(212,168,83,0.65), transparent)",
                    }}
                  />

                  <p
                    className={`font-body text-[15px] md:text-base leading-[1.92] mb-5 ${reversed ? "md:ml-auto" : ""}`}
                    style={{ color: "rgba(247,242,232,0.5)", maxWidth: "56ch" }}
                  >
                    {ch.body}
                  </p>

                  {ch.quote && (
                    <div
                      className={`py-0.5 ${reversed ? "pr-4 md:ml-auto" : "pl-4"}`}
                      style={{
                        borderLeft: reversed ? "none" : "1px solid rgba(212,168,83,0.4)",
                        borderRight: reversed ? "1px solid rgba(212,168,83,0.4)" : "none",
                        maxWidth: "56ch",
                      }}
                    >
                      <p className="font-display italic text-[15px] md:text-base" style={{ color: "rgba(247,242,232,0.4)", lineHeight: 1.85 }}>
                        &ldquo;{ch.quote}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* Final CTA — split panel, distinct from centered-stack design */}
      <section style={{ background: "#0c1d14" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32" style={{ borderTop: "1px solid rgba(247,242,232,0.07)" }}>
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            {/* Left — headline + copy */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body text-[10px] tracking-[0.42em] uppercase mb-6" style={{ color: "rgba(212,168,83,0.6)" }}>
                Reservations
              </p>
              <h3
                className="font-display italic mb-6"
                style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", color: "rgba(247,242,232,0.95)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
              >
                Come feel it<br />for yourself.
              </h3>
              <p className="font-body text-[15px] leading-[1.85]" style={{ color: "rgba(247,242,232,0.5)", maxWidth: "40ch" }}>
                Two homes, one family, and a kitchen worth the drive up. Send
                a request and a real host gets back to you — usually within
                a few hours.
              </p>
            </motion.div>

            {/* Right — action panel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: "rgba(247,242,232,0.03)",
                border: "1px solid rgba(212,168,83,0.18)",
              }}
            >
              <a
                href="/stay"
                className="group flex items-center justify-between rounded-full px-7 py-4 mb-4 transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: "#d4a853", color: "#1a2218" }}
              >
                <span className="font-body text-[13px] font-semibold tracking-wide">Explore Our Stays</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>

              <div className="flex items-center justify-center">
                <WhatsAppButton />
              </div>

              <div className="mt-7 pt-6 flex items-center gap-2.5 justify-center" style={{ borderTop: "1px solid rgba(247,242,232,0.08)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#25D366" }} />
                <span className="font-body text-[11px]" style={{ color: "rgba(247,242,232,0.4)" }}>
                  Real hosts · Usually replies within a few hours
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}