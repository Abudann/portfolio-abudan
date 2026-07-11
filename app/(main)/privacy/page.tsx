import { siteConfig } from "@/lib/utils";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Abudan's Portfolio website.",
};

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <article className="py-24 md:py-32">
      <div className="section-container max-w-3xl">
        <h1 className="font-heading mb-8 text-4xl font-bold text-[var(--foreground)] md:text-5xl">
          Privacy Policy
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-[var(--foreground-secondary)]">
          <p>
            Last updated: <strong>{currentYear}</strong>
          </p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to my personal portfolio website ({siteConfig.name}). I respect your privacy and
            am committed to protecting any personal data you may provide while visiting this site.
          </p>

          <h2>2. Data Collection</h2>
          <p>
            This website does not use cookies for tracking or advertising purposes. However, when
            you use the Contact Form, the following information is collected solely for the purpose
            of communicating with you:
          </p>
          <ul>
            <li>Your Name</li>
            <li>Your Email Address</li>
            <li>The content of your message</li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <p>
            To prevent spam and abuse on the contact form, this website uses{" "}
            <strong>Cloudflare Turnstile</strong>. Cloudflare may collect standard web log
            information and data about your interaction with the Turnstile widget to determine
            whether you are a human or a bot. Please refer to Cloudflare's privacy policy for more
            information.
          </p>
          <p>
            This website is hosted on Vercel, which may collect basic server logs and analytics data
            to monitor the health and performance of the infrastructure.
          </p>

          <h2>4. Data Usage and Retention</h2>
          <p>
            Any information submitted through the contact form is sent directly to my personal email
            address ({siteConfig.social.email}). The data is not stored in any database on this
            server. I will only use this information to reply to your inquiry.
          </p>

          <h2>5. Contact Me</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact me via
            email at{" "}
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="text-accent-400 hover:underline"
            >
              {siteConfig.social.email}
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
