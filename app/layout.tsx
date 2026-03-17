import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/contexts";
import { LenisProvider } from "@/components/custom/LenisProvider";
import { CustomCursor } from "@/components/custom/CustomCursor";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { ToastProvider } from "@/components/common/Toast";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diego Sanchez | Senior Frontend Engineer",
  description:
    "Portfolio of Diego Sanchez, a Senior Frontend Engineer specializing in React, Next.js, and creative web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ToastProvider>
            <LenisProvider>
              <LoadingScreen />
              <CustomCursor />
              {children}
            </LenisProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
