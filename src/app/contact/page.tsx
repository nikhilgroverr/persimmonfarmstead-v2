import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const properties = [
  {
    name: "Persimmon Farmstead",
    location: "Hallan Valley, Manali Tehsil, Kullu District",
    mapSrc: "https://www.google.com/maps?q=32.130316,77.155124&z=11&output=embed",
    mapLink:
      "https://www.google.com/maps?ll=32.130316,77.155124&z=10&t=m&hl=en-US&gl=US&mapclient=embed&cid=12947353045947150512",
  },
  {
    name: "Persimmon Suites",
    location: "Manali, Himachal Pradesh",
    mapSrc: "https://www.google.com/maps?q=32.306541,77.17561&z=11&output=embed",
    mapLink:
      "https://www.google.com/maps?ll=32.306541,77.17561&z=10&t=m&hl=en-US&gl=US&mapclient=embed&cid=3627561132221631321",
  },
];

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <section className="relative w-full py-28 md:py-36 px-6 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
          alt="Hills of Himachal Pradesh"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative z-10">
          <Reveal>
            <p className="text-cream/80 font-body text-xs tracking-[0.3em] uppercase mb-5">
              Persimmon Farmstead
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display italic text-cream text-4xl md:text-6xl">
              Get in Touch
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative w-full bg-cream py-20 md:py-28 px-6 border-t border-ink/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          <Reveal>
            <div>
              <p className="text-terracotta-dark font-body text-xs tracking-[0.3em] uppercase mb-4">
                For Reservations
              </p>
              <h2 className="font-display text-ink text-3xl mb-10">
                Speak with us directly
              </h2>

              <div className="space-y-7">
                <div className="border-l-2 border-terracotta-dark/30 pl-5">
                  <p className="text-terracotta-dark font-body text-[11px] tracking-[0.25em] uppercase mb-2">
                    Call Us
                  </p>
                  <a
                    href="tel:+916230645166"
                    className="block font-display text-ink text-lg hover:text-terracotta-dark transition-colors"
                  >
                    +91-6230645166
                  </a>
                  <a
                    href="tel:+919999975545"
                    className="block font-display text-ink text-lg hover:text-terracotta-dark transition-colors"
                  >
                    +91-9999975545
                  </a>
                </div>

                <div className="border-l-2 border-terracotta-dark/30 pl-5">
                  <p className="text-terracotta-dark font-body text-[11px] tracking-[0.25em] uppercase mb-2">
                    Chat With Us
                  </p>
                  <a
                    href="https://wa.me/+916230645166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-body text-base text-ink hover:text-terracotta-dark transition-colors mb-1"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-terracotta-dark">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.45 5.06L2 22l5.2-1.36a9.84 9.84 0 0 0 4.84 1.26h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.74 14.05c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.83-.12-.42-.13-.96-.31-1.66-.6-2.92-1.26-4.82-4.2-4.97-4.4-.15-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.32.38-.46.51-.15.14-.31.3-.13.6.18.3.8 1.32 1.72 2.13 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.05.18-.18.78-.91.99-1.22.21-.31.42-.26.7-.16.28.1 1.78.84 2.09 1 .31.15.51.23.59.36.07.13.07.75-.17 1.43z" />
                    </svg>
                    +91-6230645166
                  </a>
                  <a
                    href="https://wa.me/+919999975545"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-body text-base text-ink hover:text-terracotta-dark transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-terracotta-dark">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.45 5.06L2 22l5.2-1.36a9.84 9.84 0 0 0 4.84 1.26h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.74 14.05c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.83-.12-.42-.13-.96-.31-1.66-.6-2.92-1.26-4.82-4.2-4.97-4.4-.15-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.32.38-.46.51-.15.14-.31.3-.13.6.18.3.8 1.32 1.72 2.13 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.05.18-.18.78-.91.99-1.22.21-.31.42-.26.7-.16.28.1 1.78.84 2.09 1 .31.15.51.23.59.36.07.13.07.75-.17 1.43z" />
                    </svg>
                    +91-9999975545
                  </a>
                </div>

                <div className="border-l-2 border-terracotta-dark/30 pl-5">
                  <p className="text-terracotta-dark font-body text-[11px] tracking-[0.25em] uppercase mb-2">
                    Email Us
                  </p>
                  <a
                    href="mailto:reservations@persimmonfarmstead.com"
                    className="font-display text-ink text-lg hover:text-terracotta-dark transition-colors break-all"
                  >
                    reservations@persimmonfarmstead.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form id="form" className="space-y-5 scroll-mt-28">
              <div>
                <label htmlFor="name" className="block text-ink/70 font-body text-sm mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-ink/15 bg-cream-soft px-4 py-3 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta-dark transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-ink/70 font-body text-sm mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-ink/15 bg-cream-soft px-4 py-3 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta-dark transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="property" className="block text-ink/70 font-body text-sm mb-2">
                  Property
                </label>
                <select
                  id="property"
                  className="w-full rounded-lg border border-ink/15 bg-cream-soft px-4 py-3 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta-dark transition-all"
                >
                  <option>Persimmon Farmstead</option>
                  <option>Persimmon Suites</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block text-ink/70 font-body text-sm mb-2">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full rounded-lg border border-ink/15 bg-cream-soft px-4 py-3 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta-dark transition-all"
                  placeholder="+91 00000 00000"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-ink/70 font-body text-sm mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-ink/15 bg-cream-soft px-4 py-3 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta-dark transition-all resize-none"
                  placeholder="Tell us about your stay..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2.5 rounded-full bg-terracotta text-cream font-body text-sm tracking-wide uppercase px-7 py-3.5 hover:bg-terracotta-dark transition-colors"
              >
                Send message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="relative w-full bg-cream-soft py-20 md:py-28 px-6 border-t border-ink/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-terracotta-dark font-body text-xs tracking-[0.3em] uppercase text-center mb-4">
              Our Properties
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-ink text-3xl md:text-4xl text-center mb-16 md:mb-20">
              Two locations, one promise
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {properties.map((property, i) => (
              <Reveal key={property.name} delay={0.1 + i * 0.1} y={32}>
                <div>
                  <h3 className="font-display italic text-ink text-2xl mb-1.5">
                    {property.name}
                  </h3>
                  <p className="text-ink/55 font-body text-sm mb-5">
                    {property.location}
                  </p>
                  <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-[0_25px_50px_-15px_rgba(43,27,17,0.3)] ring-1 ring-inset ring-ink/10">
                    <iframe
                      title={property.name + " location map"}
                      src={property.mapSrc}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a
                    href={property.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-terracotta-dark"
                  >
                    Open in Google Maps
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}