// app/layout.tsx — Root layout with fonts, providers, nav
import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
      <body className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} noise bg-dark-900 text-slate-100 font-body antialiased dark:bg-dark-900 dark:text-slate-100 light:bg-slate-50 light:text-slate-900 transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
