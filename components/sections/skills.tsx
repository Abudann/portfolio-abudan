"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { Code2, Database, Globe, Layout, Server, Terminal, Wrench, Users } from "lucide-react";

const skillsData = [
  {
    category: "Frontend",
    icon: Layout,
    items: [
      { name: "React", level: 85, levelText: "Advanced" },
      { name: "JavaScript", level: 90, levelText: "Advanced" },
      { name: "Tailwind CSS", level: 85, levelText: "Advanced" },
      { name: "Bootstrap", level: 80, levelText: "Intermediate" },
      { name: "Blade (Laravel)", level: 80, levelText: "Intermediate" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", level: 85, levelText: "Advanced" },
      { name: "Express", level: 85, levelText: "Advanced" },
      { name: "PHP", level: 80, levelText: "Intermediate" },
      { name: "Laravel", level: 80, levelText: "Intermediate" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    items: [
      { name: "MySQL", level: 85, levelText: "Advanced" },
      { name: "PostgreSQL", level: 60, levelText: "Learning" },
    ],
  },
  {
    category: "DevOps & Tools",
    icon: Terminal,
    items: [
      { name: "Git & GitHub", level: 85, levelText: "Advanced" },
      { name: "Linux (Fedora)", level: 90, levelText: "Advanced" },
      { name: "Vercel", level: 75, levelText: "Intermediate" },
      { name: "Postman", level: 80, levelText: "Intermediate" },
      { name: "Cisco Packet Tracer", level: 70, levelText: "Intermediate" },
    ],
  },
  {
    category: "Soft Skills",
    icon: Users,
    items: [
      { name: "Problem Solving", level: 90, levelText: "Advanced" },
      { name: "Project Leadership", level: 85, levelText: "Advanced" },
      { name: "Team Collaboration", level: 90, levelText: "Advanced" },
      { name: "Communication", level: 85, levelText: "Advanced" },
    ],
  },
];

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? {}
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      };

  const itemVariants = prefersReducedMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };

  return (
    <section id="skills" className="bg-[var(--background-secondary)] py-24">
      <div className="section-container">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Teknologi dan tools yang saya gunakan untuk membangun solusi digital."
        />

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillsData.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.category} variants={itemVariants as any}>
                <Card className="h-full bg-[var(--background)]">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="bg-accent-400/10 flex h-10 w-10 items-center justify-center rounded-xl">
                      <Icon className="text-accent-400 h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-[var(--foreground)]">
                      {category.category}
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {category.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="mb-1.5 flex justify-between text-sm">
                          <span className="font-medium text-[var(--foreground)]">{skill.name}</span>
                          <span className="text-[var(--foreground-muted)]">{skill.levelText}</span>
                        </div>
                        {/* Progress Bar Container */}
                        <div
                          className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]"
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} skill level`}
                        >
                          {/* Progress Bar Fill */}
                          <motion.div
                            className="bg-accent-400 h-full rounded-full"
                            initial={
                              prefersReducedMotion ? { width: `${skill.level}%` } : { width: 0 }
                            }
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
