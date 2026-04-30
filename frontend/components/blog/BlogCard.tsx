"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Youtube, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/lib/api";
import { clsx } from "clsx";

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner:     "badge-beginner",
  intermediate: "badge-intermediate",
  advanced:     "badge-advanced",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner:     "Beginner",
  intermediate: "Intermediate",
  advanced:     "Advanced",
};

interface Props {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={clsx(
        "group flex flex-col glass rounded-2xl overflow-hidden transition-all duration-300",
        "hover:border-[rgba(91,114,240,0.4)] hover:-translate-y-1 hover:shadow-card-hover",
        featured && "lg:flex-row"
      )}
    >
      {/* Thumbnail */}
      <div
        className={clsx(
          "relative overflow-hidden bg-gradient-to-br from-brand-900/40 to-violet-900/20",
          featured ? "lg:w-2/5 min-h-[200px]" : "h-44"
        )}
      >
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500/20 to-violet-500/20 border border-brand-500/20 flex items-center justify-center">
              <Tag size={24} className="text-brand-400" />
            </div>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={clsx("text-xs font-semibold px-2 py-1 rounded-md font-mono", DIFFICULTY_STYLES[post.difficulty])}>
            {DIFFICULTY_LABELS[post.difficulty]}
          </span>
        </div>

        {post.youtube_url && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md">
              <Youtube size={11} />
              VIDEO
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-3">
          {post.categories.slice(0, 2).map((cat) => (
            <span
              key={cat.id}
              className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-600/12 text-brand-400 border border-brand-500/20"
            >
              {cat.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className={clsx(
            "font-display font-bold text-white leading-snug mb-2 group-hover:text-brand-300 transition-colors",
            featured ? "text-xl" : "text-base"
          )}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
            {post.excerpt.replace(/<[^>]*>/g, "")}
          </p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag.id} className="text-xs px-2 py-0.5 rounded bg-dark-600 text-slate-500 border border-dark-400">
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Meta footer */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-[rgba(91,114,240,0.08)] pt-3 mt-auto">
          <div className="flex items-center gap-3">
            {post.reading_time && (
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.reading_time} min read
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {post.view_count.toLocaleString()}
            </span>
          </div>
          <span className="text-slate-600">
            {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
          </span>
        </div>
      </div>
    </Link>
  );
}
