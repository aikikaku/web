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
      // デザインシステムのタイポグラフィスケール（Figma Typography パネル準拠、H1〜H6のサイズ）。
      // HTMLの見出しレベル(h1-h6タグ)とは独立したサイズトークン。同じ<h2>でもセクションにより
      // このスケールの異なるサイズが使われるため、タグ名ではなくサイズで命名。
      // 全て letter-spacing 4%（Figma実測で全サイズ共通。globals.css の h1-h6 タグにも
      // 既に letter-spacing:0.04em が一律適用済みで、この値と完全に一致する）。
      fontSize: {
        'heading-56': ['3.5rem', { lineHeight: '1.5', letterSpacing: '0.04em' }],
        'heading-48': ['3rem', { lineHeight: '1.5', letterSpacing: '0.04em' }],
        'heading-32': ['2rem', { lineHeight: '1.5', letterSpacing: '0.04em' }],
        'heading-24': ['1.5rem', { lineHeight: '1.6', letterSpacing: '0.04em' }],
        'heading-18': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.04em' }],
        'heading-16': ['1rem', { lineHeight: '1.6', letterSpacing: '0.04em' }],
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
