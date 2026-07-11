import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { BackToTop } from "@/components/shared/back-to-top";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="focus:bg-accent-400 focus:text-navy-950 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" role="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
