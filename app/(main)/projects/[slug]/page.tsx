import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Folder } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ui/image-gallery";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { GitHubIcon } from "@/components/ui/icons";

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Not Found" };

  return {
    title: `${project.frontmatter.title} — Project Detail`,
    description: project.frontmatter.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <article className="py-24 md:py-32">
      <div className="section-container max-w-4xl">
        {/* Back navigation */}
        <Link
          href="/#projects"
          className="hover:text-accent-400 mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground-secondary)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <Badge variant="outline">{frontmatter.category}</Badge>
            <span className="text-accent-400 text-sm font-medium">{frontmatter.timeline}</span>
          </div>

          <h1 className="font-heading mb-6 text-4xl font-bold text-[var(--foreground)] md:text-5xl">
            {frontmatter.title}
          </h1>

          <div className="mb-8 flex flex-wrap gap-4">
            {frontmatter.demoUrl && (
              <a href={frontmatter.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </a>
            )}
            {frontmatter.githubUrl && (
              <a href={frontmatter.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm">
                  <GitHubIcon className="h-4 w-4" />
                  Source Code
                </Button>
              </a>
            )}
          </div>

          {/* Hero Thumbnail */}
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)]">
            {frontmatter.thumbnail ? (
              <Image
                src={frontmatter.thumbnail}
                alt={frontmatter.title}
                fill
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-cover"
                priority
              />
            ) : (
              <Folder className="h-20 w-20 text-[var(--foreground-muted)] opacity-50" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/40 to-transparent" />
          </div>
        </header>

        {/* Core Metadata */}
        <div className="mb-16 grid gap-8 rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-6 md:grid-cols-2 md:p-8">
          <div>
            <h3 className="mb-2 text-sm font-semibold tracking-wider text-[var(--foreground-muted)] uppercase">
              Peran Saya
            </h3>
            <p className="font-medium text-[var(--foreground)]">{frontmatter.role}</p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold tracking-wider text-[var(--foreground-muted)] uppercase">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {frontmatter.techStack.map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Structured Content (Problem, Solution, etc.) */}
        <div className="prose prose-zinc dark:prose-invert mb-16 max-w-none">
          <h2 className="font-heading mt-8 mb-4 text-2xl font-bold text-[var(--foreground)]">
            Latar Belakang
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-error mb-2 text-lg font-semibold">Problem</h3>
              <p className="text-[var(--foreground-secondary)]">{frontmatter.problem}</p>
            </div>
            <div>
              <h3 className="text-success mb-2 text-lg font-semibold">Solution</h3>
              <p className="text-[var(--foreground-secondary)]">{frontmatter.solution}</p>
            </div>
          </div>

          <h2 className="font-heading mt-12 mb-4 text-2xl font-bold text-[var(--foreground)]">
            Fitur Utama
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-[var(--foreground-secondary)]">
            {frontmatter.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="border-accent-400/20 bg-accent-400/5 rounded-xl border p-6">
              <h3 className="font-heading text-accent-400 mb-3 text-xl font-semibold">Tantangan</h3>
              <p className="text-[var(--foreground-secondary)]">{frontmatter.challenges}</p>
            </div>
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-6">
              <h3 className="font-heading mb-3 text-xl font-semibold text-amber-500">
                Lessons Learned
              </h3>
              <p className="text-[var(--foreground-secondary)]">{frontmatter.lessonsLearned}</p>
            </div>
          </div>
        </div>

        {/* Screenshots Gallery */}
        {frontmatter.screenshots && frontmatter.screenshots.length > 0 && (
          <ImageGallery images={frontmatter.screenshots} title={frontmatter.title} />
        )}

        {/* Render MDX content (usually deeper details if provided) */}
        <div className="prose prose-zinc dark:prose-invert prose-headings:font-heading prose-a:text-accent-400 hover:prose-a:text-accent-300 max-w-none">
          <MDXRemote source={content} />
        </div>
      </div>
    </article>
  );
}
