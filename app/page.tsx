"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans antialiased selection:bg-white selection:text-black">
      <main>
        {/* HERO BANNER: Full Height Video Background */}
        <section className="relative h-screen w-full bg-[#0A0A0A] overflow-hidden flex items-end border-b border-white/10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-110"
          >
            {/* Ganti src di bawah ini dengan URL video kamu sendiri */}
            <source
              src="/bg.mp4"
              type="video/mp4"
            />
            Browser Anda tidak mendukung tag video.
          </video>
          
          {/* Subtle Overlay Gradient untuk kontras tampilan */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-black/20 z-10 pointer-events-none" />
        </section>
      </main>
    </div>
  );
}