import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PHOTO_CONFIG } from '../config/photos';
import { InstagramIcon } from './InstagramIcon';

interface FinalSceneProps {
  onReplay: () => void;
}

export const FinalScene: React.FC<FinalSceneProps> = ({ onReplay }) => {
  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbf5b7', '#d4af37', '#faef82', '#ff4b72', '#ffffff'],
    });
  };

  return (
    <section id="final-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-between text-center z-10">
      {/* Radiant Golden Backdrop Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-gradient-to-b from-gold-600/15 via-gold-500/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* =========================================================================
          SCENE 10: FINAL BIRTHDAY MESSAGE
          ========================================================================= */}
      <div className="max-w-4xl w-full mx-auto my-auto flex flex-col items-center">
        {/* Stella's Centerpiece Hero Portrait */}
        <div className="relative group my-8" onClick={triggerCelebration}>
          {/* Intense Outer Golden Aura */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-300 opacity-60 blur-2xl group-hover:opacity-90 transition-opacity duration-700 animate-pulse-glow" />
          <div className="absolute -inset-2 rounded-full border-2 border-gold-300/60 animate-spin-slow pointer-events-none" />

          {/* Portrait Container */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden p-2 bg-gradient-to-b from-gold-200 via-gold-500 to-amber-900 shadow-[0_0_50px_rgba(212,175,55,0.5)] cursor-pointer">
            <div className="w-full h-full rounded-full overflow-hidden bg-black/60 relative">
              <img
                src={PHOTO_CONFIG.heroPhoto}
                alt="Stella - Happy Birthday"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
            </div>
          </div>

          {/* Sparkle badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-luxury px-6 py-2 rounded-full border border-gold-400/60 shadow-xl flex items-center gap-2 backdrop-blur-md">
            <Sparkles size={16} className="text-gold-300" />
            <span className="text-xs sm:text-sm font-serif text-gold-200 tracking-widest font-bold">
              Forever Cherished
            </span>
            <Sparkles size={16} className="text-gold-300" />
          </div>
        </div>

        {/* Grand Title */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-black gold-metallic-text tracking-wider mt-6 mb-4 drop-shadow-[0_15px_35px_rgba(212,175,55,0.4)]">
          HAPPY BIRTHDAY STELLA ❤️
        </h2>

        {/* Poetic Lines */}
        <div className="space-y-3 font-serif text-lg sm:text-2xl text-zinc-200 my-6 max-w-2xl">
          <p className="italic text-gold-300 font-medium">
            "Have a great birthday, my dear mam."
          </p>
          <p className="text-white">
            "Keep smiling. Keep dreaming. Keep shining."
          </p>
          <p className="italic text-gold-200">
            "And always remember how special you are."
          </p>
        </div>

        {/* Instagram Badge */}
        <div className="my-6">
          <a
            href={PHOTO_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full glass-luxury border border-gold-400/40 text-gold-200 hover:text-white hover:border-gold-300 transition-all duration-300 shadow-lg text-sm sm:text-base font-serif"
          >
            <InstagramIcon size={18} className="text-gold-400" />
            <span className="tracking-wider">{PHOTO_CONFIG.instagram}</span>
          </a>
        </div>

        {/* Emotional Signature */}
        <p className="text-sm sm:text-base font-serif text-gold-300/80 italic tracking-wide max-w-lg mx-auto flex items-center justify-center gap-2">
          With lots of memories, wishes and a little piece of my heart.
          <Heart size={18} className="fill-red-500 text-red-500 inline-block shrink-0 animate-pulse" />
        </p>
      </div>

      {/* =========================================================================
          FINAL ANIMATION & REPLAY EXPERIENCE
          ========================================================================= */}
      <div className="w-full max-w-3xl pt-20 pb-10 border-t border-gold-500/20 mt-20 flex flex-col items-center">
        {/* Glowing STELLA Title */}
        <h3 className="text-4xl sm:text-6xl font-cinzel font-black gold-metallic-text tracking-widest uppercase select-none mb-2">
          STELLA
        </h3>

        <p className="text-xl sm:text-2xl font-serif text-gold-200 italic mb-4 flex items-center gap-2">
          Happy Birthday
          <Heart size={18} className="fill-red-500 text-red-500 inline-block" />
        </p>

        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-zinc-400 uppercase mb-8">
          30 • 12 • 2006 → Forever Special
        </p>

        {/* Replay Button */}
        <button
          onClick={onReplay}
          className="btn-gold-outline px-8 py-3.5 rounded-full text-sm sm:text-base font-serif tracking-wider flex items-center gap-3 transition-all duration-300 group hover:scale-105"
        >
          <RotateCcw size={16} className="group-hover:-rotate-180 transition-transform duration-500 text-gold-400" />
          <span>Replay the Memories ✨</span>
        </button>

        <p className="text-[10px] text-zinc-600 mt-8 tracking-widest uppercase font-serif">
          Crafted with eternal affection for Stella's Birthday
        </p>
      </div>
    </section>
  );
};
