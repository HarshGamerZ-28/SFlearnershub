"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import BlogCard from "./BlogCard";
import { blogApi, categoryApi, type Post, type Category } from "@/lib/api";

const DIFFICULTIES = [
  { value: "", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

interface Props {
  initialParams: { page?: string; category?: string; difficulty?: string; q?: string };
}

export default function BlogListClient({ initialParams }: Props) {
  const router = useRouter();
  const [posts, setPosts]           = useState<Post[]>([]);
  const [total, setTotal]           = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]       = useState(true);

  const [query,      setQuery]      = useState(initialParams.q || "");
  const [category,   setCategory]   = useState(initialParams.category || "");
  const [difficulty, setDifficulty] = useState(initialParams.difficulty || "");
  const [page,       setPage]       = useState(parseInt(initialParams.page || "1"));

  // Fetch categories for filter
  useEffect(() => {
    categoryApi.list().then((r) => {
      const flat: Category[] = [];
      r.data.forEach((cat) => { flat.push(cat); (cat.children || []).forEach((c) => flat.push(c)); });
      setCategories(flat);
    });
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, unknown> = { page, per_page: 12 };
      if (query)      params.q          = query;
      if (category)   params.category   = category;
      if (difficulty) params.difficulty = difficulty;

      const apiCall = query
        ? (await import("@/lib/api")).searchApi.search(params as never)
        : blogApi.list(params as never);
      const res = await apiCall;
      setPosts(res.data.items);
      setTotal(res.data.total);
      setTotalPages(res.data.total_pages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [query, category, difficulty, page]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const clearFilters = () => {
    setQuery(""); setCategory(""); setDifficulty(""); setPage(1);
  };

  const hasFilters = query || category || difficulty;

  return (
    <div>
      {/* Search + Filters */}
      <div className="glass rounded-2xl p-4 mb-8 space-y-3">
        <div className="flex gap-3 flex-wrap">
          {/* Search */}
          <div className="w-full sm:flex-1 sm:min-w-[200px] relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search blogs, topics, keywords…"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-dark-700 border border-slate-200 dark:border-[rgba(91,114,240,0.15)] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-500 outline-none focus:border-brand-500 dark:focus:border-[rgba(91,114,240,0.45)] transition-all"
            />
          </div>

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="w-full sm:w-auto px-3 py-2.5 bg-slate-100 dark:bg-dark-700 border border-slate-200 dark:border-[rgba(91,114,240,0.15)] rounded-xl text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-brand-500 dark:focus:border-[rgba(91,114,240,0.45)] transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>

          {/* Difficulty filter */}
          <select
            value={difficulty}
            onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
            className="w-full sm:w-auto px-3 py-2.5 bg-slate-100 dark:bg-dark-700 border border-slate-200 dark:border-[rgba(91,114,240,0.15)] rounded-xl text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-brand-500 dark:focus:border-[rgba(91,114,240,0.45)] transition-all cursor-pointer"
          >
            {DIFFICULTIES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>

          {hasFilters && (
            <button onClick={clearFilters} className="w-full sm:w-auto justify-center flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-[rgba(255,255,255,0.1)] hover:border-slate-300 dark:hover:border-[rgba(255,255,255,0.2)] transition-all">
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {/* Active filter pills */}
        {hasFilters && (
          <div className="flex gap-2 flex-wrap">
            {query && <ActivePill label={`"${query}"`} onRemove={() => setQuery("")} />}
            {category && <ActivePill label={categories.find(c => c.slug === category)?.name || category} onRemove={() => setCategory("")} />}
            {difficulty && <ActivePill label={difficulty} onRemove={() => setDifficulty("")} />}
          </div>
        )}
      </div>

      {/* Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-400 text-sm">
          {loading ? "Loading…" : `${total.toLocaleString()} posts found`}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <SlidersHorizontal size={13} />
          Sorted by latest
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="skeleton h-72 rounded-2xl" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 glass rounded-2xl">
          <p className="text-slate-500 text-lg mb-2">No posts found</p>
          <p className="text-slate-600 text-sm">Try adjusting your search or clearing filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 rounded-lg glass text-sm disabled:opacity-30 hover:border-[rgba(91,114,240,0.4)] transition-all"
          >
            ← Prev
          </button>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm transition-all ${
                    p === page
                      ? "bg-gradient-to-br from-brand-500 to-violet-600 text-white font-bold"
                      : "glass text-slate-400 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 rounded-lg glass text-sm disabled:opacity-30 hover:border-[rgba(91,114,240,0.4)] transition-all"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

function ActivePill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-brand-600/15 text-brand-400 border border-brand-500/25">
      {label}
      <button onClick={onRemove} className="hover:text-white transition-colors"><X size={11} /></button>
    </span>
  );
}
