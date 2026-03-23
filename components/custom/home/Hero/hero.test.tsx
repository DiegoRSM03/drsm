import React from "react";
import { render, screen } from "@testing-library/react";
import { Hero } from "./hero";

jest.mock("framer-motion", () => {
  const MockSection = React.forwardRef<
    HTMLElement,
    { children: React.ReactNode; className?: string }
  >(function MockSection({ children, className }, ref) {
    return (
      <section ref={ref} className={className}>
        {children}
      </section>
    );
  });

  const MockDiv = React.forwardRef<
    HTMLDivElement,
    {
      children?: React.ReactNode;
      className?: string;
      onClick?: () => void;
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
      style?: object;
      role?: string;
      "aria-label"?: string;
      "aria-hidden"?: boolean | "true" | "false";
      tabIndex?: number;
    }
  >(function MockDiv(
    {
      children,
      className,
      onClick,
      onMouseEnter,
      onMouseLeave,
      style,
      role,
      "aria-label": ariaLabel,
      "aria-hidden": ariaHidden,
      tabIndex,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={className}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
        role={role}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        tabIndex={tabIndex}
      >
        {children}
      </div>
    );
  });

  const motion = {
    section: MockSection,
    div: MockDiv,
    span: function MockSpan({
      children,
      className,
      style,
    }: {
      children?: React.ReactNode;
      className?: string;
      style?: object;
    }) {
      return (
        <span className={className} style={style}>
          {children}
        </span>
      );
    },
    h1: function MockH1({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) {
      return <h1 className={className}>{children}</h1>;
    },
    p: function MockP({ children, className }: { children: React.ReactNode; className?: string }) {
      return <p className={className}>{children}</p>;
    },
  };

  return {
    motion,
    m: motion,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
    useSpring: () => ({ set: jest.fn(), get: () => 0 }),
    useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
    useReducedMotion: () => false,
    MotionValue: class {},
  };
});

jest.mock("lucide-react", () => ({
  Download: function MockDownload() {
    return <span data-testid="download-icon">DownloadIcon</span>;
  },
  ArrowRight: function MockArrowRight() {
    return <span data-testid="arrow-icon">ArrowIcon</span>;
  },
}));

jest.mock("react-icons/si", () => ({
  SiReact: function MockSiReact() {
    return <span data-testid="react-icon">ReactIcon</span>;
  },
  SiTypescript: function MockSiTypescript() {
    return <span data-testid="ts-icon">TSIcon</span>;
  },
  SiNextdotjs: function MockSiNextdotjs() {
    return <span data-testid="next-icon">NextIcon</span>;
  },
  SiTailwindcss: function MockSiTailwindcss() {
    return <span data-testid="tailwind-icon">TailwindIcon</span>;
  },
  SiJest: function MockSiJest() {
    return <span data-testid="jest-icon">JestIcon</span>;
  },
}));

jest.mock("@/components/custom/MagneticButton", () => ({
  MagneticButton: function MockMagneticButton({ children }: { children: React.ReactNode }) {
    return <button data-testid="magnetic-button">{children}</button>;
  },
}));

jest.mock("@/contexts", () => ({
  useTheme: () => ({
    theme: "dark",
    toggleTheme: jest.fn(),
  }),
}));

jest.mock("@/components/custom/LenisProvider", () => ({
  useLenis: () => ({ lenis: null }),
}));

jest.mock("@/components/custom/CursorEffects", () => ({
  CursorBrightGrid: () => null,
}));

describe("Hero", () => {
  it("renders the hero section", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders DIEGO heading", () => {
    render(<Hero />);
    expect(screen.getByText("DIEGO")).toBeInTheDocument();
  });

  it("renders SANCHEZ heading", () => {
    render(<Hero />);
    expect(screen.getByText("SANCHEZ")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Hero />);
    expect(screen.getByText("hero.tagline")).toBeInTheDocument();
  });

  it("renders Download Resume button", () => {
    render(<Hero />);
    expect(screen.getByText("hero.downloadResume")).toBeInTheDocument();
  });

  it("renders View Projects button", () => {
    render(<Hero />);
    expect(screen.getByText("hero.viewProjects")).toBeInTheDocument();
  });

  it("renders tech stack labels", () => {
    render(<Hero />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
    expect(screen.getByText("Jest")).toBeInTheDocument();
    expect(screen.getByText("Claude")).toBeInTheDocument();
  });

  it("renders scroll indicator", () => {
    render(<Hero />);
    expect(screen.getByText("hero.scroll")).toBeInTheDocument();
  });

  it("renders magnetic buttons for CTA", () => {
    render(<Hero />);
    const magneticButtons = screen.getAllByTestId("magnetic-button");
    expect(magneticButtons.length).toBe(2);
  });

  it("section has accessible aria-label", () => {
    render(<Hero />);
    expect(screen.getByLabelText(/hero section introducing/i)).toBeInTheDocument();
  });

  it("tech stack has role list and accessible label", () => {
    render(<Hero />);
    const techStackList = screen.getByRole("list", { name: /technology stack/i });
    expect(techStackList).toBeInTheDocument();
  });

  it("renders tech pill items with listitem role", () => {
    render(<Hero />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(6);
  });
});
