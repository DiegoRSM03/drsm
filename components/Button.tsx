// Libs
import { AnchorHTMLAttributes, ReactNode } from "react"
import Link, { LinkProps } from "next/link"

type Variant = "primary" | "secondary"

export type Props = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode
    variant?: Variant
  }

type ButtonStyle = {
  still: {
    textColor: string
    shadowColor: string
    borderColor: string
    backgroundColor: string
  }
  hover: {
    textColor: string
    shadowColor: string
    borderColor: string
    backgroundColor: string
  }
}

const BUTTON_STYLE: { [v in Variant]: ButtonStyle } = {
  primary: {
    still: {
      textColor: "text-white",
      shadowColor: "bg-secondary",
      borderColor: "bg-white",
      backgroundColor: "bg-primary",
    },
    hover: {
      textColor: "group-hover:text-white",
      shadowColor: "group-hover:bg-tertiary",
      borderColor: "group-hover:bg-white",
      backgroundColor: "group-hover:bg-secondary",
    },
  },
  secondary: {
    still: {
      textColor: "text-white",
      shadowColor: "bg-gray3",
      borderColor: "bg-white",
      backgroundColor: "bg-black",
    },
    hover: {
      textColor: "group-hover:text-white",
      shadowColor: "group-hover:bg-gray3",
      borderColor: "group-hover:bg-white",
      backgroundColor: "group-hover:bg-gray2",
    },
  },
}

export const Button = ({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: Props) => {
  const styles = BUTTON_STYLE[variant]

  return (
    <div
      className={`relative cursor-pointer py-1 group w-min h-min ${className}`}
    >
      {/* SHADOW EFFECT */}
      <div
        className={`absolute left-0 w-full h-[5px] bottom-3px group-hover:h-[6px] ${styles.hover.shadowColor} ${styles.still.shadowColor}`}
      />
      <div
        className={`absolute bottom-0 w-[5px] h-full right-3px group-hover:w-[6px] ${styles.hover.shadowColor} ${styles.still.shadowColor}`}
      />

      {/* BORDER LINES */}
      <div
        className={`absolute top-0 left-3px w-[calc(100%-6px)] h-3px ${styles.still.borderColor}`}
      />
      <div
        className={`absolute top-3px right-0 h-[calc(100%-6px)] w-3px ${styles.still.borderColor}`}
      />
      <div
        className={`absolute bottom-0 left-3px w-[calc(100%-6px)] h-3px ${styles.still.borderColor}`}
      />
      <div
        className={`absolute bottom-3px left-0 h-[calc(100%-6px)] w-3px ${styles.still.borderColor}`}
      />

      {/* LINK */}
      <Link
        href={href}
        {...props}
        className={`-mt-[1px] mb-[3px] transition-colors inline-flex w-full py-2 text-2xl leading-none px-10 h-9 font-jacquard ${styles.hover.backgroundColor} ${styles.hover.textColor} ${styles.still.backgroundColor} ${styles.still.textColor}`}
      >
        {children}
      </Link>
    </div>
  )
}
