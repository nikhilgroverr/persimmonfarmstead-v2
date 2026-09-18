"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { site, primaryPhone, telHref } from "@/lib/site";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Stay", href: "/all-stay" },
  { label: "Amenities", href: "/amenities" },
  { label: "Location", href: "/#location" },
];

const stayLinks = [
  { label: "Persimmon Farmstead", href: "/stays/farmstead" },
  { label: "Farmstead Shanag", href: "/stays/shanag" },
  { label: "All Amenities", href: "/amenities" },
];

const INSTAGRAM_URL = "https://www.instagram.com/persimmon_farmstead_resort/";
const FACEBOOK_URL = "https://www.facebook.com/PersimmonFarmstead";

const whatsappNumbers = [
  { label: "Reservations", display: "+91 62306 45166", href: "tel:+916230645166" },
  { label: "Bookings", display: "+91 99999 75545", href: "tel:+919999975545" },
  { label: "Front desk", display: "+91 91388 81116", href: "tel:+919138881116" },
];

/* ── Real, recognizable brand glyphs — muted by default, filling with the
     correct brand color/gradient on hover. ── */
function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="2.5" width="19" height="19" rx="6" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15 8.5h3V5h-3a4.5 4.5 0 0 0-4.5 4.5V12H7v3.5h3.5V22H14v-6.5h3l.7-3.5h-3.7V9.6a1.1 1.1 0 0 1 1.1-1.1z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.44 1.32 4.94L2 22l5.29-1.39c1.44.79 3.08 1.21 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.5 14.1c-.23.65-1.36 1.24-1.88 1.31-.48.07-1.08.1-1.75-.11-.4-.13-.92-.3-1.58-.59-2.78-1.2-4.6-4-4.74-4.19-.14-.19-1.13-1.5-1.13-2.86s.71-2.03.97-2.31c.25-.28.54-.35.72-.35.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.55.78 1.9.84 2.04.07.14.11.3.02.48-.09.18-.14.29-.28.45-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.2 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.45.2.51.32.07.11.07.66-.16 1.31z" />
    </svg>
  );
}

function Flourish() {
  return (
    <div className="flex items-center gap-2 mb-5" aria-hidden="true">
      <span className="h-px w-6" style={{ background: ACCENT, opacity: 0.6 }} />
      <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD, opacity: 0.85 }} />
    </div>
  );
}

