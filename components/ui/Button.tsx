"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth = false, className = "", children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-heading font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none";

    const variants = {
      primary:
        "bg-accent text-white hover:bg-accent-dark active:scale-95 rounded-full shadow-sm hover:shadow-md",
      secondary:
        "bg-transparent border-2 border-primary text-primary hover:bg-primary/5 active:scale-95 rounded-xl",
      ghost:
        "bg-transparent text-primary hover:bg-primary/5 active:scale-95 rounded-xl",
      danger:
        "bg-danger text-white hover:opacity-90 active:scale-95 rounded-xl",
    };

    const sizes = {
      sm: "px-4 py-1.5 text-sm",
      md: "px-6 py-2.5 text-base",
      lg: "px-8 py-3.5 text-lg",
    };

    const disabledStyle = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${disabledStyle} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
