import { BookOpen, Zap, Users, Star } from "lucide-react";

const STATS = [
  { value: "842+", label: "Blog Posts", icon: BookOpen },
  { value: "18",   label: "Categories", icon: Zap },
  { value: "50K+", label: "Learners",   icon: Users },
  { value: "4.9",  label: "Rating",     icon: Star },
];

export default function HomeStats() {
  return (
    <section className="border-y border-slate-200/80 dark:border-[rgba(91,114,240,0.12)] bg-slate-100/50 dark:bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="glass rounded-xl sm:rounded-2xl px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-center sm:text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 dark:text-brand-400 shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <div className="font-display font-bold text-xl sm:text-2xl gradient-text leading-none">{value}</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
