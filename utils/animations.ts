// Libs
import { Variants } from "framer-motion"

const FADE_UP: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const SLIDE_FROM_RIGHT: Variants = {
  hidden: {
    opacity: 0,
    x: 15,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}

const SLIDE_FROM_LEFT: Variants = {
  hidden: {
    opacity: 0,
    x: -15,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}

export { FADE_UP, SLIDE_FROM_RIGHT, SLIDE_FROM_LEFT }
