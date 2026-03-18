/* eslint-disable react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";

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
    label: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <label {...filterMotionProps(props)}>{children}</label>
    ),
    input: React.forwardRef((props: Record<string, unknown>, ref: React.Ref<HTMLInputElement>) => (
      <input ref={ref} {...filterMotionProps(props)} />
    )),
    textarea: React.forwardRef(
      (props: Record<string, unknown>, ref: React.Ref<HTMLTextAreaElement>) => (
        <textarea ref={ref} {...filterMotionProps(props)} />
      )
    ),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...filterMotionProps(props)}>{children}</button>
    ),
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...filterMotionProps(props)}>{children}</p>
    ),
  },
}));

const mockAddToast = jest.fn();
jest.mock("../Toast", () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

jest.mock("lucide-react", () => ({
  Send: ({ className }: { className?: string }) => (
    <svg data-testid="send-icon" className={className} />
  ),
  Loader2: ({ className }: { className?: string }) => (
    <svg data-testid="loader-icon" className={className} />
  ),
}));

import { ContactForm } from "./contact-form";

describe("ContactForm", () => {
  beforeEach(() => {
    mockAddToast.mockClear();
  });

  describe("Rendering", () => {
    it("renders the form element", () => {
      const { container } = render(<ContactForm />);
      expect(container.querySelector("form")).toBeInTheDocument();
    });

    it("renders the Name input field", () => {
      render(<ContactForm />);
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("renders the Email input field", () => {
      render(<ContactForm />);
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("renders the Message textarea field", () => {
      render(<ContactForm />);
      expect(screen.getByText("Message")).toBeInTheDocument();
    });

    it("renders the submit button", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
    });

    it("renders the send icon in the button", () => {
      render(<ContactForm />);
      expect(screen.getByTestId("send-icon")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("name input has associated label", () => {
      render(<ContactForm />);
      const input = document.getElementById("name") as HTMLInputElement;
      expect(input).toBeInTheDocument();
      const label = document.querySelector('label[for="name"]');
      expect(label).toBeInTheDocument();
    });

    it("email input has associated label", () => {
      render(<ContactForm />);
      const input = document.getElementById("email") as HTMLInputElement;
      expect(input).toBeInTheDocument();
      const label = document.querySelector('label[for="email"]');
      expect(label).toBeInTheDocument();
    });

    it("message textarea has associated label", () => {
      render(<ContactForm />);
      const textarea = document.getElementById("message") as HTMLTextAreaElement;
      expect(textarea).toBeInTheDocument();
      const label = document.querySelector('label[for="message"]');
      expect(label).toBeInTheDocument();
    });

    it("required fields have required attribute", () => {
      render(<ContactForm />);
      const nameInput = document.getElementById("name") as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const messageTextarea = document.getElementById("message") as HTMLTextAreaElement;
      expect(nameInput).toBeRequired();
      expect(emailInput).toBeRequired();
      expect(messageTextarea).toBeRequired();
    });

    it("submit button has type submit", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: /send message/i })).toHaveAttribute(
        "type",
        "submit"
      );
    });
  });
});
