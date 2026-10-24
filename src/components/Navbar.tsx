import { useState, useEffect, useRef, type FC } from 'react';
import { Wordmark } from './Wordmark';
import { siteConfig } from '../config/siteConfig';
import { Menu, X, Phone, MessageCircle, CalendarCheck, Sparkles, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { prefersReducedMotion, EASE } from '../utils/animations';

export const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'menu', label: 'Menu', href: '#menu' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  // Track scroll position & calculate scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 25);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer to highlight current active link
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'menu', 'gallery', 'about', 'enquire', 'contact'];
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'enquire') {
            setActiveSection('contact');
          } else {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // GSAP 3D Entrance Animation
  useEffect(() => {
    if (prefersReducedMotion() || !islandRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(islandRef.current, {
        y: -30,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        ease: EASE.editorial,
        delay: 0.1
      });
    });
    return () => ctx.revert();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const currentHighlight = hoveredLink || activeSection;

  return (
    <>
      {/* 3D Glowing Scroll Progress Line */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3.5px] z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#F36C21] via-[#FFB300] to-[#4E9F3D] origin-left shadow-[0_0_12px_rgba(243,108,33,0.7)] transition-transform duration-75 ease-out"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      {/* Main Header Container with Floating 3D Capsule */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none ${
          isScrolled ? 'pt-2 sm:pt-3' : 'pt-2.5 sm:pt-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          
          {/* Floating High-Contrast Island (Crisp & clearly visible on mobile) */}
          <div
            ref={islandRef}
            className={`pointer-events-auto relative rounded-2xl sm:rounded-3xl transition-all duration-300 flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 ${
              isScrolled
                ? 'bg-white/98 sm:bg-[#FDFBF7]/92 backdrop-blur-2xl border border-stone-300/85 sm:border-white/90 shadow-[0_14px_38px_rgba(31,36,33,0.16),0_4px_14px_rgba(243,108,33,0.12)]'
                : 'bg-white/95 sm:bg-[#FDFBF7]/90 backdrop-blur-xl border border-stone-200/90 sm:border-white/80 shadow-[0_8px_26px_rgba(31,36,33,0.10),0_2px_8px_rgba(243,108,33,0.08)]'
            }`}
          >
            {/* Subtle 3D Top Inset Highlight */}
            <div className="absolute inset-x-4 sm:inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F36C21]/60 to-transparent pointer-events-none" />

            {/* Brand Wordmark with 3D Emblem */}
            <div className="shrink-0 min-w-0 pr-2">
              <Wordmark />
            </div>

            {/* Desktop Navigation Links with Animated 3D Floating Pill */}
            <nav 
              className="hidden lg:flex items-center relative p-1 bg-black/[0.03] rounded-2xl border border-black/[0.05] shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => {
                const isSelected = currentHighlight === link.id;
                const isCurrentlyActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    className={`relative px-4 py-2 text-xs xl:text-sm font-bold tracking-tight rounded-xl transition-all duration-200 z-10 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F36C21] ${
                      isSelected
                        ? 'text-[#4A0E17]'
                        : 'text-[#565C58] hover:text-[#1F2421]'
                    }`}
                  >
                    <span>{link.label}</span>
                    
                    {/* Small pulsing saffron diamond indicator on active link */}
                    {isCurrentlyActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F36C21] shadow-[0_0_6px_#F36C21] animate-pulse" />
                    )}

                    {/* Animated 3D Pill Background */}
                    {isSelected && (
                      <span 
                        className="absolute inset-0 rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] border border-[#F36C21]/20 -z-10 transition-all duration-250 animate-in fade-in zoom-in-95" 
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Action Buttons with 3D Tactile Styling */}
            <div className="hidden sm:flex items-center gap-2.5 xl:gap-3">
              {/* WhatsApp Quick Chat 3D Pill */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#128C7E] bg-white/90 hover:bg-[#25D366]/10 border border-[#25D366]/35 shadow-[0_3px_10px_rgba(37,211,102,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:border-[#25D366] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200"
                aria-label="Direct WhatsApp Message"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                </span>
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              {/* Direct Connect Desktop Pill: Line 1 & Line 2 */}
              <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-white/90 border border-[#F36C21]/20 shadow-[0_3px_10px_rgba(0,0,0,0.04)]">
                <a
                  href={`tel:${siteConfig.contact.phoneNumber}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#4A0E17] hover:bg-[#FFF6EE] hover:text-[#F36C21] transition-colors"
                  title={`Call Line 1: ${siteConfig.contact.displayPhone}`}
                >
                  <Phone className="w-3.5 h-3.5 text-[#F36C21]" />
                  <span className="font-mono">{siteConfig.contact.displayPhone}</span>
                </a>
                <span className="text-stone-300">|</span>
                <a
                  href={`tel:${siteConfig.contact.secondaryPhone}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#4A0E17] hover:bg-[#FFF6EE] hover:text-[#F36C21] transition-colors"
                  title={`Call Line 2: ${siteConfig.contact.displaySecondaryPhone}`}
                >
                  <Phone className="w-3.5 h-3.5 text-[#F36C21]" />
                  <span className="font-mono">{siteConfig.contact.displaySecondaryPhone}</span>
                </a>
              </div>

              {/* Prominent 3D Beveled Enquire Now CTA Button */}
              <a
                href="#enquire"
                className="sheen-effect relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-extrabold tracking-tight bg-gradient-to-b from-[#F57C2B] via-[#F36C21] to-[#DE590F] shadow-[0_6px_20px_rgba(243,108,33,0.38),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(0,0,0,0.18)] border border-[#F36C21]/30 hover:shadow-[0_8px_25px_rgba(243,108,33,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(243,108,33,0.3)] transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F36C21]/40"
              >
                <CalendarCheck className="w-4 h-4 drop-shadow-xs" />
                <span>Enquire Now</span>
                <Sparkles className="w-3.5 h-3.5 text-[#FFE57F] -ml-0.5" />
              </a>
            </div>

            {/* Mobile Actions: Direct Call Button + WhatsApp + Menu Toggle */}
            <div className="flex lg:hidden items-center gap-1.5 xs:gap-2 shrink-0">
              {/* Mobile 1-Tap Quick Call Hotline */}
              <a
                href={`tel:${siteConfig.contact.phoneNumber}`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FFF6EE] border border-[#F36C21]/35 text-[#4A0E17] font-bold text-xs shadow-xs hover:bg-[#F36C21] hover:text-white active:scale-95 transition-all"
                title={`Call ${siteConfig.contact.displayPhone}`}
                aria-label="Call Catering Hotline"
              >
                <Phone className="w-3.5 h-3.5 text-[#F36C21]" />
                <span className="font-mono text-[11px] font-black tracking-tight">Call</span>
              </a>

              {/* Mobile WhatsApp Quick Action */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 shadow-xs active:scale-95 transition-all"
                title="WhatsApp Us"
                aria-label="Direct WhatsApp Message"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
              </a>

              {/* Mobile Hamburger Toggle Button with Clear 3D Contrast */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-[#1F2421] bg-white border border-stone-300 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F36C21] transition-all active:scale-95"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#D90429]" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F2421]" />
                )}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu with 3D Cards */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#FDFBF7]/98 backdrop-blur-2xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#F36C21]/15 bg-white/60">
            <Wordmark />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-white border border-stone-200 shadow-sm text-[#4A0E17] hover:bg-[#F36C21]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F36C21]"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links with 3D Tactile Cards */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
            <div className="text-[11px] font-black uppercase tracking-widest text-[#F36C21] px-1">
              Explore Singhal Food Catering
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={handleNavClick}
                    className={`flex items-center justify-between py-3.5 px-4 rounded-2xl text-base font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FFF6EE] to-[#FFFDF5] text-[#F36C21] border border-[#F36C21]/30 shadow-md'
                        : 'bg-white text-[#1F2421] border border-stone-200 shadow-xs hover:border-[#F36C21]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#F36C21]" />}
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#F36C21]' : 'text-stone-400'}`} />
                  </a>
                );
              })}
            </div>

            {/* Quick Enquiries 3D Action Section */}
            <div className="pt-4 border-t border-[#F36C21]/15 space-y-3">
              <div className="text-[11px] font-black uppercase tracking-widest text-[#F36C21] px-1">
                Instant Quotation & Contact
              </div>

              <a
                href="#enquire"
                onClick={handleNavClick}
                className="sheen-effect w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#F36C21] to-[#FFB300] text-white font-extrabold text-sm shadow-[0_6px_20px_rgba(243,108,33,0.35)] active:scale-98 transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Request a Catering Quote</span>
              </a>

              {/* Direct WhatsApp Options (Identical Styling) */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-[#25D366] text-white font-bold text-xs shadow-md active:scale-98 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp 1</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.contact.secondaryWhatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-[#25D366] text-white font-bold text-xs shadow-md active:scale-98 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp 2</span>
                </a>
              </div>

              {/* Direct Phone Options (Identical Styling) */}
              <a
                href={`tel:${siteConfig.contact.phoneNumber}`}
                className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-white border border-[#F36C21]/25 text-[#4A0E17] font-bold text-xs shadow-xs hover:border-[#F36C21] active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#F36C21]" />
                  <span>Call {siteConfig.contact.displayPhone}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#F36C21] bg-[#FFF6EE] px-2 py-0.5 rounded">Line 1</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.secondaryPhone}`}
                className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-white border border-[#F36C21]/25 text-[#4A0E17] font-bold text-xs shadow-xs hover:border-[#F36C21] active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#F36C21]" />
                  <span>Call {siteConfig.contact.displaySecondaryPhone}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#F36C21] bg-[#FFF6EE] px-2 py-0.5 rounded">Line 2</span>
              </a>
            </div>

            <div className="pt-2 text-center text-xs text-[#565C58]">
              Centrally based in Ganaur • Catering events across Sonipat, Haryana
            </div>
          </div>
        </div>
      )}
    </>
  );
};
