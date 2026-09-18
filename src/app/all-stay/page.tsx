"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { rooms as allRooms } from "@/lib/rooms";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

const properties = [
  {
    slug: "farmstead" as const,
    num: "01",
    name: "Persimmon Farmstead",
    tag: "Flagship",
    location: "Badgran (14 Mile) · Manali",
    blurb: "Our flagship boutique hotel, a minute off the highway with mountain views from every room.",
    story:
      "The original house — three rooms on the sunny side of Badgran, angled to catch the first light over the orchard. This is where the whole thing started, and it's still the one most guests come back to.",
    img: "/images/farmstead/badagran/gallery-2.webp",
    href: "/stays/farmstead",
  },
  {
    slug: "shanag" as const,
    num: "02",
    name: "Persimmon Farmstead Shanag",
    tag: "Orchard Retreat",
    location: "Shanag (Bahang) · Manali",
    blurb: "Wooden chalets and stone cottages across wide orchard lawns, close to Old Manali.",
    story:
      "When the Farmstead filled up, the family opened a second home above Old Manali — chalets and stone cottages spread across open orchard lawns, close enough to walk into town.",
    img: "/images/shanag/KIN01880.webp",
    href: "/stays/shanag",
  },
];

const articles = [
  {
    id: "long-stays",
    chapter: "01",
    eyebrow: "Extended Stay",
    title: "Stay long enough to stop counting days.",
    img: "/images/shanag/KIN01880.webp",
    caption: "Badgran, 14 Mile · Manali",
    pullQuote: "A month here should cost less per night than a weekend does.",
    chips: ["Weekly Rate", "Meals", "Laundry"],
    body: [
      "Most people book us for three nights — a weekend, a quick escape from the city. But every season we get another kind of guest: someone who booked two weeks, then called to extend it to four. If you're the kind of person who wants to actually live somewhere for a while instead of just visiting it, this is for you.",
      "Long stays start at seven nights, and from there we stop treating you like a checkout date. Laundry gets picked up once a week without you asking. Meals shift from \u201chotel breakfast\u201d to something closer to what we'd cook for ourselves — dal one night, something simpler the next, whatever's fresh that week. The rate drops the longer you stay, because a month here should cost less per night than a weekend does.",
      "We've had a writer finish a manuscript in one of the Badgran rooms. A family come up from Delhi to get their kid away from the city's air for six weeks. A couple who just wanted somewhere quiet to be bored together for a while. None of them needed anything dramatic from us — just consistency, and to be left alone when they wanted to be.",
    ],
  },
  {
    id: "corporate",
    chapter: "02",
    eyebrow: "Corporate",
    title: "Take the whole place. Skip the conference room.",
    img: "/images/shanag/KIN01902.webp",
    caption: "Both homes · Manali",
    pullQuote: "By the second night, fewer people are checking their phones.",
    chips: ["Buyout", "Team", "Events"],
    body: [
      "Every couple of months a company calls asking if we do offsites. The honest answer: we don't run offsites, but we'll hand you the entire property and get out of your way.",
      "A full buyout means both homes — Farmstead and Shanag — or just one, depending on how many people you're bringing. We clear a space for whatever you actually need: a projector propped against the dining room wall, chairs pulled into a rough circle for the town hall, or nothing at all if the plan is just to let sixteen people who normally talk over Slack actually eat dinner together.",
      "Evenings tend to sort themselves out — someone lights the bonfire, someone else finds a speaker, and by the second night fewer people are checking their phones. We handle the food, the rooms, and getting everyone up from Bhuntar or Chandigarh. You handle whatever agenda you came here with, or don't.",
    ],
  },
];

