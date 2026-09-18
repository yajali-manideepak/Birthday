import React from 'react';
import { Sparkles, Star, Compass, ShieldCheck, Sun, Smile, Gift, Award, Heart } from 'lucide-react';

export const FutureWishesScene: React.FC = () => {
  const futureWishes = [
    { text: 'May you achieve every dream you have.', icon: <Award size={20} /> },
    { text: 'May success always find you.', icon: <Compass size={20} /> },
    { text: 'May you always have good health.', icon: <ShieldCheck size={20} /> },
    { text: 'May happiness follow you wherever you go.', icon: <Sun size={20} /> },
    { text: 'May your beautiful smile never disappear.', icon: <Smile size={20} /> },
    { text: 'May your life be filled with unforgettable memories.', icon: <Gift size={20} /> },
    { text: 'And may every year ahead be more beautiful than the one before. ❤️', icon: <Heart size={20} className="fill-red-500 text-red-500" /> },
  ];

  return (
    <section id="future-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center z-10">
      {/* Background starlight aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl w-full mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-4">
          <Star size={14} className="text-gold-400 fill-gold-400" />
          <span>Blessings for the Journey Ahead</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-cinzel font-bold text-white mb-4">
          For Your <span className="gold-metallic-text">Future</span> ✨
        </h2>

        <p className="text-zinc-400 font-light text-sm sm:text-base max-w-xl mx-auto mb-16">
          Every blessing sent to the stars, whispering wishes of infinite prosperity, happiness, and peace into your tomorrow.
        </p>

        {/* Future Wishes Constellation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {futureWishes.map((wish, index) => {
            const isLast = index === futureWishes.length - 1;
            return (
              <div
                key={index}
                className={`glass-luxury rounded-2xl p-6 gold-border-glow transition-all duration-500 hover:-translate-y-2 relative group overflow-hidden ${
                  isLast ? 'md:col-span-2 lg:col-span-3 border-gold-400/60 bg-gradient-to-r from-gold-950/40 via-black/60 to-gold-950/40' : ''
                }`}
              >
                {/* Floating gold sparkle icon */}
                <div className="absolute top-3 right-3 text-gold-400/30 group-hover:text-gold-300 transition-colors">
                  <Sparkles size={16} />
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 group-hover:scale-110 transition-transform shrink-0">
                    {wish.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400/80 mb-1 block">
                      Wish 0{index + 1}
                    </span>
                    <p
                      className={`font-serif leading-relaxed text-zinc-100 group-hover:text-gold-200 transition-colors ${
                        isLast ? 'text-lg sm:text-xl font-semibold text-gold-100' : 'text-base sm:text-lg'
                      }`}
                    >
                      {wish.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
