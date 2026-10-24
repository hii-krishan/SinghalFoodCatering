import { useEffect, useRef, type FC } from 'react';
import { siteConfig } from '../config/siteConfig';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Sparkles, 
  CalendarCheck, 
  ShieldCheck 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, EASE } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { contact } = siteConfig;

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-header-item', {
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

      gsap.from('.contact-card-item', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: EASE.luxury
      });

      // Ambient embers parallax
      gsap.to('.contact-ambient-ember', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 bg-[#4A0E17] text-white relative overflow-hidden"
    >
      {/* Decorative Warm Saffron & Gold Embers with Parallax */}
      <div 
        className="contact-ambient-ember absolute top-0 right-10 w-80 h-80 bg-[#F36C21]/20 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="contact-ambient-ember absolute bottom-0 left-10 w-80 h-80 bg-[#FFB300]/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="contact-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFB300]">
            <Sparkles className="w-4 h-4 text-[#F36C21]" />
            <span>Connect Directly</span>
          </div>

          <h2 className="contact-header-item font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Let's Discuss Your <span className="text-gradient-gold">Upcoming Event</span>
          </h2>

          <p className="contact-header-item text-base sm:text-lg text-white/80 font-normal leading-relaxed">
            We are just a phone call or WhatsApp message away. Whether you are finalizing wedding dates in Sonipat or hosting a family gathering in Ganaur, our team is ready to assist.
          </p>
        </div>

        {/* PROMINENT DIRECT CONNECT TWIN CONSOLE (100% Identical Styling for Both Numbers) */}
        <div className="contact-header-item max-w-4xl mx-auto mb-12">
          <div className="p-1 rounded-3xl bg-gradient-to-r from-[#F36C21]/30 via-[#FFB300]/30 to-[#F36C21]/30 shadow-2xl">
            <div className="bg-[#2A060C]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 border border-white/10 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F36C21]/20 border border-[#F36C21]/40 flex items-center justify-center text-[#FFB300]">
                    <Phone className="w-5 h-5 text-[#F36C21]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                      Direct Connect Hotlines
                    </h3>
                    <p className="text-xs text-white/70">
                      Reach Krishan Singhal & team instantly on either line
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Event Inquiries</span>
                </div>
              </div>

              {/* Symmetrical Twin Line Cards (Identical Design) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                {/* LINE 1 CONSOLE */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F36C21]/50 transition-all space-y-4 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB300] bg-white/10 px-2.5 py-0.5 rounded-md">
                      Line 1 • Direct Consultation
                    </span>
                    <span className="text-[10px] text-white/50 font-mono">Ganaur & Sonipat</span>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xl sm:text-2xl font-black text-white group-hover:text-[#FFB300] transition-colors tracking-tight">
                      {contact.displayPhone}
                    </div>
                    <p className="text-xs text-white/70">
                      Call or WhatsApp for menu customization & rates
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <a
                      href={`tel:${contact.phoneNumber}`}
                      className="btn-3d-cta sheen-effect flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-white font-bold text-xs shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>

                    <a
                      href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappDefaultMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-3d-whatsapp sheen-effect flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* LINE 2 CONSOLE (100% Identical Symmetrical Styling) */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F36C21]/50 transition-all space-y-4 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB300] bg-white/10 px-2.5 py-0.5 rounded-md">
                      Line 2 • Direct Consultation
                    </span>
                    <span className="text-[10px] text-white/50 font-mono">Ganaur & Sonipat</span>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xl sm:text-2xl font-black text-white group-hover:text-[#FFB300] transition-colors tracking-tight">
                      {contact.displaySecondaryPhone}
                    </div>
                    <p className="text-xs text-white/70">
                      Call or WhatsApp for date bookings & event estimates
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <a
                      href={`tel:${contact.secondaryPhone}`}
                      className="btn-3d-cta sheen-effect flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-white font-bold text-xs shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>

                    <a
                      href={`https://wa.me/${contact.secondaryWhatsappNumber}?text=${encodeURIComponent(contact.whatsappDefaultMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-3d-whatsapp sheen-effect flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          
          {/* Card 1: Direct Phone Call */}
          <div className="contact-card-item glass-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#FFB300]/50 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F36C21]/20 text-[#FFB300] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFB300]">Direct Call</span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  Speak with the Caterer
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  For immediate date availability checks and personalized event consultation.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 font-mono text-sm font-bold text-[#FFB300]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#F36C21]" />
                    <span>{contact.displayPhone}</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/60 bg-white/10 px-2 py-0.5 rounded">
                    Line 1
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 font-mono text-sm font-bold text-[#FFB300]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#F36C21]" />
                    <span>{contact.displaySecondaryPhone}</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/60 bg-white/10 px-2 py-0.5 rounded">
                    Line 2
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <a
                href={`tel:${contact.phoneNumber}`}
                className="btn-3d-cta sheen-effect w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold text-xs cursor-pointer shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {contact.displayPhone}</span>
              </a>

              <a
                href={`tel:${contact.secondaryPhone}`}
                className="btn-3d-cta sheen-effect w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold text-xs cursor-pointer shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {contact.displaySecondaryPhone}</span>
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Instant Chat */}
          <div className="contact-card-item glass-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border-[#25D366]/40 hover:border-[#25D366] transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#25D366]">WhatsApp Business</span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  Message on WhatsApp
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  Share event details, receive sample menus, and get instant answers on either line.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 font-mono text-sm font-bold text-[#25D366]">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>{contact.displayPhone}</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/60 bg-white/10 px-2 py-0.5 rounded">
                    WhatsApp 1
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 font-mono text-sm font-bold text-[#25D366]">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>{contact.displaySecondaryPhone}</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/60 bg-white/10 px-2 py-0.5 rounded">
                    WhatsApp 2
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <a
                href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-whatsapp sheen-effect w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs cursor-pointer shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat on {contact.displayPhone}</span>
              </a>

              <a
                href={`https://wa.me/${contact.secondaryWhatsappNumber}?text=${encodeURIComponent(contact.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-whatsapp sheen-effect w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs cursor-pointer shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat on {contact.displaySecondaryPhone}</span>
              </a>
            </div>
          </div>

          {/* Card 3: Service Base & Timings */}
          <div className="contact-card-item glass-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#FFB300]/50 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#FFB300] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFB300]">Location & Regions</span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  Service Base
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  Centrally based in Ganaur, catering events across Sonipat, Murthal, Rai, and adjacent NCR areas.
                </p>
              </div>

              <div className="pt-2 text-xs text-white/90 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FFB300]" />
                  <span>Enquiry Hours: 8:00 AM – 10:00 PM (Daily)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E9F3D]" />
                  <span>On-Site Kitchen Visits Welcome by Appointment</span>
                </div>
              </div>
            </div>

            <a
              href="#enquire"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 hover:scale-[1.02] active:scale-100 transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-[#FFB300]" />
              <span>Submit Event Inquiry</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
