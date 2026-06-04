"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search, Menu, X, ChevronDown, Zap, Moon, Sun
} from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

const BLOG_CATEGORIES = [
  { name: "Administration",      slug: "salesforce-administration" },
  { name: "Development",         slug: "salesforce-development" },
  { name: "Lightning Web Components", slug: "lightning-web-components-lwc" },
  { name: "Certification Prep",  slug: "certification-preparation-materials" },
  { name: "Interview Q&A",       slug: "interview-questions-answers" },
  { name: "Salesforce DevOps",   slug: "salesforce-deployment-devops" },
  { name: "Salesforce Integration", slug: "salesforce-integration" },
];

export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-[rgba(91,114,240,0.2)] shadow-[0_2px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-slate-100 dark:border-[rgba(91,114,240,0.1)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 min-h-[48px]">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden relative shrink-0 shadow-sm shadow-brand-500/20">
            <Image src="/logo.jpg" alt="SF Learners Hub" fill className="object-cover scale-[1.18]" sizes="(max-width: 640px) 40px, 48px" />
          </div>
          <span className="font-display font-bold text-lg sm:text-xl gradient-text whitespace-nowrap">
            SF Learners Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link href="/" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus-ring transition-all text-sm font-medium">
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("Blog")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus-ring transition-all text-sm font-medium">
              Blog
              <ChevronDown
                size={13}
                className={`transition-transform ${activeDropdown === "Blog" ? "rotate-180" : ""}`}
              />
            </button>

            {activeDropdown === "Blog" && (
              <div className="absolute top-full left-0 mt-1 w-64 glass rounded-xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-[rgba(91,114,240,0.2)] animate-fade-in">
                {BLOG_CATEGORIES.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/category/blog/${item.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus-ring transition-all text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus-ring transition-all text-sm font-medium">
            About Us
          </Link>

          <Link href="/gallery" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus-ring transition-all text-sm font-medium">
            Gallery
          </Link>

          <Link href="/contact" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus-ring transition-all text-sm font-medium">
            Contact Us
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-12 h-12 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white focus-ring transition-all active:scale-95"
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-12 h-12 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white focus-ring transition-all group active:scale-95"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="group-hover:rotate-12 transition-transform" />
            ) : (
              <Moon size={20} className="group-hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Auth */}
          <Link
            href="/auth/login"
            className="hidden sm:flex items-center gap-1.5 min-h-[48px] px-4 py-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-[rgba(91,114,240,0.25)] hover:border-slate-400 dark:hover:border-[rgba(91,114,240,0.5)] hover:bg-slate-100 dark:hover:bg-[rgba(91,114,240,0.08)] focus-ring transition-all active:scale-95"
          >
            Sign In
          </Link>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-12 h-12 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white focus-ring transition-all active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-t border-slate-200 dark:border-[rgba(91,114,240,0.15)] bg-slate-50/95 dark:bg-dark-800/95 backdrop-blur-xl px-4 sm:px-6 py-4 sm:py-5 animate-fade-in">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Salesforce blogs, tutorials, interview questions…"
                className="w-full pl-12 pr-4 py-3.5 bg-dark-700 border border-[rgba(91,114,240,0.2)] rounded-xl text-base text-white placeholder:text-slate-500 outline-none focus:border-[rgba(91,114,240,0.5)] transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-glow flex-1 sm:flex-none min-h-[48px] px-6 py-3 rounded-xl text-base font-semibold text-white active:scale-95">
                Search
              </button>
              <button type="button" onClick={() => setSearchOpen(false)} className="min-h-[48px] px-4 py-3 text-slate-500 hover:text-white transition-colors active:scale-95">
                <X size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[68px] z-40 border-t border-slate-200 dark:border-[rgba(91,114,240,0.15)] bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="max-h-[calc(100vh-60px)] sm:max-h-[calc(100vh-68px)] overflow-y-auto px-4 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 min-h-[48px] rounded-lg text-base text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
            >
              Home
            </Link>
            
            <div className="px-4 py-2 mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Blog
            </div>
            {BLOG_CATEGORIES.map((item) => (
              <Link
                key={item.slug}
                href={`/category/blog/${item.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 pl-6 pr-4 py-3 min-h-[48px] rounded-lg text-base text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
              >
                {item.name}
              </Link>
            ))}

            <div className="h-px bg-slate-200 dark:bg-white/5 my-3" />

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 min-h-[48px] rounded-lg text-base text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
            >
              About Us
            </Link>
            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 min-h-[48px] rounded-lg text-base text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 min-h-[48px] rounded-lg text-base text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
