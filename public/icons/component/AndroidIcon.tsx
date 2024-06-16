// Utils
import { SvgProps } from "@/utils"

export const AndroidIcon = ({
  width = 20,
  height = 14,
  color = "white",
}: SvgProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H2V2H0V0ZM4 4H2V2H4V4ZM6 4H4V6H2V8H0V12V14H2H18H20V12V8H18V6H16V4H18V2H20V0H18V2H16V4H14V2H6V4ZM6 4H14V6H16V8H18V12H2V8H4V6H6V4ZM8 8H6V10H8V8ZM12 8H14V10H12V8Z"
      fill={color}
    />
  </svg>
)