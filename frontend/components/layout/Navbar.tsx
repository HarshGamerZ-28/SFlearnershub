"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, Menu, X, ChevronDown, Zap, Moon, Sun
} from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

const BLOG_CATEGORIES = [
  { name: "Salesforce Announcements", slug: "salesforce-announcements" },
  { name: "Salesforce Platform", slug: "salesforce-platform" },
  { name: "Salesforce Products Overview", slug: "salesforce-products-overview" },
  { name: "Salesforce Study Resources", slug: "salesforce-study-resources" },
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
          ? "dark:bg-dark-900/95 dark:backdrop-blur-xl dark:border-b dark:border-[rgba(91,114,240,0.2)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] light:bg-white/95 light:backdrop-blur-xl light:border-b light:border-slate-200 light:shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
          : "dark:bg-dark-900/80 dark:backdrop-blur-md dark:border-b dark:border-[rgba(91,114,240,0.1)] light:bg-white/80 light:backdrop-blur-md light:border-b light:border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg gradient-text hidden sm:block">
            SF Learners Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link href="/" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("Blog")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
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
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            About Us
          </Link>

          <Link href="/gallery" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            Gallery
          </Link>

          <Link href="/contact" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            Contact Us
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <Search size={16} />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition-all group"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={16} className="group-hover:rotate-12 transition-transform" />
            ) : (
              <Moon size={16} className="group-hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Auth */}
          <Link
            href="/auth/login"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium dark:text-slate-300 light:text-slate-700 dark:hover:text-white light:hover:text-slate-900 dark:border dark:border-[rgba(91,114,240,0.25)] light:border light:border-slate-300 dark:hover:border-[rgba(91,114,240,0.5)] light:hover:border-slate-400 dark:hover:bg-[rgba(91,114,240,0.08)] light:hover:bg-slate-100 transition-all"
          >
            Sign In
          </Link>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="dark:border-t dark:border-[rgba(91,114,240,0.15)] light:border-t light:border-slate-200 dark:bg-dark-800/95 light:bg-slate-50/95 backdrop-blur-xl px-6 py-3 animate-fade-in">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Salesforce blogs, tutorials, interview questions…"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-700 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-white placeholder:text-slate-500 outline-none focus:border-[rgba(91,114,240,0.5)] transition-all"
              />
            </div>
            <button type="submit" className="btn-glow px-4 py-2.5 rounded-xl text-sm font-semibold text-white">
              Search
            </button>
            <button type="button" onClick={() => setSearchOpen(false)} className="px-3 text-slate-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[rgba(91,114,240,0.15)] bg-dark-800/98 backdrop-blur-xl animate-fade-in">
          <div className="max-h-[70vh] overflow-y-auto px-4 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Home
            </Link>
            
            <div className="px-3 py-2 mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Blog
            </div>
            {BLOG_CATEGORIES.map((item) => (
              <Link
                key={item.slug}
                href={`/category/blog/${item.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 pl-6 pr-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {item.name}
              </Link>
            ))}

            <div className="h-px bg-white/5 my-2" />

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              About Us
            </Link>
            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
