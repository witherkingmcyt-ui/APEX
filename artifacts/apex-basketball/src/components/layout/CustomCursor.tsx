import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  // Real pos
  const mouse = useRef({ x: -100, y: -100 });
  // Ring pos (lerped)
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Lerp loop
    let raf: number;
    const render = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.2;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.2;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 z-[9999] rounded-full pointer-events-none transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2
          ${hovering 
            ? "w-16 h-16 border border-primary bg-primary/20" 
            : "w-10 h-10 border border-primary/50 bg-transparent"
          }
        `}
        style={{ transformOrigin: "center center" }}
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
