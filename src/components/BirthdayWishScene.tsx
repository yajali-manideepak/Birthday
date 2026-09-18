import React from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { PHOTO_CONFIG } from '../config/photos';

export const BirthdayWishScene: React.FC = () => {
  const wishes = [
    "On your special day, I just want to wish you all the happiness in the world.",
    "May you achieve every dream you have ever wished for.",
    "May you always be blessed with good health, success and happiness in life.",
    "May you always keep that beautiful smile on your face.",
    "You are someone who has always made me happy, and I feel lucky for all the beautiful memories we have created together."
  ];

  return (
    <section id="birthday-wish-section" className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center z-10">
      {/* Background ambient gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gold-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Cinematic Stella Hero Photo Frame */}
        <div className="relative group mb-10">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-gold-500 via-amber-400 to-gold-200 opacity-50 blur-xl group-hover:opacity-80 transition-opacity duration-700 animate-pulse-glow" />
          
          <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-gold-300 via-gold-600 to-amber-950 shadow-2xl">
            <div className="w-full h-full rounded-xl overflow-hidden bg-black/60 relative">
              <img
                src={PHOTO_CONFIG.heroPhoto}
                alt="Stella Birthday Portrait"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle gold vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-luxury px-5 py-2 rounded-full border border-gold-400/50 shadow-xl flex items-center gap-2 backdrop-blur-md">
            <Star size={14} className="text-gold-400 fill-gold-400" />
            <span className="text-xs font-serif text-gold-200 tracking-widest uppercase font-semibold">
              Elegance & Radiance
            </span>
            <Star size={14} className="text-gold-400 fill-gold-400" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white tracking-wide mt-6 mb-2">
          Happy Birthday <span className="gold-metallic-text">My Dear Mam</span>
        </h2>
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="w-12 h-[1px] bg-gold-400/50" />
          <Heart size={20} className="fill-red-500 text-red-500 animate-pulse" />
          <span className="w-12 h-[1px] bg-gold-400/50" />
        </div>

        {/* Animated Wish Cards (Broken into elegant individual lines) */}
        <div className="flex flex-col gap-5 w-full max-w-2xl">
          {wishes.map((wish, index) => (
            <div
              key={index}
              className="glass-luxury rounded-2xl p-5 sm:p-6 gold-border-glow text-left transition-all duration-300 hover:translate-x-2 relative group overflow-hidden"
            >
              {/* Gold accent bar on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gold-300 to-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Sparkles size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gold-400/80 uppercase tracking-widest block mb-1">
                    Wish 0{index + 1}
                  </span>
                  <p className="text-base sm:text-lg font-serif text-zinc-100 leading-relaxed group-hover:text-gold-100 transition-colors">
                    {wish}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
