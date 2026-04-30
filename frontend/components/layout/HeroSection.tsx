"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, BookOpen, Users, Star } from "lucide-react";

const STATS = [
  { value: "842+", label: "Blog Posts", icon: <BookOpen size={16} /> },
  { value: "18",   label: "Categories", icon: <Zap size={16} /> },
  { value: "50K+", label: "Learners",   icon: <Users size={16} /> },
  { value: "4.9",  label: "Rating",     icon: <Star size={16} /> },
];

const TAGS = [
  "Apex Triggers", "SOQL", "LWC", "REST API", "OAuth 2.0",
  "Change Sets", "Platform Events", "Flow Builder", "SOSL",
  "Named Credentials", "Connected Apps", "Bulk API", "Metadata API",
];

export default function HeroSection() {
  const [tagIndex, setTagIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTagIndex((i) => (i + 1) % TAGS.length);
    }, 2000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 pb-16 px-6">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600/10 border border-brand-500/25 text-brand-400 text-sm font-mono mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Rebuilt & Enhanced — All WordPress content preserved
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 animate-fade-up">
          Master{" "}
          <span className="gradient-text">Salesforce</span>,
          <br />
          Conquer Your Goals
        </h1>

        {/* Animated subtag */}
        <div className="flex items-center justify-center gap-2 mb-4 text-slate-400 text-lg">
          <span>Learn</span>
          <div className="relative h-8 overflow-hidden">
            <span
              key={tagIndex}
              className="absolute inset-0 flex items-center justify-center text-brand-400 font-semibold animate-fade-up whitespace-nowrap"
            >
              {TAGS[tagIndex]}
            </span>
          </div>
          <span>and more</span>
        </div>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 animate-fade-up stagger-2">
          Your ultimate Salesforce learning platform — from beginner admin guides to advanced integration patterns, all in one beautifully redesigned hub.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-up stagger-3">
          <Link
            href="/blog"
            className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white"
          >
            Explore Blogs
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/category/blog/certification-preparation-materials"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium text-slate-300 border border-[rgba(91,114,240,0.3)] hover:border-[rgba(91,114,240,0.6)] hover:bg-[rgba(91,114,240,0.07)] transition-all"
          >
            Get Certified
            <Star size={16} />
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-up stagger-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center">
              <div className="flex justify-center text-brand-400 mb-2">{s.icon}</div>
              <div className="font-display font-bold text-2xl gradient-text">{s.value}</div>
              <div className="text-slate-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
