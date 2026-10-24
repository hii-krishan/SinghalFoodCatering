import type { FC } from 'react';

interface WordmarkProps {
  variant?: 'light' | 'dark' | 'footer';
  className?: string;
  showTagline?: boolean;
}

/**
 * Reusable Brand Wordmark Component
 * Note: Designed to be easily replaced by a custom SVG or image logo in the future
 * without altering navbar or footer layouts.
 */
export const Wordmark: FC<WordmarkProps> = ({
  variant = 'light',
  className = '',
  showTagline = false
}) => {
  const isDark = variant === 'dark' || variant === 'footer';

  return (
    <a 
      href="#hero" 
      className={`group flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F36C21] rounded-xl p-0.5 ${className}`}
      aria-label="Singhal Food Catering Home"
    >
      {/* Decorative 3D Brand Coin Emblem */}
      <div className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 shrink-0 ${
        isDark 
          ? 'bg-gradient-to-b from-[#FF8A3D] via-[#F36C21] to-[#D85611] text-white shadow-[0_6px_18px_rgba(243,108,33,0.4),inset_0_1.5px_0.5px_rgba(255,255,255,0.7),inset_0_-2px_0_rgba(0,0,0,0.25)] border border-white/50' 
          : 'bg-gradient-to-b from-[#58121D] via-[#4A0E17] to-[#2B050B] text-[#FFB300] shadow-[0_6px_18px_rgba(74,14,23,0.32),inset_0_1.5px_0.5px_rgba(255,255,255,0.4),inset_0_-2.5px_0_rgba(0,0,0,0.45)] border border-amber-400/30'
      }`}>
        {/* Subtle 3D inner coin rim */}
        <div className="absolute inset-0.5 rounded-[14px] border border-white/15 pointer-events-none" />

        {/* Stylized Royal Handi / Cloche Icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] relative z-10"
        >
          {/* Base Plate */}
          <path d="M4 17h16" />
          <path d="M12 5v2" />
          {/* Domed Cloche */}
          <path d="M4 17c0-4.418 3.582-8 8-8s8 3.582 8 8" />
          {/* Finial / Flame Accent */}
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
        </svg>

        {/* Small glowing live freshness indicator dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-80" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-br from-[#4E9F3D] to-[#25D366] border-2 border-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left justify-center select-none">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-serif text-[1.35rem] sm:text-[1.55rem] font-black tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] ${
            isDark ? 'text-white drop-shadow-none' : 'text-[#3E0911]'
          }`}>
            Singhal
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white px-2 py-0.5 rounded-md bg-gradient-to-r from-[#F36C21] to-[#E65A0B] shadow-[0_2px_6px_rgba(243,108,33,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] border border-[#F36C21]/40">
            Catering
          </span>
        </div>
        <span className={`font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] mt-1 ${
          isDark ? 'text-[#FFB300]/95' : 'text-[#565C58]'
        }`}>
          Food & Celebrations • Ganaur
        </span>

        {showTagline && (
          <span className={`text-[11px] font-medium italic mt-0.5 ${
            isDark ? 'text-white/70' : 'text-[#565C58]'
          }`}>
            Ganaur & Sonipat, Haryana
          </span>
        )}
      </div>
    </a>
  );
};
