"use client";

import { useRef } from "react";
import {
  motion, useScroll, useTransform, useInView,
  useMotionValue, useSpring, useReducedMotion, useMotionTemplate,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ── Data ── */
const property = {
  name: "Persimmon Farmstead Shanag",
  location: "Shanag (Bahang) · Manali",
  tagline: "Apple trees, snow-kissed peaks.",
  description:
    "Our boutique hotel in Shanag village near Bahang, about 4–5 km north of Manali. It blends wooden chalets and stone cottages across wide orchard lawns — close enough to Old Manali and Mall Road to wander in, far enough to wake up to apple trees and snow-kissed peaks.",
  rating: "4.9",
  reviews: "141+",
  img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1920&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1596397249129-c7a8f8e05a4e?w=900&q=80",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=80",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80",
  ],
  amenities: ["Wooden chalets", "Stone cottages", "Orchard lawns", "Near Old Manali", "Apple trees", "Snow peak views"],
  mapEmbed: "https://www.google.com/maps?q=32.306541,77.17561&z=13&output=embed",
};
const whatsapp = [
  { l: "+91 62306 45166", r: "916230645166" },
  { l: "+91 99999 75545", r: "919999975545" },
  { l: "+91 88005 00292", r: "918800500292" },
];

/* ── Reveal (reduced-motion aware) ── */
function Reveal({ children, delay=0, y=24 }: { children:React.ReactNode; delay?:number; y?:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount:0.15, once:true });
  const reduce = useReducedMotion();
  return (
    <motion.div ref={ref}
      initial={reduce ? { opacity:0 } : { opacity:0, y }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay, duration:0.7, ease:[0.22,1,0.36,1] }}>
      {children}
    </motion.div>
  );
}

