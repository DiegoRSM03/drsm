"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      name,
      placeholder,
      rows = 4,
      required = false,
      error,
      className,
      value,
      onChange,
      onBlur,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value);
      onChange?.(e);
    };

    const isFloating = isFocused || hasValue;

    return (
      <div className={cn("relative", className)}>
        <motion.label
          htmlFor={name}
          className={cn(
            "text-muted pointer-events-none absolute left-4 origin-left transition-colors",
            error && "text-red-500"
          )}
          animate={{
            y: isFloating ? -24 : 12,
            scale: isFloating ? 0.85 : 1,
            color: error
              ? "rgb(239, 68, 68)"
              : isFocused
                ? "var(--color-accent)"
                : "var(--color-muted)",
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </motion.label>

        <motion.textarea
          ref={ref}
          id={name}
          name={name}
          placeholder={isFocused ? placeholder : ""}
          rows={rows}
          required={required}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "bg-surface text-foreground w-full resize-none border px-4 py-3 transition-colors outline-none",
            "placeholder:text-muted/50",
            error ? "border-red-500" : "border-border",
            isFocused && !error && "border-accent"
          )}
          animate={{
            boxShadow:
              isFocused && !error
                ? "0 0 0 3px rgba(139, 92, 246, 0.15)"
                : error
                  ? "0 0 0 3px rgba(239, 68, 68, 0.15)"
                  : "0 0 0 0px rgba(139, 92, 246, 0)",
          }}
          transition={{ duration: 0.2 }}
        />

        {error && (
          <motion.p
            className="mt-1.5 text-sm text-red-500"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
