"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/platformFeatures";

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const t = TESTIMONIALS[current];

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section>
      <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white text-center mb-8 sm:mb-10">
        What our learners say about us
      </h2>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-12">
        <button
          onClick={prev}
          className="compact-btn absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all focus-ring"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center border border-[rgba(91,114,240,0.12)]">
          <div className="flex justify-center gap-0.5 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
            ))}
          </div>

          <blockquote className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-2">
            <span className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
              {t.initial}
            </span>
            <div>
              <p className="font-display font-semibold text-slate-900 dark:text-white">{t.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
            </div>
          </div>
        </div>

        <button
          onClick={next}
          className="compact-btn absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all focus-ring"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>

        <div className="flex justify-center gap-2 mt-5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`compact-btn rounded-full transition-all ${
                i === current ? "bg-brand-500 w-6 h-2" : "bg-slate-300 dark:bg-slate-600 w-2 h-2"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
