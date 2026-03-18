"use client";

import { useRef, useState, forwardRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  strength?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      strength = 0.3,
      className = "",
      onClick,
      disabled,
      type = "button",
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      x.set(deltaX * strength);
      y.set(deltaY * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const baseStyles =
      "magnetic relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-accent text-white hover:bg-accent-hover active:bg-accent",
      secondary: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
      ghost: "text-foreground hover:bg-elevated hover:text-accent",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.div
        ref={buttonRef}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <motion.button
          ref={ref}
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
          whileTap={{ scale: 0.97 }}
          animate={{
            boxShadow: isHovered
              ? "0 0 30px rgba(139, 92, 246, 0.4)"
              : "0 0 0px rgba(139, 92, 246, 0)",
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            style={{ x: springX, y: springY }}
            className="relative z-10 flex items-center justify-center"
          >
            {children}
          </motion.span>
        </motion.button>
      </motion.div>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export { MagneticButton };
