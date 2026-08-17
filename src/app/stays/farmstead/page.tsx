"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ── Data ── */
const amenities = [
  "In-house restaurant & farm kitchen","Bonfire & garden","Free parking",
  "Travel desk & Volvo booking","Car & two-wheeler rental","Pet friendly",
  "Doctor on call","Free Wi-Fi","Room service & housekeeping","24×7 hot water",
];
const distances = [
  { place: "Kullu–Manali highway turn", note: "one-minute detour", dist: "0.1 km" },
  { place: "Manali Mall Road", note: "", dist: "14 km" },
  { place: "Kullu (Bhuntar) Airport", note: "", dist: "35 km" },
  { place: "Naggar Castle", note: "day trip", dist: "8 km" },
  { place: "Solang Valley", note: "", dist: "22 km" },
];
const rooms = [
  { num:"01", name:"Deluxe Room", guests:"2–3 guests", bed:"King bed", view:"Orchard & mountains",
    desc:"Our most-booked room — a cosy king-bedded room with a vaulted pine ceiling, persimmon artwork, and the orchard a few steps away.",
    img:"https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&q=85",
    tag:"Most Popular" },
  { num:"02", name:"Premium Room", guests:"2 guests", bed:"King bed", view:"Mountain",
    desc:"A little more room and a cleaner mountain line — a king-bedded double under the pitched wooden ceiling, with breakfast included.",
    img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=85",
    tag:"Breakfast Included" },
  { num:"03", name:"Balcony & Mountain-View Room", guests:"1–2 guests", bed:"Double bed", view:"Mountain + sit-out",
    desc:"A snug room with a lounge corner and French windows opening to the pine-clad slopes — pull a chair out for the morning sun.",
    img:"https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=85",
    tag:"Best Views" },
];
const storyImgs = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=85",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=85",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=85",
];
const faqs = [
  { q:"Where is Persimmon Farmstead located?", a:"The original Farmstead is at 14 Mile in Badgran, about 14 km before Manali town — a quiet setting just a minute off the main highway." },
  { q:"Is it pet friendly?", a:"Yes. Both Persimmon homes welcome pets. The orchard lawns are especially good for dogs, with space to roam. Let us know when requesting dates." },
  { q:"What is Persimmon known for?", a:"The food and the hosts. Guests consistently rate Persimmon among the best places to eat in the Manali area — everything is cooked in-house in a small farm kitchen." },
  { q:"How do I book?", a:"You send a request, a real host confirms it by WhatsApp — usually within a few hours." },
  { q:"How far from Mall Road?", a:"The Farmstead at Badgran is about 14 km south of Mall Road — a quiet, offbeat setting just a minute off the main highway." },
  { q:"Nearest airport?", a:"Kullu–Manali Airport at Bhuntar, roughly 35 km away. Our travel desk can arrange pickup." },
];

/* ── Helpers ── */
function Reveal({ children, delay=0, y=24 }: { children:React.ReactNode; delay?:number; y?:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount:0.15, once:true });
  return (
    <motion.div ref={ref} initial={{ opacity:0, y }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ delay, duration:0.7, ease:[0.22,1,0.36,1] }}>
      {children}
    </motion.div>
  );
}

