import { render } from "@testing-library/react";
import { ProximityShape } from "./proximity-shape";

import type { ProximityShapeData } from "./proximity-shape";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      "aria-hidden": ariaHidden,
      style,
    }: {
      children?: React.ReactNode;
      className?: string;
      "aria-hidden"?: string;
      style?: React.CSSProperties;
    }) => (
      <div className={className} aria-hidden={ariaHidden} style={style}>
        {children}
      </div>
    ),
  },
  useMotionValue: () => ({ set: jest.fn(), get: () => 0, on: () => () => {} }),
  useSpring: () => ({ set: jest.fn(), get: () => 0 }),
  useReducedMotion: () => false,
  useTransform: () => ({ set: jest.fn(), get: () => 0 }),
}));

const mockMouseX = { set: jest.fn(), get: () => 0, on: () => () => {} };
const mockMouseY = { set: jest.fn(), get: () => 0, on: () => () => {} };

function makeShape(overrides: Partial<ProximityShapeData> = {}): ProximityShapeData {
  return {
    type: "diamond",
    x: "50%",
    y: "50%",
    size: 24,
    color: "#8B5CF6",
    filled: true,
    floatDuration: 4,
    floatDelay: 0,
    ...overrides,
  };
}

describe("ProximityShape", () => {
  it("has aria-hidden true since it is decorative", () => {
    const { container } = render(
      <ProximityShape
        shape={makeShape()}
        mouseX={mockMouseX as never}
        mouseY={mockMouseY as never}
      />
    );
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a diamond shape as a rotated square", () => {
    const { container } = render(
      <ProximityShape
        shape={makeShape({ type: "diamond", filled: true })}
        mouseX={mockMouseX as never}
        mouseY={mockMouseY as never}
      />
    );
    const innerDiv = container.querySelector("[style*='rotate(45deg)']");
    expect(innerDiv).toBeInTheDocument();
  });

  it("renders a circle shape with border-radius 50%", () => {
    const { container } = render(
      <ProximityShape
        shape={makeShape({ type: "circle", filled: true })}
        mouseX={mockMouseX as never}
        mouseY={mockMouseY as never}
      />
    );
    const circle = container.querySelector("[style*='border-radius: 50%']");
    expect(circle).toBeInTheDocument();
  });

  it("renders a filled square shape", () => {
    const { container } = render(
      <ProximityShape
        shape={makeShape({ type: "square", size: 32, color: "#06B6D4", filled: true })}
        mouseX={mockMouseX as never}
        mouseY={mockMouseY as never}
      />
    );
    const square = container.querySelector("[style*='width: 32px']");
    expect(square).toBeInTheDocument();
    expect(square).toHaveStyle({ backgroundColor: "#06B6D4" });
  });

  it("renders a filled triangle shape using borders", () => {
    const { container } = render(
      <ProximityShape
        shape={makeShape({ type: "triangle", size: 24, filled: true })}
        mouseX={mockMouseX as never}
        mouseY={mockMouseY as never}
      />
    );
    const triangle = container.querySelector("[style*='border-bottom']");
    expect(triangle).toBeInTheDocument();
  });

  it("renders an outlined triangle shape using SVG", () => {
    const { container } = render(
      <ProximityShape
        shape={makeShape({ type: "triangle", filled: false, color: "#EC4899" })}
        mouseX={mockMouseX as never}
        mouseY={mockMouseY as never}
      />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    const polygon = container.querySelector("polygon");
    expect(polygon).toHaveAttribute("stroke", "#EC4899");
    expect(polygon).toHaveAttribute("fill", "none");
  });

  it("renders with correct color for filled shapes", () => {
    const { container } = render(
      <ProximityShape
        shape={makeShape({ type: "circle", color: "#F59E0B", filled: true })}
        mouseX={mockMouseX as never}
        mouseY={mockMouseY as never}
      />
    );
    const circle = container.querySelector("[style*='border-radius: 50%']");
    expect(circle).toHaveStyle({ backgroundColor: "#F59E0B" });
  });

  it("renders bordered style when not filled", () => {
    const { container } = render(
      <ProximityShape
        shape={makeShape({ type: "diamond", filled: false, color: "#10B981" })}
        mouseX={mockMouseX as never}
        mouseY={mockMouseY as never}
      />
    );
    const diamond = container.querySelector("[style*='rotate(45deg)']");
    expect(diamond).toHaveStyle({ border: "2px solid #10B981" });
  });
});
