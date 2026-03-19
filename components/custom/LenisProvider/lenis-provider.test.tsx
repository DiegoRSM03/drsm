import { render, screen } from "@testing-library/react";
import { LenisProvider } from "./lenis-provider";

jest.mock("lenis", () => {
  return jest.fn().mockImplementation(() => ({
    raf: jest.fn(),
    destroy: jest.fn(),
  }));
});

describe("LenisProvider", () => {
  beforeEach(() => {
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

    jest.spyOn(window, "requestAnimationFrame").mockImplementation(() => {
      return 1;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders children", () => {
    render(
      <LenisProvider>
        <div>Child content</div>
      </LenisProvider>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <LenisProvider>
        <p>First</p>
        <p>Second</p>
      </LenisProvider>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("does not crash when rendered", () => {
    expect(() =>
      render(
        <LenisProvider>
          <span>Safe</span>
        </LenisProvider>
      )
    ).not.toThrow();
  });
});
