"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm"
        aria-label="Toggle theme"
      >
        <span className="h-5 w-5" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-soft"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100 text-amber-500"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark
            ? "rotate-0 scale-100 opacity-100 text-accent-400"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
