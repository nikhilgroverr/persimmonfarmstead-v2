"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

type PhotoGroup = { title: string; folder: string; prefix: string; count: number };

const photoGroups: PhotoGroup[] = [
  { title: "Deluxe Room", folder: "/images/farmstead/rooms/deluxe-room", prefix: "deluxe", count: 13 },
  { title: "Premium Room", folder: "/images/farmstead/rooms/premium-room", prefix: "pr", count: 13 },
  { title: "Badagran", folder: "/images/farmstead/badagran", prefix: "gallery-", count: 5 },
  { title: "Wooden Hut Cottage", folder: "/images/shanag/rooms/wooden-hut-cottage", prefix: "WHC", count: 12 },
  { title: "2BHK Cottage", folder: "/images/shanag/rooms/2bhk-cottage", prefix: "2BHKC", count: 19 },
  { title: "Deluxe Cottage", folder: "/images/shanag/rooms/deluxe-cottage", prefix: "cottage", count: 7 },
  { title: "3BHK Cottage", folder: "/images/shanag/rooms/3bhk-cottage", prefix: "3BHKC", count: 18 },
];

const shanagGalleryIds = [
  "KIN01880", "KIN01882", "KIN01883", "KIN01884", "KIN01887", "KIN01889",
  "KIN01892", "KIN01893", "KIN01895", "KIN1900", "KIN1901", "KIN1902",
  "KIN01905", "KIN01906", "KIN01910", "KIN01915",
];

let _id = 1;
const photos = [
  ...photoGroups.flatMap((g) =>
    Array.from({ length: g.count }, (_, i) => ({
      id: _id++,
      title: g.title,
      // Caption honestly reflects only what's actually known — the real
      // room/gallery this photo belongs to — not a fabricated per-photo
      // number or description.
      name: g.title,
      img: `${g.folder}/${g.prefix}${i + 1}.webp`,
    }))
  ),
  ...shanagGalleryIds.map((id) => ({
    id: _id++,
    title: "Shanag",
    name: "Shanag",
    img: `/images/shanag/${id}.webp`,
  })),
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Each shape is a different asymmetric silhouette — the frame itself
// slowly morphs between these as the photo cycles, rather than staying
// a fixed rectangle. Long transition duration so the shift is felt, not seen.
const SHAPES = [
  "rounded-tl-[12px] rounded-tr-[180px] rounded-br-[12px] rounded-bl-[180px]",
  "rounded-tl-[180px] rounded-tr-[12px] rounded-br-[180px] rounded-bl-[12px]",
  "rounded-t-[999px] rounded-b-3xl",
  "rounded-b-[999px] rounded-t-3xl",
  "rounded-[28px]",
  "rounded-tl-[999px] rounded-tr-3xl rounded-br-[999px] rounded-bl-3xl",
];

const HOLD_MS = 2500;

export default function HomeImageGallery() {
  const reduce = useReducedMotion();
  const n = photos.length;
  const [shuffled, setShuffled] = useState(photos);
  useEffect(() => {
    setShuffled(shuffle(photos));
  }, []);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    photos.forEach((p) => { const img = new Image(); img.src = p.img; });
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % n), HOLD_MS);
    return () => clearInterval(id);
  }, [reduce, paused, n]);

  const photo = shuffled[index];
  const prevPhoto = shuffled[(index - 1 + n) % n];
  const nextPhoto = shuffled[(index + 1) % n];

  return (
    <section
      className="relative w-full py-28 md:py-40 overflow-hidden"
      style={{ background: "var(--color-cream-soft)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(194,105,28,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 mb-16 md:mb-20 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.6 }} aria-hidden="true" />
          <p className="font-body text-[10px] tracking-[0.44em] uppercase" style={{ color: ACCENT }}>The Gallery</p>
          <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.6 }} aria-hidden="true" />
        </div>
        <h2 className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.1rem,4.2vw,3rem)", color: "var(--color-ink)" }}>
          Moments worth keeping.
        </h2>
      </div>

      {/* ── Stage — one living, morphing frame at the center, two dimmed
           silhouettes just visible at the edges hinting at more without
           becoming a full fan. ── */}
      <div className="relative max-w-5xl mx-auto px-6 flex items-center justify-center" style={{ minHeight: "clamp(420px, 60vh, 620px)" }}>

        {/* left ghost — barely visible, cropped by the viewport edge */}
        <div
          aria-hidden
          className="hidden md:block absolute overflow-hidden pointer-events-none"
          style={{
            left: "-8%",
            width: "min(30vw, 260px)",
            height: "min(38vw, 340px)",
            borderRadius: "24px",
            opacity: 0.24,
            filter: "blur(3px) saturate(0.65)",
            transform: "scale(0.9) rotate(-4deg)",
          }}
        >
          <img src={prevPhoto.img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, var(--color-cream-soft))" }} />
        </div>

        {/* right ghost */}
        <div
          aria-hidden
          className="hidden md:block absolute overflow-hidden pointer-events-none"
          style={{
            right: "-8%",
            width: "min(30vw, 260px)",
            height: "min(38vw, 340px)",
            borderRadius: "24px",
            opacity: 0.24,
            filter: "blur(3px) saturate(0.65)",
            transform: "scale(0.9) rotate(4deg)",
          }}
        >
          <img src={nextPhoto.img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to left, transparent, var(--color-cream-soft))" }} />
        </div>

        {/* the living frame itself */}
        <motion.div
          className={`relative z-10 overflow-hidden transition-[border-radius] duration-[2800ms] ease-in-out ${SHAPES[index % SHAPES.length]}`}
          style={{
            width: "min(74vw, 460px)",
            aspectRatio: "4/5",
            boxShadow: "0 70px 130px -50px rgba(43,27,17,0.5)",
          }}
        >
          <AnimatePresence mode="sync">
            <motion.img
              key={photo.id}
              src={photo.img}
              alt={photo.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.4, ease: "linear" }, scale: { duration: (HOLD_MS + 1400) / 1000, ease: "linear" } }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(13,19,15,0.6) 0%, rgba(13,19,15,0.02) 40%, transparent 60%)" }}
          />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
            <AnimatePresence mode="wait">
              <motion.div key={photo.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: "easeInOut" }}>
                <p className="font-body text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(212,168,83,0.85)" }}>{photo.title}</p>
                <p className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.4rem,3vw,1.95rem)", color: "rgba(247,242,232,0.97)" }}>
                  {photo.name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* small engraved plate beneath, gold flourish either side */}
      <div className="flex items-center justify-center gap-3 mt-10 md:mt-12">
        <span className="h-px w-6" style={{ background: "rgba(212,168,83,0.5)" }} />
        <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD }} />
        <p className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(26,34,24,0.35)" }}>
          Persimmon Farmstead
        </p>
        <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD }} />
        <span className="h-px w-6" style={{ background: "rgba(212,168,83,0.5)" }} />
      </div>

      <div className="flex justify-center mt-14 md:mt-16">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 font-body text-sm tracking-wide uppercase transition-all duration-300 hover:scale-[1.03]"
          style={{ background: ACCENT, color: "#fff" }}
        >
          View full gallery
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}