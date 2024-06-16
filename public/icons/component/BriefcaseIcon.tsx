// Utils
import { SvgProps } from "@/utils"

export const BriefcaseIcon = ({
  width = 20,
  height = 18,
  color = "white",
}: SvgProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 0H6V4H0V18H10V16H2V6H18V8H20V4H14V0ZM12 4H8V2H12V4ZM18 10H12V16H18V18H20V16H18V10ZM14 14V12H16V14H14Z"
      fill={color}
    />
  </svg>
)
