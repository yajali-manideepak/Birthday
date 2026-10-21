import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { PHOTO_CONFIG } from '../config/photos';
import { synthAudio } from '../utils/soundSynthesizer';
import confetti from 'canvas-confetti';

export const BirthdayWishScene: React.FC = () => {
  const wishes = [
    {
      title: "Endless Joy",
      text: "On your special day, I just want to wish you all the happiness in the world.",
      tag: "Deepest Blessing",
    },
    {
      title: "Limitless Dreams",
      text: "May you achieve every dream you have ever wished for.",
      tag: "To New Heights",
    },
    {
      title: "Health & Success",
      text: "May you always be blessed with good health, success and happiness in life.",
      tag: "Lifelong Prosperity",
    },
    {
      title: "Timeless Radiance",
      text: "May you always keep that beautiful smile on your face.",
      tag: "Your Signature Light",
    },
    {
      title: "Precious Gratitude",
      text: "You are someone who has always made me happy, and I feel lucky for all the beautiful memories we have created together.",
      tag: "From The Heart",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [animKey, setAnimKey] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % wishes.length);
    setAnimKey((prev) => prev + 1);
    synthAudio.playPop();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
    setAnimKey((prev) => prev + 1);
    synthAudio.playPop();
  };

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    setAnimKey((prev) => prev + 1);
    synthAudio.playPop();

    if (idx === wishes.length - 1) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#fbf5b7', '#d4af37', '#faef82', '#ff4b72'],
      });
    }
  };

  // Auto-advance wishes smoothly
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % wishes.length);
      setAnimKey((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, wishes.length]);

  const currentWish = wishes[activeIndex];

  return (
    <section id="birthday-wish-section" className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center z-10 overflow-hidden">
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

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-luxury px-5 py-2 rounded-full border border-gold-400/50 shadow-xl flex items-center justify-center backdrop-blur-md">
            <span className="text-xs font-serif text-gold-200 tracking-widest uppercase font-semibold">
              Elegance & Radiance
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white tracking-wide mt-6 mb-2">
          Happy Birthday <span className="gold-metallic-text">My Dear Mam</span>
        </h2>
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="w-12 h-[1px] bg-gold-400/50" />
          <Heart size={20} className="fill-red-500 text-red-500 animate-pulse" />
          <span className="w-12 h-[1px] bg-gold-400/50" />
        </div>

        {/* ANIMATED WISH SHOWCASE (Not a plain stack) */}
        <div 
          className="w-full max-w-2xl relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Main Active Animated Wish Card */}
          <div 
            key={animKey}
            className="glass-luxury rounded-3xl p-8 sm:p-12 gold-border-glow text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] animate-fade-in transition-all duration-500"
          >
            {/* Top decorative badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-serif uppercase tracking-widest mb-6">
              <span>Wish {String(activeIndex + 1).padStart(2, '0')} • {currentWish.tag}</span>
            </div>

            {/* Glowing quote icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Quote size={22} className="opacity-80" />
              </div>
            </div>

            {/* Wish Title */}
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-gold-200 tracking-wide mb-4">
              {currentWish.title}
            </h3>

            {/* Wish Text with smooth reveal */}
            <p className="text-lg sm:text-2xl font-serif text-white/95 leading-relaxed font-light min-h-[5rem] flex items-center justify-center">
              "{currentWish.text}"
            </p>

            {/* Subtle bottom progress line */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent mx-auto mt-8 mb-2" />
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-full glass-luxury border border-gold-400/40 text-gold-200 hover:text-white hover:border-gold-300 hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-serif flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {/* Quick-Select Indicator Dots / Numbers */}
            <div className="flex items-center gap-2">
              {wishes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-8 bg-gradient-to-r from-gold-300 to-amber-500 shadow-[0_0_12px_rgba(212,175,55,0.8)]'
                      : 'w-2.5 bg-white/20 hover:bg-gold-400/50'
                  }`}
                  title={`Go to Wish ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="btn-gold px-5 py-2 rounded-full text-xs sm:text-sm font-serif tracking-wider flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-semibold"
            >
              <span>Next Wish</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Miniature pill selectors below for direct exploration */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {wishes.map((w, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'bg-gold-500/30 border border-gold-400 text-gold-200 font-medium shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-black/40 border border-gold-500/15 text-zinc-400 hover:text-gold-300 hover:border-gold-500/30'
                }`}
              >
                {w.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
