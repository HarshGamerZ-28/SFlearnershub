// app/search/page.tsx
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata: Metadata = { title: "Search Results" };

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-extrabold mb-2">
            Search Results
            {searchParams.q && (
              <> for <span className="gradient-text">"{searchParams.q}"</span></>
            )}
          </h1>
          <p className="text-slate-400 text-sm">Full-text search powered by PostgreSQL GIN indexes</p>
        </div>
        <BlogListClient initialParams={searchParams} />
      </main>
      <Footer />
    </>
  );
}
