"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const builders = [
  {
    id: 1,
    name: "AHMAD FAUZI",
    role: "LEAD BUILDER / ARCHITECT",
    image: "/gallery/pesantren.jpg",
    quote: "Membangun replika Annur 2 di Minecraft memberikan tantangan tersendiri untuk mencerminkan detail arsitektur asli pesantren ke dalam bentuk balok digital.",
  },
  {
    id: 2,
    name: "M. RIZKY",
    role: "REDSTONE & INFRASTRUCTURE",
    image: "/gallery/nether.jpg",
    quote: "Fokus saya memastikan jaringan transportasi Nether Hub dan sistem otomatisasi server berjalan lancar demi kenyamanan para pemain.",
  },
  {
    id: 3,
    name: "FATHUR RAHMAN",
    role: "TERRAIN & EVENT DESIGNER",
    image: "/gallery/event.jpg",
    quote: "Merancang arena event survival bulanan selalu seru. Kepuasan terbesar adalah melihat antusiasme para santri saat berkompetisi secara sportif.",
  },
  {
    id: 4,
    name: "ANNUR2 DEV TEAM",
    role: "SERVER SYSTEM ADMIN",
    image: "/gallery/rodok.png",
    quote: "Menjaga stabilitas performa server dan kenyamanan ekosistem komunitas agar santri dapat bermain dengan aman.",
  },
];

export default function AboutPage() {
  const [currentBuilder, setCurrentBuilder] = useState(0);

  const handleNextBuilder = () => {
    setCurrentBuilder((prev) => (prev + 1) % builders.length);
  };

  const handlePrevBuilder = () => {
    setCurrentBuilder((prev) => (prev - 1 + builders.length) % builders.length);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNextBuilder();
    } else if (info.offset.x > swipeThreshold) {
      handlePrevBuilder();
    }
  };

  const activeBuilder = builders[currentBuilder];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0A0A] text-white font-mono py-12 px-4 sm:px-6 flex flex-col justify-center select-none overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto w-full space-y-16">
        
        {/* Header Section */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#737373] tracking-[0.3em] uppercase block mb-1">
              // ANNUR2MC IDENTITY
            </span>
            <h1 className="text-2xl sm:text-5xl font-bold tracking-tight uppercase">
              ABOUT US
            </h1>
          </div>
          <p className="text-xs text-[#A3A3A3] max-w-sm">
            Pondok Pesantren Annur 2 Almurtadlo Minecraft Server Project.
          </p>
        </div>

        {/* Hero Banner / Highlight Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="text-xs text-white/50 tracking-widest uppercase">
              [ OUR MISSION ]
            </span>
            <h2 className="text-xl sm:text-3xl font-bold uppercase leading-snug">
              WADAH KREATIFITAS DIGITAL SANTRI ANNUR 2
            </h2>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              ANNUR2MC adalah dunia virtual yang dibangun dan dikembangkan oleh para santri Pondok Pesantren Annur 2 Almurtadlo. Proyek ini menggabungkan seni arsitektur digital, simulasi komunitas santri, dan tempat mengasah keterampilan teknologi dalam koridor islami.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[16/10] bg-[#141414] border border-white/10 rounded-lg overflow-hidden"
          >
            <Image
              src="/gallery/pesantren.jpg"
              alt="ANNUR2MC Server Showcase"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </motion.div>
        </div>

        {/* CAROUSEL COVERFLOW BUILDERS (KARTU GAMBAR LONJONG + DISAMARKAN DI KANAN KIRI) */}
        <div className="space-y-8 pt-6 border-t border-white/10 w-full">
          <div className="text-center space-y-1">
            <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase block">
              // CREATIVE CREW
            </span>
            <h2 className="text-xl sm:text-3xl font-bold uppercase">
              BUILDERS & KESAN
            </h2>
          </div>

          {/* 1. Coverflow Frame Gambar Lonjong */}
          <div className="relative w-full py-4 flex flex-col items-center justify-center touch-pan-y">
            <div className="relative w-full max-w-[900px] h-[340px] sm:h-[420px] flex items-center justify-center">
              {builders.map((item, index) => {
                let position = index - currentBuilder;
                if (position < -1) position += builders.length;
                if (position > 1) position -= builders.length;

                const isCenter = index === currentBuilder;
                const isLeft = index === (currentBuilder - 1 + builders.length) % builders.length;
                const isRight = index === (currentBuilder + 1) % builders.length;

                if (!isCenter && !isLeft && !isRight) return null;

                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      scale: isCenter ? 1 : 0.8,
                      x: isCenter ? 0 : isLeft ? -220 : 220,
                      opacity: isCenter ? 1 : 0.3,
                      filter: isCenter ? "blur(0px)" : "blur(4px)",
                      zIndex: isCenter ? 20 : 10,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    drag={isCenter ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    onClick={() => setCurrentBuilder(index)}
                    className={`absolute w-[220px] sm:w-[280px] aspect-[3/4] bg-[#141414] border border-white/15 rounded-xl overflow-hidden shadow-2xl ${
                      isCenter ? "cursor-grab active:cursor-grabbing ring-1 ring-white/30" : "cursor-pointer"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover pointer-events-none"
                      sizes="300px"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-1.5 mt-2">
              {builders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBuilder(index)}
                  className={`h-1.5 transition-all rounded-full cursor-pointer ${
                    index === currentBuilder ? "w-6 bg-white" : "w-1.5 bg-white/20"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 2. Teks Info & Kesan Pesan (Terpisah Di Bawah Gambar Carousel) */}
          <div className="max-w-[700px] mx-auto text-center bg-[#141414]/60 border border-white/10 p-6 sm:p-8 rounded-xl backdrop-blur-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBuilder.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase block">
                  [{activeBuilder.role}]
                </span>
                <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-wider text-white">
                  {activeBuilder.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#D4D4D4] italic leading-relaxed max-w-xl mx-auto">
                  "{activeBuilder.quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Server Info Details */}
        <div className="bg-[#141414] border border-white/10 p-6 sm:p-8 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-[10px] text-white/50 tracking-widest uppercase block mb-1">
              // CONNECT TO SERVER
            </span>
            <h3 className="text-lg font-bold uppercase">READY TO JOIN US?</h3>
            <p className="text-xs text-[#A3A3A3] mt-1">
              Gunakan IP Server resmi ANNUR2MC untuk bergabung.
            </p>
          </div>
          <div className="bg-[#0A0A0A] border border-white/20 px-6 py-3 roundgied-md flex items-center gap-3">
            <span className="text-xs text-[#737373]">IP:</span>
            <span className="font-[family-name:var(--font-press-start)] text-xs text-white tracking-wider">
              play.annur2mc.net
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}