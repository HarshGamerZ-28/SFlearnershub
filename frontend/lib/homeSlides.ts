import { Cloud, Code2, Users, Zap, Award, type LucideIcon } from "lucide-react";

export interface HomeSlide {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  accent: string;
  href: string;
  tags: string[];
}

export const HOME_SLIDES: HomeSlide[] = [
  {
    id: 1,
    title: "Salesforce Cloud Solutions",
    subtitle: "Master Sales, Service & Marketing Cloud platforms",
    icon: Cloud,
    gradient: "from-[#0176d3] via-[#1b96ff] to-[#5b72f0]",
    accent: "rgba(1,118,211,0.25)",
    href: "/category/blog/salesforce-administration",
    tags: ["Admin", "Cloud", "Setup"],
  },
  {
    id: 2,
    title: "Apex & LWC Development",
    subtitle: "Build scalable apps with modern Salesforce tools",
    icon: Code2,
    gradient: "from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa]",
    accent: "rgba(124,58,237,0.25)",
    href: "/category/blog/salesforce-development",
    tags: ["Apex", "LWC", "Triggers"],
  },
  {
    id: 3,
    title: "Enterprise Integration",
    subtitle: "Connect systems with REST, SOAP & Platform Events",
    icon: Zap,
    gradient: "from-[#0891b2] via-[#06b6d4] to-[#22d3ee]",
    accent: "rgba(8,145,178,0.25)",
    href: "/category/blog/salesforce-integration",
    tags: ["REST", "API", "Events"],
  },
  {
    id: 4,
    title: "Certification Prep",
    subtitle: "Structured paths to Admin, Developer & Architect certs",
    icon: Award,
    gradient: "from-[#059669] via-[#10b981] to-[#34d399]",
    accent: "rgba(5,150,105,0.25)",
    href: "/category/blog/certification-preparation-materials",
    tags: ["Certs", "Exams", "Study"],
  },
  {
    id: 5,
    title: "Community Learning",
    subtitle: "Join 50K+ learners sharing Salesforce expertise",
    icon: Users,
    gradient: "from-[#d97706] via-[#f59e0b] to-[#fbbf24]",
    accent: "rgba(217,119,6,0.25)",
    href: "/blog",
    tags: ["Blogs", "Guides", "Tips"],
  },
];
