import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Project } from "@/lib/mdx";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    slug,
    category,
    shortDescription,
    techStack,
    featured,
    thumbnail,
  } = project.frontmatter;

  return (
    <Card hover className="flex h-full flex-col p-0 overflow-hidden bg-[var(--background)]">
      {/* Thumbnail placeholder or image */}
      <div className="relative aspect-video w-full bg-[var(--background-secondary)] flex items-center justify-center border-b border-[var(--border)] overflow-hidden group">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Folder className="h-12 w-12 text-[var(--foreground-muted)] transition-transform duration-300 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Badge variant="outline">{category}</Badge>
          {featured && <Badge variant="accent">Featured</Badge>}
        </div>

        <h3 className="font-heading text-xl font-semibold text-[var(--foreground)] mb-2 transition-colors hover:text-accent-400">
          <Link href={`/projects/${slug}`}>
            {/* Extended clickable area for better accessibility */}
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>

        <p className="mb-6 flex-1 text-sm text-[var(--foreground-secondary)] line-clamp-3">
          {shortDescription}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium text-[var(--foreground-muted)]"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="text-xs font-medium text-[var(--foreground-muted)]">
                +{techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-accent-400">
            Lihat Detail
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Card>
  );
}
