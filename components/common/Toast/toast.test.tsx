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
    "layout",
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
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("lucide-react", () => ({
  X: ({ className }: { className?: string }) => <svg data-testid="x-icon" className={className} />,
  CheckCircle: ({ className }: { className?: string }) => (
    <svg data-testid="check-icon" className={className} />
  ),
  AlertCircle: ({ className }: { className?: string }) => (
    <svg data-testid="alert-icon" className={className} />
  ),
  Info: ({ className }: { className?: string }) => (
    <svg data-testid="info-icon" className={className} />
  ),
}));

import { ToastProvider, useToast } from "./toast";

function TestConsumer({ message, type }: { message: string; type: "success" | "error" | "info" }) {
  const { addToast } = useToast();
  return <button onClick={() => addToast({ message, type })}>Add Toast</button>;
}

describe("Toast", () => {
  describe("Rendering", () => {
    it("renders toast message when added", () => {
      render(
        <ToastProvider>
          <TestConsumer message="Operation successful" type="success" />
        </ToastProvider>
      );
      fireEvent.click(screen.getByText("Add Toast"));
      expect(screen.getByText("Operation successful")).toBeInTheDocument();
    });

    it("renders success toast with check icon", () => {
      render(
        <ToastProvider>
          <TestConsumer message="Saved" type="success" />
        </ToastProvider>
      );
      fireEvent.click(screen.getByText("Add Toast"));
      expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    });

    it("renders error toast with alert icon", () => {
      render(
        <ToastProvider>
          <TestConsumer message="Failed" type="error" />
        </ToastProvider>
      );
      fireEvent.click(screen.getByText("Add Toast"));
      expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
    });

    it("renders info toast with info icon", () => {
      render(
        <ToastProvider>
          <TestConsumer message="Note" type="info" />
        </ToastProvider>
      );
      fireEvent.click(screen.getByText("Add Toast"));
      expect(screen.getByTestId("info-icon")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has aria-live polite on the container", () => {
      const { container } = render(
        <ToastProvider>
          <div />
        </ToastProvider>
      );
      const liveRegion = container.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeInTheDocument();
    });

    it("has aria-atomic true on the container", () => {
      const { container } = render(
        <ToastProvider>
          <div />
        </ToastProvider>
      );
      const liveRegion = container.querySelector('[aria-atomic="true"]');
      expect(liveRegion).toBeInTheDocument();
    });

    it("has dismiss button with aria-label", () => {
      render(
        <ToastProvider>
          <TestConsumer message="Test" type="info" />
        </ToastProvider>
      );
      fireEvent.click(screen.getByText("Add Toast"));
      expect(screen.getByLabelText("Dismiss")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("removes toast when dismiss button is clicked", () => {
      render(
        <ToastProvider>
          <TestConsumer message="Dismissable toast" type="info" />
        </ToastProvider>
      );
      fireEvent.click(screen.getByText("Add Toast"));
      expect(screen.getByText("Dismissable toast")).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText("Dismiss"));
      expect(screen.queryByText("Dismissable toast")).not.toBeInTheDocument();
    });
  });

  describe("useToast hook", () => {
    it("throws error when used outside ToastProvider", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      function BadConsumer() {
        useToast();
        return null;
      }
      expect(() => render(<BadConsumer />)).toThrow("useToast must be used within a ToastProvider");
      consoleSpy.mockRestore();
    });
  });
});
