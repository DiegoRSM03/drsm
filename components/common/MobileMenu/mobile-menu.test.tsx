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
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterMotionProps(props)}>{children}</div>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...filterMotionProps(props)}>{children}</button>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...filterMotionProps(props)}>{children}</span>
    ),
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...filterMotionProps(props)}>{children}</p>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => false,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
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
}));

jest.mock("lucide-react", () => ({
  X: ({ className }: { className?: string }) => <svg data-testid="x-icon" className={className} />,
}));

import { MobileMenu } from "./mobile-menu";

const defaultLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

describe("MobileMenu", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    document.body.style.overflow = "";
  });

  describe("Rendering", () => {
    it("renders when open", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
      render(<MobileMenu isOpen={false} onClose={onClose} links={defaultLinks} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders all navigation links", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Experience")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("renders links with correct hrefs", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(screen.getByText("About").closest("a")).toHaveAttribute("href", "#about");
      expect(screen.getByText("Projects").closest("a")).toHaveAttribute("href", "#projects");
    });

    it("renders close button", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has dialog role", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("has aria-modal attribute", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });

    it("has aria-label on the dialog", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Navigation menu");
    });

    it("has navigation with aria-label", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    });

    it("close button has aria-label", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onClose when close button is clicked", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      fireEvent.click(screen.getByLabelText("Close menu"));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when a link is clicked", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      fireEvent.click(screen.getByText("About"));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when Escape key is pressed", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      fireEvent.keyDown(window, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("locks body scroll when open", () => {
      render(<MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />);
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores body scroll when closed", () => {
      const { rerender } = render(
        <MobileMenu isOpen={true} onClose={onClose} links={defaultLinks} />
      );
      expect(document.body.style.overflow).toBe("hidden");
      rerender(<MobileMenu isOpen={false} onClose={onClose} links={defaultLinks} />);
      expect(document.body.style.overflow).toBe("");
    });
  });
});
