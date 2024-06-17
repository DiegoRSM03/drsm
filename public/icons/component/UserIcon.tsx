// Utils
import { SvgProps } from "@/utils"

export const UserIcon = ({
  width = 20,
  height = 25,
  color = "white",
}: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 32 40"
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M22 0H10v4H6v12h4V4h12V0Zm0 16H10v4h12v-4Zm0-12h4v12h-4V4ZM0 28h4v-4h24v4H4v8h24v-8h4v12H0V28Z"
      clipRule="evenodd"
    />
  </svg>
)
