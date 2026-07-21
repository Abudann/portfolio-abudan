"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TypingTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypingText({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  className,
}: TypingTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentText = texts[textIndex] || "";

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, speed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, deleteSpeed);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseDuration, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{texts[0]}</span>;
  }

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="bg-accent-400 ml-0.5 inline-block h-[1em] w-[2px] align-text-bottom"
        aria-hidden="true"
      />
    </span>
  );
}
