// Libs
import type { Metadata } from "next"
// Styles
import "./globals.css";
// Fonts
import { jacquard, robotoSerif } from "../public/fonts/fonts"

export const metadata: Metadata = {
  title: "DRSM",
  description: "Diego Rodrigo Sanchez Moreno personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jacquard.variable} ${robotoSerif.variable} font-roboto`}>{children}</body>
    </html>
  );
}
