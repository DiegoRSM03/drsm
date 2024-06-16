import localFont from "next/font/local"
import { Roboto_Serif } from "next/font/google"

const jacquard = localFont({
  src: "./Jacquard12-Regular.ttf",
  display: "swap",
  variable: "--font-jacquard",
})

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
})

export { jacquard, robotoSerif }
