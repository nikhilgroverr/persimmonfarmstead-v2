"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

const galleryPhotos = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery-full/${i + 1}.webp`,
  alt: `Persimmon Farmstead — photo ${i + 1}`,
}));

const PAGE_SIZE = 12;

export default function GalleryPage() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = galleryPhotos.slice(0, visible);

  return (
    <main style={{ background: "var(--color-cream-soft)" }}>
      <Navbar />

      <section className="relative w-full pt-32 pb-14 md:pt-40 md:pb-16 px-5 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
            <p className="font-body text-[10px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>The Full Gallery</p>
            <span className="h-px w-10" style={{ background: ACCENT, opacity: 0.7 }} />
          </div>
          <h1 className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(2.2rem,5vw,3.6rem)", color: "var(--color-ink)" }}>
            Every corner of the farmstead.
          </h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-12 pb-24 md:pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {shown.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setLightbox(i)}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl"
              style={{
                aspectRatio: i % 7 === 0 ? "3/4" : "1/1",
                boxShadow: "0 20px 45px -28px rgba(43,27,17,0.4)",
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(13,19,15,0.15)" }}
              />
            </button>
          ))}
        </div>

        {visible < galleryPhotos.length && (
          <div className="flex justify-center mt-10 md:mt-14">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 font-body text-sm tracking-wide uppercase transition-all duration-300 hover:scale-[1.03]"
              style={{ border: `1px solid rgba(194,105,28,0.4)`, color: ACCENT }}
            >
              Load more photos
            </button>
          </div>
        )}
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(8,10,8,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center"
            style={{ border: "1px solid rgba(247,242,232,0.3)", color: "rgba(247,242,232,0.9)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          {lightbox > 0 && (
            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l !== null ? l - 1 : l)); }}
              className="absolute left-4 md:left-8 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ border: "1px solid rgba(247,242,232,0.3)", color: "rgba(247,242,232,0.9)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
          )}
          {lightbox < shown.length - 1 && (
            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l !== null ? l + 1 : l)); }}
              className="absolute right-4 md:right-8 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ border: "1px solid rgba(247,242,232,0.3)", color: "rgba(247,242,232,0.9)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          )}
          <img
            src={shown[lightbox].src}
            alt={shown[lightbox].alt}
            className="max-w-full max-h-full rounded-lg"
            style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,0.7)" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </main>
  );
}