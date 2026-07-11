"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`shadow-card hover:border-accent-400 hover:shadow-elevated fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Scroll back to top"
    >
      <ArrowUp className="text-accent-400 h-5 w-5" />
    </button>
  );
}
