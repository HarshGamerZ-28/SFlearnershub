import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import { PLATFORM_FEATURES } from "@/lib/platformFeatures";

export default function PlatformFeatures() {
  return (
    <div>
      <SectionLabel>Features</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {PLATFORM_FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.id}
              href={feature.href}
              className="group glass rounded-2xl p-5 sm:p-6 flex flex-col hover:-translate-y-0.5 hover:border-[rgba(91,114,240,0.4)] focus-ring transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl leading-none shrink-0" aria-hidden="true">{feature.emoji}</span>
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 dark:text-brand-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                {feature.description}
              </p>

              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 dark:text-brand-400">
                {feature.cta}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
