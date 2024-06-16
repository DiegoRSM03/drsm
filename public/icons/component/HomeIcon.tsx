// Utils
import { SvgProps } from "@/utils"

export const HomeIcon = ({
  width = 20,
  height = 20,
  color = "white",
}: SvgProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0H8V2H6V4H4V6H2V8H0V10H2V20H9V14H11V20H18V10H20V8H18V6H16V4H14V2H12V0ZM12 2V4H14V6H16V8H18V10H16V18H13V12H7V18H4V10H2V8H4V6H6V4H8V2H12Z"
      fill={color}
    />
  </svg>
)
