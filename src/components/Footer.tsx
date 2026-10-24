import type { FC } from 'react';
import { Wordmark } from './Wordmark';
import { siteConfig } from '../config/siteConfig';
import { Phone, MessageCircle, MapPin, Heart, ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1F2421] text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand & Wordmark Column */}
          <div className="lg:col-span-5 space-y-4">
            <Wordmark variant="footer" showTagline />
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Premium, bespoke event and wedding catering rooted in Ganaur and actively serving Sonipat, Murthal, and surrounding Haryana regions. Good food, pure ingredients, and warm hospitality.
            </p>

            <div className="pt-2 text-xs text-stone-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F36C21] shrink-0" />
              <span>Ganaur, Sonipat District, Haryana, India</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FFB300]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <a href="#hero" className="hover:text-[#F36C21] transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F36C21] transition-colors">Catering Services</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#F36C21] transition-colors">Sample Menu</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F36C21] transition-colors">Event Gallery</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F36C21] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#enquire" className="hover:text-[#F36C21] transition-colors">Request a Quote</a>
              </li>
            </ul>
          </div>

          {/* Service Areas Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FFB300]">
              Service Regions
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              {siteConfig.contact.serviceRegions.map((region) => (
                <li key={region} className="hover:text-stone-200 transition-colors">
                  • {region}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact & Quote Reminder */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#FFB300]">
              Direct Contact
            </h4>
            
            <p className="text-xs text-stone-400 leading-relaxed">
              {siteConfig.quoteDisclaimer}
            </p>

            <div className="space-y-2.5 pt-1">
              {/* Line 1 - Primary Direct Connect */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#F36C21]/60 transition-all group">
                <a
                  href={`tel:${siteConfig.contact.phoneNumber}`}
                  className="flex items-center gap-2.5 text-sm font-bold text-white group-hover:text-[#F36C21] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F36C21]" />
                  <span>{siteConfig.contact.displayPhone}</span>
                </a>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 bg-white/10 px-2 py-0.5 rounded">
                  Line 1
                </span>
              </div>

              {/* Line 2 - Direct Connect (Identical Styling) */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#F36C21]/60 transition-all group">
                <a
                  href={`tel:${siteConfig.contact.secondaryPhone}`}
                  className="flex items-center gap-2.5 text-sm font-bold text-white group-hover:text-[#F36C21] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F36C21]" />
                  <span>{siteConfig.contact.displaySecondaryPhone}</span>
                </a>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 bg-white/10 px-2 py-0.5 rounded">
                  Line 2
                </span>
              </div>

              {/* Symmetrical Twin WhatsApp Links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-bold text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp 1</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.contact.secondaryWhatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-bold text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp 2</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <div>
            © {CURRENT_YEAR} {siteConfig.brandName}. All rights reserved. Serving Ganaur & Sonipat, Haryana.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#D90429] fill-current" />
            <span>for authentic Indian gatherings</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
