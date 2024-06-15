// Libs
import { AnchorHTMLAttributes, ReactNode } from "react"
import Link, { LinkProps } from "next/link"

export type Props = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode
  }

export const Button = ({ href, children, className, ...props }: Props) => {
  return (
    <div className={`relative cursor-pointer py-1 group w-min ${className}`}>
      {/* SHADOW EFFECT */}
      <div className="absolute left-0 w-full h-1 bottom-3px bg-secondary group-hover:h-[5px] group-hover:bg-tertiary" />
      <div className="absolute bottom-0 w-1 h-full right-3px bg-secondary group-hover:w-[5px] group-hover:bg-tertiary" />

      {/* WHITE LINES */}
      <div className="absolute top-0 left-3px w-[calc(100%-6px)] bg-white h-3px" />
      <div className="absolute top-3px right-0 h-[calc(100%-6px)] bg-white w-3px" />
      <div className="absolute bottom-0 left-3px w-[calc(100%-6px)] bg-white h-3px" />
      <div className="absolute bottom-3px left-0 h-[calc(100%-6px)] bg-white w-3px" />

      {/* LINK */}
      <Link
        href={href}
        {...props}
        className="-mt-[1px] mb-[3px] inline-flex w-full py-2 text-2xl leading-none text-white px-12 h-9 font-jacquard bg-primary group-hover:bg-secondary"
      >
        {children}
      </Link>
    </div>
  )
}
