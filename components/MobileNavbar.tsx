"use client"

// Libs
import { useState } from "react"
import { Variants, motion } from "framer-motion"
// Components
import { AnimatedNavLinks, Button } from "@/components"
// Icons
import {
  AndroidIcon,
  BriefcaseIcon,
  CloseIcon,
  HomeIcon,
  MenuIcon,
} from "@/public/icons"
// Utils
import { WRAPPER_STYLES, WRAPPER_CHILD_STYLES } from "@/utils"
// Sections
import { FooterNavItem } from "@/sections"

const LOGO_TEXT = "DRSM"
const SIDEBAR_TITLE = "Navbar"
const CTA_LINK_TEXT = "Linkedin"
const CTA_LINK_URL = "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"
const NAV_ITEMS: FooterNavItem[] = [
  {
    title: "Home",
    href: "#home",
    icon: <HomeIcon />,
  },
  {
    title: "About",
    href: "#about",
    icon: <AndroidIcon />,
  },
  {
    title: "Experience",
    href: "#work-experience",
    icon: <BriefcaseIcon />,
  },
]

const ANDROID_ICON_ANIMATION: Variants = {
  hidden: {
    y: "150%",
  },
  visible: {
    y: 0,
  },
}

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuClick = () => {
    const html = document.querySelector("html")
    const body = document.querySelector("body")

    if (html && body) {
      html.style.overflow = !isOpen ? "hidden" : "auto"
      body.style.overflow = !isOpen ? "hidden" : "auto"
    }

    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav
        className={`${WRAPPER_STYLES} z-50 fixed top-0 left-0 h-16 bg-black flex lg:hidden`}
      >
        <div
          className={`${WRAPPER_CHILD_STYLES} flex items-center justify-between`}
        >
          {/* LOGO */}
          <div className="text-2xl text-white font-jacquard">{LOGO_TEXT}</div>

          {/* MENU */}
          <div onClick={handleMenuClick}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div
        className={`${WRAPPER_STYLES} mt-2px transition transform fixed z-40 top-0 left-0 w-full bg-black h-svh ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <motion.div
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          variants={ANDROID_ICON_ANIMATION}
          transition={{ duration: 0.8 }}
          className="absolute bottom-0 left-10"
        >
          <AndroidIcon
            width={150}
            height={105}
            color="rgba(255, 255, 255, 0.05)"
          />
        </motion.div>
        <div className={`${WRAPPER_CHILD_STYLES} flex flex-col items-center`}>
          <p className="mb-10 text-5xl font-jacquard">{SIDEBAR_TITLE}</p>
          <AnimatedNavLinks
            navItems={NAV_ITEMS}
            listClassName={`${WRAPPER_CHILD_STYLES} flex flex-col items-center gap-5 mx-0 mb-20`}
            itemClassName="flex gap-3 w-full"
            itemOnClick={handleMenuClick}
            animateOnce={false}
          />
          <Button href={CTA_LINK_URL} target="_blank" onClick={handleMenuClick}>
            {CTA_LINK_TEXT}
          </Button>
        </div>
      </div>
    </>
  )
}
