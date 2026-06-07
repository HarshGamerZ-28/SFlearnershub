"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search, Menu, X, ChevronDown, Moon, Sun, LogIn, Home, BookOpen, Info, Images, Mail
} from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

const MAIN_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/contact", label: "Contact Us", icon: Mail },
];

const BLOG_CATEGORIES = [
  { name: "Administration", slug: "salesforce-administration" },
  { name: "Development", slug: "salesforce-development" },
  { name: "Lightning Web Components", slug: "lightning-web-components-lwc" },
  { name: "Certification Prep", slug: "certification-preparation-materials" },
  { name: "Interview Q&A", slug: "interview-questions-answers" },
  { name: "Salesforce DevOps", slug: "salesforce-deployment-devops" },
  { name: "Salesforce Integration", slug: "salesforce-integration" },
];

export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setBlogOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-[rgba(91,114,240,0.2)] shadow-[0_2px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-slate-100 dark:border-[rgba(91,114,240,0.1)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 lg:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden relative shrink-0 shadow-sm shadow-brand-500/20">
              <Image src="/logo.jpg" alt="SF Learners Hub" fill className="object-cover scale-[1.18]" sizes="44px" />
            </div>
            <span className="hidden xs:inline font-display font-bold text-base sm:text-xl gradient-text whitespace-nowrap truncate">
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
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="compact-btn w-9 h-9 sm:w-10 sm:h-10 rounded-lg glass flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus-ring transition-all active:scale-95"
              aria-label="Toggle search"
            >
              <Search size={18} />
            </button>

            <button
              onClick={toggleTheme}
              className="compact-btn w-9 h-9 sm:w-10 sm:h-10 rounded-lg glass flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus-ring transition-all group active:scale-95"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="group-hover:rotate-12 transition-transform" />
              ) : (
                <Moon size={18} className="group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            <Link
              href="/auth/login"
              className="hidden sm:flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-[rgba(91,114,240,0.25)] hover:border-slate-400 dark:hover:border-[rgba(91,114,240,0.5)] hover:bg-slate-100 dark:hover:bg-[rgba(91,114,240,0.08)] focus-ring transition-all active:scale-95"
            >
              Sign In
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="compact-btn lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-lg glass flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus-ring transition-all duration-300 active:scale-95"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div className="border-t border-slate-200 dark:border-[rgba(91,114,240,0.15)] bg-slate-50/95 dark:bg-dark-800/95 backdrop-blur-xl px-3 sm:px-6 py-3 sm:py-5 animate-fade-in">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Salesforce blogs, tutorials…"
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-700 border border-slate-200 dark:border-[rgba(91,114,240,0.2)] rounded-xl text-base text-slate-900 dark:text-white placeholder:text-slate-500 outline-none focus:border-brand-500 dark:focus:border-[rgba(91,114,240,0.5)] transition-all"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-glow flex-1 sm:flex-none min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-semibold text-white active:scale-95">
                  Search
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="compact-btn min-h-[44px] px-3 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95">
                  <X size={20} />
                </button>
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu — rendered outside header for correct z-index stacking */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[200]"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-dark-900 shadow-2xl flex flex-col slide-in-right">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-slate-200 dark:border-[rgba(91,114,240,0.15)] shrink-0">
              <span className="font-display font-bold text-base gradient-text">Menu</span>
              <button
                onClick={closeMenu}
                className="compact-btn w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable nav */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
              {/* Main nav — same as desktop */}
              <div className="space-y-1 mb-3">
                {MAIN_NAV.map(({ href, label, icon: Icon }) => {
                  if (label === "Blog") {
                    return (
                      <div key={href}>
                        <button
                          onClick={() => setBlogOpen(!blogOpen)}
                          className="w-full flex items-center justify-between gap-3 px-3 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={18} className="text-brand-500 shrink-0" />
                            {label}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-slate-400 transition-transform ${blogOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {blogOpen && (
                          <div className="ml-3 pl-3 border-l-2 border-brand-500/20 space-y-0.5 mb-1">
                            <Link
                              href="/blog"
                              onClick={closeMenu}
                              className="nav-menu-link flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-500/5 transition-all"
                            >
                              All Blogs
                            </Link>
                            {BLOG_CATEGORIES.map((item) => (
                              <Link
                                key={item.slug}
                                href={`/category/blog/${item.slug}`}
                                onClick={closeMenu}
                                className="nav-menu-link flex items-center px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMenu}
                      className="nav-menu-link flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                    >
                      <Icon size={18} className="text-brand-500 shrink-0" />
                      {label}
                    </Link>
                  );
                })}
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/10 my-2" />

              <Link
                href="/auth/login"
                onClick={closeMenu}
                className="nav-menu-link flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-brand-600 dark:text-brand-400 border border-brand-500/30 hover:bg-brand-500/5 transition-all"
              >
                <LogIn size={18} />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
