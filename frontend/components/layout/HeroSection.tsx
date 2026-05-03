"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, BookOpen, Users, Star, Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw, Maximize } from "lucide-react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTagIndex((i) => (i + 1) % TAGS.length);
    }, 2000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-16 px-6">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">


        {/* Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 animate-fade-up">
          Master{" "}
          <span className="gradient-text">Salesforce</span>,
          <br />
          Conquer Your Goals
        </h1>

        {/* Animated subtag */}
        <div className="flex items-center justify-center gap-1 mb-4 text-slate-400 text-lg">
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

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 animate-fade-up stagger-2">
          Your ultimate Salesforce learning platform — from beginner admin guides to advanced integration patterns, all in one beautifully redesigned hub.
        </p>

        {/* Home Video with Controls */}
        <div className="group relative max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(91,114,240,0.3)] border border-white/10 animate-fade-up stagger-3">
          <video 
            ref={videoRef}
            src="https://sflearnershub.com/wp-content/uploads/2026/01/m3raee3zxxrmr0cvga08nyg05m_result_.mp4" 
            autoPlay 
            loop 
            muted={isMuted}
            playsInline 
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-auto object-cover"
          />
          
          {/* Custom Controls Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <div className="flex flex-col gap-4">
              {/* Progress Line */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-400"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="p-2 rounded-full hover:bg-white/20 text-white transition-colors">
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={() => skip(-10)} className="p-2 rounded-full hover:bg-white/20 text-white transition-colors">
                      <RotateCcw size={20} />
                    </button>
                    <button onClick={() => skip(10)} className="p-2 rounded-full hover:bg-white/20 text-white transition-colors">
                      <RotateCw size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={toggleMute} className="p-2 rounded-full hover:bg-white/20 text-white transition-colors">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <button onClick={toggleFullscreen} className="p-2 rounded-full hover:bg-white/20 text-white transition-colors">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
