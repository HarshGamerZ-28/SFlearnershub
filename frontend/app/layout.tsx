// app/layout.tsx — Root layout with fonts, providers, nav
import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/lib/theme-provider";

export const metadata: Metadata = {
  title: { default: "SF Learners Hub — Master Salesforce, Conquer Your Goals", template: "%s | SF Learners Hub" },
  description: "Your premier Salesforce learning platform — blogs, tutorials, interview prep, certifications, and real-world projects.",
  keywords: ["Salesforce", "LWC", "Apex", "Admin", "DevOps", "Integration", "Certification"],
  openGraph: {
    siteName: "SF Learners Hub",
    url: "https://sflearnershub.com",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="noise bg-slate-50 text-slate-900 font-body antialiased dark:bg-dark-900 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
