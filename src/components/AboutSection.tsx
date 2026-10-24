import { useEffect, useRef, type FC } from 'react';
import { siteConfig } from '../config/siteConfig';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Flame, 
  Users, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, EASE } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { about, contact } = siteConfig;

  // Icon mapping for core pillars
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#4E9F3D]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#D90429]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#F36C21]" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-6 h-6 text-[#FFB300]" />;
    }
  };

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax on the collage images as user scrolls through the section
      gsap.to('.about-parallax-secondary', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Right column text reveals
      gsap.from('.about-reveal-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none'
        },
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: EASE.editorial
      });

      // Staggered reveal for 4 core pillars
      gsap.from('.about-pillar-card', {
        scrollTrigger: {
          trigger: '.about-pillars-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: EASE.luxury
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-12 sm:py-16 lg:py-20 bg-[#FFFDF9] relative border-t border-[#F36C21]/10"
    >
      
      {/* Decorative Warm Background Shapes */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FFB300]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4A0E17]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Story Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Collage with Live Chaat & Wedding Buffet */}
          <div className="lg:col-span-5 relative space-y-4">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="/images/live_chaat.jpg"
                alt="Singhal Food Catering live counter preparation"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB300] bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  On-Site Craft
                </span>
                <h4 className="font-serif text-lg font-bold mt-1">
                  Fresh, Live & Welcoming Hospitality
                </h4>
              </div>
            </div>

            {/* Overlapping Secondary Card with Parallax */}
            <div className="about-parallax-secondary sm:w-3/4 ml-auto -mt-8 sm:-mt-12 relative z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[16/9] hidden sm:block">
              <img
                src="/images/wedding_buffet.jpg"
                alt="Singhal Food Catering royal banquet presentation"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Regional Badge */}
            <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-[#F36C21]/20 shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F36C21]/15 text-[#F36C21] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left text-xs">
                <strong className="block text-[#1F2421] font-bold">Local Service Roots</strong>
                <span className="text-[#565C58]">Ganaur, Sonipat & surrounding Haryana regions</span>
              </div>
            </div>

          </div>

          {/* Right Column: Brand Philosophy & Story */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            <div className="about-reveal-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A0E17]/5 border border-[#4A0E17]/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A0E17]">
              <Sparkles className="w-4 h-4 text-[#F36C21]" />
              <span>About Singhal Food Catering</span>
            </div>

            <h2 className="about-reveal-item font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[#1F2421] tracking-tight leading-tight">
              Food Prepared with Respect, <br />
              <span className="text-gradient-saffron">Served with Heartfelt Warmth.</span>
            </h2>

            <p className="about-reveal-item text-base sm:text-lg text-[#565C58] font-normal leading-relaxed">
              {about.introduction}
            </p>

            <div className="about-reveal-item p-4 rounded-2xl bg-[#FFF6EE] border-l-4 border-[#F36C21] space-y-1">
              <h4 className="text-sm font-bold text-[#4A0E17]">Our Catering Philosophy</h4>
              <p className="text-xs sm:text-sm text-[#565C58] leading-relaxed">
                {about.philosophy}
              </p>
            </div>

            <p className="about-reveal-item text-xs sm:text-sm text-[#565C58] leading-relaxed">
              {about.prepPromise}
            </p>

            {/* Core Pillars Grid */}
            <div className="about-pillars-grid grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {about.corePillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="about-pillar-card p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-[#F36C21]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-1.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-stone-50">
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#1F2421]">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#565C58] leading-relaxed pl-1">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Service Region Badges Strip */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4A0E17]">
                <MapPin className="w-3.5 h-3.5 text-[#F36C21]" />
                <span>Primary Catering Service Locations</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {contact.serviceRegions.map((region) => (
                  <span
                    key={region}
                    className="px-3 py-1 rounded-lg bg-white border border-stone-200 text-xs font-medium text-stone-700 shadow-2xs"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
