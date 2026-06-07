"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import BlogCard from "./BlogCard";
import { blogApi, type Post } from "@/lib/api";

export function FeaturedBlogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogApi.featured(6)
      .then(r => setPosts(r.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 sm:mb-6">
        <SectionLabel className="mb-0">Featured Articles</SectionLabel>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors sm:mb-1"
        >
          View all articles
          <ArrowRight size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-72 rounded-xl sm:rounded-2xl" style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className={`animate-fade-up opacity-0 ${i === 0 ? "sm:col-span-2 lg:col-span-3" : ""}`}
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <BlogCard post={post} featured={i === 0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedBlogs;
