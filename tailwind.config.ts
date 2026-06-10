import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0B0B0F',
        darkGray: '#111827',
        accentPurple: '#8B5CF6',
        accentBlue: '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
        heading: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
