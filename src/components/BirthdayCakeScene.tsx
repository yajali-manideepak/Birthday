import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Heart, Wind, RotateCcw, Cake, Check, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { synthAudio } from '../utils/soundSynthesizer';

interface FloatingPastelBalloon {
  id: number;
  color: string;
  shineColor: string;
  left: string;
  bottom: string;
  size: number;
  animDuration: number;
  animDelay: number;
}

export const BirthdayCakeScene: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [isCakeCut, setIsCakeCut] = useState<boolean>(false);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [knifeCutting, setKnifeCutting] = useState<boolean>(false);
  const [smokeActive, setSmokeActive] = useState<boolean>(false);
  const confettiAnimRef = useRef<number | null>(null);

  // Exact colors & duration from the Coding.Stella Animated Birthday Cake code:
  // var colors = ['#D4AF37', '#C0C0C0', '#ffffff', '#F5F5DC'];
  // var duration = 3000;
  const fireCodingStellaConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#D4AF37', '#C0C0C0', '#ffffff', '#F5F5DC'];

    const frame = () => {
      // Left cannon
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
      });

      // Right cannon
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        confettiAnimRef.current = requestAnimationFrame(frame);
      }
    };

    frame();
  };

  useEffect(() => {
    return () => {
      if (confettiAnimRef.current) {
        cancelAnimationFrame(confettiAnimRef.current);
      }
    };
  }, []);

  // Handle clicking candle to blow out the fire
  const handleCandleClick = () => {
    if (!candlesLit) return;

    synthAudio.playBlow();
    setCandlesLit(false);
    setSmokeActive(true);
    setWishMade(true);

    setTimeout(() => {
      synthAudio.playChime();
      fireCodingStellaConfetti();
    }, 200);

    setTimeout(() => {
      setSmokeActive(false);
    }, 2500);
  };

  // Relight candle
  const handleRelight = () => {
    setCandlesLit(true);
    setSmokeActive(false);
    synthAudio.playChime();
  };

  // Cut cake action
  const handleCutCake = () => {
    if (knifeCutting) return;
    setKnifeCutting(true);
    synthAudio.playSlice();

    setTimeout(() => {
      setIsCakeCut(true);
      setKnifeCutting(false);
      synthAudio.playPop();
      synthAudio.playChime();
      fireCodingStellaConfetti();
    }, 900);
  };

  // Pastel balloons in background of the cake card (matching reel preview)
  const pastelBalloons: FloatingPastelBalloon[] = [
    { id: 1, color: '#FBE38E', shineColor: '#FFF6D1', left: '16%', bottom: '26%', size: 34, animDuration: 5.5, animDelay: 0 },
    { id: 2, color: '#F4A7B9', shineColor: '#FDDCE4', left: '68%', bottom: '28%', size: 36, animDuration: 6.2, animDelay: 0.7 },
    { id: 3, color: '#8FD6E8', shineColor: '#DBF4FB', left: '84%', bottom: '15%', size: 33, animDuration: 5.8, animDelay: 1.2 },
    { id: 4, color: '#D4BBF2', shineColor: '#F3E8FD', left: '48%', bottom: '12%', size: 32, animDuration: 6.6, animDelay: 0.3 },
    { id: 5, color: '#FFC6B3', shineColor: '#FFE6DC', left: '32%', bottom: '10%', size: 30, animDuration: 5.2, animDelay: 1.5 },
  ];

  return (
    <section id="birthday-cake-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center z-10 select-none">
      {/* Golden Celebration Aura Background */}
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

        <p className="text-zinc-300 font-light text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Tap the glowing candle to blow it out, launch the gold & silver celebration confetti, and make your special wish!
        </p>

        {/* =========================================================================
            THE ANIMATED BIRTHDAY CAKE CARD
            Faithful recreation of @coding.stella's HTML CSS JS Birthday Cake
            ========================================================================= */}
        <div className="relative group max-w-lg w-full mx-auto my-2">
          {/* Outer Ambient Glow */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-gold-500/20 to-pink-500/30 opacity-60 blur-2xl group-hover:opacity-80 transition-opacity duration-700" />

          {/* Main Card Frame with sleek white/purple border */}
          <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 bg-[#161521] shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/20 sm:border-white/30 backdrop-blur-xl flex flex-col items-center justify-between min-h-[460px] sm:min-h-[500px]">
            {/* Top Status Bar */}
            <div className="w-full flex items-center justify-between z-20 mb-4">
              <div className="px-3 py-1 rounded-full glass-luxury border border-gold-400/40 text-gold-200 text-xs font-serif flex items-center gap-1.5 shadow-md">
                {candlesLit ? (
                  <>
                    <Flame size={13} className="text-amber-400 fill-amber-400 animate-pulse" />
                    <span>Candle Glowing • Tap to Blow</span>
                  </>
                ) : (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span>Wish Sent to the Stars ✨</span>
                  </>
                )}
              </div>

              {!candlesLit && (
                <button
                  onClick={handleRelight}
                  title="Relight Candle"
                  className="px-3 py-1 rounded-full bg-gold-500/10 hover:bg-gold-500/25 border border-gold-400/30 text-gold-300 text-xs font-serif flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <RotateCcw size={12} className="text-gold-400" />
                  <span>Relight Candle</span>
                </button>
              )}
            </div>

            {/* Sparkles / Fireworks effect behind cake */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {/* Twinkling star sparkles around cake */}
              <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-75" />
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-gold-300 rounded-full animate-pulse opacity-90" />
              <div className="absolute top-2/5 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-300 opacity-60" />
              <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-200 rounded-full animate-ping delay-500 opacity-60" />
              <div className="absolute top-20 right-20 w-1 h-1 bg-gold-200 rounded-full animate-pulse delay-700" />

              {/* Sparkle cluster on left (from screenshot) */}
              <svg
                className="absolute top-[32%] left-[24%] w-16 h-16 text-white/30 animate-pulse"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <circle cx="20" cy="20" r="2.5" />
                <circle cx="45" cy="15" r="1.5" />
                <circle cx="65" cy="30" r="2" />
                <circle cx="35" cy="40" r="3" />
                <circle cx="50" cy="55" r="1.5" />
                <circle cx="75" cy="45" r="2" />
                <circle cx="25" cy="65" r="2.5" />
              </svg>
            </div>

            {/* Floating Pastel Balloons with Strings */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {pastelBalloons.map((b) => (
                <div
                  key={b.id}
                  style={{
                    left: b.left,
                    bottom: b.bottom,
                    animation: `balloonFloat ${b.animDuration}s ease-in-out infinite alternate`,
                    animationDelay: `${b.animDelay}s`,
                  }}
                  className="absolute flex flex-col items-center"
                >
                  {/* Balloon Oval */}
                  <div
                    style={{
                      width: `${b.size}px`,
                      height: `${b.size * 1.25}px`,
                      backgroundColor: b.color,
                      borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                      boxShadow: `inset -3px -3px 8px rgba(0,0,0,0.15), inset 3px 3px 8px rgba(255,255,255,0.4), 0 8px 20px ${b.color}40`,
                    }}
                    className="relative"
                  >
                    {/* Specular Glare */}
                    <div
                      style={{
                        backgroundColor: b.shineColor,
                      }}
                      className="absolute top-1.5 left-2 w-2 h-4 rounded-full opacity-80 transform -rotate-30"
                    />

                    {/* Balloon Knot */}
                    <div
                      style={{
                        borderLeft: '3px solid transparent',
                        borderRight: '3px solid transparent',
                        borderBottom: `4px solid ${b.color}`,
                        filter: 'brightness(0.9)',
                      }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
                    />
                  </div>

                  {/* Gentle Swaying Balloon String */}
                  <svg
                    width="12"
                    height="45"
                    viewBox="0 0 12 45"
                    className="overflow-visible opacity-60"
                  >
                    <path
                      d="M6 0 Q10 15 4 28 T6 45"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="0.8"
                    />
                  </svg>
                </div>
              ))}
            </div>

            {/* Central Stage: The Cake + Candle + Text */}
            <div className="relative z-10 flex flex-col items-center my-auto pt-6 pb-4">
              {/* THE CAKE CONTAINER */}
              <div className="relative flex flex-col items-center">
                {/* CANDLE & FLAME (.candle, .fire) */}
                <div
                  onClick={handleCandleClick}
                  className="candle relative flex flex-col items-center cursor-pointer group/candle z-30 transition-transform active:scale-95"
                  title="Click to blow out candle!"
                >
                  {/* Fire Flame (.fire) - Fades out on click */}
                  <div
                    className={`fire relative transition-all duration-500 ${
                      candlesLit
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-50 pointer-events-none'
                    }`}
                  >
                    {/* Multi-layered flickering flame */}
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_16px_5px_rgba(255,170,0,0.85)] animate-flame-flicker transform origin-bottom flex items-center justify-center">
                      {/* Hot white inner flame core */}
                      <div className="w-1.5 h-3 rounded-full bg-white/90 shadow-[0_0_6px_#ffffff] transform translateY(1px)" />
                    </div>
                  </div>

                  {/* Smoke Wisps when extinguished */}
                  {smokeActive && !candlesLit && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center animate-smoke-rise">
                      <div className="w-1 h-5 bg-gradient-to-t from-zinc-300/80 via-zinc-400/50 to-transparent blur-[0.8px] rounded-full" />
                      <div className="w-2.5 h-3 bg-zinc-400/40 blur-[1.2px] rounded-full -mt-2" />
                    </div>
                  )}

                  {/* Candle Wick */}
                  <div className="w-[2px] h-[7px] bg-[#3a2e2b] -mt-0.5 rounded-full" />

                  {/* Candle Body */}
                  <div className="w-3 h-10 rounded-t-sm rounded-b-sm bg-gradient-to-r from-[#f7f5f2] via-[#ffffff] to-[#e8e4dc] shadow-[0_2px_8px_rgba(0,0,0,0.3)] relative overflow-hidden">
                    {/* Elegant diagonal stripes */}
                    <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#f4a7b9,#f4a7b9_3px,transparent_3px,transparent_7px)]" />
                  </div>
                </div>

                {/* WHIPPED CREAM FROSTING CLOUD (Top of cake) */}
                <div className="relative -mt-2 z-20 flex items-center justify-center">
                  {/* Organic rounded whipped cream puffs */}
                  <div className="relative w-28 h-9 flex items-center justify-center">
                    <div className="absolute w-10 h-8 bg-white rounded-full top-0 left-2 shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
                    <div className="absolute w-12 h-9 bg-white rounded-full top-[-4px] left-8 shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
                    <div className="absolute w-10 h-8 bg-white rounded-full top-0 right-2 shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
                    <div className="absolute w-8 h-6 bg-white/95 rounded-full top-2 left-6" />
                    <div className="absolute w-8 h-6 bg-white/95 rounded-full top-2 right-6" />
                    {/* Cream dollop peak */}
                    <div className="absolute w-4 h-4 bg-white rounded-full top-[-6px] left-[48%] -translate-x-1/2" />
                  </div>
                </div>

                {/* TIERED CHOCOLATE CAKE WITH CREAM FILLING */}
                <div className="relative -mt-2 flex flex-col items-center z-10 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
                  {/* Layer 1: Top Chocolate Tier */}
                  <div className="w-40 sm:w-44 h-4.5 rounded-t-md bg-[#7c584a] shadow-[inset_0_2px_2px_rgba(255,255,255,0.2)] border-t border-[#8e6859]" />

                  {/* Filling 1: Cream Layer */}
                  <div className="w-40 sm:w-44 h-1.5 bg-[#fbf5eb] shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)]" />

                  {/* Layer 2: Middle Chocolate Tier */}
                  <div className="w-40 sm:w-44 h-4.5 bg-[#734f41] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />

                  {/* Filling 2: Cream Layer */}
                  <div className="w-40 sm:w-44 h-1.5 bg-[#fbf5eb] shadow-[inset_0_1px_1px_rgba(0,0,0,0.15)]" />

                  {/* Layer 3: Bottom Chocolate Tier */}
                  <div className="w-40 sm:w-44 h-5 rounded-b-sm bg-[#674436] shadow-[inset_0_-2px_3px_rgba(0,0,0,0.3)]" />

                  {/* BASE PLATE (Thin minimal white/cream plate) */}
                  <div className="w-48 sm:w-52 h-1.5 bg-[#f8f6f0] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.45)] mt-0.5" />
                </div>

                {/* Animated Golden Knife Cutting Overlay */}
                {knifeCutting && (
                  <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
                    <div className="w-1.5 h-36 bg-gradient-to-b from-transparent via-gold-200 to-gold-500 shadow-[0_0_25px_#ffd700] transform -rotate-12 animate-pulse" />
                  </div>
                )}
              </div>

              {/* TEXT BELOW CAKE (Matches coding.stella styling exactly) */}
              <div className="mt-8 flex flex-col items-center">
                <h3 className="text-2xl sm:text-3xl font-sans font-light text-white tracking-wider lowercase">
                  happy birthday!
                </h3>
                <p className="text-base sm:text-lg font-serif italic text-zinc-300 font-normal mt-0.5 tracking-wide">
                  Stella
                </p>
              </div>
            </div>

            {/* Bottom Subtle Indicator Hint */}
            <div className="w-full text-center z-20 pt-2 pb-1">
              <span className="text-[11px] font-serif text-zinc-400 tracking-wider">
                {candlesLit
                  ? '✨ Click the candle to blow it out & make your wish ✨'
                  : '🎉 Wish received! Tap Relight to make another wish 🎉'}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          {candlesLit ? (
            <button
              onClick={handleCandleClick}
              className="btn-gold px-7 py-3.5 rounded-full text-sm sm:text-base font-serif tracking-wider flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all cursor-pointer group"
            >
              <Wind size={18} className="text-black group-hover:translate-x-1 transition-transform" />
              <span>Blow Out Candle & Make a Wish 🎂</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="btn-gold-outline px-6 py-3 rounded-full text-xs sm:text-sm font-serif tracking-wider flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <RotateCcw size={15} className="text-gold-400" />
              <span>Relight Candle 🕯️</span>
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
              "May every dream whispered into this golden flame find its way to reality. May your 18th year and all the years ahead bring you infinite peace, radiant smiles, and boundless joy."
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

      {/* Custom Keyframe Animations for Flame Flickering, Smoke, and Floating Balloons */}
      <style>{`
        @keyframes flameFlicker {
          0%, 100% {
            transform: scale(1) translateY(0) rotate(-1deg);
            filter: drop-shadow(0 0 10px rgba(255, 170, 0, 0.9));
          }
          25% {
            transform: scale(1.05, 0.95) translateY(-1px) rotate(1deg);
            filter: drop-shadow(0 0 14px rgba(255, 200, 0, 1));
          }
          50% {
            transform: scale(0.97, 1.03) translateY(-2px) rotate(-1.5deg);
            filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.8));
          }
          75% {
            transform: scale(1.02, 0.98) translateY(-0.5px) rotate(1.5deg);
            filter: drop-shadow(0 0 12px rgba(255, 180, 0, 0.95));
          }
        }

        .animate-flame-flicker {
          animation: flameFlicker 0.4s ease-in-out infinite alternate;
        }

        @keyframes balloonFloat {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(2.5deg);
          }
          100% {
            transform: translateY(-32px) rotate(-2deg);
          }
        }

        @keyframes smokeRise {
          0% {
            opacity: 0.9;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-18px) scale(1.4) skewX(4deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-35px) scale(2) skewX(-6deg);
          }
        }

        .animate-smoke-rise {
          animation: smokeRise 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};
