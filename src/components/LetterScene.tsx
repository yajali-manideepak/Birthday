import React, { useState } from 'react';
import { Feather, Heart, Sparkles, Mail, MailOpen, Lock, ArrowUpCircle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { synthAudio } from '../utils/soundSynthesizer';

export const LetterScene: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);

  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    synthAudio.playPop();
    synthAudio.playChime();

    // Heart & golden stardust confetti explosion
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      shapes: ['star', 'circle'],
      colors: ['#fbf5b7', '#d4af37', '#ff4b72', '#ffffff', '#ff9a9e'],
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 600);
  };

  const handleCloseEnvelope = () => {
    setIsOpen(false);
    synthAudio.playPop();
  };

  return (
    <section id="letter-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center z-10">
      {/* Background ambient warm tint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-3xl w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-4">
            <Feather size={14} className="text-gold-400" />
            <span>Handwritten From the Soul</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white mb-3">
            A Little Something <span className="gold-metallic-text">From My Heart</span>
          </h2>

          <p className="text-zinc-400 font-light text-xs sm:text-sm max-w-md mx-auto">
            {isOpen
              ? 'A letter written with pure devotion, sealed in love.'
              : 'A sealed royal envelope waiting for you. Tap the wax seal to open it.'}
          </p>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE ENVELOPE (When Closed or Opening)                  */}
        {/* ============================================================== */}
        {!isOpen ? (
          <div className="relative max-w-xl mx-auto my-6 animate-fade-in perspective-[1000px]">
            {/* Outer Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 via-gold-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-75 animate-pulse-glow pointer-events-none" />

            {/* Envelope Body Container */}
            <div
              onClick={handleOpenEnvelope}
              className={`relative bg-gradient-to-br from-[#1a1217] via-[#241520] to-[#120c13] rounded-3xl p-8 sm:p-12 border-2 border-gold-400/50 shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer group transition-all duration-500 hover:scale-[1.02] hover:border-gold-300 ${
                isOpening ? 'scale-95 brightness-110' : ''
              }`}
            >
              {/* Ornate corner embellishments */}
              <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-gold-400/60 pointer-events-none" />
              <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-gold-400/60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-gold-400/60 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-gold-400/60 pointer-events-none" />

              {/* Envelope Flap Triangle Design */}
              <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
                <div
                  className={`w-full h-full bg-gradient-to-b from-black/40 to-transparent transform origin-top transition-transform duration-500 ${
                    isOpening ? '-rotate-x-90' : 'rotate-x-0'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    background: 'linear-gradient(180deg, rgba(212,175,55,0.18) 0%, rgba(20,15,20,0.8) 100%)',
                    borderBottom: '1px solid rgba(212,175,55,0.4)',
                  }}
                />
              </div>

              {/* Envelope Address / Label */}
              <div className="text-center pt-8 sm:pt-10 pb-6 relative z-10">
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gold-400/80 uppercase block mb-1">
                  Private & Confidential • Only for
                </span>
                <h3 className="font-script text-4xl sm:text-5xl text-gold-200 drop-shadow-md">
                  Stella ❤️
                </h3>
                <p className="text-xs font-serif text-zinc-400 italic mt-2">
                  "Words I kept safe in my heart, penned down for your special day."
                </p>
              </div>

              {/* The Royal Wax Seal */}
              <div className="relative z-20 flex flex-col items-center justify-center my-4">
                <div
                  className={`relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 via-rose-700 to-red-900 border-2 border-gold-300 shadow-[0_0_35px_rgba(239,68,68,0.5)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 active:scale-95 ${
                    isOpening ? 'animate-ping' : 'animate-pulse'
                  }`}
                >
                  {/* Wax Seal Rim & Stamp */}
                  <div className="w-16 h-16 rounded-full border border-gold-400/60 flex items-center justify-center bg-gradient-to-br from-red-800 to-amber-900">
                    <span className="font-cinzel text-2xl font-black text-gold-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none">
                      S
                    </span>
                  </div>
                  {/* Outer Seal Stamp Details */}
                  <Sparkles size={14} className="text-gold-300 absolute -top-1 right-1 animate-spin-slow" />
                </div>

                <div className="mt-4 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-200 text-xs font-serif flex items-center gap-2 shadow-lg group-hover:bg-gold-500/25 transition-colors">
                  <MailOpen size={13} className="text-gold-400" />
                  <span>Tap Seal to Break & Open Letter</span>
                </div>
              </div>

              {/* Envelope Bottom Seal Note */}
              <div className="text-center pt-4 border-t border-gold-500/20 text-[11px] font-mono text-zinc-400 flex items-center justify-center gap-1.5">
                <Lock size={12} className="text-gold-400/80" />
                <span>Sealed with genuine love & respect</span>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* OPENED LETTER (Parchment Unfolded View)                        */
          /* ============================================================== */
          <div className="relative glass-luxury rounded-3xl p-8 sm:p-12 md:p-16 gold-border-glow shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-gold-400/50 animate-fade-in">
            {/* Ornate corner embellishments */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-400/60 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-400/60 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-400/60 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-400/60 pointer-events-none" />

            {/* Golden Broken Seal Monogram on Top */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 via-gold-500 to-amber-800 shadow-[0_0_25px_rgba(212,175,55,0.6)] flex items-center justify-center border-2 border-gold-200">
              <span className="font-cinzel text-xl font-black text-black drop-shadow-sm select-none">
                S
              </span>
            </div>

            {/* Letter Salutation */}
            <div className="mb-6 pt-2">
              <h3 className="font-script text-4xl sm:text-5xl text-gold-200">
                Stella,
              </h3>
            </div>

            {/* Letter Body in Elegant Handwriting / Calligraphy */}
            <div className="font-handwriting text-lg sm:text-2xl text-zinc-200 leading-relaxed sm:leading-loose space-y-4 tracking-wide selection:bg-gold-500/20">
              <p>
                I don't know if I can perfectly put everything I feel into words.
              </p>

              <p>
                But when I look back at everything we've shared, I realize how many beautiful memories are connected to you.
              </p>

              <div className="py-2 pl-4 sm:pl-8 border-l-2 border-gold-500/30 text-gold-300/90 font-serif text-base sm:text-xl space-y-1.5 italic">
                <p>The calls.</p>
                <p>The chats.</p>
                <p>The laughs.</p>
                <p>The walks.</p>
                <p>The bakery moments.</p>
                <p>The school days.</p>
                <p>The board exam preparation (calls & texts day).</p>
                <p>Those early morning conversations in the cool breeze while coming to college.</p>
              </div>

              <p>
                All those little moments became memories that I will always carry with me.
              </p>

              <p>
                You have always been someone who could make me happy just by talking to me.
              </p>

              <p>
                Whenever we talked, I never really felt how quickly time was passing.
              </p>

              <p>
                And somewhere along the way, without even realizing it...<br />
                <span className="text-gold-300 font-semibold">you became someone very special to me.</span>
              </p>

              <p>
                I don't know exactly when it happened.
              </p>

              <p className="text-gold-200 font-medium">
                I just know that somewhere between all those conversations and memories...
              </p>

              <p className="text-2xl sm:text-3xl text-gold-300 font-bold pt-2 flex items-center gap-2">
                I fell in love with you.
                <Heart size={24} className="fill-red-500 text-red-500 inline-block animate-pulse" />
              </p>
            </div>

            {/* Letter Signoff */}
            <div className="mt-10 pt-6 border-t border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gold-400 font-serif">
                <Sparkles size={14} />
                <span>Written with genuine devotion</span>
              </div>
              <div className="font-script text-2xl sm:text-3xl text-gold-300">
                Forever Yours ❤️
              </div>
            </div>

            {/* Re-fold Button */}
            <div className="mt-8 text-center pt-2">
              <button
                onClick={handleCloseEnvelope}
                className="btn-gold-outline px-5 py-2 rounded-full text-xs font-serif inline-flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
              >
                <RotateCcw size={13} className="text-gold-400" />
                <span>Fold & Return to Envelope 💌</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
