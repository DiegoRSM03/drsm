"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/utils";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { useToast } from "../Toast";

interface ContactData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactData) => Promise<void>;
  className?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactForm({ onSubmit, className }: ContactFormProps) {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast({
        message: "Please fix the errors in the form",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      addToast({
        message: "Message sent successfully! I'll get back to you soon.",
        type: "success",
      });

      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      addToast({
        message: "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)}>
      {/* Honeypot field for spam protection */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Input
        label="Name"
        name="name"
        type="text"
        placeholder="John Doe"
        required
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="john@example.com"
        required
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Textarea
        label="Message"
        name="message"
        placeholder="Tell me about your project..."
        rows={5}
        required
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
      />

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "magnetic flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors",
          "hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        )}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}

export { ContactForm };
