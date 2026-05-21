import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        "fb-blue": "#1877F2",
        "fb-blue-dark": "#166FE5",
        "fb-bg": "#F0F2F5",
        "fb-text": "#050505",
        "fb-secondary": "#65676B",
        "fb-border": "#CED0D4",
        "fb-hover": "#F2F2F2",
      },
    },
  },
  plugins: [],
};
export default config;