/* ── Shared cursor-driven 3D tilt (with glare) ── */
function useTilt(max = 9, softness = { stiffness: 150, damping: 18 }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, softness);
  const sy = useSpring(my, softness);
  const rotateX = useTransform(sy, [-0.5, 0.5], [`${max}deg`, `${-max}deg`]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [`${-max}deg`, `${max}deg`]);
  const gx = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const gy = useTransform(sy, [-0.5, 0.5], ["18%", "82%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(247,242,232,0.22), transparent 60%)`;
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  return { reduce, rotateX, rotateY, glare, onMove, onLeave };
}

/* ── 3D gallery image — tilt + glare ── */
function TiltImage({ img, i }: { img:string; i:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount:0.2, once:true });
  const { reduce, rotateX, rotateY, glare, onMove, onLeave } = useTilt(10, { stiffness:120, damping:16 });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:32 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ delay:0.1+i*0.1, duration:0.7, ease:[0.22,1,0.36,1] }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ perspective: reduce ? undefined : "900px" }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio:"4/3", rotateX, rotateY, transformStyle:"preserve-3d" }}
        whileHover={reduce ? undefined : { scale:1.03 }}
        transition={{ duration:0.4, ease:"easeOut" }}
      >
        <motion.img src={img} alt=""
          className="w-full h-full object-cover"
          whileHover={reduce ? undefined : { scale:1.08 }} transition={{ duration:0.6 }}
        />
        {!reduce && (
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: glare, mixBlendMode:"soft-light" }} />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Other-property banner with subtle tilt + glare ── */
function OtherPropertyCard() {
  const { reduce, rotateX, rotateY, glare, onMove, onLeave } = useTilt(4, { stiffness:80, damping:18 });
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: reduce ? undefined : "1200px" }}>
      <motion.div className="relative overflow-hidden rounded-2xl md:rounded-3xl"
        style={{ rotateX, rotateY, transformStyle:"preserve-3d" }}
        whileHover={reduce ? undefined : { scale:1.01 }} transition={{ duration:0.4 }}>
        <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80" alt=""
          className="absolute inset-0 w-full h-full object-cover" style={{ filter:"brightness(0.4) saturate(0.8)" }} />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(6,8,6,0.7) 0%,rgba(6,8,6,0.2) 100%)" }} />
        {!reduce && (
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: glare, mixBlendMode:"soft-light" }} />
        )}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 md:p-12"
          style={{ transform: reduce ? undefined : "translateZ(40px)" }}>
          <div>
            <p className="font-body text-[9px] tracking-[0.28em] uppercase mb-2" style={{ color:"rgba(212,168,83,0.7)" }}>Badgran (14 Mile) · Manali</p>
            <h3 className="font-display italic mb-2" style={{ fontSize:"clamp(1.4rem,3vw,2.4rem)", color:"rgba(247,242,232,0.96)", letterSpacing:"-0.02em" }}>
              Persimmon Farmstead
            </h3>
            <p className="font-body text-sm" style={{ color:"rgba(247,242,232,0.4)" }}>
              Our flagship boutique hotel, a minute off the highway with mountain views from every room.
            </p>
          </div>
          <motion.div whileHover={reduce ? undefined : { x:4 }} transition={{ duration:0.2 }}>
            <Link href="/stays/farmstead"
              className="flex-shrink-0 inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3"
              style={{ background:"#d4a853", color:"#1a2218", fontWeight:500 }}>
              View Property
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Page ── */
export default function ShanagPage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["0%","22%"]);
  const imgScale = useTransform(scrollYProgress, [0,1], [1,1.1]);
  const heroY = useTransform(scrollYProgress, [0,1], ["0%","32%"]);
  const heroOp = useTransform(scrollYProgress, [0,0.6], [1,0]);

  // hero mouse parallax (depth)
  const hmx = useMotionValue(0);
  const hmy = useMotionValue(0);
  const hsx = useSpring(hmx, { stiffness:55, damping:18 });
  const hsy = useSpring(hmy, { stiffness:55, damping:18 });
  const bgX = useTransform(hsx, [-0.5,0.5], ["-14px","14px"]);
  const bgXY = useTransform(hsy, [-0.5,0.5], ["-9px","9px"]);
  const ghostX = useTransform(hsx, [-0.5,0.5], ["26px","-26px"]);
  const ghostY = useTransform(hsy, [-0.5,0.5], ["16px","-16px"]);
  const heroMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    hmx.set((e.clientX - r.left) / r.width - 0.5);
    hmy.set((e.clientY - r.top) / r.height - 0.5);
  };
  const heroLeave = () => { hmx.set(0); hmy.set(0); };

  return (
    <>
      <Navbar />

      {/* ══ HERO ══ */}
      <section ref={heroRef} onMouseMove={heroMove} onMouseLeave={heroLeave}
        className="relative w-full overflow-hidden"
        style={{ height:"92svh", minHeight:"600px", background:"#060806" }}>

        {/* Parallax BG (scroll) + mouse depth */}
        <motion.div className="absolute inset-0" style={{ y:imgY, scale:imgScale }}>
          <motion.img src={property.img} alt={property.name}
            className="w-full h-full object-cover"
            style={{ filter:"brightness(0.58) saturate(0.85)", x:bgX, y:bgXY, scale:1.08 }} />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom,rgba(6,8,6,0.2) 0%,rgba(6,8,6,0.08) 40%,rgba(6,8,6,0.9) 100%)" }} />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(6,8,6,0.5) 0%,transparent 65%)" }} />

        {/* Ghost word — mouse depth */}
        <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-12 pointer-events-none overflow-hidden" aria-hidden>
          <motion.span className="font-display italic select-none" style={{
            fontSize:"clamp(70px,16vw,240px)", fontWeight:300, letterSpacing:"-0.045em",
            color:"transparent", WebkitTextStroke:"1px rgba(247,242,232,0.06)", lineHeight:1, whiteSpace:"nowrap",
            x:ghostX, y:ghostY,
          }}>Shanag</motion.span>
        </div>

        {/* Breadcrumb */}
        <motion.div className="absolute top-28 md:top-32 left-6 md:left-14 flex items-center gap-2 z-10"
          initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.6 }}>
          {["Home","/","Our Stays","/","Farmstead Shanag"].map((s,i)=>(
            <span key={i} className="font-body text-[10px]"
              style={{ color: s==="Farmstead Shanag" ? "rgba(212,168,83,0.7)" : "rgba(247,242,232,0.3)" }}>
              {s==="/" ? <span style={{ color:"rgba(247,242,232,0.15)" }}>/</span> : s}
            </span>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-14 lg:px-20 pb-12 md:pb-20"
          style={{ y:heroY, opacity:heroOp }}>
          <motion.div initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.25, duration:0.9, ease:[0.22,1,0.36,1] }} className="max-w-3xl">

            <div className="flex items-center gap-3 mb-4">
              <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:"#d4a853" }}
                animate={{ opacity:[1,0.35,1] }} transition={{ duration:2.5, repeat:Infinity }} />
              <span className="font-body text-[10px] tracking-[0.32em] uppercase" style={{ color:"rgba(212,168,83,0.8)" }}>
                {property.location}
              </span>
            </div>

            <h1 className="font-display italic leading-[1.02] mb-5" style={{
              fontSize:"clamp(2.4rem,7vw,5.8rem)", letterSpacing:"-0.035em",
              color:"rgba(247,242,232,0.97)", textShadow:"0 4px 48px rgba(0,0,0,0.55)",
            }}>
              {property.name}
            </h1>

            <div className="mb-5" style={{ height:"1.5px", width:"60px", background:"linear-gradient(to right,rgba(212,168,83,0.9),transparent)", borderRadius:"2px" }} />

            <p className="font-body text-sm md:text-base max-w-xl mb-8" style={{ color:"rgba(247,242,232,0.5)", lineHeight:1.9 }}>
              {property.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={reduce ? undefined : { scale:1.03 }} whileTap={{ scale:0.97 }}>
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
                <span className="font-body text-[11px] ml-1" style={{ color:"rgba(247,242,232,0.45)" }}>{property.rating} · {property.reviews}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ ABOUT ══ */}
      <section className="relative w-full overflow-hidden" style={{ background:"var(--color-cream-soft)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Text */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
                  <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>About this property</p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-display italic leading-[1.1] mb-5" style={{
                  fontSize:"clamp(2rem,4.5vw,3.4rem)", color:"var(--color-ink)", letterSpacing:"-0.025em" }}>
                  Chalets and cottages<br />on orchard lawns.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <div style={{ height:"1.5px", width:"40px", background:"linear-gradient(to right,var(--color-terracotta),transparent)", borderRadius:"2px", marginBottom:"24px" }} />
              </Reveal>
              <Reveal delay={0.16}>
                <p className="font-body text-sm md:text-base leading-[1.95]" style={{ color:"rgba(26,34,24,0.58)" }}>
                  {property.description}
                </p>
              </Reveal>
            </div>

            {/* Framed tilt photo */}
            <TiltImage img={property.gallery[0]} i={0} />
          </div>
        </div>
      </section>

      {/* ══ AMENITIES ══ */}
      <section style={{ background:"rgba(36,48,40,0.03)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
              <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>What&apos;s included</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display italic mb-10" style={{ fontSize:"clamp(1.6rem,3.5vw,2.6rem)", color:"var(--color-ink)", letterSpacing:"-0.02em" }}>
              What&apos;s here.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
            {property.amenities.map((a,i)=>(
              <Reveal key={a} delay={0.04*i}>
                <div className="flex items-center gap-3 py-3.5" style={{ borderBottom:"1px solid rgba(36,48,40,0.07)" }}>
                  <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background:"rgba(212,168,83,0.14)", border:"1px solid rgba(212,168,83,0.28)" }}>
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#d4a853" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="font-body text-sm md:text-[15px]" style={{ color:"rgba(26,34,24,0.68)" }}>{a}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section style={{ background:"var(--color-cream-soft)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
              <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>The grounds</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {property.gallery.map((img,i)=>(
              <TiltImage key={i} img={img} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAP ══ */}
      <section style={{ background:"var(--color-cream)", borderTop:"1px solid rgba(36,48,40,0.08)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background:"var(--color-terracotta)" }} />
                <p className="font-body text-[9px] tracking-[0.38em] uppercase" style={{ color:"var(--color-terracotta-dark)" }}>Find us</p>
              </div>
              <h2 className="font-display italic text-ink leading-tight mb-4" style={{ fontSize:"clamp(1.7rem,3.4vw,2.6rem)" }}>
                {property.location}
              </h2>
              <p className="text-ink/60 font-body text-sm leading-relaxed max-w-sm">
                4–5 km north of Manali, above Old Manali near Bahang. Fly into Bhuntar (Kullu) and we&apos;ll help arrange your transfer once your dates are confirmed.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12} y={40}>
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-[0_35px_70px_-20px_rgba(43,27,17,0.35)]">
              <iframe title={`${property.name} location map`} src={property.mapEmbed} className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ BOOK ══ */}
      <section style={{ background:"var(--color-ink)" }}>
        <div className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24 text-center">
          <Reveal>
            <p className="font-body text-[9px] tracking-[0.38em] uppercase mb-5" style={{ color:"rgba(212,168,83,0.55)" }}>Plan your stay</p>
            <h2 className="font-display italic mb-4" style={{ fontSize:"clamp(1.8rem,4vw,3.2rem)", color:"rgba(247,242,232,0.95)", letterSpacing:"-0.025em" }}>
              Come stay at Shanag.
            </h2>
            <div className="mb-5 mx-auto" style={{ height:"1.5px", width:"48px", background:"linear-gradient(to right,transparent,rgba(212,168,83,0.6),transparent)" }} />
            <p className="font-body text-sm md:text-base mb-10 max-w-md mx-auto" style={{ color:"rgba(247,242,232,0.38)", lineHeight:1.9 }}>
              You send a request, a real host confirms it by WhatsApp — usually within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <motion.div whileHover={reduce ? undefined : { scale:1.03 }} whileTap={{ scale:0.97 }}>
                <Link href="/contact#form"
                  className="inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-8 py-3.5"
                  style={{ background:"#d4a853", color:"#1a2218", fontWeight:500 }}>
                  Check Availability
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </motion.div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              {whatsapp.map(p=>(
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

      {/* ══ OTHER PROPERTY ══ */}
      <section style={{ background:"rgba(36,48,40,0.03)", borderTop:"1px solid rgba(36,48,40,0.07)" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-12 py-12 md:py-20">
          <Reveal>
            <p className="font-body text-[9px] tracking-[0.38em] uppercase mb-6" style={{ color:"var(--color-terracotta-dark)" }}>The other home</p>
            <OtherPropertyCard />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
