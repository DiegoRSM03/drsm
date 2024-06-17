"use client"

// Libs
import { NextSeo } from "next-seo"
// Images
import OpenGraphImage from "@/public/images/original/open-graph-image.png"

export const Seo = () => {
  return (
    <NextSeo
      title="DRSM - Diego Rodrigo Sanchez Moreno personal website"
      description="DRSM Software Engineer personal website"
      openGraph={{
        title: "DRSM - Personal Website",
        description: "DRSM Software Engineer personal website",
        images: [{ url: OpenGraphImage.src }],
        siteName: "DRSM",
      }}
    />
  )
}
