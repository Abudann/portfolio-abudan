# 🚀 Abudan — Personal Portfolio

Welcome to my personal portfolio repository! This website showcases my journey as a Software Engineer, my skills, and the projects I've built. 

🌍 **Live Demo:** [portfolio-abudan.vercel.app](https://portfolio-abudan.vercel.app) *(Replace with your actual Vercel link later)*

## ✨ Features

- **Modern & Responsive UI:** Built with Tailwind CSS v4 featuring glassmorphism, dynamic gradients, and micro-animations.
- **Dynamic Projects (MDX):** All projects are managed using simple Markdown (`.mdx`) files inside the `content/projects/` directory. No database required!
- **Smooth Animations:** Powered by Framer Motion with full accessibility support (`prefers-reduced-motion`).
- **Dark/Light Mode:** Seamless theme switching with automatic system preference detection.
- **Spam-Protected Contact Form:** Integrated with Cloudflare Turnstile to prevent bot submissions.
- **SEO Optimized:** Dynamic Open Graph (OG) images, auto-generated `robots.txt`, and metadata handling.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Content:** `next-mdx-remote`
- **Security:** Cloudflare Turnstile

## 💻 Running Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-abudan.git
   cd portfolio-abudan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables (Optional)**
   If you want to test the Cloudflare Turnstile integration locally, create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
   TURNSTILE_SECRET_KEY=your_secret_key
   ```
   *(If not provided, the contact form will use a default testing key).*

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 How to Add a New Project

Adding a new project is incredibly simple thanks to the MDX architecture. 

1. Navigate to the `content/projects/` folder.
2. Create a new file, for example, `my-new-app.mdx`.
3. Add the following metadata (*frontmatter*) at the top of the file:

```yaml
---
title: "My New App"
slug: "my-new-app"
category: "Web App"
role: "Fullstack Developer"
techStack: ["React", "Next.js", "Tailwind"]
timeline: "August 2026"
status: "Completed"
shortDescription: "A brief 2-sentence description of the project."
problem: "What problem did this project solve?"
solution: "How did you solve it?"
features: ["Feature 1", "Feature 2"]
challenges: "What was difficult?"
lessonsLearned: "What did you learn?"
order: 5
featured: true
thumbnail: "/images/my-app-thumbnail.png"
---
```
4. Write any additional markdown content below the frontmatter. It will automatically be rendered on the project's detail page!

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
