import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { properties, mailtoHref, type Property } from "@/lib/site";

function Stars({ tone = "gold" }: { tone?: "gold" | "cream" }) {
  const fill = tone === "gold" ? "#d4a853" : "rgba(247,242,232,0.95)";
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={fill}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function PropertyDetail({ property }: { property: Property }) {
  const other = properties.find((p) => p.slug !== property.slug);
  const bookHref = mailtoHref(`Booking enquiry — ${property.name}`);

  return (
    <main>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "78vh", display: "flex", alignItems: "flex-end", background: "#0e1a12" }}>
        <div className="absolute inset-0">
          <img src={property.image} alt={property.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.7) saturate(0.92)" }} />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,14,10,0.35) 0%, rgba(8,14,10,0.15) 40%, rgba(8,14,10,0.9) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,14,10,0.55) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full px-5 md:px-10 pb-14 md:pb-20 pt-36">
          <Reveal>
            <div className="flex items-center gap-2 mb-5" style={{ color: "rgba(247,242,232,0.6)" }}>
              <PinIcon />
              <span className="font-body text-[10px] md:text-[11px] tracking-[0.28em] uppercase">{property.locationShort}</span>
              {property.flagship && (
                <span className="font-body text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ml-1" style={{ background: "rgba(212,168,83,0.2)", border: "1px solid rgba(212,168,83,0.4)", color: "#f5d98a" }}>
                  ✦ Flagship
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display italic leading-[1.03] mb-6 max-w-3xl" style={{ fontSize: "clamp(2.4rem, 6.5vw, 5rem)", letterSpacing: "-0.03em", color: "rgba(247,242,232,0.98)", textShadow: "0 6px 32px rgba(0,0,0,0.45)" }}>
              {property.name}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex flex-wrap items-center gap-4">
              <a href={bookHref} className="inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3.5 transition-transform duration-300 hover:scale-[1.03]" style={{ background: "#d4a853", color: "#1a2218", fontWeight: 500 }}>
                Check dates
                <Arrow />
              </a>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "rgba(247,242,232,0.1)", border: "1px solid rgba(247,242,232,0.2)", backdropFilter: "blur(8px)" }}>
                <Stars tone="cream" />
                <span className="font-body text-[13px] font-medium" style={{ color: "rgba(247,242,232,0.95)" }}>{property.rating.toFixed(1)}</span>
                <span className="font-body text-[11px]" style={{ color: "rgba(247,242,232,0.6)" }}>· {property.reviews} reviews</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="relative w-full bg-cream-soft py-16 md:py-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <Reveal>
            <nav className="flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase mb-12" style={{ color: "rgba(26,34,24,0.4)" }} aria-label="Breadcrumb">
              <Link href="/" className="hover:text-terracotta-dark transition-colors">Home</Link>
              <span style={{ color: "var(--color-terracotta)" }}>/</span>
              <Link href="/all-stay" className="hover:text-terracotta-dark transition-colors">Our Stays</Link>
              <span style={{ color: "var(--color-terracotta)" }}>/</span>
              <span style={{ color: "rgba(26,34,24,0.7)" }}>{property.name}</span>
            </nav>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-start">
            {/* Text */}
            <div>
              <Reveal>
                <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: "var(--color-terracotta-dark)" }}>
                  {property.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-display italic leading-[1.1] mb-7" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)", color: "var(--color-ink)", letterSpacing: "-0.02em" }}>
                  About this stay
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-body text-[15.5px] md:text-base leading-[1.95] mb-9" style={{ color: "rgba(26,34,24,0.6)", maxWidth: "54ch" }}>
                  {property.description}
                </p>
              </Reveal>

              {/* Amenities */}
              <Reveal delay={0.16}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 max-w-md">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(212,168,83,0.15)", border: "1px solid rgba(212,168,83,0.3)" }}>
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.2 2.2L8 3" stroke="#b5703f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span className="font-body text-[13.5px]" style={{ color: "rgba(26,34,24,0.62)" }}>{a}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <a href={bookHref} className="inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3.5 mt-10 transition-colors duration-300" style={{ background: "var(--color-terracotta-dark)", color: "var(--color-cream-soft)" }}>
                  Check dates &amp; enquire
                  <Arrow />
                </a>
              </Reveal>
            </div>

            {/* Framed photo */}
            <Reveal delay={0.15} y={40}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 40px 80px -30px rgba(43,27,17,0.4)" }}>
                  <img src={property.gallery[0]} alt={`${property.name} — view`} className="w-full object-cover" style={{ aspectRatio: "4/5" }} />
                </div>
                <span className="absolute font-body text-[10px] tracking-[0.15em] uppercase rounded-full px-4 py-2" style={{ top: -14, right: -8, background: "#f7f2e8", color: "#8a5328", border: "1px solid rgba(181,112,63,0.3)", boxShadow: "0 8px 20px -8px rgba(43,27,17,0.3)" }}>
                  Since 2021
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="relative w-full bg-cream-soft pb-16 md:pb-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {property.gallery.map((src, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden group">
                <img src={src} alt={`${property.name} gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="relative w-full bg-cream py-16 md:py-24 px-5 md:px-10 border-t border-ink/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-terracotta" aria-hidden="true" />
                <p className="text-terracotta-dark font-body text-xs tracking-[0.3em] uppercase">Find Us</p>
              </div>
              <h2 className="font-display italic text-ink leading-tight mb-4" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)" }}>
                {property.locationShort}
              </h2>
              <p className="text-ink/60 font-body text-sm leading-relaxed mb-8 max-w-sm">
                Fly into Bhuntar Airport (Kullu), then a scenic drive up the valley. We&apos;re happy to help arrange your transfer once your dates are confirmed.
              </p>
              <a href={property.mapLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 font-body text-xs tracking-[0.2em] uppercase text-terracotta-dark border border-terracotta-dark/40 px-6 py-3 transition-all duration-300 hover:bg-terracotta-dark hover:text-cream">
                Open in Google Maps
                <span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12} y={40}>
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-[0_35px_70px_-20px_rgba(43,27,17,0.35)]">
              <iframe title={`${property.name} location map`} src={property.mapEmbed} className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── OTHER PROPERTY CROSS-LINK ── */}
      {other && (
        <section className="relative w-full overflow-hidden" style={{ background: "#0e1a12" }}>
          <div className="absolute inset-0">
            <img src={other.image} alt="" className="w-full h-full object-cover" style={{ opacity: 0.28, filter: "saturate(0.9)" }} />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,26,18,0.7), rgba(14,26,18,0.92))" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
            <Reveal>
              <p className="font-body text-[10px] tracking-[0.42em] uppercase mb-5" style={{ color: "rgba(212,168,83,0.7)" }}>
                Our Other Home
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display italic mb-4" style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.2rem)", color: "rgba(247,242,232,0.96)", letterSpacing: "-0.02em" }}>
                {other.name}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="font-body text-[14.5px] leading-[1.85] mb-9 mx-auto" style={{ color: "rgba(247,242,232,0.55)", maxWidth: "50ch" }}>
                {other.tagline} · {other.locationShort}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href={`/stays/${other.slug}`} className="inline-flex items-center gap-2.5 font-body text-[13px] tracking-wide rounded-full px-7 py-3.5 transition-transform duration-300 hover:scale-[1.03]" style={{ background: "#d4a853", color: "#1a2218", fontWeight: 500 }}>
                Explore {other.name.replace("Persimmon Farmstead", "").trim() || other.name}
                <Arrow />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}