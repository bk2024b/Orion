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
        ink: "#050505",
        surface: {
          DEFAULT: "#0b0b0b",
          2: "#111111",
          card: "#080808",
        },
        line: "#202020",
        muted: {
          DEFAULT: "#929292",
          2: "#666666",
        },
        lime: {
          DEFAULT: "#c8ff45",
          dark: "#9bc92f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        orion: "18px",
      },
    },
  },
  plugins: [],
};

export default config;