function Reveal({ children, delay = 0, y = 22 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const reduce = useReducedMotion();
  return (
    <motion.div ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Proper hero — full-bleed photo, parallax + mouse depth, ghost
     watermark. Matches the treatment used on Farmstead/Contact/About. ── */
function AllStaysHero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOp = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const hmx = useMotionValue(0);
  const hmy = useMotionValue(0);
  const hsx = useSpring(hmx, { stiffness: 55, damping: 18 });
  const hsy = useSpring(hmy, { stiffness: 55, damping: 18 });
  const bgX = useTransform(hsx, [-0.5, 0.5], ["-14px", "14px"]);
  const bgY = useTransform(hsy, [-0.5, 0.5], ["-9px", "9px"]);
  const ghostX = useTransform(hsx, [-0.5, 0.5], ["26px", "-26px"]);
  const ghostY = useTransform(hsy, [-0.5, 0.5], ["16px", "-16px"]);
  const heroMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    hmx.set((e.clientX - r.left) / r.width - 0.5);
    hmy.set((e.clientY - r.top) / r.height - 0.5);
  };
  const heroLeave = () => { hmx.set(0); hmy.set(0); };

  return (
    <section
      ref={heroRef}
      onMouseMove={heroMove}
      onMouseLeave={heroLeave}
      className="relative w-full overflow-hidden"
      style={{ height: "78vh", minHeight: "560px", maxHeight: "900px", background: "#060806" }}
    >
    <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
      <motion.img
        src="/images/hero3.webp"
        alt="Persimmon Farmstead"
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.52) saturate(0.88)", x: bgX, y: bgY, scale: 1.06 }}
      />
    </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,6,0.28) 0%, rgba(6,8,6,0.08) 40%, rgba(6,8,6,0.92) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,8,6,0.45) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-14 pointer-events-none overflow-hidden" aria-hidden>
        <motion.span
          className="italic select-none whitespace-nowrap"
          style={{
            fontFamily: "var(--font-accent)", fontWeight: 600,
            fontSize: "clamp(70px,15vw,220px)", letterSpacing: "-0.03em",
            color: "transparent", WebkitTextStroke: "1px rgba(247,242,232,0.06)", lineHeight: 1,
            x: ghostX, y: ghostY,
          }}
        >
          Our Stays
        </motion.span>
      </div>

<motion.div className="absolute bottom-0 left-0 right-0 z-10 pb-14 md:pb-20" style={{ opacity: heroOp }}>
  <div className="max-w-6xl mx-auto px-5 md:px-12">
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-10">
      {/* LEFT — title block */}
      <div>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
            <span className="font-body text-[10px] tracking-[0.32em] uppercase" style={{ color: "rgba(212,168,83,0.8)" }}>
              Two Homes · One Family
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="italic leading-[1.02] mb-5" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.6rem,7vw,5.4rem)", letterSpacing: "-0.02em", color: "rgba(247,242,232,0.98)", textShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
            All our stays.
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <div style={{ height: "1.5px", width: "60px", background: "linear-gradient(to right, rgba(212,168,83,0.9), transparent)", borderRadius: "2px" }} />
        </Reveal>
      </div>

      {/* RIGHT — small framed featured photo, its own short heading + line */}
      <Reveal delay={0.2}>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="relative overflow-hidden rounded-2xl flex-shrink-0" style={{ width: "clamp(84px, 12vw, 118px)", aspectRatio: "4/5", boxShadow: "0 30px 60px -25px rgba(0,0,0,0.6)" }}>
            <img src="/images/hero3.webp" alt="A quiet corner of the farmstead" className="absolute inset-0 w-full h-full object-cover" />
            <div aria-hidden className="absolute inset-1.5 rounded-xl pointer-events-none" style={{ border: `1px solid ${GOLD}88` }} />
          </div>
          <div className="max-w-[180px]">
            <p className="font-body text-[9px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "rgba(212,168,83,0.85)" }}>Every corner</p>
            <p className="font-body leading-relaxed" style={{ fontSize: "12.5px", color: "rgba(247,242,232,0.65)" }}>
              A quiet moment, somewhere on the property.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
</motion.div>
    </section>
  );
}


/* ── Editorial hero — a real opening paragraph, not a photo slideshow.
     Text carries the section; an asymmetric photo collage sits beside it
     rather than behind it. ── */
