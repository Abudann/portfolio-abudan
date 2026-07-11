import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  category: string;
  role: string;
  techStack: string[];
  timeline: string;
  status: "Completed" | "In Progress" | "Maintained";
  shortDescription: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  lessonsLearned: string;
  demoUrl?: string;
  githubUrl?: string;
  thumbnail?: string;
  screenshots?: string[];
  featured?: boolean;
  order: number;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
}

/**
 * Get all project slugs for generateStaticParams
 */
export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

/**
 * Get all projects, sorted by order field
 */
export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);

  return projects;
}
