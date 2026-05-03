"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const CAROUSEL_IMAGES = [
  {
    id: 1,
    src: "/asset/Screenshot_2026-05-02_222643.png",
    alt: "Salesforce Cloud Technology",
    title: "Salesforce Cloud Solutions",
  },
  {
    id: 2,
    src: "/asset/Screenshot_2026-05-02_222653.png",
    alt: "Professional Development",
    title: "Career Growth & Learning",
  },
  {
    id: 3,
    src: "/asset/Screenshot_2026-05-02_222702.png",
    alt: "Enterprise Solutions",
    title: "Enterprise Integration",
  },
  {
    id: 4,
    src: "/asset/Screenshot_2026-05-02_222713.png",
    alt: "Digital Transformation",
    title: "Digital Innovation",
  },
  {
    id: 5,
    src: "/asset/Screenshot_2026-05-02_232616.png",
    alt: "Team Collaboration",
    title: "Team Success",
  },
];

const AUTO_PLAY_DURATION = 4000; // 4 seconds

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
          return 0;
        }
        return prev + (100 / (AUTO_PLAY_DURATION / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) {
      setProgress(0);
    }
  }, [isAutoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    setIsAutoPlay(true);
    setProgress(0);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
    setIsAutoPlay(true);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlay(true);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div
        className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden group"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => {
          setIsAutoPlay(true);
          setProgress(0);
        }}
      >
        {/* Images */}
        <div 
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {CAROUSEL_IMAGES.map((image, index) => (
            <div
              key={image.id}
              className="w-full h-full flex-shrink-0 relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent" />
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base">
                  Explore Salesforce expertise and industry insights
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-violet-600 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {CAROUSEL_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70 w-2.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide counter */}
      <div className="mt-4 text-center text-slate-400 text-sm">
        <span className="text-white font-semibold">{current + 1}</span> / {CAROUSEL_IMAGES.length}
      </div>
    </div>
  );
}
