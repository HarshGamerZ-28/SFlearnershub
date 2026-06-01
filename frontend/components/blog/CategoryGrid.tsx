"use client";
// components/blog/CategoryGrid.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Settings, Code2, Zap, GitBranch, Link2, GraduationCap,
  Megaphone, Package, Award, MessageSquare, ClipboardCheck,
  Briefcase, HelpCircle, BarChart2, Headphones, Mail, Layers, DollarSign
} from "lucide-react";
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold">Browse by Category</h2>
        <Link href="/blog" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
          All blogs →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
          {cats.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/blog/${cat.slug}`}
              className="group glass rounded-2xl p-4 flex flex-col items-center text-center hover:-translate-y-1 hover:border-[rgba(91,114,240,0.4)] focus-ring transition-all duration-300"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110"
                style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}35`, color: cat.color }}
              >
                {cat.icon ? ICON_MAP[cat.icon] || <Zap size={20} /> : <Zap size={20} />}
              </div>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryGrid;
