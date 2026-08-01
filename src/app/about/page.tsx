import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <section className="relative w-full min-h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1800&q=80"
          alt="Persimmon Farmstead"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative z-10 min-h-[60vh] flex items-center justify-center text-center px-6 pt-20">
          <div>
            <p className="text-cream/80 font-body text-xs tracking-[0.3em] uppercase mb-5">
              Our Story
            </p>
            <h1 className="font-display italic text-cream text-4xl md:text-6xl">
              About Persimmon Farmstead
            </h1>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cream-soft py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-ink/65 font-body text-base md:text-lg leading-relaxed mb-6">
              Persimmon Farmstead began as a single cottage at the edge of
              an orchard, built for travelers who wanted distance from the
              city without losing comfort. Over the years it grew room by
              room, each one shaped around the same idea: a stay should feel
              unhurried.
            </p>
            <p className="text-ink/65 font-body text-base md:text-lg leading-relaxed">
              Today the farmstead carries that same character &mdash;
              handcrafted interiors, home-style meals, and views that change
              with the season. Every guest leaves with a little more quiet
              than they arrived with.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative w-full bg-cream-soft py-12 px-6 border-t border-ink/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <Reveal>
            <p className="font-display italic text-4xl text-terracotta-dark mb-2">12+</p>
            <p className="text-ink/55 font-body text-sm tracking-wide uppercase">Years open</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display italic text-4xl text-terracotta-dark mb-2">3,200+</p>
            <p className="text-ink/55 font-body text-sm tracking-wide uppercase">Guests hosted</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-display italic text-4xl text-terracotta-dark mb-2">14</p>
            <p className="text-ink/55 font-body text-sm tracking-wide uppercase">Rooms</p>
          </Reveal>
        </div>
      </section>

      <section className="relative w-full bg-cream-soft py-20 px-6 text-center border-t border-ink/10">
        <a
          href="/contact"
          className="inline-flex items-center gap-3 rounded-full bg-terracotta text-cream font-body text-sm tracking-wide uppercase px-7 py-3 hover:bg-terracotta-dark transition-colors"
        >
          Get in touch
        </a>
      </section>

      <Footer />
    </main>
  );
}