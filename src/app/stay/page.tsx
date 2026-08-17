import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyShowcase from "@/components/PropertyShowcase";

export default function StayPage() {
  return (
    <main>
      <Navbar />

      <section className="relative w-full min-h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800&q=80"
          alt="Where to stay"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative z-10 min-h-[50vh] flex items-center justify-center text-center px-6 pt-20">
          <div>
            <p className="text-cream/80 font-body text-xs tracking-[0.3em] uppercase mb-5">
              Persimmon Farmstead
            </p>
            <h1 className="font-display italic text-cream text-4xl md:text-6xl">
              Where to Stay
            </h1>
          </div>
        </div>
      </section>

      <PropertyShowcase />

      <Footer />
    </main>
  );
}