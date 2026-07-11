import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <h1 className="font-heading text-8xl font-black tracking-tighter text-[var(--foreground-muted)] opacity-20 sm:text-[12rem]">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-2xl font-bold text-[var(--foreground)] sm:text-4xl">
            Halaman Tidak Ditemukan
          </span>
        </div>
      </div>

      <p className="mb-8 max-w-md text-base text-[var(--foreground-secondary)] sm:text-lg">
        Maaf, halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau sementara tidak
        tersedia.
      </p>

      <Link href="/">
        <Button variant="primary" size="lg">
          <Home className="h-4 w-4" />
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}
