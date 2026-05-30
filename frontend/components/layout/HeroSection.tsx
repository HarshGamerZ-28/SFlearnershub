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
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Floating orbs - hide on mobile for better performance */}
      <div className="hidden sm:block absolute top-20 left-1/4 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="hidden sm:block absolute bottom-10 right-1/4 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">


        {/* Headline */}
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight sm:leading-[1.05] mb-4 sm:mb-6 animate-fade-up">
          Master{" "}
          <span className="gradient-text">Salesforce</span>,
          <br />
          Conquer Your Goals
        </h1>

        {/* Animated subtag */}
        <div className="flex flex-wrap items-center justify-center gap-1 mb-3 sm:mb-4 text-slate-400 text-sm sm:text-lg">
          <span>Learn</span>
          <div className="relative w-min overflow-hidden">
            <span
              key={tagIndex}
              className="inline-flex text-brand-400 font-semibold animate-fade-up whitespace-nowrap"
            >
              {TAGS[tagIndex]}
            </span>
          </div>
          <span>and more</span>
        </div>

        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-up stagger-2">
          Your ultimate Salesforce learning platform — from beginner admin guides to advanced integration patterns, all in one beautifully redesigned hub.
        </p>

        {/* Home Video */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(91,114,240,0.3)] border border-white/10 animate-fade-up stagger-3">
          <video 
            src="https://sflearnershub.com/wp-content/uploads/2026/01/m3raee3zxxrmr0cvga08nyg05m_result_.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 animate-fade-up stagger-3">
          <Link
            href="/blog"
            className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold text-white"
          >
            Explore Blogs
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/category/blog/certification-preparation-materials"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium text-slate-300 border border-[rgba(91,114,240,0.3)] hover:border-[rgba(91,114,240,0.6)] hover:bg-[rgba(91,114,240,0.07)] transition-all"
          >
            Get Certified
            <Star size={16} />
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto animate-fade-up stagger-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <div className="flex justify-center text-brand-400 mb-1 sm:mb-2">{s.icon}</div>
              <div className="font-display font-bold text-lg sm:text-2xl gradient-text">{s.value}</div>
              <div className="text-slate-500 text-xs mt-0.5 sm:mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
