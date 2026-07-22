import { Mail, Heart } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/utils";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  {
    href: siteConfig.social.github,
    label: "GitHub",
    icon: GitHubIcon,
  },
  {
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: siteConfig.social.email,
    label: "Email",
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--background-secondary)]"
      role="contentinfo"
    >
      <div className="section-container py-12 md:py-16">
        {/* Top section */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="font-heading text-xl font-bold text-[var(--foreground)]">
              {siteConfig.name}
              <span className="text-accent-400">.</span>
            </span>
            <p className="mt-2 max-w-xs text-sm text-[var(--foreground-muted)]">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-accent-400 text-sm text-[var(--foreground-secondary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="hover:border-accent-400 hover:text-accent-400 hover:shadow-soft flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground-secondary)] transition-all duration-200"
                  aria-label={`Visit ${link.label}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-[var(--border)]" />

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="flex items-center gap-1 text-sm text-[var(--foreground-muted)]">
            © {currentYear} {siteConfig.name}. All rights reserved.{" "}
            <span className="hidden px-1 md:inline">•</span>{" "}
            <a href="/privacy" className="hover:text-accent-400 transition-colors">
              Privacy Policy
            </a>
          </p>
          <p className="flex items-center gap-1 text-sm text-[var(--foreground-muted)]">
            Built with <Heart className="text-error inline h-3.5 w-3.5" fill="currentColor" /> using
            Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
