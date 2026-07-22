"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/utils";

export function Certificates() {
  const prefersReducedMotion = useReducedMotion();

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
    <section id="certificates" className="bg-[var(--background)] py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          title="Certificates"
          subtitle="Beberapa sertifikasi dan pelatihan yang telah saya selesaikan untuk memvalidasi kemampuan teknis."
        />

        <motion.div
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {siteConfig.certificates.map((cert, index) => (
            <motion.div
              key={index}
              variants={prefersReducedMotion ? undefined : itemVariants}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)]/50 bg-[var(--background-secondary)]/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-[var(--accent-400)]/30 hover:bg-[var(--background-secondary)]/60 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_40px_-15px_rgba(255,255,255,0.05)]"
            >
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20"
                  aria-label={`View certificate for ${cert.title}`}
                >
                  <span className="sr-only">View certificate for {cert.title}</span>
                </a>
              )}

              {/* Premium Glow Effect */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--accent-400)]/10 blur-[50px] transition-all duration-500 group-hover:bg-[var(--accent-400)]/20" />
              <div className="absolute -bottom-20 -left-20 h-32 w-32 rounded-full bg-[var(--accent-400)]/5 blur-[40px] transition-all duration-700 group-hover:bg-[var(--accent-400)]/10" />

              <div>
                <div className="mb-4 flex items-center justify-between relative z-10">
                  <div className="bg-accent-400/10 flex h-10 w-10 items-center justify-center rounded-xl">
                    <Award className="text-accent-400 h-5 w-5" />
                  </div>
                  {cert.credentialUrl && (
                    <div className="text-[var(--foreground-muted)] group-hover:text-accent-400 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <h3 className="font-heading mb-2 text-lg font-bold leading-tight text-[var(--foreground)] group-hover:text-accent-400 transition-colors">
                  {cert.title}
                </h3>
                
                <p className="mb-4 text-sm font-medium text-[var(--foreground-secondary)]">
                  {cert.issuer}
                </p>
              </div>

              <div className="mt-auto border-t border-[var(--border)] pt-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--foreground-muted)]">
                  <span>{cert.date}</span>
                  {cert.credentialId !== "-" && (
                    <span className="font-mono">ID: {cert.credentialId}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
