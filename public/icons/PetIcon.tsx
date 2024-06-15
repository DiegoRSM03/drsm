// Utils
import { SvgProps } from "@/utils"

export const PetIcon = ({
  width = 33,
  height = 33,
  color = "white",
}: SvgProps) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33 33"
  >
    <path
      d="M7.33335 0.333374H14V3.66671H10.6667V7.00004H7.33335V0.333374Z"
      fill={color}
    />
    <path d="M7.33335 17H4.00002V7.00004H7.33335V17Z" fill={color} />
    <path d="M10.6667 20.3334H7.33335V17H10.6667V20.3334Z" fill={color} />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 23.6667V20.3334H10.6667V23.6667H4.00002V20.3334H0.666687V23.6667H4.00002V27H10.6667V33.6667H14V27H17.3334V23.6667H14ZM14 23.6667V27H10.6667V23.6667H14Z"
      fill={color}
    />
    <path d="M24 3.66671V7.00004H14V3.66671H24Z" fill={color} />
    <path
      d="M30.6667 7.00004H27.3334V3.66671H24V0.333374H30.6667V7.00004Z"
      fill={color}
    />
    <path d="M30.6667 17V7.00004H34V17H30.6667Z" fill={color} />
    <path d="M27.3334 20.3334V17H30.6667V20.3334H27.3334Z" fill={color} />
    <path d="M24 23.6667V20.3334H27.3334V23.6667H24Z" fill={color} />
    <path d="M24 27H20.6667V23.6667H24V27Z" fill={color} />
    <path d="M24 27H27.3334V33.6667H24V27Z" fill={color} />
  </svg>
)
