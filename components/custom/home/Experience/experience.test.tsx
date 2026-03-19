import { render, screen } from "@testing-library/react";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

import Experience from "./experience";

const filterMotionProps = (props: Record<string, unknown>) => {
  const motionPropKeys = [
    "initial",
    "animate",
    "exit",
    "transition",
    "whileHover",
    "whileTap",
    "whileInView",
    "whileFocus",
    "whileDrag",
    "viewport",
    "variants",
    "layout",
    "layoutId",
    "onAnimationStart",
    "onAnimationComplete",
  ];
  const filtered: Record<string, unknown> = {};
  for (const key in props) {
    if (!motionPropKeys.includes(key)) {
      filtered[key] = props[key];
    }
  }
  return filtered;
};

jest.mock("@/contexts", () => ({
  useTheme: () => ({
    theme: "dark",
    toggleTheme: jest.fn(),
  }),
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterMotionProps(props)}>{children}</div>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...filterMotionProps(props)}>{children}</span>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...filterMotionProps(props)}>{children}</button>
    ),
    li: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <li {...filterMotionProps(props)}>{children}</li>
    ),
    article: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <article {...filterMotionProps(props)}>{children}</article>
    ),
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useSpring: () => ({ get: () => 0 }),
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
  useReducedMotion: () => false,
}));

describe("Experience", () => {
  it("renders the section heading", () => {
    render(<Experience />);
    expect(screen.getAllByText("experience.titleWord1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("experience.titleWord2").length).toBeGreaterThan(0);
  });

  it("renders all experience companies", () => {
    render(<Experience />);
    expect(screen.getByText("INAZA")).toBeInTheDocument();
    expect(screen.getByText("LITEBOX")).toBeInTheDocument();
    expect(screen.getByText("AXON")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<Experience />);
    expect(screen.getByRole("region", { name: /experience\.titleWord1/i })).toBeInTheDocument();
  });

  it("renders experience cards as articles", () => {
    render(<Experience />);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(3);
  });

  it("each card has an accessible heading", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { name: /litebox/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /axon/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /inaza/i })).toBeInTheDocument();
  });

  it("skills lists have accessible label", () => {
    render(<Experience />);
    const skillsLists = screen.getAllByRole("list", { name: /technologies used/i });
    expect(skillsLists.length).toBe(3);
  });
});
