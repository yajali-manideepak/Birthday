import React, { useState, useEffect } from 'react';
import { Sparkles, PartyPopper, Heart, Volume2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { synthAudio } from '../utils/soundSynthesizer';

interface FloatingBalloon {
  id: number;
  x: number;
  color: string;
  speed: number;
  text: string;
}

export const PartyPoppers: React.FC = () => {
  const [popCount, setPopCount] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [balloons, setBalloons] = useState<FloatingBalloon[]>([]);

  // Cannon Confetti Pop
  const handleCannonPop = () => {
    synthAudio.playPop();
    setPopCount((c) => c + 1);

    confetti({
      particleCount: 75,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.8 },
      colors: ['#ffd700', '#ff69b4', '#ffffff', '#ff1493'],
    });

    confetti({
      particleCount: 75,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.8 },
      colors: ['#ffd700', '#ff69b4', '#ffffff', '#ff1493'],
    });
  };

  // Golden Sparkle Pop
  const handleSparklePop = () => {
    synthAudio.playPop();
    synthAudio.playChime();
    setPopCount((c) => c + 1);

    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.7 },
      shapes: ['star'],
      colors: ['#ffd700', '#fbf5b7', '#d4af37', '#ffffff'],
    });
  };

  // Spawn Float & Pop Balloons
  const handleSpawnBalloons = () => {
    synthAudio.playPop();
    setPopCount((c) => c + 1);

    const compliments = [
      'Pure Elegance! ✨',
      'Sweetest Smile! 💖',
      'Happy Birthday Stella! 🎂',
      'Radiant Star! 🌟',
      'Forever Cherished! ❤️',
    ];

    const colors = ['#ff758c', '#ffd269', '#a18cd1', '#ff9a9e', '#fbc2eb'];

    const newBalloons: FloatingBalloon[] = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: 15 + Math.random() * 70, // % from left
      color: colors[i % colors.length],
      speed: 12 + Math.random() * 6, // animation seconds
      text: compliments[i % compliments.length],
    }));

    setBalloons((prev) => [...prev, ...newBalloons]);
  };

  // Pop a specific balloon on click
  const handlePopBalloon = (id: number, x: number, e: React.MouseEvent) => {
    synthAudio.playPop();
    setPopCount((c) => c + 1);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#ff4b72', '#ffd700', '#ffffff', '#ff69b4'],
    });

    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  // Celebration Fountain
  const handleFountainPop = () => {
    synthAudio.playPop();
    synthAudio.playChime();
    setPopCount((c) => c + 1);

    const end = Date.now() + 1500;
    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        particleCount: 30,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5 + 0.3,
        },
        colors: ['#ffd700', '#ff69b4', '#faef82', '#ff4b72', '#ffffff'],
      });
    }, 200);
  };

  return (
    <>
      {/* Floating interactive balloons in the sky */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            onClick={(e) => handlePopBalloon(balloon.id, balloon.x, e)}
            style={{
              left: `${balloon.x}%`,
              animation: `floatUp ${balloon.speed}s linear forwards`,
            }}
            className="absolute bottom-[-100px] pointer-events-auto cursor-pointer group hover:scale-110 transition-transform select-none"
          >
            {/* Realistic 3D Balloon Body */}
            <div
              className="w-14 h-20 sm:w-16 sm:h-22 relative flex items-center justify-center filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)]"
              style={{
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                background: `radial-gradient(circle at 35% 28%, #ffffff 0%, ${balloon.color} 35%, rgba(0, 0, 0, 0.45) 100%)`,
                boxShadow: `inset -4px -6px 12px rgba(0,0,0,0.35), inset 4px 6px 12px rgba(255,255,255,0.4), 0 10px 30px ${balloon.color}55`,
              }}
            >
              {/* Primary Curved Specular Glare / Highlight */}
              <div
                className="absolute top-2.5 left-3 w-4 h-8 bg-white/60 rounded-[50%] transform -rotate-[28deg] blur-[0.6px] pointer-events-none"
              />
              {/* Secondary soft specular dot */}
              <div
                className="absolute top-7 left-2.5 w-2 h-2.5 bg-white/70 rounded-full blur-[0.5px] pointer-events-none"
              />

              <span className="text-[11px] font-serif font-extrabold text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] text-center px-1 tracking-wider uppercase">
                POP! 🎈
              </span>

              {/* Realistic Balloon Tied Knot */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: `7px solid ${balloon.color}`,
                  filter: 'brightness(0.85)',
                }}
              />

              {/* Graceful Wavy Balloon Ribbon / String */}
              <svg
                width="24"
                height="65"
                viewBox="0 0 24 65"
                className="absolute -bottom-[62px] left-1/2 -translate-x-1/2 pointer-events-none overflow-visible"
              >
                <path
                  d="M12 0 C17 15, 7 30, 15 45 S9 58, 12 65"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Hidden compliment tag */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-black/90 text-[11px] font-serif text-gold-200 border border-gold-400/50 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {balloon.text}
            </div>
          </div>
        ))}
      </div>

      {/* Persistent Floating Party Poppers Controller Dock */}
      <div className="fixed bottom-5 right-5 z-40">
        {isExpanded ? (
          <div className="glass-luxury rounded-2xl p-3 border border-gold-400/50 shadow-2xl backdrop-blur-xl flex flex-col gap-2 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-1 pb-1 border-b border-gold-500/20">
              <div className="flex items-center gap-1.5 text-xs font-serif text-gold-300 font-bold">
                <PartyPopper size={14} className="text-gold-400 animate-bounce" />
                <span>Party Pops 🎉</span>
                {popCount > 0 && (
                  <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30">
                    {popCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-zinc-400 hover:text-white p-0.5 rounded"
                title="Minimize Poppers"
              >
                <X size={13} />
              </button>
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Cannon Pop */}
              <button
                onClick={handleCannonPop}
                className="px-3 py-2 rounded-xl bg-gold-500/10 hover:bg-gold-500/25 border border-gold-400/30 text-gold-200 hover:text-white text-xs font-serif flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title="Confetti Cannon"
              >
                <span>🎉</span>
                <span>Confetti</span>
              </button>

              {/* Sparkle Pop */}
              <button
                onClick={handleSparklePop}
                className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/25 border border-amber-400/30 text-amber-200 hover:text-white text-xs font-serif flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title="Golden Star Burst"
              >
                <span>✨</span>
                <span>Sparkles</span>
              </button>

              {/* Balloon Pop */}
              <button
                onClick={handleSpawnBalloons}
                className="px-3 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/25 border border-pink-400/30 text-pink-200 hover:text-white text-xs font-serif flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title="Spawn Floating Balloons to Pop"
              >
                <span>🎈</span>
                <span>Balloons</span>
              </button>

              {/* Fountain Pop */}
              <button
                onClick={handleFountainPop}
                className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 border border-rose-400/30 text-rose-200 hover:text-white text-xs font-serif flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title="Celebration Fountain"
              >
                <span>🍾</span>
                <span>Fountain</span>
              </button>
            </div>
          </div>
        ) : (
          /* Minimized floating badge */
          <button
            onClick={() => setIsExpanded(true)}
            className="glass-luxury px-3.5 py-2 rounded-full border border-gold-400/50 text-gold-200 text-xs font-serif flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          >
            <PartyPopper size={14} className="text-gold-400 group-hover:rotate-12 transition-transform" />
            <span>Party Pops</span>
            {popCount > 0 && (
              <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-gold-500 text-black font-bold">
                {popCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Float up animation keyframes with natural gentle sway */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.95;
          }
          25% {
            transform: translateY(-28vh) translateX(12px) rotate(4deg);
          }
          50% {
            transform: translateY(-56vh) translateX(-10px) rotate(-4deg);
          }
          75% {
            transform: translateY(-84vh) translateX(8px) rotate(3deg);
          }
          100% {
            transform: translateY(-118vh) translateX(-4px) rotate(-2deg);
            opacity: 0.15;
          }
        }
      `}</style>
    </>
  );
};
