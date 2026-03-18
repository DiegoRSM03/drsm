import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

const filterMotionProps = (props: Record<string, unknown>) => {
  const motionPropKeys = [
    "initial",
    "animate",
    "exit",
    "transition",
    "whileHover",
    "whileTap",
    "whileInView",
    "viewport",
    "variants",
  ];
  const filtered: Record<string, unknown> = {};
  for (const key in props) {
    if (!motionPropKeys.includes(key)) {
      filtered[key] = props[key];
    }
  }
  return filtered;
};

jest.mock("framer-motion", () => ({
  motion: {
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...filterMotionProps(props)}>{children}</button>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterMotionProps(props)}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => false,
}));

jest.mock("lucide-react", () => ({
  ArrowUp: ({ className }: { className?: string }) => (
    <svg data-testid="arrow-up-icon" className={className} />
  ),
}));

import { ScrollToTop } from "./scroll-to-top";

describe("ScrollToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    window.scrollTo = jest.fn();
  });

  it("does not render the button when scrollY is below threshold", () => {
    render(<ScrollToTop />);
    expect(screen.queryByLabelText("Scroll to top")).not.toBeInTheDocument();
  });

  it("renders the button when scrollY exceeds threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 500 });
    render(<ScrollToTop threshold={400} />);
    fireEvent.scroll(window);
    expect(screen.getByLabelText("Scroll to top")).toBeInTheDocument();
  });

  it("has aria-label on the button", () => {
    Object.defineProperty(window, "scrollY", { value: 500 });
    render(<ScrollToTop />);
    fireEvent.scroll(window);
    expect(screen.getByLabelText("Scroll to top")).toBeInTheDocument();
  });

  it("calls window.scrollTo when clicked", () => {
    Object.defineProperty(window, "scrollY", { value: 500 });
    render(<ScrollToTop />);
    fireEvent.scroll(window);
    fireEvent.click(screen.getByLabelText("Scroll to top"));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("renders the arrow up icon", () => {
    Object.defineProperty(window, "scrollY", { value: 500 });
    render(<ScrollToTop />);
    fireEvent.scroll(window);
    expect(screen.getByTestId("arrow-up-icon")).toBeInTheDocument();
  });
});
