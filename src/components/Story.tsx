// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform, useInView } from "framer-motion";
// import Reveal from "./Reveal";
// import Link from "next/link";

// const timeline = [
//   {
//     year: "2021",
//     label: "The Beginning",
//     text: "Two friends from very different corporate worlds found themselves with an unfamiliar stillness during lockdown — and used it to drive up to Manali when the roads reopened.",
//   },
//   {
//     year: "The Valley",
//     label: "A Decision",
//     text: "All through the Kullu valley they met people who had quietly walked away from the city. Over a couple of pegs of Himalayan-brewed whisky one cold night, they decided to become settlers too.",
//   },
//   {
//     year: "The Kitchen",
//     label: "First Priority",
//     text: "What they knew, more than hospitality, was food. The plan was simple: make the food here something people talk about back in town. Judging by how often guests message weeks later asking for a recipe — it worked.",
//   },
//   {
//     year: "Shanag",
//     label: "One Became Two",
//     text: "When the Farmstead filled up, the family opened a second home near Old Manali — wooden chalets and stone cottages on open orchard lawns, with apple trees and snow-kissed peaks all around.",
//   },
// ];

// export default function Story() {
//   const ref = useRef<HTMLDivElement>(null);
//   const headRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(headRef, { amount: 0.3, once: true });

//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//   const yImg1 = useTransform(scrollYProgress, [0, 1], [-24, 24]);
//   const yImg2 = useTransform(scrollYProgress, [0, 1], [32, -32]);

//   return (
//     <section id="about" ref={ref} className="relative w-full overflow-hidden" style={{ background: "var(--color-cream-soft)" }}>

//       {/* Ghost background text */}
//       <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-10 pointer-events-none overflow-hidden" aria-hidden="true">
//         <span className="font-display italic select-none" style={{
//           fontSize: "clamp(60px, 14vw, 200px)",
//           fontWeight: 300,
//           letterSpacing: "-0.04em",
//           color: "transparent",
//           WebkitTextStroke: "1px rgba(36,48,40,0.06)",
//           whiteSpace: "nowrap",
//         }}>
//           Our Story
//         </span>
//       </div>

//       <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-14 md:py-28">

//         {/* Header */}
//         <div ref={headRef} className="mb-12 md:mb-20">
//           <Reveal>
//             <div className="flex items-center gap-3 mb-6">
//               <span className="h-px w-8" style={{ background: "var(--color-terracotta)" }} />
//               <p className="font-body text-[9px] md:text-[10px] tracking-[0.38em] uppercase" style={{ color: "var(--color-terracotta-dark)" }}>
//                 Since 2021 · Hallan Valley, Manali
//               </p>
//             </div>
//           </Reveal>

//           <Reveal delay={0.08}>
//             <h2 className="font-display italic leading-[1.05] mb-5" style={{
//               fontSize: "clamp(2rem, 5.5vw, 4rem)",
//               letterSpacing: "-0.025em",
//               color: "var(--color-ink)",
//             }}>
//               Two friends, one orchard,<br />
//               a lot of chai.
//             </h2>
//           </Reveal>

//           <Reveal delay={0.14}>
//             <div style={{ height: "1.5px", width: "48px", background: "linear-gradient(to right,var(--color-terracotta),transparent)", borderRadius: "2px", marginBottom: "20px" }} />
//           </Reveal>

//           <Reveal delay={0.18}>
//             <p className="font-display italic text-base md:text-xl max-w-2xl" style={{ color: "rgba(26,34,24,0.38)", lineHeight: 1.8 }}>
//               "Persimmon isn't a chain and doesn't want to be. It's a family that left one life for a quieter one, and now spends its days making sure yours is worth the drive up."
//             </p>
//           </Reveal>
//         </div>

//         {/* Main grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">

//           {/* LEFT — Timeline */}
//           <div className="flex flex-col gap-0">
//             {timeline.map((item, i) => (
//               <Reveal key={i} delay={0.1 + i * 0.1}>
//                 <div className="relative flex gap-5 md:gap-7 pb-8 md:pb-10">
//                   {/* Timeline line */}
//                   {i < timeline.length - 1 && (
//                     <div className="absolute left-[18px] md:left-[22px] top-10 bottom-0 w-px" style={{ background: "linear-gradient(to bottom,rgba(36,48,40,0.15),transparent)" }} />
//                   )}

//                   {/* Circle */}
//                   <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center mt-0.5 z-10"
//                     style={{ background: "var(--color-cream-soft)", border: "1.5px solid var(--color-terracotta)", boxShadow: "0 0 0 4px rgba(181,112,63,0.08)" }}>
//                     <span className="font-display italic text-[10px] md:text-[11px]" style={{ color: "var(--color-terracotta-dark)" }}>{i + 1}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 pt-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="font-body text-[9px] md:text-[10px] tracking-[0.28em] uppercase" style={{ color: "var(--color-terracotta-dark)", opacity: 0.7 }}>{item.year}</span>
//                       <span className="h-px flex-1 max-w-[28px]" style={{ background: "rgba(36,48,40,0.12)" }} />
//                       <span className="font-body text-[9px] md:text-[10px] tracking-wide" style={{ color: "rgba(26,34,24,0.35)" }}>{item.label}</span>
//                     </div>
//                     <p className="font-body text-sm md:text-base leading-[1.85]" style={{ color: "rgba(26,34,24,0.58)" }}>
//                       {item.text}
//                     </p>
//                   </div>
//                 </div>
//               </Reveal>
//             ))}

