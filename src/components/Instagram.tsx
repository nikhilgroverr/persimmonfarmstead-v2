"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const ACCENT = "#c2691c";
const GOLD = "#d4a853";

/**
 * Placeholder data for two Instagram accounts. To go live, swap this for
 * data fetched server-side from the Instagram Graph API (requires a
 * Business/Creator account linked to a Facebook Page, a Facebook Developer
 * app, and a long-lived access token — a username/password alone doesn't
 * grant API access). A clean place to do that: create an API route (e.g.
 * src/app/api/instagram/route.ts) that calls
 * https://graph.instagram.com/me?fields=... with your token, cache the
 * response, and pass real numbers/post URLs down as props here instead.
 */
const accounts = [
  {
    handle: "@persimmon_farmstead_resort",
    name: "Persimmon Farmstead",
    location: "Badgran (14 Mile) · Manali",
    avatar: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=80",
    posts: "240+",
    followers: "3.1K",
    following: "180",
    url: "https://www.instagram.com/persimmon_farmstead_resort/",
    grid: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
      "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=500&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=500&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    ],
  },
  {
    handle: "@persimmon_farmstead_shanag",
    name: "Persimmon Farmstead Shanag",
    location: "Shanag (Bahang) · Manali",
    avatar: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=200&q=80",
    posts: "95+",
    followers: "1.4K",
    following: "142",
    url: "https://www.instagram.com/persimmon_farmstead_shanag/",
    grid: [
      "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=500&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80",
      "https://images.unsplash.com/photo-1596397249129-c7a8f8e05a4e?w=500&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80",
      "https://images.unsplash.com/photo-1506744626753-1fa44df31c22?w=500&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=500&q=80",
    ],
  },
];

export default function Instagram() {
  const [active, setActive] = useState(0);
  const account = accounts[active];

  return (
    <section className="relative w-full bg-cream-soft py-20 md:py-28 px-6 border-t border-ink/10">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
            <p className="font-body text-[10px] tracking-[0.42em] uppercase" style={{ color: ACCENT }}>Follow Along</p>
            <span className="h-px w-8" style={{ background: ACCENT, opacity: 0.7 }} />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="italic text-center mb-8"
            style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "clamp(1.9rem,3.6vw,2.6rem)", color: "var(--color-ink)" }}
          >
            Life at both homes, day to day
          </h2>
        </Reveal>

        {/* Account switcher */}
        <Reveal delay={0.08}>
          <div className="flex justify-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-1 rounded-full p-1" style={{ background: "rgba(36,48,40,0.06)" }}>
              {accounts.map((a, i) => (
                <button
                  key={a.handle}
                  onClick={() => setActive(i)}
                  className="relative font-body text-[12.5px] tracking-wide px-5 py-2.5 rounded-full transition-colors duration-300"
                  style={{ color: active === i ? "#fff" : "rgba(26,34,24,0.6)" }}
                >
                  {active === i && (
                    <motion.span
                      layoutId="ig-account-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: ACCENT }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{a.name}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={account.handle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10 pb-8 border-b border-ink/10">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: `0 0 0 2px ${GOLD}` }}>
                  <img src={account.avatar} alt={`${account.name} Instagram profile`} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="italic leading-tight" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "1.15rem", color: "var(--color-ink)" }}>
                      {account.name}
                    </p>
                    <span className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: "rgba(194,105,28,0.1)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                      <span className="font-body text-[9px] tracking-[0.1em] uppercase" style={{ color: ACCENT }}>Live</span>
                    </span>
                  </div>
                  <p className="text-ink/50 font-body text-sm">{account.handle}</p>
                  <p className="text-ink/35 font-body text-[11px] tracking-wide uppercase mt-0.5">{account.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 md:gap-8 text-center">
                <div>
                  <p className="italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "1.15rem", color: "var(--color-ink)" }}>{account.posts}</p>
                  <p className="text-ink/45 font-body text-[11px] tracking-wide uppercase">Posts</p>
                </div>
                <div>
                  <p className="italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "1.15rem", color: "var(--color-ink)" }}>{account.followers}</p>
                  <p className="text-ink/45 font-body text-[11px] tracking-wide uppercase">Followers</p>
                </div>
                <div>
                  <p className="italic" style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "1.15rem", color: "var(--color-ink)" }}>{account.following}</p>
                  <p className="text-ink/45 font-body text-[11px] tracking-wide uppercase">Following</p>
                </div>
              </div>

              <a
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full font-body text-sm px-6 py-2.5 transition-transform duration-300 hover:scale-[1.04]"
                style={{ background: ACCENT, color: "#fff" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
                Follow
              </a>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
              {account.grid.map((src, i) => (
                <Reveal key={`${account.handle}-${i}`} delay={0.05 + i * 0.04}>
                  <a href={account.url} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden rounded-md">
                    <img src={src} alt={`${account.name} Instagram post`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
} 