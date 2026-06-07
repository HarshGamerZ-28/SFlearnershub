import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import { HOME_SLIDES } from "@/lib/homeSlides";

export default function PlatformFeatures() {
  return (
    <div>
      <SectionLabel>Features</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {HOME_SLIDES.map((slide) => {
          const Icon = slide.icon;
          return (
            <Link
              key={slide.id}
              href={slide.href}
              className="group glass rounded-2xl p-5 sm:p-6 flex flex-col hover:-translate-y-0.5 hover:border-[rgba(91,114,240,0.4)] focus-ring transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 dark:text-brand-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-1.5 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                    {slide.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {slide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-600 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-dark-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 dark:text-brand-400 mt-auto">
                Explore
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
