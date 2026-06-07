"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Play, Tag } from "lucide-react";
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
  const imageSrc =
    post.featured_image && post.featured_image.length > 5
      ? post.featured_image.startsWith("http")
        ? post.featured_image
        : `https://sflearnershub.com${post.featured_image.startsWith("/") ? "" : "/"}${post.featured_image}`
      : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={clsx(
        "group flex flex-col glass rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300",
        "hover:border-[rgba(91,114,240,0.4)] hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-card-hover focus-ring",
        featured && "md:flex-row"
      )}
    >
      {/* Thumbnail */}
      <div
        className={clsx(
          "relative overflow-hidden bg-gradient-to-br from-brand-900/40 to-violet-900/20 shrink-0",
          featured
            ? "w-full md:w-2/5 h-44 xs:h-48 sm:h-52 md:h-auto md:min-h-[220px]"
            : "h-40 xs:h-44 sm:h-48"
        )}
      >
        <Image
          src={imageSrc}
          alt={post.title || "Blog Post"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={featured ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          priority={featured}
          loading={featured ? "eager" : "lazy"}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-dark-900/10 to-transparent" />

        {/* Badges row */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2 z-10">
          <span className={clsx(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-dark-900/80 backdrop-blur-md border border-white/10 text-white",
            DIFFICULTY_STYLES[post.difficulty]
          )}>
            {DIFFICULTY_LABELS[post.difficulty]}
          </span>

          {post.youtube_url && (
            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-md">
              <Play size={10} fill="white" className="shrink-0" />
              Watch
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col min-w-0">
        {/* Categories */}
        {post.categories.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-2.5">
            {post.categories.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-600/10 text-brand-500 dark:text-brand-400 border border-brand-500/20"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          className={clsx(
            "font-display font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors line-clamp-2",
            featured ? "text-lg sm:text-xl md:text-2xl" : "text-base sm:text-lg"
          )}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className={clsx(
            "text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-3",
            featured ? "text-sm sm:text-base line-clamp-3" : "text-sm line-clamp-2"
          )}>
            {post.excerpt.replace(/<[^>]*>/g, "")}
          </p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag.id} className="inline-flex items-center gap-0.5 text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-600 text-slate-500 dark:text-slate-400">
                <Tag size={9} />
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Meta footer */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200/80 dark:border-[rgba(91,114,240,0.08)] pt-3 mt-auto gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {post.reading_time && (
              <span className="flex items-center gap-1 shrink-0">
                <Clock size={11} />
                {post.reading_time} min
              </span>
            )}
            <span className="flex items-center gap-1 shrink-0">
              <Eye size={11} />
              {post.view_count.toLocaleString()}
            </span>
          </div>
          <span className="truncate text-slate-400 text-[11px] sm:text-xs">
            {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
          </span>
        </div>
      </div>
    </Link>
  );
}
