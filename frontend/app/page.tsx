// app/page.tsx — Home page
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/layout/HeroSection";
import CategoryGrid from "@/components/blog/CategoryGrid";
import FeaturedBlogs from "@/components/blog/FeaturedBlogs";
import NewsletterBanner from "@/components/layout/NewsletterBanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <section className="max-w-7xl mx-auto px-6 py-16">
          <Suspense fallback={<div className="h-40 skeleton rounded-2xl" />}>
            <CategoryGrid />
          </Suspense>
        </section>
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <Suspense fallback={<div className="h-80 skeleton rounded-2xl" />}>
            <FeaturedBlogs />
          </Suspense>
        </section>
        <NewsletterBanner />
      </main>
      <Footer />
    </>
  );
}
