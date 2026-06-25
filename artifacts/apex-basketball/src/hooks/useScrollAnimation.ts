import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(ref: React.RefObject<HTMLElement | null>, options: { stagger?: number, yOffset?: number } = {}) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const elements = ref.current?.querySelectorAll('.scroll-animate');
      if (elements && elements.length > 0) {
        gsap.fromTo(
          elements,
          { y: options.yOffset || 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: options.stagger || 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
            }
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [ref, options.stagger, options.yOffset]);
}
