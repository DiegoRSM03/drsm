import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./theme-toggle";

const mockToggleTheme = jest.fn();
let mockTheme = "light";

jest.mock("@/contexts", () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

jest.mock("framer-motion", () => ({
  motion: {
    button: ({
      children,
      onClick,
      className,
      "aria-label": ariaLabel,
    }: {
      children: React.ReactNode;
      onClick: () => void;
      className: string;
      "aria-label": string;
    }) => (
      <button onClick={onClick} className={className} aria-label={ariaLabel}>
        {children}
      </button>
    ),
    div: ({ children, className }: { children: React.ReactNode; className: string }) => (
      <div className={className}>{children}</div>
    ),
    svg: ({ children, className }: { children: React.ReactNode; className: string }) => (
      <svg className={className}>{children}</svg>
    ),
  },
  useMotionValue: () => ({ set: jest.fn() }),
  useSpring: () => ({ set: jest.fn() }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    mockToggleTheme.mockClear();
    mockTheme = "light";
  });

  it("renders the toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has correct aria-label for light mode", () => {
    mockTheme = "light";
    render(<ThemeToggle />);
    expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
  });

  it("has correct aria-label for dark mode", () => {
    mockTheme = "dark";
    render(<ThemeToggle />);
    expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();
  });

  it("calls toggleTheme when clicked", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<ThemeToggle className="custom-class" />);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("applies menu open styles in dark mode", () => {
    mockTheme = "dark";
    render(<ThemeToggle isMenuOpen />);
    expect(screen.getByRole("button")).toHaveClass("bg-accent");
    expect(screen.getByRole("button")).toHaveClass("border-white/50");
  });

  it("applies menu open styles in light mode", () => {
    mockTheme = "light";
    render(<ThemeToggle isMenuOpen />);
    expect(screen.getByRole("button")).toHaveClass("bg-accent");
    expect(screen.getByRole("button")).toHaveClass("border-black/30");
  });

  it("has magnetic class for cursor interaction", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toHaveClass("magnetic");
  });
});
