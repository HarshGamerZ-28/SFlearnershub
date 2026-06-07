"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Twitter, Youtube, Linkedin, Facebook, Mail, ArrowRight, CheckCircle } from "lucide-react";

const FOOTER_LINKS = {
  "Salesforce Platform": [
    { label: "Administration",    href: "/category/blog/salesforce-administration" },
    { label: "Development",       href: "/category/blog/salesforce-development" },
    { label: "LWC",               href: "/category/blog/lightning-web-components-lwc" },
    { label: "Integration",       href: "/category/blog/salesforce-integration" },
    { label: "DevOps",            href: "/category/blog/salesforce-deployment-devops" },
  ],
  "Study Resources": [
    { label: "Certification Prep",href: "/category/blog/certification-preparation-materials" },
    { label: "Interview Q&A",     href: "/category/blog/interview-questions-answers" },
    { label: "Mock Tests",        href: "/category/blog/mock-tests-quizzes" },
    { label: "Real-World Projects",href: "/category/blog/real-world-projects" },
    { label: "Practice Questions",href: "/category/blog/practice-questions" },
  ],
  "Salesforce Products": [
    { label: "Sales Cloud",       href: "/category/blog/sales-cloud" },
    { label: "Service Cloud",     href: "/category/blog/service-cloud" },
    { label: "Marketing Cloud",   href: "/category/blog/marketing-cloud" },
    { label: "Omnistudio",        href: "/category/blog/salesforce-omnistudio" },
    { label: "CPQ",               href: "/category/blog/salesforce-cpq" },
  ],
};

export default function Footer() {
  const [email, setEmail]     = useState("");
  const [done, setDone]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // POST /api/subscribers
    await new Promise(r => setTimeout(r, 800));
    setDone(true);
    setLoading(false);
  };

  return (
    <footer className="border-t border-slate-200 dark:border-[rgba(91,114,240,0.12)] bg-slate-50 dark:bg-dark-800/50 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-14">
        {/* Newsletter Section */}
        <div className="mb-8 sm:mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-brand-50 to-violet-50 dark:from-brand-900/40 dark:to-violet-900/30 border border-brand-200 dark:border-[rgba(91,114,240,0.15)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="max-w-xl">
              <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-1">Stay Updated</h3>
              <p className="text-xs sm:text-sm text-slate-400">Get the latest Salesforce insights delivered to your inbox.</p>
            </div>
            {done ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold whitespace-nowrap">
                <CheckCircle size={18} /> You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="flex-1 min-h-[48px] px-4 py-3 bg-white dark:bg-dark-800/60 border border-slate-300 dark:border-[rgba(91,114,240,0.25)] rounded-xl text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-brand-400 dark:focus:border-[rgba(91,114,240,0.5)] transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glow inline-flex items-center justify-center min-h-[48px] px-5 py-3 rounded-xl text-base font-semibold text-white disabled:opacity-60 whitespace-nowrap active:scale-95"
                >
                  {loading ? "Subscribing…" : <><span>Subscribe</span> <ArrowRight size={16} className="ml-1" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 min-h-[48px]">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden relative shrink-0 shadow-sm shadow-brand-500/20">
                <Image src="/logo.jpg" alt="SF Learners Hub" fill className="object-cover scale-[1.18]" sizes="(max-width: 640px) 48px, 56px" />
              </div>
              <span className="font-display font-bold text-lg sm:text-base md:text-lg gradient-text">SF Learners Hub</span>
            </Link>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
              Your premier Salesforce learning destination. All content migrated from the original WordPress site with full SEO preservation.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">
              Empowering Salesforce professionals with in-depth tutorials, certification resources, and real-world guides — from Admin fundamentals to advanced Apex development.
            </p>
            <div className="flex gap-2.5 sm:gap-3">
              {[
                { icon: <Twitter size={18} />, href: "https://x.com/SFLearnersHub" },
                { icon: <Youtube size={18} />, href: "https://www.youtube.com/channel/UCYDK82lewStiUKKL3zhxBGg" },
                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/company/sflearnershub/" },
                { icon: <Facebook size={18} />, href: "https://www.facebook.com/people/SF-Learners-Hub/61555359370537/" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-11 h-11 glass rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white hover:border-slate-400 dark:hover:border-[rgba(91,114,240,0.4)] transition-all active:scale-95"
                  aria-label={`SF Learners Hub on ${['Twitter', 'YouTube', 'LinkedIn', 'Facebook'][i]}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-sm sm:text-base text-white mb-3 sm:mb-4">{section}</h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="min-h-[36px] flex items-center text-sm sm:text-base text-slate-500 hover:text-slate-200 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(91,114,240,0.08)] pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
          <p>© {new Date().getFullYear()} SF Learners Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
