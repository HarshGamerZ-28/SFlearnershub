"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Linkedin,
  Link2,
  BookOpen,
  Twitter,
  User,
  Youtube,
  Zap,
  Tag,
  ChevronRight,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import BlogCard from "./BlogCard";
import type { Post } from "@/lib/api";

const DIFFICULTY_MAP: Record<string, { label: string; cls: string }> = {
  beginner: { label: "Beginner", cls: "badge-beginner" },
  intermediate: { label: "Intermediate", cls: "badge-intermediate" },
  advanced: { label: "Advanced", cls: "badge-advanced" },
};

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

interface Props {
  post: Post;
  related: Post[];
}

export default function BlogDetailClient({ post, related }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [readPct, setReadPct] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const headings = Array.from(contentRef.current.querySelectorAll("h2,h3"));
    const items = headings.map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent || "",
        level: Number(heading.tagName[1]),
      };
    });
    setToc(items);
  }, [post.content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    document.querySelectorAll("h2[id],h3[id]").forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [toc]);

  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const pct = Math.min(100, Math.max(0, ((window.innerHeight - top) / height) * 100));
      setReadPct(pct);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ytId = post.youtube_url ? extractYouTubeId(post.youtube_url) : null;
  const diff = DIFFICULTY_MAP[post.difficulty] || DIFFICULTY_MAP.beginner;
  const postUrl = typeof window !== "undefined" ? window.location.href : `https://sflearnershub.com/blog/${post.slug}`;

  const handleCopy = () => {
    copyToClipboard(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-brand-500 to-violet-500 z-50 transition-all duration-100"
        style={{ width: `${readPct}%` }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Back Navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors group focus-ring"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          ← Back to blogs
        </Link>

        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 overflow-x-auto pb-2">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors whitespace-nowrap">
            Home
          </Link>
          <ChevronRight size={11} className="flex-shrink-0" />
          <Link href="/blog" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors whitespace-nowrap">
            Blog
          </Link>
          {post.categories[0] && (
            <>
              <ChevronRight size={11} className="flex-shrink-0" />
              <Link
                href={`/category/blog/${post.categories[0].slug}`}
                className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors truncate"
              >
                {post.categories[0].name}
              </Link>
            </>
          )}
        </nav>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/blog/${cat.slug}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-600/12 text-brand-400 border border-brand-500/20 hover:bg-brand-600/20 transition-all focus-ring"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Article Header */}
        <article className="mb-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-slate-900 dark:text-white mb-6 break-words">
            {post.title}
          </h1>

          {/* Article Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-sm pb-6 mb-6 border-b border-[rgba(91,114,240,0.12)]">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className={`text-xs font-bold px-2 py-1 rounded-md font-mono w-fit ${diff.cls}`}>
                {diff.label}
              </span>
            </div>
            {post.reading_time && (
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Clock size={14} className="flex-shrink-0" />
                <span className="truncate">{post.reading_time} min</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Eye size={14} className="flex-shrink-0" />
              <span className="truncate">{post.view_count.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Calendar size={14} className="flex-shrink-0" />
              <span className="truncate text-xs">{format(new Date(post.published_at), "MMM d, yy")}</span>
            </div>
            {post.author && (
              <div className="col-span-2 sm:col-span-4 flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <User size={14} className="flex-shrink-0" />
                <span className="truncate">By {post.author.full_name || post.author.username}</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden mb-8 border border-[rgba(91,114,240,0.15)] shadow-lg bg-slate-800">
            <Image
              src={
                post.featured_image && post.featured_image.length > 5
                  ? post.featured_image.startsWith("http")
                    ? post.featured_image
                    : `https://sflearnershub.com${post.featured_image.startsWith("/") ? "" : "/"}${post.featured_image}`
                  : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
              }
              alt={post.title || "Blog Post"}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 600px"
            />
          </div>

          {/* Top Ad Container */}
          <div id="adsense-top" className="mb-8 min-h-[250px] sm:min-h-[280px] rounded-2xl bg-slate-900/5 dark:bg-slate-800/30 border border-dashed border-[rgba(91,114,240,0.15)] flex items-center justify-center">
            <p className="text-sm text-slate-400">📢 Advertisement</p>
          </div>

          {/* YouTube Video */}
          {ytId && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-[rgba(91,114,240,0.2)] shadow-lg bg-black">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-dark-700 border-b border-[rgba(91,114,240,0.12)]">
                <Youtube size={16} className="text-red-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Video Tutorial</span>
              </div>
              <div className="aspect-video bg-black flex items-center justify-center overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                  title={`Video: ${post.title}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div
            ref={contentRef}
            className="prose dark:prose-invert max-w-none prose-p:text-base prose-p:leading-8 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:mb-6 prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline prose-a:transition-colors prose-code:text-cyan-600 dark:prose-code:text-cyan-400 prose-code:bg-cyan-50 dark:prose-code:bg-[rgba(34,211,238,0.1)] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-slate-900 dark:prose-pre:bg-dark-800 prose-pre:text-slate-50 prose-pre:border prose-pre:border-[rgba(91,114,240,0.2)] prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:p-4 prose-img:rounded-2xl prose-img:border prose-img:border-[rgba(91,114,240,0.15)] prose-img:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:bg-brand-600/5 dark:prose-blockquote:bg-brand-900/10 prose-blockquote:rounded-r-xl prose-blockquote:pl-4 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:italic prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300 prose-hr:border-[rgba(91,114,240,0.15)] prose-hr:my-8 prose-table:text-sm prose-th:bg-slate-100 dark:prose-th:bg-dark-700 prose-th:font-semibold prose-td:border-[rgba(91,114,240,0.1)] prose-ul:list-disc prose-ul:pl-6 prose-ul:text-slate-700 dark:prose-ul:text-slate-300 prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-slate-700 dark:prose-ol:text-slate-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Mid-Content Ad */}
          <div id="adsense-mid" className="my-10 min-h-[250px] sm:min-h-[280px] rounded-2xl bg-slate-900/5 dark:bg-slate-800/30 border border-dashed border-[rgba(91,114,240,0.15)] flex items-center justify-center">
            <p className="text-sm text-slate-400">📢 Advertisement</p>
          </div>

          {/* Tags Section */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 pt-6 border-t border-[rgba(91,114,240,0.12)]">
              <Tag size={14} className="text-slate-400 dark:text-slate-500 mt-1" />
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  className="text-xs px-3 py-2 rounded-lg bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-dark-500 hover:border-brand-500/30 hover:text-slate-900 dark:hover:text-slate-200 transition-all focus-ring"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Share Section */}
          <div className="mb-10 pt-6 border-t border-[rgba(91,114,240,0.12)]">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Share this article</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:border-[rgba(91,114,240,0.4)] transition-all focus-ring"
              >
                <Twitter size={15} /> Twitter
              </a>
              <a
                href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:border-[rgba(91,114,240,0.4)] transition-all focus-ring"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:border-[rgba(91,114,240,0.4)] transition-all focus-ring"
              >
                <Link2 size={15} /> {copied ? "✓ Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </article>

        {/* Bottom Ad Container */}
        <div id="adsense-bottom" className="mb-10 min-h-[250px] sm:min-h-[280px] rounded-2xl bg-slate-900/5 dark:bg-slate-800/30 border border-dashed border-[rgba(91,114,240,0.15)] flex items-center justify-center">
          <p className="text-sm text-slate-400">📢 Advertisement</p>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-8">
              <Zap size={18} className="text-brand-400" />
              <h2 className="font-display text-2xl sm:text-3xl font-bold">Related Articles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
