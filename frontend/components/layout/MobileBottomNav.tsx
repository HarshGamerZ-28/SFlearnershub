"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Code2, BarChart3, Trophy, Brain, MessageSquare } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { href: "/blog", label: "Code", icon: Code2, match: (p: string) => p.startsWith("/blog") || p.startsWith("/category") },
  { href: "/#leaderboard", label: "Ranks", icon: BarChart3, match: () => false },
  { href: "/gallery", label: "Contest", icon: Trophy, match: (p: string) => p === "/gallery" },
  { href: "/category/blog/mock-tests-quizzes", label: "Quiz", icon: Brain, match: (p: string) => p.includes("mock-tests") },
  { href: "/contact", label: "Feedback", icon: MessageSquare, match: (p: string) => p === "/contact" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on admin and auth pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) return null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 dark:border-[rgba(91,114,240,0.15)] bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl safe-area-bottom"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-6 h-14">
        {NAV_ITEMS.map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`compact-btn flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
                active
                  ? "text-brand-500 dark:text-brand-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
