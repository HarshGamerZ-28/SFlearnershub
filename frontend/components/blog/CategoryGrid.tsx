"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Settings, Code2, Zap, GitBranch, Link2, GraduationCap,
  Megaphone, Package, Award, MessageSquare, ClipboardCheck,
  Briefcase, HelpCircle, BarChart2, Headphones, Mail, Layers, DollarSign, ArrowRight
} from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import { categoryApi, type Category } from "@/lib/api";

const ICON_MAP: Record<string, React.ReactNode> = {
  Settings:        <Settings size={22} />,
  Code2:           <Code2 size={22} />,
  Zap:             <Zap size={22} />,
  GitBranch:       <GitBranch size={22} />,
  Link2:           <Link2 size={22} />,
  GraduationCap:   <GraduationCap size={22} />,
  Megaphone:       <Megaphone size={22} />,
  Package:         <Package size={22} />,
  Award:           <Award size={22} />,
  MessageSquare:   <MessageSquare size={22} />,
  ClipboardCheck:  <ClipboardCheck size={22} />,
  Briefcase:       <Briefcase size={22} />,
  HelpCircle:      <HelpCircle size={22} />,
  BarChart2:       <BarChart2 size={22} />,
  Headphones:      <Headphones size={22} />,
  Mail:            <Mail size={22} />,
  Layers:          <Layers size={22} />,
  DollarSign:      <DollarSign size={22} />,
};

function categoryTags(cat: Category): string[] {
  if (cat.description) {
    const words = cat.description
      .replace(/[.,]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .slice(0, 3);
    if (words.length >= 2) return words;
  }
  return cat.name.split(/[\s&]+/).filter(Boolean).slice(0, 3);
}

export function CategoryGrid() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryApi.list()
      .then(r => setCats(r.data.flatMap(c => c.children?.length ? c.children : [c])))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 sm:mb-6">
        <SectionLabel className="mb-0">Browse by Category</SectionLabel>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors sm:mb-1"
        >
          All blogs
          <ArrowRight size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="skeleton h-36 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {cats.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/blog/${cat.slug}`}
              className="group glass rounded-2xl p-5 sm:p-6 hover:-translate-y-0.5 hover:border-[rgba(91,114,240,0.4)] focus-ring transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}35`, color: cat.color }}
                >
                  {cat.icon ? ICON_MAP[cat.icon] || <Zap size={20} /> : <Zap size={20} />}
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors leading-snug pt-1">
                  {cat.name}
                </h3>
              </div>

              {cat.description && (
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {cat.description}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {categoryTags(cat).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-600 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-dark-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryGrid;
