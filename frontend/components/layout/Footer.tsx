// components/layout/Footer.tsx
import Link from "next/link";
import { Zap, Twitter, Youtube, Linkedin, Github, Mail } from "lucide-react";

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
  return (
    <footer className="border-t border-[rgba(91,114,240,0.12)] bg-dark-800/50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">
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
          <div className="flex gap-4">
            <span className="text-slate-700 font-mono">Next.js + FastAPI + PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
