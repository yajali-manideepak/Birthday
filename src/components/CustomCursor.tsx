import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [trail, setTrail] = useState<Particle[]>([]);

  const targetRef = useRef({ x: -100, y: -100 });
  const currentTrailingRef = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports hover/fine pointer (e.g. desktop mouse)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    let particleId = 0;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      // Spawn subtle golden stardust particle behind cursor
      if (Math.random() > 0.4) {
        particleId++;
        const newParticle: Particle = {
          id: particleId,
          x: e.clientX + (Math.random() * 6 - 3),
          y: e.clientY + (Math.random() * 6 - 3),
          size: Math.random() * 3 + 1.5,
          opacity: 0.75,
        };
        setTrail((prev) => [...prev.slice(-12), newParticle]);
      }

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          window.getComputedStyle(target).cursor === 'pointer'
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const rippleId = Date.now();
      setRipples((prev) => [...prev.slice(-3), { id: rippleId, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 700);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth physics loop for outer follower ring
    const animateTrailing = () => {
      const ease = 0.22;
      currentTrailingRef.current.x += (targetRef.current.x - currentTrailingRef.current.x) * ease;
      currentTrailingRef.current.y += (targetRef.current.y - currentTrailingRef.current.y) * ease;

      setTrailingPos({
        x: currentTrailingRef.current.x,
        y: currentTrailingRef.current.y,
      });

      // Gradually fade out stardust trail
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.035, size: Math.max(0, p.size - 0.05) }))
          .filter((p) => p.opacity > 0)
      );

      requestRef.current = requestAnimationFrame(animateTrailing);
    };

    requestRef.current = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Dynamic Stardust Trail */}
      {trail.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-tr from-amber-300 via-gold-400 to-yellow-200 pointer-events-none transition-transform"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px rgba(245, 222, 76, 0.8)',
          }}
        />
      ))}

      {/* Ripple click waves */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full border border-gold-300 pointer-events-none animate-ping"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '40px',
            height: '40px',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 16px rgba(212, 175, 55, 0.7)',
          }}
        />
      ))}

      {/* Trailing Outer Golden Ring */}
      <div
        className={`absolute rounded-full transition-transform duration-75 ease-out pointer-events-none ${
          isHovered
            ? 'w-12 h-12 border-2 border-gold-300 bg-gold-400/10 shadow-[0_0_20px_rgba(212,175,55,0.6)] scale-125'
            : isClicking
            ? 'w-8 h-8 border border-gold-200 bg-gold-400/20 scale-90'
            : 'w-9 h-9 border border-gold-400/70 shadow-[0_0_12px_rgba(212,175,55,0.35)] scale-100'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Center Precise Golden Pin-Point Dot */}
      <div
        className={`absolute rounded-full bg-gradient-to-r from-amber-200 via-gold-400 to-yellow-300 pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.9)] transition-all duration-75 ${
          isHovered
            ? 'w-2 h-2 scale-150'
            : isClicking
            ? 'w-3 h-3 scale-75'
            : 'w-2.5 h-2.5 scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};
