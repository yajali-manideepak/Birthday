import React from 'react';
import { Feather, Heart, Sparkles } from 'lucide-react';
import { PHOTO_CONFIG } from '../config/photos';

export const LetterScene: React.FC = () => {
  return (
    <section id="letter-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center z-10">
      {/* Background ambient warm tint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gold-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-3xl w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-4">
            <Feather size={14} className="text-gold-400" />
            <span>Handwritten From the Soul</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white mb-3">
            A Little Something <span className="gold-metallic-text">From My Heart</span>
          </h2>
        </div>

        {/* Vintage Luxury Letter Container */}
        <div className="relative glass-luxury rounded-3xl p-8 sm:p-12 md:p-16 gold-border-glow shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-gold-400/40 transition-transform duration-500 hover:scale-[1.01]">
          {/* Ornate corner embellishments */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-400/60 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-400/60 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-400/60 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-400/60 pointer-events-none" />

          {/* Golden Wax Seal */}
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
              <p>The mall selfies.</p>
              <p>The school days.</p>
              <p>The board exam preparation.</p>
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
          <div className="mt-10 pt-6 border-t border-gold-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gold-400 font-serif">
              <Sparkles size={14} />
              <span>Written with genuine devotion</span>
            </div>
            <div className="font-script text-2xl sm:text-3xl text-gold-300">
              Forever Yours ❤️
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
