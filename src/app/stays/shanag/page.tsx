"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const property = {
  name: "Persimmon Farmstead Shanag",
  location: "Shanag (Bahang) · Manali",
  tagline: "Apple trees, snow-kissed peaks.",
  description: "Our boutique hotel in Shanag village near Bahang, about 4–5 km north of Manali. It blends wooden chalets and stone cottages across wide orchard lawns — close enough to Old Manali and Mall Road to wander in, far enough to wake up to apple trees and snow-kissed peaks.",
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

export default function ShanagPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: "80vh", minHeight: "500px" }}>
        <img src={property.img} alt={property.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,6,4,0.3) 0%, rgba(8,6,4,0.8) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 lg:px-20 pb-14 md:pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1 h-1 rounded-full" style={{ background: "#d4a853" }} />
              <span className="font-body text-[10px] tracking-[0.32em] uppercase" style={{ color: "rgba(212,168,83,0.8)" }}>
                {property.location}
              </span>
            </div>
            <h1 className="font-display italic leading-[1.05] mb-5" style={{
              fontSize: "clamp(2.2rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              color: "rgba(247,242,232,0.97)",
              textShadow: "0 4px 32px rgba(0,0,0,0.5)",
            }}>
              {property.name}
            </h1>
            <div className="mb-5" style={{ height: "1.5px", width: "52px", background: "linear-gradient(to right,rgba(212,168,83,0.8),transparent)", borderRadius: "2px" }} />
            <p className="font-body text-sm md:text-base max-w-xl mb-8" style={{ color: "rgba(247,242,232,0.5)", lineHeight: 1.9 }}>
              {property.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact#form"
                className="inline-flex items-center justify-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-8 py-3.5"
                style={{ background: "#d4a853", color: "#1a2218", fontWeight: 500 }}>
                Check Dates
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <div className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full" style={{ border: "1px solid rgba(247,242,232,0.2)" }}>
                {[1,2,3,4,5].map(s => <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill="#d4a853"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                <span className="font-body text-[12px] ml-1" style={{ color: "rgba(247,242,232,0.6)" }}>{property.rating} · {property.reviews} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="w-full" style={{ background: "var(--color-cream-soft)" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-14 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <p className="font-body text-[10px] tracking-[0.38em] uppercase mb-4" style={{ color: "var(--color-terracotta-dark)" }}>About this property</p>
              <h2 className="font-display italic leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
                Chalets and cottages on orchard lawns.
              </h2>
              <div className="mb-5" style={{ height: "1.5px", width: "40px", background: "linear-gradient(to right,var(--color-terracotta),transparent)" }} />
              <p className="font-body text-sm md:text-base leading-[1.9]" style={{ color: "rgba(26,34,24,0.55)" }}>
                {property.description}
              </p>
            </div>
            <div>
              <p className="font-body text-[10px] tracking-[0.38em] uppercase mb-5" style={{ color: "var(--color-terracotta-dark)" }}>What's included</p>
              <div className="flex flex-col gap-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,168,83,0.15)", border: "1px solid rgba(212,168,83,0.3)" }}>
                      <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#d4a853" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="font-body text-sm" style={{ color: "rgba(26,34,24,0.65)" }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ background: "var(--color-cream-soft)", paddingBottom: "80px" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {property.gallery.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section style={{ background: "var(--color-cream-soft)", paddingBottom: "80px" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <p className="font-body text-[10px] tracking-[0.38em] uppercase mb-4" style={{ color: "var(--color-terracotta-dark)" }}>Find us</p>
          <div className="overflow-hidden rounded-2xl" style={{ height: "360px" }}>
            <iframe src={property.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
          </div>
        </div>
      </section>

      {/* Other property */}
      <section style={{ background: "rgba(36,48,40,0.04)", borderTop: "1px solid rgba(36,48,40,0.08)" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-body text-[10px] tracking-[0.38em] uppercase mb-2" style={{ color: "var(--color-terracotta-dark)" }}>Also by Persimmon</p>
            <h3 className="font-display italic" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
              Persimmon Farmstead
            </h3>
            <p className="font-body text-sm mt-1" style={{ color: "rgba(26,34,24,0.45)" }}>Badgran (14 Mile) · Kullu–Manali Highway</p>
          </div>
          <Link href="/stays/farmstead"
            className="flex-shrink-0 inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3"
            style={{ background: "var(--color-terracotta-dark)", color: "var(--color-cream-soft)" }}>
            View Property
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}