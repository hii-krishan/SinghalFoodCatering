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

interface PageDef {
  pageNumber: number; // 1-indexed (1 to 6)
  category: MenuCategory;
  title: string;
  shortTitle: string;
  hindiTitle: string;
  spreadIndex: number; // 0, 1, 2
  isLeft: boolean;
}

export const MenuSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bookSpreadRef = useRef<HTMLDivElement>(null);
  const turningLeafRef = useRef<HTMLDivElement>(null);
  const mobilePageRef = useRef<HTMLDivElement>(null);

  // Active page index (0 to 5)
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  
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

  // Touch swipe support for mobile book browsing
  const touchStartXRef = useRef<number | null>(null);

  const pages: PageDef[] = [
    {
      pageNumber: 1,
      category: 'Starters',
      title: 'Starters & Finger Delights',
      shortTitle: 'Starters',
      hindiTitle: 'स्वादिष्ट स्टार्टर्स',
      spreadIndex: 0,
      isLeft: true
    },
    {
      pageNumber: 2,
      category: 'Special Counters',
      title: 'Live Theatrical Counters',
      shortTitle: 'Live Counters',
      hindiTitle: 'लाइव चाट व तंदूर स्टॉल्स',
      spreadIndex: 0,
      isLeft: false
    },
    {
      pageNumber: 3,
      category: 'Main Course',
      title: 'Royal Main Course',
      shortTitle: 'Main Course',
      hindiTitle: 'शाही मुख्य भोजन',
      spreadIndex: 1,
      isLeft: true
    },
    {
      pageNumber: 4,
      category: 'Breads & Rice',
      title: 'Tandoori Breads & Pulao',
      shortTitle: 'Breads & Rice',
      hindiTitle: 'तंदूरी रोटी व ज़ाफरानी पुलाव',
      spreadIndex: 1,
      isLeft: false
    },
    {
      pageNumber: 5,
      category: 'Desserts',
      title: 'Artisanal Mithai & Sweets',
      shortTitle: 'Mithai & Sweets',
      hindiTitle: 'शुद्ध देशी घी मिष्ठान',
      spreadIndex: 2,
      isLeft: true
    },
    {
      pageNumber: 6,
      category: 'Beverages',
      title: 'Refreshing Welcome Bar',
      shortTitle: 'Welcome Bar',
      hindiTitle: 'पारंपरिक कुल्हड़ पेय व ठंडाई',
      spreadIndex: 2,
      isLeft: false
    }
  ];

  // Derived spread index for desktop 2-page view (0: Pages 1&2, 1: Pages 3&4, 2: Pages 5&6)
  const currentSpreadIndex = Math.floor(activePageIndex / 2);
  const leftPageOfSpread = pages[currentSpreadIndex * 2];
  const rightPageOfSpread = pages[currentSpreadIndex * 2 + 1];

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
  const handlePageTurn = (targetPage: number) => {
    if (flipState.isFlipping || targetPage === activePageIndex) return;
    if (targetPage < 0 || targetPage >= pages.length) return;

    const direction: 'next' | 'prev' = targetPage > activePageIndex ? 'next' : 'prev';

    setFlipState({
      isFlipping: true,
      direction,
      fromIndex: activePageIndex,
      toIndex: targetPage
    });

    // Subtle physical binding compression on chassis
    if (bookSpreadRef.current) {
      gsap.to(bookSpreadRef.current, {
        scale: 0.992,
        duration: 0.25,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    }

    // Animate mobile page flip if on mobile
    if (mobilePageRef.current && window.innerWidth < 768) {
      const el = mobilePageRef.current;
      gsap.timeline({
        onComplete: () => {
          setActivePageIndex(targetPage);
          setFlipState(prev => ({ ...prev, isFlipping: false }));
          gsap.set(el, { clearProps: 'all' });
        }
      })
      .to(el, {
        rotateY: direction === 'next' ? -25 : 25,
        opacity: 0.4,
        scale: 0.97,
        duration: 0.22,
        ease: 'power2.in'
      })
      .to(el, {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        duration: 0.28,
        ease: 'power2.out'
      });
      return;
    }

    // Desktop 3D Dual-Face Leaf Turn
    requestAnimationFrame(() => {
      if (!turningLeafRef.current) {
        setActivePageIndex(targetPage);
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
            setActivePageIndex(targetPage);
            setFlipState(prev => ({ ...prev, isFlipping: false }));
          }
        }
      );
    });
  };

  // Flip controls for desktop (turn spread by 2 pages) and mobile (turn by 1 page)
  const handleNext = () => {
    if (window.innerWidth < 768) {
      // Mobile: Advance by 1 page
      handlePageTurn(Math.min(pages.length - 1, activePageIndex + 1));
    } else {
      // Desktop: Advance to next 2-page spread
      const nextSpread = Math.min(2, currentSpreadIndex + 1);
      handlePageTurn(nextSpread * 2);
    }
  };

  const handlePrev = () => {
    if (window.innerWidth < 768) {
      // Mobile: Retreat by 1 page
      handlePageTurn(Math.max(0, activePageIndex - 1));
    } else {
      // Desktop: Retreat to previous 2-page spread
      const prevSpread = Math.max(0, currentSpreadIndex - 1);
      handlePageTurn(prevSpread * 2);
    }
  };

  const handleNextRef = useRef(handleNext);
  const handlePrevRef = useRef(handlePrev);
  useEffect(() => {
    handleNextRef.current = handleNext;
    handlePrevRef.current = handlePrev;
  });

  // Touch Swipe Gesture Handlers on Book
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold (45px)
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // Swiped left -> next page
        handleNextRef.current();
      } else {
        // Swiped right -> previous page
        handlePrevRef.current();
      }
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation for page flip (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !flipState.isFlipping) {
        handleNextRef.current();
      } else if (e.key === 'ArrowLeft' && !flipState.isFlipping) {
        handlePrevRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipState.isFlipping]);

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
    isLeftPage: boolean,
    isMobileView = false
  ) => {
    const dishes = sampleMenuItems.filter(d => d.category === category);

    return (
      <div className={`h-full flex flex-col justify-between ${
        isMobileView 
          ? 'space-y-4' 
          : isLeftPage 
            ? 'md:pr-6 border-stone-200 md:border-r' 
            : 'md:pl-6'
      }`}>
        
        {/* Page Top Header */}
        <div>
          <div className="flex items-center justify-between border-b-2 border-[#F36C21]/20 pb-2.5 sm:pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#F36C21]">
                {getCategoryIcon(category)}
                <span>Page {pageNumber} of 6 • {hindiTitle}</span>
              </div>
              <h3 className="font-serif text-lg sm:text-2xl font-black text-[#4A0E17] mt-0.5 tracking-tight">
                {title}
              </h3>
            </div>
            
            {/* Pure Veg Emblem */}
            <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-[#4E9F3D]/10 border border-[#4E9F3D]/25 text-[9px] sm:text-[10px] font-bold text-[#4E9F3D] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E9F3D]" />
              <span>100% Pure Veg</span>
            </div>
          </div>

          {/* Dishes List without "+ Add" button - clean, royal presentation */}
          <div className="space-y-3 pt-3.5 sm:pt-4">
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
                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D90429] bg-[#D90429]/10 px-1.5 sm:px-2 py-0.5 rounded-md">
                          <Flame className="w-3 h-3 fill-current" />
                          Live Counter
                        </span>
                      )}
                    </div>
                    {dish.hindiName && (
                      <span className="block text-[11px] sm:text-xs text-[#565C58]/80 font-medium">
                        {dish.hindiName}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#565C58] mt-1.5 leading-relaxed line-clamp-2">
                  {dish.description}
                </p>

                {/* Subtle Tags Pill */}
                <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-stone-100">
                  {dish.tags.map((t, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] sm:text-[10px] font-semibold text-stone-600 bg-stone-100 px-1.5 sm:px-2 py-0.5 rounded"
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
        <div className="pt-3.5 mt-2 border-t border-stone-200/60 flex items-center justify-between text-[9px] sm:text-[10px] text-stone-400 font-medium">
          <span>Singhal Food Catering • Ganaur & Sonipat</span>
          <span>Desi Ghee & Fresh Ground Spices</span>
        </div>

      </div>
    );
  };

  // For 3D leaf flip target pages
  const targetSpreadIndex = Math.floor(flipState.toIndex / 2);
  const targetLeftPage = pages[targetSpreadIndex * 2];
  const targetRightPage = pages[targetSpreadIndex * 2 + 1];

  // For mobile navigation
  const mobileCurrentPage = pages[activePageIndex];
  const pairedSpreadIndex = mobileCurrentPage.spreadIndex;
  const pairedLeftIndex = pairedSpreadIndex * 2;
  const pairedRightIndex = pairedSpreadIndex * 2 + 1;

  const isPrevDisabled = activePageIndex === 0 || flipState.isFlipping;
  const isNextDisabled = activePageIndex === pages.length - 1 || flipState.isFlipping;

  return (
    <section 
      ref={sectionRef}
      id="menu" 
      className="py-16 sm:py-20 lg:py-28 bg-[#FFFDF9] relative border-y border-[#F36C21]/15 overflow-hidden"
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

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 sm:space-y-4 mb-8 sm:mb-10">
          <div className="menu-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F36C21]/10 border border-[#F36C21]/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F36C21]">
            <BookOpen className="w-4 h-4 text-[#FFB300]" />
            <span>Interactive Royal Ledger</span>
          </div>

          <h2 className="menu-header-item font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-[#1F2421] tracking-tight">
            Explore Our <span className="text-gradient-saffron">Catering Flavours</span>
          </h2>

          <p className="menu-header-item text-sm sm:text-base lg:text-lg text-[#565C58] font-normal leading-relaxed">
            Turn pages in our royal catering book to discover slow-simmered gravies, live street chaat stations, and pure desi ghee sweets prepared for grand celebrations in Ganaur and Sonipat.
          </p>
        </div>

        {/* 3D BOUND ROYAL MENU BOOK CONTAINER */}
        <div 
          ref={bookSpreadRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-[#3A0A12] p-2.5 sm:p-5 shadow-[0_20px_50px_-10px_rgba(40,10,15,0.45),0_10px_25px_rgba(0,0,0,0.18)] border-3 sm:border-4 border-[#FFB300]/30 transition-transform duration-300"
          style={{ 
            perspective: '2200px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Gold Embossed Corner Accents */}
          <div className="absolute top-2 left-2 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-[#FFE57F] rounded-tl-lg pointer-events-none z-30" />
          <div className="absolute top-2 right-2 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-[#FFE57F] rounded-tr-lg pointer-events-none z-30" />
          <div className="absolute bottom-2 left-2 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-[#FFE57F] rounded-bl-lg pointer-events-none z-30" />
          <div className="absolute bottom-2 right-2 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-[#FFE57F] rounded-br-lg pointer-events-none z-30" />

          {/* Red Silk Satin Bookmark Ribbon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-20 sm:h-28 bg-gradient-to-b from-[#D90429] to-[#99021D] shadow-md z-40 rounded-b-md flex items-end justify-center pb-2 pointer-events-none">
            <div className="w-2 h-2 rotate-45 bg-[#3A0A12] absolute -bottom-1" />
          </div>

          {/* ============================================================== */}
          {/* 1. MOBILE SINGLE PAGE VIEW (< md) : EXACTLY 1 PAGE AT A TIME  */}
          {/* ============================================================== */}
          <div className="block md:hidden">
            {/* Top Spread Page Selector Pills (Quick Jump between paired pages) */}
            <div className="flex items-center gap-1.5 mb-2.5 p-1 rounded-xl bg-black/30 border border-white/10">
              <button
                type="button"
                onClick={() => handlePageTurn(pairedLeftIndex)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center ${
                  activePageIndex === pairedLeftIndex
                    ? 'bg-[#F36C21] text-white shadow-xs'
                    : 'text-stone-300 hover:text-white bg-white/5'
                }`}
              >
                Page {pages[pairedLeftIndex].pageNumber}: {pages[pairedLeftIndex].shortTitle}
              </button>

              <button
                type="button"
                onClick={() => handlePageTurn(pairedRightIndex)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center ${
                  activePageIndex === pairedRightIndex
                    ? 'bg-[#F36C21] text-white shadow-xs'
                    : 'text-stone-300 hover:text-white bg-white/5'
                }`}
              >
                Page {pages[pairedRightIndex].pageNumber}: {pages[pairedRightIndex].shortTitle}
              </button>
            </div>

            {/* Single Royal Page Body */}
            <div 
              ref={mobilePageRef}
              className="bg-[#FFFDF5] rounded-xl p-4 sm:p-5 border border-stone-200 shadow-inner relative overflow-hidden min-h-[460px]"
            >
              {renderPageContent(
                mobileCurrentPage.category,
                mobileCurrentPage.title,
                mobileCurrentPage.hindiTitle,
                mobileCurrentPage.pageNumber,
                mobileCurrentPage.isLeft,
                true
              )}
            </div>

            {/* Mobile Swipe Hint */}
            <div className="mt-2 text-center text-[10px] text-white/60 font-medium">
              <span>Swipe left or right to flip pages</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 2. DESKTOP OPEN 2-PAGE SPREAD (md and up)                     */}
          {/* ============================================================== */}
          <div className="hidden md:grid md:grid-cols-2 gap-2 bg-[#FFFDF5] rounded-2xl p-6 lg:p-8 border border-stone-200 relative shadow-inner overflow-hidden min-h-[580px]">
            
            {/* Center Book Spine Shadow Crease */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-9 bg-gradient-to-r from-stone-400/25 via-stone-500/40 to-stone-400/25 pointer-events-none z-30 shadow-inner" />

            {/* LEFT STATIC PAGE */}
            <div className="relative">
              {flipState.isFlipping && flipState.direction === 'prev' ? (
                renderPageContent(
                  targetLeftPage.category,
                  targetLeftPage.title,
                  targetLeftPage.hindiTitle,
                  targetLeftPage.pageNumber,
                  true,
                  false
                )
              ) : (
                renderPageContent(
                  leftPageOfSpread.category,
                  leftPageOfSpread.title,
                  leftPageOfSpread.hindiTitle,
                  leftPageOfSpread.pageNumber,
                  true,
                  false
                )
              )}
            </div>

            {/* RIGHT STATIC PAGE */}
            <div className="relative">
              {flipState.isFlipping && flipState.direction === 'next' ? (
                renderPageContent(
                  targetRightPage.category,
                  targetRightPage.title,
                  targetRightPage.hindiTitle,
                  targetRightPage.pageNumber,
                  false,
                  false
                )
              ) : (
                renderPageContent(
                  rightPageOfSpread.category,
                  rightPageOfSpread.title,
                  rightPageOfSpread.hindiTitle,
                  rightPageOfSpread.pageNumber,
                  false,
                  false
                )
              )}
            </div>

            {/* REALISTIC 3D TURNING PAGE LEAF (Active only during desktop flip) */}
            {flipState.isFlipping && (
              <div
                ref={turningLeafRef}
                className="absolute top-0 bottom-0 z-35 pointer-events-none"
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
                  className="absolute inset-0 bg-[#FFFDF5] p-6 lg:p-8 border border-stone-200 shadow-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)'
                  }}
                >
                  <div className={`absolute top-0 bottom-0 w-8 pointer-events-none z-10 ${
                    flipState.direction === 'next'
                      ? 'left-0 bg-gradient-to-r from-stone-500/30 to-transparent'
                      : 'right-0 bg-gradient-to-l from-stone-500/30 to-transparent'
                  }`} />

                  {flipState.direction === 'next' ? (
                    renderPageContent(
                      rightPageOfSpread.category,
                      rightPageOfSpread.title,
                      rightPageOfSpread.hindiTitle,
                      rightPageOfSpread.pageNumber,
                      false,
                      false
                    )
                  ) : (
                    renderPageContent(
                      leftPageOfSpread.category,
                      leftPageOfSpread.title,
                      leftPageOfSpread.hindiTitle,
                      leftPageOfSpread.pageNumber,
                      true,
                      false
                    )
                  )}
                </div>

                {/* BACK FACE OF TURNING LEAF */}
                <div 
                  className="absolute inset-0 bg-[#FFFDF5] p-6 lg:p-8 border border-stone-200 shadow-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className={`absolute top-0 bottom-0 w-8 pointer-events-none z-10 ${
                    flipState.direction === 'next'
                      ? 'right-0 bg-gradient-to-l from-stone-500/30 to-transparent'
                      : 'left-0 bg-gradient-to-r from-stone-500/30 to-transparent'
                  }`} />

                  {flipState.direction === 'next' ? (
                    renderPageContent(
                      targetLeftPage.category,
                      targetLeftPage.title,
                      targetLeftPage.hindiTitle,
                      targetLeftPage.pageNumber,
                      true,
                      false
                    )
                  ) : (
                    renderPageContent(
                      targetRightPage.category,
                      targetRightPage.title,
                      targetRightPage.hindiTitle,
                      targetRightPage.pageNumber,
                      false,
                      false
                    )
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* PAGINATION CONTROLS PLACED SPECIFICALLY BELOW THE BOOK */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 max-w-4xl mx-auto px-2 sm:px-4">
          
          {/* Previous Page Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className="btn-3d-phone w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all active:scale-95 shadow-sm"
            aria-label="Previous Page Spread"
          >
            <ChevronLeft className="w-4 h-4 text-[#F36C21]" />
            <span>Previous Page</span>
          </button>

          {/* Spread / Page Indicator & Quick Page Dots */}
          <div className="text-center space-y-1.5 order-first sm:order-none">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A0E17]">
              Royal Ledger • Page {activePageIndex + 1} of {pages.length} ({pages[activePageIndex].shortTitle})
            </span>
            <div className="flex items-center justify-center gap-1.5">
              {pages.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePageTurn(i)}
                  disabled={flipState.isFlipping}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activePageIndex === i 
                      ? 'w-7 sm:w-8 bg-[#F36C21] shadow-xs' 
                      : 'w-2 sm:w-2.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Jump to Page ${p.pageNumber}: ${p.title}`}
                  title={`Page ${p.pageNumber}: ${p.title}`}
                />
              ))}
            </div>
          </div>

          {/* Next Page Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled}
            className="btn-3d-cta w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all active:scale-95 shadow-md"
            aria-label="Next Page Spread"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Menu Action & Consultation Notice */}
        <div className="mt-12 sm:mt-14 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#enquire"
              className="btn-3d-cta sheen-effect inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-white font-bold text-sm sm:text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F36C21]/40 shadow-lg"
            >
              <FileText className="w-5 h-5 drop-shadow-xs" />
              <span>Request Menu & Quotation</span>
            </a>

            <a
              href={`tel:${siteConfig.contact.phoneNumber}`}
              className="btn-3d-phone inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-base font-bold shadow-md"
            >
              <PhoneCall className="w-4 sm:w-5 h-4 sm:h-5 text-[#F36C21]" />
              <span>Call Us: {siteConfig.contact.displayPhone}</span>
            </a>
          </div>

          <p className="text-xs text-[#565C58] max-w-xl mx-auto leading-relaxed px-2">
            Need special Jain dishes, onion-garlic free Sattvic food, or child-friendly live counters? Every item in our royal ledger can be customized to your family tradition.
          </p>
        </div>

      </div>
    </section>
  );
};
