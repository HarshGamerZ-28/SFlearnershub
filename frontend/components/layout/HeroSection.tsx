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
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();

  const autoHideControls = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setControlsVisible(true);
    hideTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTagIndex((i) => (i + 1) % TAGS.length);
    }, 2000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    autoHideControls();
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
      autoHideControls();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) videoRef.current.currentTime += seconds;
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    const fsEl = el as HTMLElement & { webkitRequestFullscreen?: () => void };
    if (fsEl.requestFullscreen) fsEl.requestFullscreen();
    else if (fsEl.webkitRequestFullscreen) fsEl.webkitRequestFullscreen();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const val = parseFloat(e.target.value);
      videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
      setProgress(val);
    }
  };

  const showControls = () => autoHideControls();

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-16 md:pt-20 pb-8 sm:pb-14 md:pb-16 px-4 sm:px-6">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="hidden sm:block absolute top-20 left-1/4 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="hidden sm:block absolute bottom-10 right-1/4 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-[1.05] mb-3 sm:mb-4 md:mb-6 animate-fade-up">
          Master{" "}
          <span className="gradient-text">Salesforce</span>,
          <br className="hidden sm:block" />
          Conquer Your Goals
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 sm:mb-4 text-slate-400 text-sm sm:text-base md:text-lg">
          <span>Learn</span>
          <div className="relative w-min overflow-hidden">
            <span key={tagIndex} className="inline-flex text-brand-400 font-semibold animate-fade-up whitespace-nowrap">
              {TAGS[tagIndex]}
            </span>
          </div>
          <span>and more</span>
        </div>

        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-9 md:mb-10 animate-fade-up stagger-2">
          Your ultimate Salesforce learning platform — from beginner admin guides to advanced integration patterns, all in one beautifully redesigned hub.
        </p>

        {/* Home Video */}
        <div
          ref={containerRef}
          className="max-w-4xl mx-auto mb-8 sm:mb-16 rounded-xl sm:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(91,114,240,0.3)] animate-fade-up stagger-3"
          onMouseMove={showControls}
          onTouchStart={showControls}
        >
          <div className="group relative bg-black">
            <video
              ref={videoRef}
              src="https://sflearnershub.com/wp-content/uploads/2026/01/m3raee3zxxrmr0cvga08nyg05m_result_.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-auto object-cover aspect-video"
            />

            {/* Center play overlay when paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
                aria-label="Play video"
              >
                <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                  <Play size={28} fill="black" className="text-black ml-1" />
                </span>
              </button>
            )}

            {/* Video Controls */}
            <div
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 pb-3 pt-8 sm:px-5 sm:pb-4 sm:pt-10 transition-opacity duration-300 ${
                controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={progress || 0}
                onChange={(e) => { e.stopPropagation(); handleSeek(e); }}
                className="compact-btn w-full h-1 sm:h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-brand-400 mb-2 sm:mb-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:sm:w-3.5 [&::-webkit-slider-thumb]:sm:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
              />

              <div className="flex items-center justify-between gap-2">
                {/* Primary controls — always visible */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    className="compact-btn flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-black hover:bg-white/90 transition-all active:scale-95"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                  </button>

                  {/* Secondary controls — hidden on very small screens */}
                  <button
                    onClick={(e) => { e.stopPropagation(); skip(-10); }}
                    className="compact-btn hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all active:scale-95"
                    aria-label="Rewind 10 seconds"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); skip(10); }}
                    className="compact-btn hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all active:scale-95"
                    aria-label="Forward 10 seconds"
                  >
                    <RotateCw size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    className="compact-btn flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all active:scale-95"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                    className="compact-btn hidden xs:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all active:scale-95"
                    aria-label="Fullscreen"
                  >
                    <Maximize size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-14 md:mb-16 animate-fade-up stagger-3">
          <Link
            href="/blog"
            className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl text-base font-semibold text-white active:scale-95"
          >
            Explore Blogs
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/category/blog/certification-preparation-materials"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl text-base font-medium text-slate-300 border border-[rgba(91,114,240,0.3)] hover:border-[rgba(91,114,240,0.6)] hover:bg-[rgba(91,114,240,0.07)] transition-all active:scale-95"
          >
            Get Certified
            <Star size={18} />
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-2xl mx-auto animate-fade-up stagger-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-xl p-3 sm:p-4 text-center">
              <div className="flex justify-center text-brand-400 mb-1 sm:mb-2">{s.icon}</div>
              <div className="font-display font-bold text-lg sm:text-2xl gradient-text">{s.value}</div>
              <div className="text-slate-500 text-xs sm:text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