//             <Reveal delay={0.5}>
//               <div className="flex flex-col sm:flex-row gap-3 mt-4 pl-14 md:pl-[72px]">
//                 <Link href="/about"
//                   className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3 transition-all duration-200"
//                   style={{ background: "var(--color-terracotta-dark)", color: "var(--color-cream-soft)" }}>
//                   Read Full Story
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
//                 </Link>
//                 <Link href="/contact"
//                   className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-body text-[13px] tracking-wide rounded-full px-7 py-3 transition-all duration-200"
//                   style={{ border: "1px solid rgba(36,48,40,0.18)", color: "rgba(26,34,24,0.62)" }}
//                   onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,48,40,0.4)"; }}
//                   onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,48,40,0.18)"; }}>
//                   Visit Us
//                 </Link>
//               </div>
//             </Reveal>
//           </div>

//           {/* RIGHT — Images + stats */}
//           <div className="flex flex-col gap-6">

//             {/* Image collage */}
//             <Reveal delay={0.2}>
//               <div className="relative h-[320px] md:h-[480px]">

//                 {/* Decorative frame */}
//                 <div className="absolute" style={{ top: "6%", left: "6%", right: "0", bottom: "6%", border: "1px solid rgba(181,112,63,0.15)", borderRadius: "12px" }} aria-hidden="true" />

//                 {/* Main image */}
//                 <motion.div style={{ y: yImg1, position: "absolute", left: "0", top: "4%", width: "66%", borderRadius: "12px", overflow: "hidden", boxShadow: "0 24px 48px -16px rgba(26,34,24,0.28)" }}>
//                   <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=85" alt="Persimmon Farmstead interior" className="w-full aspect-[4/5] object-cover" />
//                   <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
//                 </motion.div>

//                 {/* Accent image */}
//                 <motion.div style={{ y: yImg2, position: "absolute", right: "0", bottom: "4%", width: "48%", borderRadius: "12px", overflow: "hidden", boxShadow: "0 24px 48px -16px rgba(26,34,24,0.32)", border: "6px solid var(--color-cream-soft)" }}>
//                   <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=700&q=85" alt="Farmstead view" className="w-full aspect-[3/4] object-cover" />
//                 </motion.div>

//                 {/* Year badge */}
//                 <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full hidden md:block"
//                   style={{ background: "var(--color-cream-soft)", border: "1px solid rgba(181,112,63,0.25)", boxShadow: "0 4px 12px rgba(26,34,24,0.08)" }}>
//                   <span className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--color-terracotta-dark)" }}>Est. 2021</span>
//                 </div>
//               </div>
//             </Reveal>

//             {/* Stats grid */}
//             <Reveal delay={0.35}>
//               <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl" style={{ background: "rgba(36,48,40,0.07)", border: "1px solid rgba(36,48,40,0.07)" }}>
//                 {[
//                   { value: "2", label: "Properties" },
//                   { value: "3.2K+", label: "Guests" },
//                   { value: "4.9★", label: "Rating" },
//                 ].map((s, i) => (
//                   <div key={i} className="flex flex-col items-center py-5 md:py-6 px-3 text-center" style={{ background: "var(--color-cream-soft)" }}>
//                     <p className="font-display italic leading-none mb-1.5" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--color-terracotta-dark)" }}>{s.value}</p>
//                     <p className="font-body text-[9px] md:text-[10px] tracking-[0.18em] uppercase" style={{ color: "rgba(26,34,24,0.38)" }}>{s.label}</p>
//                   </div>
//                 ))}
//               </div>
//             </Reveal>

//             {/* Pull quote */}
//             <Reveal delay={0.42}>
//               <div className="px-5 py-4 rounded-2xl" style={{ background: "rgba(36,48,40,0.03)", border: "1px solid rgba(36,48,40,0.07)" }}>
//                 <p className="font-display italic text-sm md:text-base leading-[1.8]" style={{ color: "rgba(26,34,24,0.45)" }}>
//                   "Same family, same kitchen, same phone that rings before you arrive to ask when you're reaching."
//                 </p>
//                 <p className="font-body text-[10px] tracking-wide mt-3" style={{ color: "var(--color-terracotta-dark)", opacity: 0.7 }}>
//                   — Persimmon Farmstead
//                 </p>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Reveal from "./Reveal";
import Link from "next/link";

