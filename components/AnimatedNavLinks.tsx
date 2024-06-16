"use client"

// Libs
import Link from "next/link"
import { motion } from "framer-motion"
// Sections
import { FooterNavItem } from "@/sections"
// Utils
import { FADE_UP } from "@/utils"

interface Props {
  navItems: FooterNavItem[]
  listClassName?: string
  itemClassName?: string
  animateOnce?: boolean
}

const LIST_DEFAULT_STYLES = "flex flex-col justify-center gap-5 mt-10 w-min"
const ITEM_DEFAULT_STYLES = "flex gap-3 text-xs md:text-sm xl:text-base"

export const AnimatedNavLinks = ({
  navItems,
  listClassName,
  itemClassName,
  animateOnce = true,
}: Props) => {
  const listStyles = listClassName ?? LIST_DEFAULT_STYLES
  const itemStyles = itemClassName ?? ITEM_DEFAULT_STYLES

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      variants={FADE_UP}
      transition={{ staggerChildren: 0.2, duration: 0.4 }}
      viewport={{ once: animateOnce }}
      className={listStyles}
    >
      {navItems.map((navItem) => (
        <motion.li key={navItem.href} variants={FADE_UP} className="w-min">
          <Link href={navItem.href} className={itemStyles}>
            {navItem.icon}
            {navItem.title}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}
