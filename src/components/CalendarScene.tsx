import React, { useState } from 'react';
import { Calendar as CalendarIcon, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PHOTO_CONFIG } from '../config/photos';

export const CalendarScene: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // December 2006 started on a Friday (Dec 1, 2006 was Friday)
  // Day of week index: Sun = 0, Mon = 1, Tue = 2, Wed = 3, Thu = 4, Fri = 5, Sat = 6
  // Leading empty blanks for Dec 2006 = 5 (Sun, Mon, Tue, Wed, Thu)
  const totalDays = 31;
  const blankDays = 5;

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    if (day === 30) {
      setIsRevealed(true);
      // Trigger golden fireworks / confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbf5b7', '#d4af37', '#faef82', '#ffffff', '#e5c158'],
      });
    }
  };

  return (
    <section id="calendar-section" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center z-10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-gold-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-4xl w-full mx-auto text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-6">
          <CalendarIcon size={14} className="text-gold-400" />
          <span>Travelling Back In Time</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white mb-3">
          The Miracle of <span className="gold-metallic-text">2006</span>
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base max-w-lg mx-auto mb-10">
          Touch the special date in December to travel back to the day the universe gained its sweetest light.
        </p>

        {/* 3D Calendar Card Container */}
        <div className="glass-luxury rounded-3xl p-6 sm:p-10 gold-border-glow shadow-2xl max-w-xl mx-auto transition-transform duration-500 hover:scale-[1.01]">
          {/* Calendar Header */}
          <div className="flex items-center justify-between border-b border-gold-500/20 pb-5 mb-6">
            <div className="text-left">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">Month of Magic</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                DECEMBER <span className="text-gold-300">2006</span>
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-300">
              <Sparkles size={22} className="animate-spin-slow" />
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 text-center">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
              <span key={d} className="text-[10px] sm:text-xs font-semibold text-zinc-500 tracking-wider">
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
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`relative h-10 sm:h-12 rounded-xl flex flex-col items-center justify-center font-mono text-sm sm:text-base transition-all duration-300 ${
                    isTargetDay
                      ? 'bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 text-black font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.7)] animate-pulse hover:scale-110 ring-2 ring-gold-200'
                      : isSelected
                      ? 'bg-white/20 text-white font-bold border border-gold-400/50'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-gold-200 border border-transparent'
                  }`}
                >
                  <span>{day}</span>
                  {isTargetDay && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 bg-black rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gold-500/15 flex items-center justify-center gap-2 text-xs text-gold-300/80">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span>Click Date 30 to unveil the miracle</span>
          </div>
        </div>

        {/* Revealed Memory Card when Dec 30 is clicked */}
        {isRevealed && (
          <div className="mt-12 glass-luxury rounded-3xl p-6 sm:p-10 border border-gold-400/50 shadow-[0_0_50px_rgba(212,175,55,0.25)] max-w-2xl mx-auto animate-fade-in text-center">
            {/* Quote */}
            <p className="text-lg sm:text-2xl font-serif italic text-gold-200 leading-relaxed">
              "And on this beautiful day, the world got a little brighter..."
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

            {/* Stella's photo reveal */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-gold-400 to-amber-600 shadow-2xl mt-4">
              <img
                src={PHOTO_CONFIG.heroPhoto}
                alt="Stella on her birthday"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 border border-gold-300/50 rounded-xl pointer-events-none" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gold-300/90 font-serif">
              <Sparkles size={16} className="text-gold-400" />
              <span>A soul destined to inspire and be cherished forever</span>
              <Sparkles size={16} className="text-gold-400" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
