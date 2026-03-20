import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        foreground: "#e4e4e7",
        card: "#111118",
        "card-foreground": "#e4e4e7",
        border: "#1e1e2e",
        sidebar: "#0d0d14",
        muted: "#18181f",
        "muted-foreground": "#71717a",
        accent: "#6366f1",
        "accent-foreground": "#e4e4e7",
        destructive: "#ef4444",
        "destructive-foreground": "#fafafa",
        ring: "#6366f1",
        input: "#1e1e2e",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)" },
          "50%": { boxShadow: "0 0 8px 2px rgba(99, 102, 241, 0.3)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
