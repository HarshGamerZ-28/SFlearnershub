"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { blogApi, type Post, type Category } from "@/lib/api";

interface Props { category: Category }

export default function CategoryPageClient({ category }: Props) {
  const [posts, setPosts]   = useState<Post[]>([]);
  const [total, setTotal]   = useState(0);
  const [page, setPage]     = useState(1);
  const [pages, setPages]   = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    blogApi.list({ category: category.slug, page, per_page: 12 })
      .then((r) => {
        setPosts(r.data.items);
        setTotal(r.data.total);
        setPages(r.data.total_pages);
      })
      .finally(() => setLoading(false));
  }, [category.slug, page]);

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-300">{category.name}</span>
        </div>

        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: `${category.color}20`, border: `1px solid ${category.color}40` }}
          >
            <Layers size={24} style={{ color: category.color }} />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">{category.name}</h1>
            {category.description && (
              <p className="text-slate-400 text-lg">{category.description}</p>
            )}
            <p className="text-slate-500 text-sm mt-1">{total} articles</p>
          </div>
        </div>
      </div>

      {/* Sub-categories */}
      {category.children && category.children.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sub-categories</p>
          <div className="flex flex-wrap gap-3">
            {category.children.map((child) => (
              <Link
                key={child.id}
                href={`/category/blog/${child.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-slate-300 hover:text-white hover:border-[rgba(91,114,240,0.4)] transition-all"
              >
                {child.name}
                <ArrowRight size={13} className="text-slate-500" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Post grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-72 rounded-2xl" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 glass rounded-2xl">
          <p className="text-slate-500">No posts in this category yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>

          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 rounded-lg glass text-sm disabled:opacity-30 transition-all">← Prev</button>
              <span className="px-4 py-2 text-sm text-slate-400">{page} / {pages}</span>
              <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 rounded-lg glass text-sm disabled:opacity-30 transition-all">Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
