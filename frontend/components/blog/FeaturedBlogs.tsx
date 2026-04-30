"use client";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import BlogCard from "./BlogCard";
import { blogApi, type Post } from "@/lib/api";

export function FeaturedBlogs() {
  const [posts, setPosts]   = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogApi.featured(6)
      .then(r => setPosts(r.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Star size={18} className="text-brand-400" />
        <h2 className="font-display text-2xl font-bold">Featured Articles</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-72 rounded-2xl" style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="animate-fade-up opacity-0"
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
