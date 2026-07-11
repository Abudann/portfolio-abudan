import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "Abudan — Software Engineer Portfolio",
    template: "%s | Abudan",
  },
  description:
    "Portfolio Abudan — Fullstack Web Developer yang membangun aplikasi web dari front-end sampai back-end menggunakan React, Node.js, dan Laravel.",
  keywords: [
    "Abudan",
    "Software Engineer",
    "Fullstack Web Developer",
    "React Developer",
    "Node.js Developer",
    "Laravel Developer",
    "Portfolio",
    "Jakarta",
    "Indonesia",
  ],
  authors: [{ name: "Abudan" }],
  creator: "Abudan",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Abudan Portfolio",
    title: "Abudan — Software Engineer Portfolio",
    description:
      "Fullstack Web Developer yang membangun aplikasi web dari front-end sampai back-end menggunakan React, Node.js, dan Laravel.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abudan — Software Engineer Portfolio",
    description:
      "Fullstack Web Developer yang membangun aplikasi web dari front-end sampai back-end menggunakan React, Node.js, dan Laravel.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
