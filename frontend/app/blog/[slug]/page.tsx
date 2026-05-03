// app/blog/[slug]/page.tsx — Blog detail page with full SEO + YouTube embed
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogDetailClient from "@/components/blog/BlogDetailClient";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getPost(slug: string) {
  const url = `${API}/api/blogs/${slug}`;
  console.log(`Fetching post from: ${url}`);
  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      console.error(`Fetch failed for ${slug}: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json();
  } catch (err) {
    console.error(`Fetch error for ${slug}:`, err);
    return null;
  }
}

async function getRelated(slug: string, categorySlug?: string) {
  try {
    const params = categorySlug ? `category=${categorySlug}&per_page=3` : `per_page=3`;
    const res = await fetch(`${API}/api/blogs?${params}`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).filter((p: { slug: string }) => p.slug !== slug).slice(0, 3);
  } catch {
    return [];
  }
}

// ─── Dynamic SEO metadata ─────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post Not Found" };

  const title       = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 155);
  const image       = post.og_image || post.featured_image;

  return {
    title,
    description,
    keywords: post.meta_keywords?.join(", "),
    openGraph: {
      title,
      description,
      url: `https://sflearnershub.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      // Preserves original WordPress canonical
      canonical: post.canonical_url || `https://sflearnershub.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-6xl font-display font-extrabold gradient-text mb-4">404</h1>
            <p className="text-slate-400 text-lg mb-8">We couldn&apos;t find the blog post you&apos;re looking for.</p>
            <div className="bg-dark-700 p-4 rounded-xl text-xs text-slate-500 font-mono mb-8 max-w-md mx-auto">
              Requested Slug: {params.slug}
            </div>
            <Link href="/blog" className="btn-glow px-8 py-3 rounded-xl text-white font-semibold inline-block">
              Back to all blogs
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  const primaryCat = post.categories?.[0]?.slug;
  const related    = await getRelated(params.slug, primaryCat);

  return (
    <>
      <Navbar />
      <BlogDetailClient post={post} related={related} />
      <Footer />
    </>
  );
}
