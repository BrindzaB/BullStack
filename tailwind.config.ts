import type { Config } from "tailwindcss";

  const config: Config = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",

          // Warm parchment scale — replaces raw stone-* throughout the app
          surface: {
            50:  "#faf9f7",
            100: "#f5f3ef",
            200: "#eceae3",  // ← this becomes the global bg
            300: "#dedad1",
            400: "#c5bfb3",
            500: "#9e9890",
            600: "#79736b",
            700: "#5a5550",
            800: "#3d3a36",
            900: "#1f1d1a",
          },

          // Amber brand — only on watchlist star (active) + auth gradient
          brand: {
            50:  "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b",
            600: "#d97706",
            700: "#b45309",
            800: "#92400e",
            900: "#78350f",
          },

          // Semantic directional colors — matched weight so they look balanced
          up: {
            DEFAULT: "#15803d",  // text-up  → green-700 text
            bg:      "#dcfce7",  // bg-up-bg → light green badge background
          },
          down: {
            DEFAULT: "#b91c1c",  // text-down  → red-700 text
            bg:      "#fee2e2",  // bg-down-bg → light red badge background
          },
        },

        fontFamily: {
          mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        },

        fontSize: {
          // Display sizes with tight tracking for headings
          "display-lg": ["2.25rem",  { lineHeight: "2.5rem",   letterSpacing: "-0.03em",  fontWeight: "700" }],
          "display-md": ["1.875rem", { lineHeight: "2.25rem",  letterSpacing: "-0.025em", fontWeight: "700" }],
          "display-sm": ["1.5rem",   { lineHeight: "2rem",     letterSpacing: "-0.02em",  fontWeight: "600" }],
          // Uppercase section label
          "label-xs":   ["0.6875rem", { lineHeight: "1rem",   letterSpacing: "0.07em",   fontWeight: "500" }],
        },

        boxShadow: {
          card:          "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
          "card-hover":  "0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.05)",
          "card-raised": "0 8px 24px 0 rgba(0,0,0,0.10), 0 4px 8px -2px rgba(0,0,0,0.06)",
          dropdown:      "0 4px 16px 0 rgba(0,0,0,0.10), 0 2px 6px -1px rgba(0,0,0,0.08)",
          topbar:        "0 1px 0 0 rgba(0,0,0,0.06)",
          focus:         "0 0 0 3px rgba(180,83,9,0.20)",
        },

        backgroundImage: {
          // Subtle warm glow on auth page — never overpowering
          "auth-pattern":
            "radial-gradient(ellipse at 65% 0%, rgba(251,191,36,0.14) 0%, transparent 55%), " +
            "radial-gradient(ellipse at 0% 100%, rgba(251,191,36,0.07) 0%, transparent 45%)",
          // Slight translucency gradient for the sticky topbar
          "topbar-gradient":
            "linear-gradient(to bottom, rgba(255,255,255,0.98), rgba(255,255,255,0.94))",
        },

        keyframes: {
          "fade-in": {
            "0%":   { opacity: "0" },
            "100%": { opacity: "1" },
          },
          "slide-down": {
            "0%":   { opacity: "0", transform: "translateY(-6px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          "pulse-dot": {
            "0%, 100%": { opacity: "1" },
            "50%":      { opacity: "0.35" },
          },
          shimmer: {
            "0%":   { backgroundPosition: "-200% 0" },
            "100%": { backgroundPosition:  "200% 0" },
          },
        },

        animation: {
          "fade-in":    "fade-in 0.15s ease-out",
          "slide-down": "slide-down 0.18s ease-out",
          "pulse-dot":  "pulse-dot 1.5s ease-in-out infinite",
          shimmer:      "shimmer 1.8s linear infinite",
        },
      },
    },
    plugins: [],
  };

export default config;