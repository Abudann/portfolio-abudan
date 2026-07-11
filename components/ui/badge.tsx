import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default:
      "bg-[var(--background-secondary)] text-[var(--foreground-secondary)] border border-[var(--border)]",
    accent:
      "bg-accent-400/10 text-accent-400 border border-accent-400/20",
    success:
      "bg-success/10 text-success border border-success/20",
    outline:
      "border border-[var(--border)] text-[var(--foreground-muted)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
