"use client";

import Image from "next/image";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Mail, ChevronDown, Download, FolderOpen } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/shared/typing-text";
import { siteConfig } from "@/lib/utils";
import { StatsCounter } from "./stats-counter";

const socialLinks = [
  {
    href: siteConfig.social.github,
    label: "GitHub",
    icon: GitHubIcon,
    external: true,
  },
  {
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
    external: true,
  },
  {
    href: siteConfig.social.email,
    label: "Email",
    icon: Mail,
    external: false,
  },
  {
    href: siteConfig.social.whatsapp,
    label: "WhatsApp",
    icon: WhatsAppIcon,
    external: true,
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const MotionWrapper = prefersReducedMotion ? "div" : motion.div;
  const MotionItem = prefersReducedMotion ? "div" : motion.div;

  const containerProps = prefersReducedMotion
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden",
        animate: "visible",
      };

  const itemProps = prefersReducedMotion ? {} : { variants: itemVariants };

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background layers */}
      <div className="bg-mesh absolute inset-0" />
      <div className="bg-grid absolute inset-0 opacity-40" />

      {/* Gradient orb decorations */}
      <div className="bg-accent-400/5 absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-accent-500/5 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl" />

      <div className="section-container relative z-10 w-full py-20 pt-24">
        <MotionWrapper
          {...containerProps}
          className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
        >
          {/* Text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Available badge */}
            <MotionItem {...itemProps}>
              {siteConfig.availableForWork && (
                <Badge variant="success" className="mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse-dot bg-success absolute inline-flex h-full w-full rounded-full opacity-75" />
                    <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  Available for Work
                </Badge>
              )}
            </MotionItem>

            {/* Greeting + Name */}
            <MotionItem {...itemProps}>
              <p className="text-base text-[var(--foreground-secondary)] md:text-lg">Halo, saya</p>
              <h1 className="font-heading mt-2 text-5xl font-bold tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
                {siteConfig.name}
                <span className="text-accent-400">.</span>
              </h1>
            </MotionItem>

            {/* Typing text roles */}
            <MotionItem {...itemProps}>
              <div className="text-accent-400 mt-4 text-xl font-medium md:text-2xl">
                <TypingText texts={[...siteConfig.roles]} />
              </div>
            </MotionItem>

            {/* Tagline */}
            <MotionItem {...itemProps}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--foreground-secondary)] md:text-lg">
                {siteConfig.tagline}
              </p>
            </MotionItem>

            {/* CTA buttons */}
            <MotionItem {...itemProps}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#projects">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    <FolderOpen className="h-4 w-4" />
                    Lihat Project
                  </Button>
                </a>
                <a href="/cv/Abudan_CV.pdf" download>
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    <Download className="h-4 w-4" />
                    Download CV
                  </Button>
                </a>
              </div>
            </MotionItem>

            {/* Social links */}
            <MotionItem {...itemProps}>
              <div className="mt-8 flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="hover:border-accent-400 hover:text-accent-400 hover:shadow-soft flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--glass-bg)] text-[var(--foreground-secondary)] backdrop-blur-sm transition-all duration-200 hover:scale-105"
                      aria-label={link.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </MotionItem>
          </div>

          {/* Profile photo */}
          <MotionItem {...itemProps} className="relative flex-shrink-0">
            <div className="relative">
              {/* Glow ring */}
              <div className="from-accent-400/30 via-accent-500/10 absolute -inset-2 rounded-full bg-gradient-to-br to-amber-400/20 blur-lg" />

              {/* Photo container */}
              <div className="border-accent-400/20 shadow-elevated relative h-64 w-64 overflow-hidden rounded-full border-2 md:h-80 md:w-80 lg:h-96 lg:w-96">
                <Image
                  src="/images/abudan-formal.png"
                  alt="Foto profil Abudan — Software Engineer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Decorative dot */}
              <div className="bg-accent-400 absolute top-8 -right-2 h-4 w-4 rounded-full shadow-lg" />
              <div className="absolute bottom-12 -left-3 h-3 w-3 rounded-full bg-amber-400 shadow-lg" />
            </div>
          </MotionItem>
        </MotionWrapper>

        {/* Stats counter */}
        <div className="mt-16 lg:mt-20">
          <StatsCounter />
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#about"
            className="hover:text-accent-400 flex flex-col items-center gap-2 text-[var(--foreground-muted)] transition-colors"
            aria-label="Scroll to About section"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="animate-bounce-subtle h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
