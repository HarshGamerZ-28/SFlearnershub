/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SF Learners Hub design tokens
        brand: {
          50:  "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fd",
          300: "#a4bbfb",
          400: "#7b96f7",
          500: "#5b72f0",
          600: "#4251e4",
          700: "#3540c9",
          800: "#2d37a3",
          900: "#2a3380",
          950: "#1a1f52",
        },
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        dark: {
          900: "#080b14",
          800: "#0d1117",
          700: "#111827",
          600: "#1a2235",
          500: "#1e2a40",
          400: "#253047",
          300: "#2d3a52",
        },
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "hero-mesh": "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(91,114,240,0.2), transparent)",
        "card-glow":  "linear-gradient(135deg, rgba(91,114,240,0.1) 0%, rgba(139,92,246,0.05) 100%)",
        "stripe":     "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(91,114,240,0.03) 10px, rgba(91,114,240,0.03) 20px)",
      },
      animation: {
        "fade-up":      "fadeUp 0.6s ease forwards",
        "fade-in":      "fadeIn 0.5s ease forwards",
        "slide-right":  "slideRight 0.5s ease forwards",
        "glow-pulse":   "glowPulse 3s ease-in-out infinite",
        "float":        "float 6s ease-in-out infinite",
        "shimmer":      "shimmer 1.5s linear infinite",
        "spin-slow":    "spin 8s linear infinite",
        "border-flow":  "borderFlow 4s linear infinite",
      },
      keyframes: {
        fadeUp:    { "0%": { opacity:0, transform:"translateY(24px)" }, "100%": { opacity:1, transform:"translateY(0)" } },
        fadeIn:    { "0%": { opacity:0 }, "100%": { opacity:1 } },
        slideRight:{ "0%": { opacity:0, transform:"translateX(-24px)" }, "100%": { opacity:1, transform:"translateX(0)" } },
        glowPulse: { "0%,100%": { boxShadow:"0 0 20px rgba(91,114,240,0.3)" }, "50%": { boxShadow:"0 0 40px rgba(139,92,246,0.5)" } },
        float:     { "0%,100%": { transform:"translateY(0px)" }, "50%": { transform:"translateY(-12px)" } },
        shimmer:   { "0%": { backgroundPosition:"-200% 0" }, "100%": { backgroundPosition:"200% 0" } },
        borderFlow:{ "0%,100%": { backgroundPosition:"0% 50%" }, "50%": { backgroundPosition:"100% 50%" } },
      },
      boxShadow: {
        "glow-brand": "0 0 30px rgba(91,114,240,0.35)",
        "glow-violet": "0 0 30px rgba(139,92,246,0.35)",
        "card":   "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover": "0 8px 40px rgba(91,114,240,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      typography: (theme) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.slate[300]"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-code": theme("colors.cyan[400]"),
            "--tw-prose-links": theme("colors.brand[400]"),
            "--tw-prose-pre-bg": theme("colors.dark[700]"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
