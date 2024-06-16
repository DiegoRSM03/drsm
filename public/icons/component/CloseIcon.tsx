// Utils
import { SvgProps } from "@/utils"

export const CloseIcon = ({
  width = 20,
  height = 20,
  color = "white",
}: SvgProps) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0H0V4H4V0ZM4 14H0V18H4V14ZM14 0H18V4H14V0ZM18 14H14V18H18V14ZM5 5H7V7H5V5ZM9 7H7V9V11H5V13H7V11H9H11V13H13V11H11V9V7H13V5H11V7H9Z"
      fill={color}
    />
  </svg>
)
