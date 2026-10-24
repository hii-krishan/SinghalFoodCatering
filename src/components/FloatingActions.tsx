import { useState, useEffect, type FC } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';

export const FloatingActions: FC = () => {
  const { contact } = siteConfig;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop / Tablet Floating WhatsApp Pill - Bottom Right */}
      <aside 
        aria-label="Quick contact links"
        className={`fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 transition-all duration-500 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <a
          href="#enquire"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider shadow-xl hover:bg-[#32070D] hover:scale-105 transition-all border border-white/20"
        >
          <CalendarCheck className="w-4 h-4 text-[#FFB300]" />
          <span>Plan Event</span>
        </a>

        <a
          href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappDefaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-100 transition-all border-2 border-white"
          aria-label="Direct WhatsApp Message"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>WhatsApp Catering</span>
        </a>
      </aside>

      {/* Mobile Sticky Bottom Floating Bar */}
      <aside 
        aria-label="Mobile quick contact bar"
        className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 p-2.5 px-4 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      >
        {/* Call Now */}
        <a
          href={`tel:${contact.phoneNumber}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-100 text-[#4A0E17] font-bold text-xs"
        >
          <Phone className="w-4 h-4 text-[#F36C21]" />
          <span>Call Caterer</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappDefaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>

        {/* Quote Form */}
        <a
          href="#enquire"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F36C21] to-[#FFB300] text-white font-bold text-xs shadow-xs"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Quote</span>
        </a>
      </aside>
    </>
  );
};
