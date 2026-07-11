interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
        {title}
      </h2>

      {/* Accent underline */}
      <div className={`mt-4 flex ${align === "center" ? "justify-center" : "justify-start"}`}>
        <div className="from-accent-400 to-accent-500 h-1 w-16 rounded-full bg-gradient-to-r" />
      </div>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--foreground-secondary)] md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
