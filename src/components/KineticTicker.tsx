import { type FC } from 'react';
import { Sparkles, Utensils, Award, Flame, HeartHandshake, ShieldCheck } from 'lucide-react';

export const KineticTicker: FC = () => {
  const tickerItems = [
    { text: '100% Pure Veg Feasts', icon: ShieldCheck, color: '#4E9F3D' },
    { text: 'Grand Wedding Buffets', icon: Award, color: '#FFB300' },
    { text: 'Live Tawa & Tandoor Kiosks', icon: Flame, color: '#F36C21' },
    { text: 'Ganaur & Sonipat Heritage', icon: Utensils, color: '#4A0E17' },
    { text: 'Desi Ghee Artisanal Mithai', icon: Sparkles, color: '#FFB300' },
    { text: 'Dedicated Courteous Staff', icon: HeartHandshake, color: '#F36C21' },
  ];

  return (
    <div className="relative py-4 bg-gradient-to-r from-[#32070D] via-[#4A0E17] to-[#32070D] overflow-hidden border-y border-[#FFB300]/30 shadow-lg -rotate-1 scale-[1.02] my-6 z-20">
      {/* Ambient Glows */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#200407] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#200407] to-transparent z-10 pointer-events-none" />

      {/* Ticker Track with Infinite Marquee Animation */}
      <div className="flex items-center gap-8 whitespace-nowrap will-change-transform animate-ticker">
        {/* Render twice for continuous loop */}
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-xs shadow-xs"
            >
              <Icon className="w-4 h-4 shrink-0" style={{ color: item.color }} />
              <span className="text-stone-100 font-sans">{item.text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB300]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
