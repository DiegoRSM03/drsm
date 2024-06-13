// Libs
import { AnchorHTMLAttributes, ReactNode } from "react"
import Link, { LinkProps } from "next/link"

export type Props = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode
  }

export const Button = ({ href, children, ...props }: Props) => {
  return (
    <div className="relative cursor-pointer p-3px group">
      {/* SHADOW EFFECT */}
      <div className="absolute left-0 w-full bottom-3px h-2px bg-secondary group-hover:h-3px group-hover:bg-tertiary" />
      <div className="absolute bottom-0 h-full right-3px w-2px bg-secondary group-hover:w-3px group-hover:bg-tertiary" />

      {/* WHITE LINES */}
      <div className="absolute top-0 left-3px w-[calc(100%-6px)] bg-white h-3px" />
      <div className="absolute top-3px right-0 h-[calc(100%-6px)] bg-white w-3px" />
      <div className="absolute bottom-0 left-3px w-[calc(100%-6px)] bg-white h-3px" />
      <div className="absolute bottom-3px left-0 h-[calc(100%-6px)] bg-white w-3px" />

      {/* LINK */}
      <Link
        href={href}
        {...props}
        className="px-5 py-1 text-2xl text-white font-jacquard bg-primary group-hover:bg-secondary"
      >
        {children}
      </Link>
    </div>
  )
}
