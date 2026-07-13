"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import { Send, MapPin, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/utils";
import { LinkedInIcon, WhatsAppIcon, GitHubIcon } from "@/components/ui/icons";

export function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      alert("Please complete the captcha.");
      return;
    }

    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      token,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const fadeInUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <section id="contact" className="bg-[var(--background)] py-24">
      <div className="section-container max-w-5xl">
        <SectionHeading
          title="Get in Touch"
          subtitle="Punya proyek menarik, pertanyaan, atau sekadar ingin menyapa? Jangan ragu untuk menghubungi saya."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <motion.div {...(fadeInUp as any)}>
            <h3 className="font-heading mb-6 text-2xl font-bold text-[var(--foreground)]">
              Mari Berkolaborasi
            </h3>
            <p className="mb-8 leading-relaxed text-[var(--foreground-secondary)]">
              Saya selalu terbuka untuk mendiskusikan peluang proyek web development, kolaborasi,
              atau peran fullstack developer. Hubungi saya melalui form di samping atau langsung
              lewat kontak di bawah.
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="group hover:text-accent-400 flex items-center gap-4 text-[var(--foreground-secondary)] transition-colors"
              >
                <div className="group-hover:bg-accent-400/10 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--background-secondary)] transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Email</p>
                  <p className="text-sm">{siteConfig.social.email}</p>
                </div>
              </a>

              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:text-success flex items-center gap-4 text-[var(--foreground-secondary)] transition-colors"
              >
                <div className="group-hover:bg-success/10 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--background-secondary)] transition-colors">
                  <WhatsAppIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">WhatsApp</p>
                  <p className="text-sm">Klik untuk chat</p>
                </div>
              </a>

              <div className="group flex items-center gap-4 text-[var(--foreground-secondary)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--background-secondary)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Lokasi</p>
                  <p className="text-sm">{siteConfig.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-[var(--foreground-muted)] uppercase">
                Social Media
              </h4>
              <div className="flex gap-4">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:border-accent-400 hover:text-accent-400 hover:bg-accent-400/5 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground-secondary)] transition-all"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:border-accent-400 hover:text-accent-400 hover:bg-accent-400/5 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground-secondary)] transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div {...(fadeInUp as any)} className="glass rounded-2xl p-6 md:p-8">
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="bg-success/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <CheckCircle2 className="text-success h-8 w-8" />
                </div>
                <h3 className="font-heading mb-2 text-2xl font-bold text-[var(--foreground)]">
                  Pesan Terkirim!
                </h3>
                <p className="mb-6 text-[var(--foreground-secondary)]">
                  Terima kasih telah menghubungi. Saya akan membalas pesan Anda secepatnya.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Kirim Pesan Lagi
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-[var(--foreground)]">
                      Nama <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="focus:border-accent-400 focus:ring-accent-400 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--foreground)] transition-colors focus:ring-1 focus:outline-none"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">
                      Email <span className="text-error">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="focus:border-accent-400 focus:ring-accent-400 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--foreground)] transition-colors focus:ring-1 focus:outline-none"
                      placeholder="email@anda.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-sm font-medium text-[var(--foreground)]">
                    Subjek <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="focus:border-accent-400 focus:ring-accent-400 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--foreground)] transition-colors focus:ring-1 focus:outline-none"
                    placeholder="Subjek Pesan"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--foreground)]">
                    Pesan <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="focus:border-accent-400 focus:ring-accent-400 resize-y rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--foreground)] transition-colors focus:ring-1 focus:outline-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                {/* Cloudflare Turnstile */}
                <div className="mt-2 flex justify-center overflow-hidden sm:justify-start">
                  <Turnstile
                    siteKey={turnstileSiteKey}
                    onSuccess={setToken}
                    options={{
                      theme: "auto",
                    }}
                  />
                </div>

                {status === "error" && (
                  <p className="text-error mt-2 text-sm font-medium">
                    Gagal mengirim pesan. Silakan coba lagi atau hubungi via email/WhatsApp.
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="mt-4 w-full"
                  disabled={status === "loading" || !token}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
