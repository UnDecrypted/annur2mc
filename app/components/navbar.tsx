"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // State Scroll khusus untuk halaman utama
  const [isScrolled, setIsScrolled] = useState(false);

  // State Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? isScrolled || isMobileMenuOpen
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent border-b border-transparent"
          : "sticky top-0 bg-[#0A0A0A] border-b border-white/10"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between md:justify-center">
        {/* Mobile Menu Icon (Menggunakan mix-blend-difference) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 cursor-pointer mix-blend-difference"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigasi Desktop dengan Efek mix-blend-difference */}
        <nav className="hidden md:flex items-center gap-10 text-[11px] font-mono tracking-widest uppercase mix-blend-difference text-white">
          <Link
            href="/"
            className={`transition-opacity hover:opacity-100 ${
              pathname === "/" ? "font-bold opacity-100" : "opacity-70"
            }`}
          >
            [ HOME ]
          </Link>
          <Link
            href="/gallery"
            className={`transition-opacity hover:opacity-100 ${
              pathname === "/gallery" ? "font-bold opacity-100" : "opacity-70"
            }`}
          >
            [ GALLERY ]
          </Link>
          <Link
            href="/about"
            className={`transition-opacity hover:opacity-100 ${
              pathname === "/about" ? "font-bold opacity-100" : "opacity-70"
            }`}
          >
            [ ABOUT US ]
          </Link>
        </nav>

        {/* Dummy spacer untuk penyeimbang di layar mobile */}
        <div className="w-6 md:hidden" />
      </div>

      {/* MOBILE SLIDE-DOWN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden font-mono text-xs px-6 py-6 flex flex-col gap-4 text-white"
          >
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-stone-300 py-1 uppercase tracking-[0.2em] text-white flex items-center justify-between border-b border-white/10 pb-3"
            >
              <span>[ HOME ]</span>
              <span className="text-[10px] text-white/40">01</span>
            </Link>
            <Link
              href="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-stone-300 py-1 uppercase tracking-[0.2em] text-white flex items-center justify-between border-b border-white/10 pb-3"
            >
              <span>[ GALLERY ]</span>
              <span className="text-[10px] text-white/40">02</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-stone-300 py-1 uppercase tracking-[0.2em] text-white flex items-center justify-between"
            >
              <span>[ ABOUT US ]</span>
              <span className="text-[10px] text-white/40">04</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}