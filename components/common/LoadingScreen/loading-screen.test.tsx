import { render, screen } from "@testing-library/react";
import { LoadingScreen } from "./loading-screen";

const mockSessionStorage: Record<string, string> = {};

jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      role,
      "aria-label": ariaLabel,
      "aria-hidden": ariaHidden,
      style,
    }: {
      children?: React.ReactNode;
      className?: string;
      role?: string;
      "aria-label"?: string;
      "aria-hidden"?: string;
      style?: React.CSSProperties;
    }) => (
      <div
        className={className}
        role={role}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        style={style}
      >
        {children}
      </div>
    ),
    span: ({
      children,
      className,
      style,
    }: {
      children?: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    }) => (
      <span className={className} style={style}>
        {children}
      </span>
    ),
    p: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
      <p className={className}>{children}</p>
    ),
  },
  useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
  useSpring: () => ({ set: jest.fn() }),
  useReducedMotion: () => false,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("LoadingScreen", () => {
  beforeEach(() => {
    Object.keys(mockSessionStorage).forEach((key) => delete mockSessionStorage[key]);
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn((key: string) => mockSessionStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockSessionStorage[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete mockSessionStorage[key];
        }),
      },
      writable: true,
    });
  });

  it("renders loading screen", () => {
    render(<LoadingScreen />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has role status for accessibility", () => {
    render(<LoadingScreen />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
  });

  it("has aria-label Loading", () => {
    render(<LoadingScreen />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("renders DRSM letters", () => {
    render(<LoadingScreen />);
    expect(screen.getAllByText("D").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("R").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("S").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("M").length).toBeGreaterThanOrEqual(1);
  });

  it("renders tagline text", () => {
    render(<LoadingScreen />);
    expect(screen.getByText("Obsessed with making ideas breathe")).toBeInTheDocument();
  });

  it("renders progress indicator", () => {
    const { container } = render(<LoadingScreen />);
    const progressBar = container.querySelector(".bg-accent.h-full");
    expect(progressBar).toBeInTheDocument();
  });

  it("decorative floating shapes are aria-hidden", () => {
    const { container } = render(<LoadingScreen />);
    const decorativeContainer = container.querySelector("[aria-hidden='true']");
    expect(decorativeContainer).toBeInTheDocument();
  });

  it("center glow is aria-hidden", () => {
    const { container } = render(<LoadingScreen />);
    const ariaHiddenElements = container.querySelectorAll("[aria-hidden='true']");
    expect(ariaHiddenElements.length).toBeGreaterThanOrEqual(2);
  });

  it("returns null when already loaded in session", () => {
    mockSessionStorage["drsm-loaded"] = "true";
    const { container } = render(<LoadingScreen />);
    expect(container.firstChild).toBeNull();
  });
});