const rooms = [
  {
    title: "Garden Rooms",
    tag: "Most Popular",
    desc: "Orchard-facing balconies. King beds. Valley light at dawn.",
    href: "/stays/garden-rooms",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=85",
    number: "01",
  },
  {
    title: "Farmhouse Suites",
    tag: "Signature Stay",
    desc: "Handcrafted wood. Mountain windows. Space to breathe.",
    href: "/stays/farmhouse-suites",
    img: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&q=85",
    number: "02",
  },
  {
    title: "Long Stays",
    tag: "Extended",
    desc: "Weekly rates. Home meals. The valley at your pace.",
    href: "/contact",
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=85",
    number: "03",
  },
];

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section ref={ref} id="stays-preview" className="relative w-full overflow-hidden" style={{ background: "var(--color-cream-soft)" }}>

      {/* Ghost number */}
      <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display italic" style={{ fontSize: "clamp(120px, 22vw, 320px)", fontWeight: 300, color: "transparent", WebkitTextStroke: "1px rgba(36,48,40,0.05)", lineHeight: 1, display: "block", transform: "translateX(15%)" }}>
          Stay
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-14 md:py-28">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: "var(--color-terracotta)" }} />
                <p className="font-body text-[9px] md:text-[10px] tracking-[0.38em] uppercase" style={{ color: "var(--color-terracotta-dark)" }}>
                  Where to Stay
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display italic leading-[1.05]" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", letterSpacing: "-0.025em", color: "var(--color-ink)" }}>
                Two ways to make<br />it your own.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link href="/stay"
              className="hidden md:inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-6 py-3 self-end flex-shrink-0 transition-all duration-200"
              style={{ border: "1px solid rgba(36,48,40,0.2)", color: "rgba(26,34,24,0.65)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-terracotta-dark)"; (e.currentTarget as HTMLElement).style.color = "var(--color-cream-soft)"; (e.currentTarget as HTMLElement).style.borderColor = "transparent"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(26,34,24,0.65)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,48,40,0.2)"; }}>
              View all stays
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </Reveal>
        </div>

        {/* Animated rule */}
        <div className="mb-12 md:mb-16 h-px" style={{ background: "rgba(36,48,40,0.06)" }}>
          <motion.div className="h-full" style={{ width: lineWidth, background: "linear-gradient(to right, var(--color-terracotta), rgba(181,112,63,0.15))" }} />
        </div>

        {/* Room cards — stacked editorial layout */}
        <div className="flex flex-col gap-0">
          {rooms.map((room, i) => (
            <Reveal key={i} delay={0.1 + i * 0.12}>
              <Link href={room.href} className="group block">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${i % 2 === 1 ? "md:grid-flow-dense" : ""}`}
                  style={{ borderTop: i === 0 ? "1px solid rgba(36,48,40,0.08)" : "none", borderBottom: "1px solid rgba(36,48,40,0.08)" }}>

                  {/* Image */}
                  <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:col-start-2" : ""}`} style={{ aspectRatio: "16/10" }}>
                    <img
                      src={room.img}
                      alt={room.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" style={{ background: "rgba(26,34,24,0.08)" }} />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1.5 rounded-full" style={{ background: "rgba(247,242,232,0.12)", border: "1px solid rgba(247,242,232,0.25)", backdropFilter: "blur(8px)" }}>
                      <span className="font-body text-[9px] md:text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(247,242,232,0.85)" }}>{room.tag}</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`flex flex-col justify-between p-6 md:p-10 lg:p-14 ${i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}
                    style={{ background: "var(--color-cream-soft)" }}>
                    <div>
                      <span className="font-display italic text-[60px] md:text-[80px] leading-none block mb-3 md:mb-6 transition-colors duration-300 group-hover:opacity-100"
                        style={{ color: "transparent", WebkitTextStroke: "1px rgba(36,48,40,0.1)" }}>
                        {room.number}
                      </span>
                      <h3 className="font-display italic mb-3 md:mb-4 transition-colors duration-300" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", letterSpacing: "-0.02em", color: "var(--color-ink)" }}>
                        {room.title}
                      </h3>
                      <p className="font-body text-sm md:text-base leading-[1.85] max-w-xs" style={{ color: "rgba(26,34,24,0.52)" }}>
                        {room.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 md:mt-10">
                      <span className="font-body text-[12px] tracking-[0.2em] uppercase transition-colors duration-300" style={{ color: "var(--color-terracotta-dark)" }}>
                        Explore
                      </span>
                      <motion.div className="h-px flex-1 max-w-[32px]" style={{ background: "var(--color-terracotta)", scaleX: 1 }}
                        whileHover={{ scaleX: 2 }} />
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta-dark)" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1.5">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <Reveal delay={0.4}>
          <div className="flex justify-center mt-10 md:hidden">
            <Link href="/stay"
              className="inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3"
              style={{ background: "var(--color-terracotta-dark)", color: "var(--color-cream-soft)" }}>
              View all stays
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}