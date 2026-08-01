"use client";

import Reveal from "./Reveal";

const posts = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
  "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=500&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&q=80",
  "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=500&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
];

export default function Instagram() {
  return (
    <section className="relative w-full bg-cream-soft py-20 md:py-28 px-6 border-t border-ink/10">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="text-terracotta-dark font-body text-xs tracking-[0.3em] uppercase text-center mb-4">
            Follow Along
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display italic text-ink text-3xl md:text-4xl text-center mb-12 md:mb-14">
            Life at the farmstead, day to day
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10 pb-8 border-b border-ink/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-terracotta/30 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=80"
                  alt="Persimmon Farmstead Instagram profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-display italic text-ink text-lg">
                  Persimmon Farmstead
                </p>
                <p className="text-ink/50 font-body text-sm">
                  @persimmon_farmstead_resort
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 md:gap-8 text-center">
              <div>
                <p className="font-display text-ink text-lg">240+</p>
                <p className="text-ink/45 font-body text-[11px] tracking-wide uppercase">Posts</p>
              </div>
              <div>
                <p className="font-display text-ink text-lg">3.1K</p>
                <p className="text-ink/45 font-body text-[11px] tracking-wide uppercase">Followers</p>
              </div>
              <div>
                <p className="font-display text-ink text-lg">180</p>
                <p className="text-ink/45 font-body text-[11px] tracking-wide uppercase">Following</p>
              </div>
            </div>

            <a href="https://www.instagram.com/persimmon_farmstead_resort/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-terracotta text-cream font-body text-sm px-6 py-2.5 hover:bg-terracotta-dark transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              Follow
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
          {posts.map((src, i) => (
            <Reveal key={i} delay={0.15 + i * 0.04}>
              <a href="https://www.instagram.com/persimmon_farmstead_resort/" target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden rounded-md">
                <img
                  src={src}
                  alt="Persimmon Farmstead Instagram post"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
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
      </div>
    </section>
  );
}