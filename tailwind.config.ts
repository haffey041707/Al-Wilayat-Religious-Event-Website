import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Arial",
          "sans-serif"
        ],
        arabic: [
          "Noto Naskh Arabic",
          "Amiri",
          "Scheherazade New",
          "serif"
        ]
      },
      boxShadow: {
        glow: "0 0 44px color-mix(in srgb, var(--theme-glow) 45%, transparent)"
      }
    }
  },
  plugins: []
};

export default config;
