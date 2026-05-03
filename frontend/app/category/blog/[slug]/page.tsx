// app/category/blog/[slug]/page.tsx — Category archive (preserves /category/blog/* WP URLs)
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryPageClient from "@/components/blog/CategoryPageClient";

const API = process.env.NEXT_PUBLIC_API_URL || "https://sflearnershub.onrender.com";

async function getCategory(slug: string) {
  try {
    const res = await fetch(`${API}/api/categories/${slug}`, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = await getCategory(params.slug);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: cat.name,
    description: cat.description || `Browse all ${cat.name} articles on SF Learners Hub.`,
    alternates: { canonical: `https://sflearnershub.com/category/blog/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);
  if (!category) notFound();

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <CategoryPageClient category={category} />
      </main>
      <Footer />
    </>
  );
}