function HeroArticle() {
  return (
    <section className="relative w-full pt-36 pb-16 md:pt-44 md:pb-24 px-5 md:px-12" style={{ background: "var(--color-cream-soft)" }}>
      <span
        aria-hidden
        className="hidden lg:block absolute select-none pointer-events-none italic"
        style={{ fontFamily: "var(--font-accent)", fontWeight: 600, top: "-1rem", right: "1rem", fontSize: "14rem", lineHeight: 1, color: "rgba(36,48,40,0.04)" }}
      >
        02
      </span>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT — the article itself */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
              <p className="font-body text-[9px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>Two Homes · One Family</p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              className="italic leading-[1.04] mb-8"
              style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.4rem,5.4vw,4.2rem)", letterSpacing: "-0.02em", color: "var(--color-ink)" }}
            >
              All our stays.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-body leading-[1.95] max-w-[58ch]" style={{ fontSize: "clamp(1rem,0.9rem + 0.3vw,1.15rem)", color: "rgba(26,34,24,0.78)" }}>
              <span
                className="font-display italic float-left mr-3 mt-1"
                style={{ fontSize: "clamp(3rem,7vw,3.8rem)", lineHeight: "0.78", color: ACCENT }}
              >
                S
              </span>
              even rooms, two corners of the same valley. Persimmon began as a single house at Badgran, three rooms angled toward the first light — and when it filled up, season after season, the family opened a second home above Old Manali instead of just adding more rooms to the first.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="font-body leading-[1.9] max-w-[58ch] mt-6" style={{ fontSize: "14.5px", color: "rgba(26,34,24,0.62)" }}>
              Both homes still run on the same idea: the people who greet you actually live there, the kitchen cooks whatever the day's market gave it, and nothing is on a fixed schedule but you. Below, a full look at every room across both properties — and further down, a couple of longer pieces on staying a while, or taking the whole place for your own group.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-wrap items-center gap-3 mt-10">
              {properties.map((p) => (
                <a key={p.slug}
                  href={`#${p.slug}`}
                  className="group inline-flex items-center gap-2.5 font-body text-[12px] tracking-[0.1em] uppercase rounded-full px-5 py-3 transition-all duration-300"
                  style={{ border: `1px solid rgba(194,105,28,0.4)`, color: ACCENT }}
                >
                  {p.name}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform duration-300 group-hover:translate-y-0.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT — asymmetric photo collage, not a full-bleed background */}
        <div className="lg:col-span-5 relative">
          <Reveal delay={0.14} y={30}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[22px]" style={{ aspectRatio: "4/4.2", boxShadow: "0 50px 100px -40px rgba(43,27,17,0.42)" }}>
                <img src={properties[0].img} alt={properties[0].name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,19,15,0.7) 0%, transparent 45%)" }} />
                <div aria-hidden className="absolute inset-2 rounded-2xl pointer-events-none" style={{ border: `1px solid ${GOLD}77` }} />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-body text-[9px] tracking-[0.24em] uppercase mb-1.5" style={{ color: "rgba(212,168,83,0.9)" }}>{properties[0].location}</p>
                  <p className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "17px", color: "rgba(247,242,232,0.97)" }}>{properties[0].name}</p>
                </div>
              </div>

              {/* second photo, offset and layered over the first */}
              <div
                className="absolute overflow-hidden rounded-2xl"
                style={{
                  width: "52%", aspectRatio: "4/5",
                  bottom: "-9%", left: "-10%",
                  boxShadow: "0 40px 80px -30px rgba(43,27,17,0.5)",
                  border: "5px solid #fffdf8",
                }}
              >
                <img src={properties[1].img} alt={properties[1].name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,19,15,0.55) 0%, transparent 50%)" }} />
                <p className="absolute bottom-3 left-3 right-3 italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "12px", color: "rgba(247,242,232,0.95)" }}>
                  {properties[1].name}
                </p>
              </div>

              {/* small gold badge floating near the top corner */}
              <span
                className="absolute font-body text-[10px] tracking-[0.15em] uppercase rounded-full px-4 py-2"
                style={{ top: -14, right: -10, background: "#fffdf8", color: "#8a5328", border: "1px solid rgba(181,112,63,0.3)", boxShadow: "0 8px 20px -8px rgba(43,27,17,0.3)" }}
              >
                Est. 2021
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Room card — richer finish: larger radius, engraved numeral, warmer hover ── */
function RoomCard({ room, i }: { room: (typeof allRooms)[number]; i: number }) {
  return (
    <Reveal delay={i * 0.07}>
      <Link
        href={`/rooms/${room.slug}`}
        className="group flex flex-col h-full rounded-[24px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
        style={{ background: "#fffdf8", border: "1px solid rgba(36,48,40,0.08)", boxShadow: "0 30px 60px -36px rgba(43,27,17,0.45)" }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img src={room.img} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,19,15,0.55), transparent 55%)" }} />
          <div className="absolute top-4 left-4">
            <span className="font-body text-[9px] tracking-[0.22em] uppercase px-3.5 py-1.5 rounded-full" style={{ background: "rgba(247,242,232,0.94)", color: "#8a5328", border: "1px solid rgba(181,112,63,0.28)" }}>
              {room.tag}
            </span>
          </div>
          <span
            aria-hidden
            className="absolute bottom-2.5 right-4 italic select-none pointer-events-none"
            style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "42px", color: "transparent", WebkitTextStroke: "1px rgba(247,242,232,0.5)", lineHeight: 1 }}
          >
            {room.num}
          </span>
        </div>
        <div className="flex flex-col flex-1 p-6">
          <h3 className="italic leading-tight mb-1" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.2rem,3.4vw,1.45rem)", color: "var(--color-ink)" }}>{room.name}</h3>
          <div className="flex items-center gap-2 mb-3.5" aria-hidden="true">
            <span className="h-px w-5" style={{ background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD }} />
          </div>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 mb-4">
            {[room.guests, room.bed, room.view].map((s) => (
              <span key={s} className="font-body text-[11px]" style={{ color: "rgba(26,34,24,0.5)" }}>{s}</span>
            ))}
          </div>
          <p className="font-body leading-[1.75] mb-6 line-clamp-2" style={{ fontSize: "clamp(0.78rem,2.2vw,0.81rem)", color: "rgba(26,34,24,0.58)" }}>{room.short}</p>
          <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-body text-[10.5px] tracking-[0.14em] uppercase transition-colors duration-300 group-hover:bg-[#c2691c] group-hover:text-white group-hover:border-[#c2691c] w-fit"
            style={{ border: "1px solid rgba(181,112,63,0.45)", color: "#b5703f" }}>
            Explore
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ── Property section — banner photo, a short narrative intro alongside
     it (not just a floating blurb), then the room grid. ── */
function PropertyCategory({ property }: { property: (typeof properties)[number] }) {
  const rooms = allRooms.filter((r) => r.property === property.slug);
  return (
    <section id={property.slug} className="w-full py-20 md:py-28 px-5 md:px-12 relative" style={{ borderTop: "1px solid rgba(36,48,40,0.07)", scrollMarginTop: "88px" }}>
      <span
        aria-hidden
        className="hidden md:block absolute select-none pointer-events-none italic"
        style={{ fontFamily: "var(--font-accent)", top: "0.5rem", right: "2rem", fontSize: "9rem", lineHeight: 1, color: "rgba(36,48,40,0.035)" }}
      >
        {property.num}
      </span>

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="relative rounded-[26px] overflow-hidden mb-4 aspect-[4/5] md:aspect-[20/9]" style={{ boxShadow: "0 50px 100px -45px rgba(13,19,15,0.5)", border: "1px solid rgba(212,168,83,0.25)" }}>
            <img src={property.img} alt={property.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,19,15,0.9) 0%, rgba(13,19,15,0.15) 55%, transparent 82%)" }} />

            <span aria-hidden className="absolute top-6 left-6 w-7 h-7 pointer-events-none" style={{ borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}`, opacity: 0.8 }} />
            <span aria-hidden className="absolute bottom-6 right-6 w-7 h-7 pointer-events-none" style={{ borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}`, opacity: 0.8 }} />

            <div className="absolute top-6 right-6">
              <span className="font-body text-[9px] tracking-[0.24em] uppercase px-3.5 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(247,242,232,0.85)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(8px)" }}>
                {property.tag}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-body text-[9px] tracking-[0.28em] uppercase mb-3" style={{ color: "rgba(212,168,83,0.85)" }}>{property.location}</p>
                <h2 className="italic leading-tight mb-3" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.1rem,4vw,3.2rem)", color: "rgba(247,242,232,0.98)", textShadow: "0 6px 30px rgba(0,0,0,0.4)" }}>
                  {property.name}
                </h2>
                <p className="font-body max-w-md leading-relaxed" style={{ fontSize: "clamp(0.85rem,2.4vw,0.88rem)", color: "rgba(247,242,232,0.65)" }}>{property.blurb}</p>
              </div>
              <Link href={property.href}
                className="group/btn inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-body text-[12px] tracking-wide uppercase flex-shrink-0 transition-transform duration-300 hover:scale-[1.04]"
                style={{ background: GOLD, color: "#1a2218", fontWeight: 500, boxShadow: "0 14px 34px -14px rgba(212,168,83,0.55)" }}>
                View Property
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover/btn:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* short narrative intro — ties the property to the site's real story */}
        <Reveal delay={0.06}>
          <p className="font-body leading-[1.9] max-w-[62ch] mt-8 mb-10 md:mb-14" style={{ fontSize: "14.5px", color: "rgba(26,34,24,0.6)" }}>
            {property.story}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-center gap-4 mb-12 md:mb-14">
            <p className="font-body text-[10.5px] tracking-[0.2em] uppercase flex-shrink-0" style={{ color: "rgba(26,34,24,0.5)" }}>
              {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"} At This Property
            </p>
            <span className="h-px flex-1" style={{ background: "rgba(36,48,40,0.12)" }} />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {rooms.map((room, ri) => <RoomCard key={room.slug} room={room} i={ri} />)}
        </div>
      </div>
    </section>
  );
}

