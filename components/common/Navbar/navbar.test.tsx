import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "./navbar";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    setTransform: jest.fn(),
    strokeStyle: "",
  });
});

const mockToggleTheme = jest.fn();
let mockTheme = "light";

jest.mock("@/components/custom/LenisProvider", () => ({
  useLenis: () => ({ lenis: null }),
}));

jest.mock("@/contexts", () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

jest.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => "/",
}));

jest.mock("framer-motion", () => {
  const _mock = {
    motion: {
      div: ({
        children,
        className,
        onClick,
        role,
        "aria-modal": ariaModal,
        "aria-label": ariaLabel,
      }: {
        children: React.ReactNode;
        className?: string;
        onClick?: () => void;
        role?: string;
        "aria-modal"?: boolean;
        "aria-label"?: string;
      }) => (
        <div
          className={className}
          onClick={onClick}
          role={role}
          aria-modal={ariaModal}
          aria-label={ariaLabel}
        >
          {children}
        </div>
      ),
      span: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <span className={className}>{children}</span>
      ),
      button: ({
        children,
        onClick,
        className,
        "aria-label": ariaLabel,
        "aria-expanded": ariaExpanded,
        "aria-controls": ariaControls,
      }: {
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
        "aria-label"?: string;
        "aria-expanded"?: boolean;
        "aria-controls"?: string;
      }) => (
        <button
          onClick={onClick}
          className={className}
          aria-label={ariaLabel}
          aria-expanded={ariaExpanded}
          aria-controls={ariaControls}
        >
          {children}
        </button>
      ),
      a: ({
        children,
        href,
        className,
        onClick,
      }: {
        children: React.ReactNode;
        href: string;
        className?: string;
        onClick?: () => void;
      }) => (
        <a href={href} className={className} onClick={onClick}>
          {children}
        </a>
      ),
      li: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <li className={className}>{children}</li>
      ),
      path: ({ fill, d }: { fill: string; d: string }) => <path fill={fill} d={d} />,
      svg: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
        <svg className={className}>{children}</svg>
      ),
    },
    useMotionValue: () => ({ set: jest.fn(), get: () => 0, on: () => () => {} }),
    useSpring: () => ({ set: jest.fn(), get: () => 0 }),
    useTransform: () => ({ set: jest.fn(), get: () => 0 }),
    useReducedMotion: () => false,
    useAnimationFrame: () => {},
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
  _mock.m = _mock.motion;
  return _mock;
});

jest.mock("lucide-react", () => ({
  Globe: () => <span data-testid="globe-icon">Globe</span>,
}));

jest.mock("@/components/custom/ThemeToggle", () => ({
  ThemeToggle: ({ isMenuOpen }: { isMenuOpen?: boolean }) => (
    <button data-testid="theme-toggle" data-menu-open={isMenuOpen}>
      Theme
    </button>
  ),
}));

describe("Navbar", () => {
  beforeEach(() => {
    mockTheme = "light";
    mockToggleTheme.mockClear();
  });

  it("renders the navbar", () => {
    render(<Navbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders DRSM logo letters", () => {
    render(<Navbar />);
    expect(screen.getByText("D")).toBeInTheDocument();
    expect(screen.getByText("R")).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("renders theme toggle", () => {
    render(<Navbar />);
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("renders language toggle with globe icon", () => {
    render(<Navbar />);
    expect(screen.getByTestId("globe-icon")).toBeInTheDocument();
  });

  it("renders hamburger menu button", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("nav.openMenu")).toBeInTheDocument();
  });

  it("opens curtain menu when hamburger is clicked", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("nav.openMenu"));
    expect(screen.getByLabelText("nav.closeMenu")).toBeInTheDocument();
  });

  it("renders nav items when menu is open", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("nav.openMenu"));
    expect(screen.getByText("nav.projects")).toBeInTheDocument();
    expect(screen.getByText("nav.experience")).toBeInTheDocument();
    expect(screen.getByText("nav.about")).toBeInTheDocument();
    expect(screen.getByText("nav.contact")).toBeInTheDocument();
  });

  it("nav items have correct href", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("nav.openMenu"));
    expect(screen.getByText("nav.projects").closest("a")).toHaveAttribute("href", "#projects");
    expect(screen.getByText("nav.experience").closest("a")).toHaveAttribute("href", "#experience");
    expect(screen.getByText("nav.about").closest("a")).toHaveAttribute("href", "#about");
    expect(screen.getByText("nav.contact").closest("a")).toHaveAttribute("href", "#contact");
  });

  it("closes menu when nav item is clicked", async () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("nav.openMenu"));
    fireEvent.click(screen.getByText("nav.about"));
    await screen.findByLabelText("nav.openMenu");
    expect(screen.getByLabelText("nav.openMenu")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Navbar className="custom-navbar" />);
    expect(screen.getByRole("banner")).toHaveClass("custom-navbar");
  });

  it("passes isMenuOpen to ThemeToggle", () => {
    render(<Navbar />);
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute("data-menu-open", "false");
    fireEvent.click(screen.getByLabelText("nav.openMenu"));
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute("data-menu-open", "true");
  });

  it("hamburger button has aria-expanded attribute", () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText("nav.openMenu");
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(hamburger);
    expect(screen.getByLabelText("nav.closeMenu")).toHaveAttribute("aria-expanded", "true");
  });

  it("hamburger button has aria-controls attribute", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("nav.openMenu")).toHaveAttribute("aria-controls", "main-menu");
  });

  it("language toggle has accessible label", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("nav.toggleLanguage")).toBeInTheDocument();
  });

  it("logo link points to home", () => {
    render(<Navbar />);
    const logoContainer = screen.getByText("D").closest("a");
    expect(logoContainer).toHaveAttribute("href", "/");
  });

  it("curtain has dialog role when open", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("nav.openMenu"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("curtain has navigation landmark when open", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("nav.openMenu"));
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
  });
});
