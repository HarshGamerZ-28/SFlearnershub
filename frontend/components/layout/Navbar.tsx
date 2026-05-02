"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, Menu, X, ChevronDown, Zap, BookOpen,
  Code2, Settings, Link2, GitBranch, GraduationCap,
  Megaphone, Package, Camera
} from "lucide-react";

const NAV_CATEGORIES = [
  {
    label: "Salesforce Platform",
    icon: <Zap size={14} />,
    items: [
      { name: "Administration",  slug: "salesforce-administration",    icon: <Settings size={13} /> },
      { name: "Development",     slug: "salesforce-development",        icon: <Code2 size={13} /> },
      { name: "LWC",             slug: "lightning-web-components-lwc",  icon: <Zap size={13} /> },
      { name: "DevOps",          slug: "salesforce-deployment-devops",  icon: <GitBranch size={13} /> },
      { name: "Integration",     slug: "salesforce-integration",        icon: <Link2 size={13} /> },
    ],
  },
  {
    label: "Study Resources",
    icon: <GraduationCap size={14} />,
    items: [
      { name: "Certification Prep",    slug: "certification-preparation-materials" },
      { name: "Interview Q&A",         slug: "interview-questions-answers" },
      { name: "Mock Tests",            slug: "mock-tests-quizzes" },
      { name: "Real-World Projects",   slug: "real-world-projects" },
      { name: "Practice Questions",    slug: "practice-questions" },
    ],
  },
  {
    label: "Products",
    icon: <Package size={14} />,
    items: [
      { name: "Sales Cloud",      slug: "sales-cloud" },
      { name: "Service Cloud",    slug: "service-cloud" },
      { name: "Marketing Cloud",  slug: "marketing-cloud" },
      { name: "Omnistudio",       slug: "salesforce-omnistudio" },
      { name: "CPQ",              slug: "salesforce-cpq" },
    ],
  },
  {
    label: "Announcements",
    icon: <Megaphone size={14} />,
    items: [
      { name: "Release Notes",  slug: "salesforce-release-notes" },
      { name: "Career Paths",   slug: "salesforce-career-paths" },
      { name: "Events",         slug: "salesforce-events" },
      { name: "Tools & Tips",   slug: "salesforce-tools-tips" },
    ],
  },
];

export default function Navbar() {
  const router = useRouter();
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
          ? "bg-dark-900/95 backdrop-blur-xl border-b border-[rgba(91,114,240,0.2)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-dark-900/80 backdrop-blur-md border-b border-[rgba(91,114,240,0.1)]"
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
          {NAV_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(cat.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                {cat.icon}
                {cat.label}
                <ChevronDown
                  size={13}
                  className={`transition-transform ${activeDropdown === cat.label ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === cat.label && (
                <div className="absolute top-full left-0 mt-1 w-56 glass rounded-xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-[rgba(91,114,240,0.2)] animate-fade-in">
                  {cat.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/category/blog/${item.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm"
                    >
                      {item.icon && <span className="text-brand-400">{item.icon}</span>}
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/blog"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
          >
            <BookOpen size={14} />
            All Blogs
          </Link>

          <Link
            href="/gallery"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
          >
            <Camera size={14} />
            Gallery
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

          {/* Auth */}
          <Link
            href="/auth/login"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white border border-[rgba(91,114,240,0.25)] hover:border-[rgba(91,114,240,0.5)] hover:bg-[rgba(91,114,240,0.08)] transition-all"
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
        <div className="border-t border-[rgba(91,114,240,0.15)] bg-dark-800/95 backdrop-blur-xl px-6 py-3 animate-fade-in">
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
            {NAV_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {cat.label}
                </div>
                {cat.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/category/blog/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
