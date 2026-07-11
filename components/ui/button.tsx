import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-accent-400 text-navy-950 hover:bg-accent-300 hover:shadow-lg hover:scale-[1.02]",
      secondary:
        "border border-[var(--border)] bg-[var(--glass-bg)] text-[var(--foreground)] backdrop-blur-sm hover:border-accent-400 hover:text-accent-400 hover:shadow-soft",
      ghost:
        "text-[var(--foreground-secondary)] hover:bg-[var(--background-secondary)] hover:text-[var(--foreground)]",
      outline:
        "border border-accent-400/30 text-accent-400 hover:bg-accent-400/10 hover:border-accent-400",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
