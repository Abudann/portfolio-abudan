"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

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
      className="group hover:shadow-soft relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--border-hover)]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 text-amber-500 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "text-accent-400 scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
