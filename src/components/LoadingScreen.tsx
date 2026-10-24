import { useEffect, useState, useRef, type FC } from 'react';
import gsap from 'gsap';
import { Sparkles, Utensils } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Igniting the Hearth...');
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stage messages based on progress
    const messages = [
      { at: 15, text: 'Igniting the Traditional Hearth...' },
      { at: 40, text: 'Selecting Hand-Pounded Spices & Desi Ghee...' },
      { at: 70, text: 'Polishing Royal Brass & Copper Thalis...' },
      { at: 90, text: 'Setting Grand Banquet in Ganaur & Sonipat...' },
      { at: 98, text: 'Welcome to Singhal Food Catering' }
    ];

    let currentVal = 0;
    const interval = setInterval(() => {
      // Non-linear realistic progress speed
      const increment = Math.max(1, Math.floor((100 - currentVal) * 0.12 + Math.random() * 4));
      currentVal = Math.min(100, currentVal + increment);
      setProgress(currentVal);

      const matchedMsg = [...messages].reverse().find(m => currentVal >= m.at);
      if (matchedMsg) {
        setLoadingText(matchedMsg.text);
      }

      if (currentVal >= 100) {
        clearInterval(interval);

        // Smooth GSAP exit animation: curtain pull & scale-out
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });

        tl.to(counterRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in'
        })
        .to(logoRef.current, {
          scale: 1.15,
          opacity: 0,
          duration: 0.45,
          ease: 'power3.in'
        }, '-=0.2')
        .to('.loading-curtain-top', {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut'
        })
        .to('.loading-curtain-bottom', {
          yPercent: 100,
          duration: 0.85,
          ease: 'power4.inOut'
        }, '<')
        .to(overlayRef.current, {
          opacity: 0,
          display: 'none',
          duration: 0.2
        });
      }
    }, 38);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-auto"
      style={{ perspective: 1000 }}
    >
      {/* Top Split Curtain */}
      <div className="loading-curtain-top absolute top-0 inset-x-0 h-1/2 bg-[#2D060C] border-b border-[#F36C21]/30 z-10 origin-top shadow-2xl" />

      {/* Bottom Split Curtain */}
      <div className="loading-curtain-bottom absolute bottom-0 inset-x-0 h-1/2 bg-[#1C0307] border-t border-[#F36C21]/30 z-10 origin-bottom shadow-2xl" />

      {/* Central Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-md w-full">
        
        {/* Animated 3D Emblem with Rotating Glow */}
        <div ref={logoRef} className="relative mb-6">
          {/* Ambient Rotating Saffron Glow */}
          <div 
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#F36C21] via-[#FFB300] to-[#E63946] opacity-40 blur-xl animate-spin" 
            style={{ animationDuration: '6s' }}
          />

          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-[#4A0E17] to-[#1C0307] p-1 border border-[#FFB300]/40 shadow-2xl flex items-center justify-center">
            {/* Inner Ring */}
            <div className="w-full h-full rounded-2xl bg-[#32070D] flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
              <Utensils className="w-8 h-8 text-[#FFB300] drop-shadow-md" />
              <div className="text-[10px] font-black uppercase tracking-widest text-[#F36C21] mt-1 font-sans">
                SFC
              </div>

              {/* Shimmer sweep */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-in"
                style={{
                  animation: 'sheenSweep 2s infinite ease-in-out'
                }}
              />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-1 mb-6">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFB300]">
            Catering Excellence Since 1998
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight">
            Singhal Food Catering
          </h2>
          <p className="text-xs text-white/60 font-sans tracking-wide">
            Ganaur & Sonipat • Haryana
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-3">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/15 shadow-inner">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#F36C21] via-[#FFB300] to-[#4E9F3D] transition-all duration-100 ease-out shadow-[0_0_12px_#F36C21]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-white/80 font-mono">
            <span className="flex items-center gap-1.5 text-stone-300">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB300]" />
              <span className="truncate max-w-[240px] text-left">{loadingText}</span>
            </span>

            <span ref={counterRef} className="font-bold text-[#FFB300] text-sm tabular-nums">
              {progress}%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
