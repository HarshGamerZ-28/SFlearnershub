// app/page.tsx — Home page
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/layout/HeroSection";
import HomeStats from "@/components/layout/HomeStats";
import HomeCta from "@/components/layout/HomeCta";
import ImageCarousel from "@/components/blog/ImageCarousel";
import PlatformFeatures from "@/components/blog/PlatformFeatures";
import CategoryGrid from "@/components/blog/CategoryGrid";
import FeaturedBlogs from "@/components/blog/FeaturedBlogs";
import LeaderboardSection from "@/components/home/LeaderboardSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero slider */}
      <ImageCarousel variant="hero" />

      <main className="overflow-x-hidden">
        <HeroSection />
        <HomeStats />

        {/* Features — all 7 Apex Arena-style platform features */}
        <section id="platform" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <PlatformFeatures />
        </section>

        {/* Categories */}
        <section className="border-t border-slate-200/80 dark:border-[rgba(91,114,240,0.1)] bg-slate-50/50 dark:bg-dark-800/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <CategoryGrid />
          </div>
        </section>

        {/* Leaderboard */}
        <section className="border-t border-slate-200/80 dark:border-[rgba(91,114,240,0.1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <LeaderboardSection />
          </div>
        </section>

        {/* Featured articles */}
        <section className="border-t border-slate-200/80 dark:border-[rgba(91,114,240,0.1)] bg-slate-50/50 dark:bg-dark-800/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <FeaturedBlogs />
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-slate-200/80 dark:border-[rgba(91,114,240,0.1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="pb-12 sm:pb-16 pt-4">
          <HomeCta />
        </div>
      </main>

      <Footer />
    </>
  );
}
