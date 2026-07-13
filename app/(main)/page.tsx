import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { getAllProjects } from "@/lib/mdx";

export default async function Home() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects projects={projects} />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
