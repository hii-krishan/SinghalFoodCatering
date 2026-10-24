import { useState, useEffect, useRef, type FC } from 'react';
import { sampleMenuItems, type MenuCategory, type MenuItem } from '../data/menuData';
import { siteConfig } from '../config/siteConfig';
import { 
  Utensils, 
  Sparkles, 
  Flame, 
  CookingPot, 
  Wheat, 
  GlassWater, 
  PhoneCall, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, EASE } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

interface BookSpreadDef {
  leftCategory: MenuCategory;
  leftTitle: string;
  leftHindi: string;
  rightCategory: MenuCategory;
  rightTitle: string;
  rightHindi: string;
}

export const MenuSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bookSpreadRef = useRef<HTMLDivElement>(null);
  const turningLeafRef = useRef<HTMLDivElement>(null);

  // Active spread index (0: Starters/Chaat, 1: Main Course/Breads, 2: Sweets/Drinks)
  const [bookPageIndex, setBookPageIndex] = useState<number>(0);
  
  // Flipping state for realistic 3D paper turning
  const [flipState, setFlipState] = useState<{
    isFlipping: boolean;
    direction: 'next' | 'prev';
    fromIndex: number;
    toIndex: number;
  }>({
    isFlipping: false,
    direction: 'next',
    fromIndex: 0,
    toIndex: 0
  });

  const bookSpreads: BookSpreadDef[] = [
    {
      leftCategory: 'Starters',
      leftTitle: 'Starters & Finger Delights',
      leftHindi: 'स्वादिष्ट स्टार्टर्स',
      rightCategory: 'Special Counters',
      rightTitle: 'Live Theatrical Counters',
      rightHindi: 'लाइव चाट व तंदूर स्टॉल्स'
    },
    {
      leftCategory: 'Main Course',
      leftTitle: 'Royal Main Course',
      leftHindi: 'शाही मुख्य भोजन',
      rightCategory: 'Breads & Rice',
      rightTitle: 'Tandoori Breads & Pulao',
      rightHindi: 'तंदूरी रोटी व ज़ाफरानी पुलाव'
    },
    {
      leftCategory: 'Desserts',
      leftTitle: 'Artisanal Mithai & Sweets',
      leftHindi: 'शुद्ध देशी घी मिष्ठान',
      rightCategory: 'Beverages',
      rightTitle: 'Refreshing Welcome Bar',
      rightHindi: 'पारंपरिक कुल्हड़ पेय व ठंडाई'
    }
  ];

  // GSAP Entrance animation on scroll
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.menu-header-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: EASE.editorial
      });

      gsap.from(bookSpreadRef.current, {
        scrollTrigger: {
          trigger: bookSpreadRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: EASE.luxury
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Execute authentic 3D physical page turn animation
  const handleFlipPage = (direction: 'next' | 'prev', specificTargetIndex?: number) => {
    if (flipState.isFlipping) return;

    let targetIndex: number;
    if (typeof specificTargetIndex === 'number') {
      if (specificTargetIndex === bookPageIndex) return;
      targetIndex = specificTargetIndex;
      direction = specificTargetIndex > bookPageIndex ? 'next' : 'prev';
    } else {
      targetIndex = direction === 'next' 
        ? Math.min(bookSpreads.length - 1, bookPageIndex + 1)
        : Math.max(0, bookPageIndex - 1);
    }

    if (targetIndex === bookPageIndex) return;

    // Trigger flip state with source and target spreads
    setFlipState({
      isFlipping: true,
      direction,
      fromIndex: bookPageIndex,
      toIndex: targetIndex
    });

    // Slight book chassis compression to simulate physical binding stress
    if (bookSpreadRef.current) {
      gsap.to(bookSpreadRef.current, {
        scale: 0.992,
        duration: 0.28,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    }

    // Next tick: animate turning leaf using GSAP 3D transform
    requestAnimationFrame(() => {
      if (!turningLeafRef.current) {
        setBookPageIndex(targetIndex);
        setFlipState(prev => ({ ...prev, isFlipping: false }));
        return;
      }

      const leaf = turningLeafRef.current;
      const startAngle = 0;
      const endAngle = direction === 'next' ? -180 : 180;

      gsap.fromTo(leaf, 
        { rotateY: startAngle },
        {
          rotateY: endAngle,
          duration: 0.65,
          ease: 'power2.inOut',
          onComplete: () => {
            setBookPageIndex(targetIndex);
            setFlipState(prev => ({ ...prev, isFlipping: false }));
          }
        }
      );
    });
  };

  const handleFlipPageRef = useRef(handleFlipPage);
  useEffect(() => {
    handleFlipPageRef.current = handleFlipPage;
  });

  // Keyboard navigation for page flip (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && bookPageIndex < bookSpreads.length - 1 && !flipState.isFlipping) {
        handleFlipPageRef.current('next');
      } else if (e.key === 'ArrowLeft' && bookPageIndex > 0 && !flipState.isFlipping) {
        handleFlipPageRef.current('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookPageIndex, flipState.isFlipping, bookSpreads.length]);

  const getCategoryIcon = (catId: MenuCategory) => {
    switch (catId) {
      case 'Starters':
        return <Utensils className="w-4 h-4 text-[#F36C21]" />;
      case 'Special Counters':
        return <Flame className="w-4 h-4 text-[#D90429]" />;
      case 'Main Course':
        return <CookingPot className="w-4 h-4 text-[#F36C21]" />;
      case 'Breads & Rice':
        return <Wheat className="w-4 h-4 text-[#FFB300]" />;
      case 'Desserts':
        return <Sparkles className="w-4 h-4 text-[#FFB300]" />;
      case 'Beverages':
        return <GlassWater className="w-4 h-4 text-[#4E9F3D]" />;
      default:
        return <Utensils className="w-4 h-4 text-[#F36C21]" />;
    }
  };

  // Helper to render dishes on a single book page
  const renderPageContent = (
    category: MenuCategory, 
    title: string, 
    hindiTitle: string, 
    pageNumber: number,
    isLeftPage: boolean
  ) => {
    const dishes = sampleMenuItems.filter(d => d.category === category);

    return (
      <div className={`h-full flex flex-col justify-between ${isLeftPage ? 'md:pr-6 border-b md:border-b-0 md:border-r border-stone-200 pb-6 md:pb-0' : 'md:pl-6 pt-6 md:pt-0'}`}>
        
        {/* Page Top Header */}
        <div>
          <div className="flex items-center justify-between border-b-2 border-[#F36C21]/20 pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#F36C21]">
                {getCategoryIcon(category)}
                <span>Page {pageNumber} • {hindiTitle}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-[#4A0E17] mt-0.5 tracking-tight">
                {title}
              </h3>
            </div>
            
            {/* Pure Veg Emblem */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#4E9F3D]/10 border border-[#4E9F3D]/25 text-[10px] font-bold text-[#4E9F3D] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E9F3D]" />
              <span>100% Pure Veg</span>
            </div>
          </div>

          {/* Dishes List without "+ Add" button - clean, royal presentation */}
          <div className="space-y-3.5 pt-4">
            {dishes.map((dish: MenuItem) => (
              <div 
                key={dish.id}
                className="p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#F36C21]/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#1F2421] group-hover:text-[#F36C21] transition-colors leading-tight">
                        {dish.name}
                      </h4>
                      {dish.isLiveCounterItem && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#D90429] bg-[#D90429]/10 px-2 py-0.5 rounded-md">
                          <Flame className="w-3 h-3 fill-current" />
                          Live Counter
                        </span>
                      )}
                    </div>
                    {dish.hindiName && (
                      <span className="block text-xs text-[#565C58]/80 font-medium">
                        {dish.hindiName}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#565C58] mt-1.5 leading-relaxed line-clamp-2">
                  {dish.description}
                </p>

                {/* Subtle Tags Pill */}
                <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-stone-100">
                  {dish.tags.map((t, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Page Footer Watermark */}
        <div className="pt-4 mt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-400 font-medium">
          <span>Singhal Food Catering • Ganaur & Sonipat</span>
          <span>Desi Ghee & Fresh Ground Spices</span>
        </div>

      </div>
    );
  };

  const currentSpread = bookSpreads[bookPageIndex];
  const targetSpread = bookSpreads[flipState.toIndex];

  return (
    <section 
      ref={sectionRef}
      id="menu" 
      className="py-20 lg:py-28 bg-[#FFFDF9] relative border-y border-[#F36C21]/15 overflow-hidden"
    >
      {/* Decorative Warm Ambient Glows */}
      <div 
        className="absolute top-1/4 left-0 w-80 h-80 bg-[#FFB300]/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-0 w-96 h-96 bg-[#4A0E17]/8 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="menu-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F36C21]/10 border border-[#F36C21]/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F36C21]">
            <BookOpen className="w-4 h-4 text-[#FFB300]" />
            <span>Interactive Royal Ledger</span>
          </div>

          <h2 className="menu-header-item font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2421] tracking-tight">
            Explore Our <span className="text-gradient-saffron">Catering Flavours</span>
          </h2>

          <p className="menu-header-item text-base sm:text-lg text-[#565C58] font-normal leading-relaxed">
            Turn pages in our royal catering book to discover slow-simmered gravies, live street chaat stations, and pure desi ghee sweets prepared for grand celebrations in Ganaur and Sonipat.
          </p>
        </div>

        {/* 3D BOUND ROYAL MENU BOOK CONTAINER */}
        <div 
          ref={bookSpreadRef}
          className="relative max-w-5xl mx-auto rounded-3xl bg-[#3A0A12] p-3 sm:p-5 shadow-[0_30px_70px_-15px_rgba(40,10,15,0.45),0_10px_30px_rgba(0,0,0,0.18)] border-4 border-[#FFB300]/30 transition-transform duration-300"
          style={{ 
            perspective: '2200px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Gold Embossed Corner Accents */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#FFE57F] rounded-tl-xl pointer-events-none z-30" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#FFE57F] rounded-tr-xl pointer-events-none z-30" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#FFE57F] rounded-bl-xl pointer-events-none z-30" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#FFE57F] rounded-br-xl pointer-events-none z-30" />

          {/* Red Silk Satin Bookmark Ribbon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-28 bg-gradient-to-b from-[#D90429] to-[#99021D] shadow-md z-40 rounded-b-md flex items-end justify-center pb-2 pointer-events-none">
            <div className="w-2 h-2 rotate-45 bg-[#3A0A12] absolute -bottom-1" />
          </div>

          {/* STATIC BASE OPEN BOOK PAGES (Left & Right Spreads) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-[#FFFDF5] rounded-2xl p-5 sm:p-8 border border-stone-200 relative shadow-inner overflow-hidden min-h-[580px]">
            
            {/* Center Book Spine Shadow Crease */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-9 bg-gradient-to-r from-stone-400/25 via-stone-500/40 to-stone-400/25 pointer-events-none z-30 shadow-inner" />

            {/* LEFT STATIC PAGE */}
            <div className="relative">
              {/* If flipping backward, show incoming spread's left page underneath */}
              {flipState.isFlipping && flipState.direction === 'prev' ? (
                renderPageContent(
                  targetSpread.leftCategory,
                  targetSpread.leftTitle,
                  targetSpread.leftHindi,
                  (flipState.toIndex * 2) + 1,
                  true
                )
              ) : (
                renderPageContent(
                  currentSpread.leftCategory,
                  currentSpread.leftTitle,
                  currentSpread.leftHindi,
                  (bookPageIndex * 2) + 1,
                  true
                )
              )}
            </div>

            {/* RIGHT STATIC PAGE */}
            <div className="relative">
              {/* If flipping forward, show incoming spread's right page underneath */}
              {flipState.isFlipping && flipState.direction === 'next' ? (
                renderPageContent(
                  targetSpread.rightCategory,
                  targetSpread.rightTitle,
                  targetSpread.rightHindi,
                  (flipState.toIndex * 2) + 2,
                  false
                )
              ) : (
                renderPageContent(
                  currentSpread.rightCategory,
                  currentSpread.rightTitle,
                  currentSpread.rightHindi,
                  (bookPageIndex * 2) + 2,
                  false
                )
              )}
            </div>

            {/* REALISTIC 3D TURNING PAGE LEAF (Active only during flip) */}
            {flipState.isFlipping && (
              <div
                ref={turningLeafRef}
                className="hidden md:block absolute top-0 bottom-0 z-35 pointer-events-none"
                style={{
                  width: '50%',
                  left: flipState.direction === 'next' ? '50%' : '0%',
                  transformOrigin: flipState.direction === 'next' ? 'left center' : 'right center',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* FRONT FACE OF TURNING LEAF */}
                <div 
                  className="absolute inset-0 bg-[#FFFDF5] p-5 sm:p-8 border border-stone-200 shadow-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)'
                  }}
                >
                  {/* Subtle Spine Crease Shadow Gradient */}
                  <div className={`absolute top-0 bottom-0 w-8 pointer-events-none z-10 ${
                    flipState.direction === 'next'
                      ? 'left-0 bg-gradient-to-r from-stone-500/30 to-transparent'
                      : 'right-0 bg-gradient-to-l from-stone-500/30 to-transparent'
                  }`} />

                  {flipState.direction === 'next' ? (
                    renderPageContent(
                      currentSpread.rightCategory,
                      currentSpread.rightTitle,
                      currentSpread.rightHindi,
                      (bookPageIndex * 2) + 2,
                      false
                    )
                  ) : (
                    renderPageContent(
                      currentSpread.leftCategory,
                      currentSpread.leftTitle,
                      currentSpread.leftHindi,
                      (bookPageIndex * 2) + 1,
                      true
                    )
                  )}
                </div>

                {/* BACK FACE OF TURNING LEAF */}
                <div 
                  className="absolute inset-0 bg-[#FFFDF5] p-5 sm:p-8 border border-stone-200 shadow-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {/* Subtle Spine Crease Shadow Gradient on Back */}
                  <div className={`absolute top-0 bottom-0 w-8 pointer-events-none z-10 ${
                    flipState.direction === 'next'
                      ? 'right-0 bg-gradient-to-l from-stone-500/30 to-transparent'
                      : 'left-0 bg-gradient-to-r from-stone-500/30 to-transparent'
                  }`} />

                  {flipState.direction === 'next' ? (
                    renderPageContent(
                      targetSpread.leftCategory,
                      targetSpread.leftTitle,
                      targetSpread.leftHindi,
                      (flipState.toIndex * 2) + 1,
                      true
                    )
                  ) : (
                    renderPageContent(
                      targetSpread.rightCategory,
                      targetSpread.rightTitle,
                      targetSpread.rightHindi,
                      (flipState.toIndex * 2) + 2,
                      false
                    )
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* PAGINATION CONTROLS PLACED SPECIFICALLY BELOW THE BOOK */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto px-4">
          
          {/* Previous Page Button (Below the Book) */}
          <button
            type="button"
            onClick={() => handleFlipPage('prev')}
            disabled={bookPageIndex === 0 || flipState.isFlipping}
            className="btn-3d-phone w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all active:scale-95"
            aria-label="Previous Page Spread"
          >
            <ChevronLeft className="w-4 h-4 text-[#F36C21]" />
            <span>Previous Page</span>
          </button>

          {/* Spread Indicator & Quick Page Navigation Dots */}
          <div className="text-center space-y-1.5 order-first sm:order-none">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A0E17]">
              Royal Ledger • Spread {bookPageIndex + 1} of {bookSpreads.length}
            </span>
            <div className="flex items-center justify-center gap-2">
              {bookSpreads.map((spread, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleFlipPage(i > bookPageIndex ? 'next' : 'prev', i)}
                  disabled={flipState.isFlipping}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    bookPageIndex === i 
                      ? 'w-8 bg-[#F36C21] shadow-xs' 
                      : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Jump to Spread ${i + 1}: ${spread.leftTitle} & ${spread.rightTitle}`}
                  title={`Spread ${i + 1}: ${spread.leftTitle}`}
                />
              ))}
            </div>
          </div>

          {/* Next Page Button (Below the Book) */}
          <button
            type="button"
            onClick={() => handleFlipPage('next')}
            disabled={bookPageIndex === bookSpreads.length - 1 || flipState.isFlipping}
            className="btn-3d-cta w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all active:scale-95"
            aria-label="Next Page Spread"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Menu Action & Consultation Notice */}
        <div className="mt-14 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#enquire"
              className="btn-3d-cta sheen-effect inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F36C21]/40 shadow-lg"
            >
              <FileText className="w-5 h-5 drop-shadow-xs" />
              <span>Request Menu & Quotation</span>
            </a>

            <a
              href={`tel:${siteConfig.contact.phoneNumber}`}
              className="btn-3d-phone inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm sm:text-base font-bold shadow-md"
            >
              <PhoneCall className="w-5 h-5 text-[#F36C21]" />
              <span>Call Us: {siteConfig.contact.displayPhone}</span>
            </a>
          </div>

          <p className="text-xs text-[#565C58] max-w-xl mx-auto leading-relaxed">
            Need special Jain dishes, onion-garlic free Sattvic food, or child-friendly live counters? Every item in our royal ledger can be customized to your family tradition.
          </p>
        </div>

      </div>
    </section>
  );
};
