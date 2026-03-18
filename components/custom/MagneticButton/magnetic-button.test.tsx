import { render, screen, fireEvent } from "@testing-library/react";
import { MagneticButton } from "./magnetic-button";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
    }: {
      children: React.ReactNode;
      className?: string;
      onMouseMove?: () => void;
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
    }) => (
      <div
        className={className}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    ),
    button: ({
      children,
      onClick,
      className,
      disabled,
      type,
      ref,
    }: {
      children: React.ReactNode;
      onClick?: () => void;
      className?: string;
      disabled?: boolean;
      type?: string;
      ref?: React.Ref<HTMLButtonElement>;
    }) => (
      <button ref={ref} onClick={onClick} className={className} disabled={disabled} type={type}>
        {children}
      </button>
    ),
    span: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
  useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
  useSpring: () => ({ set: jest.fn() }),
}));

describe("MagneticButton", () => {
  it("renders children", () => {
    render(<MagneticButton>Click me</MagneticButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders as a button element", () => {
    render(<MagneticButton>Action</MagneticButton>);
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("renders primary variant with correct styles", () => {
    render(<MagneticButton variant="primary">Primary</MagneticButton>);
    const button = screen.getByRole("button", { name: "Primary" });
    expect(button).toHaveClass("bg-accent");
    expect(button).toHaveClass("text-white");
  });

  it("renders secondary variant with correct styles", () => {
    render(<MagneticButton variant="secondary">Secondary</MagneticButton>);
    const button = screen.getByRole("button", { name: "Secondary" });
    expect(button).toHaveClass("border-2");
    expect(button).toHaveClass("border-accent");
    expect(button).toHaveClass("text-accent");
  });

  it("renders ghost variant with correct styles", () => {
    render(<MagneticButton variant="ghost">Ghost</MagneticButton>);
    const button = screen.getByRole("button", { name: "Ghost" });
    expect(button).toHaveClass("text-foreground");
  });

  it("renders small size", () => {
    render(<MagneticButton size="sm">Small</MagneticButton>);
    const button = screen.getByRole("button", { name: "Small" });
    expect(button).toHaveClass("h-9");
    expect(button).toHaveClass("px-4");
    expect(button).toHaveClass("text-sm");
  });

  it("renders medium size by default", () => {
    render(<MagneticButton>Medium</MagneticButton>);
    const button = screen.getByRole("button", { name: "Medium" });
    expect(button).toHaveClass("h-11");
    expect(button).toHaveClass("px-6");
    expect(button).toHaveClass("text-base");
  });

  it("renders large size", () => {
    render(<MagneticButton size="lg">Large</MagneticButton>);
    const button = screen.getByRole("button", { name: "Large" });
    expect(button).toHaveClass("h-14");
    expect(button).toHaveClass("px-8");
    expect(button).toHaveClass("text-lg");
  });

  it("has focus-visible styles for accessibility", () => {
    render(<MagneticButton>Focus</MagneticButton>);
    const button = screen.getByRole("button", { name: "Focus" });
    expect(button).toHaveClass("focus-visible:ring-2");
    expect(button).toHaveClass("focus-visible:ring-accent");
    expect(button).toHaveClass("focus-visible:ring-offset-2");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<MagneticButton onClick={handleClick}>Clickable</MagneticButton>);
    fireEvent.click(screen.getByRole("button", { name: "Clickable" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    const handleClick = jest.fn();
    render(
      <MagneticButton onClick={handleClick} disabled>
        Disabled
      </MagneticButton>
    );
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
    expect(button).toHaveClass("disabled:pointer-events-none");
  });

  it("defaults to type button", () => {
    render(<MagneticButton>Default Type</MagneticButton>);
    expect(screen.getByRole("button", { name: "Default Type" })).toHaveAttribute("type", "button");
  });

  it("accepts custom type", () => {
    render(<MagneticButton type="submit">Submit</MagneticButton>);
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("type", "submit");
  });

  it("applies custom className", () => {
    render(<MagneticButton className="custom-class">Custom</MagneticButton>);
    const button = screen.getByRole("button", { name: "Custom" });
    expect(button).toHaveClass("custom-class");
  });
});
