import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if the user has requested reduced motion in their OS or browser settings.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Standard editorial luxury easing curves
 */
export const EASE = {
  luxury: 'power3.out',
  smooth: 'power2.out',
  editorial: 'expo.out',
  snappy: 'back.out(1.4)',
  gentle: 'sine.out'
};

/**
 * Helper to split text into animated word spans with overflow hidden wrappers
 * for crisp masked slide-up typography reveals.
 */
export function createWordSpans(text: string): { word: string; index: number }[] {
  return text.split(/\s+/).filter(Boolean).map((word, index) => ({
    word,
    index
  }));
}
