// Libs
import type { Metadata } from "next"
// Styles
import "./globals.css"
// Fonts
import { jacquard, robotoSerif } from "../public/fonts/fonts"
// Components
import { MobileNavbar, Navbar } from "@/components"

export const metadata: Metadata = {
  title: "DRSM",
  description: "Diego Rodrigo Sanchez Moreno personal website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" id="home">
      <body
        className={`${jacquard.variable} ${robotoSerif.variable} font-roboto`}
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
