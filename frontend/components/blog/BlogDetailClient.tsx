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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
          {toc.length > 0 && (
            <aside className="hidden xl:block sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  <BookOpen size={16} />
                  On this page
                </div>
                <nav className="space-y-2">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                          const y = element.getBoundingClientRect().top + window.scrollY - 100;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      className={`block text-sm leading-6 rounded transition-all ${
                        activeId === item.id
                          ? "text-brand-600 dark:text-brand-400 font-semibold"
                          : "text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                      }`}
                    >
                      {item.level === 3 && <span className="inline-block mr-2 text-slate-400 dark:text-slate-600">›</span>}
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <main className="min-w-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              Back to all blogs
            </Link>

            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-4 sm:mb-6">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                Home
              </Link>
              <ChevronRight size={11} />
              <Link href="/blog" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                Blog
              </Link>
              {post.categories[0] && (
                <>
                  <ChevronRight size={11} />
                  <Link
                    href={`/category/blog/${post.categories[0].slug}`}
                    className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
                  >
                    {post.categories[0].name}
                  </Link>
                </>
              )}
            </nav>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/blog/${cat.slug}`}
                  className="text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-brand-600/12 text-brand-400 border border-brand-500/20 hover:bg-brand-600/20 transition-all"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight text-slate-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 pb-4 mb-6 border-b border-[rgba(91,114,240,0.12)]">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md font-mono ${diff.cls}`}>
                {diff.label}
              </span>
              {post.reading_time && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {post.reading_time} min read
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Eye size={14} /> {post.view_count.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {format(new Date(post.published_at), "MMM d, yyyy")}
              </span>
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User size={14} /> {post.author.full_name || post.author.username}
                </span>
              )}
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 border border-[rgba(91,114,240,0.15)] shadow-2xl bg-slate-800">
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
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>

            {ytId && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-[rgba(91,114,240,0.2)] shadow-glow-brand">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-dark-700 border-b border-[rgba(91,114,240,0.12)]">
                  <Youtube size={16} className="text-red-500" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Video Tutorial</span>
                </div>
                <div className="aspect-video bg-black flex items-center justify-center">
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

            <div
              ref={contentRef}
              className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3 prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline prose-code:text-cyan-600 dark:prose-code:text-cyan-400 prose-code:bg-[rgba(91,114,240,0.1)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-slate-800 dark:prose-pre:bg-dark-700 prose-pre:text-slate-50 dark:prose-pre:text-slate-50 prose-pre:border prose-pre:border-[rgba(91,114,240,0.2)] prose-pre:rounded-xl prose-img:rounded-xl prose-img:border prose-img:border-[rgba(91,114,240,0.15)] prose-blockquote:border-l-brand-500 prose-blockquote:bg-brand-600/5 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-hr:border-[rgba(91,114,240,0.15)]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[rgba(91,114,240,0.12)]">
                <Tag size={14} className="text-slate-400 dark:text-slate-500 mt-0.5" />
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-dark-600 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-dark-400 hover:border-brand-500/30 hover:text-slate-900 dark:hover:text-slate-200 transition-all"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[rgba(91,114,240,0.12)]">
              <p className="text-sm text-slate-500 mb-3 font-medium">Share this article</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-slate-700 dark:text-slate-400 hover:text-brand-600 dark:hover:text-white hover:border-[rgba(91,114,240,0.4)] transition-all"
                >
                  <Twitter size={14} /> Twitter
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-slate-700 dark:text-slate-400 hover:text-brand-600 dark:hover:text-white hover:border-[rgba(91,114,240,0.4)] transition-all"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-slate-700 dark:text-slate-400 hover:text-brand-600 dark:hover:text-white hover:border-[rgba(91,114,240,0.4)] transition-all"
                >
                  <Link2 size={14} /> {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          </main>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-[rgba(91,114,240,0.12)]">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={18} className="text-brand-400" />
              <h2 className="font-display text-2xl font-bold">Related Articles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