/* ── WhatsApp icon that opens a small popup with the 3 labeled numbers ── */
function WhatsAppPopupButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="WhatsApp — show numbers"
        aria-expanded={open}
        className="group relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110"
        style={{ border: "1px solid rgba(36,48,40,0.16)" }}
      >
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "#25D366" }}
          aria-hidden
        />
        <span className={`relative transition-colors duration-300 ${open ? "text-white" : "text-ink/55 group-hover:text-white"}`} style={open ? { color: "#fff" } : undefined}>
          <WhatsAppIcon />
        </span>
        {open && <span className="absolute inset-0 rounded-full" style={{ background: "#25D366" }} aria-hidden />}
      </button>

      {open && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 rounded-2xl overflow-hidden z-20"
          style={{ background: "#fffdf8", border: "1px solid rgba(36,48,40,0.1)", boxShadow: "0 30px 60px -24px rgba(43,27,17,0.45)" }}
        >
          <div className="px-4 pt-3.5 pb-2.5" style={{ borderBottom: "1px solid rgba(36,48,40,0.07)" }}>
            <p className="font-body text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Call us directly</p>
          </div>
          {whatsappNumbers.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="flex flex-col px-4 py-2.5 transition-colors duration-200 hover:bg-[rgba(194,105,28,0.06)]"
            >
              <span className="font-body text-[10px] tracking-[0.14em] uppercase" style={{ color: "rgba(26,34,24,0.4)" }}>{n.label}</span>
              <span className="italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>{n.display}</span>
            </a>
          ))}
          {/* little pointer/arrow at the bottom of the popup */}
          <span
            aria-hidden
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
            style={{ background: "#fffdf8", borderRight: "1px solid rgba(36,48,40,0.1)", borderBottom: "1px solid rgba(36,48,40,0.1)" }}
          />
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full bg-cream-soft text-ink px-6 pt-24 pb-10 border-t border-ink/10 overflow-hidden">
      {/* faint watermark word, same motif used across the rest of the site */}
      <p
        aria-hidden
        className="hidden md:block absolute select-none pointer-events-none italic"
        style={{
          fontFamily: "var(--font-accent)", fontWeight: 600,
          top: "-1.5rem", right: "1rem", fontSize: "9rem", lineHeight: 1,
          color: "transparent", WebkitTextStroke: "1px rgba(36,48,40,0.05)",
        }}
      >
        Farmstead
      </p>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 md:gap-8 mb-16">
          <div>
            <p
              className="italic mb-4"
              style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "1.7rem", color: "var(--color-ink)" }}
            >
              Persimmon Farmstead
            </p>
            <div className="flex items-center gap-2 mb-4" aria-hidden="true">
              <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD, opacity: 0.85 }} />
              <span className="h-px w-10" style={{ background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            </div>
            <p className="text-ink/55 font-body text-sm leading-relaxed max-w-xs mb-7">
              A quiet retreat in Hallan Valley, Himachal Pradesh &mdash;
              where comfort feels personal, never staged.
            </p>

            {/* social icons — subtle at rest, brand color on hover */}
            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110"
                style={{ border: "1px solid rgba(36,48,40,0.16)" }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                  aria-hidden
                />
                <span className="relative text-ink/55 group-hover:text-white transition-colors duration-300">
                  <InstagramIcon />
                </span>
              </a>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110"
                style={{ border: "1px solid rgba(36,48,40,0.16)" }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "#1877F2" }}
                  aria-hidden
                />
                <span className="relative text-ink/55 group-hover:text-white transition-colors duration-300">
                  <FacebookIcon />
                </span>
              </a>

              <WhatsAppPopupButton />
            </div>
          </div>

          <div>
            <p className="font-body text-[11px] tracking-[0.28em] uppercase" style={{ color: ACCENT }}>
              Explore
            </p>
            <Flourish />
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-ink/60 font-body text-sm transition-colors duration-300"
                    onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span className="w-0 group-hover:w-2.5 h-px transition-all duration-300" style={{ background: ACCENT }} aria-hidden />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-[11px] tracking-[0.28em] uppercase" style={{ color: ACCENT }}>
              Stay
            </p>
            <Flourish />
            <ul className="space-y-3">
              {stayLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-ink/60 font-body text-sm transition-colors duration-300"
                    onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span className="w-0 group-hover:w-2.5 h-px transition-all duration-300" style={{ background: ACCENT }} aria-hidden />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-[11px] tracking-[0.28em] uppercase" style={{ color: ACCENT }}>
              Get in Touch
            </p>
            <Flourish />
            <ul className="space-y-3 text-ink/60 font-body text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors duration-300 hover:text-[color:var(--color-terracotta-dark)] break-all">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={telHref(primaryPhone.raw)} className="italic transition-colors duration-300 hover:text-[color:var(--color-terracotta-dark)]" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "15px" }}>
                  {primaryPhone.label}
                </a>
              </li>
              <li className="text-ink/45 leading-relaxed pt-1">
                {site.address.lines[0]}
                <br />
                {site.address.lines[1]}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink/40 font-body text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Persimmon Farmstead. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5" aria-hidden="true">
            <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD, opacity: 0.7 }} />
            <p className="font-body text-[10px] tracking-[0.24em] uppercase" style={{ color: "rgba(26,34,24,0.35)" }}>
              Badgran &middot; Shanag &middot; Manali
            </p>
            <span className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: GOLD, opacity: 0.7 }} />
          </div>
        </div>
      </div>
    </footer>
  );
}