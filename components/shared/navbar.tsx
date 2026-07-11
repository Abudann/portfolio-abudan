"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track scroll position for navbar background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Close mobile menu on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-navbar-bg border-b border-border backdrop-blur-xl shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav
        className="section-container flex h-16 items-center justify-between md:h-18"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo / Name */}
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors hover:text-accent-400"
        >
          {siteConfig.name}
          <span className="text-accent-400">.</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                activeSection === link.href.replace("#", "")
                  ? "text-accent-400"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
            >
              {link.label}
              {/* Active indicator */}
              {activeSection === link.href.replace("#", "") && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent-400" />
              )}
            </a>
          ))}

          <div className="ml-4 flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/cv/Abudan_CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-accent-400 px-4 py-2 text-sm font-semibold text-navy-950 transition-all duration-200 hover:bg-accent-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-glass-bg backdrop-blur-sm transition-all duration-200 hover:border-border-hover"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed top-16 right-0 bottom-0 z-50 w-72 border-l border-border bg-background p-6 shadow-elevated transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                activeSection === link.href.replace("#", "")
                  ? "bg-accent-400/10 text-accent-400"
                  : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <a
            href="/cv/Abudan_CV.pdf"
            download
            onClick={closeMobileMenu}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-400 px-4 py-3 text-sm font-semibold text-navy-950 transition-all duration-200 hover:bg-accent-300"
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  );
}
