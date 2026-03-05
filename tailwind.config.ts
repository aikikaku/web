import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#2a363b',
        'cream': '#fcfff7',
        'accent-blue': '#3cb1ff',
        'light-blue': '#d9e9f4',
        'light-green': '#eff6ec',
      },
      fontFamily: {
        mincho: ['var(--font-shippori-mincho)', 'serif'],
        gothic: ['var(--font-zen-kaku)', 'sans-serif'],
      },
      maxWidth: {
        'container': '1280px',
      },
      spacing: {
        'section': '80px',
        'page': '64px',
      },
      screens: {
        'tablet': '993px',
        'desktop': '1440px',
        'ultrawide': '1920px',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