/* ── Editorial article — a real written piece with a drop cap, alternating
     image side, and a gold flourish between paragraphs. Reads like prose,
     not a marketing bullet list. ── */
function ArticleSection({ article, imageSide }: { article: (typeof articles)[number]; imageSide: "left" | "right" }) {
  return (
    <section id={article.id} className="relative w-full overflow-hidden py-20 md:py-32 px-5 md:px-12" style={{ background: "#f2ecdc", borderTop: "1px solid rgba(36,48,40,0.07)", scrollMarginTop: "88px" }}>
      <span
        aria-hidden
        className="hidden md:block absolute select-none pointer-events-none italic"
        style={{ fontFamily: "var(--font-accent)", top: "-2.5rem", [imageSide === "left" ? "right" : "left"]: "2rem", fontSize: "16rem", lineHeight: 1, color: "rgba(36,48,40,0.045)" }}
      >
        &rdquo;
      </span>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className={`lg:col-span-5 ${imageSide === "right" ? "lg:order-2" : ""}`}>
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-[24px] p-2" style={{ background: "#fffdf8", boxShadow: "0 50px 100px -45px rgba(43,27,17,0.45)" }}>
                <div className="relative overflow-hidden rounded-[18px]" style={{ aspectRatio: "4/5" }}>
                  <img src={article.img} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(6,8,6,0.08) 0%, transparent 30%, rgba(6,8,6,0.12) 100%)" }} />
                  <div aria-hidden className="absolute inset-1.5 rounded-[14px] pointer-events-none" style={{ border: "1px solid rgba(212,168,83,0.45)" }} />
                </div>
                <span aria-hidden className="absolute top-4 left-4 w-6 h-6 pointer-events-none" style={{ borderTop: `1px solid ${ACCENT}`, borderLeft: `1px solid ${ACCENT}`, opacity: 0.75 }} />
                <span aria-hidden className="absolute bottom-4 right-4 w-6 h-6 pointer-events-none" style={{ borderBottom: `1px solid ${ACCENT}`, borderRight: `1px solid ${ACCENT}`, opacity: 0.75 }} />
              </div>
              <p className="font-body text-[10px] tracking-[0.22em] uppercase text-center mt-4" style={{ color: "rgba(26,34,24,0.4)" }}>{article.caption}</p>

              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {article.chips.map((c) => (
                  <span key={c} className="font-body text-[10px] tracking-[0.14em] uppercase px-3.5 py-2 rounded-full" style={{ border: "1px solid rgba(194,105,28,0.3)", color: "#8a5328" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className={`lg:col-span-7 ${imageSide === "right" ? "lg:order-1" : ""}`}>
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="italic flex-shrink-0" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "13px", color: ACCENT, opacity: 0.8 }}>
                {article.chapter}
              </span>
              <span className="h-px w-9 flex-shrink-0" style={{ background: ACCENT, opacity: 0.7 }} />
              <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color: ACCENT }}>{article.eyebrow}</p>
            </div>
            <h2 className="italic leading-[1.08] mb-9" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.9rem,4.2vw,3rem)", color: "var(--color-ink)", letterSpacing: "-0.01em" }}>
              {article.title}
            </h2>
          </Reveal>

          {article.body.map((para, pi) => (
            <div key={pi}>
              <Reveal delay={0.06 + pi * 0.05}>
                <p className="font-body mb-6 max-w-[62ch]" style={{ fontSize: "clamp(0.92rem, 0.87rem + 0.24vw, 1.05rem)", lineHeight: 1.95, color: pi === 0 ? "rgba(26,34,24,0.8)" : "rgba(26,34,24,0.66)" }}>
                  {pi === 0 && (
                    <span className="font-display italic float-left mr-3 mt-1" style={{ fontSize: "clamp(2.8rem,7vw,3.4rem)", lineHeight: "0.75", color: ACCENT }}>
                      {para.charAt(0)}
                    </span>
                  )}
                  {pi === 0 ? para.slice(1) : para}
                </p>
              </Reveal>

              {pi === 0 && (
                <Reveal delay={0.14}>
                  <div className="my-9 pl-6 md:pl-8 relative max-w-[54ch]">
                    <span aria-hidden className="absolute left-0 top-1 bottom-1 w-px" style={{ background: "linear-gradient(to bottom, rgba(212,168,83,0.7), rgba(212,168,83,0.05))" }} />
                    <p className="italic leading-[1.5]" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.2rem,2.4vw,1.55rem)", color: "var(--color-ink)", opacity: 0.85 }}>
                      &ldquo;{article.pullQuote}&rdquo;
                    </p>
                  </div>
                </Reveal>
              )}

              {pi < article.body.length - 1 && pi > 0 && (
                <div aria-hidden className="flex items-center gap-3 mb-6" style={{ maxWidth: "62ch" }}>
                  <span className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(212,168,83,0.5), transparent)" }} />
                  <span className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: ACCENT, opacity: 0.6 }} />
                  <span className="h-px flex-1" style={{ background: "linear-gradient(to left, rgba(212,168,83,0.5), transparent)" }} />
                </div>
              )}
            </div>
          ))}

          <Reveal delay={0.3}>
            <p className="italic mt-2 mb-8" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(13px,3vw,14px)", color: "rgba(26,34,24,0.45)" }}>
              — The Persimmon Family
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-body text-[12px] tracking-wide uppercase transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: ACCENT, color: "#fff" }}
            >
              Ask us about this
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function AllStaysPage() {
  return (
    <main style={{ background: "var(--color-cream-soft)" }}>
      <Navbar />

      {/* HERO — proper full-bleed hero with title */}
      <AllStaysHero />

      {/* INTRO ARTICLE — the editorial content section, now positioned below the hero */}
      <HeroArticle />

      {/* PROPERTY CATEGORIES */}
      {properties.map((property) => (
        <PropertyCategory key={property.slug} property={property} />
      ))}

      {/* ARTICLES — Long Stays / Corporate Buyouts, written as real pieces */}
      {articles.map((article, i) => (
        <ArticleSection key={article.id} article={article} imageSide={i % 2 === 0 ? "left" : "right"} />
      ))}

      <Footer />
    </main>
  );
}