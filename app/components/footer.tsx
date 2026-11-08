export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 bg-[#0A0A0A]">
      <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[11px] text-[#737373]">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Menggunakan font pixel Press Start 2P khas Minecraft */}
          <span className="font-[family-name:var(--font-press-start)] text-xs text-white tracking-wider">
            ANNUR2MC
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span>© 2026 ANNUR2MC. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-8 uppercase tracking-widest">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            TIKTOK
          </a>
        </div>
      </div>
    </footer>
  );
}