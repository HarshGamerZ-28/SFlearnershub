"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Youtube, Linkedin, Facebook, Mail, ArrowRight, CheckCircle } from "lucide-react";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { PLATFORM_FEATURES } from "@/lib/platformFeatures";

const FOOTER_CATEGORIES = [
  { label: "Administration", href: "/category/blog/salesforce-administration" },
  { label: "Development", href: "/category/blog/salesforce-development" },
  { label: "LWC", href: "/category/blog/lightning-web-components-lwc" },
  { label: "Integration", href: "/category/blog/salesforce-integration" },
  { label: "DevOps", href: "/category/blog/salesforce-deployment-devops" },
  { label: "Certification Prep", href: "/category/blog/certification-preparation-materials" },
];

const FOOTER_COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Search", href: "/search" },
  { label: "Sign In", href: "/auth/login" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setDone(true);
    setLoading(false);
  };

  return (
    <>
      <footer className="border-t border-slate-200 dark:border-[rgba(91,114,240,0.12)] bg-slate-100/80 dark:bg-dark-800/60 mt-12 sm:mt-16 pb-16 lg:pb-0">
        {/* Newsletter band */}
        <div className="border-b border-slate-200 dark:border-[rgba(91,114,240,0.1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <div className="glass rounded-2xl p-5 sm:p-6 border border-[rgba(91,114,240,0.12)]">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="max-w-md">
                  <h3 className="font-display font-semibold text-base sm:text-lg text-slate-900 dark:text-white mb-1">
                    Stay Updated
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Get the latest Salesforce insights delivered to your inbox.
                  </p>
                </div>
                {done ? (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-sm font-semibold whitespace-nowrap">
                    <CheckCircle size={18} /> You&apos;re subscribed!
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto lg:min-w-[420px]">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="flex-1 min-h-[44px] px-4 py-2.5 bg-white dark:bg-dark-800/60 border border-slate-300 dark:border-[rgba(91,114,240,0.25)] rounded-xl text-base text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-brand-400 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-glow inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 whitespace-nowrap active:scale-95"
                    >
                      {loading ? "Subscribing…" : <>Subscribe <ArrowRight size={15} className="ml-1.5" /></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main footer grid — apex-style columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full overflow-hidden relative shrink-0 shadow-sm shadow-brand-500/20">
                  <Image src="/logo.jpg" alt="SF Learners Hub" fill className="object-cover scale-[1.18]" sizes="44px" />
                </div>
                <span className="font-display font-bold text-lg gradient-text">SF Learners Hub</span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 max-w-sm">
                Build. Learn. Master Salesforce. Your premier destination for tutorials, certification prep, and real-world guides.
              </p>
              <div className="flex gap-2">
                {[
                  { icon: Twitter, href: "https://x.com/SFLearnersHub", label: "Twitter", hover: "hover:text-sky-500 hover:border-sky-500/30" },
                  { icon: Youtube, href: "https://www.youtube.com/channel/UCYDK82lewStiUKKL3zhxBGg", label: "YouTube", hover: "hover:text-red-500 hover:border-red-500/30" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/sflearnershub/", label: "LinkedIn", hover: "hover:text-blue-500 hover:border-blue-500/30" },
                  { icon: Facebook, href: "https://www.facebook.com/people/SF-Learners-Hub/61555359370537/", label: "Facebook", hover: "hover:text-blue-600 hover:border-blue-600/30" },
                ].map(({ icon: Icon, href, label, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`compact-btn w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-500 border border-transparent transition-all ${hover}`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform features column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-500 dark:text-brand-400 mb-4">
                Platform
              </h3>
              <ul className="space-y-2.5">
                {PLATFORM_FEATURES.map((f) => (
                  <li key={f.id}>
                    <Link href={f.href} className="nav-menu-link text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors py-0.5">
                      {f.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-500 dark:text-brand-400 mb-4">
                Categories
              </h3>
              <ul className="space-y-2.5">
                {FOOTER_CATEGORIES.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="nav-menu-link text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors py-0.5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-500 dark:text-brand-400 mb-4">
                Company
              </h3>
              <ul className="space-y-2.5">
                {FOOTER_COMPANY.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="nav-menu-link text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors py-0.5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-500 dark:text-brand-400 mb-3 mt-6">
                Contact
              </h3>
              <a
                href="mailto:info@sflearnershub.com"
                className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
              >
                <Mail size={14} />
                info@sflearnershub.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-[rgba(91,114,240,0.08)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-500">
            <p>© {new Date().getFullYear()} SF Learners Hub. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

      <MobileBottomNav />
    </>
  );
}
