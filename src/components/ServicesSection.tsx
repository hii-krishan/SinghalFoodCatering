import { useState, useEffect, useRef, type FC } from 'react';
import { servicesData, type CateringServiceItem } from '../data/servicesData';
import { Users, Sparkles, ChevronRight, CheckCircle2, CalendarPlus, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, EASE } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onSelectServiceForEnquiry?: (serviceTitle: string) => void;
}

export const ServicesSection: FC<ServicesSectionProps> = ({ onSelectServiceForEnquiry }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const filterOptions = ['All', 'Weddings & Pre-Weddings', 'Family & Birthdays', 'Outdoor & Corporate'];

  const filteredServices = servicesData.filter((svc) => {
    if (activeCategoryFilter === 'All') return true;
    if (activeCategoryFilter === 'Weddings & Pre-Weddings') {
      return svc.id.includes('wedding') || svc.id.includes('engagement');
    }
    if (activeCategoryFilter === 'Family & Birthdays') {
      return svc.id.includes('birthday') || svc.id.includes('family') || svc.id.includes('festival');
    }
    if (activeCategoryFilter === 'Outdoor & Corporate') {
      return svc.id.includes('corporate') || svc.id.includes('outdoor') || svc.id.includes('special');
    }
    return true;
  });

  // GSAP ScrollTrigger on section entrance
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.services-header-elem', {
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

      gsap.from('.service-card-item', {
        scrollTrigger: {
          trigger: cardsContainerRef.current,
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

  // Quick re-animation when category filter changes
  useEffect(() => {
    if (prefersReducedMotion() || !cardsContainerRef.current) return;
    gsap.fromTo(
      cardsContainerRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.45, ease: EASE.smooth }
    );
  }, [activeCategoryFilter]);

  const handleEnquireService = (title: string) => {
    if (onSelectServiceForEnquiry) {
      onSelectServiceForEnquiry(title);
    }
    const enquiryElem = document.getElementById('enquire');
    if (enquiryElem) {
      enquiryElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3D Tilt on hover
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-20 lg:py-28 bg-[#FDFBF7] relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB300]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#4E9F3D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="services-header-elem inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A0E17]/5 border border-[#4A0E17]/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A0E17]">
            <Sparkles className="w-4 h-4 text-[#F36C21]" />
            <span>Tailored For Every Celebration</span>
          </div>

          <h2 className="services-header-elem font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2421] tracking-tight">
            Catering Services in <span className="text-gradient-saffron">Ganaur & Sonipat</span>
          </h2>

          <p className="services-header-elem text-base sm:text-lg text-[#565C58] font-normal leading-relaxed">
            Every gathering has its own rhythm and taste. Whether an auspicious family ritual, a royal wedding banquet, or a high-energy lawn feast, we tailor each spread to your guest count, dietary preferences, and event timeline.
          </p>

          {/* Quick Filter Tabs */}
          <div className="services-header-elem flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveCategoryFilter(filter)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F36C21] ${
                  activeCategoryFilter === filter
                    ? 'bg-[#4A0E17] text-white shadow-md shadow-[#4A0E17]/20 scale-105'
                    : 'bg-white text-[#565C58] hover:bg-[#FFF6EE] hover:text-[#F36C21] border border-black/5 hover:scale-105 active:scale-95'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Services 3D Tactile Grid */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {filteredServices.map((service: CateringServiceItem) => (
            <div
              key={service.id}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="service-card-item group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#F36C21]/20 shadow-sm hover:shadow-2xl hover:border-[#F36C21]/50 transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                <img
                  src={service.image}
                  alt={`${service.title} catering in Ganaur & Sonipat`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />
                
                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#4A0E17] shadow-xs">
                    {service.categoryTag}
                  </span>
                </div>

                {/* Guest Size Indicator */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  <Users className="w-3.5 h-3.5 text-[#FFB300]" />
                  <span>{service.recommendedGuestSize}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#1F2421] group-hover:text-[#F36C21] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-1.5 pt-1">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#1F2421]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4E9F3D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Popular Hint */}
                  <div className="pt-2 border-t border-stone-100 text-[11px] text-[#565C58]/80">
                    <span className="font-semibold text-[#4A0E17]">Popular picks:</span> {service.popularItemsHint}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => handleEnquireService(service.title)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FFF6EE] hover:bg-[#F36C21] text-[#F36C21] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F36C21] cursor-pointer"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Plan For This Event</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Event Advisory Callout with 3D Bevel */}
        <div className="mt-14 max-w-4xl mx-auto bg-gradient-to-r from-white via-[#FFF8EE] to-white rounded-3xl p-6 sm:p-8 border border-[#F36C21]/25 shadow-lg text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[#4A0E17] font-serif text-lg sm:text-xl font-bold">
            <Award className="w-5 h-5 text-[#F36C21]" />
            <h4>Planning a custom event not listed above?</h4>
          </div>
          <p className="text-xs sm:text-sm text-[#565C58] max-w-2xl mx-auto leading-relaxed">
            All services are proposed offerings and strictly customized with the business owner upon consultation. We regularly cater for special pooja path gatherings, satsangs, school/college alumni meets, and intimate garden dinners across Sonipat and Ganaur.
          </p>
          <div className="pt-2">
            <a
              href="#enquire"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F36C21] hover:text-[#D4530E] underline decoration-2 underline-offset-4"
            >
              <span>Discuss Your Specific Event Requirements with Us →</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
