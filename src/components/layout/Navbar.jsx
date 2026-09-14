import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Work', targetIndex: 5 },
  { label: 'About', targetIndex: 3 },
  { label: 'Capabilities', targetIndex: 4 },
  { label: 'Achievements', targetIndex: 6 },
  { label: 'Contact', targetIndex: 7 },
];

export default function Navbar({ isVisible = true, activeIndex = 1, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, index) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(index);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-[#09090B] border-b border-[#27272A] transition-all duration-700 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none h-0 border-none overflow-hidden'
    }`}>
      <div className="portfolio-container flex items-center justify-between h-16">
        {/* Brand Logo / Home Anchor */}
        <a 
          href="#hero"
          onClick={(e) => handleNavClick(e, 1)}
          className="font-display font-bold text-lg tracking-wider text-[#FAFAFA] hover:text-[#FF2E2E] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
        >
          SARVANI<span className="text-[#FF2E2E]">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeIndex === item.targetIndex;
            return (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item.targetIndex)}
                className={`font-mono-tech text-xs uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E] ${
                  isActive ? 'text-[#FF2E2E] font-bold' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 7)}
            className="px-3 py-1.5 bg-[#FF2E2E] text-[#09090B] font-mono-tech text-xs uppercase tracking-wider font-semibold rounded-none border border-[#FF2E2E] hover:bg-[#09090B] hover:text-[#FF2E2E] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
          >
            Get In Touch
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 bg-[#121215] border border-[#27272A] text-[#FAFAFA] hover:text-[#FF2E2E] focus-visible:outline-2 focus-visible:outline-[#FF2E2E] cursor-pointer"
        >
          <span className="font-mono-tech text-xs uppercase tracking-widest">
            {mobileMenuOpen ? '[ CLOSE ]' : '[ MENU ]'}
          </span>
        </button>
      </div>

      {/* Mobile Structural Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden border-t border-[#27272A] bg-[#09090B] px-4 py-6 space-y-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, item.targetIndex);
                }}
                className="font-mono-tech text-sm uppercase tracking-wider text-[#A1A1AA] hover:text-[#FAFAFA] py-1 border-b border-[#27272A]/50 focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, 7);
              }}
              className="mt-2 inline-block text-center px-4 py-2 bg-[#FF2E2E] text-[#09090B] font-mono-tech text-xs uppercase font-semibold border border-[#FF2E2E] focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
            >
              Get In Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
