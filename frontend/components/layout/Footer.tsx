"use client";
import { useState } from "react";
import Link from "next/link";
import { Zap, Twitter, Youtube, Linkedin, Github, Mail, ArrowRight, CheckCircle } from "lucide-react";

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
    <footer className="border-t border-[rgba(91,114,240,0.12)] bg-dark-800/50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Newsletter Section */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-brand-900/40 to-violet-900/30 border border-[rgba(91,114,240,0.15)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-white mb-1">Stay Updated</h3>
              <p className="text-sm text-slate-400">Get the latest Salesforce insights delivered to your inbox.</p>
            </div>
            {done ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold whitespace-nowrap">
                <CheckCircle size={16} /> You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  required placeholder="your@email.com"
                  className="flex-1 sm:flex-none px-3 py-2 bg-dark-800/60 border border-[rgba(91,114,240,0.25)] rounded-lg text-xs text-white placeholder:text-slate-600 outline-none focus:border-[rgba(91,114,240,0.5)] transition-all"
                />
                <button type="submit" disabled={loading}
                  className="btn-glow inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold text-white disabled:opacity-60 whitespace-nowrap">
                  {loading ? "Subscribing…" : <><span>Subscribe</span> <ArrowRight size={12} className="ml-1" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
                <Zap size={15} className="text-white" />
              </div>
              <span className="font-display font-bold text-base gradient-text">SF Learners Hub</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Your premier Salesforce learning destination. All content migrated from the original WordPress site with full SEO preservation.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Twitter size={15} />, href: "#" },
                { icon: <Youtube size={15} />, href: "#" },
                { icon: <Linkedin size={15} />, href: "#" },
                { icon: <Github size={15} />, href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:border-[rgba(91,114,240,0.4)] transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-sm text-white mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-slate-200 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(91,114,240,0.08)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} SF Learners Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
