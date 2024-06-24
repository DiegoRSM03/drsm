import { Roboto, Press_Start_2P } from "next/font/google"

const pixelated = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixelated",
})

const robotoSerif = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
})

export { pixelated, robotoSerif }
