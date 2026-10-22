import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PHOTO_CONFIG } from '../config/photos';
import { synthAudio } from '../utils/soundSynthesizer';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  angle: number;
  alpha: number;
  isGolden: boolean;
}

export const CalendarScene: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [holidayNote, setHolidayNote] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // December 2006 started on a Friday (Dec 1, 2006 was Friday)
  // Blank leading slots for Dec 2006 = 5 (Sun, Mon, Tue, Wed, Thu)
  const totalDays = 31;
  const blankDays = 5;

  // New Year & Christmas Snowing Effect Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate Christmas & New Year snowflakes
    const flakeCount = 75;
    const flakes: Snowflake[] = Array.from({ length: flakeCount }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 2.8 + 1,
      speed: Math.random() * 0.9 + 0.5,
      wind: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.7 + 0.3,
      isGolden: Math.random() < 0.2, // 20% sparkling golden flakes
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];
        flake.angle += 0.015;
        flake.y += flake.speed;
        flake.x += Math.sin(flake.angle) * 0.8 + flake.wind;

        // Wrap around screen
        if (flake.y > h) {
          flake.y = -10;
          flake.x = Math.random() * w;
        }
        if (flake.x > w) flake.x = 0;
        if (flake.x < 0) flake.x = w;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

        if (flake.isGolden) {
          ctx.fillStyle = `rgba(245, 218, 122, ${flake.alpha})`;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    // REMOVED synthAudio.playPop() - User requested to remove the pop sound completely!

    if (day === 30) {
      setIsRevealed(true);
      setHolidayNote(null);
      synthAudio.playChime(); // Gentle magical chime on Stella's special day

      // Trigger golden fireworks / confetti
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#fbf5b7', '#d4af37', '#faef82', '#ffffff', '#e5c158', '#ff4b72'],
      });
    } else if (day === 25) {
      setIsRevealed(false);
      setHolidayNote('🎄 Merry Christmas! A season of fairy lights, peace, warmth, and joyful blessings.');
    } else if (day === 31) {
      setIsRevealed(false);
      setHolidayNote("🎆 New Year's Eve! Counting down to wonderful new dreams and bright horizons.");
    } else {
      setIsRevealed(false);
      setHolidayNote(null);
    }
  };

  return (
    <section id="calendar-section" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center z-10 overflow-hidden">
      {/* Christmas & New Year Snowing Effect Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Holiday Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-gradient-to-tr from-emerald-600/10 via-gold-500/10 to-red-600/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-4xl w-full mx-auto text-center relative z-10">
        {/* Festive Holiday Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-950/50 via-black/60 to-rose-950/50 border border-gold-500/40 text-gold-200 text-xs sm:text-sm font-serif mb-6 shadow-lg backdrop-blur-md">
          <span className="text-base">🎄</span>
          <span className="tracking-wider">Christmas & Holiday Season • December 2006</span>
          <span className="text-base">❄️</span>
        </div>

        {/* Section Heading with Holiday Touch */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white mb-3">
          The Magic of <span className="gold-metallic-text">December 2006</span> ❄️
        </h2>
        <p className="text-zinc-300 font-light text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Surrounded by Christmas cheer and winter snowfall, touch the dates of December to uncover the magical moment the universe welcomed its sweetest star.
        </p>

        {/* 3D Christmas Frost Calendar Card */}
        <div className="relative glass-luxury rounded-3xl p-6 sm:p-10 gold-border-glow shadow-2xl max-w-xl mx-auto transition-transform duration-500 hover:scale-[1.01] border border-gold-400/40 overflow-hidden">
          {/* Subtle frosted snow cap on top border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-white/40 via-cyan-100/60 to-white/40 blur-[1px]" />
          
          {/* Christmas Card Header */}
          <div className="flex items-center justify-between border-b border-gold-500/25 pb-5 mb-6">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-emerald-300 font-medium flex items-center gap-1">
                  <span>🎄</span> Holiday Edition
                </span>
                <span className="text-zinc-500 text-xs">•</span>
                <span className="text-xs text-gold-300 font-mono tracking-wider">Winter Snow</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide mt-1 flex items-center gap-2">
                DECEMBER <span className="text-gold-300">2006</span> ❄️
              </h3>
            </div>

            {/* In header: Stella's photo or festive ornament icon */}
            {isRevealed ? (
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.7)] animate-fade-in relative group cursor-pointer ring-2 ring-gold-300/60"
                title="Stella with Car"
              >
                <img
                  src={PHOTO_CONFIG.carMemoryPhoto}
                  alt="Stella with car"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              <div
                className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-gold-500/15 to-rose-500/15 border border-gold-400/40 text-gold-300 flex items-center justify-center shadow-inner"
                title="Holiday December"
              >
                <span className="text-2xl">🎅</span>
              </div>
            )}
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 text-center">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
              <span key={d} className="text-[10px] sm:text-xs font-semibold text-zinc-400 tracking-wider">
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
            {/* Blank leading slots */}
            {Array.from({ length: blankDays }).map((_, i) => (
              <div key={`blank-${i}`} className="h-10 sm:h-12 rounded-xl" />
            ))}

            {/* Days 1 to 31 */}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const isTargetDay = day === 30;
              const isChristmas = day === 25;
              const isNewYearEve = day === 31;
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`relative h-11 sm:h-13 rounded-xl flex flex-col items-center justify-center font-mono text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                    isTargetDay
                      ? 'bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 text-black font-extrabold shadow-[0_0_28px_rgba(212,175,55,0.9)] animate-pulse hover:scale-110 ring-2 ring-gold-200'
                      : isChristmas
                      ? 'bg-gradient-to-br from-red-600/30 via-emerald-600/20 to-black/50 border border-emerald-400/60 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105'
                      : isNewYearEve
                      ? 'bg-gradient-to-br from-purple-600/30 via-gold-500/20 to-black/50 border border-gold-400/50 text-gold-200 hover:scale-105'
                      : isSelected
                      ? 'bg-white/20 text-white font-bold border border-gold-400/60'
                      : 'text-zinc-300 hover:bg-white/10 hover:text-gold-200 border border-transparent'
                  }`}
                >
                  {isTargetDay ? (
                    <div className="flex flex-col items-center leading-none">
                      <div className="flex items-center gap-0.5">
                        <span className="font-black text-sm sm:text-base">30</span>
                        <span className="text-[11px] sm:text-xs">🎂</span>
                      </div>
                      <span className="text-[8px] font-sans font-bold tracking-tighter uppercase text-amber-950 mt-0.5">
                        Stella
                      </span>
                    </div>
                  ) : isChristmas ? (
                    <div className="flex flex-col items-center leading-none">
                      <div className="flex items-center gap-0.5">
                        <span className="font-bold text-xs sm:text-sm text-white">25</span>
                        <span className="text-[10px]">🎄</span>
                      </div>
                      <span className="text-[7px] font-sans tracking-tight text-emerald-300 uppercase">
                        Xmas
                      </span>
                    </div>
                  ) : isNewYearEve ? (
                    <div className="flex flex-col items-center leading-none">
                      <div className="flex items-center gap-0.5">
                        <span className="font-bold text-xs sm:text-sm text-white">31</span>
                        <span className="text-[10px]">🎆</span>
                      </div>
                      <span className="text-[7px] font-sans tracking-tight text-gold-300 uppercase">
                        Eve
                      </span>
                    </div>
                  ) : (
                    <span>{day}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Holiday Note if Christmas or New Year clicked */}
          {holidayNote && (
            <div className="mt-4 p-3 rounded-2xl bg-black/60 border border-gold-400/30 text-xs sm:text-sm font-serif text-gold-200 animate-fade-in shadow-lg">
              {holidayNote}
            </div>
          )}

          {/* Calendar Footer Festive Hint */}
          <div className="mt-6 pt-4 border-t border-gold-500/15 flex flex-wrap items-center justify-center gap-2 text-xs text-gold-300/90 font-serif">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span>Click Date 30 to unveil Stella's memorable birthday photo 🎁</span>
          </div>
        </div>

        {/* Revealed Memory Card when Dec 30 is clicked: Stella's Photo Only */}
        {isRevealed && (
          <div className="mt-12 glass-luxury rounded-3xl p-6 sm:p-10 border border-gold-400/50 shadow-[0_0_50px_rgba(212,175,55,0.3)] max-w-2xl mx-auto animate-fade-in text-center relative overflow-hidden">
            {/* Soft Christmas snow accents */}
            <div className="absolute top-2 right-4 text-xl opacity-60">❄️</div>
            <div className="absolute top-2 left-4 text-xl opacity-60">✨</div>

            {/* Quote */}
            <p className="text-lg sm:text-2xl font-serif italic text-gold-200 leading-relaxed">
              "And on this beautiful December day, the world got a little brighter..."
            </p>

            {/* Date highlight */}
            <div className="my-6">
              <h4 className="text-3xl sm:text-5xl font-cinzel font-black gold-metallic-text tracking-wider">
                30 DECEMBER 2006
              </h4>
              <p className="text-base sm:text-xl font-serif text-white/90 mt-2 flex items-center justify-center gap-2">
                The day <span className="text-gold-300 font-bold tracking-widest">STELLA</span> was born
                <Heart size={20} className="fill-red-500 text-red-500 inline-block animate-pulse" />
              </p>
            </div>

            {/* Single Showcase: Stella's Photo */}
            <div className="my-6 max-w-sm sm:max-w-md mx-auto">
              <div className="relative rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-gold-300 via-gold-500 to-amber-700 shadow-[0_0_40px_rgba(212,175,55,0.4)] group">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/60">
                  <img
                    src={PHOTO_CONFIG.carMemoryPhoto}
                    alt="Stella with car"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 bw-authentic"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-gold-500/30 text-left flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block">
                        Memorable Classic
                      </span>
                      <span className="text-sm font-serif text-white font-medium">
                        Stella with Car
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gold-300/90 font-serif">
              <span>A soul destined to inspire and be cherished forever</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
