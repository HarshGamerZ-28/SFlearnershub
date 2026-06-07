"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HOME_SLIDES } from "@/lib/homeSlides";

const AUTO_PLAY_DURATION = 5000;

interface Props {
  variant?: "default" | "hero";
}

export default function ImageCarousel({ variant = "default" }: Props) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const isHero = variant === "hero";

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HOME_SLIDES.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HOME_SLIDES.length) % HOME_SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
    setProgress(0);
  };

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((c) => (c + 1) % HOME_SLIDES.length);
          return 0;
        }
        return prev + 100 / (AUTO_PLAY_DURATION / 50);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsAutoPlay(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaX.current > 50) prev();
    else if (touchDeltaX.current < -50) next();
    setIsAutoPlay(true);
    setProgress(0);
  };

  const slide = HOME_SLIDES[current];
  const Icon = slide.icon;

  return (
    <div className={isHero ? "w-full" : "w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8"}>
      <div
        className={`relative w-full overflow-hidden ${
          isHero
            ? "rounded-none border-b border-slate-200/60 dark:border-[rgba(91,114,240,0.15)]"
            : "rounded-2xl sm:rounded-3xl border border-slate-200/60 dark:border-[rgba(91,114,240,0.15)] shadow-lg"
        }`}
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => {
          setIsAutoPlay(true);
          setProgress(0);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`relative bg-gradient-to-br ${slide.gradient} transition-all duration-700 ${
            isHero ? "min-h-[180px] sm:min-h-[240px] md:min-h-[280px]" : "min-h-[200px] sm:min-h-[260px] md:min-h-[320px]"
          }`}
        >
          <div
            className="absolute -top-16 -right-16 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-2xl opacity-60"
            style={{ background: slide.accent }}
          />
          <div className="absolute -bottom-20 -left-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-white/10 blur-xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />

          <div className={`relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 max-w-7xl mx-auto ${
            isHero ? "px-4 sm:px-6 py-7 sm:py-10 md:py-12" : "px-5 sm:px-10 py-8 sm:py-12 md:py-14"
          }`}>
            <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
              <Icon size={28} className="text-white sm:w-8 sm:h-8" strokeWidth={1.5} />
            </div>
            <div className="text-center sm:text-left flex-1 min-w-0">
              <p className="text-white/70 text-xs sm:text-sm font-medium uppercase tracking-widest mb-1.5 sm:mb-2">
                SF Learners Hub
              </p>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-2 sm:mb-3 leading-tight">
                {slide.title}
              </h3>
              <p className="text-white/85 text-sm sm:text-base md:text-lg max-w-xl mx-auto sm:mx-0">
                {slide.subtitle}
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10">
            <div
              className="h-full bg-white/80 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={prev}
          className="compact-btn flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-md items-center justify-center text-white transition-all focus-ring"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="compact-btn flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-md items-center justify-center text-white transition-all focus-ring"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className={`flex items-center justify-center gap-3 ${isHero ? "py-3 sm:py-4" : "mt-4 sm:mt-5"}`}>
        <div className="flex items-center gap-1.5 sm:gap-2" role="tablist" aria-label="Carousel slides">
          {HOME_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to slide ${index + 1}`}
              className={`compact-btn rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-brand-500 dark:bg-brand-400 w-6 sm:w-8 h-2"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 w-2 h-2"
              }`}
            />
          ))}
        </div>
        <span className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm tabular-nums">
          {current + 1}/{HOME_SLIDES.length}
        </span>
      </div>
    </div>
  );
}
