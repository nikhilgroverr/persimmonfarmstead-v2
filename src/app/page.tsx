import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Story from "@/components/Story";
import KitchenArticleSection from "@/components/KitchenArticleSection";
import ValleyBaseSection from "@/components/ValleyBaseSection";
import Services from "@/components/Services";
import Stays from "@/components/Stays";
import Amenities from "@/components/Amenities";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Location from "@/components/Location";
import FAQSection from "@/components/FAQSection";
import Instagram from "@/components/Instagram";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Welcome />
      <Story />
      <KitchenArticleSection />
      <ValleyBaseSection />
      <Services />
      <Stays />
      <Amenities />
      <GallerySection />
      <TestimonialsSection />
      <Location />
      <FAQSection />
      <Instagram />
      <CTA />
      <Footer />
    </main>
  );
}