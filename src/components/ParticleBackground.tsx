import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  fadeSpeed: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Color palette for golden celestial dust
    const goldPalette = [
      'rgba(251, 245, 183, ', // Light champagne gold
      'rgba(212, 175, 55, ',  // Classic metallic gold
      'rgba(245, 222, 76, ',  // Bright gold
      'rgba(250, 239, 130, ', // Warm starlight
      'rgba(255, 215, 0, ',   // Pure gold
    ];

    const particleCount = Math.min(Math.floor(window.innerWidth / 12), 120);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 0.8,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.7 + 0.2,
        fadeSpeed: Math.random() * 0.008 + 0.003,
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        twinkleSpeed: Math.random() * 0.04 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient golden radial glow in background center
      const bgGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      bgGlow.addColorStop(0, 'rgba(28, 22, 8, 0.25)');
      bgGlow.addColorStop(0.6, 'rgba(10, 10, 15, 0.85)');
      bgGlow.addColorStop(1, 'rgba(5, 5, 8, 1)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Update & render each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX;
        p.twinklePhase += p.twinkleSpeed;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Parallax offset based on cursor
        const parallaxOffsetX = ((mouseX - width / 2) / (width / 2)) * (p.size * 5);
        const parallaxOffsetY = ((mouseY - height / 2) / (height / 2)) * (p.size * 5);

        const currentAlpha = Math.max(
          0.1,
          p.alpha * (0.6 + 0.4 * Math.sin(p.twinklePhase))
        );

        ctx.save();
        ctx.beginPath();
        const drawX = p.x + parallaxOffsetX;
        const drawY = p.y + parallaxOffsetY;

        // Draw soft glow
        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size * 3);
        gradient.addColorStop(0, `${p.color}${currentAlpha})`);
        gradient.addColorStop(0.5, `${p.color}${currentAlpha * 0.4})`);
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(drawX, drawY, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core bright spark
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
        ctx.arc(drawX, drawY, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
