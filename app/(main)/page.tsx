import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Certificates } from "@/components/sections/certificates";
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

      {/* Experience Section */}
      <Experience />

      {/* Education Section */}
      <Education />

      {/* Certificates Section */}
      <Certificates />

      {/* Projects Section */}
      <Projects projects={projects} />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
