import React, { useState } from 'react';
import { Sparkles, Heart, Flame, Wind, RotateCcw, Cake, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PHOTO_CONFIG } from '../config/photos';
import { synthAudio } from '../utils/soundSynthesizer';

export const BirthdayCakeScene: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [isCakeCut, setIsCakeCut] = useState<boolean>(false);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [knifeCutting, setKnifeCutting] = useState<boolean>(false);

  // Trigger celebration confetti blast
  const fireCelebrationConfetti = () => {
    // Left side burst
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 65,
      origin: { x: 0.1, y: 0.6 },
      colors: ['#fbf5b7', '#d4af37', '#ff8da1', '#ffffff', '#ffd700'],
    });

    // Right side burst
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 65,
      origin: { x: 0.9, y: 0.6 },
      colors: ['#fbf5b7', '#d4af37', '#ff8da1', '#ffffff', '#ffd700'],
    });

    // Center stardust burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        shapes: ['star', 'circle'],
        colors: ['#ffd700', '#ff69b4', '#ffb6c1', '#ffffff'],
      });
    }, 250);
  };

  // Blow out candles
  const handleBlowCandles = () => {
    if (!candlesLit) return;
    synthAudio.playBlow();

    setTimeout(() => {
      setCandlesLit(false);
      setWishMade(true);
      synthAudio.playPop();
      synthAudio.playChime();
      fireCelebrationConfetti();
    }, 450);
  };

  // Relight candles
  const handleRelight = () => {
    setCandlesLit(true);
    synthAudio.playChime();
  };

  // Cut the cake
  const handleCutCake = () => {
    if (knifeCutting) return;
    setKnifeCutting(true);
    synthAudio.playSlice();

    setTimeout(() => {
      setIsCakeCut(true);
      setKnifeCutting(false);
      synthAudio.playPop();
      synthAudio.playChime();
      fireCelebrationConfetti();
    }, 900);
  };

  return (
    <section id="birthday-cake-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center z-10">
      {/* Golden Ambient Celebration Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[750px] h-[380px] sm:h-[750px] bg-gradient-to-tr from-amber-600/15 via-gold-500/12 to-rose-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Badge Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-4 animate-fade-in">
          <Cake size={15} className="text-gold-400" />
          <span>The Birthday Cake Celebration</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white mb-2">
          Make A Wish, <span className="gold-metallic-text">Stella</span> 🎂
        </h2>

        <p className="text-zinc-300 font-light text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Close your eyes, make the deepest wish in your heart, blow out the candles, and let the celebration begin!
        </p>

        {/* The Grand Birthday Cake Stage */}
        <div className="relative group max-w-lg w-full mx-auto my-2">
          {/* Intense Outer Golden & Pink Aura */}
          <div className="absolute -inset-3 sm:-inset-5 rounded-3xl bg-gradient-to-tr from-gold-500 via-rose-400 to-amber-400 opacity-40 blur-2xl group-hover:opacity-70 transition-opacity duration-700 animate-pulse-glow" />

          {/* Luxury Frame Container */}
          <div className="relative rounded-3xl overflow-hidden p-2 sm:p-3 bg-gradient-to-b from-gold-200 via-gold-500 to-amber-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-gold-400/40 backdrop-blur-xl">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/70 flex items-center justify-center">
              {/* Stella's Custom 3-Tier Birthday Cake Image */}
              <img
                src={PHOTO_CONFIG.cakePhoto}
                alt="Stella's Birthday Cake"
                className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
                  !candlesLit ? 'brightness-[0.92]' : 'brightness-100'
                }`}
              />

              {/* Dynamic Candle Flames Overlay on Top of Cake */}
              <div className="absolute top-[13%] left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 sm:gap-6 pointer-events-none z-20">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative flex flex-col items-center">
                    {candlesLit ? (
                      <div className="relative animate-bounce" style={{ animationDuration: `${1.4 + i * 0.2}s` }}>
                        {/* Outer flame halo */}
                        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 blur-[2px] opacity-90 animate-pulse" />
                        {/* Core intense flame */}
                        <div className="absolute inset-1 rounded-full bg-yellow-100 blur-[1px]" />
                        {/* Sparkle star atop flame */}
                        <Sparkles size={10} className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-yellow-100 animate-spin-slow" />
                      </div>
                    ) : (
                      /* Smoke wisps after blowing out */
                      <div className="flex flex-col items-center animate-fade-out opacity-60">
                        <div className="w-1.5 h-6 bg-gradient-to-t from-zinc-400 to-transparent blur-[1.5px] -translate-y-2 animate-pulse" />
                        <span className="text-[10px] text-zinc-400 font-mono tracking-tighter">~</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Animated Golden Knife Cutting Overlay */}
              {knifeCutting && (
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                  <div className="w-1.5 h-48 bg-gradient-to-b from-transparent via-gold-200 to-gold-500 shadow-[0_0_20px_#ffd700] transform -rotate-12 animate-pulse animate-cake-slice" />
                </div>
              )}

              {/* Top status indicator badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-luxury border border-gold-400/40 text-gold-200 text-xs font-serif flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                {candlesLit ? (
                  <>
                    <Flame size={13} className="text-amber-400 fill-amber-400 animate-pulse" />
                    <span>Candles Glowing</span>
                  </>
                ) : (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span>Wish Sent to Heaven ✨</span>
                  </>
                )}
              </div>

              {/* Subtle glass shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Interactive Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          {candlesLit ? (
            <button
              onClick={handleBlowCandles}
              className="btn-gold px-7 py-3.5 rounded-full text-sm sm:text-base font-serif tracking-wider flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all cursor-pointer group"
            >
              <Wind size={18} className="text-black group-hover:translate-x-1 transition-transform" />
              <span>Blow Out Candles & Make a Wish 🎂</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="btn-gold-outline px-6 py-3 rounded-full text-xs sm:text-sm font-serif tracking-wider flex items-center gap-2 transition-all hover:scale-105"
            >
              <RotateCcw size={15} className="text-gold-400" />
              <span>Relight the Candles 🕯️</span>
            </button>
          )}

          <button
            onClick={handleCutCake}
            disabled={knifeCutting}
            className={`px-7 py-3.5 rounded-full text-sm sm:text-base font-serif tracking-wider flex items-center gap-2.5 shadow-xl transition-all cursor-pointer ${
              isCakeCut
                ? 'bg-emerald-500/20 border border-emerald-400/60 text-emerald-200 hover:bg-emerald-500/30'
                : 'glass-luxury border border-gold-400/50 text-gold-200 hover:text-white hover:border-gold-300 hover:scale-105'
            }`}
          >
            <Cake size={18} className={isCakeCut ? 'text-emerald-400' : 'text-gold-400'} />
            <span>{isCakeCut ? 'Cut Another Slice 🍰' : 'Cut the Cake 🍰✨'}</span>
          </button>
        </div>

        {/* Birthday Wish Confirmation Notification */}
        {wishMade && (
          <div className="mt-8 max-w-xl w-full glass-luxury rounded-2xl p-5 border border-gold-400/40 text-center animate-fade-in shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-400/20 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-center gap-2 text-gold-300 font-serif text-base sm:text-lg font-bold mb-2">
              <Sparkles size={18} className="text-gold-400 fill-gold-400" />
              <span>A Sweet Birthday Wish For Stella</span>
              <Sparkles size={18} className="text-gold-400 fill-gold-400" />
            </div>
            <p className="font-serif italic text-zinc-200 text-sm sm:text-base leading-relaxed">
              "May every dream whispered into these golden flames find its way to reality. May your 18th year and all the years ahead bring you infinite peace, radiant smiles, and boundless joy."
            </p>
          </div>
        )}

        {/* Cake Slice Reveal Card */}
        {isCakeCut && (
          <div className="mt-6 max-w-xl w-full glass-card rounded-2xl p-6 border border-rose-500/30 text-center animate-fade-in shadow-2xl relative overflow-hidden bg-gradient-to-br from-rose-950/40 via-black/60 to-amber-950/40">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">🍰</span>
              <span className="text-xs sm:text-sm font-mono tracking-widest text-rose-300 uppercase">
                First Sweet Slice Served
              </span>
              <span className="text-2xl">✨</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Here's the First Slice For You! ❤️
            </h4>

            <p className="font-serif text-zinc-200 text-sm sm:text-base leading-relaxed">
              "A sweet bite for the sweetest person! May your special day and every single chapter ahead be as warm, delightful, and blessed as this moment."
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-serif text-gold-300/90">
              <Heart size={14} className="fill-red-500 text-red-500 animate-pulse" />
              <span>Crafted with love for Stella's Birthday</span>
              <Heart size={14} className="fill-red-500 text-red-500 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
