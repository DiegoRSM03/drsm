import { render } from "@testing-library/react";
import { CustomCursor } from "./custom-cursor";

jest.mock("@/contexts", () => ({
  useTheme: () => ({ theme: "dark", toggleTheme: jest.fn() }),
}));

jest.mock("framer-motion", () => {
  const _mock = {
    motion: {
      div: ({ children, className }: { children?: React.ReactNode; className: string }) => (
        <div className={className} data-testid="cursor-element">
          {children}
        </div>
      ),
    },
    useMotionValue: () => ({ set: jest.fn() }),
    useSpring: () => ({ set: jest.fn() }),
  };
  _mock.m = _mock.motion;
  return _mock;
});

describe("CustomCursor", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
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

    Object.defineProperty(navigator, "maxTouchPoints", {
      writable: true,
      configurable: true,
      value: 0,
    });

    delete (window as { ontouchstart?: unknown }).ontouchstart;
  });

  afterEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: originalMatchMedia,
    });
  });

  it("renders nothing on touch devices", () => {
    Object.defineProperty(window, "ontouchstart", {
      writable: true,
      configurable: true,
      value: () => {},
    });

    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();
  });

  it("renders cursor elements on non-touch devices", () => {
    const { getAllByTestId } = render(<CustomCursor />);
    const cursorElements = getAllByTestId("cursor-element");
    expect(cursorElements.length).toBe(2);
  });

  it("has pointer-events-none class", () => {
    const { getAllByTestId } = render(<CustomCursor />);
    const cursorElements = getAllByTestId("cursor-element");
    cursorElements.forEach((element) => {
      expect(element).toHaveClass("pointer-events-none");
    });
  });

  it("has fixed positioning", () => {
    const { getAllByTestId } = render(<CustomCursor />);
    const cursorElements = getAllByTestId("cursor-element");
    cursorElements.forEach((element) => {
      expect(element).toHaveClass("fixed");
    });
  });

  it("dot cursor uses accent color", () => {
    const { getAllByTestId } = render(<CustomCursor />);
    const cursorElements = getAllByTestId("cursor-element");
    expect(cursorElements[0]).toHaveClass("bg-accent");
  });

  it("circle cursor has border", () => {
    const { getAllByTestId } = render(<CustomCursor />);
    const cursorElements = getAllByTestId("cursor-element");
    expect(cursorElements[1]).toHaveClass("border-2");
  });
});
