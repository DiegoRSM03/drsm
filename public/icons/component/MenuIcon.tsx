// Utils
import { SvgProps } from "@/utils"

export const MenuIcon = ({
  width = 20,
  height = 15,
  color = "white",
}: SvgProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H16V2H0V0ZM0 5.00006H16V7.00006H0V5.00006ZM16 10H0V12H16V10Z"
      fill={color}
    />
  </svg>
)
