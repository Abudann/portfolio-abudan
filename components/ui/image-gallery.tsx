"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close lightbox on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    },
    [selectedImage]
  );

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, handleKeyDown]);

  if (!images || images.length === 0) return null;

  return (
    <div className="mb-16">
      <h2 className="font-heading mb-6 text-2xl font-bold text-[var(--foreground)]">
        Galeri Tampilan
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((imgSrc, i) => (
          <div
            key={i}
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] transition-all hover:border-accent-400/50"
            onClick={() => setSelectedImage(imgSrc)}
            role="button"
            tabIndex={0}
            aria-label={`Lihat ${title} Screenshot ${i + 1} dalam ukuran penuh`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedImage(imgSrc);
              }
            }}
          >
            <Image
              src={imgSrc}
              alt={`${title} Screenshot ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — Tampilan gambar penuh`}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:top-8 sm:right-8"
              aria-label="Tutup galeri gambar"
              autoFocus
            >
              <X className="h-6 w-6" />
            </button>

            {/* Full-size Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt={`${title} Fullscreen Screenshot`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
