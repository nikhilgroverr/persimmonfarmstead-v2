"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  img: string;
  tag: string;
  desc: string;
  features?: string[];
  badges?: string[];
  icon?: string;
  subtitle?: string;
  amenities?: string[];
  location?: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
  destinations?: { name: string; region: string; img: string }[];
  trustBadges?: { icon: string; title: string; desc: string }[];
};

const staysItems: NavItem[] = [
  { label: "All Stays", href: "/all-stay", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", tag: "Featured", desc: "14 uniquely crafted rooms in Hallan Valley. Wake up to orchard views, private balconies, and slow mornings.", features: ["Private balconies with valley views", "King-size beds & warm interiors", "Daily housekeeping & room service", "Bonfire evenings & garden walks"], badges: ["Persimmon Farmstead", "Farmstead Shanag", "Long Stays"], location: "Manali, Himachal", amenities: ["Two properties", "In-house kitchen", "Mountain views"], icon: "🏡", subtitle: "Both our homes in one place" },
  { label: "Persimmon Farmstead", href: "/stays/farmstead", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", tag: "Flagship", desc: "Our flagship boutique hotel at 14 Mile in Badgran — every room catches the morning sun and looks onto the mountains.", features: ["Mountain-facing rooms", "In-house restaurant", "Morning sun all year", "Easy highway access"], badges: ["Mountain View", "Restaurant", "14 Mile"], location: "Badgran (14 Mile), Manali", amenities: ["Mountain-facing", "Restaurant", "Morning sun"], icon: "🏨", subtitle: "Our flagship hotel" },
  { label: "Farmstead Shanag", href: "/stays/shanag", img: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", tag: "Chalets", desc: "Wooden chalets and stone cottages on wide orchard lawns in Shanag, near Bahang — a short wander from Old Manali.", features: ["Wooden chalets", "Stone cottages", "Wide orchard lawns", "Near Old Manali & Mall Road"], badges: ["Chalets", "Orchards", "Old Manali"], location: "Shanag (Bahang), Manali", amenities: ["Wooden chalets", "Orchard lawns", "Near Old Manali"], icon: "🛖", subtitle: "Chalets on orchard lawns" },
  { label: "Long Stays", href: "/all-stay#long-stays", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80", tag: "Extended Stay", desc: "Stay a week, stay a month. Long stays include weekly laundry, home-style meals, and a feeling of permanence.", features: ["7-day minimum flexible stays", "Weekly laundry & housekeeping", "Custom pricing available", "Home-style meals on request"], badges: ["Weekly Rate", "Meals", "Laundry"], location: "Hallan Valley, Manali", amenities: ["Meals included", "Laundry", "Custom rate"], icon: "🏠", subtitle: "Comfort like home" },
  { label: "Corporate Buyouts", href: "/all-stay#corporate", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", tag: "Corporate", desc: "Full property buyouts for teams and events. Nature, bonding, and real rest — worth the out-of-office.", features: ["Full buyout for 30+ guests", "Bonfire & team activities", "Projector & meeting setup", "Travel desk & logistics"], badges: ["Buyout", "Team", "Events"], location: "Hallan Valley, Manali", amenities: ["Full buyout", "Team bonding", "AV setup"], icon: "🏢", subtitle: "Nature escapes" },
];

const experiencesItems: NavItem[] = [
  { label: "Happening Today", href: "/amenities", img: "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=800&q=80", tag: "Live Now", desc: "Paragliding, rafting, trekking — the valley is always alive. Check what's on today near the farmstead.", features: ["10+ daily adventure activities", "Local guides & safety gear", "Pick-up from farmstead", "All skill levels welcome"], badges: ["Paragliding", "Rafting", "Trekking", "Camping"], location: "Manali, Himachal", amenities: ["Guided tours", "Safety gear", "Pickup included"], icon: "⚡", subtitle: "Live the adventure" },
  { label: "This Month in Manali", href: "/amenities", img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=800&q=80", tag: "Monthly Guide", desc: "Hot springs, nature parks, bird watching — curated experiences across the district this month.", features: ["Hot water spring visits", "Bird watching trails", "Nature park day trips", "Seasonal festival guide"], badges: ["Hot Springs", "Birds", "Nature Park"], location: "Kullu District, HP", amenities: ["Seasonal guide", "Local tips", "Day trips"], icon: "🗓", subtitle: "Season highlights" },
  { label: "Our Story", href: "/our-story", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80", tag: "Est. 2021", desc: "A single cottage at the edge of an orchard. Twelve years later — still the same unhurried idea.", features: ["12+ years of hospitality", "3,200+ guests welcomed", "Family-run & personal", "Built room by room"], badges: ["Family Run", "Since 2014", "Hallan Valley"], location: "Hallan Valley, Manali", amenities: ["Personal service", "12+ years", "3,200+ guests"], icon: "📖", subtitle: "Family run & personal" },
];

const servicesItems: NavItem[] = [
  { label: "All Amenities", href: "/amenities", img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80", tag: "Included", desc: "Pool, dining, spa, garden — everything at the farmstead is designed around your comfort.", features: ["Outdoor pool & spa", "Farm-to-table restaurant", "Free parking & travel desk", "Pet-friendly environment"], badges: ["Pool", "Spa", "Restaurant", "Pets"], location: "Hallan Valley, Manali", amenities: ["Pool", "Spa", "Restaurant"], icon: "✨", subtitle: "Everything included" },
  { label: "Contact & Reserve", href: "/contact", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", tag: "Reservations", desc: "Call, WhatsApp, or email — we respond within the hour. Two properties, one team, always here.", features: ["Response within 1 hour", "Two properties to choose from", "WhatsApp & call support", "reservations@persimmonfarmstead.com"], badges: ["WhatsApp", "Email", "Call"], location: "Hallan Valley & Manali", amenities: ["1hr response", "Two properties", "Always available"], icon: "📞", subtitle: "We are always here" },
];

const navGroups: NavGroup[] = [
  {
    label: "Stays", items: staysItems,
    destinations: [
      { name: "Manali", region: "Himachal Pradesh", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=70" },
      { name: "Hallan Valley", region: "Kullu District", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&q=70" },
      { name: "Naggar", region: "Kullu, Himachal", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&q=70" },
      { name: "Bhuntar", region: "Near Airport", img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=200&q=70" },
    ],
    trustBadges: [
      { icon: "🏷", title: "Best Price Guarantee", desc: "We match the lowest price" },
      { icon: "✅", title: "Trusted & Verified", desc: "Handpicked stays & hosts" },
      { icon: "🕐", title: "24/7 Support", desc: "We're always here to help" },
    ],
  },
  {
    label: "Experiences", items: experiencesItems,
    destinations: [
      { name: "Solang Valley", region: "Adventure Hub", img: "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=200&q=70" },
      { name: "Rohtang Pass", region: "Snow & Glaciers", img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=200&q=70" },
      { name: "Beas River", region: "Rafting & Camping", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&q=70" },
    ],
    trustBadges: [
      { icon: "🏷", title: "Best Price Guarantee", desc: "We match the lowest price" },
      { icon: "✅", title: "Trusted & Verified", desc: "Handpicked stays & hosts" },
      { icon: "🕐", title: "24/7 Support", desc: "We're always here to help" },
    ],
  },
  {
    label: "Services", items: servicesItems,
    destinations: [
      { name: "Persimmon Farmstead", region: "Hallan Valley", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=70" },
      { name: "Persimmon Suites", region: "Manali Town", img: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=200&q=70" },
    ],
    trustBadges: [
      { icon: "🏷", title: "Best Price Guarantee", desc: "We match the lowest price" },
      { icon: "✅", title: "Trusted & Verified", desc: "Handpicked stays & hosts" },
      { icon: "🕐", title: "24/7 Support", desc: "We're always here to help" },
    ],
  },
];

const navItems = navGroups.map(g => ({ label: g.label, items: g.items }));

/* ── Single shared mega menu ───────────────────────────────── */
function MegaMenu({ group }: { group: NavGroup }) {
  const [activeItem, setActiveItem] = useState<NavItem>(group.items[0]);

  useEffect(() => { setActiveItem(group.items[0]); }, [group]);

  return (
    <div
      className="overflow-hidden"
      style={{
        background: "#faf6ee",
        borderRadius: "0 0 20px 20px",
        border: "1px solid rgba(36,48,40,0.08)",
        borderTop: "none",
        boxShadow: "0 30px 60px -15px rgba(26,34,24,0.18)",
        width: "min(1060px, 92vw)",
      }}
    >
      <div className="flex" style={{ minHeight: "340px" }}>
        {/* LEFT */}
        <div className="flex-shrink-0 py-5 px-3" style={{ width: "238px", background: "rgba(36,48,40,0.03)", borderRight: "1px solid rgba(36,48,40,0.06)" }}>
          <p className="font-body text-[9px] tracking-[0.38em] uppercase px-3 mb-3" style={{ color: "rgba(26,34,24,0.3)" }}>
            Explore {group.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const isActive = activeItem.label === item.label;
              return (
                <button
                  key={item.label}
                  onMouseEnter={() => setActiveItem(item)}
                  className="group relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors duration-150"
                  style={{ background: isActive ? "rgba(36,48,40,0.07)" : "transparent" }}
                >
                  {isActive && <div className="absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-full" style={{ background: "#d4a853" }} />}
                  <span className="text-sm flex-shrink-0 w-6 text-center">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-[12.5px] leading-tight truncate" style={{ color: isActive ? "#1a2218" : "rgba(26,34,24,0.58)", fontWeight: isActive ? 500 : 400 }}>{item.label}</p>
                    <p className="font-body text-[10px] mt-0.5 truncate" style={{ color: "rgba(26,34,24,0.33)" }}>{item.subtitle}</p>
                  </div>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="2.5" style={{ opacity: isActive ? 0.7 : 0, flexShrink: 0 }}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              );
            })}
          </div>
          <div className="mx-2 mt-4 p-3 rounded-xl" style={{ background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.18)" }}>
            <p className="font-body text-[11px] font-medium mb-0.5" style={{ color: "#1a2218" }}>Need help finding the perfect stay?</p>
            <a href="/contact" className="font-body text-[11px]" style={{ color: "#d4a853" }}>Talk to our travel experts →</a>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex-1 p-6 flex flex-col" style={{ minWidth: "280px" }}>
          <div key={activeItem.label} className="flex flex-col flex-1">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="font-body text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-full" style={{ background: "rgba(212,168,83,0.12)", border: "1px solid rgba(212,168,83,0.25)", color: "#9a7320" }}>
                {activeItem.tag}
              </span>
              <span className="h-px flex-1" style={{ background: "linear-gradient(to right,rgba(212,168,83,0.25),transparent)" }} />
            </div>
            <h3 className="font-display italic leading-tight mb-2" style={{ fontSize: "24px", color: "#1a2218", letterSpacing: "-0.015em" }}>
              {activeItem.label}
            </h3>
            <div className="mb-3 origin-left" style={{ height: "1.5px", width: "28px", background: "linear-gradient(to right,#d4a853,transparent)", borderRadius: "2px" }} />
            <p className="font-body text-[13px] leading-[1.75] mb-4" style={{ color: "rgba(26,34,24,0.52)", maxWidth: "300px" }}>
              {activeItem.desc}
            </p>
            {activeItem.features && (
              <div className="flex flex-col gap-2 mb-4">
                {activeItem.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(212,168,83,0.15)", border: "1px solid rgba(212,168,83,0.28)" }}>
                      <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#d4a853" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="font-body text-[12px]" style={{ color: "rgba(26,34,24,0.58)" }}>{f}</span>
                  </div>
                ))}
              </div>
            )}
            {activeItem.badges && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {activeItem.badges.map((b) => (
                  <span key={b} className="font-body text-[11px] px-2.5 py-1 rounded-full" style={{ background: "rgba(36,48,40,0.05)", border: "1px solid rgba(36,48,40,0.08)", color: "rgba(26,34,24,0.52)" }}>{b}</span>
                ))}
              </div>
            )}
            <div className="mt-auto flex items-center gap-4">
              <Link href={activeItem.href} className="inline-flex items-center gap-2 font-body text-[13px] tracking-wide rounded-full px-6 py-2.5" style={{ background: "#243028", color: "#f7f2e8", boxShadow: "0 4px 12px rgba(36,48,40,0.22)" }}>
                Explore {activeItem.tag}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link href="/contact#form" className="font-body text-[12px] transition-colors duration-150" style={{ color: "rgba(26,34,24,0.38)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#d4a853")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(26,34,24,0.38)")}>
                or Book directly →
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT — featured card */}
        <div className="flex-shrink-0 p-4" style={{ width: "280px", minWidth: "280px" }}>
          <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ minHeight: "280px" }}>
            <img
              key={activeItem.img}
              src={activeItem.img}
              alt={activeItem.label}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: 1 }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(26,34,24,0.04) 0%,rgba(26,34,24,0.22) 40%,rgba(26,34,24,0.88) 100%)" }} />
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
              <span className="font-body text-[9px] tracking-[0.22em] uppercase px-2.5 py-1.5 rounded-full" style={{ background: "rgba(212,168,83,0.2)", border: "1px solid rgba(212,168,83,0.38)", color: "#f5d98a", backdropFilter: "blur(8px)" }}>
                Featured Stay
              </span>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "rgba(247,242,232,0.12)", border: "1px solid rgba(247,242,232,0.18)", backdropFilter: "blur(8px)" }}>♡</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {activeItem.location && <p className="font-body text-[9px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "rgba(247,242,232,0.45)" }}>{activeItem.location}</p>}
              <div className="mb-2" style={{ height: "1px", width: "22px", background: "rgba(212,168,83,0.8)" }} />
              <p className="font-display italic text-[16px] leading-tight mb-1.5" style={{ color: "rgba(247,242,232,0.97)", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{activeItem.label}</p>
              {activeItem.amenities && <p className="font-body text-[10px] mb-3" style={{ color: "rgba(247,242,232,0.45)" }}>{activeItem.amenities.join(" • ")}</p>}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => <svg key={s} width="8" height="8" viewBox="0 0 24 24" fill="#d4a853"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
                <span className="font-body text-[9px] ml-1.5" style={{ color: "rgba(247,242,232,0.4)" }}>4.9 (236 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM — destinations + trust */}
      <div style={{ borderTop: "1px solid rgba(36,48,40,0.07)", background: "rgba(36,48,40,0.02)" }}>
        {group.destinations && (
          <div className="px-6 py-3 flex items-center gap-4">
            <p className="font-body text-[9px] tracking-[0.3em] uppercase flex-shrink-0" style={{ color: "rgba(26,34,24,0.28)", minWidth: "80px" }}>Popular<br />Destinations</p>
            <div className="flex items-center gap-2 flex-1 overflow-hidden">
              {group.destinations.map(dest => (
                <button key={dest.name} className="flex items-center gap-2 flex-shrink-0 rounded-xl px-2.5 py-1.5 transition-colors duration-150 hover:bg-black/5">
                  <img src={dest.img} alt={dest.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-body text-[11.5px] font-medium leading-tight" style={{ color: "rgba(26,34,24,0.72)" }}>{dest.name}</p>
                    <p className="font-body text-[10px]" style={{ color: "rgba(26,34,24,0.35)" }}>{dest.region}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {group.trustBadges && (
          <div className="px-6 py-3 flex items-center gap-8" style={{ borderTop: "1px solid rgba(36,48,40,0.05)" }}>
            {group.trustBadges.map(badge => (
              <div key={badge.title} className="flex items-center gap-2">
                <span className="text-base">{badge.icon}</span>
                <div>
                  <p className="font-body text-[11px] font-medium leading-tight" style={{ color: "rgba(26,34,24,0.68)" }}>{badge.title}</p>
                  <p className="font-body text-[10px]" style={{ color: "rgba(26,34,24,0.36)" }}>{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Navbar ────────────────────────────────────────────────── */
export default function Navbar({ forceSolid = false }: { forceSolid?: boolean } = {}) {
  const [scrolledState, setScrolledState] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<NavGroup | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const scrolled = forceSolid || scrolledState;

  useEffect(() => {
    const onScroll = () => setScrolledState(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openGroup = (group: NavGroup) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveGroup(group);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveGroup(null), 180);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* Backdrop */}
      <AnimatePresence>
        {activeGroup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 pointer-events-none" style={{ background: "rgba(26,34,24,0.15)", backdropFilter: "blur(1px)", zIndex: 40 }} />
        )}
      </AnimatePresence>

      {/* Nav bar */}
      <div className={`relative z-50 flex items-center justify-between transition-all duration-500 px-6 md:px-10 ${scrolled ? "pt-4 pb-3" : "pt-5 pb-5"}`}>

        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="flex items-center flex-shrink-0">
            <img src="/logo.webp" alt="Persimmon Farmstead" className={`w-auto max-w-[160px] transition-all duration-500 ${scrolled ? "h-12 md:h-14" : "h-16 md:h-20"}`} />
          </Link>
        </motion.div>

        {/* Center nav — position relative so mega menu anchors to it */}
        <nav
          className="relative hidden md:flex items-center gap-0.5 transition-all duration-500"
          style={scrolled ? {
            borderRadius: "100px",
            border: "1px solid rgba(212,168,83,0.35)",
            background: "rgba(250,246,238,0.9)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            boxShadow: "0 4px 24px rgba(26,34,24,0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
            padding: "6px 14px",
          } : { padding: "4px 8px" }}
        >
          {navGroups.map((group) => {
            const isActive = activeGroup?.label === group.label;
            return (
              <div key={group.label} className="relative"
                onMouseEnter={() => openGroup(group)}
              >
                <button className={`relative flex flex-col items-center px-4 py-2 rounded-full transition-all duration-200 ${scrolled
                    ? isActive ? "text-terracotta-dark bg-terracotta/8" : "text-ink/70 hover:text-terracotta-dark hover:bg-terracotta/5"
                    : isActive ? "text-cream bg-cream/15" : "text-cream/85 hover:text-cream hover:bg-cream/10"
                  }`}>
                  <span className={`flex items-center gap-1.5 font-display italic tracking-wide ${scrolled ? "text-[15px]" : "text-[14px]"}`}>
                    {group.label}
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      className={`opacity-40 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                  {isActive && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "#d4a853" }} />}
                </button>
              </div>
            );
          })}

        </nav>

        {/* Mega menu — anchored to full header width, centered on viewport */}
        <AnimatePresence>
          {activeGroup && (
            <motion.div
              key={activeGroup.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute hidden md:flex justify-center"
              style={{
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 50,
                pointerEvents: "none",
              }}
            >
              <div
                style={{ pointerEvents: "auto" }}
                onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
                onMouseLeave={scheduleClose}
              >
                <MegaMenu group={activeGroup} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Book Now */}
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3">
          <Link href="/contact#form"
            className={`hidden md:inline-flex items-center gap-2 text-sm font-body tracking-wide rounded-full px-5 py-2.5 transition-all duration-300 ${scrolled ? "bg-terracotta text-cream hover:bg-terracotta-dark" : "bg-cream/15 text-cream border border-cream/30 hover:bg-cream/25 backdrop-blur-sm"
              }`}
            style={scrolled ? { boxShadow: "0 4px 14px rgba(181,112,63,0.3)" } : {}}>
            Book Now
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className={`md:hidden w-9 h-9 flex items-center justify-center ${scrolled ? "text-ink" : "text-cream"}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)} className="fixed inset-0 z-40 md:hidden bg-ink/60 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 h-full w-[78%] max-w-[340px] md:hidden bg-cream-soft flex flex-col">
              <div className="flex items-center justify-between px-6 py-6 border-b border-ink/10">
                <span className="font-display italic text-terracotta-dark text-lg">Menu</span>
                <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center text-ink rounded-full hover:bg-ink/5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </div>
              <nav className="flex-1 flex flex-col px-6 pt-6 gap-1 overflow-y-auto">
                {navItems.map((nav, i) => (
                  <div key={nav.label}>
                    <p className="text-terracotta-dark font-body text-[11px] tracking-[0.2em] uppercase mt-4 mb-2 px-1">{nav.label}</p>
                    {nav.items.map((item, j) => (
                      <motion.div key={item.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + 0.03 * (i * 5 + j), duration: 0.25 }}>
                        <Link href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-2.5 py-2.5 border-b border-ink/[0.06]">
                          <span className="text-sm">{item.icon}</span>
                          <span className="font-body text-ink/70 text-base">{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </nav>
              <div className="px-6 pb-8 pt-4">
                <Link href="/contact#form" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 w-full rounded-full bg-terracotta text-cream font-body text-sm tracking-wide uppercase px-6 py-3.5 hover:bg-terracotta-dark transition-colors">
                  Book Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}