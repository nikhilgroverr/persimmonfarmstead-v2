import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";

export default function FarmhouseSuitesPage() {
  return (
    <main>
      <Navbar />

      <section className="relative w-full min-h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1800&q=80"
          alt="Farmhouse Suites"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative z-10 min-h-[70vh] flex items-center justify-center text-center px-6 pt-20">
          <div>
            <p className="text-cream/80 font-body text-xs tracking-[0.3em] uppercase mb-5">
              Where to Stay
            </p>
            <h1 className="font-display italic text-cream text-4xl md:text-6xl">
              Farmhouse Suites
            </h1>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cream-soft py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-ink/65 font-body text-base md:text-lg leading-relaxed">
              Spacious, sunlit, and styled with handcrafted wood &mdash;
              built for longer, slower stays. Replace this paragraph with
              your real suite description &mdash; layout, size, what makes
              them special.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative w-full bg-cream-soft py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1631049035182-249067d7618e?w=900&q=80"
                alt="Farmhouse Suite interior"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80"
                alt="Farmhouse Suite detail"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative w-full bg-cream-soft py-20 px-6 text-center border-t border-ink/10">
        <a
          href="#contact"
          className="inline-flex items-center gap-3 rounded-full bg-terracotta text-cream font-body text-sm tracking-wide uppercase px-7 py-3 hover:bg-terracotta-dark transition-colors"
        >
          Book this suite
        </a>
      </section>
    </main>
  );
}