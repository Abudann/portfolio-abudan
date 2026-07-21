"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { Project } from "@/lib/mdx";

interface ProjectsProps {
  projects: Project[];
}

const CATEGORIES = ["All", "Web App", "Dashboard", "Marketplace"];

export function Projects({ projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.frontmatter.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <SectionHeading
          title="Featured Projects"
          subtitle="Beberapa studi kasus dari proyek yang pernah saya kerjakan, dari ide hingga live production."
        />

        {/* Filter Tabs */}
        <div
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                aria-controls="project-grid"
                onClick={() => setActiveCategory(category)}
                className={`focus-visible:outline-accent-400 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isActive
                    ? "bg-accent-400 text-navy-950 shadow-md"
                    : "bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:bg-[var(--border-hover)] hover:text-[var(--foreground)]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <motion.div
          id="project-grid"
          role="tabpanel"
          key={activeCategory}
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.frontmatter.slug}
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="relative"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-[var(--foreground-muted)]">
              Tidak ada project di kategori ini.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
