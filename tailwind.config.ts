import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      black1: '#111111',
      black2: '#1C1C1C',
      white: '#FFFFFF',
      gray: '#BFBFBF',
      primary: '#CFC700',
      secondary: '#A59F00',
    },
    fontFamily: {
      roboto: ['var(--font-roboto-serif)', 'serif'],
      jacquard: ['var(--font-jacquard)', 'serif'],
    },
  },
  plugins: [],
};
export default config;
