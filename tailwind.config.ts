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
        obsidian: {
          DEFAULT: "#0B0B0F",
          50: "#1A1A24",
          100: "#161620",
          200: "#12121A",
          300: "#0F0F16",
          400: "#0B0B0F",
          card: "#12121A",
          surface: "#181824",
          border: "#262638",
          muted: "#1E1E2D",
        },
        violet: {
          glow: "#8B5CF6",
          electric: "#7C3AED",
          hover: "#6D28D9",
          soft: "rgba(124, 58, 237, 0.12)",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.25) 0%, rgba(11, 11, 15, 0) 70%)",
        "card-glow": "radial-gradient(circle at top left, rgba(139, 92, 246, 0.15), transparent 60%)",
      },
      boxShadow: {
        violet: "0 0 25px -5px rgba(124, 58, 237, 0.3)",
        "violet-lg": "0 0 40px -5px rgba(124, 58, 237, 0.4)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
