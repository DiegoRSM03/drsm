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
import { Dictionary } from "@/dictionaries/types"

const SIDEBAR_TITLE = "Navigate"

const NAV_ITEMS_ICONS = {
  home: <HomeIcon />,
  about: <AndroidIcon />,
  experience: <BriefcaseIcon />,
}

const ANDROID_ICON_ANIMATION: Variants = {
  hidden: {
    y: "150%",
  },
  visible: {
    y: 0,
  },
}

const LINKEDIN_URL = "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"
const CV_URL =
  "https://drive.google.com/file/d/1vX9XwE8roAbu_dKkjEBUaoQCdQ1v0ox-/view?usp=sharing"
const MAIL_TO_URL = "mailto:diegorsm03@gmail.com"

interface MobileNavbarProps {
  dictionary: Dictionary
}

export const MobileNavbar = ({ dictionary }: MobileNavbarProps) => {
  const { navbar, lang } = dictionary
  const [isOpen, setIsOpen] = useState(false)

  const navItems = Object.entries(navbar.navItems).map(([key, navItem]) => ({
    ...navItem,
    icon: NAV_ITEMS_ICONS[key as keyof typeof NAV_ITEMS_ICONS],
    href: `${lang}${navItem.href}`,
  }))

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
          <div className="-mb-1 text-base text-white sm:text-xl font-pixelated">
            {navbar.logoText}
          </div>

          {/* MENU */}
          <div onClick={handleMenuClick}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div
        className={`${WRAPPER_STYLES} mt-2px transition transform fixed z-40 top-0 left-0 w-full bg-black h-screen ${isOpen ? "translate-x-0" : "translate-x-full"}`}
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
          <p className="mb-20 text-3xl font-pixelated">{SIDEBAR_TITLE}</p>
          <AnimatedNavLinks
            navItems={navItems}
            listClassName={`${WRAPPER_CHILD_STYLES} flex flex-col items-center gap-5 mx-0 mb-20`}
            itemClassName="flex gap-3 w-full font-pixelated text-sm"
            itemOnClick={handleMenuClick}
            animateOnce={false}
          />

          <div className="flex flex-col min-[385px]:flex-row items-center gap-5 mt-10 lg:flex-row md:mt-14">
            <Button
              href={navbar.ctas.linkedin.href}
              target="_blank"
              onClick={handleMenuClick}
            >
              {navbar.ctas.linkedin.text}
            </Button>
            <Button
              href={navbar.ctas.resume.href}
              target="_blank"
              variant="drive"
            >
              {navbar.ctas.resume.text}
            </Button>
            <Button
              href={navbar.ctas.mail.href}
              target="_blank"
              variant="secondary"
            >
              {navbar.ctas.mail.text}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
