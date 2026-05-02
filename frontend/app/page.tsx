// app/page.tsx — Home page
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/layout/HeroSection";
import ImageCarousel from "@/components/blog/ImageCarousel";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <section className="py-12">
          <ImageCarousel />
        </section>
      </main>
      <Footer />
    </>
  );
}
