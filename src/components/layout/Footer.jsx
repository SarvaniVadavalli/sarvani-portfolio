export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121215] border-t border-[#27272A] py-12">
      <div className="portfolio-container flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand / Copyright */}
        <div className="space-y-1 text-center md:text-left">
          <div className="font-display font-bold text-sm tracking-wider text-[#FAFAFA]">
            SARVANI PORTFOLIO
          </div>
          <div className="font-mono-tech text-xs text-[#A1A1AA]">
            © {currentYear} Sarvani. All rights reserved. Structural Shell Phase 2.1
          </div>
        </div>

        {/* Structural Placeholder Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-xs text-[#A1A1AA] hover:text-[#FF2E2E] uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-xs text-[#A1A1AA] hover:text-[#FF2E2E] uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
          >
            LinkedIn
          </a>
          <a
            href="#hero"
            className="font-mono-tech text-xs text-[#FAFAFA] hover:text-[#FF2E2E] uppercase tracking-wider border border-[#27272A] px-3 py-1 bg-[#09090B] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
          >
            ↑ Top
          </a>
        </div>

      </div>
    </footer>
  );
}
