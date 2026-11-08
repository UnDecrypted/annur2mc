"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

// Tipe data untuk item galeri
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  type: "image" | "video";
  src: string; // Path gambar atau video
  thumbnail?: string; // Gambar pratinjau untuk thumbnail (opsional, khusus video)
  description: string;
}

// Data media (Bisa campur gambar dan video)
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "LOBBY UTAMA SERVER",
    category: "SPAWN AREA",
    type: "image",
    src: "/gallery/rodok.png",
    description: "Area spawn tempat awal berkumpul para santri dan pemain ANNUR2MC.",
  },
  {
    id: 2,
    title: "TRAILER EVENT SURVIVAL",
    category: "CINEMATIC VIDEO",
    type: "video",
    src: "/gallery/trailer.mp4", // Masukkan file mp4 kamu di public/gallery/
    thumbnail: "/gallery/pesantren.jpg", // Thumbnail saat di list bawah
    description: "Cuplikan video sinematik perlombaan survival games antarsantri.",
  },
  {
    id: 3,
    title: "PESANTREN REPLICA",
    category: "BUILDING",
    type: "image",
    src: "/gallery/pesantren.jpg",
    description: "Replika arsitektur Pondok Pesantren Annur 2 Almurtadlo di dalam Minecraft.",
  },
  {
    id: 4,
    title: "NETHER HUB & RAILWAY",
    category: "INFRASTRUCTURE",
    type: "image",
    src: "/gallery/nether.jpg",
    description: "Jaringan transportasi cepat antardesa di dalam dunia Nether.",
  },
];

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  // Deteksi gestur swipe / drag jari atau mouse
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0A0A] text-white font-mono flex flex-col justify-between py-8 px-4 sm:py-12 sm:px-6 select-none">
      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col justify-center">
        
        {/* Header Section */}
        <div className="flex flex-row items-end justify-between border-b border-white/10 pb-4 mb-6 sm:pb-6 sm:mb-8">
          <div>
            <span className="text-[9px] sm:text-[10px] text-[#737373] tracking-[0.3em] uppercase block mb-1">
              // ANNUR2MC MEDIA
            </span>
            <h1 className="text-xl sm:text-4xl font-bold tracking-tight uppercase">
              SERVER GALLERY
            </h1>
          </div>
          <div className="text-right text-xs text-[#737373]">
            <span className="font-[family-name:var(--font-press-start)] text-white text-xs sm:text-sm">
              0{currentIndex + 1}
            </span>
            <span className="mx-2">/</span>
            <span>0{galleryItems.length}</span>
          </div>
        </div>

        {/* Carousel Utama (Support Gambar & Video) */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] bg-[#141414] border border-white/10 rounded-lg sm:rounded-sm overflow-hidden touch-pan-y">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="relative w-full h-full cursor-grab active:cursor-grabbing"
            >
              {currentItem.type === "video" ? (
                <video
                  src={currentItem.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <Image
                  src={currentItem.src}
                  alt={currentItem.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                />
              )}

              {/* Gradient Overlay & Info Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-10 pointer-events-none">
                <span className="text-[9px] sm:text-[10px] text-white/60 tracking-[0.2em] uppercase mb-1">
                  [{currentItem.category}] • {currentItem.type.toUpperCase()}
                </span>
                <h2 className="text-base sm:text-2xl font-bold uppercase tracking-wider text-white mb-1 sm:mb-2">
                  {currentItem.title}
                </h2>
                <p className="text-[11px] sm:text-sm text-[#A3A3A3] max-w-xl line-clamp-2 leading-tight">
                  {currentItem.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Selector (Grid 2 Kolom di HP, 4 Kolom di Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-4 sm:mt-6">
          {galleryItems.map((item, index) => {
            // Gunakan thumbnail khusus jika tersedia, atau gambar/src utama
            const thumbSrc = item.thumbnail || item.src;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-[16/9] border transition-all overflow-hidden cursor-pointer rounded-sm bg-[#141414] ${
                  index === currentIndex
                    ? "border-white opacity-100 ring-2 ring-white/30"
                    : "border-white/10 opacity-40 hover:opacity-80"
                }`}
              >
                {item.type === "video" ? (
                  <div className="relative w-full h-full">
                    {/* Render thumbnail gambar jika ada, atau video frame */}
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 300px"
                      />
                    ) : (
                      <video
                        src={item.src}
                        muted
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    )}
                    {/* Badge / Ikon Play Video */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-white opacity-80" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 300px"
                  />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}