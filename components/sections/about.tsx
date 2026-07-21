"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Languages,
  Lightbulb,
  Target,
  Sparkles,
  Dumbbell,
  Wrench,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/utils";

const funFactIcons = [Wrench, Lightbulb, Dumbbell];

export function About() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      {/* Subtle background accent */}
      <div className="via-accent-400/20 absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent" />

      <div className="section-container">
        <SectionHeading
          title="About Me"
          subtitle="Dari jaringan komputer ke software engineering — perjalanan saya membangun fondasi yang solid."
        />

        {/* Main content: Story + Photo */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Photo */}
          <motion.div {...fadeInUp} className="relative flex-shrink-0">
            <div className="shadow-card relative h-72 w-72 overflow-hidden rounded-2xl border border-[var(--border)] md:h-80 md:w-80">
              <Image
                src="/images/about-coding.jpg"
                alt="Foto Abudan sedang coding dengan VS Code di cafe"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 320px"
              />
              {/* Overlay gradient */}
              <div className="from-navy-950/40 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>

            {/* Location badge */}
            <div className="glass shadow-card absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2">
              <MapPin className="text-accent-400 h-4 w-4" />
              <span className="text-sm font-medium text-[var(--foreground)]">
                {siteConfig.location}
              </span>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div {...fadeInUp} className="flex-1">
            <h3 className="font-heading mb-4 text-xl font-semibold text-[var(--foreground)]">
              Perjalanan Saya
            </h3>
            {siteConfig.about.story.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="mb-4 text-base leading-relaxed text-[var(--foreground-secondary)] last:mb-0"
              >
                {paragraph}
              </p>
            ))}

            {/* Languages */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Languages className="text-accent-400 h-5 w-5" />
              {siteConfig.about.languages.map((lang) => (
                <span key={lang.name} className="text-sm text-[var(--foreground-secondary)]">
                  <span className="font-medium text-[var(--foreground)]">{lang.name}</span>
                  {" · "}
                  {lang.level}
                </span>
              ))}
            </div>

            {/* Remote badge */}
            <div className="mt-3 flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
              <MapPin className="h-4 w-4" />
              {siteConfig.locationNote}
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <motion.div {...fadeInUp}>
            <Card glow>
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-accent-400/10 flex h-10 w-10 items-center justify-center rounded-xl">
                  <Target className="text-accent-400 h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[var(--foreground)]">
                  Visi
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
                {siteConfig.about.vision}
              </p>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card glow>
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-accent-400/10 flex h-10 w-10 items-center justify-center rounded-xl">
                  <Sparkles className="text-accent-400 h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[var(--foreground)]">
                  Misi
                </h3>
              </div>
              <ul className="space-y-3">
                {siteConfig.about.mission.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[var(--foreground-secondary)]"
                  >
                    <span className="bg-accent-400 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Fun Facts */}
        <div className="mt-12">
          <h3 className="font-heading mb-6 text-center text-lg font-semibold text-[var(--foreground)]">
            Fun Facts
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {siteConfig.about.funFacts.map((fact, i) => {
              const Icon = funFactIcons[i] || Lightbulb;
              return (
                <motion.div key={i} {...fadeInUp}>
                  <Card className="text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
                      <Icon className="h-5 w-5 text-amber-400" />
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
                      {fact}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
