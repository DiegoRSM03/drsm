"use client"

// Libs
import { ReactNode, useEffect, useState } from "react"
import { Variants, motion } from "framer-motion"
// Utils
import { FADE_UP, SLIDE_FROM_RIGHT, SLIDE_FROM_LEFT } from "@/utils"

type Type = "fadeUp" | "slideFromRight" | "slideFromLeft"

interface Props {
  children: ReactNode
  as?: keyof HTMLElementTagNameMap
  type?: Type
  key?: string
  delay?: number
  duration?: number
  staggerChildren?: number
  className?: string
}

const ANIMATIONS: { [a in Type]: Variants } = {
  fadeUp: FADE_UP,
  slideFromRight: SLIDE_FROM_RIGHT,
  slideFromLeft: SLIDE_FROM_LEFT,
}

export const AnimateOnScroll = ({
  children,
  as = "div",
  type = "fadeUp",
  key = "",
  delay = 0,
  duration = 0.2,
  staggerChildren = 0,
  className = "",
}: Props) => {
  const [isDesktop, setIsDesktop] = useState(false)
  const animation = ANIMATIONS[type]
  const MotionComponent = motion(as)

  useEffect(() => {
    const isDesktopViewport = window.innerWidth >= 1440
    console.log({ isDesktopViewport })
    setIsDesktop(isDesktopViewport)
  }, [])

  return (
    <MotionComponent
      key={key}
      initial="hidden"
      whileInView="visible"
      variants={animation}
      transition={{ delay, duration, staggerChildren }}
      viewport={{ once: true, amount: isDesktop ? 0.4 : 0 }}
      // @ts-ignore
      className={className}
    >
      {children}
    </MotionComponent>
  )
}
