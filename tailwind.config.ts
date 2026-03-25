import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },

      fontSize: {
        "display-md": ["1.875rem", { lineHeight: "2.25rem",  letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-sm": ["1.5rem",   { lineHeight: "2rem",     letterSpacing: "-0.02em",  fontWeight: "600" }],
      },

      keyframes: {
        "slide-down": {
          "0%":   { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        "slide-down": "slide-down 0.18s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
