// app/blog/page.tsx — Blog listing with SSR + filters
import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "All Salesforce blogs — administration, development, LWC, integration, DevOps and more.",
};

interface Props {
  searchParams: { page?: string; category?: string; difficulty?: string; tag?: string; q?: string };
}

export default function BlogPage({ searchParams }: Props) {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-3">
            All <span className="gradient-text">Blogs</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Explore hundreds of Salesforce tutorials, guides, and deep-dives — all migrated from the original WordPress site with every slug preserved.
          </p>
        </div>
        <Suspense fallback={<div className="h-96 skeleton rounded-xl sm:rounded-2xl" />}>
          <BlogListClient initialParams={searchParams} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
