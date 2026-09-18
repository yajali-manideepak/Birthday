import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const TheFeelingScene: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { text: 'the calls', icon: '📞' },
    { text: 'the chats', icon: '💬' },
    { text: 'the laughs', icon: '✨' },
    { text: 'the memories', icon: '📷' },
    { text: 'the walks', icon: '🍂' },
    { text: 'the little moments', icon: '💫' },
  ];

  // Gradually cycle or unveil step highlights
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length + 2 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section id="feeling-section" className="relative min-h-screen py-32 px-4 flex flex-col items-center justify-center text-center z-10">
      {/* Deep Obsidian background with warm gold core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-r from-red-950/20 via-gold-950/30 to-amber-950/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-3xl w-full mx-auto">
        {/* Intro */}
        <p className="text-xl sm:text-3xl font-serif italic text-gold-300/80 mb-10 tracking-widest animate-pulse">
          "Somewhere between..."
        </p>

        {/* Steps List */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-10 max-w-2xl mx-auto">
          {steps.map((item, index) => {
            const isHighlighted = activeStep >= index;
            return (
              <div
                key={item.text}
                className={`px-5 py-2.5 rounded-full border transition-all duration-700 font-serif text-sm sm:text-base tracking-wide flex items-center gap-2 ${
                  isHighlighted
                    ? 'glass-luxury text-gold-200 border-gold-400/60 shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-105'
                    : 'bg-black/30 text-zinc-600 border-white/5 opacity-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Cinematic Climax */}
        <div className="mt-16 sm:mt-20 space-y-6">
          <p className="text-2xl sm:text-4xl font-serif text-zinc-300/90 font-light italic">
            "I don't even know when..."
          </p>

          <div className="py-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-black gold-metallic-text tracking-wider drop-shadow-[0_10px_30px_rgba(212,175,55,0.5)]">
              I fell in love with you.
            </h2>
            <div className="mt-4 flex items-center justify-center">
              <Heart
                size={36}
                className="fill-red-500 text-red-500 animate-pulse drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gold-300/60 font-serif tracking-[0.25em] uppercase mt-6">
            A quiet truth whispered by time itself
          </p>
        </div>
      </div>
    </section>
  );
};
