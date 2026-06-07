"use client";
import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/layout/SectionLabel";
import { LEADERBOARD_DATA, TIER_COLORS } from "@/lib/platformFeatures";

export default function LeaderboardSection() {
  return (
    <section id="leaderboard">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <SectionLabel className="mb-2">Leaderboard</SectionLabel>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy size={22} className="text-brand-500 dark:text-brand-400" />
            Global Leaderboard
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors sm:mb-1"
        >
          View full leaderboard
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-[rgba(91,114,240,0.12)]">
        {/* Table header */}
        <div className="grid grid-cols-[48px_1fr_80px] sm:grid-cols-[60px_1fr_100px_100px] gap-2 px-4 sm:px-6 py-3 bg-slate-100/80 dark:bg-dark-700/50 border-b border-slate-200 dark:border-[rgba(91,114,240,0.1)] text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <span>Rank</span>
          <span>Developer</span>
          <span className="hidden sm:block">Tier</span>
          <span className="text-right">XP</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-200/80 dark:divide-[rgba(91,114,240,0.08)]">
          {LEADERBOARD_DATA.map((entry) => (
            <div
              key={entry.rank}
              className="grid grid-cols-[48px_1fr_80px] sm:grid-cols-[60px_1fr_100px_100px] gap-2 px-4 sm:px-6 py-3.5 sm:py-4 items-center hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
            >
              <span className={`font-display font-bold text-sm sm:text-base ${
                entry.rank <= 3 ? "gradient-text" : "text-slate-500 dark:text-slate-400"
              }`}>
                #{entry.rank}
              </span>
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-full bg-brand-500/15 border border-brand-500/25 flex items-center justify-center text-xs font-bold text-brand-500 dark:text-brand-400 shrink-0">
                  {entry.name.charAt(0)}
                </span>
                <span className="font-medium text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  {entry.name}
                </span>
              </div>
              <span
                className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
                style={{
                  color: TIER_COLORS[entry.tier],
                  background: `${TIER_COLORS[entry.tier]}18`,
                  border: `1px solid ${TIER_COLORS[entry.tier]}35`,
                }}
              >
                {entry.tier}
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 text-right tabular-nums">
                {entry.xp.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
