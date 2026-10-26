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
        drmz: {
          purple: "#753CC2",
          "purple-hover": "#6735A8",
          cream: "#EFF0D8",
          "cream-hover": "#F3F5CD",
          navy: "#111D35",
          "navy-hover": "#000000",
          blue: "#4E84F1",
          "body-underlay": "#0A0A0F",
          "gradient-start": "#0A0A1A",
          footer: "#0D1934",
          "footer-heading": "#A78BFA",
          "launcher-border": "#6D28D9",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        lobster: ["Lobster", "sans-serif"],
      },
      borderRadius: {
        portrait: "20px",
      },
      boxShadow: {
        drmz: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      dropShadow: {
        drmz: "0 4px 3px rgb(0 0 0 / 0.07)",
      },
    },
  },
  plugins: [],
};
export default config;
