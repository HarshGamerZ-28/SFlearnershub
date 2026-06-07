import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function HomeCta() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="glass rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-10 sm:py-14 text-center border border-[rgba(91,114,240,0.15)]">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white mb-3 sm:mb-4">
          Ready to master <span className="gradient-text">Salesforce</span>?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8">
          Hundreds of tutorials, certification guides, and real-world projects — all free. Start learning today.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-5">
          <Link
            href="/blog"
            className="btn-glow inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl text-base font-semibold text-white active:scale-95"
          >
            Explore Blogs
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 border border-[rgba(91,114,240,0.3)] hover:border-[rgba(91,114,240,0.6)] hover:bg-[rgba(91,114,240,0.07)] transition-all active:scale-95"
          >
            Sign In
            <Star size={18} />
          </Link>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Free resources · Expert guides · Join 50K+ learners
        </p>
      </div>
    </section>
  );
}