function FAQ({ faq }: { faq:typeof faqs[0] }) {
  const [open,setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid rgba(36,48,40,0.08)" }}>
      <button onClick={()=>setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-display italic text-base md:text-lg" style={{ color:"var(--color-ink)", letterSpacing:"-0.01em" }}>{faq.q}</span>
        <motion.span animate={{ rotate:open?45:0 }} transition={{ duration:0.2 }}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background:"rgba(36,48,40,0.05)", border:"1px solid rgba(36,48,40,0.1)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:0.28 }} className="overflow-hidden">
            <p className="font-body text-sm md:text-base leading-[1.85] pb-5" style={{ color:"rgba(26,34,24,0.55)" }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── 3D Room Card ── */
function RoomCard({ room, i }: { room:typeof rooms[0]; i:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount:0.2, once:true });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness:120, damping:20 });
  const sy = useSpring(my, { stiffness:120, damping:20 });
  const rotateX = useTransform(sy, [-0.5,0.5], ["8deg","-8deg"]);
  const rotateY = useTransform(sx, [-0.5,0.5], ["-8deg","8deg"]);
  const handleMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - rect.left)/rect.width - 0.5);
    my.set((e.clientY - rect.top)/rect.height - 0.5);
  };
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ delay:0.1+i*0.12, duration:0.75, ease:[0.22,1,0.36,1] }}
      onMouseMove={handleMove} onMouseLeave={()=>{ mx.set(0); my.set(0); }}
      style={{ perspective:"1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle:"preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer"
        whileHover={{ scale:1.02 }} transition={{ duration:0.3 }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio:"4/3" }}>
          <motion.img src={room.img} alt={room.name}
            className="w-full h-full object-cover"
            whileHover={{ scale:1.07 }} transition={{ duration:0.6 }}
          />
          <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(8,6,4,0.1) 0%, rgba(8,6,4,0.55) 100%)" }} />

          {/* Tag */}
          <div className="absolute top-4 left-4">
            <span className="font-body text-[9px] tracking-[0.28em] uppercase px-2.5 py-1.5 rounded-full"
              style={{ background:"rgba(212,168,83,0.2)", border:"1px solid rgba(212,168,83,0.4)", backdropFilter:"blur(8px)", color:"#f5d98a" }}>
              {room.tag}
            </span>
          </div>

          {/* Number */}
          <div className="absolute bottom-4 right-4">
            <span className="font-display italic" style={{ fontSize:"40px", color:"transparent", WebkitTextStroke:"1px rgba(247,242,232,0.25)", lineHeight:1 }}>
              {room.num}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6" style={{ background:"var(--color-cream-soft)", transformStyle:"preserve-3d" }}>
          <h3 className="font-display italic mb-2" style={{ fontSize:"clamp(1.1rem, 2vw, 1.5rem)", color:"var(--color-ink)", letterSpacing:"-0.015em" }}>
            {room.name}
          </h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {[room.guests, room.bed, room.view].map(t=>(
              <span key={t} className="font-body text-[10px] px-2.5 py-1 rounded-full"
                style={{ background:"rgba(36,48,40,0.05)", border:"1px solid rgba(36,48,40,0.08)", color:"rgba(26,34,24,0.55)" }}>{t}</span>
            ))}
          </div>
          <p className="font-body text-sm leading-[1.8] mb-4" style={{ color:"rgba(26,34,24,0.52)" }}>{room.desc}</p>
          <Link href="/contact#form"
            className="inline-flex items-center gap-2 font-body text-[12px] tracking-wide transition-colors duration-200"
            style={{ color:"var(--color-terracotta-dark)" }}>
            Room details
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Page ── */
export default function FarmsteadPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["0%","22%"]);
  const imgScale = useTransform(scrollYProgress, [0,1], [1,1.1]);
  const heroY = useTransform(scrollYProgress, [0,1], ["0%","35%"]);
  const heroOp = useTransform(scrollYProgress, [0,0.55], [1,0]);

  return (
    <>
      <Navbar />

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative w-full overflow-hidden"
        style={{ height:"100svh", minHeight:"640px", background:"#060806" }}>

        {/* Parallax BG */}
        <motion.div className="absolute inset-0" style={{ y:imgY, scale:imgScale }}>
          <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=90"
            alt="" className="w-full h-full object-cover" style={{ filter:"brightness(0.55) saturate(0.85)" }} />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom,rgba(6,8,6,0.2) 0%,rgba(6,8,6,0.08) 40%,rgba(6,8,6,0.88) 100%)" }} />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(6,8,6,0.5) 0%,transparent 65%)" }} />

        {/* Ghost word */}
        <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-12 pointer-events-none overflow-hidden" aria-hidden>
          <span className="font-display italic select-none" style={{
            fontSize:"clamp(70px,16vw,240px)", fontWeight:300, letterSpacing:"-0.045em",
            color:"transparent", WebkitTextStroke:"1px rgba(247,242,232,0.06)", lineHeight:1, whiteSpace:"nowrap",
          }}>Farmstead</span>
        </div>

        {/* Breadcrumb */}
        <motion.div className="absolute top-28 md:top-32 left-6 md:left-14 flex items-center gap-2 z-10"
          initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.6 }}>
          {["Home","/","Our Stays","/","Persimmon Farmstead"].map((s,i)=>(
            <span key={i} className="font-body text-[10px]"
              style={{ color: s==="Persimmon Farmstead" ? "rgba(212,168,83,0.7)" : "rgba(247,242,232,0.3)" }}>
              {s==="/" ? <span style={{ color:"rgba(247,242,232,0.15)" }}>/</span> : s}
            </span>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-14 lg:px-20 pb-12 md:pb-20"
          style={{ y:heroY, opacity:heroOp }}>
          <motion.div initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.25, duration:0.9, ease:[0.22,1,0.36,1] }}>

            <div className="flex items-center gap-3 mb-4">
              <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:"#d4a853" }}
                animate={{ opacity:[1,0.35,1] }} transition={{ duration:2.5, repeat:Infinity }} />
              <span className="font-body text-[10px] tracking-[0.32em] uppercase" style={{ color:"rgba(212,168,83,0.8)" }}>
                Badgran (14 Mile) · Manali
              </span>
            </div>

            <h1 className="font-display italic leading-[1.0] mb-5" style={{
              fontSize:"clamp(2.6rem,7.5vw,6.5rem)", letterSpacing:"-0.035em",
              color:"rgba(247,242,232,0.97)", textShadow:"0 4px 48px rgba(0,0,0,0.55)",
            }}>
              Persimmon<br />Farmstead
            </h1>

            <div className="mb-5" style={{ height:"1.5px", width:"60px", background:"linear-gradient(to right,rgba(212,168,83,0.9),transparent)", borderRadius:"2px" }} />

            <p className="font-body text-sm md:text-base max-w-lg mb-8" style={{ color:"rgba(247,242,232,0.45)", lineHeight:1.9 }}>
              A quiet boutique hotel in Manali, a minute off the highway — mountain views from every room and a restaurant the town talks about.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                <Link href="/contact#form"
                  className="inline-flex items-center justify-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-8 py-3.5"
                  style={{ background:"#d4a853", color:"#1a2218", fontWeight:500, boxShadow:"0 4px 20px rgba(212,168,83,0.35)" }}>
                  Check Dates
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </motion.div>
              <Link href="https://wa.me/916230645166" target="_blank"
                className="inline-flex items-center justify-center gap-2 font-body text-[13px] tracking-wide rounded-full px-7 py-3.5 transition-all duration-200"
                style={{ border:"1px solid rgba(247,242,232,0.2)", color:"rgba(247,242,232,0.72)" }}>
                WhatsApp Us
              </Link>
              <div className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full"
                style={{ border:"1px solid rgba(247,242,232,0.1)" }}>
                {[1,2,3,4,5].map(s=><svg key={s} width="10" height="10" viewBox="0 0 24 24" fill="#d4a853"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                <span className="font-body text-[11px] ml-1" style={{ color:"rgba(247,242,232,0.45)" }}>4.9 · 141+</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ STORY ══ */}
      <section className="relative w-full overflow-hidden" style={{ background:"var(--color-cream-soft)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Left text */}
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
                  <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>The story</p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-display italic leading-[1.08] mb-5" style={{
                  fontSize:"clamp(2rem,4.5vw,3.5rem)", color:"var(--color-ink)", letterSpacing:"-0.025em" }}>
                  Why this home<br />is the way it is.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <div style={{ height:"1.5px", width:"40px", background:"linear-gradient(to right,var(--color-terracotta),transparent)", borderRadius:"2px", marginBottom:"24px" }} />
              </Reveal>
              <Reveal delay={0.16}>
                <p className="font-body text-sm md:text-base leading-[1.95] mb-5" style={{ color:"rgba(26,34,24,0.58)" }}>
                  This is where Persimmon began. Two friends left corporate desks behind after the lockdowns, drove up to the Kullu valley, and decided to stay for good. The Farmstead is what they built first — timber chalets wrapped around an orchard, a minute's turn off the main highway and a world away from its noise.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-body text-sm md:text-base leading-[1.95] mb-5" style={{ color:"rgba(26,34,24,0.58)" }}>
                  The land does the heavy lifting. Rooms are angled to catch the first light, so in winter you wake up warm and sunlit with the ranges filling your window. Outside, apple and persimmon trees, a garden for the evening, and a kitchen garden the cooks raid every morning.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="font-body text-sm md:text-base leading-[1.95] mb-8" style={{ color:"rgba(26,34,24,0.58)" }}>
                  It is unfussy on purpose. The rooms are cosy rather than cavernous, the kitchen is a family kitchen rather than a hotel line — and both of those are the point. What you get instead is food made with care and hosts who notice when your chai is running low.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <div className="pl-4" style={{ borderLeft:"1.5px solid rgba(212,168,83,0.45)" }}>
                  <p className="font-display italic text-sm md:text-base" style={{ color:"rgba(26,34,24,0.38)", lineHeight:1.85 }}>
                    "Food made with care and hosts who notice when your chai is running low."
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right — staggered 3D image grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {storyImgs.map((img,i)=>(
                <Reveal key={i} delay={0.1+i*0.1} y={32}>
                  <motion.div
                    className="overflow-hidden rounded-xl md:rounded-2xl"
                    style={{ aspectRatio: i===0||i===3 ? "4/5" : "4/3", transformStyle:"preserve-3d" }}
                    whileHover={{ scale:1.03, rotateY:3, rotateX:-2 }}
                    transition={{ duration:0.4, ease:"easeOut" }}
                  >
                    <motion.img src={img} alt=""
                      className="w-full h-full object-cover"
                      whileHover={{ scale:1.08 }} transition={{ duration:0.6 }}
                    />
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ROOMS ══ */}
      <section style={{ background:"rgba(36,48,40,0.03)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-28">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
              <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>The rooms</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-3">
              <h2 className="font-display italic leading-tight" style={{
                fontSize:"clamp(1.8rem,4vw,3.2rem)", color:"var(--color-ink)", letterSpacing:"-0.025em" }}>
                Where you'll sleep.
              </h2>
              <p className="font-body text-sm md:text-base max-w-md" style={{ color:"rgba(26,34,24,0.45)", lineHeight:1.8 }}>
                Honest rooms, honestly described. Cosy rather than cavernous — with the views and the food doing the heavy lifting.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mb-10 md:mb-14 mt-2" style={{ height:"1.5px", background:"rgba(36,48,40,0.07)" }}>
              <motion.div className="h-full" style={{ background:"linear-gradient(to right,var(--color-terracotta),transparent)" }}
                initial={{ width:"0%" }} whileInView={{ width:"100%" }}
                transition={{ duration:1.2, ease:"easeOut" }} viewport={{ once:true }} />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {rooms.map((room,i)=><RoomCard key={i} room={room} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══ AMENITIES + DISTANCES side by side ══ */}
      <section style={{ background:"var(--color-cream-soft)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Amenities */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
                  <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>At this home</p>
                </div>
              </Reveal>
              <Reveal delay={0.06}><h2 className="font-display italic mb-8" style={{ fontSize:"clamp(1.6rem,3.5vw,2.6rem)", color:"var(--color-ink)", letterSpacing:"-0.02em" }}>What's here.</h2></Reveal>
              <div className="flex flex-col gap-0">
                {amenities.map((a,i)=>(
                  <Reveal key={i} delay={0.04*i}>
                    <div className="flex items-center gap-3 py-3" style={{ borderBottom:"1px solid rgba(36,48,40,0.07)" }}>
                      <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ background:"rgba(212,168,83,0.14)", border:"1px solid rgba(212,168,83,0.28)" }}>
                        <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#d4a853" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="font-body text-sm" style={{ color:"rgba(26,34,24,0.68)" }}>{a}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Distances */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
                  <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>Getting your bearings</p>
                </div>
              </Reveal>
              <Reveal delay={0.06}><h2 className="font-display italic mb-8" style={{ fontSize:"clamp(1.6rem,3.5vw,2.6rem)", color:"var(--color-ink)", letterSpacing:"-0.02em" }}>How far is everything.</h2></Reveal>
              <div className="overflow-hidden rounded-2xl" style={{ border:"1px solid rgba(36,48,40,0.08)" }}>
                <div className="px-5 py-3" style={{ background:"rgba(36,48,40,0.04)", borderBottom:"1px solid rgba(36,48,40,0.07)" }}>
                  <div className="flex justify-between">
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color:"rgba(26,34,24,0.4)" }}>Landmark</span>
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color:"rgba(26,34,24,0.4)" }}>Distance</span>
                  </div>
                </div>
                {distances.map((d,i)=>(
                  <Reveal key={i} delay={0.05*i}>
                    <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom:i<distances.length-1?"1px solid rgba(36,48,40,0.06)":"none" }}>
                      <div>
                        <p className="font-body text-sm" style={{ color:"rgba(26,34,24,0.72)" }}>{d.place}</p>
                        {d.note&&<p className="font-body text-[10px] mt-0.5" style={{ color:"rgba(26,34,24,0.35)" }}>{d.note}</p>}
                      </div>
                      <span className="font-display italic text-base flex-shrink-0 ml-4" style={{ color:"var(--color-terracotta-dark)" }}>{d.dist}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2}>
                <div className="mt-5 overflow-hidden rounded-2xl" style={{ height:"220px" }}>
                  <iframe src="https://maps.google.com/maps?q=Persimmon%20Farmstead%2C%2014%20Mile%20Bypass%2C%20Badgran%2C%20Manali%20175129&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%" height="100%" style={{ border:0 }} allowFullScreen loading="lazy" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOOK ══ */}
      <section style={{ background:"var(--color-ink)" }}>
        <div className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24 text-center">
          <Reveal>
            <p className="font-body text-[9px] tracking-[0.38em] uppercase mb-5" style={{ color:"rgba(212,168,83,0.55)" }}>Plan your stay</p>
            <h2 className="font-display italic mb-4" style={{ fontSize:"clamp(1.8rem,4vw,3.2rem)", color:"rgba(247,242,232,0.95)", letterSpacing:"-0.025em" }}>
              Come stay at The Farmstead.
            </h2>
            <div className="mb-5 mx-auto" style={{ height:"1.5px", width:"48px", background:"linear-gradient(to right,transparent,rgba(212,168,83,0.6),transparent)" }} />
            <p className="font-body text-sm md:text-base mb-10 max-w-md mx-auto" style={{ color:"rgba(247,242,232,0.38)", lineHeight:1.9 }}>
              You send a request, a real host confirms it by WhatsApp — usually within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                <Link href="/contact#form"
                  className="inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-8 py-3.5"
                  style={{ background:"#d4a853", color:"#1a2218", fontWeight:500 }}>
                  Check Availability
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </motion.div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              {[{l:"+91 62306 45166",r:"916230645166"},{l:"+91 99999 75545",r:"919999975545"},{l:"+91 88005 00292",r:"918800500292"}].map(p=>(
                <Link key={p.r} href={`https://wa.me/${p.r}`} target="_blank"
                  className="inline-flex items-center justify-center gap-2 font-body text-[11px] tracking-wide rounded-full px-5 py-2.5 transition-all duration-200"
                  style={{ border:"1px solid rgba(247,242,232,0.1)", color:"rgba(247,242,232,0.45)" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(212,168,83,0.4)";(e.currentTarget as HTMLElement).style.color="rgba(212,168,83,0.8)"}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(247,242,232,0.1)";(e.currentTarget as HTMLElement).style.color="rgba(247,242,232,0.45)"}}>
                  {p.l}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FAQs ══ */}
      <section style={{ background:"var(--color-cream-soft)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-3xl mx-auto px-5 md:px-12 py-14 md:py-24">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
              <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>Questions</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display italic mb-10" style={{ fontSize:"clamp(1.8rem,4vw,3rem)", color:"var(--color-ink)", letterSpacing:"-0.025em" }}>
              Questions about staying with us.
            </h2>
          </Reveal>
          {faqs.map((faq,i)=><FAQ key={i} faq={faq} />)}
        </div>
      </section>

      {/* ══ OTHER PROPERTY ══ */}
      <section style={{ background:"rgba(36,48,40,0.03)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-12 md:py-20">
          <Reveal>
            <p className="font-body text-[9px] tracking-[0.38em] uppercase mb-6" style={{ color:"var(--color-terracotta-dark)" }}>The other homes</p>
            <motion.div className="relative overflow-hidden rounded-2xl md:rounded-3xl"
              whileHover={{ scale:1.01 }} transition={{ duration:0.4 }}>
              <img src="https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1400&q=80" alt=""
                className="absolute inset-0 w-full h-full object-cover" style={{ filter:"brightness(0.4) saturate(0.8)" }} />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(6,8,6,0.7) 0%,rgba(6,8,6,0.2) 100%)" }} />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 md:p-12">
                <div>
                  <p className="font-body text-[9px] tracking-[0.28em] uppercase mb-2" style={{ color:"rgba(212,168,83,0.7)" }}>Shanag (Bahang) · Manali</p>
                  <h3 className="font-display italic mb-2" style={{ fontSize:"clamp(1.4rem,3vw,2.4rem)", color:"rgba(247,242,232,0.96)", letterSpacing:"-0.02em" }}>
                    Persimmon Farmstead Shanag
                  </h3>
                  <p className="font-body text-sm" style={{ color:"rgba(247,242,232,0.4)" }}>
                    Wooden chalets and stone cottages on open orchard lawns near Old Manali.
                  </p>
                </div>
                <motion.div whileHover={{ x:4 }} transition={{ duration:0.2 }}>
                  <Link href="/stays/shanag"
                    className="flex-shrink-0 inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3"
                    style={{ background:"#d4a853", color:"#1a2218", fontWeight:500 }}>
                    View Property
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}