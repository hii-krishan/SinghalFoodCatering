import { useState, useEffect, useCallback, useRef, type FC } from 'react';
import { galleryItems, galleryCategories, type GalleryItem } from '../data/galleryData';
import { 
  Sparkles, 
  MapPin, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  CalendarCheck 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, EASE } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export const GallerySection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleNextImage = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIndex]);
  }, [activeModalItem, filteredItems]);

  const handlePrevImage = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[prevIndex]);
  }, [activeModalItem, filteredItems]);

  // Lightbox keyboard navigation (ESC, Left, Right)
  useEffect(() => {
    if (!activeModalItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null);
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem, handleNextImage, handlePrevImage]);

  // ScrollTrigger for header and gallery items
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gallery-header-item', {
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

      gsap.from('.gallery-item-card', {
        scrollTrigger: {
          trigger: galleryGridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: EASE.luxury
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Quick re-stagger when changing gallery category
  useEffect(() => {
    if (prefersReducedMotion() || !galleryGridRef.current) return;
    gsap.fromTo(
      galleryGridRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: EASE.smooth }
    );
  }, [activeCategory]);

  // 3D Card Hover Tilt
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <section 
      ref={sectionRef}
      id="gallery" 
      className="py-20 lg:py-28 bg-[#FDFBF7] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="gallery-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E9F3D]/10 border border-[#4E9F3D]/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4E9F3D]">
            <Sparkles className="w-4 h-4" />
            <span>Visual Culinary Chronicle</span>
          </div>

          <h2 className="gallery-header-item font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2421] tracking-tight">
            Food & Event <span className="text-gradient-saffron">Gallery</span>
          </h2>

          <p className="gallery-header-item text-base sm:text-lg text-[#565C58] font-normal leading-relaxed">
            Feast your eyes on our royal wedding setups, live street food counters, sizzlers, and warm banquet atmospheres across Ganaur and Sonipat.
          </p>

          {/* Category Filter Pills */}
          <div className="gallery-header-item flex flex-wrap items-center justify-center gap-2 pt-4">
            {galleryCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F36C21] ${
                  activeCategory === category
                    ? 'bg-[#4A0E17] text-white shadow-md shadow-[#4A0E17]/20 scale-105'
                    : 'bg-white text-[#565C58] hover:bg-[#FFF6EE] hover:text-[#F36C21] border border-stone-200 hover:scale-105 active:scale-95'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry 3D Grid */}
        <div 
          ref={galleryGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => {
            const isWide = index === 0 || index === 5;

            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className={`gallery-item-card group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#F36C21]/20 bg-stone-100 ${
                  isWide ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-square'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Ambient Dark Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Badge */}
                {item.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Quick Expand Icon on Hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1F2421] shadow-md">
                  <Maximize2 className="w-4 h-4 text-[#F36C21]" />
                </div>

                {/* Bottom Title & Details */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white transform group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-1 text-[11px] text-[#FFB300] font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.locationTag}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-[#FFB300] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Lightbox Modal */}
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Image Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content Card */}
            <div 
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-[#1F2421] rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 bg-[#2B2321] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FFB300] mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#FFB300]/20 text-[#FFB300] font-bold">
                      {activeModalItem.category}
                    </span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeModalItem.locationTag}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    {activeModalItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                    {activeModalItem.caption}
                  </p>
                </div>

                <a
                  href="#enquire"
                  onClick={() => setActiveModalItem(null)}
                  className="btn-3d-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider shrink-0"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Enquire For This Setup</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
