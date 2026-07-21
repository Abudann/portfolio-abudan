"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/utils";

export function Education() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUpProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" as const },
    transition: { duration: 0.5, ease: "easeOut" as const },
  };

  return (
    <section id="education" className="bg-[var(--background-secondary)] py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          title="Education"
          subtitle="Fondasi akademik yang membentuk kemampuan teknis saya."
        />

        <div className="mx-auto grid max-w-3xl gap-6">
          {siteConfig.education.map((edu, index) => (
            <motion.div
              key={index}
              {...(prefersReducedMotion ? {} : fadeInUpProps)}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 transition-all hover:border-[var(--accent-400)]/30 md:p-8"
            >
              {/* Accent decoration */}
              <div className="from-accent-400/20 absolute top-0 left-0 h-full w-1 bg-gradient-to-b to-transparent" />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                {/* Icon */}
                <div className="bg-accent-400/10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl">
                  <GraduationCap className="text-accent-400 h-7 w-7" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline">
                      {edu.startYear} — {edu.endYear}
                    </Badge>
                    {"gpa" in edu && (
                      <Badge variant="success" className="gap-1">
                        <Award className="h-3 w-3" />
                        GPA {edu.gpa}
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-heading mb-1 text-xl font-bold text-[var(--foreground)]">
                    {edu.institution}
                  </h3>
                  <p className="text-accent-400 mb-1 text-sm font-semibold">{edu.degree}</p>
                  <p className="mb-3 text-sm text-[var(--foreground-muted)]">
                    Fokus: {edu.focus}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
