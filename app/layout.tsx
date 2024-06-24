// Libs
import type { Metadata } from "next"
// Styles
import "./globals.css"
import "swiper/css"
// Components
import { MobileNavbar, Navbar } from "@/components"
// Fonts
import { pixelated, robotoSerif } from "@/public/fonts/fonts"
// Images
import OpenGraphImage from "@/public/images/open-graph-image.png"

export const metadata: Metadata = {
  title: "DRSM",
  description:
    "Hi all! This is my personal porfolio. Here you'll find a bit more of information about me, my pets, my previous work experience, and what can I achieve in a few days project.",
  openGraph: {
    title: "DRSM's personal website",
    description:
      "Hi all! This is my personal porfolio. Here you'll find a bit more of information about me, my pets, my previous work experience, and what can I achieve in a few days project.",
    url: "https://drsm.vercel.app/#home",
    siteName: "DRSM",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OpenGraphImage.src,
        width: 1200,
        height: 630,
        alt: "DRSM Open Graph image",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" id="home">
      <body
        className={`${pixelated.variable} ${robotoSerif.variable} font-roboto`}
      >
        <main className="w-full min-h-screen mt-16">
          <Navbar />
          <MobileNavbar />
          {children}
        </main>
      </body>
    </html>
  )
}
