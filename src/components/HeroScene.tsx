import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { PHOTO_CONFIG } from '../config/photos';
import { InstagramIcon } from './InstagramIcon';
import { SecretLock } from './SecretLock';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

interface HeroSceneProps {
  onExploreSurprise: () => void;
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  onExploreSurprise,
  isUnlocked,
  onUnlock,
}) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  // Calculate dynamic countdown to December 30th
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 11, 30, 0, 0, 0); // Month is 0-indexed (11 = Dec)

      // Check if today is Dec 30
      if (now.getMonth() === 11 && now.getDate() === 30) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        return;
      }

      // If already past Dec 30 this year, set target to next year's Dec 30
      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(currentYear + 1, 11, 30, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false });
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 py-12 md:py-20 z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-br from-gold-600/15 via-gold-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top intro decorative line */}
      <div className="flex items-center gap-3 text-gold-300/80 tracking-[0.3em] uppercase text-xs sm:text-sm font-serif pt-4 animate-fade-in">
        <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-gold-400/60" />
        <span className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-gold-400 animate-spin-slow" />
          A Special Birthday Tribute
          <Sparkles size={13} className="text-gold-400 animate-spin-slow" />
        </span>
        <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-gold-400/60" />
      </div>

      {/* =========================================================================
          SCENE 1: CINEMATIC OPENING (STELLA, 30 • 12 • 2006, COUNTDOWN)
          ========================================================================= */}
      <div className="flex flex-col items-center my-auto max-w-4xl">
        {/* Luxury Gold STELLA Heading with 3D depth and shimmer */}
        <div className="relative group my-4">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-cinzel font-black tracking-wider uppercase select-none gold-metallic-text drop-shadow-[0_15px_35px_rgba(212,175,55,0.45)] transition-transform duration-700 hover:scale-[1.02]">
            STELLA
          </h1>

          {/* Under-glow reflection line */}
          <div className="w-3/4 mx-auto h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-75 blur-[1px] mt-1" />
        </div>

        {/* Date of Birth */}
        <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gold-200/90 tracking-[0.35em] font-light mt-3 mb-8">
          30 • 12 • 2006
        </p>

        {/* Dynamic Birthday Countdown */}
        <div className="glass-luxury rounded-2xl sm:rounded-3xl p-6 sm:p-8 gold-border-glow max-w-2xl w-full mx-auto backdrop-blur-2xl">
          {timeLeft.isToday ? (
            <div className="py-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gold-300 animate-pulse font-bold">
                🎉 TODAY IS THE SPECIAL DAY! 🎉
              </h3>
              <p className="text-gold-200/80 mt-2 font-light">
                Wishing the most wonderful birthday to Stella!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 text-center">
                {/* Days */}
                <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl bg-black/40 border border-gold-500/20">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold gold-gradient-text">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-widest text-zinc-400 uppercase mt-1">
                    Days
                  </span>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl bg-black/40 border border-gold-500/20">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold gold-gradient-text">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-widest text-zinc-400 uppercase mt-1">
                    Hours
                  </span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl bg-black/40 border border-gold-500/20">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold gold-gradient-text">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-widest text-zinc-400 uppercase mt-1">
                    Minutes
                  </span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl bg-black/40 border border-gold-500/20">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-gold-300">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-widest text-zinc-400 uppercase mt-1">
                    Seconds
                  </span>
                </div>
              </div>

              <p className="mt-5 text-xs sm:text-sm text-gold-200/70 font-serif italic tracking-wide">
                "Counting every moment until your special day..."
              </p>
            </>
          )}
        </div>

        {/* Secret Passcode Gate (Code: 301206) */}
        <SecretLock onUnlock={onUnlock} isUnlocked={isUnlocked} />
      </div>

      {/* =========================================================================
          SCENE 2: BIRTHDAY REVEAL (PORTRAIT, WISH, SURPRISE BUTTON)
          Revealed only after entering secret passcode 301206
          ========================================================================= */}
      {isUnlocked && (
        <div id="birthday-reveal" className="flex flex-col items-center mt-16 sm:mt-24 max-w-3xl w-full animate-fade-in">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent my-6" />

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white tracking-wide">
          HAPPY BIRTHDAY
        </h2>

        <h3 className="text-2xl sm:text-4xl font-serif text-gold-300 italic flex items-center gap-2 mt-2">
          My Dear Mam
          <Heart size={24} className="fill-red-500/90 text-red-500 animate-pulse inline-block" />
        </h3>

        {/* Stella's Primary Hero Portrait Frame */}
        <div className="relative my-8 sm:my-12 group">
          {/* Glowing Aura Rings */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-tr from-gold-600 via-amber-500 to-gold-300 opacity-40 blur-xl group-hover:opacity-75 transition-opacity duration-700 animate-pulse-glow" />
          <div className="absolute -inset-1 rounded-full border border-gold-300/60 animate-spin-slow pointer-events-none" />

          {/* Portrait Container */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden p-1.5 bg-gradient-to-b from-gold-300 via-gold-600 to-amber-900 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-black/60 relative">
              <img
                src={PHOTO_CONFIG.heroPhoto}
                alt="Stella"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 pointer-events-none" />
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-luxury px-4 py-1.5 rounded-full border border-gold-400/40 flex items-center gap-2 shadow-lg backdrop-blur-md">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-xs font-serif text-gold-200 tracking-wider font-semibold">
              The Birthday Star
            </span>
          </div>
        </div>

        {/* Instagram Handle */}
        <a
          href={PHOTO_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-gold-200/90 hover:text-gold-100 transition-colors py-1 px-4 rounded-full border border-gold-500/20 hover:border-gold-400/50 bg-black/30 backdrop-blur-sm group"
        >
          <InstagramIcon size={16} className="text-gold-400 group-hover:scale-110 transition-transform" />
          <span className="tracking-wider">{PHOTO_CONFIG.instagram}</span>
        </a>

        {/* Animated Reveal Button */}
        <button
          onClick={onExploreSurprise}
          className="mt-8 sm:mt-10 btn-gold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-serif tracking-wider flex items-center gap-3 cursor-pointer group"
        >
          <span>Open Your Birthday Surprise</span>
          <Sparkles size={18} className="text-black group-hover:rotate-45 transition-transform" />
        </button>

        {/* Smooth scroll indicator */}
        <div className="mt-12 text-zinc-500 flex flex-col items-center gap-1 animate-bounce opacity-70">
          <span className="text-[10px] tracking-widest uppercase font-serif text-gold-300/60">
            Scroll to Journey
          </span>
          <ChevronDown size={18} className="text-gold-400/60" />
        </div>
      </div>
    )}
  </div>
);
};
