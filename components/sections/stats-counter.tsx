"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/utils";
import { FolderCheck, Clock, Layers } from "lucide-react";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
}

function StatItem({ icon: Icon, value, suffix = "", label }: StatItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Animate counter
          const duration = 1500;
          const steps = 40;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefersReducedMotion]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 px-6 py-4">
      <Icon className="text-accent-400 mb-1 h-6 w-6" />
      <span className="font-heading text-3xl font-bold text-[var(--foreground)] md:text-4xl">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-[var(--foreground-muted)]">{label}</span>
    </div>
  );
}

export function StatsCounter() {
  const stats = [
    {
      icon: FolderCheck,
      value: siteConfig.stats.projectsCompleted,
      suffix: "+",
      label: "Projects Completed",
    },
    {
      icon: Clock,
      value: siteConfig.stats.yearsLearning,
      suffix: "+",
      label: "Years Learning",
    },
    {
      icon: Layers,
      value: siteConfig.stats.techStackMastered,
      suffix: "+",
      label: "Tech Stack",
    },
  ];

  return (
    <div className="glass mx-auto flex max-w-2xl flex-col items-center justify-center divide-y divide-[var(--border)] rounded-2xl sm:flex-row sm:divide-x sm:divide-y-0">
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}
