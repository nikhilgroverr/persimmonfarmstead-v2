"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { primaryPhone, telHref, mailtoHref } from "@/lib/site";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative w-full py-14 md:py-20 flex items-center justify-center overflow-hidden"
    >
      <img
        src="/images/CTA1.webp"
        alt="Persimmon Farmstead at dusk"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.45 }}
      />
      <div className="absolute inset-0 bg-ink/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/10" />

      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_30%_20%,_white_1px,_transparent_1px)] bg-[size:26px_26px]"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            <p className="text-accent font-body text-xs tracking-[0.3em] uppercase">
              Two Homes in Manali
            </p>
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display italic text-cream text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 max-w-2xl mx-auto">
            Come stay a while.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-cream/70 font-body text-base md:text-lg leading-relaxed max-w-md mx-auto mb-12">
            Rooms fill quickly through the season at both properties — send
            a request and a real host confirms your dates, usually within a
            few hours.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/contact#form"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-full bg-terracotta text-cream font-body text-sm tracking-wide uppercase px-8 py-4 transition-colors duration-300 hover:bg-terracotta-dark"
            >
              Check availability
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </motion.a>

            <a      
              href={mailtoHref("Booking enquiry — Persimmon Farmstead")}
              className="inline-flex items-center gap-2.5 font-body text-sm tracking-wide uppercase text-cream/80 border border-cream/30 rounded-full px-8 py-4 transition-all duration-300 hover:border-cream/60 hover:text-cream"
            >
              Email us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}