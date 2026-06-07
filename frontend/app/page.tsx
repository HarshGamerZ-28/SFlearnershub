// app/page.tsx — Home page
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/layout/HeroSection";
import ImageCarousel from "@/components/blog/ImageCarousel";
import CategoryGrid from "@/components/blog/CategoryGrid";
import FeaturedBlogs from "@/components/blog/FeaturedBlogs";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="space-y-10 sm:space-y-16 pb-16 sm:pb-20 overflow-x-hidden">
        <HeroSection />
        
        {/* Category Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <CategoryGrid />
        </section>

        {/* Featured Blogs Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <FeaturedBlogs />
        </section>

        {/* Image Carousel / Branding Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/10 to-transparent pointer-events-none" />
          <ImageCarousel />
        </section>
      </main>
      <Footer />
    </>
  );
}

