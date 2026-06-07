import {
  Code2, Layers, Trophy, ClipboardCheck, BarChart3, BookOpen, MessageSquare,
  type LucideIcon,
} from "lucide-react";

export interface PlatformFeature {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  emoji: string;
}

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: "apex-problems",
    title: "Solve Apex Problems",
    description: "Real Apex code, real test cases, real feedback. Deep-dive tutorials on triggers, handlers, batch classes, and more.",
    cta: "Start Solving",
    href: "/category/blog/salesforce-development",
    icon: Code2,
    emoji: "💻",
  },
  {
    id: "lwc-builder",
    title: "LWC Builder",
    description: "Build Lightning Web Components with guided tutorials. Templates, JS, @wire, SLDS — all covered in one place.",
    cta: "Open LWC Lab",
    href: "/category/blog/lightning-web-components-lwc",
    icon: Layers,
    emoji: "🌩️",
  },
  {
    id: "contests",
    title: "Join Live Contests",
    description: "Timed challenges and community events. Compete, learn, and find out where you actually stand among peers.",
    cta: "View Contests",
    href: "/gallery",
    icon: Trophy,
    emoji: "🏆",
  },
  {
    id: "quizzes",
    title: "Take Knowledge Quizzes",
    description: "Certification-style questions — not the easy kind. Get a score breakdown and see exactly what to fix.",
    cta: "Take a Quiz",
    href: "/category/blog/mock-tests-quizzes",
    icon: ClipboardCheck,
    emoji: "📝",
  },
  {
    id: "leaderboard",
    title: "Climb the Leaderboard",
    description: "Every article you read and quiz you pass earns XP. Bronze → Silver → Gold → Platinum → Diamond → Legend.",
    cta: "View Leaderboard",
    href: "/#leaderboard",
    icon: BarChart3,
    emoji: "📊",
  },
  {
    id: "docs",
    title: "Read Learning Docs",
    description: "Governors, triggers, SOQL, batch, async — all documented here so you don't have to hunt on Trailhead.",
    cta: "Open Docs",
    href: "/blog",
    icon: BookOpen,
    emoji: "📚",
  },
  {
    id: "feedback",
    title: "Give Feedback",
    description: "Something broken? Missing a topic? Tell us. This platform gets better because people say something.",
    cta: "Give Feedback",
    href: "/contact",
    icon: MessageSquare,
    emoji: "💬",
  },
];

export const LEADERBOARD_DATA = [
  { rank: 1, name: "Rahul Sharma", xp: 14250, tier: "Diamond" },
  { rank: 2, name: "Priya Nair", xp: 12800, tier: "Platinum" },
  { rank: 3, name: "Amit Patel", xp: 11640, tier: "Platinum" },
  { rank: 4, name: "Sneha Gupta", xp: 9820, tier: "Gold" },
  { rank: 5, name: "Vikram Singh", xp: 8750, tier: "Gold" },
  { rank: 6, name: "Ananya Reddy", xp: 7340, tier: "Silver" },
  { rank: 7, name: "Karan Mehta", xp: 6890, tier: "Silver" },
  { rank: 8, name: "Divya Iyer", xp: 5420, tier: "Bronze" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "SF Learners Hub took me from zero to confident in Apex development. The daily tutorials kept me sharp and the structured content made learning genuinely engaging!",
    name: "Rahul Sharma",
    role: "Wipro · Salesforce Developer",
    initial: "R",
  },
  {
    id: 2,
    quote: "The structured guides and certification prep materials are exactly what I needed to prepare for my Salesforce certification. Highly recommend to every dev.",
    name: "Priya Nair",
    role: "Infosys · Salesforce Developer",
    initial: "P",
  },
  {
    id: 3,
    quote: "Quizzes and tutorials that cover real-world Apex scenarios — this is the best free resource out there for Salesforce developers.",
    name: "Amit Patel",
    role: "TCS · Salesforce Developer",
    initial: "A",
  },
];

export const TIER_COLORS: Record<string, string> = {
  Diamond: "#22d3ee",
  Platinum: "#a78bfa",
  Gold: "#fbbf24",
  Silver: "#94a3b8",
  Bronze: "#d97706",
};
