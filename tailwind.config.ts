import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      wrapper: "700px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
    },
    colors: {
      black: "#111111",
      black2: "#1C1C1C",
      black3: "#262626",
      white: "#FFFFFF",
      gray: "#BFBFBF",
      gray2: "#4A4A4A",
      gray3: "#3D3D3D",
      primary: "#CBC300",
      secondary: "#A59F00",
      tertiary: "#8D8800",
    },
    fontFamily: {
      roboto: ["var(--font-roboto-serif)", "serif"],
      jacquard: ["var(--font-jacquard)", "serif"],
    },
    extend: {
      spacing: {
        "2px": "2px",
        "3px": "3px",
        "4px": "4px",
        "5px": "5px",
      },
    },
  },
  plugins: [],
}

export default config
