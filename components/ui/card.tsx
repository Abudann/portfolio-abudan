import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({
  children,
  className,
  hover = true,
  glow = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6",
        hover &&
          "transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-card hover:-translate-y-1",
        glow && "glow-accent",
        className
      )}
    >
      {children}
    </div>
  );
}
