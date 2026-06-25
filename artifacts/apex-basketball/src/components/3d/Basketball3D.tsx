import { useEffect, useRef, useState } from 'react';

export default function Basketball3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 15, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef<number>();
  const bobRef = useRef<number>();
  const yOffset = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;

    const bob = () => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      yOffset.current = Math.sin(elapsed * 1.2) * 18;
      ball.style.transform = `translateY(${yOffset.current}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
      bobRef.current = requestAnimationFrame(bob);
    };

    if (!isDragging) {
      bobRef.current = requestAnimationFrame(bob);
    }

    return () => {
      if (bobRef.current) cancelAnimationFrame(bobRef.current);
    };
  }, [isDragging, rotation.x, rotation.y]);

  useEffect(() => {
    if (isDragging) return;

    const autoRotate = () => {
      setRotation(prev => ({ ...prev, y: prev.y + 0.4 }));
      autoRotateRef.current = requestAnimationFrame(autoRotate);
    };

    autoRotateRef.current = requestAnimationFrame(autoRotate);
    return () => {
      if (autoRotateRef.current) cancelAnimationFrame(autoRotateRef.current);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setRotation(prev => ({ x: prev.x + dy * 0.5, y: prev.y + dx * 0.5 }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - lastMouse.current.x;
    const dy = e.touches[0].clientY - lastMouse.current.y;
    setRotation(prev => ({ x: prev.x + dy * 0.5, y: prev.y + dx * 0.5 }));
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-auto z-0"
      data-testid="basketball-3d-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Glow light source from upper-left */}
      <div className="absolute top-[15%] left-[20%] w-[300px] h-[300px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />
      {/* Rim light from behind (orange) */}
      <div className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Basketball */}
      <div
        ref={ballRef}
        style={{
          width: 'clamp(220px, 30vw, 380px)',
          height: 'clamp(220px, 30vw, 380px)',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 35% 30%, #ff8c42 0%, #e35b04 35%, #a03d00 70%, #6b2700 100%)
          `,
          boxShadow: `
            inset -30px -30px 60px rgba(0,0,0,0.6),
            inset 20px 15px 40px rgba(255,140,60,0.3),
            0 0 80px rgba(227,91,4,0.4),
            0 0 150px rgba(227,91,4,0.15),
            0 20px 60px rgba(0,0,0,0.7)
          `,
          position: 'relative',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        {/* Basketball seam lines — SVG overlay */}
        <svg
          viewBox="0 0 200 200"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            opacity: 0.6,
            pointerEvents: 'none',
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal center seam */}
          <path
            d="M 10 100 Q 55 80, 100 100 Q 145 120, 190 100"
            fill="none"
            stroke="#1a0a00"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Vertical center seam */}
          <path
            d="M 100 10 Q 80 55, 100 100 Q 120 145, 100 190"
            fill="none"
            stroke="#1a0a00"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Left seam arc */}
          <path
            d="M 55 15 Q 15 100, 55 185"
            fill="none"
            stroke="#1a0a00"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Right seam arc */}
          <path
            d="M 145 15 Q 185 100, 145 185"
            fill="none"
            stroke="#1a0a00"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Top arc */}
          <path
            d="M 15 55 Q 100 15, 185 55"
            fill="none"
            stroke="#1a0a00"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Bottom arc */}
          <path
            d="M 15 145 Q 100 185, 185 145"
            fill="none"
            stroke="#1a0a00"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Highlight */}
          <ellipse cx="70" cy="65" rx="18" ry="10" fill="rgba(255,255,255,0.12)" transform="rotate(-30 70 65)" />
        </svg>

        {/* Specular highlight */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '18%',
          width: '28%',
          height: '22%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 70%)',
          transform: 'rotate(-30deg)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Ground shadow/reflection */}
      <div style={{
        position: 'absolute',
        bottom: '18%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(140px, 18vw, 240px)',
        height: '30px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.5)',
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
