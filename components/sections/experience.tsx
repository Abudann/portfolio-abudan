"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/utils";

export function Experience() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUpProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" as const },
    transition: { duration: 0.5, ease: "easeOut" as const },
  };

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          title="Experience"
          subtitle="Perjalanan profesional saya — dari jaringan komputer hingga web development."
        />

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute top-0 left-4 h-full w-px bg-[var(--border)] md:left-1/2 md:-translate-x-px" />

          {siteConfig.experience.map((exp, index) => (
            <motion.div
              key={index}
              {...(prefersReducedMotion ? {} : fadeInUpProps)}
              className={`relative mb-12 flex flex-col last:mb-0 md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute top-0 left-4 z-10 md:left-1/2 md:-translate-x-1/2">
                <div className="bg-accent-400 flex h-8 w-8 items-center justify-center rounded-full shadow-lg">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Card */}
              <div
                className={`ml-16 w-full rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-6 transition-all hover:border-[var(--accent-400)]/30 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
                }`}
              >
                {/* Header */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{exp.type}</Badge>
                  <span className="text-accent-400 text-sm font-medium">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>

                <h3 className="font-heading mb-1 text-lg font-bold text-[var(--foreground)]">
                  {exp.position}
                </h3>
                <p className="mb-3 text-sm font-medium text-[var(--foreground-secondary)]">
                  {exp.company}
                </p>

                <div className="mb-3 flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                  <MapPin className="h-3 w-3" />
                  {exp.location}
                </div>

                <p className="mb-4 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <ul className="mb-4 space-y-1.5">
                  {exp.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[var(--foreground-secondary)]"
                    >
                      <span className="bg-accent-400 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.techStack.map((tech) => (
                    <Badge key={tech} variant="default" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
